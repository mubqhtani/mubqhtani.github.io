import type { TimelineStep } from "@/data/types";
import { formatDayRange } from "@/lib/format";
import { cn } from "@/lib/utils";

type EventLineProps = {
  id: string;
  title: string;
  /** Right-aligned summary, e.g. "1st place · SAR 25,000". */
  meta: string;
  steps: TimelineStep[];
  children?: React.ReactNode;
};

/**
 * One clean line with a stop for each step: horizontal from the md breakpoint,
 * vertical on phones.
 */
export function StepLine({ steps }: { steps: TimelineStep[] }) {
  return (
    <ol className="md:grid md:auto-cols-fr md:grid-flow-col">
      {steps.map((step, i) => {
        const next = steps[i + 1];
        const key = step.status === "current" || step.status === "won";
        const moved = step.postponed;
        const upcoming = step.status === "upcoming" && !moved;
        const last = i === steps.length - 1;
        return (
          <li
            key={step.id}
            aria-current={step.status === "current" ? "step" : undefined}
            className="relative pb-5 ps-7 last:pb-0 md:pb-0 md:pe-3.5 md:ps-0"
          >
            {next && (
              <span
                aria-hidden
                className={cn(
                  "absolute bottom-0 start-[7px] top-2 md:bottom-auto md:end-0 md:start-0 md:top-[7px]",
                  // A postponed stop is reached by a dashed line: the programme is on hold there.
                  next.postponed
                    ? "w-0 border-s-2 border-dashed border-warn/45 md:h-0 md:w-auto md:border-s-0 md:border-t-2"
                    : cn("w-0.5 md:h-0.5 md:w-auto", next.status === "upcoming" ? "bg-line" : "bg-fg"),
                )}
              />
            )}
            <span
              aria-hidden
              className={cn(
                "absolute start-0 top-0.5 block size-4 rounded-full md:relative md:top-0",
                step.status === "done" && "bg-fg",
                key && "bg-accent ring-[5px] ring-accent-soft",
                upcoming && "bg-bg ring-2 ring-inset ring-muted/40",
                moved && "border-2 border-dashed border-warn bg-warn-soft",
              )}
            />
            <span
              className={cn(
                "block text-[15px] font-medium leading-snug md:mt-3",
                key && "font-semibold text-accent",
                upcoming && "text-muted",
              )}
            >
              {step.title}
              {upcoming && <span className="sr-only"> (not reached yet)</span>}
            </span>
            {moved ? (
              <>
                <span className="sr-only"> (postponed)</span>
                {/* The dashed line and ring say "postponed"; the new date, if any, sits above the struck original. */}
                {moved.start && (
                  <time dateTime={moved.start} className="tabular block text-[13px] font-medium text-warn">
                    {formatDayRange(moved.start, moved.end, true)}
                  </time>
                )}
                <span className="tabular block text-[13px] text-muted">
                  <span className="sr-only">Originally </span>
                  <del className="decoration-muted/70">
                    <time dateTime={step.start}>{formatDayRange(step.start, step.end, true)}</time>
                  </del>
                </span>
              </>
            ) : (
              <time dateTime={step.start} className="tabular block text-[13px] text-muted">
                {step.dateLabel ?? formatDayRange(step.start, step.end, last)}
              </time>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/**
 * A competition with its line of stops. Defenseathon and Black Hat must stay
 * identical, so change this component rather than either competition.
 */
export function EventLine({ id, title, meta, steps, children }: EventLineProps) {
  return (
    <article id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 id={`${id}-title`} className="font-display text-xl font-semibold tracking-[-0.015em] md:text-2xl">
          {title}
        </h3>
        <p className="tabular text-[15px] text-muted">{meta}</p>
      </div>
      <div className="mt-6">
        <StepLine steps={steps} />
      </div>
      {children}
    </article>
  );
}
