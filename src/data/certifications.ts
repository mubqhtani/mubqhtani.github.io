import type { Certification } from "./types";

/**
 * Certificates. Each one is shown inside its matching entry in education.ts
 * (via `certificationId`).
 * Certificate image → public/images/certificates/<id>.jpg
 */
export const certifications: Certification[] = [
  {
    id: "pcep",
    code: "PCEP",
    title: "Certified Entry-Level Python Programmer",
    issuer: "Python Institute",
    date: "2026-06-03",
    image: {
      src: "/images/certificates/pcep",
      alt: "PCEP certificate issued by Python Institute to Mubarak Saad Al-Qahtani, June 3, 2026",
    },
    // Both values are printed on the certificate itself.
    verifyUrl: "https://verify.openedg.org/",
    credentialId: "ZoPj.rFHx.mcwQ",
  },
];
