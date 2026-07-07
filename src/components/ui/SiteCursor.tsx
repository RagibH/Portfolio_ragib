"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  isCustomCursorSupported,
  resolveCursorState,
  resolveCursorTheme,
  type CursorState,
  type CursorTheme,
} from "@/lib/cursor";

type Point = { x: number; y: number };

const DOT_LERP = 0.22;
const RING_LERP = 0.14;

export default function SiteCursor() {
  const reducedMotion = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>("hidden");
  const [theme, setTheme] = useState<CursorTheme>("default");
  const [pressed, setPressed] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const target = useRef<Point>({ x: -100, y: -100 });
  const dotPos = useRef<Point>({ x: -100, y: -100 });
  const ringPos = useRef<Point>({ x: -100, y: -100 });
  const frameRef = useRef(0);

  useEffect(() => {
    if (reducedMotion || !isCustomCursorSupported()) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const updateContext = (x: number, y: number) => {
      const element = document.elementFromPoint(x, y);
      setTheme(resolveCursorTheme(element));
      setState(resolveCursorState(element));
    };

    const onMove = (event: MouseEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
      updateContext(event.clientX, event.clientY);
    };

    const onLeave = () => setState("hidden");

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const animate = () => {
      dotPos.current.x += (target.current.x - dotPos.current.x) * DOT_LERP;
      dotPos.current.y += (target.current.y - dotPos.current.y) * DOT_LERP;
      ringPos.current.x += (target.current.x - ringPos.current.x) * RING_LERP;
      ringPos.current.y += (target.current.y - ringPos.current.y) * RING_LERP;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, 0)`;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [reducedMotion]);

  if (!enabled) return null;

  return (
    <div
      className="site-cursor"
      data-state={state}
      data-theme={theme}
      data-pressed={pressed ? "true" : "false"}
      aria-hidden="true"
    >
      <div ref={ringRef} className="site-cursor__ring" />
      <div ref={dotRef} className="site-cursor__dot" />
      <span ref={labelRef} className="site-cursor__label" />
    </div>
  );
}
