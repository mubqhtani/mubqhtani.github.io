import Image from "next/image";
import type { ResolvedImage } from "@/lib/assets";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

type Props = { image: ResolvedImage };

// The artist is credited on hover rather than with a visible label.
const credit = profile.character.credit ? `Art: ${profile.character.credit.name}` : undefined;

/**
 * The painting beside the name, with no frame. The page behind it is already
 * tinted with the painting's colours (PageWash + the palette in globals.css),
 * so the painting only has to dissolve into it:
 *  - `mix-blend-mode: lighten` lets the painting's own dark background give
 *    way to the page wash, so no rectangle shows;
 *  - a wide, soft radial mask removes the lighter corners and edges.
 */
export function HeroArt({ image, className }: Props & { className?: string }) {
  return (
    <figure className={cn("relative w-full md:ms-auto md:max-w-[27rem]", className)}>
      <div className="relative aspect-[3/4] mix-blend-lighten [mask-image:radial-gradient(ellipse_50%_50%_at_50%_46%,#000_42%,transparent_100%)]">
        <Image
          src={image.src}
          alt={image.alt}
          title={credit}
          fill
          preload
          sizes="(min-width: 768px) 432px, (min-width: 640px) 176px, 120px"
          className="object-cover"
        />
      </div>
    </figure>
  );
}

/**
 * The painting, blurred and stretched across the whole viewport behind every
 * section, so its browns and olive greens tint the entire page.
 */
export function PageWash({ image }: Props) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <Image src={image.src} alt="" fill sizes="100vw" className="scale-125 object-cover opacity-55 blur-[90px] saturate-[1.4]" />
      {/* Keep text readable: darker toward the edges and bottom. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_25%,transparent,rgb(19_20_15/0.75)_75%)]" />
    </div>
  );
}
