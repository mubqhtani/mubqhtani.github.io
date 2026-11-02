import type { Achievement, BlackHatJourney } from "./types";

/**
 * Competition results, in display order. The first one is shown wide; the
 * next two are shown side by side (they have portrait photos).
 *
 * Photos: public/images/achievements/<id>/cover.jpg
 * Extra photos (optional): public/images/achievements/<id>/gallery/01.jpg, 02.jpg, ...
 */
export const achievements: Achievement[] = [
  {
    id: "defenseathon",
    name: "Defenseathon",
    rank: "1st",
    placement: "1st place",
    context: "General Education · Programming track",
    prize: { amount: 25000, currency: "SAR" },
    date: "2026-05-05",
    timeline: [
      { id: "registration", title: "Registration closed", start: "2026-04-02" },
      { id: "satr", title: "Satr platform (remote)", start: "2026-04-05", end: "2026-04-18" },
      { id: "camp", title: "Tuwaiq camp (in person)", start: "2026-04-24", end: "2026-05-02" },
      { id: "challenge", title: "Defenseathon challenge", start: "2026-05-03", end: "2026-05-05" },
      { id: "win", title: "Won 1st place", start: "2026-05-05", won: true },
    ],
    image: {
      src: "/images/achievements/defenseathon/cover",
      alt: "Defenseathon award ceremony: first place, General Education, SAR 25,000",
    },
    gallery: { folder: "/images/achievements/defenseathon/gallery", alt: "Defenseathon" },
    // project: { summary: "...", href: "https://..." },
  },
  {
    id: "future-of-mobility",
    name: "Future of Mobility Hackathon",
    rank: "1st",
    placement: "1st place",
    prize: { amount: 10000, currency: "SAR" },
    image: {
      src: "/images/achievements/future-of-mobility/cover",
      position: "50% 67%",
      alt: "Holding the first-place cheque at the Future of Mobility Hackathon",
    },
    gallery: { folder: "/images/achievements/future-of-mobility/gallery", alt: "Future of Mobility Hackathon" },
  },
  {
    id: "tuwaiq-ctf-leap-2026",
    name: "Tuwaiq Challenges CTF",
    rank: "2nd",
    placement: "2nd place",
    context: "LEAP 2026 · Day 2",
    note: "Two first bloods",
    image: {
      src: "/images/achievements/tuwaiq-ctf-leap-2026/cover",
      alt: "Receiving the Tuwaiq Challenges trophy at LEAP 2026",
    },
    gallery: { folder: "/images/achievements/tuwaiq-ctf-leap-2026/gallery", alt: "Tuwaiq Challenges CTF" },
  },
];

export const blackHat: BlackHatJourney = {
  id: "black-hat",
  name: "Black Hat Bug Bounty Jr.",
  location: "Malham, Riyadh",
  // Dates are the programme's published dates. Move `current` forward as stages are reached.
  milestones: [
    { id: "stage-1", label: "Stage 1", title: "Cybersecurity Fundamentals", status: "achieved", start: "2026-08-14", end: "2026-09-30" },
    { id: "stage-2", label: "Stage 2", title: "Introduction to Cybersecurity", status: "achieved", start: "2026-09-13", end: "2026-09-24" },
    { id: "stage-3", label: "Stage 3", title: "Introduction to Vulnerability Discovery", status: "current", start: "2026-10-11", end: "2026-11-05" },
    { id: "stage-4", label: "Stage 4", title: "Competition Preparation Camp", status: "upcoming", start: "2026-11-22", end: "2026-11-30" },
    { id: "stage-5", label: "Stage 5", title: "Competition at Black Hat", status: "upcoming", start: "2026-12-01", end: "2026-12-03" },
  ],
  gallery: { folder: "/images/achievements/black-hat-bug-bounty-jr/gallery", alt: "Black Hat Bug Bounty Jr." },
};
