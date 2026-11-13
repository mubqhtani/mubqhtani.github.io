import { HeroArt } from "./HeroArt";
import { profile } from "@/data/profile";
import { resolveMedia } from "@/lib/assets";
import { cn } from "@/lib/utils";

/**
 * Name, one line of role and a short intro beside the painting. Results live
 * in Achievements and contact links in Contact, so neither is repeated here.
 */
export function Hero() {
  const character = resolveMedia(profile.character);
  const [first, ...rest] = profile.shortName.split(" ");

  return (
    // No rule under the navbar: the navbar draws its own hairline once you scroll,
    // so the hero opens straight onto the name.
    <header id="top" className="container-x pt-24 md:pt-28">
      {/*
        The painting always sits beside the name. On phones it takes a narrow
        column next to the name only, and the rest runs full width below;
        from md up it fills the right column next to everything.
      */}
      <div
        className={cn(
          "grid items-center gap-x-4 [grid-template-areas:'name''rest']",
          character &&
            "grid-cols-[1fr_7.5rem] [grid-template-areas:'name_art''rest_rest'] sm:grid-cols-[1fr_11rem] md:grid-cols-[1.15fr_0.85fr] md:gap-x-10 md:[grid-template-areas:'name_art''rest_art']",
        )}
      >
        <div className="min-w-0 pt-4 [grid-area:name] md:self-end md:pt-10">
          <p className="label">
            {profile.location} · Age {profile.age}
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.25rem,0.9rem+6.6vw,7rem)] leading-[0.92] tracking-[-0.035em]">
            {first}
            <br />
            <span className="italic text-fg/90">{rest.join(" ")}</span>
            <span className="text-accent">.</span>
          </h1>
        </div>

        <div className="pb-4 [grid-area:rest] md:self-start md:pb-10">
          <p className="mt-8 text-lg text-fg md:text-xl">{profile.role}</p>
          <p className="measure mt-3 max-w-[46ch] text-[15px] leading-relaxed text-muted">{profile.intro}</p>
        </div>

        {character && <HeroArt image={character} className="[grid-area:art]" />}
      </div>
    </header>
  );
}
