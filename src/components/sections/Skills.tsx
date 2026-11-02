import { skills } from "@/data/skills";
import { cn } from "@/lib/utils";
import { Section } from "./Section";

function Chips({ items }: { items: string[] }) {
  return (
    <span className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="rounded-full bg-bg px-3 py-1 text-sm ring-1 ring-line">
          {item}
        </span>
      ))}
    </span>
  );
}

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <dl className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <div
            key={group.id}
            className={cn(
              "rounded-2xl bg-surface p-5 ring-1 ring-line",
              group.rows ? "md:col-span-2 lg:col-span-3" : i === 2 && "md:col-span-2 lg:col-span-1",
            )}
          >
            <dt className="font-display text-lg font-semibold tracking-[-0.01em]">{group.title}</dt>
            <dd className="mt-3">
              {group.items && <Chips items={group.items} />}
              {group.rows && (
                <dl className="divide-y divide-line">
                  {group.rows.map((row) => (
                    <div key={row.label} className="grid gap-2 py-3 first:pt-0 last:pb-0 sm:grid-cols-[7rem_1fr] sm:items-center">
                      <dt className="text-sm text-muted">{row.label}</dt>
                      <dd>
                        <Chips items={row.items} />
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
