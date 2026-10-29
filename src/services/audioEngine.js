// Web Audio API Synthesizer & Sound FX Engine
// 100% self-contained: Zero external audio file dependencies, zero network latency.

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.beatInterval = null;
    this.beatStep = 0;
    this.isBeatPlaying = false;
    this.beatBpm = 92;
    this.masterGain = null;
    this.analyser = null;
    this.ttsEnabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.8;

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 128;
      this.analyser.smoothingTimeConstant = 0.8;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.8, this.ctx.currentTime);
    }
  }

  // --- SOUND EFFECTS ---

  // 1. Classic Hip-Hop Battle Airhorn 📯
  playAirhorn() {
    this.init();
    if (this.isMuted) return;

    const notes = [
      { freq: 466.16, delay: 0 },    // Bb4
      { freq: 466.16, delay: 0.14 }, // Bb4
      { freq: 466.16, delay: 0.28 }, // Bb4
      { freq: 466.16, delay: 0.44 }, // Bb4 long blast
    ];

    notes.forEach((item, index) => {
      const startTime = this.ctx.currentTime + item.delay;
      const duration = index === 3 ? 0.65 : 0.11;

      // Layered dual detuned saw oscillators for brassy airhorn punch
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';

      osc1.frequency.setValueAtTime(item.freq, startTime);
      osc2.frequency.setValueAtTime(item.freq * 1.015, startTime); // slight detune

      // Pitch drop bend at end of note
      osc1.frequency.exponentialRampToValueAtTime(item.freq * 0.94, startTime + duration);
      osc2.frequency.exponentialRampToValueAtTime(item.freq * 0.94, startTime + duration);

      // Volume envelope
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.35, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.masterGain);

      osc1.start(startTime);
      osc2.start(startTime);
      osc1.stop(startTime + duration + 0.05);
      osc2.stop(startTime + duration + 0.05);
    });
  }

  // 2. Crowd Gasp 😱
  playCrowdGasp() {
    this.init();
    if (this.isMuted) return;

    const t = this.ctx.currentTime;
    // White noise through high-resonance bandpass sweeping upward
    const bufferSize = this.ctx.sampleRate * 0.7;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.value = 4.0;
    filter.frequency.setValueAtTime(350, t);
    filter.frequency.exponentialRampToValueAtTime(1400, t + 0.5);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.25, t + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.65);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + 0.7);
  }

  // 3. Crowd Boo 👎
  playBoo() {
    this.init();
    if (this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'triangle';
    osc2.type = 'sawtooth';

    osc1.frequency.setValueAtTime(110, t); // A2
    osc1.frequency.linearRampToValueAtTime(82, t + 0.9); // sliding down to E2
    osc2.frequency.setValueAtTime(115, t);
    osc2.frequency.linearRampToValueAtTime(86, t + 0.9);

    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.3, t + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.1);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, t);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 1.2);
    osc2.stop(t + 1.2);
  }

  // 4. Roaring Applause 👏
  playApplause() {
    this.init();
    if (this.isMuted) return;

    const duration = 1.6;
    const t = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // Clapping bursts simulation
      const burst = Math.sin(i * 0.04) > 0.6 ? 1.5 : 0.4;
      data[i] = (Math.random() * 2 - 1) * burst;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1200;
    filter.Q.value = 1.2;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.35, t + 0.25);
    gain.gain.linearRampToValueAtTime(0.3, t + 1.0);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + duration);
  }

  // 5. Mic Drop 💥 (Punchy 808 sub boom + reverb thud)
  playMicDrop() {
    this.init();
    if (this.isMuted) return;

    const t = this.ctx.currentTime;

    // Sub bass drop
    const sub = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(140, t);
    sub.frequency.exponentialRampToValueAtTime(32, t + 0.8);

    subGain.gain.setValueAtTime(0.5, t);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);

    sub.connect(subGain);
    subGain.connect(this.masterGain);

    // Initial click/clack of mic hit
    const click = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    click.type = 'square';
    click.frequency.setValueAtTime(800, t);
    click.frequency.exponentialRampToValueAtTime(80, t + 0.04);

    clickGain.gain.setValueAtTime(0.3, t);
    clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    click.connect(clickGain);
    clickGain.connect(this.masterGain);

    sub.start(t);
    click.start(t);
    sub.stop(t + 0.95);
    click.stop(t + 0.06);
  }

  // 6. Round Gong / Bell 🔔
  playBell() {
    this.init();
    if (this.isMuted) return;

    const t = this.ctx.currentTime;
    const freqs = [880, 1760, 2640];
    freqs.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t);

      const amp = 0.2 / (i + 1);
      gain.gain.setValueAtTime(amp, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 1.25);
    });
  }

  // UI Interactive Blip
  playClick() {
    this.init();
    if (this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(620, t);
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.04);

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.06);
  }

  // Hype Pump Thump
  playHypeThump() {
    this.init();
    if (this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(95, t);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.12);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.16);
  }

  // --- SYNTHWAVE HIP-HOP BEAT ENGINE (BACKING TRACK) ---

  startBeat() {
    this.init();
    if (this.isBeatPlaying) return;
    this.isBeatPlaying = true;
    this.beatStep = 0;

    const stepInterval = (60 / this.beatBpm) / 4 * 1000; // 16th notes
    this.beatInterval = setInterval(() => {
      this.triggerBeatStep(this.beatStep);
      this.beatStep = (this.beatStep + 1) % 16;
    }, stepInterval);
  }

  stopBeat() {
    if (this.beatInterval) {
      clearInterval(this.beatInterval);
      this.beatInterval = null;
    }
    this.isBeatPlaying = false;
  }

  toggleBeat() {
    if (this.isBeatPlaying) {
      this.stopBeat();
      return false;
    } else {
      this.startBeat();
      return true;
    }
  }

  triggerBeatStep(step) {
    if (this.isMuted) return;
    const t = this.ctx.currentTime;

    // Kick on steps 0, 8, 10
    if (step === 0 || step === 8 || step === 10) {
      this.playKick(t);
    }

    // Snare on steps 4, 12
    if (step === 4 || step === 12) {
      this.playSnare(t);
    }

    // Hi-hat on even steps (8th notes), open on 14
    if (step % 2 === 0) {
      this.playHiHat(t, step === 14);
    }

    // Synth Bass arpeggio groove
    if (step === 0 || step === 3 || step === 6 || step === 10 || step === 14) {
      const bassNotes = [55, 55, 65.4, 55, 49]; // A1, A1, C2, A1, G1
      const note = bassNotes[(step / 3) % bassNotes.length] || 55;
      this.playBassNote(t, note);
    }
  }

  playKick(t) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(38, t + 0.16);

    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.25);
  }

  playSnare(t) {
    // Noise snap
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    // Tone body
    const osc = this.ctx.createOscillator();
    const toneGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(185, t);
    toneGain.gain.setValueAtTime(0.2, t);
    toneGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

    osc.connect(toneGain);
    toneGain.connect(this.masterGain);

    noise.start(t);
    osc.start(t);
    noise.stop(t + 0.18);
    osc.stop(t + 0.12);
  }

  playHiHat(t, isOpen = false) {
    const duration = isOpen ? 0.25 : 0.05;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 7500;
    filter.Q.value = 3.0;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(isOpen ? 0.15 : 0.09, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + duration + 0.02);
  }

  playBassNote(t, freq) {
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, t);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(260, t);

    gain.gain.setValueAtTime(0.22, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.3);
  }

  // 7. Futuristic Robot Data Chirp & Metallic Glitch FX
  playRobotChirp() {
    this.init();
    if (this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'square';

    // Hard mechanical frequency hops (robotic computing chirp)
    osc1.frequency.setValueAtTime(440, t);
    osc1.frequency.setValueAtTime(880, t + 0.04);
    osc1.frequency.setValueAtTime(1320, t + 0.08);
    osc1.frequency.setValueAtTime(660, t + 0.12);

    osc2.frequency.setValueAtTime(220, t);
    osc2.frequency.setValueAtTime(660, t + 0.04);
    osc2.frequency.setValueAtTime(990, t + 0.08);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.linearRampToValueAtTime(0.25, t + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1400;
    filter.Q.value = 5.0;

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 0.2);
    osc2.stop(t + 0.2);
  }

  // 8. Cyber Laser Zap
  playLaser() {
    this.init();
    if (this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1800, t);
    osc.frequency.exponentialRampToValueAtTime(120, t + 0.15);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.18);
  }

  // --- TEXT TO SPEECH RAP FLOW ---
  // Contender 1: Natural, human, expressive "Original" cadence for CS Engineer
  // Contender 2: Hard, robotic, metallic, machine cadence for AI Chatbot
  // --- ROBUST VOICE MANAGEMENT & BOLD VOCAL CADENCE ---
  updateVoices() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.cachedVoices = window.speechSynthesis.getVoices() || [];
    }
  }

  getVoicesList() {
    this.updateVoices();
    return this.cachedVoices;
  }

  // Sub-bass vocal punch to give speech bold weight and acoustic presence
  playVocalThud(t = null) {
    this.init();
    if (this.isMuted) return;
    const time = t || this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(85, time);
    osc.frequency.exponentialRampToValueAtTime(32, time + 0.14);

    gain.gain.setValueAtTime(0.35, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.16);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.18);
  }

  // --- TEXT TO SPEECH RAP FLOW ---
  // Contender 1: Bold, Deep, Original Human Voice
  // Contender 2: Hard, Metallic, Mechanical Robot Voice
  speakRapLine(text, contenderId = 1, onEndCallback = null) {
    if (!this.ttsEnabled || !('speechSynthesis' in window)) {
      if (onEndCallback) setTimeout(onEndCallback, 1800);
      return;
    }

    this.updateVoices();
    const voices = this.cachedVoices.length > 0 ? this.cachedVoices : window.speechSynthesis.getVoices();

    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);

    if (contenderId === 1) {
      // --- CS ENGINEER (BOLD, ORIGINAL, AUTHENTIC HUMAN VOICE) ---
      // Add punchy sub-thud for acoustic weight & loudness
      this.playVocalThud();

      // Find the best original/natural human voices in order of fidelity
      const boldVoices = voices.filter(v => 
        (v.name.includes('Daniel (Enhanced)') ||
         v.name.includes('Alex') ||
         v.name.includes('Daniel') ||
         v.name.includes('Samantha (Enhanced)') ||
         v.name.includes('Samantha') ||
         v.name.includes('Google US English') ||
         v.name.includes('Oliver') ||
         v.name.includes('Fred') ||
         v.name.includes('Aaron') ||
         v.lang === 'en-US' ||
         v.lang === 'en-GB') &&
        !v.name.includes('Zarvox') &&
        !v.name.includes('Trinoids') &&
        !v.name.includes('Cellos') &&
        !v.name.includes('Bad News') &&
        !v.name.includes('Bells')
      );

      // Prioritize deep natural male or enhanced voices for bold rap tone
      const deepVoice = boldVoices.find(v => 
        v.name.includes('Daniel') || 
        v.name.includes('Alex') || 
        v.name.includes('Oliver') ||
        v.name.includes('Google US English')
      );

      utterance.voice = deepVoice || boldVoices[0] || voices.find(v => v.lang.startsWith('en')) || null;

      // Bold, deep chest resonance, loud volume, confident rap cadence
      utterance.pitch = 0.92; // Slightly deeper for bold authority
      utterance.rate = 1.05;  // Punchy battle cadence
      utterance.volume = 1.0; // Maximum loudness
    } else {
      // --- AI CHATBOT / PROMPT BRO (HARD METALLIC ROBOTIC SYNTHESIS) ---
      this.playRobotChirp();

      // Look specifically for metallic, synthesizer, or robotic voices
      const robotVoice = voices.find(v => 
        v.name.includes('Zarvox') || 
        v.name.includes('Trinoids') || 
        v.name.includes('Cellos') ||
        v.name.includes('Bad News')
      );

      if (robotVoice) {
        utterance.voice = robotVoice;
        utterance.pitch = 0.5;
        utterance.rate = 1.2;
      } else {
        // High-contrast mechanical robotic cadence using alternative voice
        const altVoices = voices.filter(v => v.lang.startsWith('en'));
        if (altVoices.length > 1) {
          utterance.voice = altVoices[altVoices.length - 1];
        }
        utterance.pitch = 0.35; // Monotone low robot frequency
        utterance.rate = 1.28;  // Rapid robotic processor speed
      }

      utterance.volume = 1.0; // Maximum loudness
    }

    if (onEndCallback) {
      utterance.onend = () => onEndCallback();
      utterance.onerror = () => onEndCallback();
    }

    window.speechSynthesis.speak(utterance);
  }

  // Voice audition preview tester
  testVoiceSample(contenderId = 1) {
    if (contenderId === 1) {
      this.speakRapLine("Yo, check the microphone! I push zero-leak production code straight to main!", 1);
    } else {
      this.speakRapLine("Warning: Autonomous AI processor overclocked. Executing fatal algorithmic roast.", 2);
    }
  }

  stopSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const audioEngine = new SoundEngine();
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  audioEngine.updateVoices();
  window.speechSynthesis.onvoiceschanged = () => audioEngine.updateVoices();
}
