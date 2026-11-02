import type { TimelineStep } from "@/data/types";
import { formatDayRange } from "@/lib/format";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

type EventPassProps = {
  id: string;
  title: string;
  /** Top-right line, e.g. the track or the venue. */
  context?: string;
  /** The headline result, e.g. "1st" or "3". */
  score: string;
  /** Quieter text right after the score, e.g. "place" or "of 5". */
  scoreRest: string;
  /** One line under the score. */
  detail: string;
  steps: TimelineStep[];
  children?: React.ReactNode;
};

/**
 * Every competition is shown as an event pass, like the lanyards worn at these
 * events: a punched slot, the holder's name, the result, a tear line, then the
 * steps. Defenseathon and Black Hat must stay identical, so change this
 * component rather than either pass.
 */
export function EventPass({ id, title, context, score, scoreRest, detail, steps, children }: EventPassProps) {
  return (
    <article
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative flex scroll-mt-24 flex-col overflow-hidden rounded-[1.625rem] bg-fg px-6 pb-6 pt-11 text-white md:px-7"
    >
      <span aria-hidden className="absolute left-1/2 top-4 h-3 w-16 -translate-x-1/2 rounded-full bg-bg" />

      <div className="flex items-baseline justify-between gap-4 text-[13px] text-pass-muted">
        <span className="whitespace-nowrap">{profile.shortName}</span>
        {context && <span className="text-right">{context}</span>}
      </div>
      <h3 id={`${id}-title`} className="mt-1.5 font-display text-[1.375rem] font-semibold leading-tight tracking-[-0.015em]">
        {title}
      </h3>

      <p className="mt-5 font-display text-[5.5rem] font-bold leading-[0.9] tracking-[-0.05em] md:text-[6.5rem]">
        {score}
        <span className="ms-1.5 text-[2.125rem] font-semibold tracking-[-0.02em] text-pass-dim">{scoreRest}</span>
      </p>
      <p className="tabular mt-2 text-sm text-pass-muted">{detail}</p>

      {/* Tear line with a notch cut from each edge */}
      <div aria-hidden className="relative -mx-6 my-5 border-t-2 border-dashed border-pass-line md:-mx-7">
        <span className="absolute -left-2.5 -top-[11px] size-5 rounded-full bg-bg" />
        <span className="absolute -right-2.5 -top-[11px] size-5 rounded-full bg-bg" />
      </div>

      <ol>
        {steps.map((step, i) => {
          const key = step.status === "current" || step.status === "won";
          const upcoming = step.status === "upcoming";
          return (
            <li
              key={step.id}
              aria-current={step.status === "current" ? "step" : undefined}
              className={cn(
                "grid grid-cols-[1rem_1fr_auto] items-baseline gap-2.5 py-1.5 text-sm",
                key && "font-semibold text-pass-accent",
                upcoming && "text-pass-dim",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "size-2 self-center justify-self-center rounded-full",
                  step.status === "done" && "bg-white",
                  key && "bg-pass-accent ring-4 ring-pass-accent/20",
                  upcoming && "ring-[1.5px] ring-inset ring-pass-dim",
                )}
              />
              <span>
                {step.title}
                {upcoming && <span className="sr-only"> (not reached yet)</span>}
              </span>
              <time dateTime={step.start} className={cn("tabular whitespace-nowrap text-[12.5px]", !key && "text-pass-dim")}>
                {formatDayRange(step.start, step.end, i === steps.length - 1)}
              </time>
            </li>
          );
        })}
      </ol>
      {children}
    </article>
  );
}
