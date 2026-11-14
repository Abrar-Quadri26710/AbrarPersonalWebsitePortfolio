"use client";

import { useEffect, useState } from "react";

interface MechHUDOverlayProps {
  activeSection: string;
  sceneIndex: number;
}

const SCENE_TELEMETRY = [
  {
    code: "ACT I // ORBITAL INSERTION",
    alt: "42,000M",
    speed: "MACH 5.4",
    attitude: "+02° HORIZON",
    status: "DESCENT TRAJECTORY LOCKED",
  },
  {
    code: "ACT II // RE-ENTRY IONIZATION",
    alt: "24,500M",
    speed: "MACH 3.8",
    attitude: "-18° HEAVY BANK",
    status: "ATMOSPHERIC FRICTION PEAK",
  },
  {
    code: "ACT III // TARGET ACQUISITION",
    alt: "11,200M",
    speed: "MACH 1.9",
    attitude: "-32° TACTICAL DIVE",
    status: "HARDWARE TARGET ACQUIRED",
  },
  {
    code: "ACT IV // OVERDRIVE SCAN ARRAY",
    alt: "4,600M",
    speed: "640 KTS",
    attitude: "+14° SCAN VAST",
    status: "COMPONENT MATRIX ACTIVE",
  },
  {
    code: "ACT V // SURFACE EXTRACTION",
    alt: "000M TOUCHDOWN",
    speed: "000 KTS",
    attitude: "STABLE HORIZON",
    status: "SECURE COMMS ONLINE",
  },
];

