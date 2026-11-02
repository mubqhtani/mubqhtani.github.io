import type { Project } from "./types";

/**
 * Projects. The Projects section (and its nav link) only appears once this
 * list has at least one entry. Template:
 *
 * {
 *   id: "my-project",
 *   title: "Project name",
 *   summary: "What it does, in one or two sentences.",
 *   date: "2026-06-03",
 *   tech: ["Python", "NumPy"],
 *   image: { src: "/images/projects/my-project/cover", alt: "..." },
 *   links: { live: "https://...", repo: "https://github.com/..." },
 * }
 */
export const projects: Project[] = [
  {
    id: "titanic-capstone",
    title: "Titanic Survival Prediction",
    summary:
      "My capstone project. I cleaned the Titanic passenger data, then trained Logistic Regression, Random Forest, KNN and a small neural network to predict who survived. Random Forest did best, with 83% accuracy and an F1 score of 0.76. The main lesson: a more complex model isn't always better.",
    date: "2026-06-03",
    tech: ["Python", "pandas", "scikit-learn", "TensorFlow (Keras)", "Matplotlib", "seaborn"],
    links: { repo: "https://github.com/qhtanI/Mubaraks-Capstone-Project" },
  },
];
