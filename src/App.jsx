import React, { useState, useEffect } from 'react';
import BattleSetupStage from './components/BattleSetupStage';
import LiveBattleArena from './components/LiveBattleArena';
import VerdictStage from './components/VerdictStage';
import ApiKeyModal from './components/ApiKeyModal';
import VoiceAuditionModal from './components/VoiceAuditionModal';
import { ARCHETYPES, VIBE_MODES, PRESEEDED_BATTLES } from './data/battlePresets';
import { ARENA_THEMES, applyTheme } from './data/themes';
import { generateBattleWithGemini, getStoredApiKey } from './services/geminiService';
import { audioEngine } from './services/audioEngine';
import { 
  Tv, Volume2, VolumeX, Key, Maximize2, Minimize2, 
  Sparkles, Radio, Swords, Zap, Music2, Palette, Sliders, Mic 
} from 'lucide-react';

export default function App() {
  // Navigation Stage: 'SETUP' | 'BATTLE' | 'VERDICT'
  const [currentStage, setCurrentStage] = useState('SETUP');

  // Contenders state
  const [contender1, setContender1] = useState(ARCHETYPES[0]); // Overworked CS Engineer
  const [contender2, setContender2] = useState(ARCHETYPES[1]); // ChatGPT Prompt Bro
  const [vibeMode, setVibeMode] = useState(VIBE_MODES[0]); // Savage Tech Roast

  // Battle Data State
  const [battleData, setBattleData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Dynamic Theme state
  const [currentTheme, setCurrentTheme] = useState(ARENA_THEMES[0]);

  // Global Settings
  const [isMuted, setIsMuted] = useState(false);
  const [scanlinesActive, setScanlinesActive] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  // Initialize API key & Theme on mount
  useEffect(() => {
    const key = getStoredApiKey();
    setHasApiKey(!!key);
    applyTheme(currentTheme);
  }, []);

  const handleThemeChange = (theme) => {
    audioEngine.playClick();
    setCurrentTheme(theme);
    applyTheme(theme);
  };

  const handleToggleMute = () => {
    audioEngine.playClick();
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    audioEngine.setMuted(nextMute);
  };

  const handleToggleFullscreen = () => {
    audioEngine.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  // Start battle flow: checks for pre-seeded match or calls Gemini
  const handleStartBattle = async () => {
    setIsGenerating(true);
    audioEngine.playBell();

    // Check if there is an exact pre-seeded match
    const lookupKey = `${contender1.id}-vs-${contender2.id}-${vibeMode.id}`;
    const reverseKey = `${contender2.id}-vs-${contender1.id}-${vibeMode.id}`;

    let match = PRESEEDED_BATTLES[lookupKey];
    if (!match && PRESEEDED_BATTLES[reverseKey]) {
      // Swapped match
      const rev = PRESEEDED_BATTLES[reverseKey];
      match = {
        ...rev,
        winner: rev.winner === 1 ? 2 : 1
      };
    }

    if (match && !hasApiKey) {
      // Instant launch for pre-seeded matches
      setTimeout(() => {
        setBattleData(match);
        setIsGenerating(false);
        setCurrentStage('BATTLE');
      }, 700);
    } else {
      // Call Gemini 1.5 Flash (or dynamic generator if offline)
      try {
        const generated = await generateBattleWithGemini(
          contender1,
          contender2,
          vibeMode,
          getStoredApiKey()
        );
        setBattleData(generated);
      } catch (err) {
        console.error('Battle generation failed, using fallback', err);
      } finally {
        setIsGenerating(false);
        setCurrentStage('BATTLE');
      }
    }
  };

  // Re-match: restarts the battle with starter flipped or fresh round
  const handleRematch = () => {
    handleStartBattle();
  };

  // Instant Random Battle
  const handleRandomBattle = () => {
    audioEngine.playLaser?.() || audioEngine.playClick();
    const rand1 = ARCHETYPES[Math.floor(Math.random() * ARCHETYPES.length)];
    let rand2 = ARCHETYPES[Math.floor(Math.random() * ARCHETYPES.length)];
    while (rand2.id === rand1.id) {
      rand2 = ARCHETYPES[Math.floor(Math.random() * ARCHETYPES.length)];
    }
    const randVibe = VIBE_MODES[Math.floor(Math.random() * VIBE_MODES.length)];

    setContender1(rand1);
    setContender2(rand2);
    setVibeMode(randVibe);

    setTimeout(() => {
      handleStartBattle();
    }, 200);
  };

  return (
    <div 
      className="min-h-screen text-slate-100 flex flex-col relative selection:bg-pink-500 selection:text-white font-sans transition-colors duration-700"
      style={{ backgroundColor: currentTheme.bg }}
    >
      {/* Subtle CRT Scanlines Overlay */}
      {scanlinesActive && (
        <div className="fixed inset-0 scanlines pointer-events-none z-50 opacity-35" />
      )}

      {/* 3D Animated Horizon Synthwave Floor Grid & Sun */}
      <div className="synthwave-horizon-container">
        <div className="synthwave-sun" />
        <div className="synthwave-grid-floor" />
      </div>

      {/* Dynamic Animated Ambient Aurora Lighting */}
      <div 
        className="fixed top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none z-0 animate-pulse transition-all duration-700"
        style={{ backgroundColor: currentTheme.ambient1 }}
      />
      <div 
        className="fixed bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none z-0 transition-all duration-700"
        style={{ backgroundColor: currentTheme.ambient2 }}
      />

      {/* HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-purple-500/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo & Stage Indicator */}
          <div
            onClick={() => {
              audioEngine.playClick();
              audioEngine.stopSpeech();
              audioEngine.stopBeat();
              setCurrentStage('SETUP');
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 p-0.5 shadow-[0_0_20px_rgba(244,63,94,0.5)] group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-[#070710] rounded-[10px] flex items-center justify-center text-xl">
                🎤
              </div>
            </div>
            <div>
              <div className="font-arcade font-extrabold text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-500 flex items-center gap-1.5">
                VIBEROAST
                <span className="text-xs px-1.5 py-0.2 rounded bg-pink-500/20 text-pink-400 border border-pink-500/40 font-mono">
                  ARENA
                </span>
              </div>
              <div className="text-[10px] font-mono text-purple-300/80 -mt-1 hidden sm:block">
                The AI Rap & Roast Battle Engine
              </div>
            </div>
          </div>

          {/* Quick Stage Status Indicator */}
          <div className="hidden md:flex items-center gap-2 text-xs font-mono">
            <span className={`px-2.5 py-1 rounded-full border ${currentStage === 'SETUP' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_8px_#06b6d4]' : 'text-slate-500 border-white/5'}`}>
              1. Setup
            </span>
            <span className="text-slate-600">&rarr;</span>
            <span className={`px-2.5 py-1 rounded-full border ${currentStage === 'BATTLE' ? 'bg-pink-500/20 text-pink-300 border-pink-400/50 shadow-[0_0_8px_#f43f5e]' : 'text-slate-500 border-white/5'}`}>
              2. Arena
            </span>
            <span className="text-slate-600">&rarr;</span>
            <span className={`px-2.5 py-1 rounded-full border ${currentStage === 'VERDICT' ? 'bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-[0_0_8px_#f59e0b]' : 'text-slate-500 border-white/5'}`}>
              3. Verdict
            </span>
          </div>

          {/* Utility Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Dynamic Color Theme Switcher Dropdown */}
            <div className="relative group">
              <button
                className="px-2.5 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 bg-slate-900/90 border border-purple-500/40 text-purple-200 hover:border-cyan-400 transition-all cursor-pointer shadow-sm"
                title="Switch Color Theme"
              >
                <Palette className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline font-bold">{currentTheme.icon} {currentTheme.name}</span>
              </button>

              <div className="absolute right-0 top-full mt-2 w-48 glass-panel-glow rounded-2xl p-2 border border-purple-500/40 shadow-2xl hidden group-hover:flex flex-col gap-1 z-50">
                <div className="text-[10px] font-mono uppercase text-slate-400 px-2 py-1 font-bold">
                  Select Arena Palette:
                </div>
                {ARENA_THEMES.map((th) => (
                  <button
                    key={th.id}
                    onClick={() => handleThemeChange(th)}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-mono flex items-center justify-between transition-all cursor-pointer ${
                      currentTheme.id === th.id
                        ? 'bg-purple-900/70 text-white font-bold border border-purple-400'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span>{th.icon}</span> {th.name}
                    </span>
                    <span 
                      className="w-3 h-3 rounded-full border border-white/40" 
                      style={{ backgroundColor: th.cyan }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Studio Audition Button */}
            <button
              onClick={() => {
                audioEngine.playClick();
                setIsVoiceModalOpen(true);
              }}
              className="px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 bg-gradient-to-r from-cyan-900/60 to-purple-900/60 border border-cyan-400/50 text-cyan-200 hover:border-cyan-300 transition-all cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.3)]"
              title="Audition Human vs Robot Voices"
            >
              <Mic className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="hidden lg:inline">Voice Studio</span>
            </button>

            {/* Gemini API Key config */}
            <button
              onClick={() => {
                audioEngine.playClick();
                setIsApiKeyModalOpen(true);
              }}
              className={`p-2 rounded-xl text-xs font-mono flex items-center gap-1.5 border transition-all cursor-pointer ${
                hasApiKey
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_10px_#10b981]'
                  : 'bg-slate-900/80 text-slate-300 border-purple-500/30 hover:border-cyan-400'
              }`}
              title="Configure Gemini API Key"
            >
              <Key className="w-4 h-4 text-cyan-400" />
              <span className="hidden xl:inline">{hasApiKey ? 'Gemini Active' : 'API Key'}</span>
            </button>

            {/* CRT Scanline Toggle */}
            <button
              onClick={() => {
                audioEngine.playClick();
                setScanlinesActive(!scanlinesActive);
              }}
              className={`p-2 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
                scanlinesActive
                  ? 'bg-purple-900/50 text-purple-200 border-purple-400'
                  : 'bg-slate-900/80 text-slate-500 border-white/5'
              }`}
              title="Toggle Arcade CRT Scanlines"
            >
              <Tv className="w-4 h-4" />
            </button>

            {/* Master Sound Mute Toggle */}
            <button
              onClick={handleToggleMute}
              className={`p-2 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
                !isMuted
                  ? 'bg-purple-900/50 text-cyan-300 border-purple-400'
                  : 'bg-rose-950/50 text-rose-400 border-rose-500/50'
              }`}
              title={isMuted ? 'Unmute Sound' : 'Mute Master Audio'}
            >
              {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Fullscreen / Projector Mode */}
            <button
              onClick={handleToggleFullscreen}
              className="p-2 rounded-xl text-xs font-mono bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-purple-500/30 transition-all hidden sm:flex cursor-pointer"
              title="Toggle Projector Fullscreen Mode"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 z-10 flex flex-col justify-center">
        {/* LOADING SCREEN WHILE GENERATING */}
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center animate-fade-in">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-500 via-purple-500 to-pink-500 p-1 animate-spin shadow-[0_0_30px_#f43f5e]">
                <div className="w-full h-full bg-[#070710] rounded-[22px] flex items-center justify-center text-4xl">
                  ⚡
                </div>
              </div>
              <div className="absolute inset-0 rounded-3xl bg-pink-500/30 blur-xl animate-pulse" />
            </div>

            <h2 className="text-2xl sm:text-4xl font-arcade font-black text-white glow-text-cyan mb-2">
              COMPUTING ROAST CADENCE...
            </h2>
            <p className="text-sm font-mono text-purple-200 max-w-md">
              Synthesizing 3 rounds of devastating rhyming couplets, punchline calibrations, and crowd decibel targets.
            </p>
          </div>
        ) : (
          <>
            {currentStage === 'SETUP' && (
              <BattleSetupStage
                contender1={contender1}
                setContender1={setContender1}
                contender2={contender2}
                setContender2={setContender2}
                vibeMode={vibeMode}
                setVibeMode={setVibeMode}
                onStartBattle={handleStartBattle}
                onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
                hasApiKey={hasApiKey}
              />
            )}

            {currentStage === 'BATTLE' && battleData && (
              <LiveBattleArena
                battleData={battleData}
                contender1={contender1}
                contender2={contender2}
                vibeMode={vibeMode}
                onFinishBattle={() => setCurrentStage('VERDICT')}
                onExitArena={() => setCurrentStage('SETUP')}
              />
            )}

            {currentStage === 'VERDICT' && battleData && (
              <VerdictStage
                battleData={battleData}
                contender1={contender1}
                contender2={contender2}
                vibeMode={vibeMode}
                onRematch={handleRematch}
                onRandomBattle={handleRandomBattle}
              />
            )}
          </>
        )}
      </main>

      {/* FOOTER */}
      <footer className="w-full glass-panel border-t border-purple-500/20 py-2.5 px-4 text-center text-xs font-mono text-slate-400 z-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#06b6d4]" />
            <span className="font-bold text-slate-300">VibeRoast Arena &bull; Technology for Fun & Creative AI</span>
          </div>
          <div className="flex items-center gap-3 text-purple-300/80">
            <span>Dynamic Theme: <strong className="text-cyan-300">{currentTheme.name}</strong></span>
            <span>&bull;</span>
            <span>Vocals: <strong className="text-pink-300">Bold Human vs Robot</strong></span>
            <span>&bull;</span>
            <span className="text-amber-400 font-bold">100% Offline Vault Ready</span>
          </div>
        </div>
      </footer>

      {/* GEMINI API MODAL */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onKeyUpdated={(key) => setHasApiKey(!!key)}
      />

      {/* VOICE AUDITION STUDIO MODAL */}
      <VoiceAuditionModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
      />
    </div>
  );
}
