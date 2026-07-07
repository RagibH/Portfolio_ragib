import { gsap } from "./gsap";

const DEFAULT_EASE = "power3.out";
const DEFAULT_DURATION = 0.75;

/** Clears GSAP inline styles so CSS hover transforms keep working. */
const SCROLL_REVEAL_CLEAR = "transform,opacity,visibility,clipPath,filter";

type AnimationVars = gsap.TweenVars;

function scrollFrom(target: gsap.TweenTarget, fromVars: gsap.TweenVars, vars?: AnimationVars) {
  return gsap.from(target, {
    ...fromVars,
    clearProps: SCROLL_REVEAL_CLEAR,
    ...vars,
  });
}

export function reveal(target: gsap.TweenTarget, vars?: AnimationVars) {
  return scrollFrom(target, {
    autoAlpha: 0,
    y: 36,
    duration: 0.85,
    ease: DEFAULT_EASE,
  }, vars);
}

export function fadeUp(target: gsap.TweenTarget, vars?: AnimationVars) {
  return scrollFrom(target, {
    autoAlpha: 0,
    y: 28,
    duration: DEFAULT_DURATION,
    ease: DEFAULT_EASE,
  }, vars);
}

export function fadeIn(target: gsap.TweenTarget, vars?: AnimationVars) {
  return scrollFrom(target, {
    autoAlpha: 0,
    duration: DEFAULT_DURATION,
    ease: DEFAULT_EASE,
  }, vars);
}

export function scaleIn(target: gsap.TweenTarget, vars?: AnimationVars) {
  return scrollFrom(target, {
    autoAlpha: 0,
    scale: 0.94,
    duration: DEFAULT_DURATION,
    ease: DEFAULT_EASE,
  }, vars);
}

export function staggerReveal(
  targets: gsap.TweenTarget,
  vars?: AnimationVars & { stagger?: number }
) {
  const { stagger = 0.08, ...rest } = vars ?? {};

  return scrollFrom(targets, {
    autoAlpha: 0,
    y: 24,
    duration: DEFAULT_DURATION,
    ease: DEFAULT_EASE,
    stagger,
  }, rest);
}

export function textReveal(target: gsap.TweenTarget, vars?: AnimationVars) {
  return scrollFrom(target, {
    autoAlpha: 0,
    y: 36,
    duration: 0.9,
    ease: DEFAULT_EASE,
  }, vars);
}

export function pageEnter(target: gsap.TweenTarget, vars?: AnimationVars) {
  return scrollFrom(target, {
    autoAlpha: 0,
    y: 12,
    duration: 0.5,
    ease: "power2.out",
  }, vars);
}

export function fadeFromRight(target: gsap.TweenTarget, vars?: AnimationVars) {
  return scrollFrom(target, {
    autoAlpha: 0,
    x: 48,
    duration: 0.85,
    ease: DEFAULT_EASE,
  }, vars);
}

export function fadeFromLeft(target: gsap.TweenTarget, vars?: AnimationVars) {
  return scrollFrom(target, {
    autoAlpha: 0,
    x: -48,
    duration: 0.85,
    ease: DEFAULT_EASE,
  }, vars);
}

export function floatIn(target: gsap.TweenTarget, vars?: AnimationVars) {
  return scrollFrom(target, {
    autoAlpha: 0,
    y: 40,
    scale: 0.97,
    duration: 0.95,
    ease: DEFAULT_EASE,
  }, vars);
}

export function slideReveal(
  target: gsap.TweenTarget,
  vars?: AnimationVars & { fromDirection?: "left" | "right" }
) {
  const { fromDirection = "right", ...rest } = vars ?? {};
  const x = fromDirection === "right" ? 56 : -56;

  return scrollFrom(target, {
    autoAlpha: 0,
    x,
    duration: 0.9,
    ease: DEFAULT_EASE,
  }, rest);
}

export function imageReveal(
  target: gsap.TweenTarget,
  vars?: AnimationVars & { fromDirection?: "left" | "right" }
) {
  const { fromDirection = "right", ...rest } = vars ?? {};
  const x = fromDirection === "right" ? 64 : -64;

  return scrollFrom(target, {
    autoAlpha: 0,
    x,
    scale: 1.05,
    duration: 1,
    ease: DEFAULT_EASE,
  }, rest);
}

export function staggerFromSides(
  targets: gsap.TweenTarget,
  vars?: AnimationVars & { stagger?: number; fromDirection?: "left" | "right" }
) {
  const { stagger = 0.1, fromDirection, ...rest } = vars ?? {};
  const elements = gsap.utils.toArray(targets) as Element[];
  const tl = gsap.timeline();

  elements.forEach((el, index) => {
    const direction =
      fromDirection ?? (index % 2 === 0 ? "right" : "left");

    tl.add(
      slideReveal(el, {
        fromDirection: direction,
        ...rest,
      }),
      index === 0 ? 0 : `<${stagger}`
    );
  });

  return tl;
}
