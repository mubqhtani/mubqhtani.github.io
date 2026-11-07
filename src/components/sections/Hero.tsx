import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import { achievements, blackHat } from "@/data/achievements";
import { certifications } from "@/data/certifications";
import { profile } from "@/data/profile";
import { resolveMedia } from "@/lib/assets";
import { formatDate, formatMonth, formatSAR } from "@/lib/format";
import { cn } from "@/lib/utils";

type Highlight = { href: string; badge: string; title: string; meta: string; ongoing?: boolean };

/** The summary visitors see first; every row links to its full entry. */
function getHighlights(): Highlight[] {
  const current = blackHat.steps.find((s) => s.status === "current");
  const lastDone = blackHat.steps.findLast((s) => s.status === "done");
  const final = blackHat.steps.at(-1);
  const finalStart = final?.postponed?.start ?? final?.start;
  // While between stages, show the last finished stage and when the final is.
  const blackHatRow = current
    ? { badge: current.label ?? "Now", meta: "In progress" }
    : lastDone && finalStart
      ? { badge: lastDone.label ?? "Now", meta: `Final: ${formatDate(finalStart)}` }
      : null;
  return [
    ...achievements.map((a) => ({
      href: `#${a.id}`,
      badge: a.rank,
      title: a.name,
      // Keep each row to one line: the prize if there is one, otherwise the context.
      meta: a.prize ? formatSAR(a.prize.amount) : (a.context ?? ""),
    })),
    ...(blackHatRow ? [{ href: `#${blackHat.id}`, title: blackHat.name, ongoing: true, ...blackHatRow }] : []),
    ...certifications.map((c) => ({
      href: "#learning",
      badge: c.code,
      title: `${c.issuer} certification`,
      meta: formatMonth(c.date),
    })),
  ];
}

export function Hero() {
  const portrait = resolveMedia(profile.portrait);
  const highlights = getHighlights();

  return (
    <header id="top" className="container-x pb-14 pt-28 md:pb-20 md:pt-36">
      <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          {portrait && (
            <div className="relative mb-8 size-20 overflow-hidden rounded-full bg-line">
              <Image src={portrait.src} alt={portrait.alt} fill sizes="80px" preload className="object-cover" />
            </div>
          )}
          <p className="text-[15px] text-muted">
            {profile.location} · Age {profile.age}
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.75rem,1.9rem+3.8vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.035em]">
            {profile.shortName}
          </h1>
          <p className="mt-4 text-xl font-medium text-fg md:text-2xl">{profile.role}</p>
          <p className="measure mt-5 text-[17px] leading-relaxed text-muted">{profile.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#achievements"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-[15px] font-medium text-white transition-colors hover:bg-accent"
            >
              View achievements
              <ArrowDown className="size-4" aria-hidden />
            </a>
            <a
              href="#about"
              className="inline-flex h-11 items-center rounded-full px-5 text-[15px] font-medium text-fg ring-1 ring-line transition-colors ring-inset hover:bg-surface"
            >
              About me
            </a>
          </div>
        </div>

        <section aria-labelledby="highlights-title" className="rounded-2xl bg-surface p-2 shadow-[0_1px_2px_rgb(14_22_40/0.04),0_8px_24px_-12px_rgb(14_22_40/0.12)] ring-1 ring-line">
          <h2 id="highlights-title" className="px-4 pb-2 pt-3 text-sm font-medium text-muted">
            Highlights
          </h2>
          <ul>
            {highlights.map((h) => (
              <li key={h.title}>
                <a href={h.href} className="group flex items-center gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-bg">
                  <span className={cn("badge w-[4.75rem] shrink-0", h.ongoing && "badge-outline")}>{h.badge}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium leading-snug">{h.title}</span>
                    {h.meta && <span className="tabular block text-sm text-muted">{h.meta}</span>}
                  </span>
                  <ArrowRight
                    aria-hidden
                    className="size-4 shrink-0 text-muted opacity-0 transition-[opacity,transform] group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </header>
  );
}
