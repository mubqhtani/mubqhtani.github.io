import "server-only";
import manifest from "@/data/generated/asset-manifest.json";
import type { GallerySlot, MediaSlot } from "@/data/types";

export type ResolvedImage = { src: string; alt: string };

const files: string[] = manifest.files;
const fileSet = new Set(files);
const EXT = /\.(jpe?g|png|webp|avif|gif|svg)$/i;

// next/image does not add basePath to `src` on its own (static export).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Returns the real file path for a slot, or null if nothing has been added yet. */
export function resolveSrc(src: string): string | null {
  if (EXT.test(src)) return fileSet.has(src) ? src : null;
  return files.find((f) => f.replace(EXT, "") === src) ?? null;
}

export function resolveMedia(slot: MediaSlot): ResolvedImage | null {
  const src = resolveSrc(slot.src);
  return src ? { src: basePath + src, alt: slot.alt } : null;
}

export function resolveGallery(slot: GallerySlot | undefined): ResolvedImage[] {
  if (!slot) return [];
  const folder = slot.folder.replace(/\/$/, "") + "/";
  const images = files.filter((f) => f.startsWith(folder) && !f.slice(folder.length).includes("/"));
  return images.map((src, i) => ({ src: basePath + src, alt: `${slot.alt} — ${i + 1}` }));
}
