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
    note: "A small CTF activity at LEAP. Two First Bloods, the most in the activity, and the Tuwaiq Challenges trophy.",
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
  note: "I haven't reached the finals yet. Getting there is the goal.",
  milestones: [
    { id: "stage-2", label: "Stage 2", status: "achieved", date: "2026-09-12" },
    { id: "stage-3", label: "Stage 3", status: "achieved", date: "2026-10-08" },
    { id: "finals", label: "Finals", status: "goal" },
  ],
  gallery: { folder: "/images/achievements/black-hat-bug-bounty-jr/gallery", alt: "Black Hat Bug Bounty Jr." },
};
