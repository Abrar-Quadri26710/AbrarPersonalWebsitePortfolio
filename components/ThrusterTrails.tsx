"use client";

import { useEffect, useRef } from "react";

interface ThrusterTrailsProps {
  active: boolean;
  phase?: "idle" | "climb" | "dive";
  vector?: { dx: number; dy: number };
}

export default function ThrusterTrails({
  active,
  phase = "idle",
  vector = { dx: 1, dy: 0 },
}: ThrusterTrailsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!active) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
      return;
    }

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    interface Streak {
      x: number;
      y: number;
      vx: number;
      vy: number;
      len: number;
      alpha: number;
      color: string;
      width: number;
    }

    const streaks: Streak[] = [];
    const colors = ["#2dd4bf", "#5eead4", "#38bdf8", "#fbbf24"];

    const len = Math.hypot(vector.dx, vector.dy) || 1;
    const normX = vector.dx / len;
    const normY = vector.dy / len;

    const spawnStreak = () => {
      if (streaks.length > 25) return; // Keep capped for 60fps performance
      const speed = Math.random() * 22 + 16;
      streaks.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: -normX * speed,
        vy: -normY * speed,
        len: Math.random() * 90 + 40,
        alpha: Math.random() * 0.75 + 0.25,
        color: colors[Math.floor(Math.random() * colors.length)],
        width: Math.random() * 2 + 1,
      });
    };

    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      tick++;
      if (tick % 2 === 0) spawnStreak();

      for (let i = streaks.length - 1; i >= 0; i--) {
        const s = streaks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha *= 0.91;

        if (s.alpha <= 0.03 || s.x < -80 || s.x > width + 80 || s.y < -80 || s.y > height + 80) {
          streaks.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.lineWidth = s.width;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        const tailX = s.vx !== 0 ? s.x - (s.vx / Math.hypot(s.vx, s.vy)) * s.len : s.x;
        const tailY = s.vy !== 0 ? s.y - (s.vy / Math.hypot(s.vx, s.vy)) * s.len : s.y;
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
    };
  }, [active, phase, vector.dx, vector.dy]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-25 opacity-90"
    />
  );
}
