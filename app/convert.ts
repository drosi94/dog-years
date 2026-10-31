export const RATE = { s: 4, m: 5, l: 6, x: 7 } as const;
export type Size = keyof typeof RATE;
export const LABELS: Record<Size, string> = { s: "Μικρός", m: "Μεσαίος", l: "Μεγάλος", x: "Τεράστιος" };

export function toHuman(d: number, size: Size) {
  if (d <= 1) return 15 * d;
  if (d <= 2) return 15 + 9 * (d - 1);
  return 24 + RATE[size] * (d - 2);
}
export function toDog(h: number, size: Size) {
  if (h <= 15) return h / 15;
  if (h <= 24) return 1 + (h - 15) / 9;
  return 2 + (h - 24) / RATE[size];
}
export const fmt = (n: number) => String(Math.round(n * 10) / 10);
