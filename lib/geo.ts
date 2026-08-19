import type { Place, PlaceType, Scene } from "./types";

export const MAP = {
  width: 100,
  height: 132,
} as const;

export const USER = { x: 62.4, y: 40.8 } as const;

export const TYPE_META: Record<
  PlaceType,
  { label: string; short: string }
> = {
  now: { label: "Now", short: "NOW" },
  table: { label: "Table", short: "TABLE" },
  ground: { label: "Ground", short: "GROUND" },
  move: { label: "Move", short: "MOVE" },
};

export const SCENE_META: Record<
  Scene,
  { label: string; clock: string; line: string }
> = {
  evening: {
    label: "Evening",
    clock: "8:41 PM",
    line: "Koregaon Park",
  },
  saturday: {
    label: "Saturday",
    clock: "SAT · 8:00 PM",
    line: "FC Road",
  },
  late: {
    label: "Late",
    clock: "1:14 AM",
    line: "The city went quiet",
  },
};

export const SCENE_CAMERA: Record<Scene, { x: number; y: number; z: number }> = {
  evening: { x: 58, y: 46, z: 1.62 },
  saturday: { x: 40.2, y: 62.8, z: 2.05 },
  late: { x: 56, y: 44, z: 1.38 },
};

export function livelinessOf(place: Place, scene: Scene) {
  return place.liveliness[scene];
}

export function isAwake(place: Place, scene: Scene, widen: boolean) {
  const live = livelinessOf(place, scene);
  if (scene === "late") return live >= (widen ? 4 : 14);
  return live >= 8;
}

export function pulseDuration(liveliness: number) {
  const t = Math.max(0, Math.min(100, liveliness)) / 100;
  return 3.35 - t * 2.15;
}

export function dist(ax: number, ay: number, bx: number, by: number) {
  const dx = ax - bx;
  const dy = ay - by;
  return Math.hypot(dx, dy);
}

export function curvePath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  return `M ${x1} ${y1} Q ${mx - dy * 0.18} ${my + dx * 0.18} ${x2} ${y2}`;
}

export function sparklineFor(id: string, current: number) {
  let seed = 0;
  for (let i = 0; i < id.length; i++) seed = (seed * 31 + id.charCodeAt(i)) >>> 0;
  const pts: number[] = [];
  let v = Math.max(8, current - 28);
  for (let i = 0; i < 12; i++) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const n = (seed % 1000) / 1000;
    v = Math.max(4, Math.min(100, v + (n - 0.42) * 18));
    pts.push(i === 11 ? current : v);
  }
  return pts;
}
