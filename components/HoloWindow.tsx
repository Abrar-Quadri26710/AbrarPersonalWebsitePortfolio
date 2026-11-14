"use client";

import React, { useEffect, useState } from "react";

interface HoloWindowProps {
  children: React.ReactNode;
  active: boolean;
  sectorTag: string;
  coords: string;
  themeColor?: string; // e.g. "teal", "green", "sky", "purple"
  className?: string;
}

export default function HoloWindow({
  children,
  active,
  sectorTag,
  coords,
  themeColor = "teal",
  className = "",
}: HoloWindowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scanTick, setScanTick] = useState(0);

  useEffect(() => {
    let t1: NodeJS.Timeout;
    if (active) {
      // Delay slightly so the camera dive finishes, then visor unfolds menu!
      t1 = setTimeout(() => {
        setIsOpen(true);
      }, 100);
    } else {
      setIsOpen(false);
    }
    return () => clearTimeout(t1);
  }, [active]);

  // Animated scanline pulse
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setScanTick((prev) => (prev + 1) % 100);
    }, 40);
    return () => clearInterval(interval);
  }, [active]);

  const borderColors: Record<string, string> = {
    teal: "border-teal-400/40 shadow-[0_0_25px_rgba(45,212,191,0.14)]",
    green: "border-green-400/40 shadow-[0_0_25px_rgba(74,222,128,0.14)]",
    sky: "border-sky-400/40 shadow-[0_0_25px_rgba(56,189,248,0.14)]",
    purple: "border-purple-400/40 shadow-[0_0_25px_rgba(192,132,252,0.14)]",
  };

  const cornerColors: Record<string, string> = {
    teal: "border-teal-400",
    green: "border-green-400",
    sky: "border-sky-400",
    purple: "border-purple-400",
  };

  const textColors: Record<string, string> = {
    teal: "text-teal-400",
    green: "text-green-400",
    sky: "text-sky-400",
    purple: "text-purple-400",
  };

  const activeBorder = borderColors[themeColor] || borderColors.teal;
  const activeCorner = cornerColors[themeColor] || cornerColors.teal;
  const activeText = textColors[themeColor] || textColors.teal;

  return (
    <div
      className={`relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isOpen
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-95 translate-y-2 pointer-events-none"
      } ${className}`}
    >
      {/* Hologram Emitter Horizon Beam (Flashes when opening) */}
      <div
        className={`absolute -top-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-300 to-transparent transition-opacity duration-700 ${
          isOpen ? "opacity-90 shadow-[0_0_12px_#2dd4bf]" : "opacity-0"
        }`}
      />

      {/* Holographic Projection Card */}
      <div
        className={`relative border ${activeBorder} bg-[#020806]/75 backdrop-blur-md p-5 sm:p-8 md:p-9 transition-all duration-500 overflow-hidden`}
        style={{
          backgroundImage:
            "linear-gradient(rgba(45, 212, 191, 0.03) 1px, transparent 1px), radial-gradient(circle at 50% 0%, rgba(45, 212, 191, 0.08) 0%, transparent 60%)",
          backgroundSize: "100% 4px, 100% 100%",
        }}
      >
        {/* Hologram Projector Corner Mount Brackets */}
        <div className={`absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 ${activeCorner}`} />
        <div className={`absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 ${activeCorner}`} />
        <div className={`absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 ${activeCorner}`} />
        <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 ${activeCorner}`} />

        {/* Top Holographic Telemetry Header Bar */}
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase border-b border-white/10 pb-3 mb-5">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full animate-ping ${activeText} bg-current`} />
            <span className={activeText}>{sectorTag}</span>
          </div>

          <div className="flex items-center gap-3 text-neutral-400">
            <span className="hidden sm:inline text-[9px] tracking-widest text-neutral-500">
              HUD // HOLO_PROJ_STABLE
            </span>
            <span className="text-neutral-600">|</span>
            <span className={activeText}>{coords}</span>
          </div>
        </div>

        {/* Main Content Projected Inside */}
        <div className="relative z-10">{children}</div>

        {/* Subtle Visor Bottom Projection Angle Beams */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none bg-gradient-to-t from-teal-500/5 to-transparent" />
      </div>
    </div>
  );
}
