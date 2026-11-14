"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import FireflyIntro from "@/components/FireflyIntro";
import BitText from "@/components/BitText";
import TechBitNode from "@/components/TechBitNode";
import ThrusterTrails from "@/components/ThrusterTrails";
import FlightReticle from "@/components/FlightReticle";
import HoloWindow from "@/components/HoloWindow";
import {
  SiGithub,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPhp,
  SiMysql,
  SiLinux,
  SiPrisma,
} from "react-icons/si";
import {
  FaArrowRight,
  FaChevronDown,
  FaChevronUp,
  FaShieldAlt,
  FaNetworkWired,
  FaVideo,
} from "react-icons/fa";
import { TbBrandCSharp } from "react-icons/tb";

// 5 Spatial Sector Coordinates in the 3600px x 3600px Giant Tactical Blueprint
const SECTORS = [
  {
    id: "hero",
    title: "Pilot Nexus",
    tag: "SECTOR 01 // ORBITAL ENTRY",
    x: 1800,
    y: 1800,
    coords: "1800X / 1800Y",
    color: "#2dd4bf",
  },
  {
    id: "philosophy",
    title: "Philosophy & Logic",
    tag: "SECTOR 02 // SYSTEMS & SECURITY",
    x: 950,
    y: 950,
    coords: "0950X / 0950Y",
    color: "#4ade80",
  },
  {
    id: "systems",
    title: "Project Dossiers",
    tag: "SECTOR 03 // FEATURED BUILDS",
    x: 2650,
    y: 950,
    coords: "2650X / 0950Y",
    color: "#38bdf8",
  },
  {
    id: "arsenal",
    title: "Runtime Matrix",
    tag: "SECTOR 04 // COMPONENT ARRAY",
    x: 2650,
    y: 2650,
    coords: "2650X / 2650Y",
    color: "#c084fc",
  },
  {
    id: "contact",
    title: "Planetary Comms",
    tag: "SECTOR 05 // TOUCHDOWN 000M",
    x: 950,
    y: 2650,
    coords: "0950X / 2650Y",
    color: "#2dd4bf",
  },
];

