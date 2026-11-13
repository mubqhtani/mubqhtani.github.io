import { nav } from "@/lib/site";

/**
 * A page section: a numbered mono label with a short rule, then the serif
 * heading. Sections are separated by space, not full-width lines, the same
 * way the hero sits under the navbar.
 */
export function Section({
  id,
  title,
  note,
  children,
}: {
  id: string;
  title: string;
  /** Short fact shown across from the heading. */
  note?: string;
  children: React.ReactNode;
}) {
  // Numbered in the order the navbar lists sections, so the two always agree.
  const index = nav.findIndex((n) => n.id === id);
  return (
    <section id={id} data-nav={id} aria-labelledby={`${id}-title`} className="container-x">
      <div className="py-14 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            {index >= 0 && (
              <p aria-hidden className="label mb-3 flex items-center gap-3 text-accent/80">
                {String(index + 1).padStart(2, "0")}
                <span className="h-px w-10 bg-accent/40" />
              </p>
            )}
            <h2 id={`${id}-title`} className="section-title">
              {title}
            </h2>
          </div>
          {note && <p className="label tabular">{note}</p>}
        </div>
        <div className="mt-10 md:mt-12">{children}</div>
      </div>
    </section>
  );
}
