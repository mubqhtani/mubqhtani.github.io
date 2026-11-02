import { Photo } from "@/components/ui/Lightbox";
import { projects } from "@/data/projects";
import { resolveMedia } from "@/lib/assets";
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
            <article key={p.id} aria-labelledby={`${p.id}-title`}>
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
                {p.year && <p className="tabular text-sm text-muted">{p.year}</p>}
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
                    <a href={p.links.repo} target="_blank" rel="noopener noreferrer" className="link">
                      Source code
                    </a>
                  )}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </Section>
  );
}
