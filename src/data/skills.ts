import type { SkillGroup } from "./types";

/** Areas of study and practice — no levels or percentages. */
export const skills: SkillGroup[] = [
  {
    id: "security",
    title: "Security",
    rows: [
      { label: "Focus", items: ["Web application security", "Bug hunting", "CTF challenges"] },
      { label: "Web vulnerabilities", items: ["OWASP Top 10"] },
      { label: "Platforms", items: ["Hack The Box", "PortSwigger Web Security Academy"] },
    ],
  },
  {
    id: "programming",
    title: "Programming & software",
    rows: [
      { label: "Languages", items: ["Python"] },
      { label: "Areas", items: ["Software development", "Software engineering"] },
    ],
  },
  {
    id: "ai-data",
    title: "AI & data",
    // Libraries and techniques used in the capstone project.
    rows: [
      { label: "Areas", items: ["Machine learning", "Deep learning", "Data science", "Data analysis"] },
      { label: "Libraries", items: ["NumPy", "pandas", "scikit-learn", "TensorFlow", "Keras", "Matplotlib", "seaborn"] },
      { label: "Models", items: ["Logistic Regression", "Random Forest", "K-Nearest Neighbors", "Neural networks"] },
      { label: "Techniques", items: ["Data cleaning", "Feature encoding", "Feature scaling", "Data visualization", "Model evaluation"] },
    ],
  },
];
