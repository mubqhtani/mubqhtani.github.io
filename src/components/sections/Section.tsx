/** A page section that opens with a clear heading. */
export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} data-nav={id} aria-labelledby={`${id}-title`} className="container-x">
      <div className="border-t border-line py-14 md:py-20">
        <h2 id={`${id}-title`} className="section-title">
          {title}
        </h2>
        <div className="mt-8 md:mt-10">{children}</div>
      </div>
    </section>
  );
}
