"use client";

import { useEffect, useRef } from "react";

interface CosmicStarfieldProps {
  cameraX: number;
  cameraY: number;
  isFlight: boolean;
  flightVector?: { dx: number; dy: number };
}

interface Star {
  x: number; // 0 to 1 normalized
  y: number; // 0 to 1 normalized
  z: number; // 0.15 (deep), 0.45 (mid), 0.9 (foreground)
  size: number;
  color: string;
  twinkleSpeed: number;
  twinklePhase: number;
  hasFlare: boolean;
}

interface StardustMote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export default function CosmicStarfield({
  cameraX,
  cameraY,
  isFlight,
  flightVector = { dx: 0, dy: 1 },
}: CosmicStarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  // References to keep render loop in sync without restarting
  const stateRef = useRef({
    cameraX,
    cameraY,
    isFlight,
    flightVector,
    currentCamX: cameraX,
    currentCamY: cameraY,
    flightTransition: 0, // 0 = idle, 1 = full warp speed
  });

  useEffect(() => {
    stateRef.current.cameraX = cameraX;
    stateRef.current.cameraY = cameraY;
    stateRef.current.isFlight = isFlight;
    stateRef.current.flightVector = flightVector;
  }, [cameraX, cameraY, isFlight, flightVector]);

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

    // Color palettes for varied astronomical spectral classes
    const starColors = [
      "#f8fafc", // Pure white dwarf
      "#bae6fd", // Sky blue giant
      "#a7f3d0", // Emerald tint
      "#99f6e4", // Teal glow
      "#fef08a", // Warm yellow star
      "#e9d5ff", // Violet starlight
    ];

    // Generate ~260 stars across 3 distinct parallax depths
    const STAR_COUNT = 260;
    const stars: Star[] = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      const rand = Math.random();
      let z = 0.18; // 60% deep stars
      let size = Math.random() * 0.9 + 0.6;
      let hasFlare = false;

      if (rand > 0.6 && rand <= 0.88) {
        z = 0.48; // 28% mid stars
        size = Math.random() * 1.3 + 1.1;
      } else if (rand > 0.88) {
        z = 0.95; // 12% foreground stars
        size = Math.random() * 1.8 + 1.8;
        hasFlare = Math.random() > 0.4;
      }

      stars.push({
        x: Math.random(),
        y: Math.random(),
        z,
        size,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        twinkleSpeed: Math.random() * 0.04 + 0.015,
        twinklePhase: Math.random() * Math.PI * 2,
        hasFlare,
      });
    }

    // 35 Floating foreground cosmic dust motes
    const motes: StardustMote[] = [];
    for (let i = 0; i < 35; i++) {
      motes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35 - 0.1,
        size: Math.random() * 1.6 + 0.6,
        alpha: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? "#2dd4bf" : "#38bdf8",
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      const state = stateRef.current;

      // Smooth camera interpolation for fluid parallax motion
      state.currentCamX += (state.cameraX - state.currentCamX) * 0.1;
      state.currentCamY += (state.cameraY - state.currentCamY) * 0.1;

      // Smooth transition into/out of warp flight
      const targetWarp = state.isFlight ? 1 : 0;
      state.flightTransition += (targetWarp - state.flightTransition) * 0.14;

      const vecLen = Math.hypot(state.flightVector.dx, state.flightVector.dy) || 1;
      const normVx = state.flightVector.dx / vecLen;
      const normVy = state.flightVector.dy / vecLen;

      // Draw all stars with depth parallax & warp stretching
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Parallax coordinates wrapping seamlessly around the screen
        const parallaxX = (state.currentCamX - 1200) * s.z * 0.32;
        const parallaxY = (state.currentCamY - 2200) * s.z * 0.32;

        let screenX = ((s.x * width - parallaxX) % width + width) % width;
        let screenY = ((s.y * height - parallaxY) % height + height) % height;

        // Twinkle factor
        const twinkle = Math.sin(time * s.twinkleSpeed * 60 + s.twinklePhase);
        const alpha = Math.max(0.18, Math.min(1.0, 0.65 + twinkle * 0.35));

        if (state.flightTransition > 0.05) {
          // ==============================================================
          // WARP TRAVERSAL: Stars stretch into high-speed cosmic light streaks
          // ==============================================================
          const streakLength = s.z * (35 + state.flightTransition * 65);
          const tailX = screenX - normVx * streakLength * state.flightTransition;
          const tailY = screenY - normVy * streakLength * state.flightTransition;

          const grad = ctx.createLinearGradient(tailX, tailY, screenX, screenY);
          grad.addColorStop(0, "transparent");
          grad.addColorStop(0.7, s.color);
          grad.addColorStop(1, "#ffffff");

          ctx.strokeStyle = grad;
          ctx.lineWidth = Math.max(0.75, s.size * (0.8 + state.flightTransition * 0.4));
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(screenX, screenY);
          ctx.stroke();

          // Star head glow point
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(screenX, screenY, s.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // ==============================================================
          // IDLE CRUISE: Crisp twinkling star points with diffraction spikes
          // ==============================================================
          ctx.globalAlpha = alpha;
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.arc(screenX, screenY, s.size, 0, Math.PI * 2);
          ctx.fill();

          // Subtle cross diffraction flare on bright foreground stars
          if (s.hasFlare && s.z > 0.7) {
            ctx.strokeStyle = s.color;
            ctx.lineWidth = 0.6;
            ctx.globalAlpha = alpha * 0.4;
            const flareLen = s.size * 3.5;

            ctx.beginPath();
            ctx.moveTo(screenX - flareLen, screenY);
            ctx.lineTo(screenX + flareLen, screenY);
            ctx.moveTo(screenX, screenY - flareLen);
            ctx.lineTo(screenX, screenY + flareLen);
            ctx.stroke();
          }
        }
      }

      // Draw floating cosmic stardust motes (foreground atmosphere)
      ctx.globalAlpha = 1;
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        if (state.flightTransition > 0.1) {
          // During flight, motes shoot past rapidly
          m.x -= normVx * (12 + m.size * 8);
          m.y -= normVy * (12 + m.size * 8);
        } else {
          m.x += m.vx;
          m.y += m.vy;
        }

        // Wrap around bounds
        if (m.x < 0) m.x = width;
        if (m.x > width) m.x = 0;
        if (m.y < 0) m.y = height;
        if (m.y > height) m.y = 0;

        ctx.fillStyle = m.color;
        ctx.globalAlpha = m.alpha * (1 - state.flightTransition * 0.4);
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.95 }}
    />
  );
}
