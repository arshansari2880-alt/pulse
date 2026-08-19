export const RIVER_MAIN =
  "M -4 36 C 10 30 18 34 28 33 C 40 32 48 26 58 29 C 70 32 82 40 104 38";

export const RIVER_BRANCH =
  "M 8 92 C 18 84 26 74 32 64 C 36 56 40 49 46 44";

export const ROADS = [
  "M 10 26 C 22 32 30 38 38 46 C 44 54 40 68 42 86",
  "M 36 38 L 41 92",
  "M 40 48 L 50 78",
  "M 48 34 C 56 36 68 38 88 32",
  "M 58 22 L 64 52 L 54 88",
  "M 4 48 L 36 52 L 62 48 L 96 54",
  "M 28 18 L 34 44",
  "M 70 28 L 76 70",
];

export const NEIGHBORHOODS: {
  id: string;
  name: string;
  x: number;
  y: number;
  d: string;
}[] = [
  {
    id: "baner",
    name: "BANER",
    x: 16,
    y: 24,
    d: "M 6 16 C 14 10 24 12 28 20 C 32 28 24 34 14 34 C 6 34 2 26 6 16 Z",
  },
  {
    id: "aundh",
    name: "AUNDH",
    x: 32,
    y: 16,
    d: "M 26 8 C 34 4 44 8 46 16 C 46 22 38 26 30 24 C 24 22 22 14 26 8 Z",
  },
  {
    id: "kp",
    name: "KOREGAON PARK",
    x: 66,
    y: 36,
    d: "M 54 30 C 62 24 76 26 80 34 C 82 42 74 50 64 50 C 54 50 48 42 54 30 Z",
  },
  {
    id: "kalyani",
    name: "KALYANI NAGAR",
    x: 84,
    y: 28,
    d: "M 76 22 C 84 16 96 18 98 26 C 98 34 90 38 82 36 C 74 34 72 26 76 22 Z",
  },
  {
    id: "deccan",
    name: "DECCAN",
    x: 30,
    y: 58,
    d: "M 22 50 C 30 46 40 50 42 58 C 42 66 32 70 24 66 C 18 62 18 54 22 50 Z",
  },
  {
    id: "fc",
    name: "FC ROAD",
    x: 40,
    y: 64,
    d: "M 34 52 C 40 50 48 56 48 66 C 48 76 42 82 36 78 C 30 72 30 56 34 52 Z",
  },
  {
    id: "camp",
    name: "CAMP",
    x: 58,
    y: 84,
    d: "M 48 74 C 58 70 70 74 72 84 C 72 94 62 98 52 94 C 44 90 42 80 48 74 Z",
  },
  {
    id: "viman",
    name: "VIMAN NAGAR",
    x: 90,
    y: 42,
    d: "M 84 36 C 92 32 102 36 102 44 C 100 52 90 54 84 50 C 80 46 80 40 84 36 Z",
  },
];
