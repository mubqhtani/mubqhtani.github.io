import type { Project } from "./types";

/**
 * Projects. The Projects section (and its nav link) only appears once this
 * list has at least one entry. Template:
 *
 * {
 *   id: "my-project",
 *   title: "Project name",
 *   summary: "What it does, in one or two sentences.",
 *   year: "2026",
 *   tech: ["Python", "NumPy"],
 *   image: { src: "/images/projects/my-project/cover", alt: "..." },
 *   links: { live: "https://...", repo: "https://github.com/..." },
 * }
 */
export const projects: Project[] = [];
