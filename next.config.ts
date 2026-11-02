import type { NextConfig } from "next";

/**
 * Fully static site for GitHub Pages.
 *
 * BASE_PATH is empty for a user site (https://<username>.github.io). If the
 * site is ever published from a differently named repository it is served
 * under "/<repo>", and the deploy workflow sets BASE_PATH to that.
 */
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Each page is written as <route>/index.html, which GitHub Pages serves directly.
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString().slice(0, 10),
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // GitHub Pages has no image server. Photos are pre-compressed in public/images.
    unoptimized: true,
  },
};

export default nextConfig;
