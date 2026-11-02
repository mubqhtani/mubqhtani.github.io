import { Gallery, Photo } from "@/components/ui/Lightbox";
import { achievements, blackHat } from "@/data/achievements";
import type { Achievement } from "@/data/types";
import { resolveGallery, resolveMedia } from "@/lib/assets";
import { formatDate, formatSAR } from "@/lib/format";
import { EventPass } from "./EventPass";
import { Section } from "./Section";

export function Achievements() {
  const [first, ...rest] = achievements;

  return (
    <Section id="achievements" title="Achievements">
      <div className="space-y-14 md:space-y-16">
        {first && <Entry a={first} wide />}
        {rest.length > 0 && (
          <div className="grid gap-14 sm:grid-cols-2 sm:gap-8">
            {rest.map((a) => (
              <Entry key={a.id} a={a} />
            ))}
          </div>
        )}
        <Passes />
      </div>
    </Section>
  );
}

function Entry({ a, wide }: { a: Achievement; wide?: boolean }) {
  const image = a.image && resolveMedia(a.image);
  const gallery = resolveGallery(a.gallery);
  const meta = [a.prize && formatSAR(a.prize.amount), a.context].filter(Boolean).join(" · ");

  return (
    <article id={a.id} aria-labelledby={`${a.id}-title`} className="scroll-mt-24">
      {image && (
        <Photo
          image={image}
          aspect={wide ? "aspect-[16/9]" : "aspect-[4/5]"}
          sizes={wide ? "(min-width: 1080px) 1016px, 100vw" : "(min-width: 1080px) 500px, (min-width: 640px) 50vw, 100vw"}
          position={a.image?.position}
          className="rounded-2xl"
        />
      )}
      <div className="mt-5 flex items-start gap-4">
        <span className="badge mt-0.5">{a.rank}</span>
        <div className="min-w-0">
          <h3 id={`${a.id}-title`} className="font-display text-xl font-semibold tracking-[-0.015em] md:text-2xl">
            {a.name}
          </h3>
          {meta && <p className="tabular mt-1 text-[15px] text-muted">{meta}</p>}
          {a.note && <p className="measure mt-3 text-[15px] leading-relaxed text-muted">{a.note}</p>}
          {a.project?.summary && <p className="measure mt-3 text-[15px] text-muted">{a.project.summary}</p>}
          {a.project?.href && (
            <a href={a.project.href} target="_blank" rel="noopener noreferrer" className="link mt-3 inline-block text-[15px]">
              View project
            </a>
          )}
          <Gallery images={gallery} title="More photos" />
        </div>
      </div>
    </article>
  );
}

function Passes() {
  const { steps } = blackHat;
  const current = steps.findIndex((s) => s.status === "current");
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {achievements.map(
        (a) =>
          a.timeline && (
            <EventPass
              key={a.id}
              id={`${a.id}-pass`}
              title={a.name}
              context={a.context?.split(" · ").at(-1)}
              score={a.rank}
              scoreRest="place"
              detail={[a.date && `Won ${formatDate(a.date)}`, a.prize && formatSAR(a.prize.amount)].filter(Boolean).join(" · ")}
              steps={a.timeline}
            />
          ),
      )}
      <EventPass
        id={blackHat.id}
        title={blackHat.name}
        context={blackHat.location}
        score={String(current + 1)}
        scoreRest={`of ${steps.length}`}
        detail={`${steps[current].label} · In progress`}
        steps={steps}
      >
        <Gallery images={resolveGallery(blackHat.gallery)} title="More photos" />
      </EventPass>
    </div>
  );
}
