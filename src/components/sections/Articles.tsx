import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getArticles } from "@/lib/articles";
import { Section } from "./Section";

/** Only rendered once src/content/articles has at least one file. */
export function Articles() {
  const articles = getArticles();
  if (articles.length === 0) return null;

  return (
    <Section id="articles" title="Articles">
      <ul className="grid gap-3">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link
              href={`/articles/${article.slug}/`}
              className="group flex flex-col-reverse gap-3 rounded-2xl bg-surface p-5 ring-1 ring-line transition-shadow hover:ring-accent/50 sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:p-6"
            >
              <span className="flex shrink-0 items-center gap-2 text-sm text-muted">
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
                <span className="tabular">{article.minutes} min read</span>
              </span>
              <span lang="ar" dir="rtl" className="min-w-0 font-arabic">
                <span className="block text-xl font-semibold leading-snug transition-colors group-hover:text-accent">
                  {article.title}
                </span>
                <span className="mt-1 block text-[15px] leading-relaxed text-muted">{article.excerpt}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
