import "server-only";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { Marked, type Tokens } from "marked";

/** Each file in src/content/articles is one article, and its name is the URL slug. */
const DIR = join(process.cwd(), "src/content/articles");

const marked = new Marked({
  renderer: {
    link({ href, tokens }: Tokens.Link) {
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${this.parser.parseInline(tokens)}</a>`;
    },
    image({ href, text }: Tokens.Image) {
      const alt = text.replaceAll('"', "&quot;");
      return `<img src="${href}" alt="${alt}" loading="lazy" decoding="async" referrerpolicy="no-referrer">`;
    },
  },
});

function load(slug: string) {
  const source = readFileSync(join(DIR, `${slug}.md`), "utf8");
  const title = source.match(/^# (.+)$/m)?.[1] ?? slug;
  const body = source.replace(/^# .+\n/m, "");
  const excerpt = body.split("\n").find((line) => line.trim() && !/^[#!\d]/.test(line)) ?? "";
  // Bilingual count: spaces separate words in Arabic and English alike.
  const minutes = Math.max(1, Math.round(source.split(/\s+/).length / 200));
  return { slug, title, excerpt, minutes, html: marked.parse(body, { async: false }) };
}

export function getArticles() {
  return readdirSync(DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => load(file.replace(/\.md$/, "")));
}

export function getArticle(slug: string) {
  return getArticles().find((article) => article.slug === slug);
}
