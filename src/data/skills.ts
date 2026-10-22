import type { SkillGroup } from "./types";

/** Areas of study and practice — no levels or percentages. */
export const skills: SkillGroup[] = [
  { id: "security", title: "Security", items: ["Web application security", "Bug hunting", "CTF challenges"] },
  { id: "programming", title: "Programming", items: ["Python"] },
  { id: "software", title: "Software", items: ["Software development", "Software engineering"] },
  { id: "ai-data", title: "AI & data", items: ["Machine learning", "Data science", "NumPy"] },
  { id: "practice", title: "Practice platforms", items: ["Hack The Box", "PortSwigger Web Security Academy"] },
];
