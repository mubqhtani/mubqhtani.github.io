import { HeroArt } from "./HeroArt";
import { profile } from "@/data/profile";
import { resolveMedia } from "@/lib/assets";
import { cn } from "@/lib/utils";

/**
 * Name, one line of role and a short intro, with the painting. Results live
 * in Achievements and contact links in Contact, so neither is repeated here.
 *
 * Laptop and up: two columns, the painting on the right.
 * Phone: one column; the painting sits large behind the top-right of the
 * name (it already dissolves into the page), like a poster, instead of being
 * squeezed into a thin side column.
 */
export function Hero() {
  const character = resolveMedia(profile.character);
  const [first, ...rest] = profile.shortName.split(" ");

  return (
    // No rule under the navbar: the navbar draws its own hairline once you scroll,
    // so the hero opens straight onto the name.
    <header id="top" className="container-x relative pt-24 md:pt-28">
      <div
        className={cn(
          "grid items-center [grid-template-areas:'name''rest']",
          character && "md:grid-cols-[1.15fr_0.85fr] md:gap-x-10 md:[grid-template-areas:'name_art''rest_art']",
        )}
      >
        <div className="relative z-10 min-w-0 pt-6 [grid-area:name] md:self-end md:pt-10">
          <p className="label">Based in {profile.location.split(",")[0]}</p>
          <h1 className="mt-5 font-display text-[clamp(3rem,1.6rem+6vw,7rem)] leading-[0.92] tracking-[-0.035em] md:mt-6">
            {first}
            <br />
            <span className="whitespace-nowrap italic text-fg/90">{rest.join(" ")}</span>
            <span className="text-accent">.</span>
          </h1>
        </div>

        <div className="relative z-10 pb-4 [grid-area:rest] md:self-start md:pb-10">
          <p className="mt-8 max-w-[30ch] text-lg leading-snug text-fg md:max-w-none md:text-xl">{profile.role}</p>
          <p className="measure mt-3 max-w-[46ch] text-[15px] leading-relaxed text-muted">{profile.intro}</p>
        </div>

        {character && (
          <HeroArt
            image={character}
            className="pointer-events-none absolute end-[-0.5rem] top-[4.5rem] w-[56%] max-w-[18rem] sm:max-w-[20rem] md:pointer-events-auto md:static md:ms-auto md:w-full md:max-w-[27rem] md:[grid-area:art]"
          />
        )}
      </div>
    </header>
  );
}
