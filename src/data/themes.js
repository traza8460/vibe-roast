// Arena Themes System: vibrant color schemes with animated atmospheres

export const ARENA_THEMES = [
  {
    id: 'cyber-overdrive',
    name: 'Cyber Overdrive',
    icon: '⚡',
    badge: 'DEFAULT NEON',
    bg: '#070818',
    cardBg: 'rgba(12, 14, 34, 0.82)',
    cyan: '#00f0ff',
    pink: '#ff007f',
    accent: '#ffd600',
    violet: '#8b5cf6',
    ambient1: 'rgba(0, 240, 255, 0.22)',
    ambient2: 'rgba(255, 0, 127, 0.22)'
  },
  {
    id: 'inferno-gold',
    name: 'Inferno Gold',
    icon: '🔥',
    badge: 'VOLCANIC FLAME',
    bg: '#10070a',
    cardBg: 'rgba(28, 12, 16, 0.82)',
    cyan: '#ffbe0b',
    pink: '#ff0055',
    accent: '#fb5607',
    violet: '#d946ef',
    ambient1: 'rgba(255, 190, 11, 0.22)',
    ambient2: 'rgba(255, 0, 85, 0.22)'
  },
  {
    id: 'matrix-emerald',
    name: 'Matrix Emerald',
    icon: '🧬',
    badge: 'HACKER TERMINAL',
    bg: '#040d0a',
    cardBg: 'rgba(8, 24, 18, 0.82)',
    cyan: '#00ff88',
    pink: '#00e5ff',
    accent: '#76ff03',
    violet: '#10b981',
    ambient1: 'rgba(0, 255, 136, 0.22)',
    ambient2: 'rgba(0, 229, 255, 0.22)'
  },
  {
    id: 'synthwave-sunset',
    name: 'Synthwave Sunset',
    icon: '🌌',
    badge: 'RETRO 80s DUSK',
    bg: '#0f0822',
    cardBg: 'rgba(22, 12, 42, 0.82)',
    cyan: '#3a86ff',
    pink: '#ff2a85',
    accent: '#ff9e00',
    violet: '#c084fc',
    ambient1: 'rgba(58, 134, 255, 0.22)',
    ambient2: 'rgba(255, 42, 133, 0.22)'
  }
];

export function applyTheme(theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--bg-dark', theme.bg);
  root.style.setProperty('--electric-cyan', theme.cyan);
  root.style.setProperty('--hot-pink', theme.pink);
  root.style.setProperty('--arcade-gold', theme.accent);
  root.style.setProperty('--neon-violet', theme.violet);
}
