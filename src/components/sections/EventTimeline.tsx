import { ArrowDown, Check, CornerDownRight, CornerUpRight, Flag, Trophy } from "lucide-react";
import type { TimelineStep } from "@/data/types";
import { formatDate, formatRange } from "@/lib/format";
import { cn } from "@/lib/utils";

type EventTimelineProps = {
  id: string;
  title: string;
  /** Rank or stage shown in the badge. */
  badge: string;
  /** Outlined badge = still in progress. */
  ongoing?: boolean;
  meta: string;
  steps: TimelineStep[];
  children?: React.ReactNode;
};

function StepIcon({ step, last }: { step: TimelineStep; last: boolean }) {
  if (step.status === "done") return <Check className="size-4 shrink-0 text-accent" strokeWidth={2.5} aria-hidden />;
  if (step.status === "won") return <Trophy className="size-4 shrink-0" aria-hidden />;
  if (step.status === "current") return <span aria-hidden className="m-1 size-2 shrink-0 rounded-full bg-accent" />;
  return last ? <Flag className="size-4 shrink-0" aria-hidden /> : null;
}

/**
 * The timeline card used by every competition: boxes that step up and down
 * with elbow arrows between them. Stacks below 1024px.
 */
export function EventTimeline({ id, title, badge, ongoing, meta, steps, children }: EventTimelineProps) {
  return (
    <article
      id={id}
      aria-labelledby={`${id}-timeline-title`}
      className="scroll-mt-24 rounded-2xl bg-surface p-6 ring-1 ring-line md:p-8"
    >
      <div className="flex items-start gap-4">
        <span className={cn("badge mt-0.5", ongoing && "badge-outline")}>{badge}</span>
        <div className="min-w-0">
          <h3 id={`${id}-timeline-title`} className="font-display text-xl font-semibold tracking-[-0.015em] md:text-2xl">
            {title}
          </h3>
          <p className="tabular mt-1 text-[15px] text-muted">{meta}</p>
        </div>
      </div>

      <ol className="mt-8 flex flex-col lg:grid lg:grid-cols-5 lg:grid-rows-2 lg:gap-3">
        {steps.map((step, i) => {
          const next = steps[i + 1];
          const top = i % 2 === 0;
          const Elbow = top ? CornerDownRight : CornerUpRight;
          const highlighted = step.status === "current" || step.status === "won";
          const upcoming = step.status === "upcoming";
          return (
            <li key={step.id} className="relative" style={{ gridColumn: i + 1, gridRow: top ? 1 : 2 }}>
              <div
                className={cn(
                  "flex h-full flex-col justify-center rounded-xl px-4 py-3.5",
                  highlighted && "bg-accent-soft text-accent",
                  step.status === "done" && "bg-bg ring-1 ring-line ring-inset",
                  upcoming && "text-muted ring-1 ring-line ring-inset",
                )}
              >
                {step.label ? (
                  <>
                    <p className="flex items-center gap-1.5 text-sm font-medium">
                      <StepIcon step={step} last={!next} />
                      {step.label}
                      {step.status === "current" && " · Now"}
                      {upcoming && <span className="sr-only"> (not reached yet)</span>}
                    </p>
                    <p className="mt-1 font-medium leading-snug">{step.title}</p>
                  </>
                ) : (
                  <p className={cn("flex items-center gap-1.5 font-medium leading-snug", highlighted && "font-semibold")}>
                    <StepIcon step={step} last={!next} />
                    {step.title}
                  </p>
                )}
                <p className={cn("tabular mt-1 text-sm", !highlighted && "text-muted")}>
                  <time dateTime={step.start}>
                    {step.end ? formatRange(step.start, step.end) : formatDate(step.start)}
                  </time>
                </p>
              </div>
              {next && (
                <>
                  <span aria-hidden className="grid place-items-center py-2 text-muted lg:hidden">
                    <ArrowDown className="size-4" strokeWidth={1.5} />
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 hidden h-full place-items-center lg:grid",
                      top ? "top-[calc(100%+0.75rem)]" : "bottom-[calc(100%+0.75rem)]",
                      next.status === "upcoming" ? "text-muted" : "text-accent",
                    )}
                  >
                    <Elbow className="size-8" strokeWidth={1.25} />
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
      {children}
    </article>
  );
}
