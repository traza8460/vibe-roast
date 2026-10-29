// Gemini 1.5 Flash Battle Generation Service
import { generateDynamicBattle } from '../data/battlePresets';

const STORAGE_KEY = 'vibe_roast_gemini_api_key';

export function getStoredApiKey() {
  try {
    return localStorage.getItem(STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

export function saveStoredApiKey(key) {
  try {
    if (!key) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, key.trim());
    }
  } catch (e) {
    console.error('Error saving API key to localStorage', e);
  }
}

export async function generateBattleWithGemini(c1, c2, vibeMode, apiKey) {
  const effectiveKey = apiKey || getStoredApiKey();

  if (!effectiveKey) {
    // Pure offline fallback generator
    return generateDynamicBattle(c1, c2, vibeMode.id);
  }

  const prompt = `You are DJ Algo-Rhythm, the world champion AI rap & roast battle master.
Generate an electrifying, 3-round rhyming rap roast battle between two contenders.

Contender 1: "${c1.name}" (Avatar: ${c1.avatar}, Traits: ${c1.traits?.join(', ') || 'N/A'})
Contender 2: "${c2.name}" (Avatar: ${c2.avatar}, Traits: ${c2.traits?.join(', ') || 'N/A'})
Vibe Mode: "${vibeMode.name}" (${vibeMode.desc})

STRICT RULES:
1. Exactly 3 Rounds:
   - Round 1: The Intro Diss
   - Round 2: Counter Attack
   - Round 3: The Mic Drop
2. Each contender MUST spit EXACTLY 4 lines per round.
3. Every verse MUST have clever, undeniable rhymes (AABB or ABAB) and high-energy rap cadence.
4. Verses must incorporate the specific personalities, traits, and culture of the contenders.
5. Highlight the single most savage punchline line for Contender 1 (punchlineC1) and Contender 2 (punchlineC2) in each round.
6. Provide an AI Judge decision with winner (1 or 2), a witty verdict commentary, and scores out of 10 for flow, brutality, rhyme, and crowd hype (out of 100).

Return ONLY valid raw JSON matching this EXACT structure with no surrounding markdown or explanation:
{
  "title": "Short Epic Battle Title",
  "winner": 1,
  "judge": {
    "name": "DJ Algo-Rhythm",
    "title": "Chief AI Roast Officer",
    "verdict": "2-3 sentences explaining why the winner edged out the battle.",
    "scores": {
      "contender1": { "flow": 9.7, "brutality": 9.8, "rhyme": 9.5, "crowd": 96 },
      "contender2": { "flow": 9.4, "brutality": 9.1, "rhyme": 9.2, "crowd": 88 }
    }
  },
  "rounds": [
    {
      "roundNumber": 1,
      "title": "Round 1: The Intro Diss",
      "c1Verse": ["Line 1", "Line 2", "Line 3", "Line 4"],
      "c2Verse": ["Line 1", "Line 2", "Line 3", "Line 4"],
      "punchlineC1": "standout savage line from C1",
      "punchlineC2": "standout savage line from C2"
    },
    {
      "roundNumber": 2,
      "title": "Round 2: Counter Attack",
      "c1Verse": ["Line 1", "Line 2", "Line 3", "Line 4"],
      "c2Verse": ["Line 1", "Line 2", "Line 3", "Line 4"],
      "punchlineC1": "standout savage line from C1",
      "punchlineC2": "standout savage line from C2"
    },
    {
      "roundNumber": 3,
      "title": "Round 3: The Mic Drop",
      "c1Verse": ["Line 1", "Line 2", "Line 3", "Line 4"],
      "c2Verse": ["Line 1", "Line 2", "Line 3", "Line 4"],
      "punchlineC1": "standout savage line from C1",
      "punchlineC2": "standout savage line from C2"
    }
  ]
}`;

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${effectiveKey}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.85,
          topP: 0.95,
          maxOutputTokens: 2048,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.warn('Gemini API call failed, falling back to offline vault:', errData);
      return generateDynamicBattle(c1, c2, vibeMode.id);
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      return generateDynamicBattle(c1, c2, vibeMode.id);
    }

    // Clean JSON markdown fences if present
    const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    // Validate essential properties
    if (parsed.rounds && parsed.rounds.length === 3 && parsed.judge) {
      return parsed;
    } else {
      return generateDynamicBattle(c1, c2, vibeMode.id);
    }
  } catch (error) {
    console.error('Gemini error, using rock-solid offline fallback:', error);
    return generateDynamicBattle(c1, c2, vibeMode.id);
  }
}
