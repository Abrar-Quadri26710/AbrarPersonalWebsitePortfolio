"use client";

import { useState } from 'react';
import Navbar from "@/components/Navbar";
import { SiLinux, SiGithub, SiReact, SiTailwindcss, SiCplusplus, SiSqlite, SiTypescript } from 'react-icons/si';
import { FaEnvelope, FaLinkedin, FaExternalLinkAlt, FaFolderOpen, FaVideo, FaLock } from 'react-icons/fa';
import { TbBrandCSharp, TbBrandNextjs } from 'react-icons/tb';

// --- PROJECT ARCHIVE ---
interface ProjectItem {
  id: string;
  title: string;
  status: string;
  statusColor: string;
  desc: string;
  tech: string[];
  icon: React.ReactNode;
  github?: string;
  live?: string;
  isProprietary?: boolean;
  videoNotice?: string;
  demoUrl?: string;
}

const projectFiles: ProjectItem[] = [
  {
    id: "P-01",
    title: "Bubbles Social Platform",
    status: "ACTIVE BUILD",
    statusColor: "text-teal-400",
    desc: "A web-based alternative to engagement-driven social networks. Conversations are organized into Fields, Spaces (single-field communities), and Clouds (multi-field communities with 100-member scaling transitions). Discarding endless algorithmic feeds, Bubbles organizes discussions by topic with stance tags (Open, Support, Challenge, Curious), creator-defined lifecycles (1hr to 7 days), and temporary local JSON discussion archive exports. Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Prisma ORM, and HMAC session authentication.",
    tech: ["Next.js 16", "React 19", "TypeScript", "Prisma ORM", "Tailwind CSS", "HMAC Auth"],
    icon: <SiReact size={24} className="text-teal-400" />,
    isProprietary: true,
    videoNotice: "Video feature showcase coming soon",
    demoUrl: "mailto:mirrowdin@gmail.com?subject=Inquiry%20regarding%20Bubbles%20Social%20Platform"
  },
  {
    id: "P-02",
    title: "MID OS Virtual Operating System",
    status: "DEPLOYED",
    statusColor: "text-[#A3F9B9]", 
    desc: "MidOS is a virtual operating system built from scratch to explore system-level process scheduling and execution isolation. It implements cooperative and preemptive process scheduling with context switching, virtual memory management with two-level page tables and LRU page eviction, mutex/event synchronization, and dynamic heap allocation. Connects operating system isolation concepts directly to security and execution boundaries.",
    tech: ["C#", "Virtual Memory", "Process Scheduling", "Concurrency"],
    icon: <TbBrandCSharp size={24} className="text-[#F5D15F]" />,
    github: "https://github.com/Abrar-Quadri26710/MidOS",
    live: "https://github.com/Abrar-Quadri26710/MidOS"
  },
  {
    id: "P-03",
    title: "Storefront E-Commerce Website",
    status: "DEPLOYED",
    statusColor: "text-[#A3F9B9]",
    desc: "An e-commerce website for a fictional retail store, engineered with PHP and MySQL. Built to reinforce backend development, session security, and database normalization. Features a custom shopping cart, role-based access control (RBAC), an admin dashboard for managing products and orders, and a 3NF normalized relational schema preventing data anomalies.",
    tech: ["PHP", "MySQL", "RBAC", "Session Security", "Schema Design"],
    icon: <SiSqlite size={24} className="text-[#A3F9B9]" />,
    github: "https://github.com/Abrar-Quadri26710/StoreFrontWebsite",
    live: "https://github.com/Abrar-Quadri26710/StoreFrontWebsite"
  },
  {
    id: "P-04",
    title: "RV32I Virtual CPU",
    status: "DEPLOYED",
    statusColor: "text-[#A3F9B9]",
    desc: "A custom-engineered 32-bit RISC-V CPU simulator capable of decoding and executing raw binary machine code. Translates hardware-level execution cycles into functional, object-oriented software logic, including memory management, instruction parsing, and loader classes. Features a 32-entry register bank and byte-addressable memory hierarchy.",
    tech: ["C++", "System Architecture", "RISC-V Emulation"],
    icon: <SiCplusplus size={24} className="text-[#A3F9B9]" />,
    github: "https://github.com/Abrar-Quadri26710/RV32I-CPU-Simulator",
    live: "https://github.com/Abrar-Quadri26710/RV32I-CPU-Simulator"
  },
  {
    id: "P-05",
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
    id: "P-06",
    title: "Abrar's Engineering Portfolio",
    status: "DEPLOYED",
    statusColor: "text-[#A3F9B9]",
    desc: "Personal portfolio website built with Next.js 16 and Tailwind CSS. Features spatial flight navigation across a 3600px tactical canvas, responsive holographic helmet visor HUD menus, bit-scrambling text animations, and an opening tactical intro.",
    tech: ["Next.js 16", "React 19", "Tailwind CSS", "TypeScript"],
    icon: <TbBrandNextjs size={24} className="text-[#A3F9B9]" />,
    github: "https://github.com/Abrar-Quadri26710/AbrarPersonalWebsitePortfolio",
    live: "https://github.com/Abrar-Quadri26710/AbrarPersonalWebsitePortfolio"
  },
];

