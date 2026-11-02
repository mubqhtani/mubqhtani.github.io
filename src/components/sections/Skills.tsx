import { skills } from "@/data/skills";
import { Section } from "./Section";

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <dl className="grid gap-3 md:grid-cols-2">
        {skills.map((group) => (
          <div key={group.id} className="rounded-2xl bg-surface p-5 ring-1 ring-line">
            <dt className="font-display text-lg font-semibold tracking-[-0.01em]">{group.title}</dt>
            <dd className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="rounded-full bg-bg px-3 py-1 text-sm ring-1 ring-line">
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
