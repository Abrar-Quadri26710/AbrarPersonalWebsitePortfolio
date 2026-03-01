"use client";

import { useState, useEffect, useRef } from 'react';
import { SiLinux, SiGithub } from 'react-icons/si';
import { FaEnvelope, FaLinkedin, FaCoffee, FaPlay, FaVolumeUp, FaVolumeMute, FaBars, FaTimes, FaChessRook } from 'react-icons/fa';

// Relax Page

const prompts = [
  { 
    id: 1, 
    text: "Welcome to the digital lounge. How are you feeling today?", 
    choices: [
      { label: "I'm doing well.", response: "I'm glad to hear that. You are more than welcome to relax here for as long as you'd like. The ambiance is set." }, 
      { label: "It's been a long day.", response: "I understand. Entropy takes its toll. You are more than welcome to relax here for as long as you'd like. Let the noise fade." },
      { label: "Just passing through.", response: "Understood. Whether for a moment or an hour, you are more than welcome to relax here. The ambiance is set." }
    ] 
  }
];

export default function Relax() {
  // Simplified State Engine
  const [dialogue, setDialogue] = useState({ 
    speaker: "SYSTEM", 
    text: "Incoming external connection detected... Granting guest access to the sanctuary.", 
    type: "BOOT", 
    choices: null as any 
  });
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCozyMode, setIsCozyMode] = useState(false);

  // Typing Effect
  useEffect(() => {
    let i = 0;
    setIsTyping(true);
    setDisplayedText(""); 
    const textToType = dialogue.text;
    const typingInterval = setInterval(() => {
      i++;
      setDisplayedText(textToType.slice(0, i)); 
      if (i >= textToType.length) { 
        clearInterval(typingInterval); 
        setIsTyping(false); 
      }
    }, 35); 
    return () => clearInterval(typingInterval);
  }, [dialogue]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) audioRef.current.pause();
      else { audioRef.current.volume = 0.4; audioRef.current.play(); }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const handleAdvance = () => {
    if (isTyping || dialogue.choices || dialogue.type === "END") return;

    // Trigger Fire
    if (!isMusicPlaying && audioRef.current && dialogue.type === "BOOT") {
      audioRef.current.volume = 0.4; 
      audioRef.current.play().then(() => {
        setIsMusicPlaying(true);
        setIsCozyMode(true); 
      }).catch((e) => {
        console.log("Audio blocked.", e);
        setIsCozyMode(true); 
      });
    }

    let nextType = "", nextText = "", nextChoices = null;
    
    //Ask how they are doing
    if (dialogue.type === "BOOT") { 
      nextType = "PROMPT"; 
      nextText = prompts[0].text; 
      nextChoices = prompts[0].choices;
    } 
    // After they respond, permanently conclude the session
    else if (dialogue.type === "RESPONSE") {
      nextType = "END";
      setIsTyping(true);
      setDialogue({ 
        speaker: "SYSTEM", 
        text: "Sanctuary doors unlocked. Terminal is now in permanent idle mode. Rest well.", 
        type: "END", 
        choices: null 
      });
      return;
    }

    setIsTyping(true);
    setDialogue({ speaker: "HOSTESS", text: nextText, type: nextType, choices: nextChoices });
  };

  const handleChoice = (choice: any) => {
    setIsTyping(true);
    // When they click a choice, show the Hostess's response
    setDialogue({ speaker: "HOSTESS", text: choice.response, type: "RESPONSE", choices: null });
  };

  // Dynamic Theme Colors
  const hostessColor = isCozyMode ? 'text-[#FFD59E]' : 'text-[#A3F9B9]';
  const guestColor = isCozyMode ? 'text-[#FFB76B]' : 'text-[#F5D15F]';
  const guestBorder = isCozyMode ? 'border-[#FFB76B]' : 'border-[#F5D15F]';

  return (
    <main className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-[#F5D15F] selection:text-[#0a0a0a] overflow-hidden relative flex flex-col justify-end">
      <audio ref={audioRef} src="/lounge.mp3" loop />
      
      {/* Background Color Shift */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, #0a1a14 0%, #050505 50%, #050505 100%)', opacity: isCozyMode ? 0 : 0.8, transition: 'opacity 4s ease-in-out' }}></div>
     
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 45%, #8c3a15 0%, #4a1c09 50%, #260e04 100%)', opacity: isCozyMode ? 1 : 0, transition: 'opacity 4s ease-in-out' }}></div>


      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#A3F9B9 1px, transparent 1px)', backgroundSize: '100px 100px', opacity: isCozyMode ? 0 : 0.3, transition: 'opacity 4s ease-in-out' }}></div>

      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#FFD59E 1px, transparent 1px)', backgroundSize: '100px 100px', opacity: isCozyMode ? 0.25 : 0, transition: 'opacity 4s ease-in-out' }}></div>

    
      <nav 
        className="absolute top-0 w-full z-50 border-b transition-colors duration-[4000ms] backdrop-blur-md pointer-events-auto"
        style={{ backgroundColor: isCozyMode ? 'rgba(38, 14, 4, 0.6)' : 'rgba(5, 5, 5, 0.6)', borderColor: isCozyMode ? 'rgba(140, 58, 21, 0.3)' : 'rgba(34, 34, 34, 1)' }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-16 h-20 flex items-center justify-between">
          <a href="/" className={`font-bold tracking-widest text-sm uppercase flex items-center gap-3 transition-colors cursor-crosshair relative z-50 ${isCozyMode ? 'text-[#FFD59E] hover:text-white' : 'text-white hover:text-[#F5D15F]'}`}>
            <FaChessRook className={`transition-colors duration-[4000ms] ${hostessColor}`} size={20} /> A. Quadri
          </a>
          
          <div className="hidden md:flex gap-10 text-xs font-bold tracking-widest uppercase text-gray-500">
            <a href="/" className="hover:text-white transition-colors cursor-crosshair">Profile</a>
            <a href="/about" className="hover:text-white transition-colors cursor-crosshair">About</a>
            <a href="/projects" className="hover:text-white transition-colors cursor-crosshair">Projects</a>
            <a href="/relax" className={`transition-all duration-[4000ms] cursor-crosshair flex items-center gap-2 ${guestColor}`} style={{ filter: isCozyMode ? 'drop-shadow(0 0 8px #FFD59E)' : 'drop-shadow(0 0 8px #F5D15F)' }}>
              <FaCoffee size={12} /> Relax
            </a>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6 text-gray-400 relative z-50">
            <button onClick={toggleMusic} className={`mr-2 md:mr-4 transition-all duration-1000 cursor-crosshair ${isMusicPlaying ? hostessColor : 'text-gray-600 hover:text-gray-400'}`} style={{ filter: isMusicPlaying ? (isCozyMode ? 'drop-shadow(0 0 8px #FFD59E)' : 'drop-shadow(0 0 8px #A3F9B9)') : 'none' }} title={isMusicPlaying ? "Mute Ambience" : "Play Ambience"}>
              {isMusicPlaying ? <FaVolumeUp size={18} /> : <FaVolumeMute size={18} />}
            </button>
            <div className={`w-[1px] h-4 mr-1 md:mr-2 transition-colors duration-[4000ms]`} style={{ backgroundColor: isCozyMode ? 'rgba(140, 58, 21, 0.5)' : '#333' }}></div>
            <a href="https://github.com/Abrar-Quadri26710" target="_blank" rel="noreferrer" className="hidden sm:block hover:text-white transition-colors cursor-crosshair"><SiGithub size={18} /></a>
            <a href="https://www.linkedin.com/in/abrar-quadri-03b946317/" target="_blank" rel="noreferrer" className="hidden sm:block hover:text-white transition-colors cursor-crosshair"><FaLinkedin size={18} /></a>
            <a href="mailto:mirrowdin@gmail.com" className="hidden sm:block hover:text-white transition-colors cursor-crosshair"><FaEnvelope size={18} /></a>
            <button className="md:hidden text-gray-400 hover:text-white transition-colors ml-2 cursor-crosshair" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        <div className={`md:hidden absolute top-20 left-0 w-full backdrop-blur-xl border-b transition-all duration-[4000ms] overflow-hidden ${mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 border-transparent"}`} style={{ backgroundColor: isCozyMode ? 'rgba(38, 14, 4, 0.95)' : 'rgba(5, 5, 5, 0.95)', borderColor: isCozyMode ? 'rgba(140, 58, 21, 0.3)' : 'rgba(34, 34, 34, 1)' }}>
          <div className="flex flex-col items-center py-6 gap-6 text-xs font-bold tracking-widest uppercase text-gray-500">
            <a href="/" className="hover:text-white transition-colors">Profile</a>
            <a href="/about" className="hover:text-white transition-colors">About</a>
            <a href="/projects" className="hover:text-white transition-colors">Projects</a>
            <a href="/relax" className={`${guestColor} transition-colors flex items-center gap-2`}><FaCoffee size={12} /> Relax</a>
          </div>
        </div>
      </nav>

      {/* ORB */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none scale-75 md:scale-100 mt-10 md:mt-0">
         <div 
            className={`w-32 h-32 rounded-full flex items-center justify-center border transition-all duration-[4000ms] ease-in-out`}
            style={{
                backgroundColor: dialogue.speaker === 'HOSTESS' ? (isCozyMode ? 'rgba(255,213,158,0.15)' : 'rgba(163,249,185,0.1)') : 'rgba(31,41,55,0.1)',
                borderColor: dialogue.speaker === 'HOSTESS' ? (isCozyMode ? 'rgba(255,213,158,0.5)' : 'rgba(163,249,185,0.5)') : 'rgba(55,65,81,0.3)',
                boxShadow: dialogue.speaker === 'HOSTESS' ? (isCozyMode ? '0 0 120px 20px rgba(255,183,107,0.3)' : '0 0 80px rgba(163,249,185,0.4)') : '0 0 30px rgba(255,255,255,0.05)',
                animation: dialogue.speaker === 'HOSTESS' ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none'
            }}
         >
            <div 
                className="w-16 h-16 rounded-full transition-all duration-[4000ms] ease-in-out"
                style={{
                    backgroundColor: dialogue.speaker === 'HOSTESS' ? (isCozyMode ? '#FFD59E' : '#F5D15F') : '#4B5563',
                    boxShadow: dialogue.speaker === 'HOSTESS' ? (isCozyMode ? '0 0 40px #FFD59E' : '0 0 30px #F5D15F') : 'none'
                }}
            ></div>
         </div>
         <div className="mt-8 flex gap-1 items-end h-8 opacity-50">
            {[1,2,3,4,5,4,3,2,1].map((bar, i) => (
                <div key={i} className="w-1 transition-all duration-[4000ms]" style={{ backgroundColor: isCozyMode ? '#FFD59E' : '#A3F9B9', height: dialogue.speaker === 'HOSTESS' && isTyping ? `${Math.random() * 100}%` : `${bar * 4}px`, animation: dialogue.speaker === 'HOSTESS' && !isTyping ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none' }}></div>
            ))}
         </div>
      </div>

      {/* Dialouge UI */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 md:px-8 mb-8 md:mb-12">
        
        {/* Choice Buttons */}
        {!isTyping && dialogue.choices && (
          <div className="flex flex-col gap-3 items-end mb-6 animate-fade-in">
            {dialogue.choices.map((choice: any, index: number) => (
              <button 
                key={index} 
                onClick={() => handleChoice(choice)} 
                className={`group relative border py-3 px-6 rounded-lg text-right overflow-hidden transition-all duration-[2000ms] cursor-crosshair border-opacity-50 hover:border-opacity-100 ${guestBorder}`}
                style={{ backgroundColor: isCozyMode ? 'rgba(50, 20, 10, 0.7)' : 'rgba(10, 10, 10, 0.9)' }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: isCozyMode ? 'linear-gradient(to right, transparent, rgba(255,183,107,0.15))' : 'linear-gradient(to right, transparent, rgba(245,209,95,0.1))' }}></div>
                <span className="relative z-10 text-xs md:text-sm font-bold text-gray-200 group-hover:text-white transition-colors">{choice.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Main Dialogue Panel */}
        <div 
            onClick={handleAdvance} 
            className={`relative rounded-lg p-5 md:p-8 backdrop-blur-md cursor-crosshair transition-all duration-[4000ms] shadow-[0_0_40px_rgba(0,0,0,0.5)] border-t-2 border-b-2`}
            style={{
                background: isCozyMode ? 'linear-gradient(to bottom, rgba(60, 25, 12, 0.85), rgba(30, 12, 5, 0.95))' : 'linear-gradient(to bottom, rgba(17,17,17,0.9), rgba(5,5,5,0.95))',
                borderColor: dialogue.speaker === 'HOSTESS' ? (isCozyMode ? '#FFB76B' : '#A3F9B9') : (isCozyMode ? '#8c3a15' : '#4B5563')
            }}
        >
          <div className="absolute inset-0 pointer-events-none opacity-50 rounded-lg transition-all duration-[4000ms]" style={{ backgroundImage: `linear-gradient(to bottom, transparent, transparent 50%, ${isCozyMode ? 'rgba(255,213,158,0.08)' : 'rgba(163,249,185,0.05)'} 50%, ${isCozyMode ? 'rgba(255,213,158,0.08)' : 'rgba(163,249,185,0.05)'})`, backgroundSize: '100% 4px' }}></div>

          <div className="absolute -top-3 md:-top-4 left-4 md:left-6 border px-3 md:px-4 py-1 rounded transition-colors duration-[4000ms]" style={{ backgroundColor: isCozyMode ? '#260e04' : '#0a0a0a', borderColor: isCozyMode ? '#5c250d' : '#333' }}>
            <span className={`text-[9px] md:text-[11px] font-black tracking-[0.2em] uppercase transition-colors duration-[4000ms]`} style={{ color: dialogue.speaker === 'HOSTESS' ? (isCozyMode ? '#FFD59E' : '#A3F9B9') : '#9CA3AF' }}>
                {dialogue.speaker}
            </span>
          </div>

          <div className="min-h-[70px] md:min-h-[80px] mt-2 md:mt-0">
            <p className="text-base md:text-xl text-gray-100 leading-relaxed font-serif relative z-10">{displayedText}</p>
          </div>

          {!isTyping && !dialogue.choices && dialogue.type !== "END" && (
             <div className={`absolute bottom-4 right-4 md:right-6 animate-bounce transition-colors duration-[4000ms] ${guestColor}`}><FaPlay size={10} className="md:w-3 md:h-3" /></div>
          )}
        </div>
        
        <div className="mt-2 text-center h-4">
            <span className="text-[8px] md:text-[9px] font-mono uppercase tracking-widest transition-all duration-[4000ms]" style={{ opacity: isTyping ? 0 : 1, color: isCozyMode ? '#b36b49' : '#4B5563' }}>
                {dialogue.choices ? "Awaiting your response..." : dialogue.type === "END" ? "Terminal is in idle mode." : "Click to continue"}
            </span>
        </div>
      </div>
    </main>
  );
}