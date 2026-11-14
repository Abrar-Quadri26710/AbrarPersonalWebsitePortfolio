"use client";

interface GiantTacticalCanvasProps {
  activeScene: number;
}

// 5 Specific Camera Anchors on the Giant Map
const CAMERA_SECTORS = [
  { x: 0, y: 0, scale: 1.0, sector: "SECTOR-01 // PILOT NEXUS" },
  { x: 26, y: 20, scale: 1.45, sector: "SECTOR-02 // NEURAL LOGIC CORE" },
  { x: -24, y: 16, scale: 1.6, sector: "SECTOR-03 // SIMULATION HARDWARE" },
  { x: -20, y: -22, scale: 1.4, sector: "SECTOR-04 // RUNTIME COMPONENT BAY" },
  { x: 14, y: -28, scale: 1.25, sector: "SECTOR-05 // PLANETARY COMM-LINK" },
];

export default function GiantTacticalCanvas({ activeScene }: GiantTacticalCanvasProps) {
  const target = CAMERA_SECTORS[activeScene] || CAMERA_SECTORS[0];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-[#060807]">
      {/* THE GIANT OVERSIZED CANVAS (300vw x 300vh) */}
      <div
        className="absolute w-[280vw] h-[280vh] top-1/2 left-1/2 -mt-[140vh] -ml-[140vw] transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: `translate3d(${target.x}vw, ${target.y}vh, 0) scale(${target.scale})`,
          transformOrigin: "center center",
        }}
      >
        {/* SVG Tactical Blueprint Vectors */}
        <svg
          viewBox="-2000 -2000 4000 4000"
          className="w-full h-full opacity-35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Global Orbital Circles & Latitude Grids */}
          <circle cx="0" cy="0" r="1800" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="8 8" opacity="0.3" />
          <circle cx="0" cy="0" r="1400" stroke="#2dd4bf" strokeWidth="1" opacity="0.4" />
          <circle cx="0" cy="0" r="900" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="16 8" opacity="0.5" />
          <circle cx="0" cy="0" r="450" stroke="#2dd4bf" strokeWidth="1" opacity="0.6" />

          {/* Crosshairs & Axis Rays */}
          <line x1="-2000" y1="0" x2="2000" y2="0" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="4 12" opacity="0.4" />
          <line x1="0" y1="-2000" x2="0" y2="2000" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="4 12" opacity="0.4" />
          <line x1="-1500" y1="-1500" x2="1500" y2="1500" stroke="#2dd4bf" strokeWidth="0.75" strokeDasharray="4 20" opacity="0.25" />
          <line x1="-1500" y1="1500" x2="1500" y2="-1500" stroke="#2dd4bf" strokeWidth="0.75" strokeDasharray="4 20" opacity="0.25" />

          {/* ================================================================= */}
          {/* SECTOR 1: CENTER // PILOT NEXUS (Scene 0)                         */}
          {/* ================================================================= */}
          <g transform="translate(0, 0)">
            <circle cx="0" cy="0" r="160" stroke="#2dd4bf" strokeWidth="2" opacity="0.7" />
            <circle cx="0" cy="0" r="220" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="6 6" opacity="0.4" />
            <polygon points="0,-180 156,90 -156,90" stroke="#2dd4bf" strokeWidth="1" opacity="0.4" />
            <text x="0" y="-240" fill="#2dd4bf" fontSize="22" fontFamily="monospace" textAnchor="middle" letterSpacing="6">
              [SECTOR 01: PILOT NEXUS // AR-267]
            </text>
            <text x="0" y="250" fill="#94a3b8" fontSize="16" fontFamily="monospace" textAnchor="middle" letterSpacing="4">
              COORDINATES: 00.00°N 00.00°E // ORBIT 42,000M
            </text>
          </g>

          {/* ================================================================= */}
          {/* SECTOR 2: UPPER-LEFT // NEURAL LOGIC CORE (Scene 1 Philosophy)   */}
          {/* ================================================================= */}
          <g transform="translate(-750, -550)">
            {/* Logic Node Matrix */}
            <rect x="-240" y="-180" width="480" height="360" stroke="#4ade80" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.7" />
            <circle cx="-160" cy="-100" r="30" stroke="#4ade80" strokeWidth="2" opacity="0.8" />
            <circle cx="160" cy="-100" r="30" stroke="#4ade80" strokeWidth="2" opacity="0.8" />
            <circle cx="0" cy="80" r="45" stroke="#4ade80" strokeWidth="2" opacity="0.9" />
            
            {/* Bus Lines connecting to central node */}
            <path d="M -130 -100 L -45 50" stroke="#4ade80" strokeWidth="1.5" opacity="0.6" />
            <path d="M 130 -100 L 45 50" stroke="#4ade80" strokeWidth="1.5" opacity="0.6" />
            <line x1="-240" y1="0" x2="240" y2="0" stroke="#4ade80" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />

            <text x="0" y="-210" fill="#4ade80" fontSize="22" fontFamily="monospace" textAnchor="middle" letterSpacing="6">
              [SECTOR 02: NEURAL SILICON LOGIC]
            </text>
            <text x="0" y="215" fill="#94a3b8" fontSize="15" fontFamily="monospace" textAnchor="middle" letterSpacing="4">
              ARCH: FIRST PRINCIPLES // ZERO-MAGIC PIPELINE
            </text>
          </g>

          {/* ================================================================= */}
          {/* SECTOR 3: LOWER-LEFT // HARDWARE EMULATION SUITE (Scene 2 Systems)*/}
          {/* ================================================================= */}
          <g transform="translate(680, -450)">
            {/* CPU Socket & Register Bank Schematic */}
            <rect x="-260" y="-200" width="520" height="400" stroke="#38bdf8" strokeWidth="2" opacity="0.8" />
            <rect x="-220" y="-160" width="440" height="320" stroke="#38bdf8" strokeWidth="1" strokeDasharray="10 6" opacity="0.5" />
            
            {/* 32-Register File Array */}
            {[-120, -40, 40, 120].map((x, i) => (
              <line key={i} x1={x} y1="-120" x2={x} y2="120" stroke="#38bdf8" strokeWidth="1.5" opacity="0.4" />
            ))}
            {[-80, 0, 80].map((y, i) => (
              <line key={i} x1="-180" y1={y} x2="180" y2={y} stroke="#38bdf8" strokeWidth="1.5" opacity="0.4" />
            ))}

            <circle cx="0" cy="0" r="50" stroke="#f59e0b" strokeWidth="2" opacity="0.8" />

            <text x="0" y="-230" fill="#38bdf8" fontSize="22" fontFamily="monospace" textAnchor="middle" letterSpacing="6">
              [SECTOR 03: SIMULATION KERNEL // RV32I + MIDOS]
            </text>
            <text x="0" y="235" fill="#f59e0b" fontSize="15" fontFamily="monospace" textAnchor="middle" letterSpacing="4">
              TARGET LOCK: FDE LOOP // 2-LEVEL PAGE TABLES
            </text>
          </g>

          {/* ================================================================= */}
          {/* SECTOR 4: UPPER-RIGHT // RUNTIME REACTOR ARRAY (Scene 3 Arsenal)   */}
          {/* ================================================================= */}
          <g transform="translate(580, 650)">
            {/* Reactor Chamber Geometry */}
            <polygon points="0,-180 156,-90 156,90 0,180 -156,90 -156,-90" stroke="#c084fc" strokeWidth="2" opacity="0.75" />
            <circle cx="0" cy="0" r="90" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.6" />
            
            {/* Energy Conduits */}
            <line x1="-300" y1="0" x2="300" y2="0" stroke="#c084fc" strokeWidth="1.5" opacity="0.5" />
            <line x1="0" y1="-300" x2="0" y2="300" stroke="#c084fc" strokeWidth="1.5" opacity="0.5" />

            <text x="0" y="-220" fill="#c084fc" fontSize="22" fontFamily="monospace" textAnchor="middle" letterSpacing="6">
              [SECTOR 04: RUNTIME MATRIX ARRAY]
            </text>
            <text x="0" y="225" fill="#94a3b8" fontSize="15" fontFamily="monospace" textAnchor="middle" letterSpacing="4">
              DIAGNOSTICS: COMPILERS, RUNTIMES, POSIX
            </text>
          </g>

          {/* ================================================================= */}
          {/* SECTOR 5: LOWER-RIGHT // SURFACE COMMS DISH (Scene 4 Contact)    */}
          {/* ================================================================= */}
          <g transform="translate(-400, 800)">
            {/* Radar Wave Arcs radiating outward */}
            <path d="M -180 80 A 200 200 0 0 1 180 80" stroke="#2dd4bf" strokeWidth="2" opacity="0.8" />
            <path d="M -240 120 A 280 280 0 0 1 240 120" stroke="#2dd4bf" strokeWidth="1.5" strokeDasharray="8 8" opacity="0.5" />
            <path d="M -300 160 A 360 360 0 0 1 300 160" stroke="#2dd4bf" strokeWidth="1" opacity="0.3" />
            
            {/* Dish Axis */}
            <line x1="0" y1="0" x2="0" y2="180" stroke="#2dd4bf" strokeWidth="2" opacity="0.7" />
            <circle cx="0" cy="0" r="16" fill="#2dd4bf" opacity="0.9" />

            <text x="0" y="-50" fill="#2dd4bf" fontSize="22" fontFamily="monospace" textAnchor="middle" letterSpacing="6">
              [SECTOR 05: PLANETARY COMM-LINK]
            </text>
            <text x="0" y="210" fill="#94a3b8" fontSize="15" fontFamily="monospace" textAnchor="middle" letterSpacing="4">
              STATUS: SECURE EXTRACTION // TOUCHDOWN 000M
            </text>
          </g>
        </svg>

        {/* Ambient Grid Overlay */}
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(to_right,#2dd4bf_1px,transparent_1px),linear-gradient(to_bottom,#2dd4bf_1px,transparent_1px)] [background-size:120px_120px]" />
      </div>

      {/* Subtle Vignette to keep content area perfectly readable */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#060807]/60 to-[#060807]/90 pointer-events-none" />
    </div>
  );
}
