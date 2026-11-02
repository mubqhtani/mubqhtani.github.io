import { Photo } from "@/components/ui/Lightbox";
import { certifications } from "@/data/certifications";
import { timeline } from "@/data/education";
import type { Certification, MediaSlot, TimelineEntry } from "@/data/types";
import { resolveMedia } from "@/lib/assets";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Section } from "./Section";

function Dates({ entry }: { entry: TimelineEntry }) {
  return (
    <>
      <time dateTime={entry.start}>{formatDate(entry.start)}</time>
      {entry.end && (
        <>
          {" – "}
          {entry.end === "present" ? "Present" : <time dateTime={entry.end}>{formatDate(entry.end)}</time>}
        </>
      )}
    </>
  );
}

export function Learning() {
  return (
    <Section id="learning" title="Learning">
      <ol>
        {timeline.map((entry, i) => {
          const cert = entry.certificationId ? certifications.find((c) => c.id === entry.certificationId) : undefined;
          const ongoing = entry.end === "present";
          const last = i === timeline.length - 1;
          return (
            <li key={entry.id} className="relative grid grid-cols-[1.25rem_1fr] gap-x-5 pb-10 last:pb-0">
              {/* Timeline rail */}
              {!last && <span aria-hidden className="absolute start-[9px] top-6 bottom-0 w-0.5 bg-line" />}
              <span
                aria-hidden
                className={cn(
                  "relative mt-1 size-5 rounded-full border-2",
                  ongoing ? "border-accent bg-accent ring-4 ring-accent-soft" : "border-line bg-surface",
                )}
              />
              <div className="min-w-0">
                <p className="tabular text-sm text-muted">
                  <Dates entry={entry} />
                  {ongoing && <span className="badge ms-3 h-6 min-w-0 text-xs">Now</span>}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{entry.title}</h3>
                {entry.org && <p className="text-[15px] text-muted">{entry.org}</p>}
                {entry.body && <p className="measure mt-2 text-[15px] leading-relaxed text-fg/85">{entry.body}</p>}
                {entry.photos && <EntryPhotos photos={entry.photos} />}
                {cert && <CertificateBlock cert={cert} />}
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

function EntryPhotos({ photos }: { photos: MediaSlot[] }) {
  return (
    <div className="mt-4 grid max-w-md grid-cols-2 gap-3">
      {photos.map((slot) => {
        const image = resolveMedia(slot);
        if (!image) return null;
        return (
          <Photo
            key={slot.src}
            image={image}
            aspect="aspect-[4/5]"
            sizes="(min-width: 640px) 220px, 50vw"
            position={slot.position}
            className="rounded-xl"
          />
        );
      })}
    </div>
  );
}

function CertificateBlock({ cert }: { cert: Certification }) {
  const image = resolveMedia(cert.image);
  return (
    <div className="mt-2">
      <p className="text-[15px] text-fg/85">
        {cert.code} · {cert.title}
      </p>
      {image && (
        <Photo
          image={image}
          aspect="aspect-[1179/815]"
          sizes="(min-width: 640px) 448px, 100vw"
          fit="contain"
          className="mt-4 max-w-md rounded-xl ring-1 ring-line"
        />
      )}
      {(cert.credentialId || cert.verifyUrl) && (
        <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
          {cert.credentialId && (
            <span>
              ID <span className="font-mono text-fg">{cert.credentialId}</span>
            </span>
          )}
          {cert.verifyUrl && (
            <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="link">
              Verify at {cert.verifyUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </a>
          )}
        </p>
      )}
    </div>
  );
}
