import { profile } from "@/data/profile";
import { Section } from "./Section";

/** A short paragraph about him, in his own voice, at a comfortable reading size. */
export function About() {
  return (
    <Section id="about" title="About">
      <div className="max-w-[44rem] space-y-5 text-[clamp(1.125rem,1rem+0.4vw,1.3rem)] leading-[1.7] text-fg/85 text-pretty">
        {profile.about.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </Section>
  );
}
