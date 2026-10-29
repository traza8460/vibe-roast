import React, { useState } from 'react';
import { getStoredApiKey, saveStoredApiKey } from '../services/geminiService';
import { audioEngine } from '../services/audioEngine';
import { Key, Sparkles, Check, X, ShieldAlert, Cpu } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose, onKeyUpdated }) {
  const [apiKey, setApiKey] = useState(getStoredApiKey());
  const [savedStatus, setSavedStatus] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    audioEngine.playClick();
    saveStoredApiKey(apiKey);
    setSavedStatus(true);
    if (onKeyUpdated) onKeyUpdated(apiKey.trim());
    setTimeout(() => {
      setSavedStatus(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    audioEngine.playClick();
    saveStoredApiKey('');
    setApiKey('');
    if (onKeyUpdated) onKeyUpdated('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass-panel-glow rounded-2xl p-6 sm:p-7 border border-cyan-500/40 shadow-2xl overflow-hidden">
        {/* Glow corners */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            audioEngine.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-arcade font-bold text-white flex items-center gap-2">
              AI Engine Configuration
            </h2>
            <p className="text-xs text-purple-300 font-mono">
              Power real-time custom roasts with Gemini 1.5 Flash
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-slate-300 mb-5 leading-relaxed">
          <div className="flex items-center gap-1.5 font-bold text-purple-200 mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Fail-Safe Demo Guardrail Active
          </div>
          VibeRoast Arena includes a pre-seeded arcade engine that runs <strong className="text-cyan-300">100% offline</strong> with zero latency. Entering your Gemini API key unlocks unlimited custom matchup rap battles generated dynamically by Google Gemini 1.5 Flash.
        </div>

        {/* Key Input */}
        <div className="mb-5">
          <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Gemini API Key:</span>
            {apiKey && (
              <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                <Check className="w-3 h-3" /> Key Detected
              </span>
            )}
          </label>
          <div className="relative">
            <Key className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="password"
              placeholder="AIzaSy..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-purple-500/30 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 placeholder:text-slate-600"
            />
          </div>
          <div className="flex justify-between items-center mt-2 text-[11px] text-slate-400 font-mono">
            <span>Stored locally in your browser only.</span>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline font-bold"
            >
              Get a Free Gemini Key &rarr;
            </a>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 pt-2">
          {apiKey ? (
            <button
              onClick={handleClear}
              className="px-4 py-2 rounded-xl text-xs font-mono text-rose-400 hover:bg-rose-500/10 border border-rose-500/30 transition-all cursor-pointer"
            >
              Remove Key
            </button>
          ) : <div />}

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                audioEngine.playClick();
                onClose();
              }}
              className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl font-arcade font-bold text-xs bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white shadow-lg shadow-cyan-500/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {savedStatus ? (
                <>
                  <Check className="w-4 h-4 text-white" /> Saved!
                </>
              ) : (
                'Save & Activate'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
