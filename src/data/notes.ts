/**
 * Write-ups and study notes that live elsewhere (GitHub). They are listed in
 * the Articles section as plain links; the site does not host a copy.
 */
export type ExternalNote = {
  title: string;
  /** ISO date; the list is sorted newest first together with the articles. */
  date: string;
  href: string;
};

export const notes: ExternalNote[] = [
  {
    title: "SQL Injection Fundamentals: Skills Assessment",
    date: "2025-04-19",
    href: "https://github.com/mubqhtani/SQLiSkillFund",
  },
  {
    title: "OS Command Injection",
    date: "2025-02-21",
    href: "https://github.com/mubqhtani/commandinjection",
  },
];
