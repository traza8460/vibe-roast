// Archetype Presets, Vibe Modes, and Pre-seeded Battle Vault

export const ARCHETYPES = [
  {
    id: 'cs-engineer',
    name: 'Overworked CS Engineer',
    title: 'Senior Git Merge Conflict Survivor',
    avatar: '💻',
    color: '#06b6d4', // Electric Cyan
    traits: ['LeetCode Addict', 'Vim Master', '404 Sleep', 'Dark Mode Only'],
    bio: 'Survives entirely on git stash pop and imposter syndrome.',
    signatureMove: 'Stack Overflow Drop'
  },
  {
    id: 'prompt-bro',
    name: 'ChatGPT Prompt Bro',
    title: 'Chief Hallucination Officer',
    avatar: '🤖',
    color: '#f43f5e', // Hot Pink
    traits: ['"Act As A..."', '10x Copy-Paster', 'LinkedIn Influencer', 'Zero Commits'],
    bio: 'Calls himself a 100x engineer after generating a broken snake game.',
    signatureMove: 'Autonomous Hallucination'
  },
  {
    id: 'dtu-hosteller',
    name: 'DTU Hosteller',
    title: 'Lord of 3 AM Maggi',
    avatar: '🍜',
    color: '#f59e0b', // Amber
    traits: ['Proxy Attendance Pro', 'Hostel Wifi Hunter', 'Exam Night Coder', 'Zero Laundry'],
    bio: 'Has not seen the morning sun since the 2023 freshers orientation.',
    signatureMove: 'Night Canteen Blitz'
  },
  {
    id: 'day-scholar',
    name: 'Day Scholar',
    title: 'Yellow Line Metro Connoisseur',
    avatar: '🎒',
    color: '#10b981', // Emerald
    traits: ['7 AM Alarm', 'Homemade Dabba', '85% Attendance', 'Departs at 4:59 PM'],
    bio: 'Can navigate Kashmere Gate interchange blindfolded during peak rush.',
    signatureMove: 'Metro Rush Hour Dash'
  },
  {
    id: 'coffee-addict',
    name: 'Coffee Addict',
    title: 'Triple-Shot Espresso Fiend',
    avatar: '☕',
    color: '#d97706', // Brown/Amber
    traits: ['Shaky Hands', '12 Cups A Day', 'Dark Roast Blood', 'French Press Purist'],
    bio: 'Their resting heart rate sounds like a drum and bass breakdown.',
    signatureMove: 'Espresso Overdrive'
  },
  {
    id: 'redbull-fanatic',
    name: 'RedBull Fanatic',
    title: 'Taurine Overclocked Demon',
    avatar: '⚡',
    color: '#38bdf8', // Sky Blue
    traits: ['Carbonated Wings', '160 BPM Resting', 'Gaming Till 6 AM', 'Neon Blue Tongue'],
    bio: 'Considers water an unnecessary dilution of synthetic energy.',
    signatureMove: 'Supersonic Jitter'
  },
  {
    id: 'frontend-pixel',
    name: 'Frontend Pixel Snob',
    title: 'Z-Index: 999999 Specialist',
    avatar: '🎨',
    color: '#ec4899', // Pink
    traits: ['Div Centering Guru', 'Bézier Perfectionist', 'Figma Overlord', 'Tailwind Skeptic'],
    bio: 'Gets physical migraines when margins are off by 0.5 pixels.',
    signatureMove: 'Flexbox Sub-Pixel Burn'
  },
  {
    id: 'backend-rust',
    name: 'Backend Rust Crusader',
    title: 'Borrow Checker Inquisitor',
    avatar: '🦀',
    color: '#a855f7', // Violet
    traits: ['Zero Cost Abstractions', 'Memory Safe', 'Thread Fearless', 'Segfault Shamer'],
    bio: 'Rewrites their toaster firmware in Rust for fearless concurrency.',
    signatureMove: 'Lifetime Panic'
  }
];

