"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  SiGithub,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiPrisma,
  SiPhp,
  SiMysql,
  SiLinux,
  SiCplusplus,
} from "react-icons/si";
import {
  FaArrowLeft,
  FaVideo,
  FaLock,
  FaSearch,
  FaExternalLinkAlt,
  FaMicrochip,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { TbBrandCSharp, TbBrandNextjs } from "react-icons/tb";

interface ProjectItem {
  id: string;
  title: string;
  category: "all" | "fullstack" | "systems" | "mainframe";
  categoryLabel: string;
  status: string;
  statusColor: string;
  themeColor: "teal" | "sky" | "emerald" | "purple" | "amber";
  desc: string;
  deepDetails?: {
    narrative: string;
    highlights: string[];
  };
  tech: string[];
  icon: React.ReactNode;
  github?: string;
  live?: string;
  videoUrl?: string;
  isProprietary?: boolean;
  videoNotice?: string;
  demoUrl?: string;
}

const PROJECT_FILES: ProjectItem[] = [
  {
    id: "P-01",
    title: "Bubbles Social Platform",
    category: "fullstack",
    categoryLabel: "Full-Stack // Next.js & React 19",
    status: "WORKING ALPHA",
    statusColor: "border-teal-500/40 bg-teal-950/70 text-teal-300",
    themeColor: "teal",
    desc: "A topic-oriented social platform engineered around intentional conversations rather than algorithmic feeds. Designed with a clean Frutiger Aero aesthetic. Features Spaces (single-field communities) and Clouds (multi-field communities with 100-member scaling transitions). Discussions feature stance labels (Open, Support, Challenge, Curious), creator-defined lifecycles (active, expiry, and archive windows), same-topic refresh across the Central Field, and local JSON archive exports.",
    deepDetails: {
      narrative:
        "Built to counter engagement-driven social loops with intentional friction and context-preserving community transitions. The browser is treated as an untrusted client: every request validates session identity, role bounds, posting eligibility, and audience rules before committing atomic database transactions with Prisma. Features an isolated HTTP integration test suite and an interactive showcase harness with fictional personas.",
      highlights: [
        "Central Field & Refresh: Same-topic refresh respecting audience bounds, blocks, and expiry rules",
        "Spaces & Clouds: Automatic 100-member community scaling preserving content and membership",
        "Stance-Oriented Discourse: Tagged as Open, Support, Challenge, or Curious for transparent discussion",
        "Discussion Lifecycles: Active participation -> Expiry -> Limited JSON archive export window",
        "Defensive Architecture: Server-enforced permissions, HMAC session auth, and atomic transactions",
        "Showcase & Testing: Isolated HTTP integration suites, read-only trial, and interactive reset harness",
      ],
    },
    tech: ["Next.js", "React 19", "TypeScript", "Prisma ORM", "SQLite", "Tailwind CSS"],
    icon: <SiReact size={22} className="text-teal-400" />,
    github: "https://github.com/Abrar-Quadri26710/BubblesShowcase",
    videoUrl: "https://youtu.be/p5OGBDskJ4k",
    isProprietary: true,
    demoUrl: "mailto:mirrowdin@gmail.com?subject=Inquiry%20regarding%20Bubbles%20Social%20Platform",
  },
  {
    id: "P-02",
    title: "MidOS Virtual Operating System",
    category: "systems",
    categoryLabel: "Systems // C# & .NET",
    status: "DEPLOYED",
    statusColor: "border-sky-500/40 bg-sky-950/70 text-sky-300",
    themeColor: "sky",
    desc: "A virtual operating system engineered from scratch in C# to explore system-level process scheduling and execution isolation. Implements cooperative and preemptive task switching, virtual memory management with two-level page tables and LRU page eviction, mutex and event synchronization, and dynamic heap allocation.",
    deepDetails: {
      narrative:
        "Directly connects operating system isolation principles to defensive software engineering. Translates kernel-level memory management and scheduling mechanics into a clean software execution model.",
      highlights: [
        "Scheduling: Preemptive (quantum timer) & cooperative round-robin with PCB state saving",
        "Virtual Memory: 2-level hierarchical page tables with LRU page eviction",
        "Synchronization: Custom thread-safe Mutex, Semaphore, and Event primitives",
        "Dynamic Heap: Memory boundary allocation tracking with dirty-bit validation",
      ],
    },
    tech: ["C#", ".NET", "Virtual Memory", "Process Scheduling", "LRU Eviction", "Concurrency"],
    icon: <TbBrandCSharp size={24} className="text-sky-400" />,
    github: "https://github.com/Abrar-Quadri26710/MidOS",
    live: "https://github.com/Abrar-Quadri26710/MidOS",
  },
  {
    id: "P-03",
    title: "Storefront E-Commerce Website",
    category: "fullstack",
    categoryLabel: "Persistence // PHP & MySQL",
    status: "DEPLOYED",
    statusColor: "border-emerald-500/40 bg-emerald-950/70 text-emerald-300",
    themeColor: "emerald",
    desc: "An e-commerce web platform engineered with native PHP and MySQL, designed to master backend state management, transactional integrity, and database normalization. Features a custom shopping cart, role-based access control (RBAC), an admin dashboard, and a normalized relational schema preventing data anomalies.",
    deepDetails: {
      narrative:
        "Engineered without third-party frameworks to develop an uncompromising command of native backend mechanics, session serialization, and relational schema normalization.",
      highlights: [
        "Relational Schema: Third Normal Form (3NF) eliminating insert/update/delete anomalies",
        "Role-Based Access Control: Granular separation between customers and administrators",
        "Session Cart Engine: Persistent server-side cart state and checkout flow",
        "Defensive Architecture: Parameterized SQL queries via PDO defending against injection",
      ],
    },
    tech: ["PHP", "MySQL", "SQL Normalization", "Session Security", "RBAC", "Apache"],
    icon: <SiMysql size={24} className="text-emerald-400" />,
    github: "https://github.com/Abrar-Quadri26710/StoreFrontWebsite",
    live: "https://github.com/Abrar-Quadri26710/StoreFrontWebsite",
  },
  {
    id: "P-04",
    title: "RV32I Virtual CPU Simulator",
    category: "systems",
    categoryLabel: "Architecture // C++ Emulation",
    status: "DEPLOYED",
    statusColor: "border-purple-500/40 bg-purple-950/70 text-purple-300",
    themeColor: "purple",
    desc: "A custom-engineered 32-bit RISC-V CPU simulator capable of decoding and executing raw binary machine instructions. Translates hardware-level execution cycles into functional, object-oriented software logic, including memory management, instruction parsing, and loader classes.",
    deepDetails: {
      narrative:
        "Models the canonical Fetch-Decode-Execute microarchitecture in modern object-oriented C++, translating compiler-generated binary dumps into cycle-accurate software simulation.",
      highlights: [
        "Execution Model: Deterministic Fetch-Decode-Execute microarchitectural pipeline",
        "Instruction Set: Full base RV32I ISA (R-type, I-type, S-type, B-type opcodes)",
        "Hardware Registers: 32 general-purpose 32-bit registers with $x0 hardwired to zero",
        "Binary Loader: Reads machine code hex dumps into byte-addressable memory hierarchy",
      ],
    },
    tech: ["C++", "RISC-V ISA", "Computer Architecture", "Binary Emulation", "Instruction Decoding"],
    icon: <SiCplusplus size={22} className="text-purple-400" />,
    github: "https://github.com/Abrar-Quadri26710/RV32I-CPU-Simulator",
    live: "https://github.com/Abrar-Quadri26710/RV32I-CPU-Simulator",
  },
  {
    id: "P-05",
    title: "Assembler Payroll System",
    category: "mainframe",
    categoryLabel: "Mainframe // IBM/370 Assembly",
    status: "DEPLOYED",
    statusColor: "border-amber-500/40 bg-amber-950/70 text-amber-300",
    themeColor: "amber",
    desc: "A payroll processing program written in IBM System/370 Assembly Language, assembled and executed on a mainframe system using the ASSIST assembler. Reads employee records, performs payroll calculations using packed decimal arithmetic, and formats multi-page enterprise reports.",
    deepDetails: {
      narrative:
        "Exercises explicit memory and register management at the bare-metal mainframe level, utilizing packed decimal instructions for binary-coded decimal financial computations with zero floating-point drift.",
      highlights: [
        "Packed Decimal Math: PACK, AP, SP, MP, DP, UNPK for exact financial calculations",
        "Sequential Parsing: Fixed-width punch card buffer parsing into dynamic in-memory tables",
        "Report Formatting: Multi-page reporting with page breaks and totals using EDMK",
        "Linkage Conventions: Strict IBM/370 register preservation and displacement addressing",
      ],
    },
    tech: ["IBM/370 Assembly", "Mainframe", "TN3270", "ASSIST", "Packed Decimal", "Linkage Conventions"],
    icon: <SiLinux size={22} className="text-amber-400" />,
    github: "https://github.com/Abrar-Quadri26710/AssemblerPayrollSupport",
    live: "https://github.com/Abrar-Quadri26710/AssemblerPayrollSupport",
  },
  {
    id: "P-06",
    title: "Abrar's Engineering Portfolio",
    category: "fullstack",
    categoryLabel: "Spatial Web // Next.js & React 19",
    status: "DEPLOYED",
    statusColor: "border-teal-500/40 bg-teal-950/70 text-teal-300",
    themeColor: "teal",
    desc: "Personal portfolio website built with Next.js 16 and Tailwind CSS. Features spatial flight navigation across a 4,400px vertical descent corridor, a 3-layer parallax cosmic starfield, and tactile glassmorphic component systems.",
    deepDetails: {
      narrative:
        "Moves beyond flat cookie-cutter portfolio layouts into a unified mecha cockpit experience where users traverse a 4,400px cosmic megastructure with 60fps GPU-accelerated transforms.",
      highlights: [
        "3D Camera Rig: Perspective 1200px rig with dynamic pitch, yaw, and roll banking",
        "Parallax Starfield: 3-tier HTML5 canvas starfield with dynamic warp streaking",
        "Glassmorphic Design: Frosted bevel highlights and crystalline hero typography",
        "Responsive Defense: 0° planar rotation fallbacks on mobile devices for sharp text",
      ],
    },
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "HTML5 Canvas", "Spatial CSS"],
    icon: <TbBrandNextjs size={24} className="text-teal-400" />,
    github: "https://github.com/Abrar-Quadri26710/AbrarPersonalWebsitePortfolio",
    live: "https://github.com/Abrar-Quadri26710/AbrarPersonalWebsitePortfolio",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Logs", count: 6 },
  { id: "fullstack", label: "Full-Stack & Web", count: 3 },
  { id: "systems", label: "Systems & Kernels", count: 2 },
  { id: "mainframe", label: "Mainframe & Assembly", count: 1 },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const filteredProjects = useMemo(() => {
    return PROJECT_FILES.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.tech.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-[#030605] text-neutral-200 font-sans selection:bg-teal-400 selection:text-neutral-950 relative overflow-x-hidden pb-20">
      {/* Ambient Cosmic Background Nebulae */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 right-10 w-[550px] h-[550px] bg-teal-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-[600px] left-10 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-20 right-20 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[160px]" />
        {/* Subtle Coordinate Grid Mesh */}
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#2dd4bf_1px,transparent_1px),linear-gradient(to_bottom,#2dd4bf_1px,transparent_1px)] [background-size:80px_80px]" />
      </div>

      {/* Unified Navigation Bar */}
      <Navbar />

      {/* Cockpit Visor HUD Corner Overlays */}
      <div className="fixed inset-0 pointer-events-none z-30">
        <div className="hidden sm:block absolute top-20 left-6 w-3.5 h-3.5 border-t-2 border-l-2 border-teal-400/50" />
        <div className="hidden sm:block absolute top-20 right-6 w-3.5 h-3.5 border-t-2 border-r-2 border-teal-400/50" />
        <div className="hidden sm:block absolute bottom-12 left-6 w-3.5 h-3.5 border-b-2 border-l-2 border-teal-400/50" />
        <div className="hidden sm:block absolute bottom-12 right-6 w-3.5 h-3.5 border-b-2 border-r-2 border-teal-400/50" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 pt-28 sm:pt-32 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Top Back-Link & Breadcrumb Rail */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-teal-400 hover:text-teal-300 transition-colors cursor-pointer group"
          >
            <FaArrowLeft size={10} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to Orbital Cockpit</span>
          </Link>
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-neutral-500">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span>PROJECT ARCHIVE // SECTOR 03 DOSSIERS</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-400/40 bg-teal-950/50 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-teal-300 font-medium">
              Tactical Build Logs // 0{PROJECT_FILES.length} Verified Entries
            </span>
          </div>

          <div className="relative py-0.5 overflow-hidden glass-sheen">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase leading-none font-sans glass-hero-text">
              Project History
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
            A uniform index of all software engineering projects across full-stack web architectures,
            virtual operating systems, computer hardware emulation, and mainframe assembly.
          </p>
        </div>

        {/* Command Filter & Search Bar */}
        <div className="glass-panel rounded-xl p-3 sm:p-3.5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all rounded-sm flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-teal-400 text-neutral-950 font-bold shadow-[0_0_14px_rgba(45,212,191,0.4)]"
                      : "bg-white/[0.03] border border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[9px] px-1 py-0.2 rounded ${
                      isActive ? "bg-neutral-950/20 text-neutral-950" : "bg-neutral-800 text-neutral-400"
                    }`}
                  >
                    0{cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="relative min-w-[220px] sm:min-w-[260px]">
            <FaSearch
              size={11}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search tech or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#020604]/80 border border-white/15 rounded-sm pl-8 pr-3 py-1.5 text-xs font-mono text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-teal-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-neutral-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* =================================================================== */}
        {/* UNIFORM PROJECT CARDS GRID (Lined Up in 2 or 3 Columns)            */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {filteredProjects.map((project) => {
            const isExpanded = expandedId === project.id;
            const isTeal = project.themeColor === "teal";
            const isSky = project.themeColor === "sky";
            const isEmerald = project.themeColor === "emerald";
            const isPurple = project.themeColor === "purple";
            const isAmber = project.themeColor === "amber";

            const hoverBorder = isTeal
              ? "hover:border-teal-400/60"
              : isSky
              ? "hover:border-sky-400/60"
              : isEmerald
              ? "hover:border-emerald-400/60"
              : isPurple
              ? "hover:border-purple-400/60"
              : "hover:border-amber-400/60";

            const accentSpine = isTeal
              ? "border-t-2 border-t-teal-400"
              : isSky
              ? "border-t-2 border-t-sky-400"
              : isEmerald
              ? "border-t-2 border-t-emerald-400"
              : isPurple
              ? "border-t-2 border-t-purple-400"
              : "border-t-2 border-t-amber-400";

            const titleHover = isTeal
              ? "group-hover:text-teal-300"
              : isSky
              ? "group-hover:text-sky-300"
              : isEmerald
              ? "group-hover:text-emerald-300"
              : isPurple
              ? "group-hover:text-purple-300"
              : "group-hover:text-amber-300";

            return (
              <div
                key={project.id}
                className={`group glass-panel rounded-xl overflow-hidden border border-white/10 ${accentSpine} ${hoverBorder} transition-all duration-300 flex flex-col justify-between relative shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.7)]`}
              >
                {/* Corner Micro-Brackets */}
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/20 group-hover:border-teal-400/60 transition-colors" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/20 group-hover:border-teal-400/60 transition-colors" />

                {/* Card Top & Body Section */}
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Card Header Track: Icon & Status */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-11 h-11 rounded border border-white/15 bg-white/[0.03] flex items-center justify-center shrink-0 group-hover:border-white/30 transition-colors">
                      {project.icon}
                    </div>

                    <div className="text-right space-y-1">
                      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block font-bold">
                        {project.id}
                      </span>
                      <span
                        className={`inline-block text-[8px] sm:text-[9px] font-mono uppercase px-2 py-0.5 rounded border font-bold tracking-wider ${project.statusColor}`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Title & Domain Tag */}
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                      {project.categoryLabel}
                    </span>
                    <h2
                      className={`text-lg sm:text-xl font-bold tracking-tight text-white ${titleHover} transition-colors leading-snug`}
                    >
                      {project.title}
                    </h2>
                  </div>

                  {/* Description Prose */}
                  <p
                    className={`text-xs text-neutral-300 leading-relaxed font-normal transition-all duration-300 ${
                      isExpanded ? "" : "line-clamp-4"
                    }`}
                  >
                    {project.desc}
                  </p>

                  {/* Bubbles Proprietary Flag */}
                  {project.isProprietary && (
                    <div className="py-1 px-2.5 bg-neutral-900/80 border border-teal-500/30 rounded text-[10px] font-mono text-teal-300 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <FaLock size={9} />
                        <span>Core Source Private // Architecture Public</span>
                      </div>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline text-[9px] text-teal-200 inline-flex items-center gap-1"
                        >
                          <span>Showcase Docs</span>
                          <FaExternalLinkAlt size={7} />
                        </a>
                      )}
                    </div>
                  )}

                  {/* Expand / Collapse In-Depth Architectural Details */}
                  {project.deepDetails && (
                    <div className="pt-1">
                      <button
                        onClick={() => toggleExpand(project.id)}
                        className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-teal-400 hover:text-teal-300 transition-colors cursor-pointer font-bold"
                      >
                        {isExpanded ? (
                          <>
                            <span>[-] Collapse Details</span>
                            <FaChevronUp size={8} />
                          </>
                        ) : (
                          <>
                            <span>[+] Read Architecture Notes</span>
                            <FaChevronDown size={8} />
                          </>
                        )}
                      </button>

                      {isExpanded && (
                        <div className="mt-3 p-3 bg-black/50 border border-white/10 rounded-sm space-y-2.5 text-xs text-neutral-300 animate-fadeIn">
                          <p className="text-[11px] leading-relaxed text-neutral-300 italic border-l-2 border-teal-400/50 pl-2">
                            {project.deepDetails.narrative}
                          </p>

                          <div className="space-y-1 pt-1">
                            <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block">
                              Key Invariants:
                            </span>
                            <ul className="space-y-1 text-[11px] text-neutral-400 list-disc list-inside">
                              {project.deepDetails.highlights.map((hl, i) => (
                                <li key={i} className="leading-normal">
                                  {hl}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Footer: Tech Badges & Actions */}
                <div className="p-5 sm:p-6 pt-0 space-y-3">
                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-[9px] font-mono uppercase px-2 py-0.5 bg-white/[0.04] border border-white/10 text-neutral-300 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Bar */}
                  <div className="pt-2 flex items-center justify-between gap-2">
                    {project.videoUrl ? (
                      <div className="flex flex-wrap items-center justify-between w-full gap-2">
                        <a
                          href={project.videoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-950/60 border border-red-500/40 text-red-200 hover:text-white hover:bg-red-900/60 font-mono text-[10px] uppercase tracking-wider transition-colors rounded-sm"
                        >
                          <FaVideo size={10} className="text-red-400 shrink-0" />
                          <span>Video Demo</span>
                          <FaExternalLinkAlt size={7} />
                        </a>
                        <div className="flex items-center gap-1.5">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-teal-500/40 bg-teal-950/60 text-teal-200 hover:text-white hover:border-teal-400 font-mono text-[10px] uppercase tracking-wider transition-colors rounded-sm"
                            >
                              <SiGithub size={11} />
                              <span>Showcase</span>
                              <FaExternalLinkAlt size={7} />
                            </a>
                          )}
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-teal-400 text-neutral-950 font-bold font-mono text-[10px] uppercase tracking-wider hover:bg-teal-300 transition-colors rounded-sm shrink-0 shadow-[0_0_10px_rgba(45,212,191,0.3)]"
                              title="Request private interactive demo access"
                            >
                              <span>Demo</span>
                              <FaExternalLinkAlt size={7} />
                            </a>
                          )}
                        </div>
                      </div>
                    ) : project.isProprietary ? (
                      <div className="flex items-center justify-between w-full gap-2">
                        <span className="text-[10px] font-mono text-teal-300 flex items-center gap-1.5 truncate">
                          <FaVideo size={10} className="shrink-0" />
                          <span className="truncate">Walkthrough Soon</span>
                        </span>
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-400 text-neutral-950 font-bold font-mono text-[10px] uppercase tracking-wider hover:bg-teal-300 transition-colors rounded-sm shrink-0 shadow-[0_0_10px_rgba(45,212,191,0.3)]"
                          >
                            <span>Demo</span>
                            <FaExternalLinkAlt size={8} />
                          </a>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[9px] font-mono text-neutral-500 uppercase">
                          Open Source
                        </span>
                        <div className="flex items-center gap-2">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1 border border-white/20 bg-white/[0.04] text-neutral-200 hover:text-white hover:border-white/40 font-mono text-[10px] uppercase tracking-wider transition-colors rounded-sm"
                            >
                              <SiGithub size={11} />
                              <span>GitHub</span>
                              <FaExternalLinkAlt size={7} />
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State when no search matches */}
        {filteredProjects.length === 0 && (
          <div className="glass-panel rounded-xl p-10 text-center space-y-3">
            <div className="text-neutral-500 font-mono text-xs uppercase tracking-widest">
              No project cards found matching &quot;{searchQuery}&quot;
            </div>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="px-4 py-2 bg-teal-400 text-neutral-950 font-bold font-mono text-xs uppercase tracking-wider rounded-sm cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-500">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 uppercase tracking-wider transition-colors"
          >
            <FaArrowLeft size={10} />
            <span>Return to Sector 01 (Pilot Nexus)</span>
          </Link>
          <div>Abrar Quadri // Software Engineering Portfolio</div>
        </div>

      </div>
    </main>
  );
}
