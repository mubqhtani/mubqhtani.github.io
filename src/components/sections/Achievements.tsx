import { Gallery, Photo } from "@/components/ui/Lightbox";
import { achievements, blackHat } from "@/data/achievements";
import type { Achievement } from "@/data/types";
import { resolveGallery, resolveMedia } from "@/lib/assets";
import { formatSAR } from "@/lib/format";
import { EventLine } from "./EventLine";
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
        <Competitions />
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

function Competitions() {
  const { steps } = blackHat;
  const current = steps.find((s) => s.status === "current");
  const done = steps.filter((s) => s.status === "done").length;
  return (
    <div className="space-y-12">
      {achievements.map(
        (a) =>
          a.timeline && (
            <EventLine
              key={a.id}
              id={`${a.id}-line`}
              title={a.name}
              meta={[a.placement, a.prize && formatSAR(a.prize.amount)].filter(Boolean).join(" · ")}
              steps={a.timeline}
            />
          ),
      )}
      <EventLine
        id={blackHat.id}
        title={blackHat.name}
        meta={`${current ? `${current.label} of ${steps.length}` : `${done} of ${steps.length} stages completed`} · ${blackHat.location}`}
        steps={steps}
      >
        <Gallery images={resolveGallery(blackHat.gallery)} title="More photos" />
      </EventLine>
    </div>
  );
}
