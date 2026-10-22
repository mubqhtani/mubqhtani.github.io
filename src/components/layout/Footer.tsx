import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-muted">
        <p>
          © <span className="tabular">{profile.year}</span> {profile.shortName}
        </p>
        <a href="#top" className="transition-colors hover:text-fg">
          Back to top
        </a>
      </div>
    </footer>
  );
}
