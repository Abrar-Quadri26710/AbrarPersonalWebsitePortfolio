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
    const colors = ["#2dd4bf", "#5eead4", "#f59e0b", "#fbbf24", "#38bdf8"];

    // Normalized vector direction
    const len = Math.hypot(vector.dx, vector.dy) || 1;
    const normX = vector.dx / len;
    const normY = vector.dy / len;

    const spawnStreak = () => {
      // Warp speed lines from center or opposite of flight vector
      if (phase === "climb") {
        // Warp lines bursting from center outwards
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 80 + 20;
        const speed = Math.random() * 22 + 16;
        streaks.push({
          x: width / 2 + Math.cos(angle) * dist,
          y: height / 2 + Math.sin(angle) * dist,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          len: Math.random() * 100 + 50,
          alpha: Math.random() * 0.8 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          width: Math.random() * 2 + 1,
        });
      } else {
        // Directional thruster streaks streaming opposite to flight motion
        const speed = Math.random() * 24 + 18;
        streaks.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: -normX * speed,
          vy: -normY * speed,
          len: Math.random() * 120 + 60,
          alpha: Math.random() * 0.85 + 0.15,
          color: colors[Math.floor(Math.random() * colors.length)],
          width: Math.random() * 2.2 + 0.8,
        });
      }
    };

    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (active) {
        tick++;
        // Emit bursts of speed particles during flight
        spawnStreak();
        spawnStreak();
        if (tick % 2 === 0) spawnStreak();
      }

      for (let i = streaks.length - 1; i >= 0; i--) {
        const s = streaks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha *= 0.93;

        if (s.alpha <= 0.02 || s.x < -100 || s.x > width + 100 || s.y < -100 || s.y > height + 100) {
          streaks.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.lineWidth = s.width;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        // Streak tail
        const tailX = s.vx !== 0 ? s.x - (s.vx / Math.hypot(s.vx, s.vy)) * s.len : s.x;
        const tailY = s.vy !== 0 ? s.y - (s.vy / Math.hypot(s.vx, s.vy)) * s.len : s.y;
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [active, phase, vector.dx, vector.dy]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-25 transition-opacity duration-300 ${
        active ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
