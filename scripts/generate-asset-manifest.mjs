// Scans public/images and writes a manifest of every image that exists.
// The site reads this manifest to decide whether to show a real image or a
// placeholder, so adding a photo is as simple as dropping a file in the right
// folder. Runs automatically before `npm run dev` and `npm run build`.

import { readdirSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { join, relative, sep, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const imagesDir = join(publicDir, "images");
const outFile = join(root, "src", "data", "generated", "asset-manifest.json");

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif|svg)$/i;

function walk(dir) {
  let out = [];
  let entries = [];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    if (name.startsWith(".")) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out = out.concat(walk(full));
    else if (IMAGE_EXT.test(name)) out.push("/" + relative(publicDir, full).split(sep).join("/"));
  }
  return out;
}

const files = walk(imagesDir).sort((a, b) =>
  a.localeCompare(b, "en", { numeric: true, sensitivity: "base" }),
);

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, JSON.stringify({ files }, null, 2) + "\n");
console.log(`[assets] ${files.length} image(s) found in public/images`);
