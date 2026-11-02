// Dates are formatted by hand (not Intl) so server and browser output always match.
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parse(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m: m - 1, d };
}

/** "24 Aug 2025" */
export function formatDate(iso: string): string {
  const { y, m, d } = parse(iso);
  return `${d} ${MONTHS[m]} ${y}`;
}

/** "Jun 2026" */
export function formatMonth(iso: string): string {
  const { y, m } = parse(iso);
  return `${MONTHS[m]} ${y}`;
}

/** "13–24 Sep 2026" or "14 Aug – 30 Sep 2026" */
export function formatRange(start: string, end: string): string {
  const a = parse(start);
  const b = parse(end);
  if (a.y === b.y && a.m === b.m) return `${a.d}–${b.d} ${MONTHS[b.m]} ${b.y}`;
  if (a.y === b.y) return `${a.d} ${MONTHS[a.m]} – ${b.d} ${MONTHS[b.m]} ${b.y}`;
  return `${formatDate(start)} – ${formatDate(end)}`;
}

/** "SAR 25,000" */
export function formatSAR(amount: number): string {
  return `SAR ${String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
