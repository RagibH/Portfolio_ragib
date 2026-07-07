export type CursorTheme = "default" | "hero" | "research" | "contact" | "warm";
export type CursorState = "default" | "link" | "button" | "text" | "hidden";

const SECTION_THEME_RULES: Array<{ match: (id: string) => boolean; theme: CursorTheme }> = [
  { match: (id) => id === "hero", theme: "hero" },
  {
    match: (id) =>
      id === "contact" ||
      id.startsWith("contact-") ||
      id === "introduction",
    theme: "contact",
  },
  {
    match: (id) =>
      id === "research" ||
      id.startsWith("research") ||
      id === "experience" ||
      id.startsWith("experience"),
    theme: "research",
  },
  {
    match: (id) =>
      id.includes("cta") ||
      id === "projects" ||
      id.startsWith("project") ||
      id === "leadership",
    theme: "warm",
  },
];

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, summary, label[for], .premium-button, [data-cursor="pointer"]';

const TEXT_INPUT_SELECTOR =
  'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]):not([type="hidden"]), textarea, select, [contenteditable="true"]';

export function resolveCursorTheme(element: Element | null): CursorTheme {
  if (!element) return "default";

  const section = element.closest("section[id], .subpage-compact-hero, main");
  if (!section) return "default";

  if (section.classList.contains("subpage-compact-hero")) return "hero";

  const id = section.id;
  if (!id) return "default";

  for (const rule of SECTION_THEME_RULES) {
    if (rule.match(id)) return rule.theme;
  }

  return "default";
}

export function resolveCursorState(element: Element | null): CursorState {
  if (!element) return "default";

  const interactive = element.closest(INTERACTIVE_SELECTOR);
  if (!interactive) return "default";

  if (interactive.matches(TEXT_INPUT_SELECTOR)) return "text";
  if (interactive.matches("a")) return "link";
  if (
    interactive.matches(
      'button, [role="button"], .premium-button, input[type="submit"], input[type="button"], input[type="reset"]'
    )
  ) {
    return "button";
  }

  return "link";
}

export function isCustomCursorSupported(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: fine)").matches &&
    window.matchMedia("(hover: hover)").matches
  );
}
