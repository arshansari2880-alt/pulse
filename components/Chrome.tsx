"use client";

import Link from "next/link";
import { TYPE_META } from "@/lib/geo";
import type { Filter, PlaceType, Scene } from "@/lib/types";

const FILTERS: Filter[] = ["all", "now", "table", "ground", "move"];
const SCENES: Scene[] = ["evening", "saturday", "late"];

export function TopBar({
  clock,
  line,
  awake,
  legendOpen,
  onToggleLegend,
}: {
  clock: string;
  line: string;
  awake: number;
  legendOpen: boolean;
  onToggleLegend: () => void;
}) {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between px-5 pt-5">
      <div>
        <p className="font-display text-[34px] font-extrabold leading-none tracking-[-0.04em]">
          pulse
        </p>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-meta text-mute">
          {line} · {awake} awake
        </p>
      </div>
      <div className="pointer-events-auto flex flex-col items-end gap-2">
        <p className="font-mono text-[11px] uppercase tracking-meta text-accent">{clock}</p>
        <div className="flex items-center gap-3">
          <Link
            href="/thinking"
            className="font-mono text-[10px] uppercase tracking-meta text-mute hover:text-ink"
          >
            Thinking
          </Link>
          <button
            type="button"
            onClick={onToggleLegend}
            aria-expanded={legendOpen}
            className="font-mono text-[10px] uppercase tracking-meta text-mute hover:text-ink"
          >
            Legend
          </button>
        </div>
      </div>
    </header>
  );
}

export function Legend({ open }: { open: boolean }) {
  if (!open) return null;
  return (
    <aside className="pointer-events-auto absolute right-5 top-[5.5rem] z-30 w-[min(100%-2.5rem,240px)] rounded-sheet border border-white/[0.08] bg-bg-2/92 p-3.5 text-[12px] leading-5 text-ink/80 backdrop-blur">
      <p className="font-mono text-[10px] uppercase tracking-meta text-accent">Pulse = aliveness</p>
      <p className="mt-1.5">Faster ring means more alive right now. Quiet places are dim dots — no ring.</p>
      <p className="mt-1.5">Three or more pins in a tight patch collapse into a numbered bloom. Zoom in to split.</p>
      <ul className="mt-2 space-y-1 font-mono text-[10px] uppercase tracking-meta text-mute">
        <li>Now — live events</li>
        <li>Table — food, queues</li>
        <li>Ground — places</li>
        <li>Move — things to join</li>
      </ul>
    </aside>
  );
}

export function SceneRail({
  scene,
  onScene,
}: {
  scene: Scene;
  onScene: (s: Scene) => void;
}) {
  return (
    <div className="pointer-events-auto flex justify-center">
      <div className="flex rounded-chip border border-white/[0.08] bg-bg/70 p-0.5 backdrop-blur">
        {SCENES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onScene(s)}
            className={`rounded-chip px-3 py-1.5 font-mono text-[10px] uppercase tracking-meta ${
              scene === s ? "bg-accent text-bg" : "text-mute hover:text-ink"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

export function FilterRail({
  filter,
  onFilter,
  counts,
}: {
  filter: Filter;
  onFilter: (f: Filter) => void;
  counts: Record<PlaceType | "all", number>;
}) {
  return (
    <nav className="pointer-events-auto flex justify-center px-4">
      <div className="flex max-w-full gap-1 overflow-x-auto rounded-chip border border-white/[0.08] bg-bg/80 p-1 backdrop-blur scrollbar-none">
        {FILTERS.map((f) => {
          const active = filter === f;
          const label = f === "all" ? "All" : TYPE_META[f].label;
          const count = counts[f];
          return (
            <button
              key={f}
              type="button"
              onClick={() => onFilter(f)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-chip px-3 py-2 font-mono text-[10px] uppercase tracking-meta ${
                active ? "bg-accent text-bg" : "text-mute hover:text-ink"
              }`}
            >
              {label}
              <span className={active ? "text-bg/70" : "text-mute/70"}>{count}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export function QuietBanner({
  count,
  nearest,
  widen,
  onWiden,
}: {
  count: number;
  nearest: number;
  widen: boolean;
  onWiden: () => void;
}) {
  return (
    <div className="pointer-events-auto mx-auto w-[min(100%-2rem,420px)] rounded-sheet border border-white/[0.08] bg-bg-2/90 px-4 py-3 text-center backdrop-blur">
      <p className="font-mono text-[11px] uppercase tracking-meta text-ink/90">
        {count} {count === 1 ? "place" : "places"} still awake · nearest {nearest.toFixed(1)} km
      </p>
      {!widen && (
        <button
          type="button"
          onClick={onWiden}
          className="mt-1 font-mono text-[10px] uppercase tracking-meta text-accent"
        >
          Widen to 3 km
        </button>
      )}
    </div>
  );
}
