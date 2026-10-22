import { skills } from "@/data/skills";
import { Section } from "./Section";

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <dl className="divide-y divide-line border-y border-line">
        {skills.map((group) => (
          <div key={group.id} className="grid gap-3 py-5 sm:grid-cols-[11rem_1fr] sm:items-center sm:gap-8">
            <dt className="text-[15px] font-medium">{group.title}</dt>
            <dd className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="rounded-full bg-surface px-3 py-1 text-sm ring-1 ring-line">
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
