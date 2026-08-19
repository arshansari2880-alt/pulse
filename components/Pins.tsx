"use client";

import { TypeGlyphMark } from "@/components/TypeGlyph";
import { livelinessOf, pulseDuration } from "@/lib/geo";
import type { Place, PlaceType, Scene } from "@/lib/types";

export function PinNode({
  place,
  scene,
  scale,
  selected,
  dimmed,
  reduced,
  filteredOut,
  onSelect,
}: {
  place: Place;
  scene: Scene;
  scale: number;
  selected: boolean;
  dimmed: boolean;
  reduced: boolean;
  filteredOut: boolean;
  onSelect: (id: string) => void;
}) {
  const live = livelinessOf(place, scene);
  const duration = pulseDuration(live);
  const mins = place.startsInMinutes?.[scene];
  const urgent =
    place.type === "now" &&
    mins != null &&
    mins > 0 &&
    mins <= 10 &&
    live >= 14;
  const silent = live < 15 || filteredOut;

  return (
    <g
      transform={`translate(${place.x} ${place.y}) scale(${scale})`}
      className="cursor-pointer"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(place.id);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(place.id);
        }
      }}
      tabIndex={filteredOut ? -1 : 0}
      data-pin
      data-x={place.x}
      data-y={place.y}
      data-pin-scale="1"
      role="button"
      aria-label={`${place.name}, ${place.type}, ${live} alive`}
      opacity={filteredOut ? 0.12 : dimmed ? 0.3 : 1}
    >
      {!silent && !selected && !reduced && (
        <circle
          r="13"
          fill="none"
          stroke="#BAFF26"
          strokeWidth="1.1"
          className="origin-center"
          style={{
            animation: `pinPing ${urgent ? Math.max(0.85, duration * 0.55) : duration}s cubic-bezier(0.12,0.7,0.3,1) infinite`,
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
        />
      )}
      {selected && (
        <circle r="16" fill="none" stroke="#BAFF26" strokeWidth="1" opacity="0.4" />
      )}
      <circle
        r="10"
        fill={selected ? "#BAFF26" : "#0A0C08"}
        stroke="#BAFF26"
        strokeWidth="1.5"
      />
      <TypeGlyphMark type={place.type} color={selected ? "#0A0C08" : "#BAFF26"} />
      {urgent && !filteredOut && (
        <text
          y="-16"
          textAnchor="middle"
          fill="#BAFF26"
          fontSize="7"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          letterSpacing="0.12"
        >
          {place.startsInMinutes?.[scene]}M
        </text>
      )}
    </g>
  );
}

export function BloomNode({
  x,
  y,
  count,
  dominant,
  scale,
  dimmed,
  onOpen,
}: {
  x: number;
  y: number;
  count: number;
  dominant: PlaceType;
  scale: number;
  dimmed: boolean;
  onOpen: () => void;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale * 1.18})`}
      className="cursor-pointer"
      opacity={dimmed ? 0.35 : 1}
      data-pin
      data-x={x}
      data-y={y}
      data-pin-scale="1.18"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      role="button"
      tabIndex={0}
      aria-label={`${count} places clustered`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      {!dimmed && (
        <circle
          r="16"
          fill="none"
          stroke="#BAFF26"
          strokeWidth="1"
          style={{
            animation: "pinPing 2.8s cubic-bezier(0.12,0.7,0.3,1) infinite",
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
        />
      )}
      <circle r="13" fill="#BAFF26" fillOpacity="0.14" stroke="#BAFF26" strokeWidth="1.3" />
      <text
        y="1.5"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#BAFF26"
        fontSize="11"
        fontFamily="var(--font-display), system-ui, sans-serif"
        fontWeight="700"
      >
        {count}
      </text>
      <g transform="translate(0 8) scale(0.72)">
        <TypeGlyphMark type={dominant} color="#BAFF26" />
      </g>
    </g>
  );
}

export function UserPuck({ scale }: { scale: number }) {
  return (
    <g
      transform={`translate(62.4 40.8) scale(${scale})`}
      data-pin-scale="0.92"
      data-x="62.4"
      data-y="40.8"
    >
      <circle r="16" fill="#BAFF26" fillOpacity="0.08" />
      <circle r="6.5" fill="#BAFF26" />
      <circle r="2.4" fill="#0A0C08" />
      <text
        y="18"
        textAnchor="middle"
        fill="#F4F1EA"
        fontSize="6.2"
        fontFamily="var(--font-mono), ui-monospace, monospace"
        letterSpacing="0.16"
      >
        YOU
      </text>
    </g>
  );
}
