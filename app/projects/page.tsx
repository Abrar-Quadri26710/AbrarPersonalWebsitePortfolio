"use client";

import { useState } from 'react';
import { SiLinux, SiGithub, SiReact, SiTailwindcss, SiCplusplus, SiSqlite } from 'react-icons/si';
import { FaEnvelope, FaLinkedin, FaExternalLinkAlt, FaFolderOpen, FaCoffee, FaBars, FaTimes, FaChessRook } from 'react-icons/fa';
import { TbBrandCSharp, TbBrandNextjs } from 'react-icons/tb';

// ============================================================================
// 🚀 TACTICAL PROJECT DATABANK 🚀
// ============================================================================
const projectFiles = [
  {
    id: "P-01",
    title: "RV32I Virtual CPU",
    status: "DEPLOYED",
    statusColor: "text-[#A3F9B9]", // Gold for in progress
    desc: "A custom-engineered Virtual CPU built from the ground up. Translates complex hardware-level execution cycles into functional, object-oriented software logic, including memory management, instruction parsing, and loader classes. This project bridges the gap between raw hardware architecture and high-level software engineering.",
    tech: ["C++", "System Architecture", "Emulation"],
    icon: <TbBrandCSharp size={24} className="text-[#A3F9B9]" />,
    github: "https://github.com/Abrar-Quadri26710/RV32I-CPU-Simulator",
    live: "https://github.com/Abrar-Quadri26710/RV32I-CPU-Simulator"
  },
  {
    id: "P-02",
    title: "MID OS",
    status: "PROTOTYPING",
    statusColor: "text-[#F5D15F]", 
    desc: "MidOS is a virtual operating system, written in C#. The project simulates core OS concepts — process scheduling, virtual memory, memory management, and inter-process synchronization. It all running on an abstract CPU with a custom instruction set. I'm currently still working on it, advice is welcome.",
    tech: ["Computer Architecture", "Memory Management", "C#"],
    icon: <FaFolderOpen size={24} className="text-[#F5D15F]" />,
    github: "https://github.com/Abrar-Quadri26710/MidOS",
    live: "https://github.com/Abrar-Quadri26710/MidOS"
  },
  {
    id: "P-03",
    title: "Abrar's Portfolio Website",
    status: "DEPLOYED",
    statusColor: "text-[#A3F9B9]", // Green for complete
    desc: "My personal portfolio website built with Next.js and Tailwind CSS. Created also to showcase my skillset in modern Frontend Development. Features responsive layouts, interactive elements, while maintaining a clean and accessible design.",
    tech: ["React", "Next.js", "Tailwind CSS"],
    icon: <SiReact size={24} className="text-[#A3F9B9]" />,
    github: "#",
    live: "#"
  },
  {
    id: "P-04",
    title: "Assembler Payroll System",
    status: "DEPLOYED",
    statusColor: "text-[#A3F9B9]",
    desc: "A payroll processing program written in IBM/370 Assembly Language, assembled and executed on a mainframe system using the ASSIST assembler. The program reads employee records, stores them in a structured in-memory table, performs payroll calculations using packed decimal arithmetic, and generates a formatted multi-page payroll report.",
    tech: ["Assembler", "IBM Mainframe", "TN3270 Terminal"],
    icon: <SiLinux size={24} className="text-[#A3F9B9]" />, 
    github: "https://github.com/Abrar-Quadri26710/AssemblerPayrollSupport",
    live: "https://github.com/Abrar-Quadri26710/AssemblerPayrollSupport"
  },
    {
    id: "P-05",
    title: "Storefront E-commerce Website",
    status: "DEPLOYED",
    statusColor: "text-[#A3F9B9]",
    desc: "An e-commerce website for a fictional retail store, built with PHP and MySQL. The project serves to reinforce my Backend Development skills, featuring a custom-built shopping cart, user authentication system, and an admin dashboard for managing products and orders. The database is designed with efficient normalization to make sure integrity is maintained",
    tech: ["PHP", "SQL", "Database Design"],
    icon: <SiSqlite size={24} className="text-[#A3F9B9]" />,
    github: "https://github.com/Abrar-Quadri26710/StoreFrontWebsite",
    live: "https://github.com/Abrar-Quadri26710/StoreFrontWebsite"
  },
];

