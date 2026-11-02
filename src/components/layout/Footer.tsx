import { profile } from "@/data/profile";
import { formatDate } from "@/lib/format";

const buildDate = process.env.NEXT_PUBLIC_BUILD_DATE;

export function Footer() {
  return (
    <footer className="container-x">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line py-8 text-sm text-muted">
        <p className="tabular">
          © {profile.year} {profile.shortName}
          {buildDate && ` · Updated ${formatDate(buildDate)}`}
        </p>
        <a href="#top" className="transition-colors hover:text-fg">
          Back to top
        </a>
      </div>
    </footer>
  );
}
