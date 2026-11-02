"use client";

import { ArrowUpRight, Copy, CornerDownLeft, Hash } from "lucide-react";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

export type Command = {
  id: string;
  label: string;
  kind: "jump" | "open" | "copy";
  value: string;
};

const ICONS = { jump: Hash, open: ArrowUpRight, copy: Copy };

const shortcutLabel = () => (/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘K" : "Ctrl K");

/** Press Ctrl/⌘ K anywhere to jump to a section, open a link or copy the email. */
export function CommandMenu({ commands }: { commands: Command[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const shortcut = useSyncExternalStore(() => () => {}, shortcutLabel, () => "Ctrl K");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? commands.filter((c) => c.label.toLowerCase().includes(q)) : commands;
  }, [commands, query]);

  const open = () => {
    setQuery("");
    setActive(0);
    setCopied(false);
    dialogRef.current?.showModal();
    inputRef.current?.focus();
  };
  const close = () => dialogRef.current?.close();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialogRef.current?.open) close();
        else open();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const run = async (command: Command) => {
    if (command.kind === "copy") {
      try {
        await navigator.clipboard.writeText(command.value);
        setCopied(true);
        setTimeout(close, 700);
      } catch {
        window.location.href = `mailto:${command.value}`;
      }
      return;
    }
    close();
    if (command.kind === "jump") window.location.hash = command.value;
    else window.open(command.value, "_blank", "noopener,noreferrer");
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (results.length ? (i + step + results.length) % results.length : 0));
    }
    if (e.key === "Enter" && results[active]) run(results[active]);
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label="Open command menu"
        className="hidden h-8 items-center rounded-lg bg-surface px-2.5 text-xs font-medium text-muted ring-1 ring-line transition-colors hover:text-fg lg:inline-flex"
      >
        <kbd className="font-sans">{shortcut}</kbd>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Command menu"
        onClick={(e) => e.target === e.currentTarget && close()}
        className="mx-auto mt-[14vh] w-[min(32rem,calc(100vw-2rem))] overflow-hidden rounded-2xl bg-surface text-fg shadow-[0_24px_60px_-20px_rgb(14_22_40/0.35)] ring-1 ring-line backdrop:bg-fg/25"
      >
        <input
          ref={inputRef}
          id="command-search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onInputKey}
          placeholder="Jump to a section or link"
          aria-label="Search commands"
          autoComplete="off"
          className="w-full border-b border-line bg-transparent px-5 py-4 text-base outline-none placeholder:text-muted"
        />
        <ul ref={listRef} className="max-h-[min(30rem,62vh)] overflow-y-auto p-2">
          {results.map((command, i) => {
            const Icon = ICONS[command.kind];
            const isActive = i === active;
            return (
              <li key={command.id}>
                <button
                  type="button"
                  onClick={() => run(command)}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[15px]",
                    isActive && "bg-bg",
                  )}
                >
                  <Icon className="size-4 shrink-0 text-muted" aria-hidden />
                  <span className="flex-1">{command.kind === "copy" && copied ? "Copied" : command.label}</span>
                  {isActive && <CornerDownLeft className="size-3.5 text-muted" aria-hidden />}
                </button>
              </li>
            );
          })}
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No results</li>}
        </ul>
      </dialog>
    </>
  );
}