export default function Projects() {
  // Memory state to track which project card is currently expanded
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  // Mobile Nav State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCardClick = (id: string) => {
    // If clicking the already expanded card, close it. Otherwise, open the new one.
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-[#89dbca] selection:text-[#0a0a0a] relative pb-20">
      
      {/* --- SHADERS & ANIMATIONS --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scanline-scroll {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes tv-blink {
          0% { transform: scaleX(0) scaleY(0.005); opacity: 0; filter: brightness(10); }
          30% { transform: scaleX(1) scaleY(0.005); opacity: 1; filter: brightness(5); }
          50% { transform: scaleX(1) scaleY(0.005); opacity: 1; filter: brightness(5); }
          100% { transform: scaleX(1) scaleY(1); opacity: 1; filter: brightness(1); }
        }
        .animate-tv-blink {
          animation: tv-blink 0.5s cubic-bezier(0.8, 0, 0.2, 1) forwards;
        }
        .hex-grid-bg {
          background-image: 
            linear-gradient(30deg, #111 12%, transparent 12.5%, transparent 87%, #111 87.5%, #111),
            linear-gradient(150deg, #111 12%, transparent 12.5%, transparent 87%, #111 87.5%, #111),
            linear-gradient(30deg, #111 12%, transparent 12.5%, transparent 87%, #111 87.5%, #111),
            linear-gradient(150deg, #111 12%, transparent 12.5%, transparent 87%, #111 87.5%, #111),
            radial-gradient(circle at center, #89dbca 1px, transparent 1px);
          background-size: 60px 104px, 60px 104px, 60px 104px, 60px 104px, 60px 60px;
          background-position: 0 0, 0 0, 30px 52px, 30px 52px, 0 0;
          opacity: 0.05;
        }
        .scanlines {
          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(137, 219, 202, 0.1) 50%, rgba(137, 219, 202, 0.1));
          background-size: 100% 4px;
        }
      `}} />

      {/* Background Environment */}
      <div className="fixed inset-0 hex-grid-bg pointer-events-none"></div>
      <div className="fixed inset-0 z-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.95)]"></div>

      {/* --- HUD NAVIGATION (MOBILE OPTIMIZED) --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-[#222222] bg-[#050505]/90 backdrop-blur-md pointer-events-auto">
        <div className="max-w-7xl mx-auto px-5 md:px-16 h-20 flex items-center justify-between">
          <a href="/" className="text-white font-bold tracking-widest text-sm uppercase flex items-center gap-3 hover:text-[#89dbca] transition-colors cursor-crosshair relative z-50">
            <FaChessRook className="text-[#89dbca]" size={20} /> A. Quadri
          </a>
          
          <div className="hidden md:flex gap-10 text-xs font-bold tracking-widest uppercase text-gray-500">
            <a href="/" className="hover:text-white transition-colors cursor-crosshair">Profile</a>
            <a href="/about" className="hover:text-white transition-colors cursor-crosshair">About</a>
            <a href="/projects" className="text-[#89dbca] drop-shadow-[0_0_8px_#89dbca] transition-colors cursor-crosshair">Projects</a>
            <a href="/relax" className="hover:text-white transition-colors cursor-crosshair flex items-center gap-2">
              <FaCoffee size={12} /> Relax
            </a>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6 text-gray-400 relative z-50">
            <a href="https://github.com/Abrar-Quadri26710" target="_blank" rel="noreferrer" className="hidden sm:block hover:text-white transition-colors cursor-crosshair"><SiGithub size={18} /></a>
            <a href="https://www.linkedin.com/in/abrar-quadri-03b946317/" target="_blank" rel="noreferrer" className="hidden sm:block hover:text-white transition-colors cursor-crosshair"><FaLinkedin size={18} /></a>
            <a href="mailto:mirrowdin@gmail.com" className="hidden sm:block hover:text-white transition-colors cursor-crosshair"><FaEnvelope size={18} /></a>
            
            <button 
              className="md:hidden text-gray-400 hover:text-white transition-colors ml-2 cursor-crosshair"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        <div className={`md:hidden absolute top-20 left-0 w-full bg-[#050505]/95 backdrop-blur-xl border-b border-[#222222] transition-all duration-300 overflow-hidden ${mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 border-transparent"}`}>
          <div className="flex flex-col items-center py-6 gap-6 text-xs font-bold tracking-widest uppercase text-gray-500">
            <a href="/" className="hover:text-white transition-colors">Profile</a>
            <a href="/about" className="hover:text-white transition-colors">About</a>
            <a href="/projects" className="text-[#89dbca] transition-colors">Projects</a>
            <a href="/relax" className="hover:text-white transition-colors flex items-center gap-2"><FaCoffee size={12} /> Relax</a>
            <div className="flex gap-6 mt-2 pt-4 border-t border-[#222] w-1/2 justify-center">
               <a href="https://github.com" target="_blank" rel="noreferrer"><SiGithub size={18} className="hover:text-white" /></a>
               <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin size={18} className="hover:text-white" /></a>
               <a href="mailto:mirrowdin@gmail.com"><FaEnvelope size={18} className="hover:text-white" /></a>
            </div>
          </div>
        </div>
      </nav>

      {/* --- PAGE HEADER --- */}
      <div className="relative z-10 pt-32 px-5 md:px-16 max-w-7xl mx-auto animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-[#222] pb-6">
          <div>
            <h2 className="text-[#89dbca] text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 drop-shadow-[0_0_5px_#89dbca] flex items-center gap-2">
               <span className="w-2 h-2 bg-[#89dbca] rounded-full animate-pulse"></span>
               Deployment Logs
            </h2>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-[0.85] text-white uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#89dbca] to-[#87e8c1]">History</span>
            </h1>
          </div>
          <div className="mt-4 md:mt-0 bg-[#111]/80 backdrop-blur border border-[#89dbca]/30 p-2 md:p-3 rounded-lg flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
            <span className="text-[10px] md:text-[10px] text-gray-500 font-mono tracking-widest uppercase">Total Logs:</span>
            <span className="text-[#89dbca] font-black text-lg md:text-xl leading-none drop-shadow-[0_0_5px_#89dbca]">0{projectFiles.length}</span>
          </div>
        </div>

        {/* --- PROJECT GRID MATRIX --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          
          {projectFiles.map((project, index) => {
            const isExpanded = expandedId === project.id;
            
            return (
              <div 
                key={project.id} 
                onClick={() => handleCardClick(project.id)}
                className={`group relative bg-[#0a0a0a]/80 border rounded-xl overflow-hidden transition-all duration-500 cursor-crosshair animate-tv-blink ${
                  isExpanded 
                    ? 'border-[#89dbca] shadow-[0_0_20px_rgba(137,219,202,0.2)]' 
                    : 'border-[#222] hover:border-[#89dbca]/60 hover:shadow-[0_0_30px_rgba(137,219,202,0.15)]'
                }`}
                style={{ animationDelay: `${index * 0.15}s`, opacity: 0 }}
              >
                
                {/* Tactical Corner Brackets */}
                <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#89dbca] transition-opacity rounded-tl-xl ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#89dbca] transition-opacity rounded-tr-xl ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#89dbca] transition-opacity rounded-bl-xl ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#89dbca] transition-opacity rounded-br-xl ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>

                {/* CRT Scanline Overlay */}
                <div className={`absolute inset-0 scanlines mix-blend-overlay pointer-events-none transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>

                <div className="p-5 md:p-6 h-full flex flex-col relative z-10">
                  
                  {/* Header: Icon & Status */}
                  <div className="flex justify-between items-start mb-5 md:mb-6">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded border flex items-center justify-center transition-colors duration-300 ${isExpanded ? 'bg-[#89dbca]/10 border-[#89dbca]' : 'bg-[#111] border-[#333] group-hover:border-[#89dbca]/50'}`}>
                      {/* Slightly shrink the icon for mobile via scaling */}
                      <div className="scale-75 md:scale-100">{project.icon}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-500 font-mono text-[8px] md:text-[9px] uppercase tracking-widest block mb-1">ID: {project.id}</span>
                      <span className={`font-mono text-[8px] md:text-[10px] font-bold tracking-widest uppercase ${project.statusColor} bg-[#111] px-2 py-1 rounded border border-[#333]`}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Body: Title & Dynamic Description */}
                  <div className="flex-grow">
                    <h3 className={`text-lg md:text-xl font-black uppercase tracking-tight mb-2 md:mb-3 transition-colors duration-300 ${isExpanded ? 'text-[#89dbca]' : 'text-white group-hover:text-[#89dbca]'}`}>
                      {project.title}
                    </h3>
                    
                    <p className={`text-[12px] md:text-sm font-mono leading-relaxed transition-all duration-300 ${isExpanded ? 'text-gray-200' : 'text-gray-400 line-clamp-3'}`}>
                      {project.desc}
                    </p>

                    <div className="mt-3">
                      <span className={`text-[9px] md:text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 ${isExpanded ? 'text-[#F5D15F]' : 'text-gray-600 group-hover:text-[#89dbca]'}`}>
                        {isExpanded ? '[-] MINIMIZE LOG' : '[+] EXPAND DATA'}
                      </span>
                    </div>
                  </div>

                  {/* Footer: Tech Stack Badges & Links */}
                  <div className="mt-5 pt-5 md:mt-6 md:pt-6 border-t border-[#222] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, i) => (
                        <span key={i} className="text-[8px] md:text-[9px] text-[#89dbca] font-bold tracking-widest uppercase px-2 py-1 bg-[#89dbca]/10 border border-[#89dbca]/20 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 self-end sm:self-auto">
                      <a href={project.github} onClick={(e) => e.stopPropagation()} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors cursor-crosshair p-2 bg-[#111] rounded border border-[#333] hover:border-white z-20 relative">
                        <SiGithub size={12} className="md:w-3.5 md:h-3.5" />
                      </a>
                      <a href={project.live} onClick={(e) => e.stopPropagation()} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#89dbca] transition-colors cursor-crosshair p-2 bg-[#111] rounded border border-[#333] hover:border-[#89dbca] z-20 relative">
                        <FaExternalLinkAlt size={12} className="md:w-3.5 md:h-3.5" />
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}

        </div>
      </div>
    </main>
  );
}