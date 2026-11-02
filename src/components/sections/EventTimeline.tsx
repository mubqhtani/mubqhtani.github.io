import { ArrowDown, CornerDownRight, CornerUpRight, Trophy } from "lucide-react";
import type { Achievement, TimelineStep } from "@/data/types";
import { formatDate, formatRange } from "@/lib/format";
import { cn } from "@/lib/utils";

function when(step: TimelineStep) {
  return step.end ? formatRange(step.start, step.end) : formatDate(step.start);
}

/**
 * A competition's timeline: boxes that step up and down with elbow arrows
 * between them, in a card that matches the Black Hat one. Stacks below 1024px.
 */
export function EventTimeline({ achievement: a, steps }: { achievement: Achievement; steps: TimelineStep[] }) {
  const first = steps[0];
  const last = steps[steps.length - 1];

  return (
    <article
      aria-labelledby={`${a.id}-timeline-title`}
      className="rounded-2xl bg-surface p-6 ring-1 ring-line md:p-8"
    >
      <div className="flex items-start gap-4">
        <span className="badge mt-0.5">{a.rank}</span>
        <div className="min-w-0">
          <h3 id={`${a.id}-timeline-title`} className="font-display text-xl font-semibold tracking-[-0.015em] md:text-2xl">
            {a.name}
          </h3>
          <p className="tabular mt-1 text-[15px] text-muted">
            Timeline · {formatRange(first.start, last.end ?? last.start)}
          </p>
        </div>
      </div>

      <ol className="mt-8 flex flex-col lg:grid lg:grid-cols-5 lg:grid-rows-2 lg:gap-3">
        {steps.map((step, i) => {
          const next = steps[i + 1];
          const top = i % 2 === 0;
          const Elbow = top ? CornerDownRight : CornerUpRight;
          return (
            <li key={step.id} className="relative" style={{ gridColumn: i + 1, gridRow: top ? 1 : 2 }}>
              <div
                className={cn(
                  "flex h-full flex-col justify-center rounded-xl px-4 py-3.5",
                  step.won ? "bg-accent-soft" : "bg-bg ring-1 ring-line ring-inset",
                )}
              >
                <p className={cn("flex items-center gap-1.5 font-medium leading-snug", step.won && "font-semibold text-accent")}>
                  {step.won && <Trophy className="size-4 shrink-0" aria-hidden />}
                  {step.title}
                </p>
                <p className={cn("tabular mt-1 text-sm", step.won ? "text-accent" : "text-muted")}>
                  <time dateTime={step.start}>{when(step)}</time>
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
                      "absolute inset-x-0 hidden h-full place-items-center text-accent lg:grid",
                      top ? "top-[calc(100%+0.75rem)]" : "bottom-[calc(100%+0.75rem)]",
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
    </article>
  );
}
