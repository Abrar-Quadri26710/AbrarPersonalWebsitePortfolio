"use client";

interface FlightReticleProps {
  active: boolean;
  phase: "idle" | "climb" | "dive" | "locked";
  targetSectorName: string;
  targetCoords: string;
}

export default function FlightReticle({
  active,
  phase,
  targetSectorName,
  targetCoords,
}: FlightReticleProps) {
  if (!active) return null;

  const isDiving = phase === "dive";
  const isLocked = phase === "locked";

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center">
      {/* Outer Lock Brackets that expand during climb and snap tight during dive */}
      <div
        className={`relative transition-all duration-500 ease-out flex items-center justify-center ${
          isLocked
            ? "w-48 h-48 scale-95 border-teal-400"
            : isDiving
            ? "w-56 h-56 scale-100 border-teal-300"
            : "w-80 h-80 scale-110 border-teal-400/40"
        }`}
      >
        {/* 4 Mecha Visor Reticle Corner Brackets */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-teal-400" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-teal-400" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-teal-400" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-teal-400" />

        {/* Central Crosshair */}
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="w-full h-px bg-teal-400/70" />
          <div className="h-full w-px bg-teal-400/70 absolute" />
          <div
            className={`w-2 h-2 rounded-full border border-teal-300 transition-transform duration-300 ${
              isDiving ? "scale-125 bg-teal-400" : "scale-100 bg-transparent"
            }`}
          />
        </div>

        {/* Inner Rotating Ring */}
        <div
          className={`absolute inset-4 rounded-full border border-teal-400/30 border-dashed ${
            isDiving ? "animate-spin" : ""
          }`}
          style={{ animationDuration: "3s" }}
        />

        {/* Lock Telemetry Readout */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono tracking-[0.2em] uppercase px-2.5 py-0.5 bg-black/80 border border-teal-500/30 text-teal-300">
          {isLocked ? (
            <span className="text-teal-300 font-bold">TARGET LOCKED // {targetCoords}</span>
          ) : isDiving ? (
            <span className="text-amber-400 font-bold animate-pulse">
              DIVING // {targetSectorName}
            </span>
          ) : (
            <span className="text-neutral-400">VECTOR SCAN // {targetCoords}</span>
          )}
        </div>
      </div>
    </div>
  );
}
