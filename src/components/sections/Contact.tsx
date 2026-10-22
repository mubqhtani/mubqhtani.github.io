import { profile } from "@/data/profile";
import { Section } from "./Section";

/** Only rendered once at least one link in src/data/profile.ts has an href. */
export function Contact() {
  const links = profile.socials.filter((s) => s.href);
  if (links.length === 0) return null;

  return (
    <Section id="contact" title="Contact">
      <dl className="divide-y divide-line border-y border-line">
        {links.map((s) => (
          <div key={s.id} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-8">
            <dt className="text-[15px] text-muted">{s.label}</dt>
            <dd>
              <a
                href={s.href}
                target={s.id === "email" ? undefined : "_blank"}
                rel={s.id === "email" ? undefined : "noopener noreferrer"}
                className="link text-[17px]"
              >
                {s.handle ?? s.href?.replace(/^(mailto:|https?:\/\/)/, "")}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
