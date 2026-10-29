import React, { useEffect, useRef } from 'react';
import { audioEngine } from '../services/audioEngine';

export default function AudioVisualizer({ isRapActive, activeContender = 1, hypeLevel = 50 }) {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const numBars = 36;
    const barHistory = new Array(numBars).fill(0);
    const peakHistory = new Array(numBars).fill(0);

    let phase = 0;

    const render = () => {
      // Handle canvas resolution
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Check if real Web Audio Analyser has data
      let freqData = null;
      if (audioEngine.analyser && audioEngine.ctx && audioEngine.ctx.state === 'running') {
        const bufferLength = audioEngine.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        audioEngine.analyser.getByteFrequencyData(dataArray);

        // Check if there is actual sound energy
        let totalEnergy = 0;
        for (let i = 0; i < bufferLength; i++) totalEnergy += dataArray[i];
        if (totalEnergy > 50) {
          freqData = dataArray;
        }
      }

      phase += 0.08;
      const barWidth = (width / numBars) * 0.7;
      const spacing = (width / numBars) * 0.3;

      // Primary color based on active contender or hype
      const primaryColor = activeContender === 1 ? '#06b6d4' : '#f43f5e';
      const secondaryColor = '#a855f7';

      for (let i = 0; i < numBars; i++) {
        let barHeight = 0;

        if (freqData) {
          // Real audio frequencies from beat or synthesizer
          const binIndex = Math.floor((i / numBars) * (freqData.length * 0.6));
          const val = freqData[binIndex] || 0;
          barHeight = (val / 255) * height * 0.88;
        } else if (isRapActive) {
          // Dynamic procedural beat wave when contender is spitting bars
          const wave1 = Math.sin(phase * 1.5 + i * 0.35);
          const wave2 = Math.cos(phase * 2.2 - i * 0.2);
          const wave3 = Math.sin(phase * 0.8 + i * 0.8);
          const combined = (wave1 + wave2 + wave3 + 3) / 6; // 0 to 1
          const energyMultiplier = 0.4 + (hypeLevel / 100) * 0.6;
          barHeight = combined * height * 0.85 * energyMultiplier;
        } else {
          // Idle synthwave breathing glow
          const idleWave = (Math.sin(phase * 0.5 + i * 0.2) + 1) / 2;
          barHeight = Math.max(4, idleWave * height * 0.25);
        }

        // Smooth interpolation
        barHistory[i] = barHistory[i] * 0.65 + barHeight * 0.35;
        const currentH = Math.max(4, barHistory[i]);

        // Peak caps
        if (currentH > peakHistory[i]) {
          peakHistory[i] = currentH;
        } else {
          peakHistory[i] = Math.max(0, peakHistory[i] - 1.2);
        }

        const x = i * (barWidth + spacing) + spacing / 2;
        const y = height - currentH;

        // Gradient for bar
        const gradient = ctx.createLinearGradient(0, y, 0, height);
        if (i % 2 === 0) {
          gradient.addColorStop(0, primaryColor);
          gradient.addColorStop(1, secondaryColor);
        } else {
          gradient.addColorStop(0, secondaryColor);
          gradient.addColorStop(1, primaryColor);
        }

        ctx.fillStyle = gradient;
        ctx.shadowColor = primaryColor;
        ctx.shadowBlur = isRapActive ? 10 : 4;

        // Draw rounded bar
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, currentH, [3, 3, 0, 0]);
        ctx.fill();

        // Draw Peak Cap
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 6;
        const peakY = height - peakHistory[i] - 2;
        ctx.fillRect(x, Math.max(0, peakY), barWidth, 2);
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isRapActive, activeContender, hypeLevel]);

  return (
    <div className="relative w-full h-16 sm:h-20 bg-[#0e0e22]/90 rounded-xl p-2 border border-purple-500/20 backdrop-blur-md overflow-hidden">
      {/* Background glow spot */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none transition-all duration-500"
        style={{
          background: activeContender === 1 
            ? 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)' 
            : 'radial-gradient(circle, rgba(244,63,94,0.4) 0%, transparent 70%)'
        }}
      />
      <canvas
        ref={canvasRef}
        width={700}
        height={80}
        className="w-full h-full block"
      />
      <div className="absolute top-1 left-3 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-purple-300/70">
        <span className={`w-1.5 h-1.5 rounded-full ${isRapActive ? 'bg-cyan-400 animate-ping' : 'bg-slate-500'}`} />
        Real-Time Audio Visualizer (FFT Spectrogram)
      </div>
      <div className="absolute top-1 right-3 text-[10px] font-mono text-cyan-400/80">
        {activeContender === 1 ? 'MIC 1: ACTIVE' : 'MIC 2: ACTIVE'}
      </div>
    </div>
  );
}
