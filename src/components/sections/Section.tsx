/** A page section that opens with a clear heading. */
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
  return (
    <section id={id} data-nav={id} aria-labelledby={`${id}-title`} className="container-x">
      <div className="border-t border-line py-14 md:py-20">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h2 id={`${id}-title`} className="section-title">
            {title}
          </h2>
          {note && <p className="tabular text-[15px] text-muted">{note}</p>}
        </div>
        <div className="mt-8 md:mt-10">{children}</div>
      </div>
    </section>
  );
}
