import type { TimelineEntry } from "./types";

/**
 * Learning, in chronological order (rendered as written).
 * Competition results live in achievements.ts and are not repeated here.
 */
export const timeline: TimelineEntry[] = [
  {
    id: "high-school",
    // Only the school years are confirmed; `start` feeds the "Since" note.
    start: "2025-08-24",
    dateLabel: "2025 – Present",
    title: "Technical Talented High School",
    steps: [
      { id: "grade-10", title: "Grade 10", status: "done", start: "2025", dateLabel: "2025 – 2026" },
      { id: "grade-11", title: "Grade 11 (Current)", status: "current", start: "2026", dateLabel: "2026 – 2027" },
      { id: "grade-12", title: "Grade 12 (Upcoming)", status: "upcoming", start: "2027", dateLabel: "2027 – 2028" },
    ],
  },
  {
    id: "tuwaiq-academy",
    start: "2025-08-24",
    end: "2026-06-25",
    title: "Tuwaiq Academy",
    org: "In person",
    body: "Python, machine learning, data science basics and NumPy.",
  },
  {
    id: "project-showcase",
    start: "2025-11-20",
    title: "Project showcase",
    org: "Tuwaiq Academy",
    body: "Presented our Python, data science and machine learning projects.",
    photos: [
      {
        src: "/images/learning/project-showcase-1",
        position: "50% 10%",
        alt: "Screen at Tuwaiq Academy showing the Waffir project during the project showcase",
      },
      { src: "/images/learning/project-showcase-2", alt: "Selfie at the Tuwaiq Academy project showcase" },
    ],
  },
  {
    id: "tuwaiqthon",
    start: "2026-03-01",
    end: "2026-03-08",
    title: "Tuwaiqthon",
    org: "Tuwaiq Academy · Remote, then in person",
    body: "My first competition. No place, but I finished every stage and learned how competitions work. Two months later I won Defenseathon.",
    photos: [{ src: "/images/learning/tuwaiqthon", alt: "Illuminated Tuwaiqthon sign at the hackathon venue" }],
    // Dates from the hackathon's announcement.
    steps: [
      { id: "registration", title: "Registration", status: "done", start: "2026-02-18" },
      { id: "acceptance", title: "Final acceptance", status: "done", start: "2026-02-28" },
      { id: "remote", title: "Remote stage", status: "done", start: "2026-03-01", end: "2026-03-05" },
      { id: "in-person", title: "In-person stage", status: "done", start: "2026-03-06", end: "2026-03-08" },
    ],
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
    title: "Software engineering & data science",
    body: "Plus web security and bug hunting through hands-on labs.",
  },
];
