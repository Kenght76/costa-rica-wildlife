// Data index - export all data files
import { species } from './species.js';
import { meanings } from './meanings.js';
import { speciesBadges } from './speciesBadges.js';
import { momentsBadges } from './momentsBadges.js';

export { species, speciesBadges, momentsBadges, meanings };
export { species as SPECIES };
export { meanings as MEANINGS };

// Combined badges + helper used by BadgesModal
export const BADGES = [...speciesBadges, ...momentsBadges];

export const getEarnedBadges = (archive) => {
  if (!archive?.badges) return [];
  return BADGES.filter(b => archive.badges.includes(b.id));
};

// ═══════════════════════════════════════════════════════════════════════════════
// ECOSYSTEM MAPPING — determines which species appear in Jungle vs Beach
// ═══════════════════════════════════════════════════════════════════════════════
const BEACH_CATEGORIES = ['Marine Life', 'Seabirds', 'Beach & Tidepool'];
const BOTH_CATEGORIES = ['Iconic Costa Rica', 'Herons & Shorebirds', 'Crocodilians & Turtles', 'Kingfishers'];
// Everything else is jungle

export const getEcosystem = (category) => {
  if (BEACH_CATEGORIES.includes(category)) return 'beach';
  if (BOTH_CATEGORIES.includes(category)) return 'both';
  return 'jungle';
};

export const JUNGLE_SPECIES = species.filter(s => {
  const eco = getEcosystem(s.category);
  return eco === 'jungle' || eco === 'both';
});

export const BEACH_SPECIES = species.filter(s => {
  const eco = getEcosystem(s.category);
  return eco === 'beach' || eco === 'both';
});

// Ecosystem-filtered meanings
export const JUNGLE_MEANINGS = meanings.filter(m => m.ecosystem === 'jungle' || m.ecosystem === 'both');
export const BEACH_MEANINGS = meanings.filter(m => m.ecosystem === 'beach' || m.ecosystem === 'both');
