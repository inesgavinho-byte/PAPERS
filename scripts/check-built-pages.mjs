// Validate the generated publication. This is a build check, not a certification.
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';

const root = resolve('dist');
const origin = 'https://papersbyig.netlify.app';
const failures = new Set();
const htmlFiles = [];
const pages = new Map();
const imageFiles = new Set();
let checkedLinks = 0;

const fail = (file, message) => failures.add(`${relative(root, file)}: ${message}`);
const decode = (value) => value.replace(/&(?:amp|quot|apos|lt|gt|#\d+|#x[\da-f]+);/gi, (entity) => {
  const named = { '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>' };
  if (named[entity]) return named[entity];
  const code = entity.toLowerCase().startsWith('&#x')
    ? Number.parseInt(entity.slice(3, -1), 16)
    : Number.parseInt(entity.slice(2, -1), 10);
  return Number.isFinite(code) && code <= 0x10ffff ? String.fromCodePoint(code) : entity;
});

function tags(html) {
  return [...html.matchAll(/<([a-z][\w:-]*)\b([^<>]*?)>/gi)].map(([, name, raw]) => {
    const attrs = {};
    for (const match of raw.matchAll(/([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) {
      attrs[match[1].toLowerCase()] = decode(match[2] ?? match[3] ?? match[4] ?? '');
    }
    return { name: name.toLowerCase(), attrs };
  });
}

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (entry.name.endsWith('.html')) htmlFiles.push(file);
  }
}

async function localFile(url) {
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); } catch { return null; }
  const base = resolve(root, `.${pathname}`);
  if (base !== root && !base.startsWith(`${root}/`)) return null;
  for (const candidate of [base, join(base, 'index.html'), `${base}.html`]) {
    try { if ((await stat(candidate)).isFile()) return candidate; } catch { /* Try the next route shape. */ }
  }
  return null;
}

function pageURL(file) {
  const pathname = `/${relative(root, file)}`.replace(/index\.html$/, '');
  return new URL(pathname, origin);
}

function internalURL(href, base) {
  try {
    const url = new URL(href, base);
    return url.origin === origin ? url : null;
  } catch { return null; }
}

async function checkLink(file, href) {
  const url = internalURL(href, pageURL(file));
  if (!url) return;
  checkedLinks += 1;
  const target = await localFile(url);
  if (!target) {
    fail(file, `broken internal link ${href}`);
    return;
  }
  if (url.hash.length > 1) {
    let id;
    try { id = decodeURIComponent(url.hash.slice(1)); } catch {
      fail(file, `invalid fragment encoding ${href}`);
      return;
    }
    // Text-fragment links are handled by the browser rather than HTML IDs.
    if (id.startsWith(':~:text=')) return;
    const targetTags = pages.get(target)?.tags ?? tags(await readFile(target, 'utf8'));
    if (!targetTags.some(({ name, attrs }) => attrs.id === id || (name === 'a' && attrs.name === id))) {
      fail(file, `missing fragment ${href}`);
    }
  }
}

await walk(root);
if (!htmlFiles.length) failures.add('No HTML files generated. Run npm run build first.');

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const elements = tags(html);
  const meta = Object.fromEntries(elements.filter((tag) => tag.name === 'meta')
    .map(({ attrs }) => [attrs.property ?? attrs.name, attrs.content]));
  pages.set(file, { html, tags: elements, meta, noindex: /\bnoindex\b/i.test(meta.robots ?? '') });
}

for (const [file, page] of pages) {
  const { html, tags: elements, meta } = page;
  const lang = elements.find((tag) => tag.name === 'html')?.attrs.lang;
  if (!['en', 'pt', 'pt-PT'].includes(lang)) fail(file, 'missing or unsupported page language');
  if (!/<title>\s*[^<]+\s*<\/title>/i.test(html)) fail(file, 'missing title');
  if (!elements.some((tag) => tag.name === 'main' && tag.attrs.id === 'main-content')) fail(file, 'missing main-content target');
  for (const name of ['description', 'author', 'og:title', 'og:description', 'og:type', 'og:locale', 'og:image:alt', 'twitter:title', 'twitter:description', 'twitter:image:alt']) {
    if (!meta[name]?.trim()) fail(file, `missing ${name}`);
  }

  const canonicals = elements.filter((tag) => tag.name === 'link' && tag.attrs.rel === 'canonical');
  const canonical = canonicals[0]?.attrs.href;
  if (canonicals.length !== 1) fail(file, 'expected exactly one canonical link');
  let canonicalURL;
  try { canonicalURL = new URL(canonical); } catch { fail(file, 'invalid canonical URL'); }
  if (canonicalURL) {
    if (canonicalURL.origin !== origin) fail(file, `incorrect canonical origin ${canonicalURL.origin}`);
    if (canonicalURL.search || canonicalURL.hash) fail(file, 'canonical URL must not contain a query or fragment');
    if (canonicalURL.origin === origin && await localFile(canonicalURL) !== file) fail(file, 'canonical points to a different or missing page');
  }
  if (meta['og:url'] !== canonical) fail(file, 'og:url differs from canonical');
  if (meta['twitter:card'] !== 'summary_large_image') fail(file, 'missing large social preview card');
  if (meta['twitter:image'] !== meta['og:image']) fail(file, 'Twitter and Open Graph images differ');
  if (meta['og:image:width'] !== '1200' || meta['og:image:height'] !== '630') fail(file, 'incorrect social image dimensions in metadata');
  let imageURL;
  try { imageURL = new URL(meta['og:image']); } catch { fail(file, 'missing or invalid og:image'); }
  if (imageURL) {
    if (imageURL.origin !== origin) fail(file, 'social image must use the published origin');
    const imageFile = imageURL.origin === origin ? await localFile(imageURL) : null;
    if (!imageFile) fail(file, 'social preview image is missing from the build');
    else imageFiles.add(imageFile);
  }

  for (const { attrs } of elements) {
    if (attrs.href) await checkLink(file, attrs.href);
    if (attrs.src) await checkLink(file, attrs.src);
  }
}

