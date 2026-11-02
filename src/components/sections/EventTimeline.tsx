import type { TimelineStep } from "@/data/types";
import { formatDate, formatRange } from "@/lib/format";
import { cn } from "@/lib/utils";

type EventTimelineProps = {
  id: string;
  title: string;
  /** The headline result, e.g. "1st" or "3". */
  score: string;
  /** Quieter text right after the score, e.g. " place" or "/5". */
  scoreRest: string;
  meta: string;
  steps: TimelineStep[];
  children?: React.ReactNode;
};

/**
 * The card used by every competition: one big result first, then a thin
 * progress bar with a segment for each step. Defenseathon and Black Hat must
 * stay identical, so change this component rather than either card.
 */
export function EventTimeline({ id, title, score, scoreRest, meta, steps, children }: EventTimelineProps) {
  return (
    <article
      id={id}
      aria-labelledby={`${id}-timeline-title`}
      className="scroll-mt-24 rounded-2xl bg-surface p-6 ring-1 ring-line md:p-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          <h3 id={`${id}-timeline-title`} className="font-display text-xl font-semibold tracking-[-0.015em]">
            {title}
          </h3>
          <p className="mt-2 font-display text-[2.75rem] font-bold leading-none tracking-[-0.035em] md:text-[3.5rem]">
            {score}
            <span className="text-muted/70">{scoreRest}</span>
          </p>
        </div>
        <p className="tabular text-[15px] text-muted">{meta}</p>
      </div>

      <div aria-hidden className="mt-6 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
        {steps.map((step) => (
          <span
            key={step.id}
            className={cn(
              "h-2 rounded-full",
              step.status === "done" && "bg-fg",
              (step.status === "current" || step.status === "won") && "bg-accent",
              step.status === "upcoming" && "bg-line",
            )}
          />
        ))}
      </div>

      <ol
        className="mt-3 grid gap-2.5 md:grid-cols-[repeat(var(--steps),1fr)] md:gap-1.5"
        style={{ "--steps": steps.length } as React.CSSProperties}
      >
        {steps.map((step) => {
          const key = step.status === "current" || step.status === "won";
          const upcoming = step.status === "upcoming";
          return (
            <li
              key={step.id}
              aria-current={step.status === "current" ? "step" : undefined}
              className="flex justify-between gap-4 text-[15px] leading-snug md:block md:pe-3 md:text-sm"
            >
              <span className={cn("font-medium", key && "font-semibold text-accent", upcoming && "text-muted")}>
                {step.title}
                {upcoming && <span className="sr-only"> (not reached yet)</span>}
              </span>
              <time
                dateTime={step.start}
                className="tabular shrink-0 text-right text-[13px] text-muted md:mt-0.5 md:block md:text-left"
              >
                {step.end ? formatRange(step.start, step.end) : formatDate(step.start)}
              </time>
            </li>
          );
        })}
      </ol>
      {children}
    </article>
  );
}
