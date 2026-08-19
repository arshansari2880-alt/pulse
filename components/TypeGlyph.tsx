"use client";

import type { PlaceType } from "@/lib/types";

const paths: Record<PlaceType, { d: string; fill: boolean }> = {
  now: { d: "M4.2 2.4 L11.2 7 L4.2 11.6 Z", fill: true },
  table: { d: "M3 4.2 h8 v1.2 C11 9.6 9.2 11.4 7 11.4 S3 9.6 3 5.4 Z", fill: false },
  ground: { d: "M7 2.2 L11.6 7 L7 11.8 L2.4 7 Z", fill: true },
  move: { d: "M3.2 8.8 L7 3.2 L10.8 8.8 M7 3.2 V11.2", fill: false },
};

export function TypeGlyph({
  type,
  className = "h-3 w-3",
}: {
  type: PlaceType;
  className?: string;
}) {
  const g = paths[type];
  return (
    <svg
      viewBox="0 0 14 14"
      className={className}
      fill={g.fill ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={g.fill ? 0 : 1.4}
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden
    >
      <path d={g.d} />
    </svg>
  );
}

export function TypeGlyphMark({
  type,
  color,
}: {
  type: PlaceType;
  color: string;
}) {
  const g = paths[type];
  return (
    <g transform="translate(-7 -7)">
      <path
        d={g.d}
        fill={g.fill ? color : "none"}
        stroke={color}
        strokeWidth={g.fill ? 0 : 1.4}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </g>
  );
}
