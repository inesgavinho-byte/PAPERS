// Shared formatting helpers.

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

// 4 -> "004"
export function issueNumber(n: number): string {
  return String(n).padStart(3, '0');
}

/** A consistent estimate from the actual edition text, at 200 words/minute. */
export function estimateReadingTime(source: string): string {
  const text = source
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/&(?:#\d+|#x[\da-f]+|\w+);/gi, ' ');
  const words = text.match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
  return `${Math.max(1, Math.ceil(words / 200))} min`;
}
