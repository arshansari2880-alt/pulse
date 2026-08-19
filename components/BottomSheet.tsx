"use client";

import { AnimatePresence, motion } from "framer-motion";
import { QueueArc, Sparkline } from "@/components/Sparkline";
import { TypeGlyph } from "@/components/TypeGlyph";
import {
  SCENE_META,
  TYPE_META,
  livelinessOf,
  sparklineFor,
} from "@/lib/geo";
import type { Place, Scene } from "@/lib/types";

export function BottomSheet({
  place,
  scene,
  saved,
  joined,
  onSave,
  onPrimary,
  onClose,
}: {
  place: Place | null;
  scene: Scene;
  saved: boolean;
  joined: boolean;
  onSave: () => void;
  onPrimary: () => void;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {place && (
        <motion.section
          key={place.id}
          role="dialog"
          aria-label={place.name}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 28, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto absolute inset-x-0 bottom-[4.8rem] z-40 mx-auto w-[min(100%-1.5rem,440px)] overflow-hidden rounded-sheet border border-white/[0.08] bg-bg-2/95 shadow-[0_-24px_80px_rgba(0,0,0,0.55)] backdrop-blur-md"
        >
          <div className="flex justify-center pt-2.5">
            <button
              type="button"
              onClick={onClose}
              className="h-1 w-10 rounded-full bg-white/20"
              aria-label="Close"
            />
          </div>
          <div className="px-5 pb-4 pt-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-chip bg-accent px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-meta text-bg">
                    <TypeGlyph type={place.type} className="h-2.5 w-2.5" />
                    {TYPE_META[place.type].short}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-meta text-mute">
                    {place.distanceKm.toFixed(1)} km · {place.neighborhood}
                  </span>
                </div>
                <h2 className="font-display text-[28px] font-extrabold leading-none tracking-tight">
                  {place.name}
                </h2>
              </div>
              {place.queue?.[scene] ? (
                <div className="flex flex-col items-center gap-0.5 pt-1">
                  <QueueArc queue={place.queue[scene] ?? 0} type={place.type} />
                  <span className="font-mono text-[9px] uppercase tracking-meta text-mute">
                    q {place.queue[scene]}
                  </span>
                </div>
              ) : null}
            </div>

            <p className="mt-3 max-w-[34ch] text-[15px] leading-6 text-ink/85">
              {place.blurb}
            </p>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-meta text-mute">
              <span>{place.hours}</span>
              {place.startsInMinutes?.[scene] != null &&
                place.startsInMinutes[scene]! > 0 && (
                  <span className="text-accent">
                    Starts in {place.startsInMinutes[scene]}m
                  </span>
                )}
              <span>{livelinessOf(place, scene)} alive · {SCENE_META[scene].clock}</span>
            </div>

            <div className="mt-4 border-t border-white/[0.06] pt-3">
              <div className="mb-1 flex items-baseline justify-between">
                <span className="font-mono text-[10px] uppercase tracking-meta text-mute">
                  Liveliness · 2h
                </span>
                <span className="font-mono text-[10px] uppercase tracking-meta text-accent">
                  {livelinessOf(place, scene)}
                </span>
              </div>
              <Sparkline
                points={sparklineFor(place.id, livelinessOf(place, scene))}
                className="h-9 w-full"
              />
            </div>

            {place.friendsNearby ? (
              <div className="mt-3 flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {Array.from({ length: Math.min(place.friendsNearby, 4) }).map(
                    (_, i) => (
                      <span
                        key={i}
                        className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-bg-2 bg-bg-3 font-mono text-[9px] text-accent"
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                    ),
                  )}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-meta text-mute">
                  {place.friendsNearby} friends nearby
                </span>
              </div>
            ) : null}

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={onPrimary}
                className="flex-1 rounded-chip bg-accent py-3 text-center font-display text-sm font-semibold tracking-tight text-bg"
              >
                {place.cta === "Join" && joined
                  ? "Joined"
                  : place.cta === "Save" && saved
                    ? "Saved"
                    : place.cta}
              </button>
              {place.cta !== "Save" && (
                <button
                  type="button"
                  onClick={onSave}
                  className="rounded-chip border border-white/10 px-4 py-3 font-mono text-[11px] uppercase tracking-meta text-ink"
                >
                  {saved ? "Saved" : "Save"}
                </button>
              )}
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