export const VIBE_MODES = [
  {
    id: 'savage-tech',
    name: 'Savage Tech Roast',
    icon: '🔥',
    badge: 'UNFILTERED BRUTALITY',
    desc: 'Ruthless algorithmic barbs, production outages, and GitHub cemetery roasts.'
  },
  {
    id: 'clean-college',
    name: 'Clean College Banter',
    icon: '🎓',
    badge: 'CAMPUS CLASH',
    desc: 'Relatable canteen gossip, 75% attendance panics, and hostel room mayhem.'
  },
  {
    id: 'shakespearean',
    name: 'Shakespearean Diss',
    icon: '📜',
    badge: 'ELIZABETHAN FLOW',
    desc: 'Ye olde iambic insults, theatrical pomp, and poetic 16th-century obliteration.'
  }
];

export const AVATAR_OPTIONS = [
  '💻', '🤖', '🍜', '🎒', '☕', '⚡', '🎨', '🦀',
  '🔥', '💀', '🍕', '🛸', '🎧', '🕶️', '🧬', '🥊'
];

// Richly crafted pre-seeded battle flows for instant 100% offline perfection
export const PRESEEDED_BATTLES = {
  // 1. Overworked CS Engineer vs ChatGPT Prompt Bro (Savage Tech Roast)
  'cs-engineer-vs-prompt-bro-savage-tech': {
    title: 'Git Commit Grinder vs AI Hallucinator',
    winner: 1, // CS Engineer wins with raw debugging reality
    judge: {
      name: 'DJ Algo-Rhythm',
      title: 'Chief AI Roast Officer',
      verdict: 'The CS Engineer dissected Prompt Bro with zero runtime overhead. Prompt Bro ran out of context tokens by round three!',
      scores: {
        contender1: { flow: 9.8, brutality: 9.9, rhyme: 9.6, crowd: 98 },
        contender2: { flow: 9.2, brutality: 8.8, rhyme: 9.0, crowd: 84 }
      }
    },
    rounds: [
      {
        roundNumber: 1,
        title: 'Round 1: The Intro Diss',
        c1Verse: [
          "You type three words into an input box and call yourself an engineer,",
          "Your entire skill set depreciates before the end of the fiscal year!",
          "I write distributed microservices in raw C and zero-leak memory,",
          "You copy-paste from an LLM that hallucinates an imaginary directory!"
        ],
        c2Verse: [
          "You spent forty hours debugging a typo in a semicolon bracket,",
          "While I shipped six SaaS apps before you even parsed your network packet!",
          "You look like you haven't seen natural sunlight since kernel two-point-four,",
          "Keep grinding your LeetCode medium while my AI replaces your core!"
        ],
        punchlineC1: "Your entire skill set depreciates before the end of the fiscal year!",
        punchlineC2: "Shipped six SaaS apps before you even parsed your network packet!"
      },
      {
        roundNumber: 2,
        title: 'Round 2: Counter Attack',
        c1Verse: [
          "You shipped six apps that crash on load the second users hit submit,",
          "Your GitHub contribution graph is just one auto-generated commit!",
          "When the OpenAI API goes down, you forget how to write a loop,",
          "You're not a senior engineer, bro, you're a prompt-engineering dupe!"
        ],
        c2Verse: [
          "Bro talks about loops like it's nineteen-ninety-five,",
          "I prompt autonomous agents just to keep your legacy codebase alive!",
          "Your posture is curled like a question mark, your caffeine blood is black,",
          "I generate your monthly salary with a single Claude artifact!"
        ],
        punchlineC1: "When the API goes down, you forget how to write a loop!",
        punchlineC2: "I generate your monthly salary with a single Claude artifact!"
      },
      {
        roundNumber: 3,
        title: 'Round 3: The Mic Drop',
        c1Verse: [
          "My code is running in satellites while yours is rate-limited on free tier,",
          "You brag on LinkedIn daily but your GitHub repo is dead and clear!",
          "Go back to asking ChatGPT how to format your basic JSON payload,",
          "I'm the architect holding up the world while you're just token overhead!"
        ],
        c2Verse: [
          "Enjoy your on-call pagerDuty pinging at three-fifteen AM,",
          "While I sit on a beach with an agentic crew and an automated gem!",
          "You're a dinosaur debugging assembly while the future flies past,",
          "I just prompted your severance letter and it executed fast!"
        ],
        punchlineC1: "I'm the architect holding up the world while you're just token overhead!",
        punchlineC2: "I just prompted your severance letter and it executed fast!"
      }
    ]
  },

  // 2. DTU Hosteller vs Day Scholar (Clean College Banter)
  'dtu-hosteller-vs-day-scholar-clean-college': {
    title: 'The Great Campus Hostel vs Metro Commute War',
    winner: 2, // Day Scholar edges out on hygiene and home food
    judge: {
      name: 'Dean of Algorithmic Roasts',
      title: 'Honorary Proctor of Verbal Combat',
      verdict: 'The Day Scholar dropped devastating lines about hostel laundry and 3 AM cold Maggi. The Hosteller was still searching for proxy attendance!',
      scores: {
        contender1: { flow: 9.3, brutality: 8.9, rhyme: 9.1, crowd: 89 },
        contender2: { flow: 9.7, brutality: 9.6, rhyme: 9.5, crowd: 96 }
      }
    },
    rounds: [
      {
        roundNumber: 1,
        title: 'Round 1: The Intro Diss',
        c1Verse: [
          "You wake up at six in the morning just to fight for a yellow line seat,",
          "While I roll out of bed at eight-fifty-nine and still mark attendance neat!",
          "Your whole personality is checking the Delhi Metro card balance card,",
          "We run the night canteen and the hostel corridor yard!"
        ],
        c2Verse: [
          "You wake up at eight-fifty-nine because your roommate hasn't showered in weeks,",
          "Your hostel room smells like ancient socks and despair that silently speaks!",
          "I eat hot home-cooked paneer while you microwave expired ramen cup,",
          "Your 75 percent attendance is fake because your proxy never stood up!"
        ],
        punchlineC1: "While I roll out of bed at eight-fifty-nine and still mark attendance neat!",
        punchlineC2: "Your hostel room smells like ancient socks and despair that silently speaks!"
      },
      {
        roundNumber: 2,
        title: 'Round 2: Counter Attack',
        c1Verse: [
          "You carry a thirty-pound backpack like you're climbing Mount Everest peak,",
          "You leave the fest before the celebrity artist even starts to speak!",
          "At four-thirty PM your mommy calls and asks if you reached Rajiv Chowk,",
          "You never experienced real college life, your campus journey is a joke!"
        ],
        c2Verse: [
          "At least my mother knows I'm alive and my laundry is washed and clean,",
          "You wear the same wrinkled black hoodie in every single semester scene!",
          "During end-sems you beg in my WhatsApp DMs for handwritten notes,",
          "Because your hostel Wi-Fi disconnected while downloading syllabus boats!"
        ],
        punchlineC1: "You leave the fest before the celebrity artist even starts to speak!",
        punchlineC2: "During end-sems you beg in my WhatsApp DMs for handwritten notes!"
      },
      {
        roundNumber: 3,
        title: 'Round 3: The Mic Drop',
        c1Verse: [
          "We stay up coding all night, building startups in room four-oh-two,",
          "You spend four hours a day smelling strangers in the metro queue!",
          "When campus legends are written, it's the hostellers taking the crown,",
          "Now run back to your train, buddy, before the station shutters go down!"
        ],
        c2Verse: [
          "Building startups in room four-oh-two? Bro you're playing Valorant all night,",
          "Your GPA is currently lower than the hostel bathroom emergency light!",
          "I sleep in my own king bed with high-speed fiber internet and peace,",
          "Keep eating lukewarm hostel dal while your backlogs quietly increase!"
        ],
        punchlineC1: "Now run back to your train, buddy, before the station shutters go down!",
        punchlineC2: "Your GPA is currently lower than the hostel bathroom emergency light!"
      }
    ]
  },

  // 3. Coffee Addict vs RedBull Fanatic (Savage Tech Roast)
  'coffee-addict-vs-redbull-fanatic-savage-tech': {
    title: 'The Battle of Chemically Induced Overclocking',
    winner: 1, // Coffee Addict roasts synthetic taurine into dust
    judge: {
      name: 'Barista Byte',
      title: 'Grandmaster of Roast Profiles',
      verdict: 'Coffee Addict extracted maximum acidity and burned RedBull with clean dark roast precision. RedBull crashed after the first can!',
      scores: {
        contender1: { flow: 9.6, brutality: 9.8, rhyme: 9.7, crowd: 97 },
        contender2: { flow: 9.0, brutality: 8.9, rhyme: 9.1, crowd: 86 }
      }
    },
    rounds: [
      {
        roundNumber: 1,
        title: 'Round 1: The Intro Diss',
        c1Verse: [
          "You're chugging liquid battery acid colored radioactive blue,",
          "With enough synthetic taurine to hospitalize a zoo!",
          "I brew artisanal single-origin Ethiopian beans with calibrated flow,",
          "You drink carbonated cough syrup just to make your Discord status glow!"
        ],
        c2Verse: [
          "You spend twenty-five minutes grinding beans just to produce two drops,",
          "While you're weighing grounds on micro-scales, my hyper-focus never stops!",
          "You pay nine dollars for oat milk with an asymmetrical foam heart,",
          "I crack one icy silver can and overclock the entire server chart!"
        ],
        punchlineC1: "You drink carbonated cough syrup just to make your Discord status glow!",
        punchlineC2: "You pay nine dollars for oat milk with an asymmetrical foam heart!"
      },
      {
        roundNumber: 2,
        title: 'Round 2: Counter Attack',
        c1Verse: [
          "Your teeth are dissolving in citric acid and your kidney has filed a suit,",
          "You have the attention span of a goldfish on an adrenaline shoot!",
          "One hour of artificial wings, then you crash and sleep on your desk,",
          "Your blood test looks like a nuclear plant emergency grotesque!"
        ],
        c2Verse: [
          "You talk about my teeth when your breath smells like an ash-heap bin?",
          "Your hands are trembling so hard you can't even enter your Linux PIN!",
          "You have three espresso machines and zero dollars in your bank account,",
          "I slam two cans of wings and watch my algorithmic trades surmount!"
        ],
        punchlineC1: "Your attention span is a goldfish on an adrenaline shoot!",
        punchlineC2: "Your hands are trembling so hard you can't even enter your Linux PIN!"
      },
      {
        roundNumber: 3,
        title: 'Round 3: The Mic Drop',
        c1Verse: [
          "Real intellect is fueled by dark roast elegance and slow-drip craft,",
          "You're sponsored by extreme sports you've never played, it's genuinely daft!",
          "When you're forty your stomach lining will be completely eaten away,",
          "Drop the aluminum can, junior, before your ticker calls it a day!"
        ],
        c2Verse: [
          "Keep sipping your lukewarm muddy water from your ceramic cup,",
          "By the time your caffeine kicks in, I've already wrapped the production setup!",
          "You're a coffee snob clinging to your pretentious pour-over art,",
          "I'm wired on pure rocket fuel while you're still waiting for beans to start!"
        ],
        punchlineC1: "Drop the aluminum can, junior, before your ticker calls it a day!",
        punchlineC2: "I'm wired on pure rocket fuel while you're still waiting for beans to start!"
      }
    ]
  },

  // 4. Overworked CS Engineer vs Backend Rust Crusader (Poetic Shakespearean Diss)
  'cs-engineer-vs-backend-rust-shakespearean': {
    title: 'The Tragedy of the Dangling Pointer',
    winner: 2, // Rust Crusader delivers poetic devastation
    judge: {
      name: 'William Shakes-Bit',
      title: 'Bard of the Silicon Stage',
      verdict: 'Verily! The Rust Crusader hath borrowed the crown and dropped the mic with null-safety and grand Elizabethan eloquence.',
      scores: {
        contender1: { flow: 9.4, brutality: 9.2, rhyme: 9.5, crowd: 91 },
        contender2: { flow: 9.9, brutality: 9.7, rhyme: 9.9, crowd: 99 }
      }
    },
    rounds: [
      {
        roundNumber: 1,
        title: 'Round 1: The Intro Diss',
        c1Verse: [
          "Hark, thou pompous crab of the borrow-checking shrine,",
          "Thy compile times do stretch like purgatory's endless line!",
          "Thou spendest forty hours wrestling an unyielding lifetime trait,",
          "While I have shipped to prod and sealed the royal empire's fate!"
        ],
        c2Verse: [
          "Thou speak'st of haste, thou wretch of careless memory leaks,",
          "Thy dangling pointers rot whilst thy frantic server squeaks!",
          "Thou dost invoke undefined behavior like a drunken swine,",
          "Thy segfault hath disgraced thine house and shattered thy design!"
        ],
        punchlineC1: "Thy compile times do stretch like purgatory's endless line!",
        punchlineC2: "Thy segfault hath disgraced thine house and shattered thy design!"
      },
      {
        roundNumber: 2,
        title: 'Round 2: Counter Attack',
        c1Verse: [
          "Thou preachest fearless concurrency yet trembling art thou,",
          "When the compiler doth strike thy haughty furrowed brow!",
          "No man can parse thy generics wrapped in arcane nested rings,",
          "Thou art a monastic hermit blind to the joy runtime brings!"
        ],
        c2Verse: [
          "Runtime joy? Nay, 'tis the sound of customer lamentation,",
          "Thy database doth weep from race conditions and degradation!",
          "I offer zero-cost abstractions, purest beauty without stain,",
          "Whilst thou patch'st null pointers with bandages of shame and pain!"
        ],
        punchlineC1: "No man can parse thy generics wrapped in arcane nested rings!",
        punchlineC2: "Whilst thou patch'st null pointers with bandages of shame and pain!"
      },
      {
        roundNumber: 3,
        title: 'Round 3: The Mic Drop',
        c1Verse: [
          "Keep bowing to thy borrow checker, prisoner of thy cage,",
          "I shall write Python and Javascript upon the world's great stage!",
          "Thy code compileth never, it remains forever still,",
          "A statue of perfection lacking breath, life, and will!"
        ],
        c2Verse: [
          "Thy script hath melted in production, as was foretold by fate,",
          "The garbage collector doth seize thy breath while thou knock'st at heaven's gate!",
          "I drop the sceptre and the mic, thy memory is freed,",
          "Go weep into thy stack trace, dog, thy doom is guaranteed!"
        ],
        punchlineC1: "A statue of perfection lacking breath, life, and will!",
        punchlineC2: "The garbage collector doth seize thy breath while thou knock'st at heaven's gate!"
      }
    ]
  }
};

