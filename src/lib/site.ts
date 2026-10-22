import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

/** Set NEXT_PUBLIC_SITE_URL to your real domain when deploying (used for SEO / Open Graph URLs). */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const nav = [
  { id: "achievements", label: "Achievements" },
  { id: "about", label: "About" },
  { id: "learning", label: "Learning" },
  { id: "skills", label: "Skills" },
  // Projects and Contact only exist once they have real content.
  ...(projects.length > 0 ? [{ id: "projects", label: "Projects" }] : []),
  ...(profile.socials.some((s) => s.href) ? [{ id: "contact", label: "Contact" }] : []),
];
