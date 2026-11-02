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

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY = 86_400_000;

/** Whole days since the epoch, so positions don't depend on the time zone. */
function toDay(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d) / DAY;
}

/** One time scale for a whole chart, starting on the first of a month. */
function buildScale(steps: TimelineStep[]) {
  const [y, m] = steps[0].start.split("-").map(Number);
  const min = Date.UTC(y, m - 1, 1) / DAY;
  const last = Math.max(...steps.map((s) => toDay(s.end ?? s.start)));
  const max = last + 1 + Math.ceil((last - min) * 0.03);

  const ticks: { label: string; at: number }[] = [];
  for (let i = 0; ; i++) {
    const date = new Date(Date.UTC(y, m - 1 + i, 1));
    const day = date.getTime() / DAY;
    if (day > max) break;
    ticks.push({ label: MONTHS[date.getUTCMonth()], at: ((day - min) / (max - min)) * 100 });
  }
  return { ticks, at: (day: number) => ((day - min) / (max - min)) * 100 };
}

const LEGEND: Record<TimelineStep["status"], { label: string; mark: string }> = {
  done: { label: "Finished", mark: "bg-muted/45" },
  current: { label: "Now", mark: "bg-accent" },
  won: { label: "Won", mark: "mx-1 !w-2 rotate-45 bg-accent" },
  upcoming: { label: "Not reached yet", mark: "ring-1 ring-inset ring-muted/60" },
};

/**
 * The timeline card used by every competition: a small Gantt chart on a true
 * time scale. Bars are multi-day steps, diamonds are single days, and the one
 * step that matters most is the only one in the accent color.
 */
export function EventTimeline({ id, title, badge, ongoing, meta, steps, children }: EventTimelineProps) {
  const { ticks, at } = buildScale(steps);
  const statuses = [...new Set(steps.map((s) => s.status))];
  const gridlines = ticks.map((t) => (
    <span key={t.label} aria-hidden className="absolute inset-y-0 w-px bg-line" style={{ left: `${t.at}%` }} />
  ));

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

      <div className="mt-7 md:grid md:grid-cols-[19rem_1fr] md:gap-x-6">
        <div aria-hidden className="relative col-start-2 h-5 text-xs text-muted">
          {ticks.map((t) => (
            <span
              key={t.label}
              className={cn("absolute top-0 whitespace-nowrap", t.at > 90 && "-translate-x-full")}
              style={{ left: `${t.at}%` }}
            >
              {t.label}
            </span>
          ))}
        </div>
      </div>

      <ol>
        {steps.map((step) => {
          const when = step.end ? formatRange(step.start, step.end) : formatDate(step.start);
          const start = toDay(step.start);
          const key = step.status === "current" || step.status === "won";
          const upcoming = step.status === "upcoming";
          const fill = key ? "bg-accent" : upcoming ? "bg-surface ring-1 ring-inset ring-muted/60" : "bg-muted/45";
          return (
            <li key={step.id} className="md:grid md:grid-cols-[19rem_1fr] md:gap-x-6">
              <div className="pb-1.5 pt-3 md:py-2.5">
                <p className={cn("leading-snug", key ? "font-semibold" : "font-medium", upcoming && "text-muted")}>
                  {step.title}
                </p>
                <p className="tabular mt-0.5 text-sm text-muted">
                  {step.label && `${step.label} · `}
                  {step.status === "current" && "Now · "}
                  <time dateTime={step.start}>{when}</time>
                  {upcoming && <span className="sr-only"> (not reached yet)</span>}
                </p>
              </div>
              <div aria-hidden className="relative h-6 md:h-auto">
                {gridlines}
                {step.end ? (
                  <span
                    title={`${step.title}: ${when}`}
                    className={cn("absolute top-1/2 h-3 min-w-2 -translate-y-1/2 rounded-[4px]", fill)}
                    style={{ left: `${at(start)}%`, width: `${at(toDay(step.end) + 1) - at(start)}%` }}
                  />
                ) : (
                  <span
                    title={`${step.title}: ${when}`}
                    className={cn("absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[2px]", fill)}
                    style={{ left: `${at(start + 0.5)}%` }}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
        {statuses.map((status) => (
          <li key={status} className="flex items-center gap-2">
            <span aria-hidden className={cn("h-2 w-4 rounded-[2px]", LEGEND[status].mark)} />
            {LEGEND[status].label}
          </li>
        ))}
      </ul>
      {children}
    </article>
  );
}
