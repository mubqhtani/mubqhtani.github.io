import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { profile } from "@/data/profile";
import { getArticle, getArticles } from "@/lib/articles";
import { formatDate } from "@/lib/format";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getArticles().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return {
    title: `${article.title} · ${profile.shortName}`,
    description: article.excerpt,
    alternates: { canonical: `/articles/${article.slug}/` },
    openGraph: { type: "article", title: article.title, description: article.excerpt },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const isArabic = article.lang === "ar";

  return (
    <>
      <Navbar wordmark={profile.shortName} items={nav} linkPrefix={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/`} />

      <main className="container-x pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="mx-auto max-w-[42rem]">
          <Link
            href="/#articles"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="size-4" aria-hidden />
            All articles
          </Link>

          <article lang={article.lang} dir={article.dir} className={cn(isArabic ? "font-arabic" : "article-en")}>
            <header className="mt-8 border-b border-line pb-8">
              {article.tag && (
                <p dir="ltr" lang="en" className={cn("label mb-4", isArabic && "text-right")}>
                  {article.tag}
                </p>
              )}
              <h1
                className={cn(
                  "leading-[1.15]",
                  isArabic ? "text-[clamp(2rem,1.5rem+2.4vw,3rem)] font-bold leading-[1.25]" : "font-display text-[clamp(2.4rem,1.6rem+3vw,3.75rem)] tracking-[-0.02em]",
                )}
              >
                {article.title}
              </h1>
              <p dir="ltr" lang="en" className={cn("label tabular mt-5 flex flex-wrap gap-x-4 gap-y-1", isArabic && "justify-end")}>
                <span>{profile.shortName}</span>
                {article.date && <span>{formatDate(article.date)}</span>}
                <span>{article.minutes} min read</span>
                {article.source && (
                  <a href={article.source} target="_blank" rel="noopener noreferrer" className="text-accent transition-colors hover:text-fg">
                    Source on GitHub ↗
                  </a>
                )}
              </p>
            </header>
            <div className="article-body" dangerouslySetInnerHTML={{ __html: article.html }} />
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}
