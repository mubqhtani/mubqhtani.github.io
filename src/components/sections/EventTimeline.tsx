import { ArrowDown, CornerDownRight, CornerUpRight, Trophy } from "lucide-react";
import type { TimelineStep } from "@/data/types";
import { formatDate, formatRange } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * A competition's own timeline, modeled on its official graphic: boxes that
 * step up and down with elbow arrows between them. Stacks on phones.
 * Colors come from the event's branding (`dfn-*` tokens in globals.css).
 */
export function EventTimeline({ title, steps }: { title: string; steps: TimelineStep[] }) {
  return (
    <section aria-label={title} className="rounded-2xl bg-dfn-bg px-5 py-8 md:p-8">
      <h3 className="text-center font-display text-2xl font-semibold tracking-[-0.015em] text-dfn-accent md:text-3xl">
        {title}
      </h3>
      <ol className="mt-7 flex flex-col md:grid md:grid-cols-5 md:grid-rows-2 md:gap-3">
        {steps.map((step, i) => {
          const next = steps[i + 1];
          const top = i % 2 === 0;
          const Elbow = top ? CornerDownRight : CornerUpRight;
          return (
            <li key={step.id} className="relative" style={{ gridColumn: i + 1, gridRow: top ? 1 : 2 }}>
              <div
                className={cn(
                  "flex h-full flex-col items-center justify-center rounded-lg px-3 py-4 text-center",
                  step.won ? "bg-dfn-accent text-dfn-bg" : "bg-dfn-box text-white",
                )}
              >
                {step.won && <Trophy className="mb-1 size-5" aria-hidden />}
                <p className="font-semibold leading-snug">{step.title}</p>
                <p className={cn("tabular mt-1 text-sm", step.won ? "font-medium" : "text-dfn-date")}>
                  <time dateTime={step.start}>{step.end ? formatRange(step.start, step.end) : formatDate(step.start)}</time>
                </p>
              </div>
              {next && (
                <>
                  <span aria-hidden className="grid place-items-center py-2 text-dfn-accent md:hidden">
                    <ArrowDown className="size-5" strokeWidth={1.5} />
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 hidden h-full place-items-center text-dfn-accent md:grid",
                      top ? "top-[calc(100%+0.75rem)]" : "bottom-[calc(100%+0.75rem)]",
                    )}
                  >
                    <Elbow className="size-11" strokeWidth={1} />
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
