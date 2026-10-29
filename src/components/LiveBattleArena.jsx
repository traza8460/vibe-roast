import React, { useState, useEffect, useRef } from 'react';
import AudioVisualizer from './AudioVisualizer';
import HypeMeter from './HypeMeter';
import { audioEngine } from '../services/audioEngine';
import { 
  Play, Pause, SkipForward, Mic, Volume2, VolumeX, 
  ArrowLeft, Trophy, Swords, Zap, Flame, Crown, FastForward, 
  Cpu, Terminal, Radio, HeartPulse, Sparkles, Activity 
} from 'lucide-react';

export default function LiveBattleArena({
  battleData,
  contender1,
  contender2,
  vibeMode,
  onFinishBattle,
  onExitArena
}) {
  // Round management
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0); // 0, 1, 2
  const [activeTurn, setActiveTurn] = useState(1); // 1 = C1, 2 = C2
  const [activeLineIdx, setActiveLineIdx] = useState(0); // 0, 1, 2, 3
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTTSActive, setIsTTSActive] = useState(true);
  const [isBeatPlaying, setIsBeatPlaying] = useState(false);
  const [hypeLevel, setHypeLevel] = useState(65);

  // Clout / HP Meters (Dynamic Health Bar simulation)
  const [c1Clout, setC1Clout] = useState(100);
  const [c2Clout, setC2Clout] = useState(100);
  const [shockReaction, setShockReaction] = useState(false);
  const [screenShake, setScreenShake] = useState(false);
  const [floatingDamage, setFloatingDamage] = useState(null);

  const rounds = battleData?.rounds || [];
  const currentRound = rounds[currentRoundIdx] || rounds[0];

  const currentVerse = activeTurn === 1 ? currentRound?.c1Verse : currentRound?.c2Verse;
  const currentPunchline = activeTurn === 1 ? currentRound?.punchlineC1 : currentRound?.punchlineC2;

  // Auto-play timer ref
  const lineTimerRef = useRef(null);

  // Play Bell sound when round starts
  useEffect(() => {
    audioEngine.playBell();
  }, [currentRoundIdx]);

  // Turn or Line Progression Logic
  useEffect(() => {
    if (!isPlaying || !currentVerse) return;

    const lineText = currentVerse[activeLineIdx] || '';

    // If Text to speech is enabled:
    // CS Engineer: Natural Human Voice
    // AI Chatbot: Hard Robotic Machine Voice + Robot Chirp FX
    if (isTTSActive && lineText) {
      audioEngine.speakRapLine(lineText, activeTurn, () => {
        advanceLine();
      });
    } else {
      // Fallback timer if TTS is muted
      lineTimerRef.current = setTimeout(() => {
        advanceLine();
      }, 2600);
    }

    return () => {
      if (lineTimerRef.current) clearTimeout(lineTimerRef.current);
    };
  }, [isPlaying, currentRoundIdx, activeTurn, activeLineIdx, isTTSActive]);

  const advanceLine = () => {
    // If we're at line 3 (last line of verse - fatal punchline)
    if (activeLineIdx === 2) {
      // Trigger shock and screen shake on the defender!
      setShockReaction(true);
      setScreenShake(true);

      // Clout reduction on defender
      if (activeTurn === 1) {
        setC2Clout((prev) => Math.max(20, prev - 18));
        setFloatingDamage({ target: 2, text: '-180 CLOUT! 💀' });
      } else {
        setC1Clout((prev) => Math.max(20, prev - 16));
        setFloatingDamage({ target: 1, text: '-160 CLOUT! 💥' });
      }

      setTimeout(() => {
        setShockReaction(false);
        setScreenShake(false);
        setFloatingDamage(null);
      }, 900);
    }

    if (activeLineIdx < 3) {
      setActiveLineIdx((prev) => prev + 1);
    } else {
      // Verse completed: Switch turn or advance round
      if (activeTurn === 1) {
        // Contender 1 finished -> Contender 2 goes!
        audioEngine.playClick();
        setActiveTurn(2);
        setActiveLineIdx(0);
      } else {
        // Both finished this round!
        if (currentRoundIdx < rounds.length - 1) {
          // Advance to next round
          audioEngine.playBell();
          setCurrentRoundIdx((prev) => prev + 1);
          setActiveTurn(1);
          setActiveLineIdx(0);
        } else {
          // Battle finished -> transition to Verdict!
          setIsPlaying(false);
          audioEngine.playAirhorn();
          onFinishBattle();
        }
      }
    }
  };

  const handleNextRound = () => {
    audioEngine.playClick();
    if (currentRoundIdx < rounds.length - 1) {
      setCurrentRoundIdx((prev) => prev + 1);
      setActiveTurn(1);
      setActiveLineIdx(0);
    } else {
      onFinishBattle();
    }
  };

  const togglePlayPause = () => {
    audioEngine.playClick();
    if (isPlaying) {
      audioEngine.stopSpeech();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const toggleTTS = () => {
    audioEngine.playClick();
    const nextState = !isTTSActive;
    setIsTTSActive(nextState);
    audioEngine.ttsEnabled = nextState;
    if (!nextState) {
      audioEngine.stopSpeech();
    }
  };

  const toggleBeat = () => {
    const state = audioEngine.toggleBeat();
    setIsBeatPlaying(state);
  };

  return (
    <div className={`w-[90%] max-w-5xl mx-auto px-4 py-4 sm:py-6 flex flex-col gap-6 animate-fade-in relative z-10 ${screenShake ? 'arena-shake' : ''}`}>
      {/* ARENA TOP CONTROL BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 glass-panel-glow px-5 py-3 rounded-2xl border border-purple-500/40 shadow-xl">
        <button
          onClick={() => {
            audioEngine.stopSpeech();
            audioEngine.stopBeat();
            onExitArena();
          }}
          className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-400 hover:text-white px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 transition-all cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Setup
        </button>

        {/* Round Indicators */}
        <div className="flex items-center gap-2">
          {rounds.map((r, idx) => (
            <button
              key={idx}
              onClick={() => {
                audioEngine.playClick();
                setCurrentRoundIdx(idx);
                setActiveTurn(1);
                setActiveLineIdx(0);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-arcade font-bold transition-all border-2 ${
                idx === currentRoundIdx
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-pink-300 shadow-[0_0_18px_rgba(244,63,94,0.7)] scale-105'
                  : idx < currentRoundIdx
                  ? 'bg-purple-950/70 text-purple-200 border-purple-800'
                  : 'bg-slate-900/60 text-slate-500 border-white/5'
              }`}
            >
              R{idx + 1}: {idx === 0 ? 'Intro Diss' : idx === 1 ? 'Counter Attack' : 'The Mic Drop'}
            </button>
          ))}
        </div>

        {/* Audio / Auto Controls */}
        <div className="flex items-center gap-2">
          {/* TTS Voice Flow Toggle */}
          <button
            onClick={toggleTTS}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 border transition-all ${
              isTTSActive
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/60 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                : 'bg-slate-900 text-slate-500 border-white/10'
            }`}
            title="Toggle Text-to-Speech Vocal Performance"
          >
            {isTTSActive ? <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{isTTSActive ? 'Vocal Engine: ON' : 'Vocals: OFF'}</span>
          </button>

          {/* Play / Pause Teleprompter */}
          <button
            onClick={togglePlayPause}
            className="p-2 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-white border border-purple-400/40 transition-all cursor-pointer shadow-md"
            title={isPlaying ? 'Pause Battle' : 'Resume Battle'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Skip to Verdict */}
          <button
            onClick={onFinishBattle}
            className="px-3.5 py-1.5 rounded-xl text-xs font-arcade font-bold bg-gradient-to-r from-amber-500 to-pink-600 hover:from-amber-400 hover:to-pink-500 text-white border border-amber-300/50 flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.3)] cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-yellow-300 animate-bounce" />
            <span className="hidden sm:inline">Verdict Stage</span>
          </button>
        </div>
      </div>

      {/* DYNAMIC SPLIT SCREEN: CONTENDER 1 vs CONTENDER 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch relative">
        {/* CONTENDER 1 AVATAR CARD (CYAN - HUMAN CS ENGINEER) */}
        <div
          className={`glass-panel-glow rounded-3xl p-6 sm:p-7 border-2 transition-all duration-500 relative overflow-hidden flex flex-col justify-between ${
            activeTurn === 1
              ? 'border-cyan-400 glow-cyan scale-[1.02] bg-gradient-to-br from-cyan-950/60 via-slate-900 to-[#070710]'
              : 'border-white/10 opacity-75 grayscale-[20%]'
          } ${activeTurn === 2 && shockReaction ? 'animate-hit-shock border-rose-500' : ''}`}
        >
          {/* Active Spotlight */}
          {activeTurn === 1 && (
            <div className="absolute top-0 left-0 right-0 h-32 spotlight-cyan pointer-events-none" />
          )}

          {/* Floating Damage Number */}
          {floatingDamage && floatingDamage.target === 1 && (
            <div className="absolute top-8 right-8 z-30 font-arcade font-black text-2xl text-rose-400 animate-float-fade drop-shadow-[0_0_15px_#f43f5e]">
              {floatingDamage.text}
            </div>
          )}

          {/* Active Turn Neon Aura */}
          {activeTurn === 1 && (
            <div className="absolute top-3 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/30 text-cyan-200 border border-cyan-400 text-xs font-mono font-bold animate-pulse shadow-[0_0_15px_#06b6d4]">
              <Mic className="w-3.5 h-3.5 text-cyan-300 animate-spin" /> MIC LIVE: SPITTING
            </div>
          )}

          <div className="relative z-10">
            {/* Clout / Health Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center text-xs font-mono mb-1">
                <span className="text-cyan-300 font-bold flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" /> CLOUT ENERGY:
                </span>
                <span className="text-cyan-300 font-bold">{c1Clout}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full border border-cyan-500/30 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-300"
                  style={{ width: `${c1Clout}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              {/* 2D Animated Avatar */}
              <div
                className={`w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-950 to-slate-950 border-2 flex items-center justify-center text-5xl shadow-2xl transition-all ${
                  activeTurn === 1
                    ? 'border-cyan-400 animate-rap-bounce shadow-[0_0_30px_#06b6d4]'
                    : 'border-cyan-700/50'
                }`}
              >
                {contender1.avatar}
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
                  BLUE CORNER &bull; HUMAN ENGINEER
                </span>
                <h2 className="text-2xl sm:text-3xl font-arcade font-black text-white glow-text-cyan truncate">
                  {contender1.name}
                </h2>
                <div className="text-xs font-mono text-cyan-300/80">
                  {contender1.title || 'Senior Git Merge Conflict Survivor'}
                </div>
              </div>
            </div>

            {/* Defender Shock Badge when hit */}
            {activeTurn === 2 && shockReaction && (
              <div className="my-2 p-2.5 rounded-xl bg-rose-950/80 border border-rose-500 text-rose-200 text-xs font-mono font-bold flex items-center gap-2 animate-bounce shadow-[0_0_15px_#f43f5e]">
                <span>😱 CRITICAL HIT! EGO CACHE INVALIDATED!</span>
              </div>
            )}

            {/* Active Turn Speech Bubble / Teleprompter preview */}
            <div
              className={`p-4 rounded-2xl border transition-all duration-300 ${
                activeTurn === 1
                  ? 'bg-cyan-950/50 border-cyan-400 text-cyan-100 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                  : 'bg-black/40 border-white/5 text-slate-500'
              }`}
            >
              <div className="text-[10px] font-mono uppercase text-cyan-400 font-bold mb-1 flex items-center gap-1">
                <span>ROUND {currentRoundIdx + 1} VERSE</span>
              </div>
              <p className="font-mono-code text-base sm:text-lg font-bold italic min-h-[52px] leading-relaxed">
                {activeTurn === 1
                  ? `"${currentRound?.c1Verse?.[activeLineIdx] || 'Compiling verbal assault...'}"`
                  : 'Analyzing opponent rhyme scheme...'}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-cyan-900/40 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Voice: <strong>Natural Human Flow</strong></span>
            <span className="text-cyan-400 font-bold">RHYME ACCURACY: 99%</span>
          </div>
        </div>

        {/* CONTENDER 2 AVATAR CARD (PINK - AUTONOMOUS AI ROBOT) */}
        <div
          className={`glass-panel-glow rounded-3xl p-6 sm:p-7 border-2 transition-all duration-500 relative overflow-hidden flex flex-col justify-between ${
            activeTurn === 2
              ? 'border-pink-400 glow-pink scale-[1.02] bg-gradient-to-br from-pink-950/60 via-slate-900 to-[#070710]'
              : 'border-white/10 opacity-75 grayscale-[20%]'
          } ${activeTurn === 1 && shockReaction ? 'animate-hit-shock border-rose-500' : ''}`}
        >
          {/* Active Spotlight & Laser Scan */}
          {activeTurn === 2 && (
            <>
              <div className="absolute top-0 left-0 right-0 h-32 spotlight-pink pointer-events-none" />
              <div className="circuit-scanner-line" />
            </>
          )}

          {/* Floating Damage Number */}
          {floatingDamage && floatingDamage.target === 2 && (
            <div className="absolute top-8 right-8 z-30 font-arcade font-black text-2xl text-rose-400 animate-float-fade drop-shadow-[0_0_15px_#f43f5e]">
              {floatingDamage.text}
            </div>
          )}

          {/* Active Turn Neon Aura */}
          {activeTurn === 2 && (
            <div className="absolute top-3 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/30 text-pink-200 border border-pink-400 text-xs font-mono font-bold animate-pulse shadow-[0_0_15px_#f43f5e]">
              <Radio className="w-3.5 h-3.5 text-pink-300 animate-pulse" /> ROBOT AUDIO: ACTIVE
            </div>
          )}

          <div className="relative z-10">
            {/* Clout / Health Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center text-xs font-mono mb-1">
                <span className="text-pink-300 font-bold flex items-center gap-1">
                  <HeartPulse className="w-3.5 h-3.5 text-pink-400" /> CLOUT ENERGY:
                </span>
                <span className="text-pink-300 font-bold">{c2Clout}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full border border-pink-500/30 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-amber-500 rounded-full transition-all duration-300"
                  style={{ width: `${c2Clout}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              {/* 2D Animated Avatar */}
              <div
                className={`w-24 h-24 rounded-2xl bg-gradient-to-br from-pink-950 to-slate-950 border-2 flex items-center justify-center text-5xl shadow-2xl transition-all ${
                  activeTurn === 2
                    ? 'border-pink-400 animate-rap-bounce shadow-[0_0_30px_#f43f5e]'
                    : 'border-pink-700/50'
                }`}
              >
                {contender2.avatar}
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-pink-400 font-bold tracking-wider">
                  RED CORNER &bull; AI ROBOT
                </span>
                <h2 className="text-2xl sm:text-3xl font-arcade font-black text-white glow-text-pink truncate">
                  {contender2.name}
                </h2>
                <div className="text-xs font-mono text-pink-300/80">
                  {contender2.title || 'Autonomous Roast Cyborg'}
                </div>
              </div>
            </div>

            {/* Defender Shock Badge when hit */}
            {activeTurn === 1 && shockReaction && (
              <div className="my-2 p-2.5 rounded-xl bg-rose-950/80 border border-rose-500 text-rose-200 text-xs font-mono font-bold flex items-center gap-2 animate-bounce shadow-[0_0_15px_#f43f5e]">
                <span>🤖 ERROR 404: COMBUSTION OVERLOAD!</span>
              </div>
            )}

            {/* Active Turn Speech Bubble / Teleprompter preview */}
            <div
              className={`p-4 rounded-2xl border transition-all duration-300 ${
                activeTurn === 2
                  ? 'bg-pink-950/50 border-pink-400 text-pink-100 shadow-[0_0_20px_rgba(244,63,94,0.25)]'
                  : 'bg-black/40 border-white/5 text-slate-500'
              }`}
            >
              <div className="text-[10px] font-mono uppercase text-pink-400 font-bold mb-1 flex items-center gap-1">
                <span>ROUND {currentRoundIdx + 1} VERSE</span>
              </div>
              <p className="font-mono-code text-base sm:text-lg font-bold italic min-h-[52px] leading-relaxed">
                {activeTurn === 2
                  ? `"${currentRound?.c2Verse?.[activeLineIdx] || 'Synthesizing lethal response...'}"`
                  : 'Synthesizing counter logic algorithm...'}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-pink-900/40 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Voice: <strong>Hard Robotic Machine (Chirps)</strong></span>
            <span className="text-pink-400 font-bold">BRUTALITY: 99%</span>
          </div>
        </div>
      </div>

      {/* LIVE LYRIC TELEPROMPTER */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-7 border-2 border-purple-500/50 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-purple-900/40">
          <div>
            <div className="text-xs font-mono uppercase text-purple-300 font-bold tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping" />
              Live Lyric Teleprompter
              <span className="text-cyan-400">({currentRound?.title})</span>
            </div>
            <h3 className="text-xl font-arcade font-black text-white mt-0.5">
              Spitting Bars:{' '}
              <span className={activeTurn === 1 ? 'text-cyan-400 glow-text-cyan' : 'text-pink-400 glow-text-pink'}>
                {activeTurn === 1 ? contender1.name : contender2.name}
              </span>
            </h3>
          </div>

          {/* Teleprompter Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                audioEngine.playClick();
                advanceLine();
              }}
              className="px-4 py-2 rounded-xl text-xs font-arcade font-bold bg-purple-900/60 hover:bg-purple-800 text-purple-100 border border-purple-400/50 flex items-center gap-2 cursor-pointer active:scale-95 transition-all shadow-md"
            >
              <FastForward className="w-3.5 h-3.5" /> Next Line
            </button>
            <button
              onClick={handleNextRound}
              className="px-4 py-2 rounded-xl text-xs font-arcade font-bold bg-cyan-900/60 hover:bg-cyan-800 text-cyan-100 border border-cyan-400/50 flex items-center gap-2 cursor-pointer active:scale-95 transition-all shadow-md"
            >
              <SkipForward className="w-3.5 h-3.5" /> Next Round
            </button>
          </div>
        </div>

        {/* The 4-Line Teleprompter Display */}
        <div className="flex flex-col gap-3 my-2">
          {currentVerse?.map((line, idx) => {
            const isCurrent = idx === activeLineIdx;
            const isPast = idx < activeLineIdx;
            const isPunchline = line === currentPunchline;

            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl transition-all duration-300 flex items-start gap-4 border-2 ${
                  isCurrent
                    ? activeTurn === 1
                      ? 'bg-cyan-950/70 border-cyan-400 text-white shadow-[0_0_25px_rgba(6,182,212,0.35)] scale-[1.01]'
                      : 'bg-pink-950/70 border-pink-400 text-white shadow-[0_0_25px_rgba(244,63,94,0.35)] scale-[1.01]'
                    : isPast
                    ? 'bg-slate-900/40 border-white/5 text-slate-400 opacity-60'
                    : 'bg-black/30 border-white/5 text-slate-600'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl text-xs font-mono font-black flex items-center justify-center shrink-0 mt-0.5 ${
                    isCurrent
                      ? activeTurn === 1
                        ? 'bg-cyan-400 text-black shadow-[0_0_10px_#06b6d4]'
                        : 'bg-pink-500 text-white shadow-[0_0_10px_#f43f5e]'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  0{idx + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-mono-code text-base sm:text-xl font-bold leading-relaxed">
                    {line}
                  </p>
                  {isPunchline && isCurrent && (
                    <span className="inline-flex items-center gap-1 mt-2 text-[11px] font-arcade uppercase font-black px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400 animate-pulse shadow-[0_0_12px_#eab308]">
                      🔥 FATAL MIC-DROP PUNCHLINE (COMBO x3)
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* REAL-TIME AUDIO VISUALIZER */}
      <AudioVisualizer
        isRapActive={isPlaying}
        activeContender={activeTurn}
        hypeLevel={hypeLevel}
      />

      {/* LIVE HYPE METER & SOUND FX PAD */}
      <HypeMeter
        hype={hypeLevel}
        setHype={setHypeLevel}
        isBeatPlaying={isBeatPlaying}
        toggleBeat={toggleBeat}
      />
    </div>
  );
}
