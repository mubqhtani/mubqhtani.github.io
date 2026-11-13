import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { notes } from "@/data/notes";
import { getArticles } from "@/lib/articles";
import { cn } from "@/lib/utils";
import { Section } from "./Section";

type Entry = {
  key: string;
  title: string;
  href: string;
  /** Opens on another site (GitHub) instead of a page here. */
  external: boolean;
  lang: "ar" | "en";
  /** Right-hand hint: reading time or where the link goes. */
  hint: string;
  date: string;
};

/**
 * Articles hosted here plus write-ups that live on GitHub (src/data/notes.ts),
 * newest first, as a plain list of titles. Only rendered once there is at
 * least one of either.
 */
export function Articles() {
  const entries: Entry[] = [
    ...getArticles().map((a) => ({
      key: a.slug,
      title: a.title,
      href: `/articles/${a.slug}/`,
      external: false,
      lang: a.lang,
      hint: `${a.minutes} min`,
      date: a.date ?? "",
    })),
    ...notes.map((n) => ({
      key: n.href,
      title: n.title,
      href: n.href,
      external: true,
      lang: "en" as const,
      hint: "GitHub",
      date: n.date,
    })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  if (entries.length === 0) return null;

  return (
    <Section id="articles" title="Articles">
      <ul className="border-t border-line">
        {entries.map((e) => {
          // Title only: the link itself says where it goes.
          const className = "group flex items-baseline justify-between gap-6 py-5";
          const body = (
            <>
              <span
                lang={e.lang}
                dir={e.lang === "ar" ? "rtl" : "ltr"}
                className={cn(
                  "min-w-0 leading-snug transition-colors group-hover:text-accent",
                  e.lang === "ar" ? "font-arabic text-xl font-semibold" : "font-display text-[1.6rem]",
                )}
              >
                {e.title}
              </span>
              <span className="label tabular flex shrink-0 items-center gap-1.5">
                {e.hint}
                {e.external ? (
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                ) : (
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                )}
              </span>
            </>
          );
          return (
            <li key={e.key} className="border-b border-line">
              {e.external ? (
                <a href={e.href} target="_blank" rel="noopener noreferrer" className={className}>
                  {body}
                </a>
              ) : (
                <Link href={e.href} className={className}>
                  {body}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