export default function Projects() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
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

      {/* Navigation */}
      <Navbar />

      {/* --- PAGE HEADER --- */}
      <div className="relative z-10 pt-32 px-5 md:px-16 max-w-7xl mx-auto animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-[#222] pb-6">
          <div>
            <h2 className="text-[#89dbca] text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
               <span className="w-2 h-2 bg-[#89dbca] rounded-full animate-pulse"></span>
               Deployment Logs
            </h2>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-[0.85] text-white uppercase">
              Project History
            </h1>
          </div>
          <div className="mt-4 md:mt-0 bg-[#111] border border-neutral-800 p-2 md:p-3 rounded-lg flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
            <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Total Logs:</span>
            <span className="text-[#89dbca] font-black text-lg md:text-xl leading-none">0{projectFiles.length}</span>
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

                    {project.isProprietary && (
                      <div className="mt-3 py-1 px-2.5 bg-neutral-900/80 border border-teal-500/30 rounded text-[10px] font-mono text-teal-300 flex items-center gap-1.5">
                        <FaLock size={9} />
                        <span>Proprietary Codebase // Potential Product Release</span>
                      </div>
                    )}

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
                    
                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      {project.isProprietary ? (
                        <div className="flex items-center gap-2">
                          <span
                            title="Video showcase coming soon"
                            className="inline-flex items-center gap-1 text-[10px] font-mono text-teal-300 bg-[#111] px-2.5 py-1.5 rounded border border-teal-500/40"
                          >
                            <FaVideo size={11} />
                            <span className="hidden sm:inline">Showcase Soon</span>
                          </span>
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              onClick={(e) => e.stopPropagation()}
                              title="Inquire about Bubbles demo"
                              className="text-gray-400 hover:text-[#89dbca] transition-colors p-2 bg-[#111] rounded border border-[#333] hover:border-[#89dbca] z-20 relative"
                            >
                              <FaExternalLinkAlt size={12} className="md:w-3.5 md:h-3.5" />
                            </a>
                          )}
                        </div>
                      ) : (
                        <>
                          {project.github && (
                            <a
                              href={project.github}
                              onClick={(e) => e.stopPropagation()}
                              target="_blank"
                              rel="noreferrer"
                              title="GitHub Repository"
                              className="text-gray-500 hover:text-white transition-colors cursor-crosshair p-2 bg-[#111] rounded border border-[#333] hover:border-white z-20 relative"
                            >
                              <SiGithub size={12} className="md:w-3.5 md:h-3.5" />
                            </a>
                          )}
                          {project.live && (
                            <a
                              href={project.live}
                              onClick={(e) => e.stopPropagation()}
                              target="_blank"
                              rel="noreferrer"
                              title="Live / Source Link"
                              className="text-gray-500 hover:text-[#89dbca] transition-colors cursor-crosshair p-2 bg-[#111] rounded border border-[#333] hover:border-[#89dbca] z-20 relative"
                            >
                              <FaExternalLinkAlt size={12} className="md:w-3.5 md:h-3.5" />
                            </a>
                          )}
                        </>
                      )}
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
