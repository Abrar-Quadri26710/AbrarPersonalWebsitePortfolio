"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FireflyIntro from "@/components/FireflyIntro";
import BitText from "@/components/BitText";
import TechBitNode from "@/components/TechBitNode";
import ThrusterTrails from "@/components/ThrusterTrails";
import FlightReticle from "@/components/FlightReticle";
import CosmicStarfield from "@/components/CosmicStarfield";
import CosmicSolarSystem from "@/components/CosmicSolarSystem";
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
  FaExternalLinkAlt,
} from "react-icons/fa";
import { TbBrandCSharp } from "react-icons/tb";

// 5 Spatial Sector Coordinates along a Vertical Descent Trajectory with Dynamic Angle Shifts
const SECTORS = [
  {
    id: "hero",
    title: "Pilot Nexus",
    tag: "SECTOR 01 // ORBITAL ENTRY",
    x: 1200,
    y: 550,
    coords: "1200X / 0550Y",
    color: "#2dd4bf",
    pitch: 0,
    yaw: 0,
    roll: 0,
    altitude: "ORBITAL // 32,000M",
  },
  {
    id: "systems-security",
    title: "Systems & Security",
    tag: "SECTOR 02 // SYSTEMS & SECURITY",
    x: 1020,
    y: 1350,
    coords: "1020X / 1350Y",
    color: "#4ade80",
    pitch: 4.5,
    yaw: -3.0,
    roll: -2.0,
    altitude: "STRATUM // 24,000M",
  },
  {
    id: "systems",
    title: "Project Dossiers",
    tag: "SECTOR 03 // FEATURED BUILDS",
    x: 1380,
    y: 2200,
    coords: "1380X / 2200Y",
    color: "#38bdf8",
    pitch: 5.0,
    yaw: 3.5,
    roll: 2.0,
    altitude: "MESOSPHERE // 16,000M",
  },
  {
    id: "arsenal",
    title: "Runtime Matrix",
    tag: "SECTOR 04 // COMPONENT ARRAY",
    x: 1050,
    y: 3050,
    coords: "1050X / 3050Y",
    color: "#c084fc",
    pitch: 4.0,
    yaw: -2.5,
    roll: -1.5,
    altitude: "TROPOSPHERE // 08,000M",
  },
  {
    id: "contact",
    title: "Planetary Comms",
    tag: "SECTOR 05 // TOUCHDOWN 000M",
    x: 1200,
    y: 3900,
    coords: "1200X / 3900Y",
    color: "#2dd4bf",
    pitch: 0,
    yaw: 0,
    roll: 0,
    altitude: "SURFACE // 000M",
  },
];