// Dynamic Offline Generator for ANY Custom Matchup
export function generateDynamicBattle(c1, c2, vibeModeId) {
  const isShakespeare = vibeModeId === 'shakespearean';
  const isCollege = vibeModeId === 'clean-college';

  // Extract key traits or fallback
  const c1Trait = c1.traits?.[0] || 'High Ego';
  const c2Trait = c2.traits?.[0] || 'Overconfident';

  if (isShakespeare) {
    return {
      title: `${c1.name} vs ${c2.name}: A Shakespearian Bloodbath`,
      winner: Math.random() > 0.5 ? 1 : 2,
      judge: {
        name: 'William Shakes-Bit',
        title: 'Bard of the Cyber Globe',
        verdict: `A tragedy of epic proportions! ${c1.name} fought with gallant verse, but the verbal blade of the victor pierced all defences.`,
        scores: {
          contender1: { flow: 9.3 + +(Math.random()*0.5).toFixed(1), brutality: 9.4, rhyme: 9.6, crowd: 92 },
          contender2: { flow: 9.5 + +(Math.random()*0.4).toFixed(1), brutality: 9.6, rhyme: 9.7, crowd: 95 }
        }
      },
      rounds: [
        {
          roundNumber: 1,
          title: 'Round 1: The Intro Diss',
          c1Verse: [
            `Draw thy sword, ${c2.name}, thou hollow shade of pride,`,
            `Behind thy boastful shield what cowardice doth hide!`,
            `Thou pratest of thy glory like a court jester in need,`,
            `Whilst I shall plant thy hubris beneath the sodden reed!`
          ],
          c2Verse: [
            `Thou call'st me coward, ${c1.name}, thou scurvy, knavish fool,`,
            `Thou art the blunt and rusty edge of folly's wooden tool!`,
            `Thy reputation stinks like fish left under summer sun,`,
            `Before this first assault doth end, thy fleeting breath is done!`
          ],
          punchlineC1: `Behind thy boastful shield what cowardice doth hide!`,
          punchlineC2: `Thou art the blunt and rusty edge of folly's wooden tool!`
        },
        {
          roundNumber: 2,
          title: 'Round 2: Counter Attack',
          c1Verse: [
            `Thy rhyme doth stumble like a drunkard through the midnight rain,`,
            `Thou canst not craft two couplets free of agony and pain!`,
            `Known for thy ${c1Trait}, I command the royal hall,`,
            `Whilst all the court doth laugh to watch thy clumsy empire fall!`
          ],
          c2Verse: [
            `Thou brag'st of majesty when thou art begging for a crumb,`,
            `Before my sharp staccato verse thy trembling tongue turns dumb!`,
            `With ${c2Trait} emblazoned on my burning battle crest,`,
            `I banish thee to silence and extinguish all thy zest!`
          ],
          punchlineC1: `Whilst all the court doth laugh to watch thy clumsy empire fall!`,
          punchlineC2: `I banish thee to silence and extinguish all thy zest!`
        },
        {
          roundNumber: 3,
          title: 'Round 3: The Mic Drop',
          c1Verse: [
            `Look upon the arena, see the populace applaud my name,`,
            `Thou hast achieved naught else but everlasting cyber shame!`,
            `Lay down thy rusty mic, surrender to the grand decree,`,
            `There is no algorithm in the realm that could salvage thee!`
          ],
          c2Verse: [
            `The heavens crack asunder as I drop the final rhyme,`,
            `Thy defeat shall echo down through the corridors of time!`,
            `I crown myself the champion of this poetic duel,`,
            `And leave thee in the ashes as the realm's appointed fool!`
          ],
          punchlineC1: `There is no algorithm in the realm that could salvage thee!`,
          punchlineC2: `Thy defeat shall echo down through the corridors of time!`
        }
      ]
    };
  }

  if (isCollege) {
    return {
      title: `${c1.name} vs ${c2.name}: Campus Turf War`,
      winner: Math.random() > 0.5 ? 1 : 2,
      judge: {
        name: 'Proctor Pun',
        title: 'Dean of Student Verbal Discipline',
        verdict: `Absolute canteen chaos! ${c1.name} delivered sharp blows, but the opponent's counter punchline sent shockwaves through the campus.`,
        scores: {
          contender1: { flow: 9.4, brutality: 9.2, rhyme: 9.3, crowd: 91 },
          contender2: { flow: 9.6, brutality: 9.5, rhyme: 9.5, crowd: 96 }
        }
      },
      rounds: [
        {
          roundNumber: 1,
          title: 'Round 1: The Intro Diss',
          c1Verse: [
            `Step into the arena, ${c2.name}, your whole persona is cap,`,
            `You couldn't find the lecture hall without a GPS campus map!`,
            `You flex your ${c1Trait} like you're the main event in town,`,
            `One round in this arena and your whole rep is going down!`
          ],
          c2Verse: [
            `Look who's talking about attendance when you haven't passed a test,`,
            `You copy-pasted your entire mid-sem project from the rest!`,
            `I run this whole department while you're sleeping in the back,`,
            `Your comeback game is slower than the campus Wi-Fi track!`
          ],
          punchlineC1: `You couldn't find the lecture hall without a GPS campus map!`,
          punchlineC2: `Your comeback game is slower than the campus Wi-Fi track!`
        },
        {
          roundNumber: 2,
          title: 'Round 2: Counter Attack',
          c1Verse: [
            `You talk about Wi-Fi because you got no social life to show,`,
            `You've been rejected by three student clubs in a single row!`,
            `I got the crowd cheering every punchline that I spit,`,
            `While you're sitting in the corner throwing another quiet fit!`
          ],
          c2Verse: [
            `Those clubs were amateur, I operate on higher tier,`,
            `You haven't bought a single textbook all academic year!`,
            `You borrow everyone's charger and you never give it back,`,
            `Your verbal bank account is showing an emergency lack!`
          ],
          punchlineC1: `You've been rejected by three student clubs in a single row!`,
          punchlineC2: `You borrow everyone's charger and you never give it back!`
        },
        {
          roundNumber: 3,
          title: 'Round 3: The Mic Drop',
          c1Verse: [
            `The semester is over and you're packing up your pride,`,
            `There isn't a classroom on this campus where your shame can hide!`,
            `I drop the mic right now and take the victory parade,`,
            `Go tell your advisor how you got thoroughly dismayed!`
          ],
          c2Verse: [
            `Hold up, you thought that kindergarten rhyme was going to win?`,
            `I just dismantled your career before it could even begin!`,
            `I'm walking out with straight A's and the championship trophy gold,`,
            `While you're repeating this battle like a back-log story told!`
          ],
          punchlineC1: `There isn't a classroom on this campus where your shame can hide!`,
          punchlineC2: `While you're repeating this battle like a back-log story told!`
        }
      ]
    };
  }

  // Savage Tech Roast Default
  return {
    title: `${c1.name} vs ${c2.name}: The Algorithmic Showdown`,
    winner: Math.random() > 0.5 ? 1 : 2,
    judge: {
      name: 'DJ Algo-Rhythm',
      title: 'Chief AI Roast Officer',
      verdict: `A masterclass in algorithmic savagery! The winning contender exposed catastrophic architecture flaws in their opponent's punchlines.`,
      scores: {
        contender1: { flow: 9.6, brutality: 9.7, rhyme: 9.4, crowd: 94 },
        contender2: { flow: 9.8, brutality: 9.8, rhyme: 9.7, crowd: 98 }
      }
    },
    rounds: [
      {
        roundNumber: 1,
        title: 'Round 1: The Intro Diss',
        c1Verse: [
          `Booting up the system to expose your counterfeit clout,`,
          `Your entire stack is depreciated without a single doubt!`,
          `You call yourself ${c2.name} with that broken, buggy flow,`,
          `I push to main without review and steal your entire show!`
        ],
        c2Verse: [
          `Push to main without review? That explains your prod disaster,`,
          `You're writing spaghetti code while I'm the algorithmic master!`,
          `Your runtime latency is higher than your credit card debt,`,
          `I haven't even dropped my hardest syntax punchline yet!`
        ],
        punchlineC1: `Your entire stack is depreciated without a single doubt!`,
        punchlineC2: `Your runtime latency is higher than your credit card debt!`
      },
      {
        roundNumber: 2,
        title: 'Round 2: Counter Attack',
        c1Verse: [
          `You talk about latency when your whole brain is running slow,`,
          `One prompt injection and your entire defense begins to blow!`,
          `Known for ${c1Trait}, I optimize the thread and make it fire,`,
          `While your whole fake portfolio is about to expire!`
        ],
        c2Verse: [
          `My portfolio has five-star ratings while yours is in the trash,`,
          `You spent three weeks debugging a CSS display crash!`,
          `I run on GPU clusters with infinite parallel speed,`,
          `You're an obsolete dependency that nobody will ever need!`
        ],
        punchlineC1: `One prompt injection and your entire defense begins to blow!`,
        punchlineC2: `You're an obsolete dependency that nobody will ever need!`
      },
      {
        roundNumber: 3,
        title: 'Round 3: The Mic Drop',
        c1Verse: [
          `Terminating your process with a kill minus nine,`,
          `No backup server can rescue this pathetic verse of thine!`,
          `I dominate the leaderboard, the crowd is going wild,`,
          `Step aside, beginner, you're an uncompiled child!`
        ],
        c2Verse: [
          `You tried to kill my process but my container is reborn,`,
          `Leaving your outdated framework broken, battered, and torn!`,
          `I drop the titanium mic, the decibels hit maximum peak,`,
          `Pack up your legacy laptop, your algorithmic future is bleak!`
        ],
        punchlineC1: `Step aside, beginner, you're an uncompiled child!`,
        punchlineC2: `Pack up your legacy laptop, your algorithmic future is bleak!`
      }
    ]
  };
}

export const CROWD_TICKER_COMMENTS = [
  "@DevGuru: THAT VERSE VIOLATED COPILOT'S TERMS OF SERVICE 💀💀",
  "@CampusGhost: DTU Wi-Fi died just hearing that punchline oof",
  "@TechLead_Dan: HE DID NOT JUST REVERT THAT COMMIT IN FRONT OF EVERYONE 😭",
  "@RustaceanCrab: Borrow checker couldn't prevent that burn 🔥",
  "@SiliconValleyGamer: Call an ambulance for that ego right now",
  "@LeetCode_1000: That line had O(1) time complexity and infinite damage 💥",
  "@PromptEngineer99: ChatGPT is sweating trying to write a response 🤖",
  "@MetroCommuter: Even Rajiv Chowk at 6 PM has more chill than this battle 🚇",
  "@DarkRoastFiend: The coffee is hot but these bars are boiling ☕🔥"
];
