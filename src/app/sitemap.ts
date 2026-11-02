import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/articles";
import { siteUrl } from "@/lib/site";

// Generated once at build time (static export for GitHub Pages).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl }, ...getArticles().map(({ slug }) => ({ url: `${siteUrl}/articles/${slug}/` }))];
}
