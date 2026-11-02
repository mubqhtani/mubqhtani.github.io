import { Photo } from "@/components/ui/Lightbox";
import { projects } from "@/data/projects";
import type { Project } from "@/data/types";
import { resolveMedia } from "@/lib/assets";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Section } from "./Section";

/** Only rendered once src/data/projects.ts has entries. */
export function Projects() {
  if (projects.length === 0) return null;

  return (
    <Section id="projects" title="Projects">
      <div className={cn("grid gap-14", projects.length > 1 && "sm:grid-cols-2 sm:gap-8")}>
        {projects.map((p) => {
          const image = p.image && resolveMedia(p.image);
          return (
            <article
              key={p.id}
              aria-labelledby={`${p.id}-title`}
              className={cn(p.results && "grid gap-8 lg:grid-cols-2 lg:gap-12")}
            >
              <div className="min-w-0">
              {image && (
                <Photo
                  image={image}
                  aspect="aspect-[16/10]"
                  sizes="(min-width: 1080px) 500px, (min-width: 640px) 50vw, 100vw"
                  position={p.image?.position}
                  className="mb-5 rounded-2xl"
                />
              )}
              <div className="flex items-baseline justify-between gap-4">
                <h3 id={`${p.id}-title`} className="font-display text-xl font-semibold tracking-[-0.015em]">
                  {p.title}
                </h3>
                {p.date && (
                  <p className="tabular shrink-0 text-sm text-muted">
                    <time dateTime={p.date}>{formatDate(p.date)}</time>
                  </p>
                )}
              </div>
              <p className="measure mt-2 text-[15px] leading-relaxed text-muted">{p.summary}</p>
              {p.tech.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <li key={t} className="rounded-full bg-surface px-3 py-1 text-sm ring-1 ring-line">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
              {(p.links?.live || p.links?.repo) && (
                <p className="mt-4 flex gap-5 text-[15px]">
                  {p.links.live && (
                    <a href={p.links.live} target="_blank" rel="noopener noreferrer" className="link">
                      Live site
                    </a>
                  )}
                  {p.links.repo && (
                    <a href={p.links.repo} target="_blank" rel="noopener noreferrer" className="link break-all">
                      {p.links.repo.replace(/^https?:\/\//, "")}
                    </a>
                  )}
                </p>
              )}
              </div>
              {p.results && <Results results={p.results} />}
            </article>
          );
        })}
      </div>
    </Section>
  );
}

/** One bar per row on a 0–100 scale. Only the best result gets the accent color. */
function Results({ results }: { results: NonNullable<Project["results"]> }) {
  return (
    <figure className="m-0 rounded-2xl bg-surface p-5 ring-1 ring-line md:p-6">
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
