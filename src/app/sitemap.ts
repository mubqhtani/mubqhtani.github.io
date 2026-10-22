import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Generated once at build time (static export for GitHub Pages).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl }];
}
