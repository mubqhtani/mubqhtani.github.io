export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}
