"use client";

import SubpageCompactHero from "@/components/ui/SubpageCompactHero";
import { heroHeading, heroParagraph } from "./data";

export default function ContactPageHero() {
  return (
    <SubpageCompactHero
      title={heroHeading}
      subtitle={heroParagraph}
      align="center"
    />
  );
}