export default function Home() {
  const [activeSectorIndex, setActiveSectorIndex] = useState(0);
  const [replayIntro, setReplayIntro] = useState(false);
  const [activeProjectTab, setActiveProjectTab] = useState(0); // 0: Bubbles, 1: MidOS, 2: Storefront
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 3D Camera Rig with Hardware-Accelerated Descent & Angle Shifts
  const [camera, setCamera] = useState({
    x: SECTORS[0].x,
    y: SECTORS[0].y,
    z: 0,
    pitch: SECTORS[0].pitch,
    yaw: SECTORS[0].yaw,
    roll: SECTORS[0].roll,
    scale: 0.94,
    isFlight: false,
    flightVector: { dx: 0, dy: 1 },
    speedLabel: "ORBITAL CRUISE // 0 KT",
    altLabel: SECTORS[0].altitude,
    transition: "transform 400ms ease-out",
  });

  // Reticle HUD State
  const [reticle, setReticle] = useState({
    active: false,
    phase: "idle" as "idle" | "climb" | "dive" | "locked",
    targetSectorIndex: 0,
  });

  const isLockedRef = useRef(false);

  // Vertical Descent with Dynamic Angle Shifts (Silky smooth 60fps GPU transform)
  const flyToSector = useCallback(
    (targetIndex: number) => {
      if (targetIndex < 0 || targetIndex >= SECTORS.length || isLockedRef.current) return;
      if (targetIndex === activeSectorIndex) return;
      isLockedRef.current = true;

      const targetSec = SECTORS[targetIndex];
      const currentSec = SECTORS[activeSectorIndex];
      const dx = targetSec.x - currentSec.x;
      const dy = targetSec.y - currentSec.y;

      // Target Reticle
      setReticle({
        active: true,
        phase: "dive",
        targetSectorIndex: targetIndex,
      });

      // Swoop downward with bank and angle shift
      const bankRoll = targetSec.roll * 1.4;
      const bankYaw = targetSec.yaw * 1.3;
      const pitchDescent = Math.max(targetSec.pitch, 7);

      setCamera({
        x: targetSec.x,
        y: targetSec.y,
        z: -160, // Subtle depth pullback for true 3D spatial sensation
        pitch: pitchDescent,
        yaw: bankYaw,
        roll: bankRoll,
        scale: 0.88,
        isFlight: true,
        flightVector: { dx, dy },
        speedLabel: "WARP TRAVERSAL // 640 KT",
        altLabel: targetSec.altitude,
        transition: "transform 720ms cubic-bezier(0.18, 0.88, 0.32, 1)",
      });

      // Level out and lock at target sector angle
      setTimeout(() => {
        setActiveSectorIndex(targetIndex);
        setReticle((prev) => ({ ...prev, phase: "locked" }));

        setCamera({
          x: targetSec.x,
          y: targetSec.y,
          z: 0,
          pitch: targetSec.pitch,
          yaw: targetSec.yaw,
          roll: targetSec.roll,
          scale: 0.94,
          isFlight: false,
          flightVector: { dx: 0, dy: 1 },
          speedLabel: "TARGET LOCKED // 0 KT",
          altLabel: targetSec.altitude,
          transition: "transform 260ms ease-out",
        });

        setTimeout(() => {
          setReticle({ active: false, phase: "idle", targetSectorIndex: targetIndex });
          isLockedRef.current = false;
        }, 250);
      }, 720);
    },
    [activeSectorIndex]
  );

  // Read URL parameters on mount (?sector=1, ?replay=true)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const sectorParam = params.get("sector");
    const replayParam = params.get("replay");

    if (replayParam === "true") {
      setReplayIntro(true);
    }

    if (sectorParam) {
      const idx = parseInt(sectorParam, 10);
      if (!isNaN(idx) && idx >= 0 && idx < SECTORS.length) {
        setTimeout(() => flyToSector(idx), 250);
      }
    }
  }, [flyToSector]);

  // Wheel and Keyboard navigation across spatial sectors
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isLockedRef.current) return;
      const target = e.target as HTMLElement | null;
      const scrollContainer = target?.closest(".holo-scrollbar") as HTMLElement | null;

      // If user is inside a scrollable container, check if container genuinely has overflow
      if (scrollContainer) {
        const hasScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight > 15;
        if (hasScroll) {
          const isAtBottom = scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 5;
          const isAtTop = scrollContainer.scrollTop <= 5;

          // If scrolling down and not at bottom, or scrolling up and not at top, allow inner scroll
          if (e.deltaY > 0 && !isAtBottom) return;
          if (e.deltaY < 0 && !isAtTop) return;
        }
      }

      if (Math.abs(e.deltaY) < 25) return;
      if (e.deltaY > 0) {
        flyToSector(activeSectorIndex + 1);
      } else {
        flyToSector(activeSectorIndex - 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLockedRef.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
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

  // Touch & Swipe Navigation Engine for Mobile (Supports Vertical and Horizontal Gestures)
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let startTime = 0;
    let isTouchActive = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startTime = Date.now();
      isTouchActive = true;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isTouchActive || isLockedRef.current) return;
      isTouchActive = false;
      if (e.changedTouches.length !== 1) return;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = startX - endX;
      const diffY = startY - endY;
      const duration = Date.now() - startTime;

      const target = e.target as HTMLElement | null;

      // Don't intercept intentional taps on buttons or links
      if (target?.closest("button") || target?.closest("a") || target?.closest("input")) {
        if (duration < 250 && Math.abs(diffX) < 15 && Math.abs(diffY) < 15) {
          return;
        }
      }

      // 1. Horizontal Swipe (Frictionless deck navigation, never conflicts with vertical scroll)
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.1) {
        if (diffX > 0) {
          // Swiped Left -> Advance to next sector
          flyToSector(activeSectorIndex + 1);
        } else {
          // Swiped Right -> Return to previous sector
          flyToSector(activeSectorIndex - 1);
        }
        return;
      }

      // 2. Vertical Swipe
      const scrollContainer = target?.closest(".holo-scrollbar") as HTMLElement | null;
      const hasOverflow = scrollContainer && (scrollContainer.scrollHeight - scrollContainer.clientHeight > 15);

      const minDistance = duration < 350 ? 30 : 50; // Quick flick or deliberate drag
      if (Math.abs(diffY) > minDistance && Math.abs(diffY) > Math.abs(diffX)) {
        if (hasOverflow) {
          if (diffY > 0) {
            // Swiped Up (wants to go down)
            const isAtBottom = scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 15;
            if (isAtBottom) {
              flyToSector(activeSectorIndex + 1);
            }
          } else {
            // Swiped Down (wants to go up)
            const isAtTop = scrollContainer.scrollTop <= 15;
            if (isAtTop) {
              flyToSector(activeSectorIndex - 1);
            }
          }
        } else {
          // Container fits without inner scrolling -> Direct navigation
          if (diffY > 0) {
            flyToSector(activeSectorIndex + 1);
          } else {
            flyToSector(activeSectorIndex - 1);
          }
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeSectorIndex, flyToSector]);

  const current = SECTORS[activeSectorIndex];
  const targetSectorData = SECTORS[reticle.targetSectorIndex] || current;

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#030605] text-neutral-200 font-sans select-none flex flex-col justify-between">
      {/* Dynamic Parallax Starfield & Cosmic Warp Traversal (260 stars across 3 depth planes) */}
      <CosmicStarfield
        cameraX={camera.x}
        cameraY={camera.y}
        isFlight={camera.isFlight}
        flightVector={camera.flightVector}
      />

      {/* Firefly Opening Transformation Animation */}
      <FireflyIntro forcePlay={replayIntro} onComplete={() => setReplayIntro(false)} />

      {/* Thruster Speed Particles (Only runs during flight, zero idle overhead) */}
      <ThrusterTrails
        active={camera.isFlight}
        phase="dive"
        vector={camera.flightVector}
      />

      {/* Mecha Cockpit Target Reticle */}
      <FlightReticle
        active={reticle.active}
        phase={reticle.phase}
        targetSectorName={targetSectorData.title}
        targetCoords={targetSectorData.coords}
      />

      {/* Unified Navigation Bar */}
      <Navbar
        onReplayIntro={() => setReplayIntro(true)}
        onNavigateScene={flyToSector}
        activeSectorIndex={activeSectorIndex}
      />

      {/* Cockpit Visor HUD Overlays & Framing */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <div className="hidden sm:block absolute top-[72px] sm:top-20 left-3 sm:left-6 w-3.5 h-3.5 border-t-2 border-l-2 border-teal-400/50" />
        <div className="hidden sm:block absolute top-[72px] sm:top-20 right-3 sm:right-6 w-3.5 h-3.5 border-t-2 border-r-2 border-teal-400/50" />
        <div className="hidden sm:block absolute bottom-11 sm:bottom-12 left-3 sm:left-6 w-3.5 h-3.5 border-b-2 border-l-2 border-teal-400/50" />
        <div className="hidden sm:block absolute bottom-11 sm:bottom-12 right-3 sm:right-6 w-3.5 h-3.5 border-b-2 border-r-2 border-teal-400/50" />

        {/* Top Left: Active World Sector Callout */}
        <div className="absolute top-[72px] sm:top-20 left-5 sm:left-12 hidden md:flex items-center gap-2.5 text-[9px] sm:text-[10px] font-mono tracking-[0.18em] text-teal-400 uppercase bg-[#040706]/90 px-3 py-1 border border-teal-500/25">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          <span>{current.tag}</span>
        </div>

        {/* Top Right: Real-time Camera Spatial Telemetry & 3D Vector Pitch */}
        <div className="absolute top-[72px] sm:top-20 right-5 sm:right-12 hidden md:flex items-center gap-2 text-[9px] sm:text-[10px] font-mono tracking-[0.16em] text-neutral-400 uppercase bg-[#040706]/90 px-3 py-1 border border-neutral-800">
          <span className="text-teal-300 font-bold">{current.coords}</span>
          <span className="text-neutral-700">|</span>
          <span className={camera.isFlight ? "text-amber-400 font-bold animate-pulse" : "text-neutral-400"}>
            {camera.speedLabel}
          </span>
          <span className="text-neutral-700 hidden lg:inline">|</span>
          <span className={`hidden lg:inline ${camera.isFlight ? "text-teal-300 font-bold" : "text-neutral-400"}`}>
            {camera.altLabel}
          </span>
          <span className="text-neutral-700">|</span>
          <span>BANK: {camera.roll > 0 ? `+${camera.roll}` : camera.roll}°</span>
        </div>
      </div>

      {/* Desktop Hologram Sector Navigator */}
      <div className="hidden lg:flex absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-3">
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
                className={`w-2.5 h-2.5 rounded-sm transition-all duration-300 border ${
                  isActive
                    ? "bg-teal-400 border-teal-300 scale-125 shadow-[0_0_8px_#2dd4bf]"
                    : isTargeted
                    ? "bg-amber-400 border-amber-300 scale-125 animate-pulse"
                    : "bg-neutral-900 border-neutral-700 group-hover:border-neutral-500"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Mobile Hologram Quick-Nav Strip (Right Edge, thumb-accessible) */}
      <div className="flex lg:hidden fixed right-2 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-2.5 bg-[#040706]/75 backdrop-blur-md px-1.5 py-3 rounded-full border border-teal-500/25 shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
        {SECTORS.map((sec, idx) => {
          const isActive = activeSectorIndex === idx;
          const isTargeted = reticle.active && reticle.targetSectorIndex === idx;
          return (
            <button
              key={sec.id}
              onClick={() => flyToSector(idx)}
              className="p-1 focus:outline-none cursor-pointer"
              aria-label={`Jump to ${sec.title}`}
            >
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? "w-2.5 h-2.5 bg-teal-400 border border-teal-200 shadow-[0_0_8px_#2dd4bf] scale-125"
                    : isTargeted
                    ? "w-2.5 h-2.5 bg-amber-400 border border-amber-200 animate-pulse scale-125"
                    : "w-1.5 h-1.5 bg-neutral-600 hover:bg-neutral-400"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* THE 3D VERTICAL DESCENT CORRIDOR CANVAS                                   */}
      {/* Width: 2400px, Height: 4400px, Descends Downward with Angle Shifts        */}
      {/* ========================================================================= */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none"
        style={{ perspective: isMobile ? "none" : "1200px" }}
      >
        <div
          className="absolute pointer-events-auto"
          style={{
            left: "50%",
            top: "50%",
            width: "2400px",
            height: "4400px",
            marginLeft: "-1200px",
            marginTop: "-2200px",
            transformOrigin: `${camera.x}px ${camera.y}px`,
            transformStyle: isMobile ? "flat" : "preserve-3d",
            transform: isMobile
              ? `translate3d(${1200 - camera.x}px, ${2200 - camera.y}px, 0px) scale(${camera.isFlight ? 0.96 : 1.0})`
              : `rotateX(${camera.pitch}deg) rotateY(${camera.yaw}deg) rotateZ(${camera.roll}deg) translate3d(${1200 - camera.x}px, ${2200 - camera.y}px, ${camera.z}px) scale(${camera.scale})`,
            transition: camera.transition,
            willChange: "transform",
          }}
        >
          {/* Static Ground Schematic & Vertical Descent Corridor (Lightweight SVG) */}
          <svg
            viewBox="0 0 2400 4400"
            className="absolute inset-0 w-full h-full pointer-events-none opacity-25 sm:opacity-45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Continuous Vertical Descent Twin Power Conduits */}
            <line x1="1196" y1="200" x2="1196" y2="4200" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="8 14" opacity="0.4" />
            <line x1="1204" y1="200" x2="1204" y2="4200" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="8 14" opacity="0.4" />

            {/* Altitude Latitude Stratum Boundaries */}
            <g opacity="0.4">
              <line x1="400" y1="550" x2="2000" y2="550" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="4 16" />
              <text x="450" y="540" fill="#2dd4bf" fontSize="12" fontFamily="monospace" letterSpacing="4">STRATUM_01 // 32,000M // ORBITAL DEPARTURE</text>

              <line x1="400" y1="1350" x2="2000" y2="1350" stroke="#4ade80" strokeWidth="1" strokeDasharray="4 16" />
              <text x="450" y="1340" fill="#4ade80" fontSize="12" fontFamily="monospace" letterSpacing="4">STRATUM_02 // 24,000M // SYSTEMS & SECURITY</text>

              <line x1="400" y1="2200" x2="2000" y2="2200" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 16" />
              <text x="450" y="2190" fill="#38bdf8" fontSize="12" fontFamily="monospace" letterSpacing="4">STRATUM_03 // 16,000M // TACTICAL COMMAND DECK</text>

              <line x1="400" y1="3050" x2="2000" y2="3050" stroke="#c084fc" strokeWidth="1" strokeDasharray="4 16" />
              <text x="450" y="3040" fill="#c084fc" fontSize="12" fontFamily="monospace" letterSpacing="4">STRATUM_04 // 08,000M // RUNTIME MATRIX CONSTELLATION</text>

              <line x1="400" y1="3900" x2="2000" y2="3900" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="4 16" />
              <text x="450" y="3890" fill="#2dd4bf" fontSize="12" fontFamily="monospace" letterSpacing="4">STRATUM_05 // 000M // SURFACE TOUCHDOWN BEACON</text>
            </g>

            {/* Downward Flight Waypoint Corridor Lines */}
            {/* Segment 1: Sector 1 (1200, 550) -> Sector 2 (1020, 1350) */}
            <line
              x1="1200"
              y1="550"
              x2="1020"
              y2="1350"
              stroke="#4ade80"
              strokeWidth={activeSectorIndex === 1 ? "2.5" : "1"}
              strokeDasharray="10 8"
              opacity={activeSectorIndex === 1 ? "0.9" : "0.3"}
            />
            {/* Segment 2: Sector 2 (1020, 1350) -> Sector 3 (1380, 2200) */}
            <line
              x1="1020"
              y1="1350"
              x2="1380"
              y2="2200"
              stroke="#38bdf8"
              strokeWidth={activeSectorIndex === 2 ? "2.5" : "1"}
              strokeDasharray="10 8"
              opacity={activeSectorIndex === 2 ? "0.9" : "0.3"}
            />
            {/* Segment 3: Sector 3 (1380, 2200) -> Sector 4 (1050, 3050) */}
            <line
              x1="1380"
              y1="2200"
              x2="1050"
              y2="3050"
              stroke="#c084fc"
              strokeWidth={activeSectorIndex === 3 ? "2.5" : "1"}
              strokeDasharray="10 8"
              opacity={activeSectorIndex === 3 ? "0.9" : "0.3"}
            />
            {/* Segment 4: Sector 4 (1050, 3050) -> Sector 5 (1200, 3900) */}
            <line
              x1="1050"
              y1="3050"
              x2="1200"
              y2="3900"
              stroke="#2dd4bf"
              strokeWidth={activeSectorIndex === 4 ? "2.5" : "1"}
              strokeDasharray="10 8"
              opacity={activeSectorIndex === 4 ? "0.9" : "0.3"}
            />

            {/* Station Docking Feeder Conduits (Connecting Central Spine to Decks) */}
            <g opacity="0.45">
              {/* Feeder to Sector 02 (1020, 1350) */}
              <line x1="1196" y1="1350" x2="1020" y2="1350" stroke="#4ade80" strokeWidth="1.5" strokeDasharray="6 6" />
              <circle cx="1196" cy="1350" r="3" fill="#4ade80" />
              <circle cx="1020" cy="1350" r="3" fill="#4ade80" />

              {/* Feeder to Sector 03 (1380, 2200) */}
              <line x1="1204" y1="2200" x2="1380" y2="2200" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="6 6" />
              <circle cx="1204" cy="2200" r="3" fill="#38bdf8" />
              <circle cx="1380" cy="2200" r="3" fill="#38bdf8" />

              {/* Feeder to Sector 04 (1050, 3050) */}
              <line x1="1196" y1="3050" x2="1050" y2="3050" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="6 6" />
              <circle cx="1196" cy="3050" r="3" fill="#c084fc" />
              <circle cx="1050" cy="3050" r="3" fill="#c084fc" />
            </g>

            {/* Sector 05 Touchdown Radar Base (1200, 3900) */}
            <g transform="translate(1200, 3900)" opacity={activeSectorIndex === 4 ? "0.6" : "0.2"}>
              <circle cx="0" cy="0" r="160" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="4 8" />
              <circle cx="0" cy="0" r="320" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="6 12" />
              <circle cx="0" cy="0" r="480" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="8 16" />
              <line x1="-540" y1="0" x2="540" y2="0" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="4 8" />
              <line x1="0" y1="-540" x2="0" y2="540" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="4 8" />
            </g>

            {/* Station Target Structural Crosshairs */}
            {SECTORS.map((sec, idx) => (
              <g key={`station-${sec.id}`} transform={`translate(${sec.x}, ${sec.y})`}>
                <circle cx="0" cy="0" r="280" stroke={sec.color} strokeWidth="1" strokeDasharray="6 10" opacity={activeSectorIndex === idx ? "0.55" : "0.2"} />
                <line x1="-310" y1="0" x2="-290" y2="0" stroke={sec.color} strokeWidth="2" opacity="0.6" />
                <line x1="290" y1="0" x2="310" y2="0" stroke={sec.color} strokeWidth="2" opacity="0.6" />
                <line x1="0" y1="-310" x2="0" y2="-290" stroke={sec.color} strokeWidth="2" opacity="0.6" />
                <line x1="0" y1="290" x2="0" y2="310" stroke={sec.color} strokeWidth="2" opacity="0.6" />
              </g>
            ))}
          </svg>

          {/* Living Solar System & Galactic Environment (Nebulae, Helios Star, Kallisto Moon, Ringed Giant, Pulsar, Target Planet) */}
          <CosmicSolarSystem
            activeSectorIndex={activeSectorIndex}
            isMobile={isMobile}
          />

          {/* Coordinate Grid Mesh */}
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#2dd4bf_1px,transparent_1px),linear-gradient(to_bottom,#2dd4bf_1px,transparent_1px)] [background-size:80px_80px] pointer-events-none" />

          {/* =================================================================== */}
          {/* SECTOR STATIONS (Vertically Descending Spatial Environments)        */}
          {/* =================================================================== */}

          {/* SECTOR 01: PILOT NEXUS // OPEN-AIR GLASS STAGE (Y = 550) */}
          <div
            className="absolute transition-all duration-500 pointer-events-auto max-h-[calc(100dvh-125px)] overflow-y-auto holo-scrollbar pr-10 sm:pr-0.5"
            style={{
              left: `${SECTORS[0].x}px`,
              top: `${SECTORS[0].y}px`,
              transform: "translate(-50%, -50%)",
              width: "min(780px, calc(100vw - 24px))",
              opacity: activeSectorIndex === 0 ? 1 : 0.35,
            }}
          >
            {/* Open Emitter Horizon Beam */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-teal-300 to-transparent shadow-[0_0_16px_#2dd4bf] opacity-80" />

            <div className="space-y-3 sm:space-y-5">
              {/* Glass Hero Centerpiece */}
              <div className="relative group">
                {/* Ambient glow behind hero text */}
                <div className="absolute -inset-x-8 -inset-y-4 bg-gradient-to-r from-teal-500/20 via-cyan-400/15 to-emerald-500/20 rounded-3xl blur-2xl opacity-70 pointer-events-none" />

                <div className="relative space-y-1.5 sm:space-y-2.5">
                  {/* Status Pill Badge */}
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-teal-400/40 bg-teal-950/50 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_16px_rgba(0,0,0,0.5)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse shrink-0" />
                    <span className="text-[9px] sm:text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.22em] text-teal-300 font-medium">
                      Orbital Nexus // 32,000M // CS Graduate
                    </span>
                  </div>

                  {/* Massive Glass-Carved Hero Name with Sheen */}
                  <div className="relative overflow-hidden py-0.5 sm:py-1 glass-sheen rounded-xl">
                    <h1 className="text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase leading-none font-sans glass-hero-text">
                      Abrar Quadri
                    </h1>
                  </div>

                  {/* Refractive Tagline */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm font-mono tracking-wider sm:tracking-[0.16em] uppercase text-neutral-300">
                    <span className="text-teal-400 font-bold">Focus:</span>
                    <span className="bg-gradient-to-r from-white via-neutral-200 to-teal-200 bg-clip-text text-transparent font-medium">
                      Software Engineer // Full-Stack & Networks
                    </span>
                  </div>
                </div>
              </div>

              {/* Glassmorphic Substrate Card */}
              <div className="glass-panel rounded-xl p-3.5 sm:p-5 space-y-2 sm:space-y-2.5">
                <h2 className="text-sm sm:text-lg md:text-xl font-semibold tracking-tight text-white leading-snug">
                  <BitText
                    text="Building full-stack web platforms with a focus on networking and cybersecurity."
                    active={activeSectorIndex === 0}
                    delay={200}
                    isHeading
                  />
                </h2>

                <p className="text-[11px] sm:text-[13px] text-neutral-300 font-normal leading-relaxed">
                  B.S. in Computer Science graduate actively seeking Software Engineering roles.
                  I enjoy the full-stack engineering process—from frontend interfaces to backend
                  persistence—with a growing technical focus on networking protocols, system boundaries,
                  and cybersecurity.
                </p>
              </div>

              {/* Glass Tactile Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 pt-0.5">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => flyToSector(2)}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 bg-gradient-to-r from-teal-400 to-teal-300 text-neutral-950 font-bold font-mono text-[10px] sm:text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_24px_rgba(45,212,191,0.4)] transition-all cursor-pointer rounded-sm"
                  >
                    <span>Fly Down To Projects</span>
                    <FaArrowRight size={10} />
                  </button>
                  <button
                    onClick={() => flyToSector(1)}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2 border border-white/20 bg-white/[0.04] backdrop-blur-md text-neutral-200 font-mono text-[10px] sm:text-xs uppercase tracking-wider hover:bg-white/[0.08] hover:border-teal-400/50 hover:text-white transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] rounded-sm cursor-pointer"
                  >
                    <span>Systems & Security</span>
                  </button>
                  <a
                    href="https://github.com/Abrar-Quadri26710"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2.5 border border-neutral-700 bg-neutral-950/60 text-neutral-400 hover:text-white hover:border-neutral-500 font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-colors rounded-sm"
                  >
                    <SiGithub size={13} />
                    <span className="hidden sm:inline">GitHub</span>
                  </a>
                </div>

                {/* Sub-Altitude Callout */}
                <div className="text-[10px] font-mono tracking-widest text-teal-400/70 uppercase hidden md:flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
                  <span>DESCENT CORRIDOR // STANDBY</span>
                </div>
              </div>

              {/* Mobile Swipe Guidance Cue */}
              <div className="sm:hidden flex items-center justify-center gap-1.5 pt-0.5 text-[9px] font-mono text-teal-400/75 uppercase tracking-[0.2em] animate-pulse">
                <span>Swipe left/up or tap arrows to navigate</span>
                <span>↓</span>
              </div>

              {/* Floating Spatial Spec Conduit */}
              <div className="border-t border-white/10 pt-2.5 sm:pt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 text-[9px] sm:text-xs font-mono">
                <div>
                  <span className="text-neutral-500 block text-[7px] sm:text-[9px] uppercase tracking-wider">Domain</span>
                  <span className="text-neutral-200 font-medium">Full-Stack & Networks</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[7px] sm:text-[9px] uppercase tracking-wider">Status</span>
                  <span className="text-neutral-200 font-medium">CS Graduate // SWE Roles</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-neutral-500 block text-[7px] sm:text-[9px] uppercase tracking-wider">Featured Build</span>
                  <a
                    href="https://github.com/Abrar-Quadri26710/BubblesShowcase"
                    target="_blank"
                    rel="noreferrer"
                    className="text-teal-300 font-medium hover:underline inline-flex items-center gap-1"
                  >
                    <span>Bubbles // Showcase</span>
                    <FaExternalLinkAlt size={7} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* SECTOR 02: NEURAL LOGIC CORE // ASYMMETRICAL DUAL-TERMINAL (Y = 1350) */}
          <div
            className="absolute transition-opacity duration-500 pointer-events-auto max-h-[calc(100dvh-125px)] overflow-y-auto holo-scrollbar pr-10 sm:pr-0.5"
            style={{
              left: `${SECTORS[1].x}px`,
              top: `${SECTORS[1].y}px`,
              transform: "translate(-50%, -50%)",
              width: "min(800px, calc(100vw - 24px))",
              opacity: activeSectorIndex === 1 ? 1 : 0.25,
            }}
          >
            {/* Top Structural Gantry Rail */}
            <div className="flex items-center justify-between border-b border-green-500/25 pb-1 sm:pb-2 mb-2 sm:mb-3.5">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-xs font-mono uppercase tracking-[0.2em] text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span>SECTOR 02 // SYSTEMS & SECURITY LOGIC</span>
              </div>
              <div className="text-[8px] sm:text-[10px] font-mono tracking-wider text-neutral-500 uppercase flex items-center gap-1.5 sm:gap-2">
                <span className="text-green-300/80">{SECTORS[1].coords}</span>
                <span className="text-neutral-700">|</span>
                <span>STRATUM // 24,000M</span>
              </div>
            </div>

            {/* Asymmetrical Dual-Terminal Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-4 items-start">
              {/* Left Terminal: Systems Narrative Console with Glowing Emerald Spine */}
              <div className="lg:col-span-7 bg-[#020906]/90 backdrop-blur-md border border-green-500/25 border-l-4 border-l-green-400 p-3 sm:p-5 shadow-[0_12px_32px_rgba(0,0,0,0.6)] rounded-sm space-y-1.5 sm:space-y-3">
                <div className="flex items-center justify-between border-b border-green-500/15 pb-0.5 sm:pb-1 text-[8px] sm:text-[9px] font-mono text-green-400 uppercase tracking-widest">
                  <span>TERMINAL_01 // NARRATIVE ENGINE</span>
                  <span className="text-neutral-500">SYS_ID: 0x82A</span>
                </div>

                <h2 className="text-xs sm:text-xl md:text-2xl font-semibold tracking-tight text-white leading-snug sm:leading-[1.25]">
                  <BitText
                    text="Full-stack engineering grounded in systems and security."
                    active={activeSectorIndex === 1}
                    delay={200}
                    isHeading
                  />
                </h2>

                {/* Mobile Concise Narrative */}
                <div className="sm:hidden text-neutral-300 text-[11px] leading-relaxed">
                  <p>
                    I build responsive interfaces backed by resilient architectures. Drawing from low-level systems principles in <strong className="text-white font-medium">MidOS</strong> and <strong className="text-white font-medium">Bubbles</strong>, I enforce rigorous process boundaries, clean network protocols, and defensive security invariants.
                  </p>
                </div>

                {/* Desktop Full Depth Narrative */}
                <div className="hidden sm:block space-y-2 text-neutral-300 text-[11px] sm:text-[13px] leading-relaxed">
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

                <div className="pt-1 sm:pt-1.5 border-t border-green-500/15 flex items-center justify-between text-[8px] sm:text-[10px] font-mono text-neutral-500">
                  <span className="text-green-400/80">BOUNDARIES: ENFORCED</span>
                  <span>MEMORY ISOLATION // ACTIVE</span>
                </div>
              </div>

              {/* Right Terminal: Detached Floating Telemetry Pod */}
              <div className="lg:col-span-5 bg-[#020906]/90 backdrop-blur-md border border-green-500/25 border-t-2 border-t-green-400 p-2.5 sm:p-5 shadow-[0_8px_24px_rgba(0,0,0,0.5)] rounded-sm space-y-2 sm:space-y-3.5">
                <div className="flex items-center justify-between border-b border-green-500/15 pb-0.5 sm:pb-1 text-[8px] sm:text-[9px] font-mono text-green-400 uppercase tracking-widest">
                  <span>POD_02 // TELEMETRY & INVARIANTS</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                </div>

                <div>
                  <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-neutral-500 block mb-0.5">
                    Academic Milestone
                  </span>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <p className="text-neutral-200 font-medium text-[11px] sm:text-[13px]">
                      B.S. in Computer Science
                    </p>
                    <span className="text-[7px] sm:text-[8px] font-mono uppercase px-1.5 py-0.2 bg-green-950/70 border border-green-700/60 text-green-300">
                      Completed
                    </span>
                  </div>
                  <p className="text-[9px] sm:text-xs text-neutral-400 mt-0.5 leading-normal">
                    Operating Systems, Networks, Security Fundamentals, Database Systems.
                  </p>
                </div>

                <div className="pt-1.5 border-t border-green-500/15">
                  <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-neutral-500 block mb-1">
                    Core Principles
                  </span>
                  <ul className="space-y-1 sm:space-y-1.5 text-[9px] sm:text-xs text-neutral-300">
                    <li className="flex items-start gap-1.5">
                      <span className="text-green-400 font-mono font-bold shrink-0">01</span>
                      <span>End-to-end craft: Clean interfaces backed by robust servers.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-green-400 font-mono font-bold shrink-0">02</span>
                      <span>Defensive design: Enforce authorization and validate all boundaries.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-green-400 font-mono font-bold shrink-0">03</span>
                      <span>Continuous growth: Expanding in networking and cybersecurity.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* SECTOR 03: SIMULATION HARDWARE // CARRIER COMMAND DOCK (Y = 2200) */}
          <div
            className="absolute transition-opacity duration-500 pointer-events-auto max-h-[calc(100dvh-125px)] overflow-y-auto holo-scrollbar pr-10 sm:pr-0.5"
            style={{
              left: `${SECTORS[2].x}px`,
              top: `${SECTORS[2].y}px`,
              transform: "translate(-50%, -50%)",
              width: "min(820px, calc(100vw - 24px))",
              opacity: activeSectorIndex === 2 ? 1 : 0.25,
            }}
          >
            {/* Overhead Hangar Gantry Rail */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 border-b border-sky-500/25 pb-1.5 sm:pb-2.5 mb-2 sm:mb-3.5">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-sky-400 rotate-45 shadow-[0_0_8px_#38bdf8] shrink-0" />
                <div>
                  <div className="text-[8px] sm:text-[10px] font-mono text-sky-400 uppercase tracking-[0.2em] flex items-center gap-1.5 sm:gap-2">
                    <span>DOCKING BAY 03 // 16,000M</span>
                    <span className="text-neutral-600">//</span>
                    <span className="text-neutral-400">CARRIER ARCHIVE</span>
                  </div>
                  <h2 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight mt-0.5">
                    <BitText
                      text="Tactical Project Dossiers"
                      active={activeSectorIndex === 2}
                      delay={200}
                      isHeading
                    />
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 border border-sky-500/40 bg-sky-950/40 text-sky-200 hover:text-white hover:border-sky-400 font-mono text-[9px] sm:text-xs uppercase tracking-wider transition-all rounded-sm cursor-pointer shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                >
                  <span>Full Archive</span>
                  <FaArrowRight size={9} />
                </Link>
              </div>
            </div>

            {/* Carrier Project Selector Rail */}
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
              {[
                { title: "Bubbles // Social Platform", tag: "SHOWCASE & DEMO", color: "teal" },
                { title: "MidOS // Virtual OS", tag: "C# .NET", color: "sky" },
                { title: "Storefront // Web & SQL", tag: "PHP / MYSQL", color: "emerald" },
              ].map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveProjectTab(idx)}
                  className={`px-2 py-1 sm:px-3.5 sm:py-2 border text-[9px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer rounded-sm ${
                    activeProjectTab === idx
                      ? "bg-sky-950/70 border-sky-400 text-sky-200 font-bold shadow-[0_0_14px_rgba(56,189,248,0.25)]"
                      : "bg-neutral-950/50 border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200"
                  }`}
                >
                  <span className="text-[8px] sm:text-[9px] opacity-60">0{idx + 1}</span>
                  <span>{tab.title}</span>
                  <span
                    className={`hidden sm:inline text-[8px] px-1 py-0.2 border ${
                      activeProjectTab === idx
                        ? "border-sky-400/60 bg-sky-900/60 text-sky-300"
                        : "border-neutral-800 bg-neutral-900/40 text-neutral-500"
                    }`}
                  >
                    {tab.tag}
                  </span>
                </button>
              ))}
            </div>

            {/* Expansive Command Deck Container */}
            <div className="border border-sky-500/25 bg-[#020b14]/90 backdrop-blur-md p-3.5 sm:p-5 md:p-6 relative rounded-sm shadow-[0_16px_40px_rgba(0,0,0,0.7)]">
              {/* Corner Micro-Brackets */}
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-sky-400/60" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-sky-400/60" />

              {/* TAB 0: BUBBLES */}
              {activeProjectTab === 0 && (
                <div className="space-y-2.5 sm:space-y-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-1.5">
                    <div>
                      <span className="text-[8px] sm:text-[10px] font-mono text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                        Full-Stack Architecture // Next.js & React 19
                      </span>
                      <h3 className="text-sm sm:text-xl md:text-2xl font-bold text-white mt-0.5">
                        Bubbles Social Platform
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5 self-start sm:self-auto">
                      <span className="px-2 py-0.5 text-[7px] sm:text-[9px] font-mono bg-teal-950/80 text-teal-300 border border-teal-700/60 tracking-wider rounded-sm">
                        WORKING ALPHA // SHOWCASE AVAILABLE
                      </span>
                    </div>
                  </div>

                  <p className="hidden sm:block text-neutral-300 text-[11px] sm:text-[13px] leading-relaxed">
                    A full-stack social platform built around topic-based conversations rather than engagement-driven feeds.
                    Designed with a clean Frutiger Aero aesthetic. Features <strong className="text-white">Spaces</strong> (single-field communities)
                    and <strong className="text-white">Clouds</strong> (multi-field communities with 100-member scaling transitions).
                    Includes same-topic refresh across the <strong className="text-white">Central Field</strong>, stance labels
                    (<span className="text-teal-300">Open</span>, <span className="text-teal-300">Support</span>,{" "}
                    <span className="text-teal-300">Challenge</span>, <span className="text-teal-300">Curious</span>), creator-defined lifecycles (active, expiry, and archive windows), and JSON archive exports.
                    Engineered with Next.js, React 19, TypeScript, Tailwind CSS, Prisma ORM, SQLite, and server-side invariant authorization.
                  </p>
                  <p className="sm:hidden text-neutral-300 text-[11px] leading-relaxed">
                    A full-stack social platform in alpha built around topic-based conversations. Features Spaces, Clouds,
                    same-topic refresh in Central Field, stance tags (<span className="text-teal-300">Open</span>, <span className="text-teal-300">Support</span>, <span className="text-teal-300">Challenge</span>, <span className="text-teal-300">Curious</span>),
                    discussion lifecycles, and JSON exports. Built with Next.js, React 19, TypeScript, and Prisma ORM.
                  </p>

                  <div className="p-2 sm:p-3 bg-neutral-900/70 border border-teal-500/30 text-[9px] sm:text-xs font-mono text-neutral-300 flex flex-col md:flex-row md:items-center justify-between gap-2 rounded-sm">
                    <a
                      href="https://youtu.be/p5OGBDskJ4k"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-teal-300 hover:text-white transition-colors font-medium group"
                    >
                      <FaVideo size={12} className="text-red-400 shrink-0" />
                      <span className="group-hover:underline">Watch Video Demonstration (YouTube)</span>
                      <FaExternalLinkAlt size={8} className="opacity-70" />
                    </a>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 self-start md:self-auto">
                      <a
                        href="https://github.com/Abrar-Quadri26710/BubblesShowcase"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-teal-500/40 bg-teal-950/70 text-teal-200 hover:text-white hover:border-teal-400 font-mono text-[9px] sm:text-[11px] uppercase tracking-wider transition-all rounded-sm cursor-pointer shadow-[0_0_10px_rgba(45,212,191,0.15)]"
                      >
                        <SiGithub size={12} />
                        <span>Showcase Repo</span>
                        <FaExternalLinkAlt size={7} />
                      </a>
                      <a
                        href="mailto:mirrowdin@gmail.com?subject=Inquiry%20regarding%20Bubbles%20Social%20Platform"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-teal-400 to-teal-300 text-neutral-950 font-bold font-mono text-[9px] sm:text-[11px] uppercase tracking-wider hover:brightness-110 transition-all rounded-sm cursor-pointer shadow-[0_0_12px_rgba(45,212,191,0.3)]"
                      >
                        <span>Request Demo</span>
                        <FaArrowRight size={8} />
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 pt-2 sm:pt-2.5 border-t border-sky-500/15 text-[9px] sm:text-[11px] font-mono">
                    <div className="p-1 sm:p-1.5 bg-neutral-900/40 border border-neutral-800">
                      <span className="text-neutral-500 block text-[7px] sm:text-[9px] uppercase tracking-wider">Community</span>
                      <span className="text-neutral-200 font-medium">Spaces & Clouds</span>
                    </div>
                    <div className="p-1 sm:p-1.5 bg-neutral-900/40 border border-neutral-800">
                      <span className="text-neutral-500 block text-[7px] sm:text-[9px] uppercase tracking-wider">Discovery</span>
                      <span className="text-neutral-200 font-medium">Central Field & Refresh</span>
                    </div>
                    <div className="p-1 sm:p-1.5 bg-neutral-900/40 border border-neutral-800">
                      <span className="text-neutral-500 block text-[7px] sm:text-[9px] uppercase tracking-wider">Full-Stack</span>
                      <span className="text-neutral-200 font-medium">Next.js / Prisma / SQLite</span>
                    </div>
                    <div className="p-1 sm:p-1.5 bg-neutral-900/40 border border-neutral-800">
                      <span className="text-neutral-500 block text-[7px] sm:text-[9px] uppercase tracking-wider">Security</span>
                      <span className="text-neutral-200 font-medium">Server Invariant Checks</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 1: MIDOS */}
              {activeProjectTab === 1 && (
                <div className="space-y-3 sm:space-y-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-mono text-sky-400 uppercase tracking-wider">
                        Virtual Operating System // C# & .NET
                      </span>
                      <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white mt-0.5">
                        MidOS Virtual Operating System
                      </h3>
                    </div>
                    <a
                      href="https://github.com/Abrar-Quadri26710/MidOS"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1 bg-sky-950/70 border border-sky-500/40 text-sky-300 hover:text-white transition-all text-[11px] font-mono uppercase tracking-wider self-start sm:self-auto rounded-sm"
                      aria-label="MidOS Source"
                    >
                      <SiGithub size={14} />
                      <span>Source Repo</span>
                    </a>
                  </div>

                  <p className="text-neutral-300 text-xs sm:text-[13px] leading-relaxed">
                    A virtual operating system built from scratch to explore system-level process
                    scheduling and execution isolation. Implements cooperative and preemptive task
                    switching, virtual memory management with two-level page tables and LRU page
                    eviction, mutex and event synchronization, and dynamic heap allocation.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2.5 border-t border-sky-500/15 text-[10px] sm:text-[11px] font-mono">
                    <div className="p-1.5 bg-neutral-900/40 border border-neutral-800">
                      <span className="text-neutral-500 block text-[8px] sm:text-[9px] uppercase tracking-wider">Memory</span>
                      <span className="text-neutral-200 font-medium">2-Level Page Tables</span>
                    </div>
                    <div className="p-1.5 bg-neutral-900/40 border border-neutral-800">
                      <span className="text-neutral-500 block text-[8px] sm:text-[9px] uppercase tracking-wider">Eviction</span>
                      <span className="text-neutral-200 font-medium">LRU + Dirty Bit</span>
                    </div>
                    <div className="p-1.5 bg-neutral-900/40 border border-neutral-800">
                      <span className="text-neutral-500 block text-[8px] sm:text-[9px] uppercase tracking-wider">Isolation</span>
                      <span className="text-neutral-200 font-medium">Process Boundaries</span>
                    </div>
                    <div className="p-1.5 bg-neutral-900/40 border border-neutral-800">
                      <span className="text-neutral-500 block text-[8px] sm:text-[9px] uppercase tracking-wider">Pipeline</span>
                      <span className="text-neutral-200 font-medium">Custom FDE Engine</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: STOREFRONT */}
              {activeProjectTab === 2 && (
                <div className="space-y-3 sm:space-y-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                        Full-Stack Web & Persistence // PHP & MySQL
                      </span>
                      <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white mt-0.5">
                        Storefront E-Commerce Platform
                      </h3>
                    </div>
                    <a
                      href="https://github.com/Abrar-Quadri26710/StoreFrontWebsite"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 hover:text-white transition-all text-[11px] font-mono uppercase tracking-wider self-start sm:self-auto rounded-sm"
                      aria-label="Storefront Source"
                    >
                      <SiGithub size={14} />
                      <span>Source Repo</span>
                    </a>
                  </div>

                  <p className="text-neutral-300 text-xs sm:text-[13px] leading-relaxed">
                    An e-commerce web platform engineered with PHP and MySQL, designed to reinforce
                    backend software engineering, session security, and database normalization.
                    Features user authentication, role-based access control, an administrative
                    management panel, and a normalized relational schema preventing data anomalies.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2.5 border-t border-sky-500/15 text-[10px] sm:text-[11px] font-mono">
                    <div className="p-1.5 bg-neutral-900/40 border border-neutral-800">
                      <span className="text-neutral-500 block text-[8px] sm:text-[9px] uppercase tracking-wider">Backend</span>
                      <span className="text-neutral-200 font-medium">PHP Session Engine</span>
                    </div>
                    <div className="p-1.5 bg-neutral-900/40 border border-neutral-800">
                      <span className="text-neutral-500 block text-[8px] sm:text-[9px] uppercase tracking-wider">Database</span>
                      <span className="text-neutral-200 font-medium">MySQL 3NF Schema</span>
                    </div>
                    <div className="p-1.5 bg-neutral-900/40 border border-neutral-800">
                      <span className="text-neutral-500 block text-[8px] sm:text-[9px] uppercase tracking-wider">Access Control</span>
                      <span className="text-neutral-200 font-medium">Role-Based (RBAC)</span>
                    </div>
                    <div className="p-1.5 bg-neutral-900/40 border border-neutral-800">
                      <span className="text-neutral-500 block text-[8px] sm:text-[9px] uppercase tracking-wider">Cart State</span>
                      <span className="text-neutral-200 font-medium">Session Persistence</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SECTOR 04: RUNTIME MATRIX // OPEN CONSTELLATION ARRAY (Y = 3050) */}
          <div
            className="absolute transition-opacity duration-500 pointer-events-auto max-h-[calc(100dvh-125px)] overflow-y-auto holo-scrollbar pr-10 sm:pr-0.5"
            style={{
              left: `${SECTORS[3].x}px`,
              top: `${SECTORS[3].y}px`,
              transform: "translate(-50%, -50%)",
              width: "min(840px, calc(100vw - 24px))",
              opacity: activeSectorIndex === 3 ? 1 : 0.25,
            }}
          >
            {/* Open Emitter Horizon Beam */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent shadow-[0_0_16px_#c084fc] opacity-80" />

            {/* Floating HUD Command Rail */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 sm:gap-2 border-b border-purple-500/25 pb-1.5 sm:pb-2.5 mb-2.5 sm:mb-4">
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-xs font-mono uppercase tracking-[0.2em] text-purple-400 mb-0.5 sm:mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  <span>SECTOR 04 // COMPONENT MATRIX CONSTELLATION [ALT: 08,000M]</span>
                </div>
                <h2 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
                  <BitText
                    text="Tools and technologies I rely on."
                    active={activeSectorIndex === 3}
                    delay={200}
                    isHeading
                  />
                </h2>
              </div>
              <div className="text-[9px] sm:text-[10px] font-mono text-purple-300/80 tracking-wider uppercase flex items-center gap-1.5 sm:gap-2 self-start sm:self-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                <span>11 ACTIVE RUNTIME NODES</span>
              </div>
            </div>

            {/* Bit-Forming Tech Nodes Constellation Grid (2 Columns on Mobile to Prevent Overflow) */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 sm:gap-2.5">
              <TechBitNode
                icon={<SiTypescript size={16} />}
                label="TypeScript"
                sublabel="Type-Safe Web Engineering"
                active={activeSectorIndex === 3}
                delayIndex={1}
              />
              <TechBitNode
                icon={<SiReact size={16} />}
                label="React 19"
                sublabel="Server Components, Modern UI"
                active={activeSectorIndex === 3}
                delayIndex={2}
              />
              <TechBitNode
                icon={<SiNextdotjs size={16} />}
                label="Next.js 16"
                sublabel="App Router, Turbopack"
                active={activeSectorIndex === 3}
                delayIndex={3}
              />
              <TechBitNode
                icon={<SiTailwindcss size={16} />}
                label="Tailwind CSS v4"
                sublabel="Modern Responsive Layouts"
                active={activeSectorIndex === 3}
                delayIndex={4}
              />
              <TechBitNode
                icon={<SiPrisma size={16} />}
                label="Prisma ORM"
                sublabel="Type-Safe Schema & Migrations"
                active={activeSectorIndex === 3}
                delayIndex={5}
              />
              <TechBitNode
                icon={<SiPhp size={16} />}
                label="PHP"
                sublabel="Backend Engines, Sessions"
                active={activeSectorIndex === 3}
                delayIndex={6}
              />
              <TechBitNode
                icon={<SiMysql size={16} />}
                label="MySQL / SQL"
                sublabel="Relational Schema Normalization"
                active={activeSectorIndex === 3}
                delayIndex={7}
              />
              <TechBitNode
                icon={<FaNetworkWired size={16} />}
                label="Networking"
                sublabel="TCP/IP, HTTP, Protocols"
                active={activeSectorIndex === 3}
                delayIndex={8}
              />
              <TechBitNode
                icon={<FaShieldAlt size={16} />}
                label="Cybersecurity"
                sublabel="Auth, RBAC, Defense-in-Depth"
                active={activeSectorIndex === 3}
                delayIndex={9}
              />
              <TechBitNode
                icon={<SiLinux size={16} />}
                label="Linux Systems"
                sublabel="Toolchains, POSIX, Bash"
                active={activeSectorIndex === 3}
                delayIndex={10}
              />
              <TechBitNode
                icon={<TbBrandCSharp size={16} />}
                label="C# (.NET)"
                sublabel="Concurrency, Virtual Kernels"
                active={activeSectorIndex === 3}
                delayIndex={11}
              />
            </div>

            {/* Matrix Sub-Telemetry Conduit */}
            <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-2.5 border-t border-purple-500/20 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-mono text-neutral-400">
              <span className="text-purple-300">TOPOLOGY: DISTRIBUTED & SYSTEM BOUNDARIES</span>
              <span>ALL SUBSYSTEMS NOMINAL // TROPOSPHERE</span>
            </div>
          </div>

          {/* SECTOR 05: PLANETARY COMMS // TOUCHDOWN BEACON BASE (Y = 3900) */}
          <div
            className="absolute transition-opacity duration-500 pointer-events-auto max-h-[calc(100dvh-125px)] overflow-y-auto holo-scrollbar pr-10 sm:pr-0.5"
            style={{
              left: `${SECTORS[4].x}px`,
              top: `${SECTORS[4].y}px`,
              transform: "translate(-50%, -50%)",
              width: "min(760px, calc(100vw - 24px))",
              opacity: activeSectorIndex === 4 ? 1 : 0.25,
            }}
          >
            {/* Touchdown Elevation & Radar Marker */}
            <div className="flex items-center justify-between border-b border-teal-500/25 pb-1.5 sm:pb-2 mb-2 sm:mb-3.5">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-xs font-mono uppercase tracking-[0.2em] text-teal-400">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-teal-400 animate-pulse" />
                <span>SURFACE TOUCHDOWN // ELEVATION 000M</span>
              </div>
              <div className="text-[9px] sm:text-[10px] font-mono text-teal-300/80 tracking-widest uppercase flex items-center gap-1.5 sm:gap-2">
                <span>BEACON ONLINE</span>
                <span className="text-neutral-700">|</span>
                <span>1200X / 3900Y</span>
              </div>
            </div>

            {/* Ground Terminal Glass Panel */}
            <div className="glass-panel rounded-xl p-3.5 sm:p-6 md:p-7 space-y-3 sm:space-y-4 relative overflow-hidden">
              {/* Ambient Beacon Pulse Glow */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

              <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-snug">
                <BitText
                  text="Open to Software Engineering opportunities."
                  active={activeSectorIndex === 4}
                  delay={200}
                  isHeading
                />
              </h2>

              <p className="text-neutral-300 text-[11px] sm:text-sm leading-relaxed max-w-xl">
                B.S. in Computer Science graduate looking for full-time Software Engineer positions
                with an interest to grow into networking and cybersecurity. I enjoy the full-stack
                process and am eager to contribute, build reliable software, and continuously expand
                my skill set.
              </p>

              {/* Tactile Communication Action Strip */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-0.5">
                <a
                  href="mailto:mirrowdin@gmail.com"
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-5 sm:py-2.5 bg-gradient-to-r from-teal-400 to-teal-300 text-neutral-950 font-bold font-mono text-[10px] sm:text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_24px_rgba(45,212,191,0.4)] transition-all rounded-sm cursor-pointer"
                >
                  <span>Transmit Message</span>
                  <FaArrowRight size={9} />
                </a>
                <a
                  href="https://www.linkedin.com/in/abrar-quadri-03b946317/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-5 sm:py-2.5 border border-white/20 bg-white/[0.04] backdrop-blur-md text-neutral-200 hover:text-white hover:border-teal-400/50 hover:bg-white/[0.08] font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all rounded-sm cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                >
                  <span>LinkedIn Channel</span>
                </a>
              </div>

              {/* Return to Orbit & Terminal Signature */}
              <div className="pt-3 sm:pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-2.5 text-[9px] sm:text-xs font-mono text-neutral-400">
                <div>Abrar Quadri // Software Engineer Portfolio</div>
                <button
                  onClick={() => flyToSector(0)}
                  className="inline-flex items-center gap-1.5 text-teal-300 hover:text-white uppercase tracking-wider cursor-pointer font-bold transition-colors"
                >
                  <span>Return to Orbit (Sector 01)</span>
                  <span>↑</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER BAR WITH SPATIAL COORDINATES & NAV CONTROLS */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-neutral-900/80 bg-neutral-950/95 backdrop-blur-md px-3 sm:px-6 py-2 sm:py-2.5 pb-[max(0.6rem,env(safe-area-inset-bottom))] flex items-center justify-between text-[10px] sm:text-xs font-mono text-neutral-500 z-30">
        <div className="flex items-center gap-2 sm:gap-3 truncate max-w-[190px] sm:max-w-none">
          <span className="text-teal-400 uppercase tracking-wider font-semibold truncate">
            {current.tag.split("//")[0].trim()}
          </span>
          <span className="text-neutral-700">|</span>
          <span className="text-neutral-300 truncate">{current.title}</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <span className="text-[10px] uppercase tracking-widest text-neutral-500 hidden md:inline">
            Scroll or Use Arrow Keys to Fly
          </span>
          {/* Mobile Sector Index Display */}
          <span className="text-[10px] uppercase tracking-widest text-teal-400/90 font-mono sm:hidden">
            0{activeSectorIndex + 1} / 0{SECTORS.length}
          </span>
          <div className="flex items-center gap-1.5 sm:gap-1">
            <button
              onClick={() => flyToSector(activeSectorIndex - 1)}
              disabled={activeSectorIndex === 0}
              className="px-2.5 py-1.5 sm:p-1.5 border border-neutral-800 hover:border-neutral-600 disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer text-neutral-300 active:bg-teal-950/60 active:text-teal-300 active:border-teal-500/50 rounded-sm"
              aria-label="Previous Sector"
            >
              <FaChevronUp size={12} />
            </button>
            <button
              onClick={() => flyToSector(activeSectorIndex + 1)}
              disabled={activeSectorIndex === SECTORS.length - 1}
              className="px-2.5 py-1.5 sm:p-1.5 border border-neutral-800 hover:border-neutral-600 disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer text-neutral-300 active:bg-teal-950/60 active:text-teal-300 active:border-teal-500/50 rounded-sm"
              aria-label="Next Sector"
            >
              <FaChevronDown size={12} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
