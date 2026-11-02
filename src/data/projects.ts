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
 *   logo: { src: "/images/projects/my-project/logo", alt: "..." },
 *   links: { live: "https://...", repo: "https://github.com/..." },
 * }
 */
export const projects: Project[] = [
  {
    id: "erth",
    title: "Erth",
    role: "Designer and content lead",
    summary:
      "A Saudi initiative by young Saudis that introduces Saudi culture and heritage: the places, stories and details that shape our identity, told in our generation's language. We research, verify, then tell the story. Our first episode covers Al-Muaiqiliyah in the heart of Riyadh.",
    tech: ["Design", "Content", "Saudi heritage"],
    logo: { src: "/images/projects/erth/logo", alt: "Erth logo" },
    links: { tiktok: "https://www.tiktok.com/@erth_initiative" },
  },
  {
    id: "titanic-capstone",
    title: "Titanic Survival Prediction",
    summary:
      "My capstone project. I cleaned the Titanic passenger data, then trained Logistic Regression, Random Forest, KNN and a small neural network to predict who survived. Random Forest did best, with 83% accuracy and an F1 score of 0.76. The main lesson: a more complex model isn't always better.",
    date: "2026-06-03",
    tech: ["Python", "pandas", "scikit-learn", "TensorFlow (Keras)", "Matplotlib", "seaborn"],
    // Figures from report.md in the project's repository.
    results: {
      title: "Results on the test set",
      rows: [
        { label: "Random Forest", value: 83, f1: "0.76", best: true },
        { label: "KNN", value: 81, f1: "0.74" },
        { label: "Logistic Regression", value: 80, f1: "0.72" },
        { label: "Neural Network", value: 80, f1: "0.72" },
      ],
    },
    links: { repo: "https://github.com/qhtanI/Mubaraks-Capstone-Project" },
  },
];
