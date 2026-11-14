"use client";

import { useEffect, useState, useRef } from "react";

interface FireflyIntroProps {
  onComplete?: () => void;
  forcePlay?: boolean;
}

export default function FireflyIntro({ onComplete, forcePlay = false }: FireflyIntroProps) {
  const [phase, setPhase] = useState<"idle" | "ignite" | "combust" | "dissolve" | "done">("idle");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Sequence timeline - plays on every fresh load / refresh
    setPhase("idle");
    const t0 = setTimeout(() => setPhase("ignite"), 250);
    const t1 = setTimeout(() => setPhase("combust"), 950);
    const t2 = setTimeout(() => setPhase("dissolve"), 2100);
    const t3 = setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, 2800);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        skipIntro();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("keydown", handleKeyDown);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [forcePlay]);

  // Canvas ember particles during combustion
  useEffect(() => {
    if (phase === "done") return;
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

    // Particle emitter
    interface Ember {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      maxLife: number;
      life: number;
      color: string;
    }

    const embers: Ember[] = [];
    const colors = [
      "rgba(94, 234, 212, ",  // Firefly Teal
      "rgba(45, 212, 191, ",  // Cyan
      "rgba(251, 191, 36, ",  // Warm Amber
      "rgba(245, 158, 11, ",  // Deep Gold
    ];

    const spawnEmbers = (count: number) => {
      for (let i = 0; i < count; i++) {
        const isHorizontal = Math.random() > 0.3;
        embers.push({
          x: width / 2 + (Math.random() - 0.5) * (isHorizontal ? width * 0.8 : 80),
          y: height / 2 + (Math.random() - 0.5) * 40,
          vx: (Math.random() - 0.5) * (phase === "combust" ? 8 : 3),
          vy: -Math.random() * (phase === "combust" ? 7 : 4) - 1,
          size: Math.random() * 2.5 + 1,
          alpha: Math.random() * 0.8 + 0.2,
          life: 0,
          maxLife: Math.random() * 60 + 40,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      tick++;
      if (phase === "ignite" && tick % 3 === 0) spawnEmbers(3);
      if (phase === "combust" && tick % 2 === 0) spawnEmbers(8);
      if (phase === "dissolve" && tick % 6 === 0) spawnEmbers(2);

      for (let i = embers.length - 1; i >= 0; i--) {
        const p = embers[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const currentAlpha = p.alpha * (1 - p.life / p.maxLife);
        if (p.life >= p.maxLife || currentAlpha <= 0) {
          embers.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [phase]);

  const skipIntro = () => {
    setPhase("done");
    onComplete?.();
  };

  if (phase === "done") return null;

  return (
    <div
      onClick={skipIntro}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#070908] cursor-pointer select-none transition-opacity duration-900 ${
        phase === "dissolve" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Skip button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          skipIntro();
        }}
        className="absolute top-8 right-8 z-20 text-[11px] uppercase tracking-[0.25em] text-neutral-400 hover:text-white px-3 py-1.5 border border-neutral-800 hover:border-neutral-600 transition-colors"
      >
        Skip [ESC]
      </button>

      {/* HUD Telemetry Frame (Precision Mecha Visor) */}
      <div
        className={`absolute inset-6 md:inset-12 pointer-events-none transition-all duration-700 ${
          phase === "combust" ? "opacity-90 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Corner Reticles */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-teal-400/80" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-teal-400/80" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-teal-400/80" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-teal-400/80" />

        {/* Tactical Readouts */}
        <div className="absolute top-0 left-12 text-[10px] tracking-[0.3em] font-mono text-teal-400/80 uppercase">
          SYSTEM // COMPLETE COMBUSTION
        </div>
        <div className="absolute bottom-0 right-12 text-[10px] tracking-[0.3em] font-mono text-amber-400/80 uppercase">
          AR-267 // COCKPIT INTERFACE ONLINE
        </div>
      </div>

      {/* Center Cinematic Action */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Core Focal Point (Pre-ignition Spark) */}
        <div
          className={`relative transition-all duration-500 ${
            phase === "idle"
              ? "scale-100 opacity-100"
              : phase === "ignite"
              ? "scale-150 opacity-100"
              : "scale-[30] opacity-0"
          }`}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-teal-300" />
          <div className="absolute inset-0 -m-2 rounded-full border border-teal-400/50 animate-ping" />
        </div>

        {/* Anamorphic Ignition Slash (Horizontal Laser Slash) */}
        <div
          className={`absolute pointer-events-none h-[2px] transition-all duration-500 ease-out ${
            phase === "ignite"
              ? "w-[85vw] opacity-100 bg-teal-300"
              : phase === "combust"
              ? "w-[100vw] h-[4px] opacity-100 bg-amber-200"
              : "w-0 opacity-0"
          }`}
        />

        {/* Combustion Shockwave / Light Burst */}
        <div
          className={`absolute pointer-events-none w-[600px] h-[600px] rounded-full transition-all duration-700 ${
            phase === "combust"
              ? "opacity-35 scale-150 bg-teal-500/20"
              : "opacity-0 scale-50"
          }`}
        />

        {/* Tactical Status Readout (No quotes/clichés) */}
        <div
          className={`mt-16 text-center transition-all duration-500 ${
            phase === "combust"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-xs tracking-[0.35em] font-mono uppercase text-teal-300 font-semibold block">
            SAM PROTOCOL // AR-267 ACTIVE
          </span>
          <span className="text-[10px] tracking-[0.25em] text-neutral-400 font-mono mt-1.5 block">
            INITIALIZING CORE TELEMETRY
          </span>
        </div>
      </div>
    </div>
  );
}
