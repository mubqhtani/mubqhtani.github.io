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

  /** One line under the name: what he does. */
  role: "Student developer and web security learner",
  intro:
    "I study software engineering and data science, and spend much of my free time on web application security. I like testing what I learn in hackathons and CTFs.",

  about: [
    "I'm 16 and live in Riyadh. During the 2025–26 school year I studied Python, machine learning and the basics of data science in person at Tuwaiq Academy, and I'm now continuing with software development, software engineering and data science.",
    "I practice web security through labs and challenges on Hack\u00A0The\u00A0Box and PortSwigger Web Security Academy.",
  ],

  goals: [
    "Reach the Black Hat Bug Bounty Jr. finals and compete for first place",
    "Build and publish meaningful software projects",
    "Go deeper in web application security and programming",
    "Keep learning AI and data science",
    "Compete in more advanced technical competitions",
  ],

  socials,

  /** Used for the copyright line. */
  year: 2026,
};
