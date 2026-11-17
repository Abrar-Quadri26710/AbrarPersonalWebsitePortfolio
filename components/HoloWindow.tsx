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

  useEffect(() => {
    let t1: NodeJS.Timeout;
    if (active) {
      t1 = setTimeout(() => {
        setIsOpen(true);
      }, 100);
    } else {
      setIsOpen(false);
    }
    return () => clearTimeout(t1);
  }, [active]);

  const borderColors: Record<string, string> = {
    teal: "border-teal-400/40 shadow-[0_0_30px_rgba(45,212,191,0.18)]",
    green: "border-green-400/40 shadow-[0_0_30px_rgba(74,222,128,0.18)]",
    sky: "border-sky-400/40 shadow-[0_0_30px_rgba(56,189,248,0.18)]",
    purple: "border-purple-400/40 shadow-[0_0_30px_rgba(192,132,252,0.18)]",
    glass: "border-white/25 shadow-[0_8px_32px_0_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.3)]",
  };

  const cornerColors: Record<string, string> = {
    teal: "border-teal-400",
    green: "border-green-400",
    sky: "border-sky-400",
    purple: "border-purple-400",
    glass: "border-white/80",
  };

  const textColors: Record<string, string> = {
    teal: "text-teal-400",
    green: "text-green-400",
    sky: "text-sky-400",
    purple: "text-purple-400",
    glass: "text-teal-300",
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
      {/* Hologram Emitter Horizon Beam */}
      <div
        className={`absolute -top-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-300 to-transparent transition-opacity duration-700 ${
          isOpen ? "opacity-90 shadow-[0_0_12px_#2dd4bf]" : "opacity-0"
        }`}
      />

      {/* Holographic Projection Card with Mobile Responsive Max Height & Scrollbar */}
      <div
        className={`relative border ${activeBorder} bg-[#020806]/90 backdrop-blur-md p-3 sm:p-5 md:p-6 transition-all duration-500 overflow-hidden max-h-[calc(100dvh-125px)] sm:max-h-[min(580px,calc(100dvh-180px))] overflow-y-auto holo-scrollbar`}
        style={{
          backgroundImage:
            "linear-gradient(rgba(45, 212, 191, 0.03) 1px, transparent 1px), radial-gradient(circle at 50% 0%, rgba(45, 212, 191, 0.08) 0%, transparent 60%)",
          backgroundSize: "100% 4px, 100% 100%",
        }}
      >
        {/* Corner Mount Brackets */}
        <div className={`absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 ${activeCorner}`} />
        <div className={`absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 ${activeCorner}`} />
        <div className={`absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 ${activeCorner}`} />
        <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 ${activeCorner}`} />

        {/* Top Holographic Telemetry Header Bar */}
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-wider sm:tracking-[0.18em] uppercase border-b border-white/10 pb-1.5 sm:pb-2 mb-2.5 sm:mb-4">
          <div className="flex items-center gap-1.5 sm:gap-2 truncate max-w-[220px] sm:max-w-none">
            <span className={`w-1.5 h-1.5 rounded-full animate-ping ${activeText} bg-current shrink-0`} />
            <span className={`${activeText} truncate`}>{sectorTag}</span>
          </div>

          <div className="flex items-center gap-2 text-neutral-400 shrink-0">
            <span className="text-[8px] sm:text-[9px] tracking-widest text-neutral-500">
              SYS // ACTIVE
            </span>
          </div>
        </div>

        {/* Main Content Projected Inside */}
        <div className="relative z-10 break-words">{children}</div>

        {/* Subtle Visor Bottom Projection Angle Beams */}
        <div className="sticky -bottom-4 left-0 right-0 h-8 pointer-events-none bg-gradient-to-t from-[#020806] to-transparent -mx-3 sm:-mx-5 md:-mx-6" />
      </div>
    </div>
  );
}
