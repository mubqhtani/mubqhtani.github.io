import type { SkillGroup } from "./types";

/** Areas of study and practice — no levels or percentages. */
export const skills: SkillGroup[] = [
  { id: "security", title: "Security", items: ["Web application security", "Bug hunting", "CTF challenges"] },
  { id: "programming", title: "Programming & software", items: ["Python", "Software development", "Software engineering"] },
  { id: "practice", title: "Practice platforms", items: ["Hack\u00A0The\u00A0Box", "PortSwigger Web Security Academy"] },
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