for (const file of imageFiles) {
  const data = await readFile(file);
  if (data.length < 24 || data.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') {
    fail(file, 'social image is not a PNG');
  } else if (data.readUInt32BE(16) !== 1200 || data.readUInt32BE(20) !== 630) {
    fail(file, 'social image is not 1200 × 630');
  }
}

// These published Portuguese editions are revisions of the original English
// essays. Check navigation both ways without claiming translation equivalence.
for (const slug of ['the-architectural-project-of-we', 'on-inhabited-time', 'the-architecture-of-the-interval', 'a-new-spatial-humanism', 'the-sponge-paradox', 'memory-is-not-an-archive', 'evidence-before-confidence', 'one-organisation-many-perspectives', 'project-memory']) {
  const enPath = `/papers/${slug}`;
  const ptPath = `/pt/papers/${slug}`;
  for (const [from, to, expectedLang] of [[enPath, ptPath, 'en'], [ptPath, enPath, 'pt']]) {
    const file = await localFile(new URL(from, origin));
    const page = pages.get(file);
    if (!page) { failures.add(`Missing published edition ${from}`); continue; }
    const lang = page.tags.find((tag) => tag.name === 'html')?.attrs.lang;
    if (expectedLang === 'pt' ? !['pt', 'pt-PT'].includes(lang) : lang !== expectedLang) fail(file, 'wrong edition language');
    const hasReturnLink = page.tags.some(({ name, attrs }) => name === 'a' && attrs.href &&
      internalURL(attrs.href, pageURL(file))?.pathname.replace(/\/$/, '') === to);
    if (!hasReturnLink) fail(file, `missing link to the other published edition ${to}`);
  }
}

for (const [pathname, language] of [['/', 'pt'], ['/en', 'en']]) {
  const file = await localFile(new URL(pathname, origin));
  const page = pages.get(file);
  if (!page) { failures.add(`Missing edition homepage ${pathname}`); continue; }
  const lang = page.tags.find((tag) => tag.name === 'html')?.attrs.lang;
  if (language === 'pt' ? !['pt', 'pt-PT'].includes(lang) : lang !== language) fail(file, 'incorrect homepage language');
}

const sitemapFiles = (await readdir(root)).filter((name) => /^sitemap.*\.xml$/.test(name));
if (!sitemapFiles.includes('sitemap-index.xml')) failures.add('Missing sitemap-index.xml');
for (const name of sitemapFiles) {
  const file = join(root, name);
  const xml = await readFile(file, 'utf8');
  for (const [, value] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    let url;
    try { url = new URL(decode(value)); } catch { fail(file, `invalid sitemap URL ${value}`); continue; }
    if (url.origin !== origin) { fail(file, `incorrect sitemap origin ${url.origin}`); continue; }
    const target = await localFile(url);
    if (!target) fail(file, `sitemap target missing ${url.pathname}`);
    else if (pages.get(target)?.noindex) fail(file, `sitemap includes a noindex page ${url.pathname}`);
  }
}

try {
  const robots = await readFile(join(root, 'robots.txt'), 'utf8');
  if (!robots.includes(`Sitemap: ${origin}/sitemap-index.xml`)) failures.add('robots.txt does not advertise the correct sitemap');
} catch { failures.add('Missing robots.txt'); }

const rssFile = join(root, 'rss.xml');
try {
  const rss = await readFile(rssFile, 'utf8');
  for (const [, value] of rss.matchAll(/<link>([^<]+)<\/link>/g)) {
    let url;
    try { url = new URL(decode(value)); } catch { fail(rssFile, `invalid RSS link ${value}`); continue; }
    if (url.origin !== origin) fail(rssFile, `incorrect RSS origin ${url.origin}`);
    else if (!await localFile(url)) fail(rssFile, `RSS target missing ${url.pathname}`);
  }
} catch { failures.add('Missing rss.xml'); }

console.log(`Checked ${pages.size} HTML pages, ${checkedLinks} internal links/assets and ${imageFiles.size} social preview images.`);
if (failures.size) {
  console.error([...failures].join('\n'));
  process.exitCode = 1;
} else {
  console.log('Generated publication checks passed. Browser, accessibility and deployment checks remain separate.');
}
