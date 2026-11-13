import { BrainCircuit, Code2, ShieldAlert } from "lucide-react";
import { skills } from "@/data/skills";
import { Section } from "./Section";

const ICONS = { security: ShieldAlert, programming: Code2, "ai-data": BrainCircuit } as const;

/** Three cards: an icon, the area, and one short line of what it covers. */
export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <ul className="grid gap-3 sm:grid-cols-3">
        {skills.map((group) => {
          const Icon = ICONS[group.id as keyof typeof ICONS];
          return (
            <li key={group.id} className="rounded-xl bg-surface/70 p-5 ring-1 ring-line">
              {Icon && (
                <span className="grid size-10 place-items-center rounded-lg bg-accent-soft text-accent">
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
              )}
              <h3 className="mt-5 font-display text-2xl leading-tight">{group.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{group.items.join(" · ")}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
