"use client";

const particles = [
  { x: 58, y: 72, s: 3, d: 0 },
  { x: 318, y: 98, s: 2.5, d: 0.4 },
  { x: 92, y: 168, s: 2, d: 0.8 },
  { x: 340, y: 210, s: 3, d: 1.2 },
  { x: 48, y: 248, s: 2.5, d: 1.6 },
  { x: 352, y: 290, s: 2, d: 2 },
  { x: 76, y: 332, s: 3, d: 2.4 },
  { x: 328, y: 352, s: 2.5, d: 2.8 },
  { x: 120, y: 118, s: 2, d: 1.1 },
  { x: 280, y: 156, s: 2.5, d: 1.7 },
  { x: 200, y: 48, s: 2, d: 0.6 },
  { x: 260, y: 318, s: 2, d: 2.2 },
];

function Platform({
  id,
  className,
}: {
  id: string;
  className: string;
}) {
  return (
    <g className={className}>
      <path
        className="toolkit-visual__face toolkit-visual__face--left"
        d="M 118 248 L 52 286 L 52 298 L 118 260 Z"
      />
      <path
        className="toolkit-visual__face toolkit-visual__face--right"
        d="M 118 248 L 278 176 L 278 188 L 118 260 Z"
      />
      <path
        className="toolkit-visual__face toolkit-visual__face--top"
        d="M 52 286 L 118 248 L 278 176 L 212 214 Z"
        fill="url(#toolkitTop)"
      />
      <path
        className="toolkit-visual__face toolkit-visual__face--grid"
        d="M 52 286 L 118 248 L 278 176 L 212 214 Z"
        fill="url(#toolkitGrid)"
      />
      <path
        className="toolkit-visual__edge toolkit-visual__edge--front"
        d="M 118 248 L 278 176"
      />
      <path
        className="toolkit-visual__edge toolkit-visual__edge--side"
        d="M 118 260 L 278 188"
      />
      <path
        className="toolkit-visual__corner toolkit-visual__corner--a"
        d="M 118 248 L 122 246 L 122 258 L 118 260 Z"
      />
      <path
        className="toolkit-visual__corner toolkit-visual__corner--b"
        d="M 274 176 L 278 174 L 278 186 L 274 188 Z"
      />
      {id === "top" ? (
        <g className="toolkit-visual__ui">
          <rect
            className="toolkit-visual__ui-block"
            x="138"
            y="198"
            width="34"
            height="22"
            rx="2"
          />
          <path
            className="toolkit-visual__ui-line"
            d="M 168 206 L 196 192 M 168 214 L 188 208"
          />
          <circle className="toolkit-visual__ui-dot" cx="148" cy="204" r="2.5" />
          <circle className="toolkit-visual__ui-dot" cx="148" cy="212" r="2.5" />
        </g>
      ) : null}
    </g>
  );
}

export default function ToolkitVisual() {
  return (
    <div className="toolkit-visual" aria-hidden="true">
      <div className="toolkit-visual__scene">
        <div className="toolkit-visual__ambient" />

        <svg
          className="toolkit-visual__svg"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="toolkitGrid"
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
              patternTransform="skewX(-30)"
            >
              <path
                d="M 16 0 L 0 0 L 0 16"
                stroke="rgba(200,155,118,0.12)"
                strokeWidth="0.6"
              />
            </pattern>

            <linearGradient id="toolkitTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(48,42,38,0.92)" />
              <stop offset="100%" stopColor="rgba(24,20,18,0.88)" />
            </linearGradient>

            <linearGradient id="toolkitSideL" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(34,30,28,0.95)" />
              <stop offset="100%" stopColor="rgba(16,14,13,0.98)" />
            </linearGradient>

            <linearGradient id="toolkitSideR" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(40,34,30,0.94)" />
              <stop offset="100%" stopColor="rgba(18,15,14,0.98)" />
            </linearGradient>

            <filter id="toolkitGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g className="toolkit-visual__particles">
            {particles.map((p, i) => (
              <rect
                key={i}
                className="toolkit-visual__particle"
                x={p.x}
                y={p.y}
                width={p.s}
                height={p.s}
                style={{ animationDelay: `${p.d}s` }}
              />
            ))}
          </g>

          <g className="toolkit-visual__platform toolkit-visual__platform--1">
            <Platform id="bottom" className="toolkit-visual__platform-inner" />
          </g>

          <g className="toolkit-visual__platform toolkit-visual__platform--2">
            <Platform id="middle" className="toolkit-visual__platform-inner" />
          </g>

          <g className="toolkit-visual__platform toolkit-visual__platform--3">
            <Platform id="top" className="toolkit-visual__platform-inner" />
          </g>
        </svg>
      </div>
    </div>
  );
}
