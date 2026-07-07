import { cn } from "@/lib/utils";

export type SectionBandDecorVariant = "warm" | "subtle";

/** 1-based index after page hero. Odd (1,3,5…) = muted; even (2,4,6…) = warm accent. */
export function sectionBand(index: number) {
  const warm = index % 2 === 0;

  return {
    decorVariant: (warm ? "warm" : "subtle") as SectionBandDecorVariant,
    className: cn("section-band", warm && "section-band--warm"),
  };
}

export function withSectionBand(index: number, ...classes: (string | undefined)[]) {
  const { className } = sectionBand(index);
  return cn(...classes, className);
}
