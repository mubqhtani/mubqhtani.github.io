import Image from "next/image";
import { projects } from "@/data/projects";
import type { Project } from "@/data/types";
import { resolveMedia } from "@/lib/assets";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Section } from "./Section";

const panel = "rounded-2xl bg-surface p-5 ring-1 ring-line md:p-6";

/** Only rendered once src/data/projects.ts has entries. */
export function Projects() {
  if (projects.length === 0) return null;

  return (
    <Section id="projects" title="Projects">
      <div className="divide-y divide-line">
        {projects.map((p) => (
          <ProjectRow key={p.id} project={p} />
        ))}
      </div>
    </Section>
  );
}

/** Every project uses the same row: details on the left, one panel on the right. */
function ProjectRow({ project: p }: { project: Project }) {
  const logo = p.logo && resolveMedia(p.logo);
  const subtitle = [p.role, p.date && formatDate(p.date)].filter(Boolean).join(" · ");
  const links = [p.links?.live, p.links?.tiktok, p.links?.repo].filter(Boolean) as string[];

  return (
    <article
      aria-labelledby={`${p.id}-title`}
      className="grid gap-6 py-10 first:pt-0 last:pb-0 lg:grid-cols-2 lg:gap-12"
    >
      <div className="min-w-0">
        <h3 id={`${p.id}-title`} className="font-display text-xl font-semibold tracking-[-0.015em]">
          {p.title}
        </h3>
        {subtitle && <p className="tabular mt-0.5 text-[15px] text-fg/85">{subtitle}</p>}
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.summary}</p>
        {p.tech.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <li key={t} className="rounded-full bg-surface px-3 py-1 text-sm ring-1 ring-line">
                {t}
              </li>
            ))}
          </ul>
        )}
        {links.map((href) => (
          <p key={href} className="mt-4 text-[15px]">
            <a href={href} target="_blank" rel="noopener noreferrer" className="link break-all">
              {href.replace(/^https?:\/\/(www\.)?/, "")}
            </a>
          </p>
        ))}
      </div>

      {p.results && <Results results={p.results} />}
      {logo && (
        <div className={cn(panel, "grid place-items-center")}>
          <span className="relative block aspect-square w-44 overflow-hidden rounded-full lg:w-52">
            <Image src={logo.src} alt={logo.alt} fill sizes="208px" className="object-cover" />
          </span>
        </div>
      )}
    </article>
  );
}

/** One bar per row on a 0–100 scale. Only the best result gets the accent color. */
function Results({ results }: { results: NonNullable<Project["results"]> }) {
  return (
    <figure className={cn("m-0", panel)}>
      <figcaption className="font-display text-lg font-semibold tracking-[-0.01em]">{results.title}</figcaption>
      <table className="mt-4 w-full border-collapse text-sm">
        <thead>
          <tr className="text-left text-muted">
            <th scope="col" className="pb-2 font-normal">
              Model
            </th>
            <th scope="col" className="pb-2 pl-3 font-normal">
              Accuracy
            </th>
            <th scope="col" className="pb-2 pl-3 text-right font-normal">
              F1
            </th>
          </tr>
        </thead>
        <tbody>
          {results.rows.map((row) => (
            <tr key={row.label}>
              <th scope="row" className={cn("whitespace-nowrap py-2 text-left", row.best ? "font-semibold" : "font-normal")}>
                {row.label}
              </th>
              <td className="w-full py-2 pl-3">
                <span className="flex items-center gap-2.5">
                  <span aria-hidden className="h-2 flex-1 rounded-full bg-bg">
                    <span
                      className={cn("block h-full rounded-full", row.best ? "bg-accent" : "bg-muted/45")}
                      style={{ width: `${row.value}%` }}
                    />
                  </span>
                  <span className={cn("tabular", row.best && "font-semibold")}>{row.value}%</span>
                </span>
              </td>
              <td className={cn("tabular py-2 pl-3 text-right", row.best && "font-semibold")}>{row.f1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
