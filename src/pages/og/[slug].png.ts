import type { APIRoute } from 'astro';
import sharp from 'sharp';

// Cards are rendered once at build time. The deployed site serves ordinary PNGs.
export const prerender = true;

const cards = import.meta.glob('../../assets/social/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

export function getStaticPaths() {
  return Object.entries(cards).map(([path, svg]) => ({
    params: { slug: path.split('/').pop()!.replace(/\.svg$/, '') },
    props: { svg },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const image = await sharp(Buffer.from(props.svg))
    .resize(1200, 630)
    .png({ compressionLevel: 9 })
    .toBuffer();

  return new Response(new Uint8Array(image), {
    headers: { 'Content-Type': 'image/png' },
  });
};
