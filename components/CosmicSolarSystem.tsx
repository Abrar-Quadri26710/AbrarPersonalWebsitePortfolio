"use client";

interface CosmicSolarSystemProps {
  activeSectorIndex: number;
  isMobile?: boolean;
}

export default function CosmicSolarSystem({
  activeSectorIndex,
  isMobile = false,
}: CosmicSolarSystemProps) {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-visible">
      {/* ===================================================================== */}
      {/* 1. DEEP SPACE NEBULAR GAS CLOUDS (Atmospheric Cosmic Ambiance)       */}
      {/* ===================================================================== */}
      {/* Sector 01: Cyan/Teal Coronal Emission Nebula */}
      <div
        className="absolute w-[900px] h-[900px] rounded-full blur-[120px] pointer-events-none opacity-30"
        style={{
          left: "1400px",
          top: "150px",
          background: "radial-gradient(circle, rgba(45,212,191,0.25) 0%, rgba(56,189,248,0.15) 45%, transparent 70%)",
        }}
      />

      {/* Sector 02: Emerald Stratum Gas Cloud */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full blur-[110px] pointer-events-none opacity-25"
        style={{
          left: "350px",
          top: "1050px",
          background: "radial-gradient(circle, rgba(74,222,128,0.2) 0%, rgba(16,185,129,0.1) 50%, transparent 70%)",
        }}
      />

      {/* Sector 03: Deep Space Azure Nebular Drift */}
      <div
        className="absolute w-[850px] h-[850px] rounded-full blur-[130px] pointer-events-none opacity-30"
        style={{
          left: "500px",
          top: "2050px",
          background: "radial-gradient(circle, rgba(56,189,248,0.22) 0%, rgba(30,58,138,0.18) 55%, transparent 75%)",
        }}
      />

      {/* Sector 04: Violet Cosmic Rift & Stellar Nursery */}
      <div
        className="absolute w-[950px] h-[950px] rounded-full blur-[140px] pointer-events-none opacity-30"
        style={{
          left: "1350px",
          top: "2750px",
          background: "radial-gradient(circle, rgba(192,132,252,0.24) 0%, rgba(147,51,234,0.15) 50%, transparent 70%)",
        }}
      />

      {/* Sector 05: Warm Planetary Ionosphere Dawn */}
      <div
        className="absolute w-[1200px] h-[700px] rounded-full blur-[140px] pointer-events-none opacity-35"
        style={{
          left: "600px",
          top: "3750px",
          background: "radial-gradient(ellipse, rgba(45,212,191,0.3) 0%, rgba(14,165,233,0.18) 50%, transparent 75%)",
        }}
      />

      {/* ===================================================================== */}
      {/* 2. CELESTIAL BODIES OF THE SOLAR SYSTEM                              */}
      {/* ===================================================================== */}

      {/* ------------------------------------------------------------------- */}
      {/* CELESTIAL 01: STAR "HELIOS-IV" // SECTOR 01 (X: 1820, Y: 420)       */}
      {/* ------------------------------------------------------------------- */}
      <div
        className="absolute flex flex-col items-center pointer-events-none transition-all duration-700"
        style={{
          left: "1820px",
          top: "420px",
          transform: "translate(-50%, -50%)",
          opacity: activeSectorIndex === 0 ? 0.95 : 0.45,
        }}
      >
        {/* Stellar Sun / Gas Giant Core */}
        <div className="relative w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center">
          {/* Coronal Glow Halo */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-400/20 via-cyan-300/30 to-amber-300/10 blur-xl animate-pulse" />
          
          {/* Gravitational Wavefront Rings */}
          <div className="absolute -inset-8 rounded-full border border-teal-400/20 animate-[spin_24s_linear_infinite]" />
          <div className="absolute -inset-16 rounded-full border border-cyan-400/10 border-dashed animate-[spin_36s_linear_infinite_reverse]" />

          {/* Star Sphere */}
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-white via-cyan-100 to-teal-900 shadow-[inset_0_0_40px_rgba(45,212,191,0.8),0_0_60px_rgba(56,189,248,0.5)] relative overflow-hidden">
            {/* Solar Flare Corona Strands */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(255,255,255,0.9),transparent_60%)]" />
          </div>
        </div>

        {/* Astronomical Telemetry Tag */}
        <div className="mt-2 text-center font-mono">
          <div className="text-[9px] tracking-[0.22em] text-teal-300 uppercase font-bold">
            STELLAR BODY // HELIOS-IV
          </div>
          <div className="text-[8px] text-neutral-500 tracking-wider">
            ORBIT 32,000M // SPECTRAL CLASS: F2V
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* CELESTIAL 02: ICY MOON "KALLISTO-9" // SECTOR 02 (X: 520, Y: 1250)   */}
      {/* ------------------------------------------------------------------- */}
      <div
        className="absolute flex flex-col items-center pointer-events-none transition-all duration-700"
        style={{
          left: "520px",
          top: "1250px",
          transform: "translate(-50%, -50%)",
          opacity: activeSectorIndex === 1 ? 0.95 : 0.45,
        }}
      >
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
          {/* Orbital Satellite Tracking Ring */}
          <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-green-500/20 border-dashed animate-[spin_20s_linear_infinite]" />

          {/* Satellite Beacon Node */}
          <div
            className="absolute w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]"
            style={{
              top: "6px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />

          {/* Icy Moon Body with Crescent Shadow */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-emerald-100 via-teal-900 to-[#020906] relative shadow-[inset_-16px_-16px_28px_rgba(0,0,0,0.95),0_0_30px_rgba(74,222,128,0.3)] overflow-hidden">
            {/* Crater Pattern Lines */}
            <div className="absolute top-4 left-6 w-5 h-5 rounded-full border border-green-400/20 opacity-60" />
            <div className="absolute bottom-6 right-8 w-8 h-8 rounded-full border border-green-400/20 opacity-40" />
            <div className="absolute top-12 right-6 w-3 h-3 rounded-full border border-green-400/20 opacity-50" />
          </div>
        </div>

        {/* Moon Telemetry */}
        <div className="mt-1 text-center font-mono">
          <div className="text-[9px] tracking-[0.2em] text-green-300 uppercase font-bold flex items-center gap-1.5 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span>EXOMOON // KALLISTO-9</span>
          </div>
          <div className="text-[8px] text-neutral-500 tracking-wider">
            COMM RELAY ACTIVE // STRATUM 24,000M
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* CELESTIAL 03: RINGED PLANET & ASTEROID BELT // SECTOR 03 (X: 620, Y: 2280) */}
      {/* ------------------------------------------------------------------- */}
      <div
        className="absolute flex flex-col items-center pointer-events-none transition-all duration-700"
        style={{
          left: "620px",
          top: "2280px",
          transform: "translate(-50%, -50%)",
          opacity: activeSectorIndex === 2 ? 0.95 : 0.45,
        }}
      >
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
          {/* Angled Translucent Planetary Rings */}
          <div
            className="absolute w-[280px] sm:w-[350px] h-[90px] sm:h-[110px] rounded-[50%] border-2 border-sky-400/40 shadow-[0_0_20px_rgba(56,189,248,0.35)] pointer-events-none"
            style={{
              transform: "rotate(-24deg)",
              boxShadow: "inset 0 0 16px rgba(56,189,248,0.3), 0 0 20px rgba(56,189,248,0.3)",
            }}
          >
            {/* Inner Ring Gap (Cassini Division Style) */}
            <div className="absolute inset-2 rounded-[50%] border border-sky-400/20 border-dashed" />
          </div>

          {/* Gas Giant Body */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-sky-200 via-blue-900 to-[#020b14] relative shadow-[inset_-18px_-18px_32px_rgba(0,0,0,0.95),0_0_40px_rgba(56,189,248,0.4)] overflow-hidden">
            {/* Atmospheric Cloud Bands */}
            <div className="absolute top-6 left-0 right-0 h-2 bg-sky-300/20 blur-[1px]" />
            <div className="absolute top-12 left-0 right-0 h-4 bg-sky-400/15 blur-[1px]" />
            <div className="absolute bottom-8 left-0 right-0 h-3 bg-cyan-300/20 blur-[1px]" />
          </div>

          {/* Floating Asteroid Belt Fragments */}
          {[
            { x: -110, y: -45, size: 4 },
            { x: -80, y: -70, size: 6 },
            { x: 95, y: 55, size: 5 },
            { x: 125, y: 35, size: 3 },
            { x: -135, y: 30, size: 5 },
            { x: 110, y: -50, size: 4 },
          ].map((ast, i) => (
            <div
              key={i}
              className="absolute bg-neutral-300 shadow-[0_0_6px_#38bdf8] rotate-45"
              style={{
                left: `calc(50% + ${ast.x}px)`,
                top: `calc(50% + ${ast.y}px)`,
                width: `${ast.size}px`,
                height: `${ast.size}px`,
              }}
            />
          ))}
        </div>

        {/* Ringed Giant Telemetry */}
        <div className="mt-2 text-center font-mono">
          <div className="text-[9px] tracking-[0.2em] text-sky-300 uppercase font-bold">
            RINGED GIANT // AETHELGARD MAJOR
          </div>
          <div className="text-[8px] text-neutral-500 tracking-wider">
            MESOSPHERE 16,000M // EQUATORIAL RING TRANSIT
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* CELESTIAL 04: COSMIC PULSAR & MAGNETIC JETS // SECTOR 04 (X: 1860, Y: 3050) */}
      {/* ------------------------------------------------------------------- */}
      <div
        className="absolute flex flex-col items-center pointer-events-none transition-all duration-700"
        style={{
          left: "1860px",
          top: "3050px",
          transform: "translate(-50%, -50%)",
          opacity: activeSectorIndex === 3 ? 0.95 : 0.45,
        }}
      >
        <div className="relative w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center">
          {/* Relativistic Jet Beams (Diagonal High-Energy Plasma Jets) */}
          <div
            className="absolute w-1 h-72 sm:h-80 bg-gradient-to-t from-transparent via-purple-400 to-transparent shadow-[0_0_16px_#c084fc]"
            style={{ transform: "rotate(38deg)" }}
          />

          {/* Rotating Magnetar Accretion Waves */}
          <div className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-purple-400/30 border-dashed animate-[spin_8s_linear_infinite]" />
          <div className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-fuchsia-400/25 animate-[spin_12s_linear_infinite_reverse]" />

          {/* Pulsar Core */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white shadow-[0_0_36px_#c084fc,0_0_80px_#9333ea] relative flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-purple-300 animate-ping" />
          </div>
        </div>

        {/* Pulsar Telemetry */}
        <div className="mt-1 text-center font-mono">
          <div className="text-[9px] tracking-[0.2em] text-purple-300 uppercase font-bold flex items-center gap-1.5 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
            <span>PULSAR PSR-0800 // MAGNETAR</span>
          </div>
          <div className="text-[8px] text-neutral-500 tracking-wider">
            TROPOSPHERE 08,000M // 1.2S ROTATION PERIOD
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* CELESTIAL 05: TARGET PLANET HORIZON ARC // SECTOR 05 (Y: 4200 - 4400) */}
      {/* ------------------------------------------------------------------- */}
      <div
        className="absolute left-1/2 pointer-events-none transition-all duration-700 flex flex-col items-center"
        style={{
          top: "4050px",
          transform: "translateX(-50%)",
          opacity: activeSectorIndex === 4 ? 0.95 : 0.5,
        }}
      >
        {/* Curving Giant Planetary Surface Horizon Arc */}
        <div className="relative w-[1800px] sm:w-[2200px] h-[400px] overflow-hidden flex justify-center">
          {/* Luminous Atmospheric Limb Arc */}
          <div
            className="w-[2400px] h-[1200px] rounded-[50%] border-t-4 border-teal-300 shadow-[0_-24px_80px_rgba(45,212,191,0.6),inset_0_24px_80px_rgba(14,165,233,0.3)] bg-gradient-to-b from-[#021814] via-[#020d0b] to-[#010504] relative"
            style={{
              marginTop: "40px",
            }}
          >
            {/* Planetary Latitude Grid Lines */}
            <div className="absolute inset-x-0 top-14 h-px border-t border-teal-500/25 border-dashed" />
            <div className="absolute inset-x-0 top-32 h-px border-t border-teal-500/20" />
            <div className="absolute inset-x-0 top-56 h-px border-t border-teal-500/15 border-dashed" />

            {/* Approach Runway / Touchdown Vector Lights */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-6">
              {[-6, -4, -2, 0, 2, 4, 6].map((offset) => (
                <div
                  key={offset}
                  className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_#2dd4bf] animate-pulse"
                  style={{ animationDelay: `${Math.abs(offset) * 150}ms` }}
                />
              ))}
            </div>

            {/* Surface Touchdown Geographic Telemetry */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center font-mono">
              <div className="text-[10px] tracking-[0.25em] text-teal-300 uppercase font-bold">
                PLANETARY SURFACE CONTACT // ELEVATION 000M
              </div>
              <div className="text-[8px] text-teal-400/70 tracking-widest mt-0.5">
                LANDING MATRIX // COORD 00.00°N 00.00°E // ABRAR QUADRI NEXUS
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 3. ASTRONOMICAL ORBITAL FLIGHT VECTORS & WAYPOINT METRICS IN SVG     */}
      {/* ===================================================================== */}
      <svg
        viewBox="0 0 2400 4400"
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Orbital Trajectory Arc 1: From Helios towards Kallisto */}
        <path
          d="M 1820 420 C 1700 800, 900 950, 520 1250"
          stroke="#2dd4bf"
          strokeWidth="1"
          strokeDasharray="6 14"
          opacity="0.5"
        />

        {/* Orbital Trajectory Arc 2: From Kallisto towards Aethelgard Major */}
        <path
          d="M 520 1250 C 400 1600, 480 1900, 620 2280"
          stroke="#4ade80"
          strokeWidth="1"
          strokeDasharray="6 14"
          opacity="0.5"
        />

        {/* Orbital Trajectory Arc 3: From Aethelgard Major towards Pulsar */}
        <path
          d="M 620 2280 C 800 2600, 1500 2700, 1860 3050"
          stroke="#38bdf8"
          strokeWidth="1"
          strokeDasharray="6 14"
          opacity="0.5"
        />

        {/* Orbital Trajectory Arc 4: From Pulsar down to Surface Touchdown */}
        <path
          d="M 1860 3050 C 1900 3500, 1500 3800, 1200 4050"
          stroke="#c084fc"
          strokeWidth="1"
          strokeDasharray="6 14"
          opacity="0.5"
        />

        {/* Solar System Cardinal Flight Waypoints */}
        <g opacity="0.6" fontFamily="monospace" fontSize="10" fill="#94a3b8">
          <text x="1220" y="900" letterSpacing="3">WAYPOINT ALPHA // VELOCITY V1: 640 KT</text>
          <text x="1220" y="1780" letterSpacing="3">WAYPOINT BETA // ORBITAL DECELERATION</text>
          <text x="1220" y="2650" letterSpacing="3">WAYPOINT GAMMA // IONOSPHERE PENETRATION</text>
          <text x="1220" y="3500" letterSpacing="3">WAYPOINT DELTA // TERMINAL GUIDANCE 000M</text>
        </g>
      </svg>
    </div>
  );
}
