import type { ClusterItem, Place } from "./types";
import { dist } from "./geo";

export function clusterPlaces(places: Place[], zoom: number): ClusterItem[] {
  const threshold = 6.8 / zoom;
  const remaining = [...places];
  const items: ClusterItem[] = [];

  while (remaining.length) {
    const origin = remaining.shift()!;
    const group = [origin];
    for (let i = remaining.length - 1; i >= 0; i--) {
      const candidate = remaining[i];
      if (dist(origin.x, origin.y, candidate.x, candidate.y) < threshold) {
        group.push(candidate);
        remaining.splice(i, 1);
      }
    }

    if (group.length >= 3) {
      const x = group.reduce((s, p) => s + p.x, 0) / group.length;
      const y = group.reduce((s, p) => s + p.y, 0) / group.length;
      const counts: Record<string, number> = {};
      for (const p of group) counts[p.type] = (counts[p.type] ?? 0) + 1;
      const dominant = (Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ??
        origin.type) as Place["type"];
      items.push({
        kind: "bloom",
        bloom: {
          id: `bloom-${group.map((p) => p.id).sort().join("-")}`,
          x,
          y,
          count: group.length,
          places: group,
          dominant,
        },
      });
    } else {
      for (const place of group) items.push({ kind: "pin", place });
    }
  }

  return items;
}
