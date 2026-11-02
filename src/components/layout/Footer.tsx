import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="container-x">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line py-8 text-sm text-muted">
        <p>
          © {profile.year} {profile.shortName}
        </p>
        <a href="#top" className="transition-colors hover:text-fg">
          Back to top
        </a>
      </div>
    </footer>
  );
}
