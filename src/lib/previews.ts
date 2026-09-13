import manifest from "@/content/previews.generated.json";

export interface Shot {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

const shots = manifest as Record<string, { desktop?: Shot; mobile?: Shot }>;

/** Desktop and mobile screenshots captured by `npm run previews`. */
export function getShots(slug: string) {
  return shots[slug] ?? {};
}