export default function MechHUDOverlay({ activeSection, sceneIndex }: MechHUDOverlayProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const currentScene = SCENE_TELEMETRY[sceneIndex] || SCENE_TELEMETRY[0];

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const maxScroll = Math.max(
            1,
            document.documentElement.scrollHeight - window.innerHeight
          );
          setScrollProgress(Math.min(1, Math.max(0, window.scrollY / maxScroll)));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
      {/* Cinematic Anamorphic Letterbox Frames (Top & Bottom) */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-neutral-950 border-b border-neutral-900/60 z-40 hidden md:block" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-neutral-950 border-t border-neutral-900/60 z-40 hidden md:block" />

      {/* Top Left: Scene Title Card & Episodic Marker */}
      <div className="absolute top-24 left-6 md:left-12 flex flex-col gap-1.5 transition-all duration-700">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-sm bg-teal-400 animate-pulse" />
          <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.25em] text-teal-300 uppercase">
            {currentScene.code}
          </span>
        </div>
        <div className="text-[9px] font-mono tracking-[0.2em] text-neutral-500">
          STATUS: <span className="text-neutral-300">{currentScene.status}</span>
        </div>
      </div>

      {/* Top Right: Flight Specs / Mech Telemetry */}
      <div className="absolute top-24 right-6 md:right-12 hidden sm:flex flex-col items-end gap-1 font-mono text-[10px]">
        <div className="flex items-center gap-2 text-teal-400">
          <span className="text-neutral-500 text-[9px] uppercase tracking-wider">ALTITUDE</span>
          <span className="font-bold text-xs">{currentScene.alt}</span>
        </div>
        <div className="flex items-center gap-2 text-amber-400">
          <span className="text-neutral-500 text-[9px] uppercase tracking-wider">VELOCITY</span>
          <span className="font-bold">{currentScene.speed}</span>
        </div>
        <div className="text-[9px] text-neutral-500 tracking-wider">
          ATTITUDE: {currentScene.attitude}
        </div>
      </div>

      {/* Left Attitude Pitch Ladder (Mecha Fighter Visor) */}
      <div className="hidden lg:flex flex-col items-start gap-3 absolute left-6 top-1/2 -translate-y-1/2 text-[9px] font-mono transition-transform duration-500">
        <div
          className="flex flex-col gap-2 transition-transform duration-700 ease-out"
          style={{
            transform: `translateY(${sceneIndex * -8}px) rotate(${
              sceneIndex === 1 ? -12 : sceneIndex === 2 ? -24 : sceneIndex === 3 ? 12 : 0
            }deg)`,
          }}
        >
          <div className="flex items-center gap-1.5 text-teal-400/40">
            <div className="w-4 h-[1px] bg-teal-400/40" />
            <span>+30°</span>
          </div>
          <div className="flex items-center gap-1.5 text-teal-400/60">
            <div className="w-6 h-[1px] bg-teal-400/60" />
            <span>+15°</span>
          </div>
          <div className="flex items-center gap-2 text-teal-300 font-bold bg-teal-950/40 px-1.5 py-0.5 border-l border-teal-400">
            <div className="w-8 h-[2px] bg-teal-300" />
            <span className="tracking-widest">PITCH {currentScene.attitude.split(" ")[0]}</span>
          </div>
          <div className="flex items-center gap-1.5 text-teal-400/60">
            <div className="w-6 h-[1px] bg-teal-400/60" />
            <span>-15°</span>
          </div>
          <div className="flex items-center gap-1.5 text-teal-400/40">
            <div className="w-4 h-[1px] bg-teal-400/40" />
            <span>-30°</span>
          </div>
        </div>
      </div>

      {/* Right Scene Index Progress Rail */}
      <div className="hidden lg:flex flex-col items-end gap-3 absolute right-6 top-1/2 -translate-y-1/2 text-[9px] font-mono">
        <div className="text-[9px] text-neutral-500 uppercase tracking-widest mb-1">
          CUTSCENE SCENE
        </div>
        {[0, 1, 2, 3, 4].map((idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span
              className={`text-[8px] tracking-wider transition-colors duration-300 ${
                sceneIndex === idx ? "text-teal-300 font-bold" : "text-neutral-600"
              }`}
            >
              0{idx + 1}
            </span>
            <div
              className={`h-[1.5px] transition-all duration-500 ${
                sceneIndex === idx
                  ? "w-8 bg-teal-400"
                  : "w-3 bg-neutral-800"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Visor Corner Optical Brackets */}
      <div className="absolute top-20 left-6 w-6 h-6 border-t-2 border-l-2 border-teal-400/60" />
      <div className="absolute top-20 right-6 w-6 h-6 border-t-2 border-r-2 border-teal-400/60" />
      <div className="absolute bottom-8 left-6 w-6 h-6 border-b-2 border-l-2 border-teal-400/60" />
      <div className="absolute bottom-8 right-6 w-6 h-6 border-b-2 border-r-2 border-teal-400/60" />

      {/* Floating Center Targeting Reticle (Subtle cinematic aperture) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-teal-400/10 rounded-full flex items-center justify-center transition-transform duration-700">
        <div className="w-2 h-2 border-t border-l border-teal-400/40" />
        <div className="absolute top-0 w-[1px] h-3 bg-teal-400/20" />
        <div className="absolute bottom-0 w-[1px] h-3 bg-teal-400/20" />
        <div className="absolute left-0 h-[1px] w-3 bg-teal-400/20" />
        <div className="absolute right-0 h-[1px] w-3 bg-teal-400/20" />
      </div>

      {/* Bottom Center Cockpit Instrument Readout */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 text-[9px] font-mono text-neutral-400 uppercase tracking-widest px-4 py-2 border border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
        <div className="flex items-center gap-1.5 text-teal-300">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
          <span>PILOT // SAM-COMBUSTION</span>
        </div>
        <span className="text-neutral-700">|</span>
        <div className="hidden sm:inline">
          MISSION TIME: <span>00:{(scrollProgress * 60).toFixed(0).padStart(2, "0")}</span>
        </div>
        <span className="text-neutral-700 hidden sm:inline">|</span>
        <div className="text-amber-400">
          CORE: <span className="font-bold">100% OPERATIONAL</span>
        </div>
      </div>
    </div>
  );
}
