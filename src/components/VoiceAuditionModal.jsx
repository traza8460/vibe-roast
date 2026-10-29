import React, { useState } from 'react';
import { audioEngine } from '../services/audioEngine';
import { Volume2, Play, Check, X, Mic, Radio, Sparkles, Sliders, ShieldCheck } from 'lucide-react';

export default function VoiceAuditionModal({ isOpen, onClose }) {
  const [playingContender, setPlayingContender] = useState(null);

  if (!isOpen) return null;

  const handleTestHuman = () => {
    audioEngine.playClick();
    setPlayingContender(1);
    audioEngine.testVoiceSample(1);
    setTimeout(() => setPlayingContender(null), 3500);
  };

  const handleTestRobot = () => {
    audioEngine.playClick();
    setPlayingContender(2);
    audioEngine.testVoiceSample(2);
    setTimeout(() => setPlayingContender(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl glass-panel-glow rounded-3xl p-6 sm:p-8 border-2 border-cyan-400/50 shadow-2xl overflow-hidden">
        {/* Glow corners */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            audioEngine.playClick();
            audioEngine.stopSpeech();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <Sliders className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-arcade font-extrabold text-white flex items-center gap-2">
              Vocal Engine Studio
            </h2>
            <p className="text-xs text-purple-300 font-mono">
              Audition & verify bold human flow vs hard robotic AI machine voices
            </p>
          </div>
        </div>

        {/* Voice Cards */}
        <div className="flex flex-col gap-4 mb-6">
          {/* CS Engineer / Human Voice */}
          <div className="p-4 sm:p-5 rounded-2xl bg-cyan-950/40 border-2 border-cyan-400/60 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400 flex items-center justify-center text-2xl shadow-[0_0_12px_#06b6d4]">
                💻
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
                  CONTENDER 1 &bull; CS ENGINEER
                </div>
                <div className="text-base font-arcade font-bold text-white">
                  Original Human Rap Flow
                </div>
                <div className="text-xs font-mono text-slate-300 mt-0.5">
                  Deep resonant chest cadence &bull; Natural pacing &bull; Maximum volume
                </div>
              </div>
            </div>

            <button
              onClick={handleTestHuman}
              className={`px-4 py-2.5 rounded-xl text-xs font-arcade font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                playingContender === 1
                  ? 'bg-cyan-400 text-black shadow-[0_0_15px_#06b6d4] scale-105'
                  : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-400/50'
              }`}
            >
              <Play className={`w-4 h-4 ${playingContender === 1 ? 'animate-spin' : ''}`} />
              {playingContender === 1 ? 'Playing...' : 'Test Human'}
            </button>
          </div>

          {/* AI Chatbot / Robot Voice */}
          <div className="p-4 sm:p-5 rounded-2xl bg-pink-950/40 border-2 border-pink-400/60 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 text-pink-300 border border-pink-400 flex items-center justify-center text-2xl shadow-[0_0_12px_#f43f5e]">
                🤖
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-pink-400 font-bold tracking-wider">
                  CONTENDER 2 &bull; AI CHATBOT
                </div>
                <div className="text-base font-arcade font-bold text-white">
                  Hard Robotic Cyber Machine
                </div>
                <div className="text-xs font-mono text-slate-300 mt-0.5">
                  Robotic chirp data burst &bull; Metallic monotone &bull; Rapid cadence
                </div>
              </div>
            </div>

            <button
              onClick={handleTestRobot}
              className={`px-4 py-2.5 rounded-xl text-xs font-arcade font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                playingContender === 2
                  ? 'bg-pink-500 text-white shadow-[0_0_15px_#f43f5e] scale-105'
                  : 'bg-pink-500/20 hover:bg-pink-500/30 text-pink-200 border border-pink-400/50'
              }`}
            >
              <Radio className={`w-4 h-4 ${playingContender === 2 ? 'animate-pulse' : ''}`} />
              {playingContender === 2 ? 'Synthesizing...' : 'Test Robot'}
            </button>
          </div>
        </div>

        {/* Loudness Guarantee Note */}
        <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 text-xs text-slate-300 flex items-center gap-2.5 font-mono mb-6">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            Audio volume is calibrated at <strong>100% full gain</strong> with 808 sub-bass thud reinforcement on every rhyme line.
          </span>
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              audioEngine.playClick();
              audioEngine.stopSpeech();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl font-arcade font-bold text-xs bg-gradient-to-r from-cyan-500 to-pink-500 text-white shadow-lg shadow-cyan-500/20 hover:opacity-90 active:scale-95 transition-all cursor-pointer"
          >
            Done & Apply
          </button>
        </div>
      </div>
    </div>
  );
}
