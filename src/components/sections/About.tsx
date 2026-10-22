import { profile } from "@/data/profile";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <div className="measure space-y-5 text-[17px] leading-relaxed text-fg/90">
          {profile.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted">What&apos;s next</h3>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {profile.goals.map((goal) => (
              <li key={goal} className="py-3 text-[15px] leading-snug">
                {goal}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
