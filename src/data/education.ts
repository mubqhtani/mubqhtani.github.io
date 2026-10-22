import type { TimelineEntry } from "./types";

/**
 * Learning, in chronological order (rendered as written).
 * Competition results live in achievements.ts and are not repeated here.
 */
export const timeline: TimelineEntry[] = [
  {
    id: "tuwaiq-academy",
    start: "2025-08-24",
    end: "2026-06-25",
    title: "Tuwaiq Academy",
    org: "In person",
    body: "Python programming, machine learning, an introduction to data science, NumPy and related Python libraries.",
  },
  {
    id: "pcep",
    start: "2026-06-03",
    title: "PCEP certification",
    org: "Python Institute",
    certificationId: "pcep",
  },
  {
    id: "continuing-studies",
    start: "2026-08-23",
    end: "present",
    title: "Software development, software engineering & data science",
    body: "Alongside this, I'm learning web security and bug hunting through hands-on labs and challenges.",
  },
];
