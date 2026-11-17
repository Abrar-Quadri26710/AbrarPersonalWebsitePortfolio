"use client";

import { useEffect, useState } from "react";

interface TechBitNodeProps {
  icon?: React.ReactNode;
  label: string;
  sublabel?: string;
  active: boolean;
  delayIndex?: number;
}

const BITS = ["01", "10", "11", "00", "F4", "A9", "E2"];

export default function TechBitNode({
  icon,
  label,
  sublabel,
  active,
  delayIndex = 0,
}: TechBitNodeProps) {
  const [stage, setStage] = useState<"idle" | "forming" | "locked">("idle");
  const [bitFragment, setBitFragment] = useState("01");

  useEffect(() => {
    if (!active) {
      setStage("idle");
      return;
    }

    const t1 = setTimeout(() => {
      setStage("forming");
      const interval = setInterval(() => {
        setBitFragment(BITS[Math.floor(Math.random() * BITS.length)]);
      }, 50);

      const t2 = setTimeout(() => {
        clearInterval(interval);
        setStage("locked");
      }, 350);

      return () => {
        clearInterval(interval);
        clearTimeout(t2);
      };
    }, delayIndex * 90);

    return () => clearTimeout(t1);
  }, [active, delayIndex]);

  return (
    <div
      className={`relative p-1.5 sm:p-3 border transition-all duration-500 overflow-hidden ${
        stage === "locked"
          ? "border-neutral-800 bg-neutral-950/70 hover:border-teal-500/70"
          : stage === "forming"
          ? "border-teal-400 bg-teal-950/30 scale-[1.02]"
          : "border-neutral-900/40 bg-transparent opacity-20"
      }`}
    >
      {/* Corner micro-brackets */}
      <div className="absolute top-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-t border-r border-teal-400/50" />
      <div className="absolute bottom-0 left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-b border-l border-teal-400/50" />

      {/* Bit Forming Status */}
      {stage === "forming" && (
        <div className="absolute top-0.5 right-1.5 text-[7px] sm:text-[8px] font-mono text-teal-300 animate-pulse">
          BIT {bitFragment}
        </div>
      )}

      <div className="flex items-center gap-2 sm:gap-3">
        {icon && (
          <div
            className={`shrink-0 transition-all duration-300 scale-90 sm:scale-100 ${
              stage === "locked"
                ? "text-teal-400"
                : stage === "forming"
                ? "text-teal-200 animate-pulse"
                : "text-neutral-600"
            }`}
          >
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div
            className={`text-[11px] sm:text-sm font-semibold transition-colors duration-300 truncate leading-tight ${
              stage === "locked"
                ? "text-neutral-200"
                : stage === "forming"
                ? "text-teal-300 font-mono"
                : "text-neutral-500 font-mono"
            }`}
          >
            {stage === "forming" ? `FORMING // ${label}...` : label}
          </div>
          {sublabel && (
            <div className="text-[8px] sm:text-[10px] font-mono text-neutral-400 truncate mt-0.5 leading-tight">
              {sublabel}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
