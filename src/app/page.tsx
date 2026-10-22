import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Learning } from "@/components/sections/Learning";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { achievements } from "@/data/achievements";
import { certifications } from "@/data/certifications";
import { profile } from "@/data/profile";
import { nav, siteUrl } from "@/lib/site";

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteUrl,
    address: { "@type": "PostalAddress", addressLocality: "Riyadh", addressCountry: "SA" },
    knowsAbout: ["Web Application Security", "Bug Hunting", "Capture The Flag", "Python", "Software Engineering", "Machine Learning", "Data Science"],
    award: achievements.map((a) => `${a.placement}, ${a.name}`),
    hasCredential: certifications.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: `${c.code}, ${c.title}`,
      recognizedBy: { "@type": "Organization", name: c.issuer },
      dateCreated: c.date,
    })),
    sameAs: profile.socials.filter((s) => s.href && s.id !== "email").map((s) => s.href),
  };

  return (
    <>
      <a
        href="#main"
        className="fixed start-4 top-2 z-50 -translate-y-20 rounded-full bg-fg px-4 py-2 text-sm font-medium text-white focus:translate-y-0"
      >
        Skip to content
      </a>

      <Navbar wordmark={profile.shortName} items={nav} />

      <main id="main">
        <Hero />
        <Achievements />
        <About />
        <Learning />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
