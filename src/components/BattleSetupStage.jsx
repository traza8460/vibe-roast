import React, { useState } from 'react';
import { ARCHETYPES, VIBE_MODES, AVATAR_OPTIONS } from '../data/battlePresets';
import { audioEngine } from '../services/audioEngine';
import { 
  Swords, Shuffle, Sparkles, ChevronRight, Zap, Flame, 
  Crown, Music2, Edit3, Check, Cpu, Terminal, Mic, Radio, Volume2 
} from 'lucide-react';

export default function BattleSetupStage({
  contender1,
  setContender1,
  contender2,
  setContender2,
  vibeMode,
  setVibeMode,
  onStartBattle,
  onOpenApiKeyModal,
  hasApiKey
}) {
  const [editingC1, setEditingC1] = useState(false);
  const [editingC2, setEditingC2] = useState(false);

  // Preset rivalry shortcuts
  const loadPresetPair = (archetype1Id, archetype2Id, vibeId) => {
    audioEngine.playClick();
    const a1 = ARCHETYPES.find((a) => a.id === archetype1Id);
    const a2 = ARCHETYPES.find((a) => a.id === archetype2Id);
    const vibe = VIBE_MODES.find((v) => v.id === vibeId) || VIBE_MODES[0];

    if (a1) setContender1({ ...a1 });
    if (a2) setContender2({ ...a2 });
    if (vibe) setVibeMode(vibe);
  };

  const randomizeMatchup = () => {
    audioEngine.playLaser?.() || audioEngine.playClick();
    const random1 = ARCHETYPES[Math.floor(Math.random() * ARCHETYPES.length)];
    let random2 = ARCHETYPES[Math.floor(Math.random() * ARCHETYPES.length)];
    while (random2.id === random1.id) {
      random2 = ARCHETYPES[Math.floor(Math.random() * ARCHETYPES.length)];
    }
    const randomVibe = VIBE_MODES[Math.floor(Math.random() * VIBE_MODES.length)];

    setContender1({ ...random1 });
    setContender2({ ...random2 });
    setVibeMode(randomVibe);
  };

  return (
    <div className="w-[90%] max-w-5xl mx-auto px-4 py-3 sm:py-5 flex flex-col gap-3.5 sm:gap-4 animate-fade-in relative z-10">
      {/* Top Banner / Headline */}
      <div className="text-center relative">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-arcade font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-300 tracking-tight glow-text-cyan leading-tight">
          VIBEROAST ARENA
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto font-sans font-light">
          Where human engineers clash with autonomous AI chatbots in 3 rounds of ruthless, rhyming rap roasts!
        </p>

        {/* Quick Rivalry Pills */}
        <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5">
          <span className="text-[11px] font-mono text-purple-300 font-bold mr-1 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-pink-400 animate-bounce" /> Featured Rivalries:
          </span>
          <button
            onClick={() => loadPresetPair('cs-engineer', 'prompt-bro', 'savage-tech')}
            className="px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold bg-cyan-950/50 hover:bg-cyan-900/70 text-cyan-300 border border-cyan-400/50 transition-all hover:scale-105 shadow-[0_0_10px_rgba(6,182,212,0.25)] cursor-pointer flex items-center gap-1"
          >
            <span>💻 CS Engineer</span>
            <span className="text-pink-400 font-extrabold">VS</span>
            <span>🤖 AI Chatbot</span>
          </button>
          <button
            onClick={() => loadPresetPair('dtu-hosteller', 'day-scholar', 'clean-college')}
            className="px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold bg-amber-950/50 hover:bg-amber-900/70 text-amber-300 border border-amber-400/50 transition-all hover:scale-105 shadow-[0_0_10px_rgba(245,158,11,0.25)] cursor-pointer flex items-center gap-1"
          >
            <span>🍜 DTU Hosteller</span>
            <span className="text-pink-400 font-extrabold">VS</span>
            <span>🎒 Day Scholar</span>
          </button>
          <button
            onClick={() => loadPresetPair('coffee-addict', 'redbull-fanatic', 'savage-tech')}
            className="px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold bg-pink-950/50 hover:bg-pink-900/70 text-pink-300 border border-pink-400/50 transition-all hover:scale-105 shadow-[0_0_10px_rgba(244,63,94,0.25)] cursor-pointer flex items-center gap-1"
          >
            <span>☕ Coffee Addict</span>
            <span className="text-cyan-400 font-extrabold">VS</span>
            <span>⚡ RedBull Fiend</span>
          </button>
          <button
            onClick={() => loadPresetPair('cs-engineer', 'backend-rust', 'shakespearean')}
            className="px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold bg-purple-950/50 hover:bg-purple-900/70 text-purple-300 border border-purple-400/50 transition-all hover:scale-105 shadow-[0_0_10px_rgba(168,85,247,0.25)] cursor-pointer flex items-center gap-1"
          >
            <span>📜 Shakespearean Diss</span>
          </button>
        </div>
      </div>

      {/* VS MATCHUP STAGE: Contender 1 vs Contender 2 */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 items-stretch">
        {/* Animated Central VS Badge & Enter Arena CTA Button */}
        <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex-col items-center">
          <button
            type="button"
            onClick={() => {
              audioEngine.playAirhorn();
              onStartBattle();
            }}
            className="relative group cursor-pointer focus:outline-none"
            title="Click to Enter Arena"
          >
            <div className="w-16 h-16 lg:w-18 lg:h-18 rounded-full bg-[#070710] border-2 border-pink-500 flex items-center justify-center shadow-[0_0_30px_#f43f5e] animate-pulse group-hover:scale-110 transition-transform">
              <Swords className="w-8 h-8 lg:w-9 lg:h-9 text-pink-400 transform group-hover:rotate-45 transition-transform" />
            </div>
            {/* Spinning decorative ring */}
            <div className="absolute -inset-2 border-2 border-cyan-400/50 rounded-full animate-spin border-t-transparent border-b-transparent pointer-events-none" />
          </button>

          <span className="font-arcade font-black text-xs lg:text-sm text-pink-400 mt-1.5 tracking-widest bg-black/90 px-3 py-0.5 rounded-full border border-pink-500/50 shadow-[0_0_12px_#f43f5e]">
            VS
          </span>

          {/* Pulsing Neon ENTER THE ARENA CTA Button below VS */}
          <button
            id="btn-enter-arena-center"
            type="button"
            onClick={() => {
              audioEngine.playAirhorn();
              onStartBattle();
            }}
            className="mt-2.5 px-4 py-2 lg:px-5 lg:py-2.5 rounded-2xl font-arcade font-black text-xs lg:text-sm tracking-wider uppercase bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:from-pink-400 hover:to-cyan-400 text-white shadow-[0_0_25px_rgba(244,63,94,0.85)] border-2 border-pink-300/80 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer animate-pulse whitespace-nowrap"
            title="Enter Arena & Start Round 1"
          >
            <Zap className="w-4 h-4 text-amber-300 animate-bounce" />
            ENTER THE ARENA
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* CONTENDER 1 CARD (CYAN NEON - HUMAN ENGINEER) */}
        <div className="glass-panel-glow rounded-3xl p-4 sm:p-6 border-2 border-cyan-400/60 relative overflow-hidden flex flex-col justify-between shadow-[0_0_30px_rgba(6,182,212,0.25)] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-300">
          {/* Top Spotlight & Matrix Code background */}
          <div className="absolute top-0 left-0 right-0 h-20 spotlight-cyan opacity-40 pointer-events-none" />
          <div className="absolute inset-0 matrix-terminal-bg opacity-10 font-mono text-[9px] text-cyan-300 p-2 overflow-hidden pointer-events-none select-none">
            {`git commit -m "fix memory leak" && npm run build --release\nconst survive = (sleep) => sleep > 0 ? false : true;\nwhile(alive) { code(); drinkCoffee(); LeetCode(); }\n[KERNEL]: 0xDEADBEEF zero-leak memory allocated.`}
          </div>

          <div className="relative z-10">
            {/* Corner Badge */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4] animate-ping" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  BLUE CORNER (HUMAN / CS ENGINEER)
                </span>
              </div>
              <button
                onClick={() => {
                  audioEngine.playClick();
                  setEditingC1(!editingC1);
                }}
                className="text-xs font-mono text-cyan-200 hover:text-white flex items-center gap-1 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-400/40 cursor-pointer shadow-sm"
              >
                {editingC1 ? <Check className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
                {editingC1 ? 'Done' : 'Customize'}
              </button>
            </div>

            {/* Avatar & Name Header - Responsive & Non-truncating */}
            <div className="flex items-center gap-3.5 mb-3">
              <div className="relative group shrink-0">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-cyan-950 via-slate-900 to-black border-2 border-cyan-400 flex items-center justify-center text-4xl sm:text-5xl shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:scale-105 transition-all">
                  {contender1.avatar}
                </div>
                {/* Headphones / mic icon badge */}
                <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-cyan-500 text-black border border-white shadow-lg">
                  <Mic className="w-3 h-3" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                {editingC1 ? (
                  <input
                    type="text"
                    value={contender1.name}
                    onChange={(e) => setContender1({ ...contender1, name: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border-2 border-cyan-400 text-white font-arcade font-bold text-base focus:outline-none"
                    placeholder="Contender Name"
                  />
                ) : (
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-arcade font-black text-white glow-text-cyan leading-snug break-words">
                    {contender1.name}
                  </h3>
                )}
                <div className="text-xs font-mono text-cyan-300 mt-0.5 leading-normal break-words">
                  {contender1.title || 'Senior Git Merge Conflict Survivor'}
                </div>

                {/* Voice Characteristic Badge */}
                <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-900/50 border border-cyan-400/40 text-[10px] font-mono text-cyan-200">
                  <Volume2 className="w-3 h-3 text-cyan-400" />
                  <span>Voice: <strong>Natural Human Rap Flow</strong></span>
                </div>
              </div>
            </div>

            {/* Custom Avatar Picker if Editing */}
            {editingC1 && (
              <div className="mb-3 p-3 rounded-2xl bg-slate-900/90 border border-cyan-400/40">
                <div className="text-[10px] font-mono uppercase text-cyan-400 mb-2 font-bold">
                  Select Custom Avatar:
                </div>
                <div className="grid grid-cols-8 gap-1.5">
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      key={av}
                      onClick={() => {
                        audioEngine.playClick();
                        setContender1({ ...contender1, avatar: av });
                      }}
                      className={`text-lg p-1 rounded-xl border transition-all ${
                        contender1.avatar === av
                          ? 'border-cyan-400 bg-cyan-500/30 scale-110 shadow-[0_0_10px_#06b6d4]'
                          : 'border-white/10 hover:border-cyan-500/40 bg-black/60'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Traits Pills */}
            <div className="mb-2.5">
              <div className="text-[10px] font-mono uppercase text-slate-400 mb-1.5 font-bold">
                Battle Profile & Special Traits:
              </div>
              <div className="flex flex-wrap gap-1">
                {contender1.traits?.map((trait, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-lg text-[11px] font-mono bg-cyan-950/70 text-cyan-200 border border-cyan-500/30 shadow-sm"
                  >
                    #{trait}
                  </span>
                ))}
              </div>
            </div>

            {contender1.bio && (
              <p className="text-xs text-slate-300 italic font-light bg-slate-900/60 p-2.5 rounded-xl border border-white/10">
                "{contender1.bio}"
              </p>
            )}
          </div>

          {/* Quick Archetype Switcher Select */}
          <div className="mt-3.5 pt-2.5 border-t border-cyan-900/50 relative z-10">
            <label className="text-[10px] font-mono text-cyan-300 block mb-1 font-bold">
              Select Preset Archetype:
            </label>
            <select
              value={contender1.id || ''}
              onChange={(e) => {
                const found = ARCHETYPES.find((a) => a.id === e.target.value);
                if (found) {
                  audioEngine.playClick();
                  setContender1({ ...found });
                }
              }}
              className="w-full px-2.5 py-1.5 rounded-xl bg-slate-950 border border-cyan-500/50 text-cyan-200 text-xs font-mono focus:outline-none focus:border-cyan-400"
            >
              {ARCHETYPES.map((arch) => (
                <option key={arch.id} value={arch.id}>
                  {arch.avatar} {arch.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mobile Central VS & Enter CTA */}
        <div className="flex md:hidden flex-col items-center justify-center my-0.5">
          <button
            id="btn-enter-arena-mobile"
            type="button"
            onClick={() => {
              audioEngine.playAirhorn();
              onStartBattle();
            }}
            className="w-full py-2.5 rounded-2xl font-arcade font-black text-xs tracking-wider uppercase bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.8)] border border-pink-300/70 flex items-center justify-center gap-2 cursor-pointer animate-pulse"
          >
            <Swords className="w-4 h-4" />
            ENTER THE ARENA (START ROUND 1)
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* CONTENDER 2 CARD (HOT PINK NEON - AI CHATBOT / ROBOT) */}
        <div className="glass-panel-glow rounded-3xl p-4 sm:p-6 border-2 border-pink-400/60 relative overflow-hidden flex flex-col justify-between shadow-[0_0_30px_rgba(244,63,94,0.25)] hover:shadow-[0_0_40px_rgba(244,63,94,0.4)] transition-all duration-300">
          {/* Top Spotlight & Circuit Laser Scanner */}
          <div className="absolute top-0 left-0 right-0 h-20 spotlight-pink opacity-40 pointer-events-none" />
          <div className="circuit-scanner-line" />

          <div className="relative z-10">
            {/* Corner Badge */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-400 shadow-[0_0_8px_#f43f5e] animate-ping" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-pink-300 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-pink-400 animate-spin" />
                  RED CORNER (AUTONOMOUS AI ROBOT)
                </span>
              </div>
              <button
                onClick={() => {
                  audioEngine.playClick();
                  setEditingC2(!editingC2);
                }}
                className="text-xs font-mono text-pink-200 hover:text-white flex items-center gap-1 bg-pink-950/60 px-2.5 py-1 rounded-lg border border-pink-400/40 cursor-pointer shadow-sm"
              >
                {editingC2 ? <Check className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
                {editingC2 ? 'Done' : 'Customize'}
              </button>
            </div>

            {/* Avatar & Name Header - Responsive & Non-truncating */}
            <div className="flex items-center gap-3.5 mb-3">
              <div className="relative group shrink-0">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-pink-950 via-slate-900 to-black border-2 border-pink-400 flex items-center justify-center text-4xl sm:text-5xl shadow-[0_0_20px_rgba(244,63,94,0.4)] group-hover:scale-105 transition-all">
                  {contender2.avatar}
                </div>
                {/* Robot chip badge */}
                <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-pink-500 text-black border border-white shadow-lg">
                  <Zap className="w-3 h-3" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                {editingC2 ? (
                  <input
                    type="text"
                    value={contender2.name}
                    onChange={(e) => setContender2({ ...contender2, name: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border-2 border-pink-400 text-white font-arcade font-bold text-base focus:outline-none"
                    placeholder="Contender Name"
                  />
                ) : (
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-arcade font-black text-white glow-text-pink leading-snug break-words">
                    {contender2.name}
                  </h3>
                )}
                <div className="text-xs font-mono text-pink-300 mt-0.5 leading-normal break-words">
                  {contender2.title || 'Chief Hallucination Officer'}
                </div>

                {/* Voice Characteristic Badge */}
                <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-pink-900/50 border border-pink-400/40 text-[10px] font-mono text-pink-200">
                  <Radio className="w-3 h-3 text-pink-400 animate-pulse" />
                  <span>Voice: <strong>Hard Robotic Machine (Chirp FX)</strong></span>
                </div>
              </div>
            </div>

            {/* Custom Avatar Picker if Editing */}
            {editingC2 && (
              <div className="mb-3 p-3 rounded-2xl bg-slate-900/90 border border-pink-400/40">
                <div className="text-[10px] font-mono uppercase text-pink-400 mb-2 font-bold">
                  Select Custom Avatar:
                </div>
                <div className="grid grid-cols-8 gap-1.5">
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      key={av}
                      onClick={() => {
                        audioEngine.playClick();
                        setContender2({ ...contender2, avatar: av });
                      }}
                      className={`text-lg p-1 rounded-xl border transition-all ${
                        contender2.avatar === av
                          ? 'border-pink-400 bg-pink-500/30 scale-110 shadow-[0_0_10px_#f43f5e]'
                          : 'border-white/10 hover:border-pink-500/40 bg-black/60'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Traits Pills */}
            <div className="mb-2.5">
              <div className="text-[10px] font-mono uppercase text-slate-400 mb-1.5 font-bold">
                Battle Profile & Special Traits:
              </div>
              <div className="flex flex-wrap gap-1">
                {contender2.traits?.map((trait, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-lg text-[11px] font-mono bg-pink-950/70 text-pink-200 border border-pink-500/30 shadow-sm"
                  >
                    #{trait}
                  </span>
                ))}
              </div>
            </div>

            {contender2.bio && (
              <p className="text-xs text-slate-300 italic font-light bg-slate-900/60 p-2.5 rounded-xl border border-white/10">
                "{contender2.bio}"
              </p>
            )}
          </div>

          {/* Quick Archetype Switcher Select */}
          <div className="mt-3.5 pt-2.5 border-t border-pink-900/50 relative z-10">
            <label className="text-[10px] font-mono text-pink-300 block mb-1 font-bold">
              Select Preset Archetype:
            </label>
            <select
              value={contender2.id || ''}
              onChange={(e) => {
                const found = ARCHETYPES.find((a) => a.id === e.target.value);
                if (found) {
                  audioEngine.playClick();
                  setContender2({ ...found });
                }
              }}
              className="w-full px-2.5 py-1.5 rounded-xl bg-slate-950 border border-pink-500/50 text-pink-200 text-xs font-mono focus:outline-none focus:border-pink-400"
            >
              {ARCHETYPES.map((arch) => (
                <option key={arch.id} value={arch.id}>
                  {arch.avatar} {arch.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* VIBE MODE SELECTOR */}
      <div className="glass-panel-glow rounded-3xl p-3.5 sm:p-5 border border-purple-500/40 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
          <div>
            <h3 className="text-base sm:text-lg font-arcade font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              Arena Vibe Calibration
            </h3>
            <p className="text-[11px] text-purple-300 font-mono mt-0.5">
              Defines rhyme structure, rhythm cadence, and roast savagery
            </p>
          </div>

          {/* Random Matchup Dice Button */}
          <button
            onClick={randomizeMatchup}
            className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-purple-900/50 hover:bg-purple-800/80 text-purple-200 border border-purple-400/50 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-lg hover:shadow-purple-500/20"
          >
            <Shuffle className="w-3.5 h-3.5 text-cyan-400" />
            Randomize Rivalry & Vibe
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {VIBE_MODES.map((mode) => {
            const isSelected = vibeMode.id === mode.id;
            return (
              <div
                key={mode.id}
                onClick={() => {
                  audioEngine.playClick();
                  setVibeMode(mode);
                }}
                className={`relative p-3.5 sm:p-4 rounded-2xl cursor-pointer transition-all border-2 ${
                  isSelected
                    ? 'bg-purple-950/70 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.45)] scale-[1.01]'
                    : 'bg-slate-950/60 border-white/5 hover:border-purple-500/40 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">{mode.icon}</span>
                  <span
                    className={`text-[9px] font-mono font-extrabold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-purple-500 text-white shadow-[0_0_10px_#a855f7]'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {mode.badge}
                  </span>
                </div>
                <div className="font-arcade font-bold text-sm text-white mb-0.5">
                  {mode.name}
                </div>
                <p className="text-[11px] text-slate-300 leading-snug font-sans">
                  {mode.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTER CTA & CONTROLS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        {/* API Engine Status Badge */}
        <button
          onClick={() => {
            audioEngine.playClick();
            onOpenApiKeyModal();
          }}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-purple-500/40 text-xs font-mono hover:border-cyan-400 transition-all cursor-pointer shadow-lg"
        >
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              hasApiKey ? 'bg-emerald-400 animate-ping' : 'bg-cyan-400'
            }`}
          />
          <span className="text-slate-300">
            Engine Mode:{' '}
            <strong className={hasApiKey ? 'text-emerald-400' : 'text-cyan-300'}>
              {hasApiKey ? 'Gemini 1.5 Flash (Online)' : 'Arcade Vault (Zero Latency)'}
            </strong>
          </span>
          <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded-md ml-1 border border-purple-700/50">
            Configure
          </span>
        </button>

        {/* START BATTLE CTA WITH SOUNDWAVE PULSING BUTTON ANIMATION */}
        <button
          id="btn-start-round-1"
          onClick={() => {
            audioEngine.playAirhorn();
            onStartBattle();
          }}
          className="pulse-soundwave w-full sm:w-auto px-8 sm:px-12 py-3.5 rounded-2xl font-arcade font-black text-sm sm:text-lg bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:from-pink-400 hover:to-cyan-400 text-white shadow-[0_0_35px_rgba(244,63,94,0.75)] hover:shadow-[0_0_45px_rgba(244,63,94,0.95)] active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer border-2 border-pink-300/80"
        >
          <Swords className="w-5 h-5 animate-bounce" />
          LET'S BATTLE / START ROUND 1
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
