# 🎤 VibeRoast Arena: The AI Rap & Roast Battle Engine

> **Track / Theme**: Technology for Fun & Creative AI  
> **Aesthetic**: Deep Dark Arcade Synthwave (`#0a0a14`, Neon Violet `#a855f7`, Electric Cyan `#06b6d4`, Hot Pink `#f43f5e`, Arcade Gold `#f59e0b`)

---

## ⚡ Overview

**VibeRoast Arena** is a hyper-engaging, ultra-modern Web Application that pits legendary tech, campus, and lifestyle archetypes (or user-created custom contenders) against each other in algorithmic verbal rap combat.

Built with **pure React + Vite + Tailwind CSS + Web Audio API + Lucide Icons + Canvas Confetti**, the app works **100% offline out-of-the-box** with rich pre-seeded battle flows, while offering dynamic live LLM generation when connected to Google's **Gemini 1.5 Flash**.

---

## 🎮 Key Stages & Architecture

### 1. Battle Setup Stage
- **Contender Cards**: Select from iconic presets or fully customize avatars and traits:
  - 💻 **Overworked CS Engineer** (LeetCode Addict, Vim Master, 404 Sleep)
  - 🤖 **ChatGPT Prompt Bro** ("Act As A...", 10x Copy-Paster, LinkedIn Influencer)
  - 🍜 **DTU Hosteller** (Lord of 3 AM Maggi, Proxy Attendance Pro, Zero Laundry)
  - 🎒 **Day Scholar** (Yellow Line Metro Connoisseur, 7 AM Alarm, Homemade Dabba)
  - ☕ **Coffee Addict** (Triple-Shot Espresso Fiend, 12 Cups/Day, Shaky Hands)
  - ⚡ **RedBull Fanatic** (Taurine Overclocked Demon, 160 BPM, Neon Blue Tongue)
  - 🎨 **Frontend Pixel Snob** (Z-Index: 999999 Specialist, Bézier Perfectionist)
  - 🦀 **Backend Rust Crusader** (Borrow Checker Inquisitor, Memory Safe)
- **Vibe Mode Selector**:
  - 🔥 **Savage Tech Roast**: Brutal code, production outages, and GitHub cemetery burns.
  - 🎓 **Clean College Banter**: Relatable campus gossip, 75% attendance panics, and hostel mayhem.
  - 📜 **Shakespearean Diss**: Elizabethan iambic insults and 16th-century poetic obliteration.
- **Featured Rivalry Shortcuts & Randomizer**: One-click rivalry matchmaking.
- **Soundwave Pulsing CTA**: High-energy "START RAP BATTLE!" button with audio feedback.

### 2. Live Battleground Arena (Main Event UI)
- **Dynamic Split Screen**: Turn-based spotlighting with animated 2D avatar cards that bounce on beat, display active microphone badges, and react with shock animations (`😱 OOF!`) when critical punchlines land.
- **Live Lyric Teleprompter**:
  - Displays rhyming verses round-by-round (**Round 1: The Intro Diss**, **Round 2: Counter Attack**, **Round 3: The Mic Drop**).
  - Highlights rhyme couplets and flags fatal punchlines with animated fire badges.
- **Real-Time Audio Visualizer**: HTML5 Canvas FFT spectrogram rendering glowing frequency bars and reactive waveform physics.
- **Web Audio API Synth Engine**: 100% self-contained synthesized sound FX with zero network latency:
  - 📯 **Airhorn**: Authentic 4-blast battle rap horn with pitch bend.
  - 😱 **Crowd Gasp**: Resonance-swept bandpass white noise.
  - 👎 **Crowd Boo**: Dissonant downward saw drone.
  - 👏 **Applause**: Layered stereo noise clapping bursts.
  - 💥 **Mic Drop**: 808 sub-bass boom with reverberated click.
  - 🔔 **Round Bell**: Arcade brass gong.
  - 🎵 **808 Hip-Hop Beat**: Built-in 92 BPM synth drum machine backing track.
- **Live Hype / Decibel Cheer Meter**:
  - Interactive click or **Spacebar** pump button to raise crowd decibels.
  - Spawns floating particles (`🔥`, `💀`, `🎤`, `⚡`, `+50 HYPE`).
  - Live marquee ticker featuring simulated crowd tweets and reactions.
- **Text-to-Speech (TTS) Flow**: Integrated browser SpeechSynthesis vocalizing each verse with tailored pitch and cadence per contender.

### 3. AI Judge & Verdict Stage
- **Crowd Decision & Confetti**: Multi-stage `canvas-confetti` explosion with applause and airhorn cues.
- **Scoring Breakdown**: Radar progress metrics for *Flow & Rhythm*, *Brutality Factor*, and *Crowd Decibels*.
- **AI Judge Persona**: Verdict commentary by **DJ Algo-Rhythm** (Chief AI Roast Officer).
- **Roast Card Generator**:
  - Holographic synthwave collectible card with winner badge, fatal punchline, and QR mockup.
  - **Download as PNG**: Uses HTML Canvas rendering to export high-res trading cards.
  - **Copy Punchline**: One-click clipboard copy with instant toast confirmation.
- **Replayability**: "Quick Re-match" and "Instant Random Battle" buttons for continuous arcade gameplay.

---

## 🛠️ Fail-Safe Demo Guardrails

- **Zero-Dependency Offline Vault**: Works completely offline without requiring any API keys.
- **Optional Gemini 1.5 Flash Integration**:
  - Click the **API Key** button in the header.
  - Input your Google AI Studio API key to unlock dynamic LLM generation for any custom contenders or prompts.
  - Uses structured JSON output with automatic schema fallback.
- **Zero Broken Clicks**: Every single button, slider, and keyboard shortcut provides immediate visual or acoustic feedback.

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
http://localhost:5173
```

---

## ⌨️ Keyboard Shortcuts

- `[SPACEBAR]`: Pump up Crowd Decibel Hype Meter (+12 dB)