export default function Home() {
  const router = useRouter();
  const [activeSectorIndex, setActiveSectorIndex] = useState(0);
  const [replayIntro, setReplayIntro] = useState(false);
  const [activeProjectTab, setActiveProjectTab] = useState(0); // 0: Bubbles, 1: MidOS, 2: Storefront

  // Camera Spatial Flight State
  const [camera, setCamera] = useState({
    x: SECTORS[0].x,
    y: SECTORS[0].y,
    scale: 1.0,
    bank: 0,
    isFlight: false,
    flightPhase: "idle" as "idle" | "climb" | "dive",
    flightVector: { dx: 0, dy: 0 },
    speedLabel: "CRUISE // 0 KT",
    altLabel: "SURFACE // 000M",
    transition: "transform 300ms ease-out",
  });

  // Reticle HUD State
  const [reticle, setReticle] = useState({
    active: false,
    phase: "idle" as "idle" | "climb" | "dive" | "locked",
    targetSectorIndex: 0,
  });

  const isLockedRef = useRef(false);

  // Parabolic Zoom Flight: High Orbital Climb (Zoom Out) -> Traversal -> Tactical Dive (Zoom In)
  const flyToSector = useCallback(
    (targetIndex: number) => {
      if (targetIndex < 0 || targetIndex >= SECTORS.length || isLockedRef.current) return;
      if (targetIndex === activeSectorIndex) return;
      isLockedRef.current = true;

      const currentSec = SECTORS[activeSectorIndex];
      const targetSec = SECTORS[targetIndex];

      const dx = targetSec.x - currentSec.x;
      const dy = targetSec.y - currentSec.y;

      // Dynamic banking tilt (-3.5 deg to +3.5 deg based on flight trajectory)
      const bankAngle = Math.max(-3.5, Math.min(3.5, (dx / 1200) * 3));

      // Parabolic Arc Midpoint
      const midX = (currentSec.x + targetSec.x) / 2;
      const midY = (currentSec.y + targetSec.y) / 2;

      // Activate Target Reticle Acquisition
      setReticle({
        active: true,
        phase: "climb",
        targetSectorIndex: targetIndex,
      });

      // PHASE 1: ORBITAL CLIMB // ZOOM OUT WIDE INTO HIGH ORBIT (0ms - 480ms)
      setCamera({
        x: midX,
        y: midY,
        scale: 0.35,
        bank: bankAngle,
        isFlight: true,
        flightPhase: "climb",
        flightVector: { dx, dy },
        speedLabel: "THRUSTER IGNITION // MACH 7.4",
        altLabel: "ORBITAL ASCENT // 24,000M",
        transition: "transform 480ms cubic-bezier(0.22, 0.8, 0.36, 1)",
      });

      // PHASE 2: TACTICAL DIVE // ZOOM DEEP INTO DESTINATION SECTOR (480ms - 1100ms)
      setTimeout(() => {
        setReticle((prev) => ({ ...prev, phase: "dive" }));
        setCamera({
          x: targetSec.x,
          y: targetSec.y,
          scale: 1.0,
          bank: 0,
          isFlight: true,
          flightPhase: "dive",
          flightVector: { dx, dy },
          speedLabel: "AIRBRAKE ENGAGED // 180 KT",
          altLabel: "SUPERSONIC DIVE // 120M",
          transition: "transform 620ms cubic-bezier(0.16, 1, 0.3, 1)",
        });
      }, 480);

      // PHASE 3: TOUCHDOWN & SECTOR INITIALIZATION (1100ms)
      setTimeout(() => {
        setActiveSectorIndex(targetIndex);
        setReticle((prev) => ({ ...prev, phase: "locked" }));

        setCamera((prev) => ({
          ...prev,
          isFlight: false,
          flightPhase: "idle",
          speedLabel: "TARGET LOCKED // 0 KT",
          altLabel: "SURFACE TOUCHDOWN // 000M",
          transition: "transform 200ms ease-out",
        }));

        setTimeout(() => {
          setReticle({ active: false, phase: "idle", targetSectorIndex: targetIndex });
          isLockedRef.current = false;
        }, 300);
      }, 1100);
    },
    [activeSectorIndex]
  );

  // Wheel and Keyboard navigation across spatial sectors
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 25 || isLockedRef.current) return;
      if (e.deltaY > 0) {
        flyToSector(activeSectorIndex + 1);
      } else {
        flyToSector(activeSectorIndex - 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLockedRef.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        flyToSector(activeSectorIndex + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        flyToSector(activeSectorIndex - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeSectorIndex, flyToSector]);

  // Touch Swipe for Mobile
  useEffect(() => {
    let startY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (isLockedRef.current) return;
      const diff = startY - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 40) {
        if (diff > 0) flyToSector(activeSectorIndex + 1);
        else flyToSector(activeSectorIndex - 1);
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    const handleCustomSwitch = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      if (typeof customEvent.detail === "number") {
        flyToSector(customEvent.detail);
      }
    };
    window.addEventListener("switch-scene", handleCustomSwitch);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("switch-scene", handleCustomSwitch);
    };
  }, [activeSectorIndex, flyToSector]);

  const current = SECTORS[activeSectorIndex];
  const targetSectorData = SECTORS[reticle.targetSectorIndex] || current;

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#030605] text-neutral-200 font-sans select-none flex flex-col justify-between">
      {/* Firefly Opening Transformation Animation */}
      <FireflyIntro forcePlay={replayIntro} onComplete={() => setReplayIntro(false)} />

      {/* Thruster Speed Particles */}
      <ThrusterTrails
        active={camera.isFlight}
        phase={camera.flightPhase}
        vector={camera.flightVector}
      />

      {/* Mecha Cockpit Target Reticle */}
      <FlightReticle
        active={reticle.active}
        phase={reticle.phase}
        targetSectorName={targetSectorData.title}
        targetCoords={targetSectorData.coords}
      />

      {/* Global Unified Navigation */}
      <Navbar onReplayIntro={() => setReplayIntro(true)} onNavigateScene={flyToSector} />

      {/* Cockpit Visor HUD Overlays & Framing */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <div className="absolute top-24 left-8 w-4 h-4 border-t-2 border-l-2 border-teal-400/60" />
        <div className="absolute top-24 right-8 w-4 h-4 border-t-2 border-r-2 border-teal-400/60" />
        <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-teal-400/60" />
        <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-teal-400/60" />

        {/* Top Left: Active World Sector Callout */}
        <div className="absolute top-24 left-16 hidden sm:flex items-center gap-3 text-[10px] font-mono tracking-[0.25em] text-teal-400 uppercase bg-[#040706]/80 px-3.5 py-1.5 border border-teal-500/25 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          <span>{current.tag}</span>
        </div>

        {/* Top Right: Real-time Camera Spatial Telemetry & Speed */}
        <div className="absolute top-24 right-16 hidden sm:flex items-center gap-3 text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase bg-[#040706]/80 px-3.5 py-1.5 border border-neutral-800 backdrop-blur-sm">
          <span className="text-teal-300 font-bold">{current.coords}</span>
          <span className="text-neutral-700">|</span>
          <span className={camera.isFlight ? "text-amber-400 font-bold animate-pulse" : "text-neutral-400"}>
            {camera.speedLabel}
          </span>
          <span className="text-neutral-700">|</span>
          <span className={camera.isFlight ? "text-teal-300 font-bold" : "text-neutral-400"}>
            {camera.altLabel}
          </span>
          <span className="text-neutral-700">|</span>
          <span>ZOOM: {(camera.scale * 100).toFixed(0)}%</span>
        </div>
      </div>

      {/* Right Hologram Sector Navigator */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-end gap-3.5">
        {SECTORS.map((sec, idx) => {
          const isActive = activeSectorIndex === idx;
          const isTargeted = reticle.active && reticle.targetSectorIndex === idx;
          return (
            <button
              key={sec.id}
              onClick={() => flyToSector(idx)}
              className="group flex items-center gap-3 focus:outline-none cursor-pointer"
              aria-label={`Travel to ${sec.title}`}
            >
              <span
                className={`text-[9px] font-mono tracking-widest uppercase transition-all duration-300 ${
                  isActive || isTargeted
                    ? "text-teal-300 font-bold opacity-100 translate-x-0"
                    : "text-neutral-500 opacity-0 group-hover:opacity-100 translate-x-2"
                }`}
              >
                {sec.title}
              </span>
              <div
                className={`w-2.5 h-2.5 rounded-sm transition-all duration-500 border ${
                  isActive
                    ? "bg-teal-400 border-teal-300 scale-125"
                    : isTargeted
                    ? "bg-amber-400 border-amber-300 scale-125 animate-pulse"
                    : "bg-neutral-900 border-neutral-700 group-hover:border-neutral-500"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* THE GIANT 3600px x 3600px SPATIAL WORLD CANVAS                            */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute pointer-events-auto"
          style={{
            left: "50%",
            top: "50%",
            width: "3600px",
            height: "3600px",
            marginLeft: "-1800px",
            marginTop: "-1800px",
            transformOrigin: "1800px 1800px",
            transform: `scale(${camera.scale}) rotate(${camera.bank}deg) translate3d(${1800 - camera.x}px, ${1800 - camera.y}px, 0)`,
            transition: camera.transition,
            willChange: "transform",
          }}
        >
          {/* SVG Tactical Schematic Canvas & Vector Trajectory Lines */}
          <svg
            viewBox="0 0 3600 3600"
            className="absolute inset-0 w-full h-full pointer-events-none opacity-45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Global Orbital Circles & Latitude Grids */}
            <circle cx="1800" cy="1800" r="1650" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="10 10" opacity="0.25" />
            <circle cx="1800" cy="1800" r="1250" stroke="#2dd4bf" strokeWidth="1" opacity="0.35" />
            <circle cx="1800" cy="1800" r="750" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="16 8" opacity="0.45" />
            <circle cx="1800" cy="1800" r="380" stroke="#2dd4bf" strokeWidth="1" opacity="0.55" />

            {/* Central Radar Crosshairs */}
            <line x1="0" y1="1800" x2="3600" y2="1800" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="4 12" opacity="0.35" />
            <line x1="1800" y1="0" x2="1800" y2="3600" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="4 12" opacity="0.35" />

            {/* FLIGHT CORRIDOR PATHWAYS */}
            <line
              x1="1800"
              y1="1800"
              x2="950"
              y2="950"
              stroke="#4ade80"
              strokeWidth={activeSectorIndex === 1 || camera.isFlight ? "3" : "1.5"}
              strokeDasharray="12 6"
              opacity={activeSectorIndex === 1 || camera.isFlight ? "0.9" : "0.4"}
            />
            <line
              x1="950"
              y1="950"
              x2="2650"
              y2="950"
              stroke="#38bdf8"
              strokeWidth={activeSectorIndex === 2 || camera.isFlight ? "3" : "1.5"}
              strokeDasharray="12 6"
              opacity={activeSectorIndex === 2 || camera.isFlight ? "0.9" : "0.4"}
            />
            <line
              x1="2650"
              y1="950"
              x2="2650"
              y2="2650"
              stroke="#c084fc"
              strokeWidth={activeSectorIndex === 3 || camera.isFlight ? "3" : "1.5"}
              strokeDasharray="12 6"
              opacity={activeSectorIndex === 3 || camera.isFlight ? "0.9" : "0.4"}
            />
            <line
              x1="2650"
              y1="2650"
              x2="950"
              y2="2650"
              stroke="#2dd4bf"
              strokeWidth={activeSectorIndex === 4 || camera.isFlight ? "3" : "1.5"}
              strokeDasharray="12 6"
              opacity={activeSectorIndex === 4 || camera.isFlight ? "0.9" : "0.4"}
            />
            <line
              x1="950"
              y1="2650"
              x2="1800"
              y2="1800"
              stroke="#2dd4bf"
              strokeWidth={activeSectorIndex === 0 || camera.isFlight ? "3" : "1.5"}
              strokeDasharray="12 6"
              opacity={activeSectorIndex === 0 || camera.isFlight ? "0.9" : "0.4"}
            />

            {/* Sector Callouts Etched into Map */}
            <g transform="translate(1800, 1800)">
              <circle cx="0" cy="0" r="320" stroke="#2dd4bf" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.7" />
              <circle cx="0" cy="0" r="460" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="4 8" opacity="0.3" />
              <text x="0" y="-340" fill="#2dd4bf" fontSize="16" fontFamily="monospace" textAnchor="middle" letterSpacing="4">
                // [SECTOR 01: PILOT NEXUS // 1800X 1800Y]
              </text>
            </g>

            <g transform="translate(950, 950)">
              <rect x="-380" y="-320" width="760" height="640" stroke="#4ade80" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.6" />
              <circle cx="0" cy="0" r="340" stroke="#4ade80" strokeWidth="1" strokeDasharray="6 6" opacity="0.4" />
              <text x="0" y="-340" fill="#4ade80" fontSize="16" fontFamily="monospace" textAnchor="middle" letterSpacing="4">
                // [SECTOR 02: NEURAL LOGIC CORE // 0950X 0950Y]
              </text>
            </g>

            <g transform="translate(2650, 950)">
              <rect x="-380" y="-320" width="760" height="640" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.6" />
              <circle cx="0" cy="0" r="340" stroke="#38bdf8" strokeWidth="1" strokeDasharray="6 6" opacity="0.4" />
              <text x="0" y="-340" fill="#38bdf8" fontSize="16" fontFamily="monospace" textAnchor="middle" letterSpacing="4">
                // [SECTOR 03: PROJECT DOSSIERS // 2650X 0950Y]
              </text>
            </g>

            <g transform="translate(2650, 2650)">
              <rect x="-380" y="-320" width="760" height="640" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.6" />
              <circle cx="0" cy="0" r="340" stroke="#c084fc" strokeWidth="1" strokeDasharray="6 6" opacity="0.4" />
              <text x="0" y="-340" fill="#c084fc" fontSize="16" fontFamily="monospace" textAnchor="middle" letterSpacing="4">
                // [SECTOR 04: RUNTIME MATRIX // 2650X 2650Y]
              </text>
            </g>

            <g transform="translate(950, 2650)">
              <rect x="-380" y="-320" width="760" height="640" stroke="#2dd4bf" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.6" />
              <circle cx="0" cy="0" r="340" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="6 6" opacity="0.4" />
              <text x="0" y="-340" fill="#2dd4bf" fontSize="16" fontFamily="monospace" textAnchor="middle" letterSpacing="4">
                // [SECTOR 05: PLANETARY COMMS // 0950X 2650Y]
              </text>
            </g>
          </svg>

          {/* Coordinate Grid Mesh */}
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,#2dd4bf_1px,transparent_1px),linear-gradient(to_bottom,#2dd4bf_1px,transparent_1px)] [background-size:100px_100px] pointer-events-none" />

          {/* =================================================================== */}
          {/* PHYSICAL SECTOR 01: PILOT NEXUS // HERO STATION                     */}
          {/* =================================================================== */}
          <div
            className="absolute transition-opacity duration-700 pointer-events-auto"
            style={{
              left: "1800px",
              top: "1800px",
              transform: "translate(-50%, -50%)",
              width: "min(840px, 92vw)",
              opacity: activeSectorIndex === 0 ? 1 : camera.isFlight ? 0.6 : 0.25,
            }}
          >
            <HoloWindow
              active={activeSectorIndex === 0}
              sectorTag="SECTOR 01 // PILOT NEXUS"
              coords="1800X / 1800Y"
              themeColor="teal"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 text-[11px] font-mono text-teal-400 tracking-[0.25em] uppercase">
                  <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
                  <BitText
                    text="Abrar Quadri // Software Engineer"
                    active={activeSectorIndex === 0}
                    delay={100}
                  />
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white leading-[1.25] max-w-2xl">
                  <BitText
                    text="Building full-stack web platforms with a focus on networking and cybersecurity."
                    active={activeSectorIndex === 0}
                    delay={200}
                    isHeading
                  />
                </h1>

                <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed max-w-xl">
                  B.S. in Computer Science graduate actively seeking Software Engineering roles.
                  I enjoy the full-stack engineering process—from frontend interfaces to backend
                  persistence—with a growing technical focus on networking protocols, system boundaries,
                  and cybersecurity.
                </p>

                {/* Tactile Control Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <button
                    onClick={() => flyToSector(2)}
                    className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-teal-400/15 border border-teal-400 text-teal-300 font-mono text-xs uppercase tracking-widest hover:bg-teal-400 hover:text-black transition-all cursor-pointer"
                  >
                    <span>Fly To Projects Sector</span>
                    <FaArrowRight size={10} />
                  </button>
                  <a
                    href="https://github.com/Abrar-Quadri26710"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 border border-neutral-700 bg-neutral-950/40 text-neutral-300 font-mono text-xs uppercase tracking-widest hover:border-teal-400/50 hover:text-white transition-all"
                  >
                    <SiGithub size={13} />
                    <span>GitHub Repositories</span>
                  </a>
                </div>

                {/* Tactical Specifications Grid */}
                <div className="pt-5 border-t border-teal-500/15 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">Domain</span>
                    <span className="text-neutral-200">Full-Stack & Networking</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">Status</span>
                    <span className="text-neutral-200">CS Graduate // SWE Roles</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">Featured Build</span>
                    <span className="text-teal-400">Bubbles // Social Platform</span>
                  </div>
                </div>
              </div>
            </HoloWindow>
          </div>

          {/* =================================================================== */}
          {/* PHYSICAL SECTOR 02: NEURAL LOGIC // PHILOSOPHY STATION              */}
          {/* =================================================================== */}
          <div
            className="absolute transition-opacity duration-700 pointer-events-auto"
            style={{
              left: "950px",
              top: "950px",
              transform: "translate(-50%, -50%)",
              width: "min(880px, 92vw)",
              opacity: activeSectorIndex === 1 ? 1 : camera.isFlight ? 0.6 : 0.25,
            }}
          >
            <HoloWindow
              active={activeSectorIndex === 1}
              sectorTag="SECTOR 02 // SYSTEMS & SECURITY LOGIC"
              coords="0950X / 0950Y"
              themeColor="green"
            >
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white max-w-2xl leading-[1.25]">
                  <BitText
                    text="Full-stack engineering grounded in systems and security."
                    active={activeSectorIndex === 1}
                    delay={200}
                    isHeading
                  />
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-neutral-300 text-sm leading-relaxed">
                  <div className="lg:col-span-7 space-y-4">
                    <p>
                      I love the full-stack engineering lifecycle—crafting clean responsive interfaces,
                      modeling normalized schemas, and architecting resilient backend services. While
                      there is always more to learn in modern distributed software, my foundation in
                      operating systems and systems programming gives me a deep appreciation for process
                      boundaries, network packets, and security invariants.
                    </p>
                    <p>
                      Rather than viewing web stacks in isolation, I draw from low-level systems
                      principles to build resilient web architectures. Building platforms like{" "}
                      <strong className="text-white font-medium">Bubbles</strong> and exploring virtual
                      process scheduling in{" "}
                      <strong className="text-white font-medium">MidOS</strong> reinforces how memory
                      management, access control, and network protocols shape defensive software engineering.
                    </p>
                  </div>

                  <div className="lg:col-span-5 border-l border-green-500/20 pl-6 space-y-5">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-1">
                        Academic Milestone
                      </span>
                      <p className="text-neutral-200 font-medium text-sm">
                        B.S. in Computer Science (Completed)
                      </p>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Operating Systems, Networks, Security Fundamentals, Database Systems, Computer Architecture.
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-2">
                        Core Principles
                      </span>
                      <ul className="space-y-2 text-xs text-neutral-300">
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-mono">01</span>
                          <span>End-to-end craft: Clean interfaces backed by robust servers.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-mono">02</span>
                          <span>Defensive design: Enforce authorization and validate all boundaries.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-mono">03</span>
                          <span>Continuous growth: Hungry to expand in networking and cybersecurity.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </HoloWindow>
          </div>

          {/* =================================================================== */}
          {/* PHYSICAL SECTOR 03: SIMULATION HARDWARE // PROJECTS STATION         */}
          {/* =================================================================== */}
          <div
            className="absolute transition-opacity duration-700 pointer-events-auto"
            style={{
              left: "2650px",
              top: "950px",
              transform: "translate(-50%, -50%)",
              width: "min(880px, 92vw)",
              opacity: activeSectorIndex === 2 ? 1 : camera.isFlight ? 0.6 : 0.25,
            }}
          >
            <HoloWindow
              active={activeSectorIndex === 2}
              sectorTag="SECTOR 03 // PROJECT DOSSIERS"
              coords="2650X / 0950Y"
              themeColor="sky"
            >
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-sky-500/20 pb-3">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                      <BitText
                        text="Tactical Project Dossiers"
                        active={activeSectorIndex === 2}
                        delay={200}
                        isHeading
                      />
                    </h2>
                  </div>
                  <Link
                    href="/projects"
                    className="text-xs font-mono text-sky-300 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Full Archive</span>
                    <FaArrowRight size={10} />
                  </Link>
                </div>

                {/* Target Selector Tabs: Bubbles (Featured #1), MidOS, Storefront */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { title: "Bubbles // Social Platform" },
                    { title: "MidOS // Virtual OS" },
                    { title: "Storefront // E-Commerce Web" },
                  ].map((tab, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveProjectTab(idx)}
                      className={`px-3.5 py-1.5 border text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                        activeProjectTab === idx
                          ? "bg-sky-950/60 border-sky-400 text-sky-200 font-bold"
                          : "bg-neutral-950/40 border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200"
                      }`}
                    >
                      <span className="text-[10px] opacity-60">0{idx + 1}</span>
                      <span>{tab.title}</span>
                    </button>
                  ))}
                </div>

                {/* Active Project Dossier */}
                <div className="border border-sky-500/20 bg-neutral-950/60 p-5 sm:p-7 relative">
                  {/* TAB 0: BUBBLES */}
                  {activeProjectTab === 0 && (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <span className="text-xs font-mono text-teal-400 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                            Full-Stack Web Architecture // Next.js & React 19
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                            Bubbles Social Platform
                          </h3>
                        </div>
                        <span className="px-2.5 py-1 text-[10px] font-mono bg-teal-950/80 text-teal-300 border border-teal-700/60 tracking-wider">
                          ACTIVE BUILD // PROPRIETARY
                        </span>
                      </div>

                      <p className="text-neutral-300 text-sm leading-relaxed">
                        A web-based alternative to engagement-driven social networks. Conversations are
                        organized into <strong className="text-white">Fields</strong>,{" "}
                        <strong className="text-white">Spaces</strong> (single-field communities), and{" "}
                        <strong className="text-white">Clouds</strong> (multi-field communities with 100-member
                        scaling transitions). Replaces endless algorithmic feeds with topic-bound Bubbles
                        featuring stance tags (<span className="text-teal-300">Open</span>,{" "}
                        <span className="text-teal-300">Support</span>,{" "}
                        <span className="text-teal-300">Challenge</span>,{" "}
                        <span className="text-teal-300">Curious</span>), creator-defined lifecycles (1hr to 7 days),
                        and temporary local JSON discussion archive exports. Built with Next.js 16 (App Router),
                        React 19, TypeScript, Tailwind CSS, Prisma ORM, and HMAC session authentication.
                      </p>

                      <div className="p-3 bg-neutral-900/60 border border-teal-500/20 text-xs font-mono text-neutral-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-teal-300">
                          <FaVideo size={13} />
                          <span>Video feature walkthrough & showcase coming soon</span>
                        </div>
                        <a
                          href="mailto:mirrowdin@gmail.com?subject=Inquiry%20regarding%20Bubbles%20Social%20Platform"
                          className="text-neutral-400 hover:text-teal-300 transition-colors uppercase tracking-wider flex items-center gap-1.5"
                        >
                          <span>Request Private Demo</span>
                          <FaArrowRight size={9} />
                        </a>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-sky-500/15 text-xs font-mono">
                        <div>
                          <span className="text-neutral-500 block text-[10px] uppercase">Community</span>
                          <span className="text-neutral-300">Spaces & Clouds</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 block text-[10px] uppercase">Discussions</span>
                          <span className="text-neutral-300">Stances & Lifecycles</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 block text-[10px] uppercase">Full-Stack</span>
                          <span className="text-neutral-300">Next.js 16 / React 19</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 block text-[10px] uppercase">Security</span>
                          <span className="text-neutral-300">Server-Side Auth</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 1: MIDOS */}
                  {activeProjectTab === 1 && (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <span className="text-xs font-mono text-sky-400 uppercase tracking-widest">
                            Virtual Operating System // C# & .NET
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                            MidOS Virtual Operating System
                          </h3>
                        </div>
                        <a
                          href="https://github.com/Abrar-Quadri26710/MidOS"
                          target="_blank"
                          rel="noreferrer"
                          className="text-neutral-400 hover:text-sky-300 transition-colors"
                          aria-label="MidOS Source"
                        >
                          <SiGithub size={18} />
                        </a>
                      </div>

                      <p className="text-neutral-300 text-sm leading-relaxed">
                        A virtual operating system built from scratch to explore system-level process
                        scheduling and execution isolation. Implements cooperative and preemptive task
                        switching, virtual memory management with two-level page tables and LRU page
                        eviction, mutex and event synchronization, and dynamic heap allocation.
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-sky-500/15 text-xs font-mono">
                        <div>
                          <span className="text-neutral-500 block text-[10px] uppercase">Memory</span>
                          <span className="text-neutral-300">2-Level Page Tables</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 block text-[10px] uppercase">Eviction</span>
                          <span className="text-neutral-300">LRU + Dirty Bit</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 block text-[10px] uppercase">Isolation</span>
                          <span className="text-neutral-300">Process Boundaries</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 block text-[10px] uppercase">Pipeline</span>
                          <span className="text-neutral-300">Custom FDE Engine</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: STOREFRONT */}
                  {activeProjectTab === 2 && (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                            Full-Stack Web & Persistence // PHP & MySQL
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                            Storefront E-Commerce Web Platform
                          </h3>
                        </div>
                        <a
                          href="https://github.com/Abrar-Quadri26710/StoreFrontWebsite"
                          target="_blank"
                          rel="noreferrer"
                          className="text-neutral-400 hover:text-emerald-300 transition-colors"
                          aria-label="Storefront Source"
                        >
                          <SiGithub size={18} />
                        </a>
                      </div>

                      <p className="text-neutral-300 text-sm leading-relaxed">
                        An e-commerce web platform engineered with PHP and MySQL, designed to reinforce
                        backend software engineering, session security, and database normalization.
                        Features user authentication, role-based access control, an administrative
                        management panel, and a normalized relational schema preventing data anomalies.
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-sky-500/15 text-xs font-mono">
                        <div>
                          <span className="text-neutral-500 block text-[10px] uppercase">Backend</span>
                          <span className="text-neutral-300">PHP Session Engine</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 block text-[10px] uppercase">Database</span>
                          <span className="text-neutral-300">MySQL 3NF Schema</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 block text-[10px] uppercase">Access Control</span>
                          <span className="text-neutral-300">Role-Based (RBAC)</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 block text-[10px] uppercase">Cart State</span>
                          <span className="text-neutral-300">Session Persistence</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </HoloWindow>
          </div>

          {/* =================================================================== */}
          {/* PHYSICAL SECTOR 04: RUNTIME MATRIX // ARSENAL STATION               */}
          {/* =================================================================== */}
          <div
            className="absolute transition-opacity duration-700 pointer-events-auto"
            style={{
              left: "2650px",
              top: "2650px",
              transform: "translate(-50%, -50%)",
              width: "min(880px, 92vw)",
              opacity: activeSectorIndex === 3 ? 1 : camera.isFlight ? 0.6 : 0.25,
            }}
          >
            <HoloWindow
              active={activeSectorIndex === 3}
              sectorTag="SECTOR 04 // COMPONENT MATRIX"
              coords="2650X / 2650Y"
              themeColor="purple"
            >
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                    <BitText
                      text="Tools and technologies I rely on."
                      active={activeSectorIndex === 3}
                      delay={200}
                      isHeading
                    />
                  </h2>
                </div>

                {/* Bit-Forming Tech Nodes Grid: Fullstack, Backend, Networking & Security */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                  <TechBitNode
                    icon={<SiTypescript size={17} />}
                    label="TypeScript"
                    sublabel="Type-Safe Web Engineering"
                    active={activeSectorIndex === 3}
                    delayIndex={1}
                  />
                  <TechBitNode
                    icon={<SiReact size={17} />}
                    label="React 19"
                    sublabel="Server Components, Modern UI"
                    active={activeSectorIndex === 3}
                    delayIndex={2}
                  />
                  <TechBitNode
                    icon={<SiNextdotjs size={17} />}
                    label="Next.js 16"
                    sublabel="App Router, Turbopack"
                    active={activeSectorIndex === 3}
                    delayIndex={3}
                  />
                  <TechBitNode
                    icon={<SiTailwindcss size={17} />}
                    label="Tailwind CSS v4"
                    sublabel="Modern Responsive Layouts"
                    active={activeSectorIndex === 3}
                    delayIndex={4}
                  />
                  <TechBitNode
                    icon={<SiPrisma size={17} />}
                    label="Prisma ORM"
                    sublabel="Type-Safe Schema & Migrations"
                    active={activeSectorIndex === 3}
                    delayIndex={5}
                  />
                  <TechBitNode
                    icon={<SiPhp size={17} />}
                    label="PHP"
                    sublabel="Backend Engines, Sessions"
                    active={activeSectorIndex === 3}
                    delayIndex={6}
                  />
                  <TechBitNode
                    icon={<SiMysql size={17} />}
                    label="MySQL / SQL"
                    sublabel="Relational Schema Normalization"
                    active={activeSectorIndex === 3}
                    delayIndex={7}
                  />
                  <TechBitNode
                    icon={<FaNetworkWired size={17} />}
                    label="Networking"
                    sublabel="TCP/IP, HTTP, Protocols"
                    active={activeSectorIndex === 3}
                    delayIndex={8}
                  />
                  <TechBitNode
                    icon={<FaShieldAlt size={17} />}
                    label="Cybersecurity"
                    sublabel="Auth, RBAC, Defense-in-Depth"
                    active={activeSectorIndex === 3}
                    delayIndex={9}
                  />
                  <TechBitNode
                    icon={<SiLinux size={17} />}
                    label="Linux Systems"
                    sublabel="Toolchains, POSIX, Bash"
                    active={activeSectorIndex === 3}
                    delayIndex={10}
                  />
                  <TechBitNode
                    icon={<TbBrandCSharp size={17} />}
                    label="C# (.NET)"
                    sublabel="Concurrency, Virtual Kernels"
                    active={activeSectorIndex === 3}
                    delayIndex={11}
                  />
                </div>
              </div>
            </HoloWindow>
          </div>

          {/* =================================================================== */}
          {/* PHYSICAL SECTOR 05: PLANETARY COMMS // CONTACT STATION              */}
          {/* =================================================================== */}
          <div
            className="absolute transition-opacity duration-700 pointer-events-auto"
            style={{
              left: "950px",
              top: "2650px",
              transform: "translate(-50%, -50%)",
              width: "min(880px, 92vw)",
              opacity: activeSectorIndex === 4 ? 1 : camera.isFlight ? 0.6 : 0.25,
            }}
          >
            <HoloWindow
              active={activeSectorIndex === 4}
              sectorTag="SECTOR 05 // SURFACE TOUCHDOWN"
              coords="0950X / 2650Y"
              themeColor="teal"
            >
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white max-w-2xl leading-[1.25]">
                    <BitText
                      text="Open to Software Engineering opportunities."
                      active={activeSectorIndex === 4}
                      delay={200}
                      isHeading
                    />
                  </h2>
                </div>

                <p className="text-neutral-300 text-sm sm:text-base max-w-xl leading-relaxed">
                  B.S. in Computer Science graduate looking for full-time Software Engineer positions
                  with an interest to grow into networking and cybersecurity. I enjoy the full-stack
                  process and am eager to contribute, build reliable software, and continuously expand
                  my skill set.
                </p>

                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <a
                    href="mailto:mirrowdin@gmail.com"
                    className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-teal-400 text-neutral-950 font-bold text-xs uppercase tracking-widest hover:bg-teal-300 transition-colors"
                  >
                    <span>Transmit Message</span>
                    <FaArrowRight size={10} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/abrar-quadri-03b946317/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 border border-neutral-700 bg-neutral-950/40 text-neutral-200 font-semibold text-xs uppercase tracking-widest hover:border-teal-400/50 hover:text-white transition-colors"
                  >
                    <span>LinkedIn Channel</span>
                  </a>
                </div>

                <div className="pt-5 border-t border-teal-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
                  <div>Abrar Quadri // Software Engineer Portfolio</div>
                  <button
                    onClick={() => flyToSector(0)}
                    className="text-teal-400 hover:underline uppercase tracking-wider cursor-pointer"
                  >
                    Return to Sector 01 ↑
                  </button>
                </div>
              </div>
            </HoloWindow>
          </div>
        </div>
      </div>

      {/* FOOTER BAR WITH SPATIAL COORDINATES & NAV CONTROLS */}
      <footer className="w-full border-t border-neutral-900/80 bg-neutral-950/80 backdrop-blur-md px-6 py-3 flex items-center justify-between text-xs font-mono text-neutral-500 z-30">
        <div className="flex items-center gap-3">
          <span className="text-teal-400 uppercase tracking-wider">
            {current.tag.split("//")[0].trim()}
          </span>
          <span className="text-neutral-700">|</span>
          <span className="text-neutral-300">{current.title}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[10px] uppercase tracking-widest text-neutral-500 hidden md:inline">
            Scroll or Use Arrow Keys to Fly
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => flyToSector(activeSectorIndex - 1)}
              disabled={activeSectorIndex === 0}
              className="p-1.5 border border-neutral-800 hover:border-neutral-600 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              aria-label="Previous Sector"
            >
              <FaChevronUp size={10} />
            </button>
            <button
              onClick={() => flyToSector(activeSectorIndex + 1)}
              disabled={activeSectorIndex === SECTORS.length - 1}
              className="p-1.5 border border-neutral-800 hover:border-neutral-600 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              aria-label="Next Sector"
            >
              <FaChevronDown size={10} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
