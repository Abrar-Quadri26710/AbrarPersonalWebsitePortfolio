"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SiGithub } from "react-icons/si";
import { FaLinkedin, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";

interface NavbarProps {
  onReplayIntro?: () => void;
  onNavigateScene?: (index: number) => void;
  activeSectorIndex?: number;
}

const NAV_AREAS = [
  { name: "Systems", path: "/", sectorIndex: 0, tag: "01 // COCKPIT & BLUEPRINT" },
  { name: "Projects", path: "/projects", sectorIndex: null, tag: "02 // TACTICAL ARCHIVE" },
  { name: "3D Hologram", path: "/about", sectorIndex: null, tag: "03 // NEURAL MIND MATRIX" },
  { name: "Lounge", path: "/relax", sectorIndex: null, tag: "04 // AMBIENT CHILL STATION" },
];

export default function Navbar({ onReplayIntro, onNavigateScene, activeSectorIndex = 0 }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleTabClick = (area: typeof NAV_AREAS[0]) => {
    setMobileMenuOpen(false);

    // If clicking a homepage sector while on the homepage
    if (pathname === "/" && area.sectorIndex !== null) {
      if (onNavigateScene) {
        onNavigateScene(area.sectorIndex);
      }
      return;
    }

    // If navigating to another page or from another page to home
    router.push(area.path);
  };

  const handleReplayClick = () => {
    setMobileMenuOpen(false);
    if (onReplayIntro) {
      onReplayIntro();
    } else {
      router.push("/?replay=true");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-neutral-900/80 bg-[#030605]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/" && onNavigateScene) {
              e.preventDefault();
              onNavigateScene(0);
            }
          }}
          className="flex items-center gap-2.5 sm:gap-3 text-sm font-semibold tracking-wider text-neutral-100 hover:text-teal-300 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em]">Abrar Quadri</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs uppercase tracking-widest text-neutral-400 font-mono">
          {NAV_AREAS.map((area) => {
            let isActive = false;
            if (pathname === "/" && area.sectorIndex !== null) {
              isActive = activeSectorIndex === area.sectorIndex;
            } else if (area.sectorIndex === null) {
              isActive = pathname === area.path;
            }

            return (
              <button
                key={area.name}
                onClick={() => handleTabClick(area)}
                className={`relative py-1 transition-colors cursor-pointer group ${
                  isActive ? "text-teal-300 font-bold" : "hover:text-neutral-100"
                }`}
              >
                <span>{area.name}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 shadow-[0_0_8px_#2dd4bf]" />
                )}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-400/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })}
        </nav>

        {/* Actions & Social Links */}
        <div className="flex items-center gap-2 sm:gap-4 text-neutral-400">
          <button
            onClick={handleReplayClick}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-teal-300/90 border border-teal-900/60 hover:border-teal-500/80 hover:bg-teal-950/40 transition-colors cursor-pointer"
            title="Play Firefly's Tactical Intro"
          >
            Replay Intro
          </button>

          <div className="hidden sm:flex items-center gap-1 sm:gap-2">
            <a
              href="https://github.com/Abrar-Quadri26710"
              target="_blank"
              rel="noreferrer"
              className="p-2 hover:text-neutral-100 transition-colors"
              aria-label="GitHub Profile"
            >
              <SiGithub size={17} />
            </a>
            <a
              href="https://www.linkedin.com/in/abrar-quadri-03b946317/"
              target="_blank"
              rel="noreferrer"
              className="p-2 hover:text-neutral-100 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin size={17} />
            </a>
            <a
              href="mailto:mirrowdin@gmail.com"
              className="p-2 hover:text-neutral-100 transition-colors"
              aria-label="Send Email"
            >
              <FaEnvelope size={17} />
            </a>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-[#030705]/95 backdrop-blur-xl px-5 py-5 space-y-3.5 animate-in slide-in-from-top duration-200">
          <div className="text-[10px] font-mono text-teal-400 uppercase tracking-widest pb-2 border-b border-teal-500/20">
            SUIT NAVIGATION // DESTINATION SELECT
          </div>

          <nav className="flex flex-col gap-2 font-mono">
            {NAV_AREAS.map((area) => {
              let isActive = false;
              if (pathname === "/" && area.sectorIndex !== null) {
                isActive = activeSectorIndex === area.sectorIndex;
              } else if (area.sectorIndex === null) {
                isActive = pathname === area.path;
              }

              return (
                <button
                  key={area.name}
                  onClick={() => handleTabClick(area)}
                  className={`flex items-center justify-between p-2.5 border text-left transition-all cursor-pointer ${
                    isActive
                      ? "border-teal-400 bg-teal-950/40 text-teal-300 font-bold"
                      : "border-neutral-800 bg-neutral-900/30 text-neutral-300 hover:border-neutral-600"
                  }`}
                >
                  <div>
                    <div className="text-xs uppercase tracking-wider">{area.name}</div>
                    <div className="text-[9px] text-neutral-500">{area.tag}</div>
                  </div>
                  {isActive && <span className="text-[10px] text-teal-400 font-bold">ACTIVE</span>}
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
            <button
              onClick={handleReplayClick}
              className="px-3 py-1.5 text-xs font-mono uppercase text-teal-300 border border-teal-800"
            >
              Replay Intro
            </button>
            <div className="flex items-center gap-3 text-neutral-400">
              <a
                href="https://github.com/Abrar-Quadri26710"
                target="_blank"
                rel="noreferrer"
                className="p-1 hover:text-white"
                aria-label="GitHub"
              >
                <SiGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/abrar-quadri-03b946317/"
                target="_blank"
                rel="noreferrer"
                className="p-1 hover:text-white"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="mailto:mirrowdin@gmail.com"
                className="p-1 hover:text-white"
                aria-label="Email"
              >
                <FaEnvelope size={18} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
