/**
 * An image that may or may not exist yet.
 *
 * `src` is a path inside /public. The file extension is optional:
 * "/images/profile/portrait" matches portrait.jpg, .jpeg, .png, .webp or .avif.
 * If no matching file exists, the image is simply not rendered.
 */
export type MediaSlot = {
  src: string;
  alt: string;
  /** CSS object-position for the in-page crop, e.g. "50% 30%". The full image opens on click. */
  position?: string;
};

/**
 * A folder of extra photos. Every image inside is picked up automatically
 * (sorted by file name: 01.jpg, 02.jpg, ...).
 */
export type GallerySlot = {
  folder: string;
  alt: string;
};

export type SocialId = "email" | "github" | "linkedin" | "hackthebox" | "portswigger" | "x" | "instagram" | "website";

export type SocialLink = {
  id: SocialId;
  label: string;
  /** Leave undefined until the real link is ready — links without href are not shown. */
  href?: string;
  /** Optional visible text, e.g. "@username" or "name@example.com". */
  handle?: string;
};

export type Prize = { amount: number; currency: "SAR" };

export type Milestone = {
  id: string;
  /** Short label above the title, e.g. "Stage 3" (also used as the badge). */
  label?: string;
  title: string;
  status: "achieved" | "current" | "upcoming" | "won";
  /** ISO dates. Omit `end` for a single day. */
  start: string;
  end?: string;
};

export type Achievement = {
  id: string;
  name: string;
  /** Short rank shown in the badge, e.g. "1st". */
  rank: string;
  /** e.g. "1st place" */
  placement: string;
  /** Short context line, e.g. the track or the event it was part of. */
  context?: string;
  prize?: Prize;
  /** ISO date (YYYY-MM-DD). Leave undefined if not confirmed. */
  date?: string;
  /** Optional one or two factual sentences. */
  note?: string;
  image?: MediaSlot;
  gallery?: GallerySlot;
  /** Optional progress line shown under the entry. */
  timeline?: Milestone[];
  /** The project built for this competition (optional, add later). */
  project?: {
    summary?: string;
    href?: string;
  };
};

export type BlackHatJourney = {
  id: string;
  name: string;
  location: string;
  milestones: Milestone[];
  gallery?: GallerySlot;
};

export type TimelineEntry = {
  id: string;
  /** ISO date. */
  start: string;
  /** ISO date, or "present". Omit for single-day events. */
  end?: string | "present";
  title: string;
  org?: string;
  body?: string;
  /** Photos shown side by side inside this entry. */
  photos?: MediaSlot[];
  /** Shows a certificate (by id from certifications.ts) inside this entry. */
  certificationId?: string;
};

export type Certification = {
  id: string;
  code: string;
  title: string;
  issuer: string;
  /** ISO date */
  date: string;
  image: MediaSlot;
  /** Official verification page. */
  verifyUrl?: string;
  credentialId?: string;
};

export type SkillGroup = {
  id: string;
  title: string;
  items: string[];
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  /** ISO date (YYYY-MM-DD). */
  date?: string;
  /** Only technologies actually used. */
  tech: string[];
  image?: MediaSlot;
  links?: {
    live?: string;
    repo?: string;
  };
};
