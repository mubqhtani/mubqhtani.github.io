import "server-only";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { Marked, type Tokens } from "marked";

/**
 * Each file in src/content/articles is one article, and its name is the URL slug.
 *
 * A file may start with optional front matter:
 *   ---
 *   date: 2025-02-21            (ISO; newest articles are listed first)
 *   tag: HTB Academy · Notes    (small label in the list and on the page)
 *   source: https://github.com/…  (where the original lives)
 *   ---
 * The language is detected from the title: Arabic titles render right-to-left.
 */
const DIR = join(process.cwd(), "src/content/articles");

// next/image is not used for article images, so add basePath to local ones here.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const marked = new Marked({
  renderer: {
    link({ href, tokens }: Tokens.Link) {
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${this.parser.parseInline(tokens)}</a>`;
    },
    image({ href, text }: Tokens.Image) {
      const alt = text.replaceAll('"', "&quot;");
      const src = href.startsWith("/") ? basePath + href : href;
      return `<img src="${src}" alt="${alt}" loading="lazy" decoding="async" referrerpolicy="no-referrer">`;
    },
  },
});

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  minutes: number;
  html: string;
  lang: "ar" | "en";
  dir: "rtl" | "ltr";
  date?: string;
  tag?: string;
  source?: string;
};

function splitFrontMatter(source: string): { meta: Record<string, string>; content: string } {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return { meta: {}, content: source };
  const meta = Object.fromEntries(
    match[1]
      .split(/\r?\n/)
      .map((line) => line.match(/^(\w+):\s*(.+)$/))
      .filter((m): m is RegExpMatchArray => Boolean(m))
      .map((m) => [m[1], m[2].trim()]),
  );
  return { meta, content: source.slice(match[0].length) };
}

/** First line of real prose, with inline markdown stripped, for the list preview. */
function firstSentence(body: string) {
  const line = body.split("\n").find((l) => l.trim() && !/^\s*([#!|>`-]|\d+\.)/.test(l)) ?? "";
  return line.replace(/[*_`]/g, "").trim();
}

function load(slug: string): Article {
  const { meta, content } = splitFrontMatter(readFileSync(join(DIR, `${slug}.md`), "utf8"));
  const title = content.match(/^# (.+)$/m)?.[1]?.replace(/[*_`]/g, "").trim() ?? slug;
  const body = content.replace(/^# .+\n/m, "");
  const lang = /[؀-ۿ]/.test(title) ? "ar" : "en";
  // Bilingual count: spaces separate words in Arabic and English alike.
  const minutes = Math.max(1, Math.round(content.split(/\s+/).length / 200));
  return {
    slug,
    title,
    excerpt: meta.excerpt ?? firstSentence(body),
    minutes,
    html: marked.parse(body, { async: false }),
    lang,
    dir: lang === "ar" ? "rtl" : "ltr",
    date: meta.date,
    tag: meta.tag,
    source: meta.source,
  };
}

export function getArticles(): Article[] {
  return readdirSync(DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => load(file.replace(/\.md$/, "")))
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export function getArticle(slug: string) {
  return getArticles().find((article) => article.slug === slug);
}
