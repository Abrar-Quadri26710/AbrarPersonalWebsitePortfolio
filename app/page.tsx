"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  SiCplusplus, 
  SiReact, 
  SiNextdotjs, 
  SiLinux, 
  SiGithub, 
  SiPhp, 
  SiMysql, 
  SiTypescript, 
  SiTailwindcss 
} from 'react-icons/si';
import { 
  FaJava, FaEnvelope, FaFingerprint, FaServer, FaShieldAlt, 
  FaCode, FaTerminal, FaLinkedin, FaCoffee, FaBars, FaTimes, FaChessRook
} from 'react-icons/fa'; 
import { TbBrandCSharp } from 'react-icons/tb';

// Fade in component, was not able to have this imported seperatly
function FadeIn({ 
  children, 
  delay = 0, 
  direction = "up" 
}: { 
  children: React.ReactNode; 
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) observer.unobserve(domRef.current);
        }
      },
      { threshold: 0.15 } 
    );

    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  let translateClass = "translate-y-10"; 
  if (direction === "left") translateClass = "-translate-x-10";
  if (direction === "right") translateClass = "translate-x-10";
  if (direction === "none") translateClass = "translate-y-0 translate-x-0";

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible 
          ? "opacity-100 translate-y-0 translate-x-0" 
          : `opacity-0 ${translateClass}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}


// MAIN PORTFOLIO PAGE

export default function Home() {
  const [typedCommand, setTypedCommand] = useState("");
  const [step, setStep] = useState(0);
  const command = "./initialize_core_systems.sh";
  
  // State for tracking the mobile hamburger menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      setTypedCommand(command.slice(0, charIndex));
      charIndex++;
      if (charIndex > command.length) {
        clearInterval(typeInterval);
        let currentStep = 1;
        const stepInterval = setInterval(() => {
          setStep(currentStep);
          currentStep++;
          if (currentStep > 6) clearInterval(stepInterval);
        }, 500); 
      }
    }, 50); 
    
    return () => clearInterval(typeInterval);
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans selection:bg-[#d4af37] selection:text-[#0a0a0a]">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: scroll 4s linear infinite;
        }
        .gradient-mask {
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
      `}} />

      {/* HUD */}
      <nav className="fixed top-0 w-full z-50 border-b border-[#222222] bg-[#050505]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-5 md:px-16 h-20 flex items-center justify-between">
          
          <a href="/" className="text-white font-bold tracking-widest text-sm uppercase flex items-center gap-3 hover:text-[#89dbca] transition-colors cursor-crosshair relative z-50">
            <FaChessRook className="text-[#89dbca]" size={20} />
            A. Quadri
          </a>
          
          {/* Desktop Links (Hidden on Mobile) */}
          <div className="hidden md:flex gap-10 text-xs font-bold tracking-widest uppercase text-gray-500">
            <a href="/" className="text-[#89dbca] drop-shadow-[0_0_8px_#89dbca] transition-colors cursor-crosshair">Profile</a>
            <a href="/about" className="hover:text-white transition-colors cursor-crosshair">About</a>
            <a href="/projects" className="hover:text-white transition-colors cursor-crosshair">Projects</a>
            <a href="/relax" className="hover:text-white transition-colors cursor-crosshair flex items-center gap-2">
              <FaCoffee size={12} /> Relax
            </a>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6 text-gray-400 relative z-50">
            <a href="https://github.com/Abrar-Quadri26710" target="_blank" rel="noreferrer" className="hover:text-white transition-colors cursor-crosshair"><SiGithub size={18} /></a>
            <a href="https://www.linkedin.com/in/abrar-quadri-03b946317/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors cursor-crosshair"><FaLinkedin size={18} /></a>
            <a href="mailto:mirrowdin@gmail.com" className="hover:text-white transition-colors cursor-crosshair"><FaEnvelope size={18} /></a>
            
            {/* Mobile Hamburger Button */}
            <button 
              className="md:hidden text-gray-400 hover:text-white transition-colors ml-2 cursor-crosshair"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`md:hidden absolute top-20 left-0 w-full bg-[#050505]/95 backdrop-blur-xl border-b border-[#222222] transition-all duration-300 overflow-hidden ${mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 border-transparent"}`}>
          <div className="flex flex-col items-center py-6 gap-6 text-xs font-bold tracking-widest uppercase text-gray-500">
            <a href="/" className="text-[#89dbca] transition-colors">Profile</a>
            <a href="/about" className="hover:text-white transition-colors">About</a>
            <a href="/projects" className="hover:text-white transition-colors">Projects</a>
            <a href="/relax" className="hover:text-white transition-colors flex items-center gap-2"><FaCoffee size={12} /> Relax</a>
          </div>
        </div>
      </nav>

      {/* Main Section */}
      <FadeIn direction="none" delay={100}>
        <div className="max-w-7xl mx-auto px-5 md:px-16 pt-32 pb-16 min-h-[90vh] flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          
         
          <div className="w-full lg:w-5/12 space-y-6 md:space-y-8">
            <h1 className="text-5xl md:text-[7.5rem] font-black tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-r from-[#89dbca] to-[#baeb9b] uppercase mt-4 md:mt-0">
              Abrar<br/>Quadri
            </h1>
            
            <p className="text-gray-400 text-base md:text-xl leading-relaxed max-w-xl">
              The next generation of software engineering and development. Full stack developer coding for the people and by the people.
            </p>

            <div className="pt-4 md:pt-8">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-4 border-2 border-[#89dbca] text-[#89dbca] px-6 py-3 md:px-8 md:py-4 font-black text-xs md:text-sm uppercase tracking-widest hover:bg-[#d4af37] hover:border-[#d4af37] hover:text-[#0a0a0a] transition-all duration-300 cursor-crosshair">
                Explore Github <span className="text-xl leading-none">→</span>
              </a>
            </div>

            <div className="pt-4 md:pt-8 space-y-4">
              <span className="text-xs tracking-widest text-gray-600 uppercase font-bold">Technologies</span>
              <div className="flex flex-wrap gap-2 md:gap-3">
                <span className="border border-[#333] px-3 py-1 md:px-4 md:py-2 text-[10px] md:text-xs font-mono text-gray-400 hover:text-[#d4af37] hover:border-[#d4af37] transition-colors cursor-crosshair">C++</span>
                <span className="border border-[#333] px-3 py-1 md:px-4 md:py-2 text-[10px] md:text-xs font-mono text-gray-400 hover:text-[#d4af37] hover:border-[#d4af37] transition-colors cursor-crosshair">JAVA</span>
                <span className="border border-[#333] px-3 py-1 md:px-4 md:py-2 text-[10px] md:text-xs font-mono text-gray-400 hover:text-[#d4af37] hover:border-[#d4af37] transition-colors cursor-crosshair">C#</span>
                <span className="border border-[#333] px-3 py-1 md:px-4 md:py-2 text-[10px] md:text-xs font-mono text-gray-400 hover:text-[#d4af37] hover:border-[#d4af37] transition-colors cursor-crosshair">SQL</span>
                <span className="border border-[#333] px-3 py-1 md:px-4 md:py-2 text-[10px] md:text-xs font-mono text-gray-400 hover:text-[#d4af37] hover:border-[#d4af37] transition-colors cursor-crosshair">TypeScript</span>
              </div>
            </div>
          </div>

         
          <div className="w-full lg:w-7/12 flex justify-end">
            <div className="w-full max-w-2xl rounded-xl overflow-hidden border border-[#222] bg-[#050505] shadow-2xl relative group">
              <div className="bg-[#111] px-4 py-3 flex items-center gap-2 border-b border-[#222]">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <div className="flex items-center gap-2 ml-4 text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-widest">
                  <FaTerminal /> root@aquadri-sys:~
                </div>
              </div>

              
              <div className="p-5 md:p-8 font-mono text-xs md:text-sm lg:text-base space-y-3 md:space-y-4 text-gray-400 h-auto min-h-[18rem] md:min-h-[22rem] flex flex-col justify-start">
                <p>
                  <span className="text-[#89dbca]">aquadri@admin</span><span className="text-gray-600">:$</span> {typedCommand}
                  {step === 0 && <span className="w-2 h-4 bg-gray-400 inline-block align-middle animate-pulse ml-1"></span>}
                </p>
                {step >= 1 && <p className="text-gray-500">&gt; Initializing secure server connection... <span className="text-[#d4af37]">[OK]</span></p>}
                {step >= 2 && <p className="text-gray-500">&gt; Mounting backend database architecture... <span className="text-[#d4af37]">[OK]</span></p>}
                {step >= 3 && <p className="text-gray-500">&gt; Compiling interactive frontend modules... <span className="text-[#d4af37]">[OK]</span></p>}
                {step >= 4 && <p className="text-gray-500">&gt; API endpoints successfully routed.</p>}
                {step >= 5 && <p className="text-gray-500">&gt; Full-stack environment online.</p>}
                
                {step >= 6 && (
                  <p className="text-[#89dbca] pt-2">
                    aquadri@admin<span className="text-gray-600">:$</span> <span className="w-2 h-4 bg-gray-400 inline-block align-middle animate-pulse"></span>
                  </p>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#89dbca]/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/*  MARQUEE  */}
      <section className="relative w-full overflow-hidden py-12 gradient-mask border-y border-[#222] bg-[#111]">
        <div className="flex w-max animate-infinite-scroll">
          <div className="flex items-center justify-around whitespace-nowrap px-4">
            <span className="text-4xl md:text-8xl font-black text-[#89dbca] tracking-tighter uppercase px-6 md:px-10">Software Development</span>
            <span className="w-3 h-3 md:w-5 md:h-5 bg-[#d4af37] rotate-45 flex-shrink-0"></span>
            <span className="text-4xl md:text-8xl font-black text-[#89dbca] tracking-tighter uppercase px-6 md:px-10">Full Stack</span>
            <span className="w-3 h-3 md:w-5 md:h-5 bg-[#d4af37] rotate-45 flex-shrink-0"></span>
            <span className="text-4xl md:text-8xl font-black text-[#89dbca] tracking-tighter uppercase px-6 md:px-10">Linux Systems</span>
            <span className="w-3 h-3 md:w-5 md:h-5 bg-[#d4af37] rotate-45 flex-shrink-0"></span>
            <span className="text-4xl md:text-8xl font-black text-[#89dbca] tracking-tighter uppercase px-6 md:px-10">Databases</span>
            <span className="w-3 h-3 md:w-5 md:h-5 bg-[#d4af37] rotate-45 flex-shrink-0"></span>
            <span className="text-4xl md:text-8xl font-black text-[#89dbca] tracking-tighter uppercase px-6 md:px-10">Computer Architecture</span>
            <span className="w-3 h-3 md:w-5 md:h-5 bg-[#d4af37] rotate-45 flex-shrink-0"></span>
          </div>
          <div className="flex items-center justify-around whitespace-nowrap px-4">
            <span className="text-4xl md:text-8xl font-black text-[#89dbca] tracking-tighter uppercase px-6 md:px-10">Software Development</span>
            <span className="w-3 h-3 md:w-5 md:h-5 bg-[#d4af37] rotate-45 flex-shrink-0"></span>
            <span className="text-4xl md:text-8xl font-black text-[#89dbca] tracking-tighter uppercase px-6 md:px-10">Full Stack</span>
            <span className="w-3 h-3 md:w-5 md:h-5 bg-[#d4af37] rotate-45 flex-shrink-0"></span>
            <span className="text-4xl md:text-8xl font-black text-[#89dbca] tracking-tighter uppercase px-6 md:px-10">Linux Systems</span>
            <span className="w-3 h-3 md:w-5 md:h-5 bg-[#d4af37] rotate-45 flex-shrink-0"></span>
            <span className="text-4xl md:text-8xl font-black text-[#89dbca] tracking-tighter uppercase px-6 md:px-10">Databases</span>
            <span className="w-3 h-3 md:w-5 md:h-5 bg-[#d4af37] rotate-45 flex-shrink-0"></span>
            <span className="text-4xl md:text-8xl font-black text-[#89dbca] tracking-tighter uppercase px-6 md:px-10">Computer Architecture</span>
            <span className="w-3 h-3 md:w-5 md:h-5 bg-[#d4af37] rotate-45 flex-shrink-0"></span>
          </div>
        </div>
      </section>

      {/* Second Page */}
      <div className="max-w-7xl mx-auto px-5 md:px-16 pt-20 pb-28 space-y-24 md:space-y-32">
        
        {/* RESEARCHER PROFILE */}
        <section id="profile" className="scroll-mt-32">
          <FadeIn direction="up">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#89dbca] mb-8 md:mb-12 uppercase">
              Researcher Profile
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 space-y-6">
              <FadeIn direction="up" delay={100}>
                <div className="bg-[#111] border border-[#222] p-6 md:p-8">
                  <div className="flex items-center gap-4 border-b border-[#222] pb-6 mb-6">
                    <div className="w-12 h-12 bg-[#1a1a1a] border border-[#333] rounded-lg flex items-center justify-center text-gray-400">
                      <FaFingerprint size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">A. Quadri</h3>
                      <span className="text-[10px] md:text-xs tracking-widest text-gray-500 uppercase">CS Student</span>
                    </div>
                  </div>

                  <ul className="space-y-5 text-sm">
                    <li className="flex justify-between items-center"><span className="text-gray-500 font-bold tracking-widest uppercase text-[10px] md:text-xs">Role</span> <span className="text-white">Student</span></li>
                    <li className="flex justify-between items-center"><span className="text-gray-500 font-bold tracking-widest uppercase text-[10px] md:text-xs">Focus</span> <span className="text-white">Fullstack</span></li>
                    <li className="flex justify-between items-center"><span className="text-gray-500 font-bold tracking-widest uppercase text-[10px] md:text-xs">Education</span> <span className="text-white">B.S. Comp Sci(SOON)</span></li>
                    <li className="flex justify-between items-center"><span className="text-gray-500 font-bold tracking-widest uppercase text-[10px] md:text-xs">Location</span> <span className="text-white">Illinois, USA</span></li>
                  </ul>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={200}>
                <div className="bg-[#111] border border-[#222] p-6 md:p-8 space-y-8">
                  <span className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">Expertise</span>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-[10px] md:text-xs font-bold text-gray-400 mb-2 uppercase"><span>Bachelor's Degree</span><span>95%</span></div>
                      <div className="h-0.5 w-full bg-[#222]"><div className="h-full bg-[#89dbca] w-[95%]"></div></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] md:text-xs font-bold text-gray-400 mb-2 uppercase"><span>Fullstack</span><span>75%</span></div>
                      <div className="h-0.5 w-full bg-[#222]"><div className="h-full bg-[#89dbca] w-[75%]"></div></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] md:text-xs font-bold text-gray-400 mb-2 uppercase"><span>Computer Architecture</span><span>65%</span></div>
                      <div className="h-0.5 w-full bg-[#222]"><div className="h-full bg-[#89dbca] w-[65%]"></div></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] md:text-xs font-bold text-gray-400 mb-2 uppercase"><span>Cybersecurity (NEW)</span><span>5%</span></div>
                      <div className="h-0.5 w-full bg-[#222]"><div className="h-full bg-[#89dbca] w-[5%]"></div></div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-8 space-y-8 md:space-y-12 lg:pl-6">
              <FadeIn direction="up" delay={300}>
                <div className="space-y-6 max-w-2xl">
                  <h3 className="text-2xl md:text-[2.5rem] font-light text-gray-300 leading-tight">
                    Designing <span className="font-bold text-white border-b-2 border-[#89dbca]">Modern</span> and Resilient Programs.
                  </h3>
                  <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                    Specializing in modern fullstack software developement while expanding my aresenal of skills in networking, cybersecurity, and AI. Passionate about building secure, efficient, and scalable systems for the people.
                  </p>
                </div>
              </FadeIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4">
                <FadeIn direction="up" delay={400}>
                  <div className="bg-[#111] border border-[#222] p-6 hover:border-[#d4af37] transition-colors group h-full">
                    <FaCode className="text-gray-500 mb-6 group-hover:text-[#d4af37] transition-colors" size={24} />
                    <h4 className="text-[10px] md:text-xs font-bold tracking-widest text-white uppercase mb-3">System Arch</h4>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed">Custom logic, simulators, and OOP environments.</p>
                  </div>
                </FadeIn>

                <FadeIn direction="up" delay={500}>
                  <div className="bg-[#111] border border-[#222] p-6 hover:border-[#d4af37] transition-colors group h-full">
                    <FaServer className="text-gray-500 mb-6 group-hover:text-[#d4af37] transition-colors" size={24} />
                    <h4 className="text-[10px] md:text-xs font-bold tracking-widest text-white uppercase mb-3">Distributed Ops</h4>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed">Full-stack database orchestration and role management.</p>
                  </div>
                </FadeIn>

                <FadeIn direction="up" delay={600}>
                  <div className="bg-[#111] border border-[#222] p-6 hover:border-[#d4af37] transition-colors group h-full">
                    <FaShieldAlt className="text-gray-500 mb-6 group-hover:text-[#d4af37] transition-colors" size={24} />
                    <h4 className="text-[10px] md:text-xs font-bold tracking-widest text-white uppercase mb-3">Security & AI</h4>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed">Currently reasearching advancements in AI and cybersecurity.</p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* Featured */}
        <section id="projects" className="space-y-8 md:space-y-12 border-t border-[#222] pt-16 scroll-mt-28">
          <FadeIn direction="up">
            <h2 className="text-[10px] md:text-sm font-bold tracking-widest uppercase text-gray-500">Featured Deployments</h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 gap-6 md:gap-8">
            <FadeIn direction="up" delay={100}>
              <div className="bg-[#111] p-6 md:p-12 border border-[#222] hover:border-[#d4af37] transition-all duration-500 group">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 md:mb-8 gap-4">
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white group-hover:text-[#d4af37] transition-colors">RISC-V Simulator</h3>
                  <span className="text-[10px] md:text-xs font-mono text-[#0a0a0a] bg-[#89dbca] px-4 py-2 font-bold tracking-widest uppercase group-hover:bg-[#d4af37] transition-colors self-start">C++</span>
                </div>
                <p className="text-gray-400 text-sm md:text-lg leading-relaxed max-w-4xl">
                  Developed a fully functional simulator for the RISC-V 32-bit integer (RV32I) architecture capable of executing binary machine code. Implemented the complete Fetch-Decode-Execute cycle with a simulated byte-addressable memory system and a 32-entry register file.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn direction="up" delay={200}>
              <div className="bg-[#111] p-6 md:p-12 border border-[#222] hover:border-[#d4af37] transition-all duration-500 group">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 md:mb-8 gap-4">
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white group-hover:text-[#d4af37] transition-colors">MID OS</h3>
                  <span className="text-[10px] md:text-xs font-mono text-[#0a0a0a] bg-[#89dbca] px-4 py-2 font-bold tracking-widest uppercase group-hover:bg-[#d4af37] transition-colors self-start">C#</span>
                </div>
                <p className="text-gray-400 text-sm md:text-lg leading-relaxed max-w-4xl">
                  CURRENTLY working on a virtual OS that simulates concepts such as process scheduling, virtual memory, memory management, and inter-process synchronization — all running on an abstract CPU with a custom instruction set. 
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={300}>
              <div className="bg-[#111] p-6 md:p-12 border border-[#222] hover:border-[#d4af37] transition-all duration-500 group">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 md:mb-8 gap-4">
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white group-hover:text-[#d4af37] transition-colors">Full-Stack Storefront</h3>
                  <span className="text-[10px] md:text-xs font-mono text-[#0a0a0a] bg-[#89dbca] px-4 py-2 font-bold tracking-widest uppercase group-hover:bg-[#d4af37] transition-colors self-start">PHP / MySQL / JS</span>
                </div>
                <p className="text-gray-400 text-sm md:text-lg leading-relaxed max-w-4xl">
                  Built a complete e-commerce platform featuring product browsing, dynamic cart management, and secure order processing. Engineered role-based authentication to allow authorized users to manage real-time inventory stock effectively.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>


        {/* Tech Stack */}
        <section id="arsenal" className="pt-16 scroll-mt-28">
          <FadeIn direction="up">
            <div className="relative border border-[#222] p-8 md:p-16 mt-6 md:mt-10 bg-[#111]">
              <div className="absolute top-0 left-6 md:left-12 -translate-y-1/2 bg-[#0a0a0a] px-4 py-2 border border-[#222] text-[10px] md:text-xs text-[#89dbca] font-bold z-10 tracking-widest uppercase">
                Programming & Systems
              </div>
              
              <div className="relative z-10 flex flex-wrap justify-center gap-6 md:gap-8">
                <div className="flex flex-col items-center gap-3 md:gap-4 group cursor-crosshair">
                  <div className="w-16 h-16 md:w-20 md:h-20 border border-[#333] bg-[#0a0a0a] flex items-center justify-center text-[#89dbca] group-hover:text-[#d4af37] group-hover:border-[#d4af37] transition-all duration-500">
                    <SiTypescript size={28} className="md:w-8 md:h-8" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-[#89dbca] group-hover:text-[#d4af37] transition-colors">TypeScript</span>
                </div>

                <div className="flex flex-col items-center gap-3 md:gap-4 group cursor-crosshair">
                  <div className="w-16 h-16 md:w-20 md:h-20 border border-[#333] bg-[#0a0a0a] flex items-center justify-center text-[#89dbca] group-hover:text-[#d4af37] group-hover:border-[#d4af37] transition-all duration-500">
                    <SiReact size={28} className="md:w-8 md:h-8" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-[#89dbca] group-hover:text-[#d4af37] transition-colors">React</span>
                </div>

                <div className="flex flex-col items-center gap-3 md:gap-4 group cursor-crosshair">
                  <div className="w-16 h-16 md:w-20 md:h-20 border border-[#333] bg-[#0a0a0a] flex items-center justify-center text-[#89dbca] group-hover:text-[#d4af37] group-hover:border-[#d4af37] transition-all duration-500">
                    <SiNextdotjs size={28} className="md:w-8 md:h-8" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-[#89dbca] group-hover:text-[#d4af37] transition-colors">Next.js</span>
                </div>

                <div className="flex flex-col items-center gap-3 md:gap-4 group cursor-crosshair">
                  <div className="w-16 h-16 md:w-20 md:h-20 border border-[#333] bg-[#0a0a0a] flex items-center justify-center text-[#89dbca] group-hover:text-[#d4af37] group-hover:border-[#d4af37] transition-all duration-500">
                    <SiTailwindcss size={28} className="md:w-8 md:h-8" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-[#89dbca] group-hover:text-[#d4af37] transition-colors">Tailwind</span>
                </div>

                <div className="flex flex-col items-center gap-3 md:gap-4 group cursor-crosshair">
                  <div className="w-16 h-16 md:w-20 md:h-20 border border-[#333] bg-[#0a0a0a] flex items-center justify-center text-[#89dbca] group-hover:text-[#d4af37] group-hover:border-[#d4af37] transition-all duration-500">
                    <SiPhp size={28} className="md:w-8 md:h-8" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-[#89dbca] group-hover:text-[#d4af37] transition-colors">PHP</span>
                </div>

                <div className="flex flex-col items-center gap-3 md:gap-4 group cursor-crosshair">
                  <div className="w-16 h-16 md:w-20 md:h-20 border border-[#333] bg-[#0a0a0a] flex items-center justify-center text-[#89dbca] group-hover:text-[#d4af37] group-hover:border-[#d4af37] transition-all duration-500">
                    <SiMysql size={28} className="md:w-8 md:h-8" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-[#89dbca] group-hover:text-[#d4af37] transition-colors">SQL</span>
                </div>

                <div className="flex flex-col items-center gap-3 md:gap-4 group cursor-crosshair">
                  <div className="w-16 h-16 md:w-20 md:h-20 border border-[#333] bg-[#0a0a0a] flex items-center justify-center text-[#89dbca] group-hover:text-[#d4af37] group-hover:border-[#d4af37] transition-all duration-500">
                    <SiCplusplus size={28} className="md:w-8 md:h-8" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-[#89dbca] group-hover:text-[#d4af37] transition-colors">C++</span>
                </div>

                <div className="flex flex-col items-center gap-3 md:gap-4 group cursor-crosshair">
                  <div className="w-16 h-16 md:w-20 md:h-20 border border-[#333] bg-[#0a0a0a] flex items-center justify-center text-[#89dbca] group-hover:text-[#d4af37] group-hover:border-[#d4af37] transition-all duration-500">
                    <TbBrandCSharp size={28} className="md:w-8 md:h-8" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-[#89dbca] group-hover:text-[#d4af37] transition-colors">C#</span>
                </div>

                <div className="flex flex-col items-center gap-3 md:gap-4 group cursor-crosshair">
                  <div className="w-16 h-16 md:w-20 md:h-20 border border-[#333] bg-[#0a0a0a] flex items-center justify-center text-[#89dbca] group-hover:text-[#d4af37] group-hover:border-[#d4af37] transition-all duration-500">
                    <FaJava size={28} className="md:w-8 md:h-8" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-[#89dbca] group-hover:text-[#d4af37] transition-colors">Java</span>
                </div>

                <div className="flex flex-col items-center gap-3 md:gap-4 group cursor-crosshair">
                  <div className="w-16 h-16 md:w-20 md:h-20 border border-[#333] bg-[#0a0a0a] flex items-center justify-center text-[#89dbca] group-hover:text-[#d4af37] group-hover:border-[#d4af37] transition-all duration-500">
                    <SiLinux size={28} className="md:w-8 md:h-8" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-[#89dbca] group-hover:text-[#d4af37] transition-colors">Linux</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

      </div>
    </main>
  );
}