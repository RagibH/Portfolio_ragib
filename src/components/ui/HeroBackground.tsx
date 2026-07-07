"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import MouseLight from "@/components/ui/MouseLight";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
  life: number;
  maxLife: number;
}

function NoiseLayer({ canvasRef }: { canvasRef: React.RefObject<HTMLCanvasElement | null> }) {
  const reducedMotion = usePrefersReducedMotion();
  const frameRef = useRef(0);
  const offsetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();

    const draw = () => {
      if (!ctx) return;

      offsetRef.current += 0.15;
      ctx.clearRect(0, 0, width, height);

      const imageData = ctx.createImageData(Math.ceil(width / 4), Math.ceil(height / 4));
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = 8;
      }

      ctx.putImageData(imageData, -offsetRef.current % 4, 0);
      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef, reducedMotion]);

  return null;
}

function ParticleLayer({
  canvasRef,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const createParticle = (): Particle => {
      const maxLife = 240 + Math.random() * 280;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        opacity: 0,
        size: Math.random() * 0.9 + 0.25,
        life: 0,
        maxLife,
      };
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();

    const count = Math.min(45, Math.floor((width * height) / 22000));
    particlesRef.current = Array.from({ length: count }, () => {
      const particle = createParticle();
      particle.life = Math.random() * particle.maxLife;
      return particle;
    });

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particlesRef.current.length; i++) {
        const particle = particlesRef.current[i];
        particle.life += 1;
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        const progress = particle.life / particle.maxLife;
        if (progress < 0.25) {
          particle.opacity = (progress / 0.25) * 0.18;
        } else if (progress > 0.75) {
          particle.opacity = ((1 - progress) / 0.25) * 0.18;
        } else {
          particle.opacity = 0.18;
        }

        if (particle.life >= particle.maxLife) {
          particlesRef.current[i] = createParticle();
          continue;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 155, 118, ${particle.opacity})`;
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef, reducedMotion]);

  return null;
}

export default function HeroBackground() {
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div
      data-intro="background"
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Layer 1 — radial depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 85% 70% at 50% 38%, rgba(21, 18, 16, 0.55) 0%, transparent 62%),
            radial-gradient(ellipse 120% 90% at 50% 100%, rgba(8, 7, 6, 0.85) 0%, transparent 55%),
            #0D0B09
          `,
        }}
      />

      {/* Layer 2 — animated noise */}
      <canvas
        ref={noiseCanvasRef}
        className="absolute inset-0 h-full w-full opacity-[0.35] mix-blend-overlay"
      />
      <NoiseLayer canvasRef={noiseCanvasRef} />

      {/* Layer 3 — particles */}
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 h-full w-full opacity-80"
      />
      <ParticleLayer canvasRef={particleCanvasRef} />

      {/* Mouse-reactive ambient light */}
      <MouseLight />

      {/* Layer 4 — vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 42%, rgba(0,0,0,0.48) 100%)",
        }}
      />
    </div>
  );
}
