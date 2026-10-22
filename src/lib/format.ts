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

/** "SAR 25,000" */
export function formatSAR(amount: number): string {
  return `SAR ${String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
