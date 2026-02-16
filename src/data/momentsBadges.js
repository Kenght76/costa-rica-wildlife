// Costa Rica Wildlife Moments & Expedition Badges
// Redesigned: moved sensory/experience badges here from species, added cultural badges
// MOVED FROM SPECIES: howler (→ 4am-wakeup), bellbird (→ bellbirds-bonk expedition),
//   national-bird (→ song-of-the-rains), basilisk (→ basilisk-believer)
// REMOVED: moment-collector, experience-master (milestone grinding)

export const momentsBadges = [
  // ═══════════════════════════════════════════════════════════════════════════
  // JUNGLE MOMENT BADGES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'rainforest-explorer',
    name: 'Rainforest Explorer',
    description: 'First steps into the rainforest — your world changes',
    icon: '🌴',
    image: '/badges/badge-jungle.png',
    condition: (archive) => archive?.meanings?.['first-rainforest'],
    tier: 'silver'
  },
  {
    id: 'cloud-walker',
    name: 'Cloud Walker',
    description: 'Walked through a cloud forest in the mist',
    icon: '☁️',
    image: '/badges/badge-jungle.png',
    condition: (archive) => archive?.meanings?.['cloud-forest-mist'],
    tier: 'silver'
  },
  {
    id: 'canopy-dweller',
    name: 'Canopy Dweller',
    description: 'Experienced the forest from above — bridges, platforms, zip lines',
    icon: '🌿',
    image: '/badges/badge-jungle.png',
    condition: (archive) => archive?.meanings?.['canopy-walkway'],
    tier: 'silver'
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Completed a night walk in the rainforest — different world',
    icon: '🦉',
    image: '/badges/badge-jungle.png',
    condition: (archive) => archive?.meanings?.['night-walk'],
    tier: 'silver'
  },
  {
    id: 'four-am-wakeup',
    name: '4am Wake-Up Call',
    description: 'Woken by howler monkeys roaring through the canopy before dawn',
    icon: '🐵',
    image: '/badges/four-am-wakeup.png',
    condition: (archive) => archive?.meanings?.['howler-wakeup'],
    tier: 'silver'
  },
  {
    id: 'volcanic-majesty',
    name: 'Volcanic Majesty',
    description: 'Stood before an active volcano',
    icon: '🌋',
    image: '/badges/badge-jungle.png',
    condition: (archive) => archive?.meanings?.['volcano-view'],
    tier: 'silver'
  },
  {
    id: 'hidden-waterfall',
    name: 'Hidden Waterfall',
    description: 'Found a waterfall tucked deep in the jungle',
    icon: '💧',
    image: '/badges/badge-jungle.png',
    condition: (archive) => archive?.meanings?.['waterfall-discovery'],
    tier: 'silver'
  },
  {
    id: 'song-of-the-rains',
    name: 'Song of the Rains',
    description: 'Heard the Clay-colored Thrush sing — the national bird signals the rains',
    icon: '🇨🇷',
    image: '/badges/badge-jungle.png',
    condition: (archive) => archive?.species?.['clay-colored-thrush'],
    tier: 'silver'
  },
  {
    id: 'basilisk-believer',
    name: 'Basilisk Believer',
    description: 'Watched a basilisk run on water — "Did that just happen?"',
    icon: '🦎',
    image: '/badges/basilisk-believer.png',
    condition: (archive) => 
      archive?.species?.['basilisk'] || 
      archive?.species?.['common-basilisk'],
    tier: 'silver'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BEACH MOMENT BADGES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'bioluminescence',
    name: 'Bioluminescence',
    description: 'Witnessed the ocean glowing electric blue at night',
    icon: '✨',
    image: '/badges/badge-ocean.png',
    condition: (archive) => archive?.meanings?.['bioluminescence'],
    tier: 'gold'
  },
  {
    id: 'march-of-the-crabs',
    name: 'March of the Crabs',
    description: 'Witnessed crabs migrating across the beach',
    icon: '🦀',
    image: '/badges/badge-ocean.png',
    condition: (archive) => archive?.meanings?.['crab-migration'],
    tier: 'silver'
  },
  {
    id: 'crocodile-bridge',
    name: 'The Crocodile Bridge',
    description: 'Stood on the Tárcoles Bridge watching crocodiles below',
    icon: '🐊',
    image: '/badges/badge-ocean.png',
    condition: (archive) => archive?.meanings?.['crocodile-bridge'],
    tier: 'silver'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SHARED MOMENT BADGES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'first-sighting',
    name: 'The First Sighting',
    description: 'Your very first wildlife encounter of the trip',
    icon: '👁️',
    image: '/badges/badge-shared.png',
    condition: (archive) => archive?.meanings?.['first-wildlife-sighting'],
    tier: 'silver'
  },
  {
    id: 'unexpected-gift',
    name: 'The Unexpected Gift',
    description: 'A wildlife sighting you never expected',
    icon: '🎁',
    image: '/badges/badge-shared.png',
    condition: (archive) => archive?.meanings?.['unexpected-encounter'],
    tier: 'gold'
  },
  {
    id: 'pura-vida-spirit',
    name: 'Pura Vida',
    description: 'A moment when you truly felt the pure life',
    icon: '🇨🇷',
    image: '/badges/badge-shared.png',
    condition: (archive) => archive?.meanings?.['pura-vida-moment'],
    tier: 'gold'
  },
  {
    id: 'last-look-back',
    name: 'The Last Look Back',
    description: 'Your final moment before leaving Costa Rica',
    icon: '👋',
    image: '/badges/badge-shared.png',
    condition: (archive) => archive?.meanings?.['last-day'],
    tier: 'silver'
  },
  {
    id: 'words-of-the-guide',
    name: 'Words of the Guide',
    description: 'A guide taught you something that changed how you see the world',
    icon: '🎓',
    image: '/badges/badge-shared.png',
    condition: (archive) => archive?.meanings?.['guide-lesson'],
    tier: 'silver'
  },
  {
    id: 'taste-of-costa-rica',
    name: 'Taste of Costa Rica',
    description: 'The best meal of your trip',
    icon: '🍽️',
    image: '/badges/badge-shared.png',
    condition: (archive) => archive?.meanings?.['local-food'],
    tier: 'silver'
  },
  {
    id: 'photographer',
    name: 'Wildlife Photographer',
    description: 'Captured the perfect shot',
    icon: '📸',
    image: '/badges/badge-shared.png',
    condition: (archive) => archive?.meanings?.['wildlife-photo'],
    tier: 'silver'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CULTURAL & HISTORICAL MOMENT BADGES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'ancient-stones',
    name: 'Ancient Stones',
    description: 'Visited the mysterious pre-Columbian Stone Spheres of the Diquís',
    icon: '⚫',
    image: '/badges/badge-cultural.png',
    condition: (archive) => archive?.meanings?.['stone-spheres'],
    tier: 'gold'
  },
  {
    id: 'the-lost-city',
    name: 'The Lost City',
    description: 'Walked through Guayabo — Costa Rica\'s largest pre-Columbian city',
    icon: '🏛️',
    image: '/badges/badge-cultural.png',
    condition: (archive) => archive?.meanings?.['guayabo-ruins'],
    tier: 'gold'
  },
  {
    id: 'teatro-nacional',
    name: 'Teatro Nacional',
    description: 'Visited Costa Rica\'s architectural gem — the National Theater',
    icon: '🎭',
    image: '/badges/badge-cultural.png',
    condition: (archive) => archive?.meanings?.['teatro-nacional'],
    tier: 'silver'
  },
  {
    id: 'haunted-sanatorium',
    name: 'The Haunted Sanatorium',
    description: 'Explored the abandoned Durán Sanatorium ruins on Irazú Volcano',
    icon: '👻',
    image: '/badges/badge-cultural.png',
    condition: (archive) => archive?.meanings?.['duran-sanatorium'],
    tier: 'silver'
  },
  {
    id: 'ujarras-ruins',
    name: 'Ujarrás Ruins',
    description: 'Visited the ruins of the oldest church in Costa Rica (1575)',
    icon: '⛪',
    image: '/badges/badge-cultural.png',
    condition: (archive) => archive?.meanings?.['ujarras-ruins'],
    tier: 'silver'
  },
  {
    id: 'prison-island',
    name: 'The Prison Island',
    description: 'Visited San Lucas Island — infamous prison turned wildlife refuge',
    icon: '🏚️',
    image: '/badges/badge-cultural.png',
    condition: (archive) => archive?.meanings?.['san-lucas-island'],
    tier: 'silver'
  },
  {
    id: 'gold-museum',
    name: 'Gold Museum',
    description: 'Explored the Pre-Columbian Gold Museum — artifacts dating to 500 AD',
    icon: '🥇',
    image: '/badges/badge-cultural.png',
    condition: (archive) => archive?.meanings?.['gold-museum'],
    tier: 'silver'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TIME & LIGHT BADGES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'both-lights',
    name: 'Both Lights',
    description: 'Watched both sunrise AND sunset on the same day in nature',
    icon: '🌅',
    image: '/badges/badge-time-light.png',
    condition: (archive) => archive?.meanings?.['both-lights'],
    tier: 'gold'
  },
  {
    id: 'stargazing',
    name: 'Stargazing',
    description: 'Saw the Milky Way from Costa Rica',
    icon: '🌌',
    image: '/badges/badge-time-light.png',
    condition: (archive) => archive?.meanings?.['stargazing'],
    tier: 'silver'
  },
  {
    id: 'full-moon-walk',
    name: 'Full Moon Walk',
    description: 'Walked in nature during a full moon — different animals emerge',
    icon: '🌕',
    image: '/badges/badge-time-light.png',
    condition: (archive) => archive?.meanings?.['full-moon-walk'],
    tier: 'silver'
  },
  {
    id: 'green-flash',
    name: 'The Green Flash',
    description: 'Saw the green flash at sunset over the Pacific — most never see it',
    icon: '💚',
    image: '/badges/badge-time-light.png',
    condition: (archive) => archive?.meanings?.['green-flash'],
    tier: 'gold'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GEOGRAPHY & "ONLY IN COSTA RICA" BADGES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'two-oceans',
    name: 'Two Oceans',
    description: 'Swam in both the Pacific and Caribbean on the same trip',
    icon: '🌊',
    image: '/badges/badge-costa-rica.png',
    condition: (archive) => archive?.meanings?.['two-oceans'],
    tier: 'gold'
  },
  {
    id: 'above-the-clouds',
    name: 'Above the Clouds',
    description: 'Stood above the cloud layer — looking DOWN at clouds',
    icon: '⛰️',
    image: '/badges/badge-costa-rica.png',
    condition: (archive) => archive?.meanings?.['above-the-clouds'],
    tier: 'silver'
  },
  {
    id: 'weather-watcher',
    name: 'Weather Watcher',
    description: 'Experienced something extraordinary weatherwise',
    icon: '🌦️',
    image: '/badges/badge-costa-rica.png',
    condition: (archive) => archive?.meanings?.['weather-watcher'],
    tier: 'silver'
  },
  {
    id: 'plastic-free-beach',
    name: 'Plastic-Free Beach',
    description: 'Did a beach cleanup — leave it better than you found it',
    icon: '♻️',
    image: '/badges/badge-costa-rica.png',
    condition: (archive) => archive?.meanings?.['plastic-free-beach'],
    tier: 'gold'
  },
  {
    id: 'whales-tail',
    name: 'The Whale\'s Tail',
    description: 'Saw the whale-tail sandbar at Marino Ballena National Park',
    icon: '🐋',
    image: '/badges/badge-costa-rica.png',
    condition: (archive) => archive?.meanings?.['whales-tail'],
    tier: 'gold'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ADVENTURE & ADRENALINE (complete 1 for badge)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'adrenaline-junkie',
    name: 'Adrenaline Junkie',
    description: 'Completed an adventure activity',
    icon: '🎢',
    image: '/badges/badge-adventure.png',
    condition: (archive) => {
      const adventures = ['zip-line', 'white-water', 'canyoneer', 'river-crosser', 'tarzan-swing', 'four-by-four', 'horseback-forest', 'waterfall-rappel', 'surfing', 'hanging-bridge-walk', 'jungle-swim'];
      return adventures.some(id => archive?.meanings?.[id]);
    },
    tier: 'silver'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FOOD & DRINK (complete 3 for badge)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'foodie',
    name: 'Taste of Tico',
    description: 'Experienced 3 Costa Rican food moments',
    icon: '🍽️',
    image: '/badges/badge-food.png',
    condition: (archive) => {
      const foods = ['gallo-pinto', 'casado', 'ceviche-by-sea', 'agua-de-pipa', 'churchill', 'soda-local', 'new-fruit', 'local-food', 'coffee-farm', 'chocolate-tour'];
      return foods.filter(id => archive?.meanings?.[id]).length >= 3;
    },
    tier: 'silver'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CULTURAL (complete 2 for badge)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'culture-seeker',
    name: 'Culture Seeker',
    description: 'Experienced 2 Costa Rican cultural moments',
    icon: '🏛️',
    image: '/badges/badge-cultural.png',
    condition: (archive) => {
      const cultural = ['boruca-masks', 'oxcart-artist', 'la-negrita', 'jade-museum', 'sabanero-culture', 'calypso-caribbean', 'street-art-sj', 'stone-spheres', 'guayabo-ruins', 'teatro-nacional', 'duran-sanatorium', 'ujarras-ruins', 'san-lucas-island', 'gold-museum'];
      return cultural.filter(id => archive?.meanings?.[id]).length >= 2;
    },
    tier: 'gold'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LEARNING & CONSERVATION (complete 2 for badge)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'conservation-hero',
    name: 'Conservation Hero',
    description: 'Completed 2 learning or conservation activities',
    icon: '🌱',
    image: '/badges/badge-conservation.png',
    condition: (archive) => {
      const conservation = ['conservation-volunteer', 'rescue-center', 'tree-planter', 'citizen-scientist', 'plastic-free-beach'];
      return conservation.filter(id => archive?.meanings?.[id]).length >= 2;
    },
    tier: 'gold'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // EXPEDITION BADGES — complete the expedition, earn the badge
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'ghost-cat-tracker',
    name: 'Ghost Cat Tracker',
    description: 'Found evidence of a wild cat — tracks, scat, or sighting',
    icon: '🐾',
    image: '/badges/badge-expedition.png',
    condition: (archive) => archive?.meanings?.['exp-five-cats'],
    tier: 'legendary'
  },
  {
    id: 'bellbirds-bonk',
    name: "The Bellbird's Bonk",
    description: 'Heard the loudest bird call on Earth',
    icon: '🔔',
    image: '/badges/badge-expedition.png',
    condition: (archive) => archive?.meanings?.['exp-bellbird-call'],
    tier: 'gold'
  },
  {
    id: 'see-through-frog',
    name: 'See-Through Frog',
    description: "Found a glass frog's beating heart",
    icon: '🐸',
    image: '/badges/badge-expedition.png',
    condition: (archive) => archive?.meanings?.['exp-glass-frog'],
    tier: 'silver'
  },
  {
    id: 'tapir-trail',
    name: 'Tapir Trail',
    description: "Found a wild Baird's Tapir",
    icon: '🦏',
    image: '/badges/badge-expedition.png',
    condition: (archive) => archive?.meanings?.['exp-tapir-tracks'],
    tier: 'legendary'
  },
  {
    id: 'turtle-pilgrimage',
    name: 'The Turtle Pilgrimage',
    description: 'Witnessed sea turtle nesting under moonlight',
    icon: '🐢',
    image: '/badges/emerald-sea-turtle.png',
    condition: (archive) => archive?.meanings?.['exp-turtle-nesting'],
    tier: 'gold'
  },
  {
    id: 'baby-turtle-sprint',
    name: 'Baby Turtle Sprint',
    description: 'Watched hatchlings race to the ocean',
    icon: '🐢',
    image: '/badges/sea-turtle-wave-silver.png',
    condition: (archive) => archive?.meanings?.['exp-baby-turtles'],
    tier: 'gold'
  },
  {
    id: 'the-arribada',
    name: 'The Arribada',
    description: 'Witnessed mass olive ridley nesting — thousands at once',
    icon: '🐢',
    image: '/badges/rainbow-sea-turtle2.png',
    condition: (archive) => archive?.meanings?.['exp-arribada'],
    tier: 'legendary'
  },
  {
    id: 'stone-sphere-mystery',
    name: 'The Stone Sphere Mystery',
    description: 'Journeyed to see the pre-Columbian Stone Spheres — UNESCO World Heritage',
    icon: '⚫',
    image: '/badges/badge-expedition.png',
    condition: (archive) => archive?.meanings?.['exp-stone-spheres'],
    tier: 'gold'
  },
  {
    id: 'lost-city-guayabo',
    name: 'The Lost City of Guayabo',
    description: 'Explored a 3,000-year-old city with aqueducts that still work',
    icon: '🏛️',
    image: '/badges/badge-expedition.png',
    condition: (archive) => archive?.meanings?.['exp-guayabo'],
    tier: 'gold'
  },
  {
    id: 'hidden-spring',
    name: 'The Hidden Spring',
    description: 'Found a natural hot spring after a jungle trek — the journey is the badge',
    icon: '♨️',
    image: '/badges/badge-expedition.png',
    condition: (archive) => archive?.meanings?.['exp-hidden-spring'],
    tier: 'silver'
  },
  {
    id: 'chirripo-summit',
    name: 'Cerro Chirripó Summit',
    description: "Summited Costa Rica's highest peak — sunrise above the clouds, both oceans visible",
    icon: '⛰️',
    image: '/badges/badge-expedition.png',
    condition: (archive) => archive?.meanings?.['exp-chirripo'],
    tier: 'legendary'
  },
  {
    id: 'prison-island-exp',
    name: 'Prison Island',
    description: 'Visited San Lucas Island — where darkest history meets nature\'s reclamation',
    icon: '🏚️',
    image: '/badges/badge-expedition.png',
    condition: (archive) => archive?.meanings?.['exp-san-lucas'],
    tier: 'silver'
  },
  {
    id: 'rio-celeste-exp',
    name: 'Río Celeste',
    description: 'Hiked to the supernatural blue river in Tenorio Volcano National Park',
    icon: '💙',
    image: '/badges/badge-expedition.png',
    condition: (archive) => archive?.meanings?.['rio-celeste'],
    tier: 'gold'
  },
  {
    id: 'la-fortuna-exp',
    name: 'La Fortuna Waterfall',
    description: '500 steps down, a swim, and 500 steps back up — earned it',
    icon: '💦',
    image: '/badges/badge-expedition.png',
    condition: (archive) => archive?.meanings?.['la-fortuna-waterfall'],
    tier: 'gold'
  },
  {
    id: 'osa-expedition',
    name: 'Osa Peninsula',
    description: 'Made it to the most biodiverse place on Earth',
    icon: '🌎',
    image: '/badges/badge-expedition.png',
    condition: (archive) => archive?.meanings?.['osa-peninsula'],
    tier: 'gold'
  },
  {
    id: 'tortuguero-exp',
    name: 'Tortuguero by Boat',
    description: 'Arrived through the canals — there are no roads',
    icon: '🛶',
    image: '/badges/badge-expedition.png',
    condition: (archive) => archive?.meanings?.['tortuguero-by-boat'],
    tier: 'gold'
  },
  {
    id: 'night-diver-exp',
    name: 'Night Diver',
    description: 'Dove into the dark water — a completely different ocean',
    icon: '🤿',
    image: '/badges/badge-expedition.png',
    condition: (archive) => archive?.meanings?.['night-diver'],
    tier: 'gold'
  },
  {
    id: 'bribri-exp',
    name: 'BriBri Visit',
    description: 'Journeyed to the Talamanca mountains to visit a BriBri community',
    icon: '🏔️',
    image: '/badges/badge-expedition.png',
    condition: (archive) => archive?.meanings?.['bribri-visit'],
    tier: 'gold'
  },
  {
    id: 'park-collector-exp',
    name: 'National Park Collector',
    description: 'Visited 5 different national parks — Costa Rica has 30+',
    icon: '🏞️',
    image: '/badges/badge-expedition.png',
    condition: (archive) => archive?.meanings?.['national-park-collector'],
    tier: 'gold'
  },
  {
    id: 'toucan-fruit-toss',
    name: 'The Fruit Toss',
    description: 'Watched a toucan toss fruit into the air and catch it — too ridiculous not to celebrate',
    icon: '🐦',
    image: '/badges/keel-billed.png',
    condition: (archive) => archive?.meanings?.['toucan-fruit-toss'],
    tier: 'silver'
  },
  {
    id: 'archive-created',
    name: 'The Archive',
    description: 'Created your expedition archive — your adventures preserved forever',
    icon: '📖',
    image: '/badges/badge-archive.png',
    condition: (archive) => archive?.archiveCreated,
    tier: 'gold'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ROUND 2 — NEW MOMENTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'two-ocean-day',
    name: 'Two Oceans',
    description: 'Touched the Pacific and the Caribbean in the same day — only in Costa Rica',
    icon: '🌊',
    image: '/badges/two-ocean-day.png',
    condition: (archive) => archive?.meanings?.['two-ocean-day'],
    tier: 'gold'
  },
  {
    id: 'monkey-theft',
    name: 'Monkey Tax',
    description: 'A monkey stole something from you. Welcome to Costa Rica — you have now paid the monkey tax',
    icon: '🐒',
    image: '/badges/monkey-theft.png',
    condition: (archive) => archive?.meanings?.['monkey-theft'],
    tier: 'silver'
  },
];

export default momentsBadges;
