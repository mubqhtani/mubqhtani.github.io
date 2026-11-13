import type { SkillGroup } from "./types";

/**
 * Areas of study and practice — no levels, percentages or library lists.
 * Shown as three cards; keep each to one short line.
 */
export const skills: SkillGroup[] = [
  {
    id: "security",
    title: "Web security",
    items: ["OWASP Top 10", "Bug hunting", "CTFs"],
  },
  {
    id: "programming",
    title: "Software",
    items: ["Python", "Software engineering"],
  },
  {
    id: "ai-data",
    title: "AI & data",
    items: ["Machine learning", "Deep learning", "Data science"],
  },
];
