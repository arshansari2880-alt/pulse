export type PlaceType = "now" | "table" | "ground" | "move";
export type Scene = "evening" | "saturday" | "late";
export type Filter = "all" | PlaceType;

export type Place = {
  id: string;
  name: string;
  type: PlaceType;
  neighborhood: string;
  address: string;
  x: number;
  y: number;
  distanceKm: number;
  liveliness: Record<Scene, number>;
  startsInMinutes?: Partial<Record<Scene, number>>;
  queue?: Partial<Record<Scene, number>>;
  blurb: string;
  hours: string;
  friendsNearby?: number;
  cta: string;
};

export type Camera = {
  x: number;
  y: number;
  z: number;
};

export type Bloom = {
  id: string;
  x: number;
  y: number;
  count: number;
  places: Place[];
  dominant: PlaceType;
};

export type ClusterItem =
  | { kind: "pin"; place: Place }
  | { kind: "bloom"; bloom: Bloom };
