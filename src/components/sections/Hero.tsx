import { HeroArt } from "./HeroArt";
import { profile } from "@/data/profile";
import { resolveMedia } from "@/lib/assets";
import { cn } from "@/lib/utils";

/**
 * Name, one line of role and a short intro, with the painting. Results live
 * in Achievements and contact links in Contact, so neither is repeated here.
 *
 * Phone: the painting sits in its own column beside the name (never under or
 * behind the text); the role and intro run full width below both.
 * Laptop and up: two columns, the painting on the right next to everything.
 */
export function Hero() {
  const character = resolveMedia(profile.character);
  const [first, ...rest] = profile.shortName.split(" ");

  return (
    // No rule under the navbar: the navbar draws its own hairline once you scroll,
    // so the hero opens straight onto the name.
    <header id="top" className="container-x pt-24 md:pt-28">
      <div
        className={cn(
          "grid items-center [grid-template-areas:'name''rest']",
          character &&
            "grid-cols-[1fr_40%] gap-x-3 [grid-template-areas:'name_art''rest_rest'] md:grid-cols-[1.15fr_0.85fr] md:gap-x-10 md:[grid-template-areas:'name_art''rest_art']",
        )}
      >
        <div className="min-w-0 pt-4 [grid-area:name] md:self-end md:pt-10">
          <p className="label">Based in {profile.location.split(",")[0]}</p>
          <h1 className="mt-4 font-display text-[clamp(2.2rem,0.75rem+6.2vw,3.5rem)] leading-[0.95] tracking-[-0.035em] md:mt-6 md:text-[clamp(4rem,1.6rem+6vw,7rem)] md:leading-[0.92]">
            {first}
            <br />
            <span className="whitespace-nowrap italic text-fg/90">{rest.join(" ")}</span>
            <span className="text-accent">.</span>
          </h1>
        </div>

        <div className="pb-4 [grid-area:rest] md:self-start md:pb-10">
          <p className="mt-6 text-lg leading-snug text-fg md:mt-8 md:text-xl">{profile.role}</p>
          <p className="measure mt-3 max-w-[46ch] text-[15px] leading-relaxed text-muted">{profile.intro}</p>
        </div>

        {character && <HeroArt image={character} className="w-full [grid-area:art] md:ms-auto md:max-w-[27rem]" />}
      </div>
    </header>
  );
}
