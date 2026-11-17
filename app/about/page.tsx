"use client";

import { useState, useRef, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import { SiLinux, SiGithub } from 'react-icons/si';
import { FaEnvelope, FaTimes, FaSearchPlus, FaSearchMinus, FaSyncAlt, FaCoffee, FaLinkedin, FaBars, FaChessRook } from 'react-icons/fa';

// ABOUT ME NODES
const mindNodes = [
  { id: 1, title: "Hakka Noodles", category: "Food", desc: "Gotta love me some Hakka Noodles. It's been a childhood favorite of mine for over a decade now.", x: 25, y: 30, z: 250, size: 24 },
  { id: 2, title: "Full-Stack & Bubbles", category: "Active Project", desc: "I love the full-stack engineering process—connecting intuitive UI design with robust backend schemas and session security. Currently building Bubbles, an alternative topic-centric social network.", x: 65, y: 20, z: -300, size: 28 },
  { id: 3, title: "Cybersecurity & Networks", category: "Career Focus", desc: "Having completed my B.S. in Computer Science, I am actively seeking Software Engineering roles with a strong interest in networking and cybersecurity. Understanding packet flow, defense-in-depth, and secure communication channels makes building web platforms even more rewarding.", x: 45, y: 50, z: 400, size: 36 },
  { id: 4, title: "Fighting Games", category: "Number One Time Sink", desc: "The number one hobby I like to do in my past time. Recognizing patterns, understanding spacing, timing, and frame data to defeat opponents. I love competitive atmospheres and competing in local tournaments.", x: 50, y: 30, z: 0, size: 44 },
  { id: 5, title: "Casual Sports", category: "Hobbies", desc: "Pretty much any sport I like to play for fun, something I gained an appreciation for as I got older. Right now I really enjoy playing table tennis and pool.", x: 75, y: 65, z: 100, size: 24 },
  { id: 6, title: "Battlestation", category: "Decor", desc: "I love browsing battlestations and getting inspiration to make my development setup ergonomic, clean, and inspiring.", x: 15, y: 80, z: -200, size: 16 },
  { id: 7, title: "Code Geass", category: "Shows", desc: "Probably my favorite show of all time. I watched it in middle school and till today, it's still one of my most favorite narratives.", x: 85, y: 10, z: -100, size: 20 },
  { id: 8, title: "Mangos", category: "Fruits", desc: "Can I get a mango ice cream with a mango smoothie with a mango fruit tea and a side of mango lassi? Never enough mango.", x: 30, y: 70, z: 150, size: 18 },
  { id: 9, title: "Tea", category: "Beverages", desc: "Tea > Coffee. Something about it is so relaxing, coffee just gets me too jittery. If I want to focus, I'll brew a good cup of chai.", x: 60, y: 40, z: 0, size: 16 },
  { id: 10, title: "Traveling & Hiking", category: "Hobbies", desc: "I love traveling to new places and hiking, especially in mountainous regions. Some favorite spots include: Pikes Peak, Yellowstone, Virginia Beach, and the Smoky Mountains.", x: 50, y: 75, z: -150, size: 22 },
  { id: 11, title: "Linux & Networking", category: "Systems & Security", desc: "Tinkering with Linux distros, terminal tools, and network configurations. Deepening my understanding of TCP/IP, DNS, socket programming, firewall rules, and POSIX system administration.", x: 20, y: 60, z: 200, size: 26 },
  { id: 12, title: "Strategy Games", category: "Game Preferences", desc: "I enjoy games that challenge you to think critically, balance resources, and plan ahead under changing conditions.", x: 70, y: 25, z: -50, size: 20 },
  { id: 13, title: "Web Foundations", category: "Origins", desc: "HTML was the first markup I learned back in high school. Bringing interfaces to life jump-started my journey into computer science and full-stack software development.", x: 40, y: 60, z: 300, size: 16 },
  { id: 14, title: "Film & Story Analysis", category: "Personality", desc: "I have an analytical eye when it comes to shows and movies. I love breaking down character arcs, cinematography, and narrative pacing.", x: 80, y: 50, z: -300, size: 18 },
  { id: 15, title: "Volleyball", category: "Sports", desc: "If I could name one sport I wish I had played earlier, it would be volleyball. Huge respect for the athleticism, court communication, and timing required.", x: 55, y: 85, z: 50, size: 22 },
  { id: 16, title: "Landscape Photography", category: "Hobbies", desc: "I enjoy capturing nature and dramatic landscapes during my travels. Super selective about lighting, composition, and natural geometry.", x: 25, y: 50, z: -250, size: 16 },
];

const emberParticles = [
  { left: '5%', delay: '0.2s', dur: '6s', size: 'w-2 h-2', sway: '20px', type: 'cyan' }, { left: '12%', delay: '3.1s', dur: '5.5s', size: 'w-3 h-3', sway: '-25px', type: 'gold' },
  { left: '18%', delay: '1.5s', dur: '7s', size: 'w-2 h-2', sway: '15px', type: 'cyan' }, { left: '25%', delay: '4.2s', dur: '6.2s', size: 'w-2 h-2', sway: '-20px', type: 'gold' },
  { left: '32%', delay: '0.8s', dur: '5.8s', size: 'w-3 h-3', sway: '30px', type: 'cyan' }, { left: '40%', delay: '2.5s', dur: '6.5s', size: 'w-2 h-2', sway: '-15px', type: 'gold' },
  { left: '48%', delay: '1.1s', dur: '5.2s', size: 'w-2 h-2', sway: '25px', type: 'cyan' }, { left: '55%', delay: '3.8s', dur: '6.8s', size: 'w-3 h-3', sway: '-30px', type: 'gold' },
  { left: '62%', delay: '0.5s', dur: '5.9s', size: 'w-2 h-2', sway: '20px', type: 'cyan' }, { left: '70%', delay: '2.9s', dur: '6.1s', size: 'w-2 h-2', sway: '-25px', type: 'gold' },
  { left: '78%', delay: '1.8s', dur: '5.6s', size: 'w-3 h-3', sway: '15px', type: 'cyan' }, { left: '85%', delay: '4.5s', dur: '6.4s', size: 'w-2 h-2', sway: '-20px', type: 'gold' },
  { left: '92%', delay: '0.3s', dur: '7.2s', size: 'w-2 h-2', sway: '30px', type: 'cyan' }, { left: '98%', delay: '2.2s', dur: '5.7s', size: 'w-3 h-3', sway: '-15px', type: 'gold' },
];

export default function About() {
  const [activeNode, setActiveNode] = useState(mindNodes[2]); // Starts focused on Node 3 (Cybersecurity & Networks)
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [view, setView] = useState({ panX: 0, panY: 0, rotX: 35, rotY: -15, zoom: 1.2 });
  const [isDragging, setIsDragging] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const dragInfo = useRef({ active: false, startX: 0, startY: 0, startView: view, isRotating: false, isPanning: false });

  // Mouse Tracking for HUD Reticle
  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX - window.innerWidth / 2, y: e.clientY - window.innerHeight / 2 });
    };
    window.addEventListener('mousemove', handleGlobalMove);
    return () => window.removeEventListener('mousemove', handleGlobalMove);
  }, []);

  // 3D INTERACTIVE CONTROLS
  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as Element).closest('.ui-layer') || (e.target as Element).closest('.node-layer')) return;
    dragInfo.current = {
      active: true, startX: e.clientX, startY: e.clientY, startView: view,
      isRotating: e.button === 0 && !e.shiftKey,
      isPanning: e.button === 2 || (e.button === 0 && e.shiftKey)
    };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragInfo.current.active) return;
    const deltaX = e.clientX - dragInfo.current.startX;
    const deltaY = e.clientY - dragInfo.current.startY;

    if (dragInfo.current.isRotating) {
      setView(prev => ({
        ...prev,
        rotX: Math.max(-80, Math.min(80, dragInfo.current.startView.rotX - deltaY * 0.4)),
        rotY: dragInfo.current.startView.rotY + deltaX * 0.4
      }));
    } else if (dragInfo.current.isPanning) {
      setView(prev => ({
        ...prev, panX: dragInfo.current.startView.panX + deltaX, panY: dragInfo.current.startView.panY + deltaY
      }));
    }
  };

  const handlePointerUp = () => { dragInfo.current.active = false; setIsDragging(false); };
  const handleWheel = (e: React.WheelEvent) => {
    if ((e.target as Element).closest('.ui-layer')) return;
    setView(prev => ({ ...prev, zoom: Math.min(Math.max(prev.zoom - e.deltaY * 0.002, 0.4), 3) }));
  };

  const resetViewport = () => setView({ panX: 0, panY: 0, rotX: 35, rotY: -15, zoom: 1.2 });

  return (
    <main className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-[#89dbca] selection:text-[#0a0a0a] overflow-hidden relative">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes draw-hud { from { stroke-dashoffset: 4000; stroke-dasharray: 4000; } to { stroke-dashoffset: 0; stroke-dasharray: 4000; } }
        @keyframes hud-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes ember-rise {
          0% { transform: translateY(100vh) translateX(0px) scale(1); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 0.9; }
          100% { transform: translateY(-40vh) translateX(var(--sway)) scale(0.5); opacity: 0; }
        }
        @keyframes energy-flame {
          0%, 100% { opacity: 0.5; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(1.15); }
        }
        @keyframes tv-blink {
          0% { transform: scaleX(0) scaleY(0.005); opacity: 0; filter: brightness(10); }
          30% { transform: scaleX(1) scaleY(0.005); opacity: 1; filter: brightness(5); }
          50% { transform: scaleX(1) scaleY(0.005); opacity: 1; filter: brightness(5); }
          100% { transform: scaleX(1) scaleY(1); opacity: 1; filter: brightness(1); }
        }
        
        @keyframes drift-1 {
          0%, 100% { transform: translate(0px, 0px); }
          33% { transform: translate(15px, -25px); }
          66% { transform: translate(-25px, 15px); }
        }
        @keyframes drift-2 {
          0%, 100% { transform: translate(0px, 0px); }
          33% { transform: translate(-30px, 15px); }
          66% { transform: translate(20px, -20px); }
        }
        @keyframes drift-3 {
          0%, 100% { transform: translate(0px, 0px); }
          33% { transform: translate(20px, 25px); }
          66% { transform: translate(-15px, -30px); }
        }

        .hud-line-draw { animation: draw-hud 1.2s cubic-bezier(0.1, 0.8, 0.2, 1) forwards; }
        .hud-spin { animation: spin-slow 15s linear infinite; transform-origin: 0px 0px; }
        .hud-fade-in { animation: hud-fade 1s ease-out 0.5s forwards; opacity: 0; }
        .ember-anim { animation: ember-rise linear infinite; }
        .animate-tv-blink { animation: tv-blink 0.4s cubic-bezier(0.8, 0, 0.2, 1) forwards; transform-origin: center; }
        
        .animate-drift-1 { animation: drift-1 14s ease-in-out infinite; transform-style: preserve-3d; }
        .animate-drift-2 { animation: drift-2 17s ease-in-out infinite; transform-style: preserve-3d; }
        .animate-drift-3 { animation: drift-3 19s ease-in-out infinite; transform-style: preserve-3d; }

        .scanlines { background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(137, 219, 202, 0.35) 50%, rgba(137, 219, 202, 0.35)); background-size: 100% 4px; }
        .holo-panel { background: rgba(137, 219, 202, 0.2); border: 1px solid rgba(137, 219, 202, 0.6); border-left: 3px solid #89dbca; border-right: 3px solid #89dbca; box-shadow: inset 0 0 40px rgba(137,219,202,0.3), 0 0 25px rgba(137,219,202,0.4); backdrop-filter: blur(12px); }

        .hex-grid-bg {
          background-image: 
            linear-gradient(30deg, #111 12%, transparent 12.5%, transparent 87%, #111 87.5%, #111),
            linear-gradient(150deg, #111 12%, transparent 12.5%, transparent 87%, #111 87.5%, #111),
            linear-gradient(30deg, #111 12%, transparent 12.5%, transparent 87%, #111 87.5%, #111),
            linear-gradient(150deg, #111 12%, transparent 12.5%, transparent 87%, #111 87.5%, #111),
            radial-gradient(circle at center, #89dbca 1px, transparent 1px);
          background-size: 60px 104px, 60px 104px, 60px 104px, 60px 104px, 60px 60px; background-position: 0 0, 0 0, 30px 52px, 30px 52px, 0 0; opacity: 0.1;
        }
      `}} />

      {/* BACKGROUND ENVIRONMENT */}
      <div className="absolute inset-0 hex-grid-bg pointer-events-none"></div>
      <div className="absolute inset-0 z-[40] pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.95)]"></div>
      <div className="absolute bottom-0 left-0 w-full h-[80vh] z-[15] pointer-events-none" style={{ background: 'radial-gradient(ellipse at bottom, rgba(137, 219, 202, 0.25) 0%, rgba(163, 249, 185, 0.1) 50%, transparent 80%)', animation: 'energy-flame 5s ease-in-out infinite', transformOrigin: 'bottom' }}></div>

      {/* Sparks Array */}
      <div className="absolute inset-0 z-[22] pointer-events-none overflow-hidden">
        {emberParticles.map((ember, i) => {
          const isGold = ember.type === 'gold';
          const bgClass = isGold ? 'bg-[#F5D15F]' : 'bg-[#87e8c1]';
          const shadowClass = isGold ? '0 0 12px 3px rgba(245, 209, 95, 0.9), 0 0 24px 6px rgba(245, 209, 95, 0.5)' : '0 0 12px 3px rgba(135, 232, 193, 0.9), 0 0 24px 6px rgba(137, 219, 202, 0.5)';
          return <div key={`ember-${i}`} className={`absolute bottom-[-20px] rounded-full ember-anim ${ember.size} ${bgClass}`} style={{ left: ember.left, animationDelay: ember.delay, animationDuration: ember.dur, '--sway': ember.sway, boxShadow: shadowClass } as React.CSSProperties}></div>;
        })}
      </div>

      {/* --- HUD: ALWAYS RENDERED --- */}
      <div key={`hud-bg-${activeNode.id}`} className="absolute inset-0 z-[24] pointer-events-none flex items-center justify-center mix-blend-screen overflow-hidden">
        <div style={{ transform: `translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px)`, transition: 'transform 0.5s ease-out', width: '100%', height: '100%' }}>
          <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full opacity-60" style={{ filter: 'drop-shadow(0 0 15px #F5D15F)' }}>
            <path d="M 500 150 L 750 850 L 960 1000 L 1170 850 L 1420 150" fill="none" stroke="#F5D15F" strokeWidth="4" className="hud-line-draw" />
            <path d="M 500 150 L 300 400 L 300 800" fill="none" stroke="#F5D15F" strokeWidth="2" strokeDasharray="15 10" className="hud-line-draw" />
            <path d="M 1420 150 L 1620 400 L 1620 800" fill="none" stroke="#F5D15F" strokeWidth="2" strokeDasharray="15 10" className="hud-line-draw" />
          </svg>
        </div>
      </div>

      <div key={`hud-reticle-${activeNode.id}`} className="fixed inset-0 z-[25] pointer-events-none flex items-center justify-center mix-blend-screen overflow-hidden">
        <div className="absolute scale-75 md:scale-100" style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`, transition: 'transform 0.3s ease-out' }}>
          <svg width="600" height="600" viewBox="-300 -300 600 600" className="opacity-80" style={{ filter: 'drop-shadow(0 0 12px #F5D15F)' }}>
            <path d="M -160 180 L 0 310 L 160 180" fill="none" stroke="#A3F9B9" strokeWidth="2" strokeDasharray="10 10" className="hud-line-draw" />
            <circle cx="0" cy="0" r="150" fill="none" stroke="#F5D15F" strokeWidth="1.5" className="hud-line-draw" opacity="0.4" />
          </svg>
        </div>
        <div className="absolute scale-75 md:scale-100" style={{ transform: `translate(${mousePos.x * 0.85}px, ${mousePos.y * 0.85}px)`, transition: 'transform 0.15s ease-out' }}>
          <svg width="600" height="600" viewBox="-300 -300 600 600" className="opacity-90" style={{ filter: 'drop-shadow(0 0 10px #A3F9B9)' }}>
            <circle cx="0" cy="0" r="100" fill="none" stroke="#A3F9B9" strokeWidth="2" strokeDasharray="30 15" className="hud-spin" />
            <path d="M -210 -90 L -250 -90 L -250 -50" fill="none" stroke="#A3F9B9" strokeWidth="3" className="hud-line-draw" />
            <path d="M 210 -90 L 250 -90 L 250 -50" fill="none" stroke="#A3F9B9" strokeWidth="3" className="hud-line-draw" />
            <path d="M -210 90 L -250 90 L -250 50" fill="none" stroke="#A3F9B9" strokeWidth="3" className="hud-line-draw" />
            <path d="M 210 90 L 250 90 L 250 50" fill="none" stroke="#A3F9B9" strokeWidth="3" className="hud-line-draw" />
          </svg>
        </div>
        <div className="absolute scale-75 md:scale-100" style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)`, transition: 'transform 0.05s linear' }}>
          <svg width="100" height="100" viewBox="-50 -50 100 100" style={{ filter: 'drop-shadow(0 0 12px #A3F9B9)' }}>
            <path d="M -20 0 L 20 0 M 0 -20 L 0 20" stroke="#A3F9B9" strokeWidth="3" className="hud-fade-in" />
          </svg>
        </div>
      </div>

      {/* --- UI STATIC LAYER --- */}
      <div className="ui-layer">
        <Navbar />

        <div className="absolute left-6 md:left-12 bottom-12 z-30 pointer-events-none">
          <h2 className="text-[#F5D15F] text-[10px] md:text-xs font-bold tracking-widest uppercase mb-1">Neural Matrix</h2>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-[0.85] text-white uppercase">
            Inside<br/><span className="text-[#A3F9B9]">My Mind</span>
          </h1>
          <div className="mt-3 md:mt-4 border border-[#F5D15F]/30 bg-[#111] p-2 md:p-3 rounded-lg inline-block pointer-events-auto">
            <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest font-bold">Active Nodes: <span className="text-[#A3F9B9] ml-1 md:ml-2 text-sm md:text-base">{mindNodes.length}</span></p>
          </div>
        </div>

        <div className="absolute right-6 md:right-8 bottom-12 z-30 flex flex-col gap-2 bg-[#111]/80 backdrop-blur border border-[#A3F9B9]/30 rounded-lg p-2 shadow-[0_0_15px_rgba(163,249,185,0.1)] pointer-events-auto">
          <button onClick={() => setView(prev => ({...prev, zoom: Math.min(prev.zoom + 0.2, 3)}))} className="text-gray-400 hover:text-[#A3F9B9] transition-all p-1" title="Zoom In"><FaSearchPlus size={16} /></button>
          <button onClick={() => setView(prev => ({...prev, zoom: Math.max(prev.zoom - 0.2, 0.4)}))} className="text-gray-400 hover:text-[#A3F9B9] transition-all p-1" title="Zoom Out"><FaSearchMinus size={16} /></button>
          <button onClick={resetViewport} className="text-gray-400 hover:text-[#F5D15F] transition-all p-1 border-t border-[#333] mt-1 pt-2" title="Reset View"><FaSyncAlt size={14} /></button>
        </div>
      </div>

      {/* --- 3D INTERACTIVE VIEWPORT ENGINE --- */}
      <div 
        className="absolute inset-0 z-20 overflow-hidden cursor-crosshair active:cursor-move touch-none"
        style={{ perspective: '1200px' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={handleWheel}
        onContextMenu={e => e.preventDefault()}
      >
        <div 
          className="absolute top-1/2 left-1/2 w-full h-full"
          style={{ 
            transform: `translate(-50%, -50%) translate(${view.panX}px, ${view.panY}px) scale(${view.zoom}) rotateX(${view.rotX}deg) rotateY(${view.rotY}deg)`,
            transformStyle: 'preserve-3d',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
          }}
        >

          {/* 3D BILLBOARD ENERGY CORES */}
          {mindNodes.map((node, index) => {
            const isActive = activeNode.id === node.id;
            const driftClass = `animate-drift-${(index % 3) + 1}`;
            
            return (
              <div 
                key={node.id}
                className="absolute pointer-events-none"
                style={{ 
                  top: `${node.y}%`, left: `${node.x}%`, 
                  transform: `translate(-50%, -50%) translateZ(${node.z}px)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className={`pointer-events-none ${driftClass}`} style={{ transformStyle: 'preserve-3d' }}>
                  
                  <button
                    className="node-layer pointer-events-auto flex items-center justify-center relative group cursor-crosshair transition-transform duration-300 hover:scale-125"
                    onPointerDown={(e) => {
                      e.stopPropagation(); 
                      setActiveNode(node);
                      setIsPanelOpen(true);
                    }}
                    style={{
                      width: node.size, height: node.size,
                      transform: `rotateY(${-view.rotY}deg) rotateX(${-view.rotX}deg)`,
                      transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                    }}
                  >
                    <div className={`w-full h-full rounded-full transition-all duration-500 ${isActive ? 'bg-[#F5D15F] shadow-[0_0_20px_#F5D15F]' : 'bg-[#89dbca]/80 group-hover:bg-[#89dbca] shadow-[0_0_15px_#89dbca]'}`}>
                        {isActive && <div className="absolute inset-[-6px] rounded-full border border-[#F5D15F] animate-ping opacity-60"></div>}
                    </div>

                    <span 
                      className={`absolute -top-6 text-[8px] md:text-[10px] font-bold tracking-widest uppercase whitespace-nowrap transition-all duration-300 pointer-events-none ${isActive ? 'text-[#F5D15F]' : 'text-[#89dbca]/80 group-hover:text-white'}`}
                    >
                      {node.title}
                    </span>
                  </button>
                  
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- TV BLINK DATA PANEL --- */}
      {isPanelOpen && (
        <div key={`panel-${activeNode.id}`} className="ui-layer absolute left-6 right-6 md:left-auto md:right-16 top-24 md:top-1/2 md:-translate-y-1/2 md:w-96 z-30 pointer-events-none">
          
          <div className="flex justify-end items-end gap-2 mb-2 pointer-events-auto hidden md:flex">
            <div className="flex flex-col items-end">
              <span className="text-[#89dbca] text-[10px] font-bold tracking-[0.2em] uppercase">Target Locked</span>
              <span className="text-white text-3xl font-black leading-none uppercase">
                {activeNode.title}
              </span>
            </div>
          </div>

          <div className="relative holo-panel p-4 md:p-6 pointer-events-auto rounded-xl animate-tv-blink">
            <div className="absolute inset-0 scanlines pointer-events-none rounded-xl mix-blend-overlay opacity-80 z-10"></div>
            
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#89dbca] rounded-tl-xl"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#89dbca] rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#89dbca] rounded-bl-xl"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#89dbca] rounded-br-xl"></div>

            <button onClick={() => setIsPanelOpen(false)} className="absolute top-3 right-3 z-20 text-white hover:text-[#87e8c1] transition-all cursor-crosshair">
              <FaTimes size={16} />
            </button>

            <div className="relative z-20 flex gap-4 md:gap-5 items-start">
              <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 rounded bg-[#0a0a0a]/40 border border-[#89dbca]/80 flex items-center justify-center backdrop-blur">
                <span className="text-[#87e8c1] font-mono font-black text-lg md:text-xl">
                  N{activeNode.id.toString().padStart(2, '0')}
                </span>
              </div>
              
              <div className="pt-1 pr-4">
                <h4 className="text-[10px] text-white font-bold tracking-widest uppercase mb-1 md:mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#87e8c1] rounded-full animate-pulse"></span>
                  {activeNode.category}
                </h4>
                <p className="text-xs md:text-sm text-gray-100 leading-relaxed font-mono">
                  {activeNode.desc}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-2 px-2 pointer-events-auto">
             <span className="text-[#89dbca] text-[8px] md:text-[10px] font-mono tracking-widest">SYS.OP: ONLINE</span>
             <div className="flex gap-1">
                <span className="w-6 md:w-8 h-1 bg-[#89dbca]"></span>
                <span className="w-2 h-1 bg-[#89dbca]"></span>
             </div>
          </div>

        </div>
      )}

    </main>
  );
}
