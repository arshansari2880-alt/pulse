"use client";

import type { PlaceType } from "@/lib/types";

export function Sparkline({
  points,
  className,
}: {
  points: number[];
  className?: string;
}) {
  const w = 160;
  const h = 36;
  const max = 100;
  const step = w / (points.length - 1);
  const d = points
    .map((p, i) => {
      const x = i * step;
      const y = h - (p / max) * (h - 4) - 2;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} aria-hidden>
      <path d={d} fill="none" stroke="#BAFF26" strokeWidth="1.4" strokeLinecap="round" />
      <circle
        cx={(points.length - 1) * step}
        cy={h - (points[points.length - 1] / max) * (h - 4) - 2}
        r="2.2"
        fill="#BAFF26"
      />
    </svg>
  );
}

export function QueueArc({
  queue,
  type,
}: {
  queue: number;
  type: PlaceType;
}) {
  if (type !== "table" || queue <= 0) return null;
  const t = Math.min(1, queue / 30);
  const r = 10;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 28 28" className="h-7 w-7" aria-hidden>
      <circle cx="14" cy="14" r={r} fill="none" stroke="rgba(244,241,234,0.12)" strokeWidth="2" />
      <circle
        cx="14"
        cy="14"
        r={r}
        fill="none"
        stroke="#BAFF26"
        strokeWidth="2"
        strokeDasharray={`${c * t} ${c}`}
        strokeLinecap="round"
        transform="rotate(-90 14 14)"
      />
    </svg>
  );
}
