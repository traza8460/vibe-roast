import React, { useState, useEffect, useRef } from 'react';
import { audioEngine } from '../services/audioEngine';
import { CROWD_TICKER_COMMENTS } from '../data/battlePresets';
import { Volume2, VolumeX, Flame, Sparkles, Disc, Radio } from 'lucide-react';

export default function HypeMeter({ hype, setHype, isBeatPlaying, toggleBeat }) {
  const [floatingParticles, setFloatingParticles] = useState([]);
  const [activeFx, setActiveFx] = useState(null);
  const [tickerIndex, setTickerIndex] = useState(0);

  // Keyboard shortcut: Spacebar to pump hype
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Avoid if user is currently typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.code === 'Space') {
        e.preventDefault();
        pumpHype();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hype]);

  // Decibel meter gradual decay over time
  useEffect(() => {
    const interval = setInterval(() => {
      setHype((prev) => Math.max(20, Math.floor(prev * 0.98)));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Crowd comments ticker rotation
  useEffect(() => {
    const tickerInterval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % CROWD_TICKER_COMMENTS.length);
    }, 4500);
    return () => clearInterval(tickerInterval);
  }, []);

  const pumpHype = () => {
    audioEngine.playHypeThump();
    setHype((prev) => Math.min(100, prev + 12));

    // Spawn floating particle
    const icons = ['🔥', '💀', '🎤', '⚡', '🤯', '+50 HYPE', '💥', '🚨'];
    const chosenIcon = icons[Math.floor(Math.random() * icons.length)];
    const id = Date.now() + Math.random();
    const xPos = 20 + Math.random() * 60; // 20% to 80%

    setFloatingParticles((prev) => [
      ...prev.slice(-8), // keep max 8
      { id, icon: chosenIcon, left: `${xPos}%` }
    ]);

    setTimeout(() => {
      setFloatingParticles((prev) => prev.filter((p) => p.id !== id));
    }, 1200);
  };

  const handleFx = (name, soundFunc) => {
    setActiveFx(name);
    soundFunc();
    setHype((prev) => Math.min(100, prev + 8));
    setTimeout(() => setActiveFx(null), 600);
  };

  // Compute decibel readout simulation
  const simulatedDb = (70 + (hype / 100) * 45).toFixed(1);

  return (
    <div className="relative w-full glass-panel-glow rounded-2xl p-4 sm:p-5 border border-purple-500/30 overflow-hidden shadow-2xl">
      {/* Floating particles container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {floatingParticles.map((p) => (
          <div
            key={p.id}
            className="absolute bottom-12 font-bold text-lg sm:text-2xl animate-float-fade transition-all duration-1000 transform -translate-x-1/2 drop-shadow-[0_0_8px_rgba(244,63,94,0.9)]"
            style={{ left: p.left }}
          >
            {p.icon}
          </div>
        ))}
      </div>

      {/* Top Header: Decibel Meter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30">
            <Flame className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase text-purple-300 font-bold tracking-wider flex items-center gap-2">
              Crowd Decibel Cheer Meter
              <span className="text-[10px] bg-purple-900/60 text-purple-200 px-1.5 py-0.5 rounded border border-purple-700/50">
                [SPACEBAR] to pump
              </span>
            </div>
            <div className="text-lg sm:text-xl font-arcade font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-300">
              {simulatedDb} dB <span className="text-xs text-slate-400 font-normal">/ 115 dB MAX</span>
            </div>
          </div>
        </div>

        {/* Pump Hype Action Button */}
        <button
          onClick={pumpHype}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-arcade font-bold text-sm bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 hover:from-pink-500 hover:to-cyan-500 text-white shadow-lg shadow-pink-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 border border-pink-400/30 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 animate-spin text-yellow-300" />
          PUMP HYPE! (+12%)
        </button>
      </div>

      {/* Decibel Visual Gradient LED Meter */}
      <div className="w-full h-4 bg-slate-950/80 rounded-full p-0.5 border border-purple-500/20 mb-4 overflow-hidden relative">
        <div
          className="h-full rounded-full transition-all duration-200 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
          style={{ width: `${hype}%` }}
        />
        {/* Needle glow */}
        <div 
          className="absolute top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_10px_#ffffff] transition-all duration-200"
          style={{ left: `calc(${hype}% - 4px)` }}
        />
      </div>

      {/* Sound FX Triggers Pad */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-purple-900/30 pt-3">
        <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> Sound FX:
        </span>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Airhorn */}
          <button
            onClick={() => handleFx('airhorn', () => audioEngine.playAirhorn())}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all border ${
              activeFx === 'airhorn'
                ? 'bg-yellow-500 text-black border-yellow-300 scale-105 shadow-[0_0_15px_#eab308]'
                : 'bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
            }`}
          >
            📯 Airhorn
          </button>

          {/* Crowd Gasp */}
          <button
            onClick={() => handleFx('gasp', () => audioEngine.playCrowdGasp())}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all border ${
              activeFx === 'gasp'
                ? 'bg-pink-500 text-white border-pink-300 scale-105 shadow-[0_0_15px_#ec4899]'
                : 'bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 border-pink-500/30'
            }`}
          >
            😱 Gasp
          </button>

          {/* Crowd Boo */}
          <button
            onClick={() => handleFx('boo', () => audioEngine.playBoo())}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all border ${
              activeFx === 'boo'
                ? 'bg-red-500 text-white border-red-300 scale-105 shadow-[0_0_15px_#ef4444]'
                : 'bg-red-500/10 hover:bg-red-500/20 text-red-300 border-red-500/30'
            }`}
          >
            👎 Boo
          </button>

          {/* Applause */}
          <button
            onClick={() => handleFx('applause', () => audioEngine.playApplause())}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all border ${
              activeFx === 'applause'
                ? 'bg-emerald-500 text-white border-emerald-300 scale-105 shadow-[0_0_15px_#10b981]'
                : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
            }`}
          >
            👏 Clap
          </button>

          {/* Mic Drop */}
          <button
            onClick={() => handleFx('micdrop', () => audioEngine.playMicDrop())}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all border ${
              activeFx === 'micdrop'
                ? 'bg-cyan-500 text-black border-cyan-300 scale-105 shadow-[0_0_15px_#06b6d4]'
                : 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
            }`}
          >
            💥 Mic Drop
          </button>

          {/* Robot Chirp */}
          <button
            onClick={() => handleFx('chirp', () => audioEngine.playRobotChirp())}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all border ${
              activeFx === 'chirp'
                ? 'bg-pink-600 text-white border-pink-300 scale-105 shadow-[0_0_15px_#f43f5e]'
                : 'bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 border-pink-500/30'
            }`}
            title="Futuristic Robot Cyber Chirp"
          >
            🤖 Robot Chirp
          </button>

          {/* Laser Zap */}
          <button
            onClick={() => handleFx('laser', () => audioEngine.playLaser())}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all border ${
              activeFx === 'laser'
                ? 'bg-amber-500 text-black border-amber-300 scale-105 shadow-[0_0_15px_#f59e0b]'
                : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
            }`}
            title="Cyber Laser Zap"
          >
            ⚡ Laser
          </button>

          {/* Synth Beat Backing Track Toggle */}
          <button
            onClick={toggleBeat}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all border ${
              isBeatPlaying
                ? 'bg-purple-600 text-white border-purple-300 shadow-[0_0_15px_#a855f7]'
                : 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border-purple-500/30'
            }`}
            title="Toggle 808 Hip-Hop Beat"
          >
            <Disc className={`w-3.5 h-3.5 ${isBeatPlaying ? 'animate-spin' : ''}`} />
            {isBeatPlaying ? '808 Beat: ON' : '808 Beat: OFF'}
          </button>
        </div>
      </div>

      {/* Live Crowd Ticker */}
      <div className="mt-3 py-1.5 px-3 rounded-lg bg-black/40 border border-white/5 flex items-center gap-2 overflow-hidden">
        <span className="text-[10px] font-mono uppercase text-pink-400 font-bold shrink-0 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
          ARENA FEED:
        </span>
        <div className="text-xs font-mono text-slate-300 truncate transition-all duration-300">
          {CROWD_TICKER_COMMENTS[tickerIndex]}
        </div>
      </div>
    </div>
  );
}
