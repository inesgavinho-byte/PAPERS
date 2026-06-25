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
