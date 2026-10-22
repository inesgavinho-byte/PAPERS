import { readdir, readFile, stat } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';

const root = resolve('dist');
let failures = [];
let htmlFiles = [];
async function walk(dir) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, item.name);
    if (item.isDirectory()) await walk(path);
    else if (item.name.endsWith('.html')) htmlFiles.push(path);
  }
}
await walk(root);
if (!htmlFiles.length) failures.push('No HTML files generated.');
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  for (const [name, pattern] of Object.entries({
    lang: /<html\b[^>]*\blang=["'][^"']+["']/i,
    title: /<title>[^<]+<\/title>/i,
    description: /<meta\s+name=["']description["'][^>]*content=["'][^"']+["']/i,
    canonical: /<link\s+rel=["']canonical["'][^>]*href=["']https?:\/\/[^"']+["']/i,
    main: /<main\b/i,
  })) if (!pattern.test(html)) failures.push(`${file}: missing ${name}`);

  const links = html.matchAll(/\bhref=["'](\/[^"'#?]*)(?:[?#][^"']*)?["']/g);
  for (const [, target] of links) {
    if (target.startsWith('//')) continue;
    const base = join(root, decodeURIComponent(target));
    const candidates = target.endsWith('/') ? [join(base, 'index.html')] :
      [base, join(base, 'index.html'), base + '.html'];
    let exists = false;
    for (const p of candidates) {
      try { if ((await stat(p)).isFile()) { exists = true; break; } } catch {}
    }
    if (!exists) failures.push(`${file}: broken internal link ${target}`);
  }
}
console.log(`Checked ${htmlFiles.length} generated HTML pages.`);
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
}
