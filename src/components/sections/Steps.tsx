import { Check, Flag } from "lucide-react";
import type { Milestone } from "@/data/types";
import { formatRange } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * Progress line for a competition: horizontal on desktop, vertical on phones.
 * Filled = finished, ringed = current, outlined = not reached yet.
 */
export function Steps({ steps }: { steps: Milestone[] }) {
  return (
    <ol className="md:grid md:auto-cols-fr md:grid-flow-col">
      {steps.map((m, i) => {
        const done = m.status === "achieved";
        const isCurrent = m.status === "current";
        const upcoming = m.status === "upcoming";
        const next = steps[i + 1];
        return (
          <li key={m.id} className="relative flex gap-4 pb-6 last:pb-0 md:block md:pb-0 md:pe-4">
            {next && (
              <span
                aria-hidden
                className={cn(
                  "absolute start-[13px] top-7 bottom-0 w-0.5 md:start-7 md:end-0 md:top-[13px] md:bottom-auto md:h-0.5 md:w-auto",
                  next.status === "upcoming" ? "bg-line" : "bg-accent",
                )}
              />
            )}
            <span
              className={cn(
                "relative grid size-7 shrink-0 place-items-center rounded-full",
                done && "bg-accent text-white",
                isCurrent && "bg-accent ring-4 ring-accent-soft",
                upcoming && "bg-surface text-muted ring-2 ring-line ring-inset",
              )}
            >
              {done && <Check className="size-4" strokeWidth={2.5} aria-hidden />}
              {isCurrent && <span aria-hidden className="size-2 rounded-full bg-white" />}
              {upcoming && !next && <Flag className="size-3.5" aria-hidden />}
            </span>
            <div className="min-w-0 md:mt-3">
              <p className="text-sm font-medium text-muted">
                {m.label}
                {isCurrent && " · Now"}
                {upcoming && <span className="sr-only"> (not reached yet)</span>}
              </p>
              <p className={cn("font-medium leading-snug", upcoming && "text-muted")}>{m.title}</p>
              <p className="tabular mt-0.5 text-sm text-muted">
                <time dateTime={m.start}>{formatRange(m.start, m.end)}</time>
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
