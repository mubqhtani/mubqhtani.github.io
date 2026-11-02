import { skills } from "@/data/skills";
import { Section } from "./Section";

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-3">
        {skills.map((group) => (
          <section key={group.id} aria-labelledby={`skill-${group.id}`} className="rounded-2xl bg-surface p-5 ring-1 ring-line">
            <h3 id={`skill-${group.id}`} className="font-display text-lg font-semibold tracking-[-0.01em]">
              {group.title}
            </h3>
            <dl className="mt-3 divide-y divide-line">
              {group.rows.map((row) => (
                <div key={row.label} className="grid gap-2 py-3 first:pt-0 last:pb-0 sm:grid-cols-[9.5rem_1fr] sm:items-center">
                  <dt className="text-sm text-muted">{row.label}</dt>
                  <dd className="flex flex-wrap gap-2">
                    {row.items.map((item) => (
                      <span key={item} className="rounded-full bg-bg px-3 py-1 text-sm ring-1 ring-line">
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </Section>
  );
}
