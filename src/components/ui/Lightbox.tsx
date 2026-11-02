"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type LightboxImage = { src: string; alt: string };

const defaultLabels: LightboxLabels = {
  open: "View full image",
  close: "Close",
  previous: "Previous image",
  next: "Next image",
  imageOf: "Image {n} of {total}",
};

export type LightboxLabels = {
  open: string;
  close: string;
  previous: string;
  next: string;
  /** e.g. "Image {n} of {total}" */
  imageOf: string;
};

/** Native <dialog>: focus trap and Esc-to-close come from the browser. */
function useLightbox(count: number) {
  const ref = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    ref.current?.showModal();
  };
  const close = () => ref.current?.close();
  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + count) % count)),
    [count],
  );

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (count < 2) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => setIndex(null);
    dialog.addEventListener("keydown", onKey);
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("keydown", onKey);
      dialog.removeEventListener("close", onClose);
    };
  }, [step, count]);

  return { ref, index, open, close, step };
}

function Dialog({
  dialogRef,
  index,
  onClose,
  onStep,
  images,
  labels,
}: {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  index: number | null;
  onClose: () => void;
  onStep: (delta: number) => void;
  images: LightboxImage[];
  labels: LightboxLabels;
}) {
  const current = index === null ? null : images[index];
  return (
    <dialog
      ref={dialogRef}
      aria-label={current?.alt}
      className="lightbox m-0 h-dvh max-h-none w-screen max-w-none bg-[#0b1120]/95 p-0 text-white backdrop:bg-[#0b1120]/80"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {current && index !== null && (
        <div className="flex h-full flex-col" onClick={(e) => e.target === e.currentTarget && onClose()}>
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <p className="font-mono text-xs text-slate-400" aria-live="polite">
              {images.length > 1 &&
                labels.imageOf.replace("{n}", String(index + 1)).replace("{total}", String(images.length))}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="grid size-10 place-items-center text-slate-400 transition-colors hover:text-white"
              aria-label={labels.close}
              autoFocus
            >
              <X className="size-5" strokeWidth={1.5} aria-hidden />
            </button>
          </div>
          <div className="relative flex-1">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              sizes="100vw"
              quality={90}
              className="object-contain px-4 pb-4 sm:px-16"
            />
          </div>
          {images.length > 1 && (
            <div className="flex justify-center gap-2 pb-5">
              <button
                type="button"
                onClick={() => onStep(-1)}
                aria-label={labels.previous}
                className="grid size-11 place-items-center text-slate-400 transition-colors hover:text-white"
              >
                <ChevronLeft className="size-5" strokeWidth={1.5} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => onStep(1)}
                aria-label={labels.next}
                className="grid size-11 place-items-center text-slate-400 transition-colors hover:text-white"
              >
                <ChevronRight className="size-5" strokeWidth={1.5} aria-hidden />
              </button>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}

type PhotoProps = {
  image: LightboxImage;
  labels?: LightboxLabels;
  /** Tailwind aspect class for the in-page frame, e.g. "aspect-[4/5]". */
  aspect: string;
  sizes: string;
  /** CSS object-position for the in-page crop. The lightbox always shows the full image. */
  position?: string;
  /** "contain" for documents (certificates) that must not be cropped. */
  fit?: "cover" | "contain";
  priority?: boolean;
  className?: string;
};

/** An in-page photo that opens at full size when clicked. */
export function Photo({ image, labels = defaultLabels, aspect, sizes, position, fit = "cover", priority, className }: PhotoProps) {
  const { ref, index, open, close, step } = useLightbox(1);
  return (
    <>
      <button
        type="button"
        onClick={() => open(0)}
        aria-label={`${labels.open}: ${image.alt}`}
        className={cn("group relative block w-full cursor-zoom-in overflow-hidden bg-line", aspect, className)}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          preload={priority}
          style={position ? { objectPosition: position } : undefined}
          className={cn(
            fit === "cover" && "transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transform-none",
            fit === "cover" ? "object-cover" : "object-contain",
          )}
        />
      </button>
      <Dialog dialogRef={ref} index={index} onClose={close} onStep={step} images={[image]} labels={labels} />
    </>
  );
}

/** A row of extra photos from a gallery folder. Renders nothing when empty. */
export function Gallery({
  images,
  labels = defaultLabels,
  title,
}: {
  images: LightboxImage[];
  labels?: LightboxLabels;
  title: string;
}) {
  const { ref, index, open, close, step } = useLightbox(images.length);
  if (images.length === 0) return null;
  return (
    <div className="mt-4">
      <p className="sr-only">{title}</p>
      <ul className="flex flex-wrap gap-2">
        {images.map((img, i) => (
          <li key={img.src}>
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={`${labels.open}: ${img.alt}`}
              className="relative block size-16 cursor-zoom-in overflow-hidden rounded-lg bg-line sm:size-20"
            >
              <Image src={img.src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>
      <Dialog dialogRef={ref} index={index} onClose={close} onStep={step} images={images} labels={labels} />
    </div>
  );
}
