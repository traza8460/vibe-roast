import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../services/audioEngine';
import { 
  Trophy, Crown, Flame, Sparkles, Download, Copy, Check, 
  RotateCcw, Shuffle, Share2, Award, Zap, QrCode 
} from 'lucide-react';

export default function VerdictStage({
  battleData,
  contender1,
  contender2,
  vibeMode,
  onRematch,
  onRandomBattle
}) {
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef(null);

  const winnerNum = battleData?.winner || 1;
  const winner = winnerNum === 1 ? contender1 : contender2;
  const loser = winnerNum === 1 ? contender2 : contender1;

  const judge = battleData?.judge || {
    name: 'DJ Algo-Rhythm',
    title: 'Chief AI Roast Officer',
    verdict: 'An extraordinary verbal clash that burned through all cache layers!',
    scores: {
      contender1: { flow: 9.7, brutality: 9.8, rhyme: 9.5, crowd: 96 },
      contender2: { flow: 9.3, brutality: 9.0, rhyme: 9.2, crowd: 85 }
    }
  };

  const scores = winnerNum === 1 ? judge.scores?.contender1 : judge.scores?.contender2;
  const loserScores = winnerNum === 1 ? judge.scores?.contender2 : judge.scores?.contender1;

  // Best fatal punchline from the 3 rounds
  const topPunchline = winnerNum === 1
    ? (battleData?.rounds?.[2]?.punchlineC1 || battleData?.rounds?.[1]?.punchlineC1 || battleData?.rounds?.[0]?.punchlineC1 || "I drop the mic and take the crown!")
    : (battleData?.rounds?.[2]?.punchlineC2 || battleData?.rounds?.[1]?.punchlineC2 || battleData?.rounds?.[0]?.punchlineC2 || "Your entire career is depreciated!");

  // Trigger celebration on mount
  useEffect(() => {
    audioEngine.playApplause();
    setTimeout(() => audioEngine.playAirhorn(), 400);

    // Multi-stage confetti burst
    const count = 200;
    const defaults = {
      origin: { y: 0.6 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#06b6d4', '#a855f7', '#f43f5e']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#eab308', '#ec4899', '#ffffff']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45
    });
  }, []);

  const handleCopy = () => {
    audioEngine.playClick();
    const textToCopy = `🔥 "${topPunchline}" - ${winner.name} in VibeRoast Arena!`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Sleek HTML Canvas Export of the Collectible Roast Card
  const downloadRoastCard = () => {
    audioEngine.playClick();
    setIsExporting(true);

    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');

    // Synthwave Dark Gradient Background
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 630);
    bgGrad.addColorStop(0, '#0a0a14');
    bgGrad.addColorStop(0.5, '#160d2b');
    bgGrad.addColorStop(1, '#0a0a14');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 630);

    // Neon Border
    ctx.lineWidth = 8;
    ctx.strokeStyle = winnerNum === 1 ? '#06b6d4' : '#f43f5e';
    ctx.strokeRect(20, 20, 1160, 590);

    // Card Header
    ctx.fillStyle = '#a855f7';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('⚡ VIBEROAST ARENA COLLECTIBLE ROAST CARD', 60, 80);

    // Mode Badge
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 20px monospace';
    ctx.fillText(`ARENA TRACK: ${vibeMode.name.toUpperCase()}`, 60, 120);

    // Winner Avatar + Name
    ctx.font = '80px sans-serif';
    ctx.fillText(winner.avatar, 60, 230);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px sans-serif';
    ctx.fillText(`${winner.name} 👑 (CHAMPION)`, 180, 200);

    ctx.fillStyle = '#06b6d4';
    ctx.font = '24px monospace';
    ctx.fillText(`Defeated: ${loser.name} (${loser.avatar})`, 180, 240);

    // Fatal Punchline Box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(60, 290, 1080, 160);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.5)';
    ctx.strokeRect(60, 290, 1080, 160);

    ctx.fillStyle = '#f43f5e';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('FATAL MIC-DROP PUNCHLINE:', 90, 330);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'italic bold 28px sans-serif';
    ctx.fillText(`"${topPunchline}"`, 90, 390);

    // Stats Footnote
    ctx.fillStyle = '#94a3b8';
    ctx.font = '22px monospace';
    ctx.fillText(
      `FLOW: ${scores?.flow || 9.8}  |  BRUTALITY: ${scores?.brutality || 9.9}  |  CROWD HYPE: ${scores?.crowd || 98}%`,
      60,
      520
    );

    // QR Code Mockup Symbol
    ctx.fillStyle = '#a855f7';
    ctx.font = '16px monospace';
    ctx.fillText('SCAN TO BATTLE: viberoast.arena.ai', 750, 560);

    // Trigger image download
    const link = document.createElement('a');
    link.download = `VibeRoast_${winner.name.replace(/\s+/g, '_')}_Card.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setIsExporting(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 sm:py-8 flex flex-col gap-8 animate-fade-in">
      {/* DECISION BANNER */}
      <div className="text-center relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono mb-3 tracking-widest uppercase glow-violet">
          <Award className="w-4 h-4 text-amber-400" />
          Official Arena AI Verdict
        </div>

        <h1 className="text-3xl sm:text-5xl font-arcade font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-cyan-400 glow-text-pink">
          VICTORY BY MIC DROP!
        </h1>
        <p className="mt-2 text-sm text-slate-300 font-mono">
          Decibels calculated &bull; Flow rhymes analyzed &bull; Crowd consensus verified
        </p>
      </div>

      {/* CHAMPION SHOWCASE & JUDGE BOX */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* CHAMPION PODIUM */}
        <div className="md:col-span-1 glass-panel-glow rounded-3xl p-6 sm:p-7 border border-amber-400/50 relative overflow-hidden flex flex-col items-center text-center justify-between shadow-[0_0_30px_rgba(245,158,11,0.25)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="w-full flex flex-col items-center">
            {/* Crown Icon */}
            <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 border border-amber-400/60 flex items-center justify-center mb-3 animate-bounce shadow-[0_0_20px_#eab308]">
              <Crown className="w-8 h-8" />
            </div>

            <div className="text-6xl mb-3">{winner.avatar}</div>

            <span className="text-[10px] font-mono uppercase text-amber-400 font-extrabold tracking-wider bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/40 mb-1">
              THE UNDISPUTED CHAMPION
            </span>

            <h2 className="text-2xl font-arcade font-extrabold text-white mt-1">
              {winner.name}
            </h2>
            <div className="text-xs font-mono text-slate-400 mt-0.5">
              Defeated {loser.name} ({loser.avatar})
            </div>
          </div>

          {/* Winner Score Radar Pills */}
          <div className="w-full mt-6 pt-4 border-t border-amber-500/30 flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">Flow & Rhythm:</span>
              <span className="text-cyan-400 font-bold">{scores?.flow || 9.8} / 10</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-cyan-400 rounded-full" 
                style={{ width: `${(scores?.flow || 9.8) * 10}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-xs font-mono mt-1">
              <span className="text-slate-400">Brutality Factor:</span>
              <span className="text-pink-400 font-bold">{scores?.brutality || 9.9} / 10</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-pink-500 rounded-full" 
                style={{ width: `${(scores?.brutality || 9.9) * 10}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-xs font-mono mt-1">
              <span className="text-slate-400">Crowd Hype Consensus:</span>
              <span className="text-amber-400 font-bold">{scores?.crowd || 98}%</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-400 rounded-full" 
                style={{ width: `${scores?.crowd || 98}%` }}
              />
            </div>
          </div>
        </div>

        {/* AI JUDGE VERDICT & COMMENTARY */}
        <div className="md:col-span-2 glass-panel-glow rounded-3xl p-6 sm:p-7 border border-purple-500/30 flex flex-col justify-between shadow-2xl relative">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center justify-center text-2xl">
                ⚖️
              </div>
              <div>
                <h3 className="text-xl font-arcade font-bold text-white flex items-center gap-2">
                  {judge.name}
                </h3>
                <div className="text-xs font-mono text-purple-300">
                  {judge.title} &bull; Arena AI Chief Arbitrator
                </div>
              </div>
            </div>

            {/* Verdict text */}
            <div className="p-4 sm:p-5 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-slate-200 text-sm sm:text-base leading-relaxed font-sans mb-5 italic">
              "{judge.verdict}"
            </div>

            {/* Match Stats Comparison */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30">
                <div className="text-cyan-400 font-bold mb-1 truncate">{winner.name}</div>
                <div className="text-slate-400">Total Rhyme Score: <strong className="text-white">{(scores?.rhyme || 9.6)} / 10</strong></div>
                <div className="text-slate-400">Status: <strong className="text-emerald-400">SURVIVED & VICTORIOUS</strong></div>
              </div>
              <div className="p-3 rounded-xl bg-pink-950/30 border border-pink-500/30">
                <div className="text-pink-400 font-bold mb-1 truncate">{loser.name}</div>
                <div className="text-slate-400">Total Rhyme Score: <strong className="text-white">{(loserScores?.rhyme || 9.0)} / 10</strong></div>
                <div className="text-slate-400">Status: <strong className="text-rose-400">ELIMINATED BY PUNCHLINE</strong></div>
              </div>
            </div>
          </div>

          {/* Quick Match Action Buttons */}
          <div className="mt-6 pt-4 border-t border-purple-900/40 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => {
                audioEngine.playBell();
                onRematch();
              }}
              className="px-5 py-2.5 rounded-xl font-arcade font-bold text-xs bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-500/40 flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-cyan-400" />
              Quick Re-Match
            </button>

            <button
              onClick={() => {
                audioEngine.playLaser?.() || audioEngine.playClick();
                onRandomBattle();
              }}
              className="px-5 py-2.5 rounded-xl font-arcade font-bold text-xs bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white border border-pink-400/40 flex items-center gap-2 shadow-lg shadow-pink-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <Shuffle className="w-4 h-4 text-yellow-300" />
              Instant Random Battle
            </button>
          </div>
        </div>
      </div>

      {/* COLLECTIBLE ROAST CARD GENERATOR (PREVIEW & DOWNLOAD) */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-7 border border-pink-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-pink-900/40">
          <div>
            <span className="text-[10px] font-mono uppercase text-pink-400 font-bold tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              Shareable Collectible Card
            </span>
            <h3 className="text-xl font-arcade font-bold text-white">
              The Official Roast Card
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-purple-900/50 hover:bg-purple-800 text-purple-200 border border-purple-500/40 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy Punchline'}
            </button>

            <button
              onClick={downloadRoastCard}
              disabled={isExporting}
              className="px-4 py-2 rounded-xl font-arcade font-bold text-xs bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 hover:from-pink-500 hover:to-cyan-500 text-white border border-pink-400/40 flex items-center gap-2 shadow-lg shadow-pink-500/25 active:scale-95 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Roast Card (.PNG)
            </button>
          </div>
        </div>

        {/* THE VISUAL ROAST CARD (Holographic Foil Effect) */}
        <div
          ref={cardRef}
          className="holographic-foil rounded-2xl p-6 sm:p-8 border-2 border-pink-500/60 shadow-[0_0_35px_rgba(244,63,94,0.3)] relative overflow-hidden"
        >
          {/* Card Watermark Header */}
          <div className="flex items-center justify-between text-xs font-mono text-purple-300 mb-6 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎤</span>
              <span className="font-arcade font-bold tracking-widest text-white">
                VIBEROAST ARENA
              </span>
            </div>
            <span className="text-[11px] bg-black/60 px-2.5 py-1 rounded-full border border-purple-500/40">
              TRACK: {vibeMode.name.toUpperCase()}
            </span>
          </div>

          {/* Card Matchup & Winner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-black/60 border-2 border-amber-400 flex items-center justify-center text-4xl shadow-[0_0_15px_#eab308]">
                {winner.avatar}
              </div>
              <div>
                <div className="text-xs font-mono text-amber-400 uppercase font-bold flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5" /> WINNER & CHAMPION
                </div>
                <div className="text-2xl font-arcade font-extrabold text-white">
                  {winner.name}
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Defeated: {loser.name} ({loser.avatar})
                </div>
              </div>
            </div>

            {/* QR Mockup Box */}
            <div className="flex items-center gap-2.5 bg-black/60 px-3 py-2 rounded-xl border border-white/10 self-start sm:self-auto">
              <QrCode className="w-8 h-8 text-cyan-400" />
              <div className="text-[10px] font-mono text-slate-400 leading-tight">
                <span className="text-cyan-300 font-bold block">VERIFIED ROAST</span>
                Scan to replay
              </div>
            </div>
          </div>

          {/* Fatal Punchline Quote Display */}
          <div className="p-4 sm:p-5 rounded-xl bg-black/70 border border-pink-500/40 relative mb-4">
            <div className="text-[10px] font-mono uppercase text-pink-400 font-bold mb-1 flex items-center gap-1">
              <Flame className="w-3 h-3 text-pink-400" />
              FATAL PUNCHLINE OF THE MATCH
            </div>
            <p className="font-mono-code text-base sm:text-xl font-bold text-white italic leading-relaxed">
              "{topPunchline}"
            </p>
          </div>

          {/* Card Footer Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400 pt-2 border-t border-white/10">
            <div>
              FLOW: <strong className="text-cyan-400">{scores?.flow || 9.8}</strong> &bull; BRUTALITY: <strong className="text-pink-400">{scores?.brutality || 9.9}</strong>
            </div>
            <div className="text-amber-400 font-bold">
              CROWD DECIBELS: {scores?.crowd || 98}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
