"use client";

import { NEIGHBORHOODS, RIVER_BRANCH, RIVER_MAIN, ROADS } from "@/lib/map-paths";
import { MAP, USER } from "@/lib/geo";

export function MapSvg({
  viewBox,
  saturdayHeat,
}: {
  viewBox: string;
  saturdayHeat: boolean;
}) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden
    >
      <defs>
        <filter id="heat" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
        <linearGradient id="river" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#BAFF26" stopOpacity="0.05" />
          <stop offset="50%" stopColor="#BAFF26" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#BAFF26" stopOpacity="0.06" />
        </linearGradient>
      </defs>

      <rect
        x={-40}
        y={-40}
        width={MAP.width + 80}
        height={MAP.height + 80}
        fill="#0A0C08"
      />

      {NEIGHBORHOODS.map((n) => (
        <path
          key={n.id}
          d={n.d}
          fill="#1A1F14"
          fillOpacity={n.id === "fc" && saturdayHeat ? 0.95 : 0.55}
          stroke="#BAFF26"
          strokeOpacity="0.06"
          strokeWidth="0.25"
        />
      ))}

      {saturdayHeat && (
        <ellipse
          cx="40.2"
          cy="63"
          rx="14"
          ry="16"
          fill="#BAFF26"
          fillOpacity="0.07"
          filter="url(#heat)"
        />
      )}

      {ROADS.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="#BAFF26"
          strokeOpacity="0.09"
          strokeWidth="0.22"
          strokeLinecap="round"
        />
      ))}

      <path
        d={RIVER_MAIN}
        fill="none"
        stroke="url(#river)"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d={RIVER_MAIN}
        fill="none"
        stroke="#BAFF26"
        strokeWidth="0.35"
        strokeOpacity="0.35"
        className="river-flow"
        strokeLinecap="round"
      />
      <path
        d={RIVER_BRANCH}
        fill="none"
        stroke="#BAFF26"
        strokeWidth="0.7"
        strokeOpacity="0.14"
        strokeLinecap="round"
      />

      {NEIGHBORHOODS.map((n) => (
        <text
          key={`${n.id}-label`}
          x={n.x}
          y={n.y}
          textAnchor="middle"
          fill="#8A8D80"
          fillOpacity="0.72"
          fontSize="1.7"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          letterSpacing="0.18"
        >
          {n.name}
        </text>
      ))}

      <circle
        cx={USER.x}
        cy={USER.y}
        r="2.6"
        fill="#BAFF26"
        fillOpacity="0.12"
        className="puck-ring"
      />
    </svg>
  );
}
