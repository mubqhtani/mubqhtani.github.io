import type { MediaSlot, SocialLink } from "./types";

/**
 * Contact & social links. Add `href` (and optionally `handle`) when ready.
 * Links without an `href` are not shown. The Contact section appears as soon
 * as at least one link has an `href`.
 *   email:    href: "mailto:you@example.com", handle: "you@example.com"
 *   github:   href: "https://github.com/username", handle: "@username"
 */
const socials: SocialLink[] = [
  { id: "email", label: "Email", href: "mailto:qhtaniwork@gmail.com", handle: "qhtaniwork@gmail.com" },
  { id: "x", label: "X", href: "https://x.com/qhtcs", handle: "@qhtcs" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/0x1f9/", handle: "@0x1f9" },
  { id: "github", label: "GitHub" },
  { id: "linkedin", label: "LinkedIn" },
];

/** Core personal information. All copy about Mubarak lives in src/data. */
export const profile = {
  name: "Mubarak bin Saad Al-Qahtani",
  shortName: "Mubarak Al-Qahtani",
  age: 16,
  location: "Riyadh, Saudi Arabia",
  school: "Technical Talented High School",

  /**
   * Optional portrait: public/images/profile/portrait.jpg (or .png / .webp).
   * Nothing is shown until the file exists.
   */
  portrait: {
    src: "/images/profile/portrait",
    alt: "Mubarak Al-Qahtani",
  } satisfies MediaSlot,

  /**
   * The character beside the name in the hero: public/images/profile/character.jpg.
   * To swap it, replace that file (keep only one character.* file) and update
   * `alt` and `credit` so the artist's name shows in the corner.
   */
  character: {
    src: "/images/profile/character",
    alt: "Oil painting of Pepe the Frog as a monk holding a glass of wine",
    /** The artist, credited in the painting's hover tooltip. */
    credit: {
      name: "Pepelangelo",
      href: "https://pepelangelo.com/",
    } as { name: string; href?: string } | undefined,
  },

  /** One line under the name: what he does. */
  role: "Software engineering student focused on web security",
  intro: "I study software engineering and data science, and spend most of my time learning how web applications work, and how to secure them.",

  /** About: a short paragraph in his own voice (one string per paragraph). */
  about: [
    "I'm Mubarak, a 16-year-old from Riyadh. I started with Python and machine learning at Tuwaiq Academy, and I'm now studying software engineering and data science. Most of my free time goes into web security: understanding how web apps work, and how they can be broken, on Hack\u00A0The\u00A0Box and PortSwigger.",
    "Next, I want to win the Black Hat Bug Bounty Jr. final, build software that serves Saudi Arabia, and keep going deeper into security and AI.",
  ],

  socials,

  /** Used for the copyright line. */
  year: 2026,
};
