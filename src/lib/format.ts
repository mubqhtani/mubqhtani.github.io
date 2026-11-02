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

/** "2 Apr", "13–24 Sep" or "24 Apr – 2 May", with the year on request. */
export function formatDayRange(start: string, end: string | undefined, withYear: boolean): string {
  const a = parse(start);
  const b = end ? parse(end) : a;
  const range =
    !end ? `${a.d} ${MONTHS[a.m]}`
    : a.m === b.m ? `${a.d}–${b.d} ${MONTHS[b.m]}`
    : `${a.d} ${MONTHS[a.m]} – ${b.d} ${MONTHS[b.m]}`;
  return withYear ? `${range} ${b.y}` : range;
}

/** "SAR 25,000" */
export function formatSAR(amount: number): string {
  return `SAR ${String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
