import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { profile } from "@/data/profile";
import { getArticle, getArticles } from "@/lib/articles";
import { nav } from "@/lib/site";

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

          <article lang="ar" dir="rtl" className="font-arabic">
            <header className="mt-8 border-b border-line pb-8">
              <h1 className="text-[clamp(2rem,1.5rem+2.4vw,3rem)] font-bold leading-[1.25]">{article.title}</h1>
              <p dir="ltr" lang="en" className="tabular mt-4 text-right font-sans text-sm text-muted">
                {profile.shortName} · {article.minutes} min read
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
