"use client";

export function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      role="status"
      className="pointer-events-none absolute left-1/2 top-24 z-50 -translate-x-1/2 rounded-chip border border-white/10 bg-bg-2/95 px-4 py-2 font-mono text-[11px] uppercase tracking-meta text-accent shadow-lg backdrop-blur"
    >
      {message}
    </div>
  );
}
