import { Mail } from "lucide-react";
import { CopyButton } from "@/components/ui/CopyButton";
import { profile } from "@/data/profile";
import type { SocialId } from "@/data/types";
import { cn } from "@/lib/utils";
import { Section } from "./Section";

// lucide-react has no brand icons, so these two are drawn here.
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.25" cy="6.75" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

const ICONS: Partial<Record<SocialId, React.ComponentType<{ className?: string }>>> = {
  email: Mail,
  x: XIcon,
  instagram: InstagramIcon,
};

/** Only rendered once at least one link in src/data/profile.ts has an href. */
export function Contact() {
  const links = profile.socials.filter((s) => s.href);
  if (links.length === 0) return null;

  return (
    <Section id="contact" title="Contact">
      <ul className="grid gap-3 lg:grid-cols-3">
        {links.map((s) => {
          const Icon = ICONS[s.id];
          const isEmail = s.id === "email";
          return (
            <li key={s.id} className="relative">
              <a
                href={s.href}
                target={isEmail ? undefined : "_blank"}
                rel={isEmail ? undefined : "noopener noreferrer"}
                className={cn(
                  "group flex items-center gap-3.5 rounded-2xl bg-surface p-4 ring-1 ring-line transition-shadow hover:ring-accent/50",
                  isEmail && "pr-13",
                )}
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                  {Icon && <Icon className="size-5" />}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-muted">{s.label}</span>
                  <span className="block break-words font-medium text-fg transition-colors group-hover:text-accent">
                    {s.handle ?? s.href?.replace(/^(mailto:|https?:\/\/)/, "")}
                  </span>
                </span>
              </a>
              {isEmail && s.handle && <CopyButton text={s.handle} label="Copy email address" />}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
