// Shared formatting helpers for dates and Paper numbers.

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function formatYear(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', { year: 'numeric' }).format(date);
}

// Paper 1 -> "001"
export function paperNumber(n: number): string {
  return String(n).padStart(3, '0');
}
