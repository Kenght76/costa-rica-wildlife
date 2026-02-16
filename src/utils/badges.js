// Badge utility functions
import { speciesBadges, momentsBadges } from '../data';
import { species as SPECIES } from '../data/species';
import { meanings as MEANINGS } from '../data/meanings';

export const BADGES = [...speciesBadges, ...momentsBadges];

export const checkForNewBadges = (archive) => {
  if (!archive) return [];
  const earnedIds = archive.badges || [];
  return BADGES.filter(badge => {
    if (earnedIds.includes(badge.id)) return false;
    try {
      return badge.condition ? badge.condition(archive) : false;
    } catch {
      return false;
    }
  });
};

export const getEarnedBadges = (archive) => {
  if (!archive?.badges) return [];
  return BADGES.filter(b => archive.badges.includes(b.id));
};

// Species/meanings that directly trigger a specific badge (not count-based milestones)
export const BADGE_LINKED_SPECIES = new Set([
  'resplendent-quetzal', 'scarlet-macaw', 'three-toed-sloth', 'two-toed-sloth',
  'keel-billed-toucan', 'red-eyed-tree-frog',
  'jaguar', 'puma', 'ocelot', 'margay', 'jaguarundi',
  'white-nosed-coati', 'kinkajou', 'honduran-white-bat',
  'humpback-whale', 'harpy-eagle', 'blue-morpho', 'glasswing-butterfly',
  'manta-ray', 'spotted-eagle-ray',
  'american-crocodile', 'spectacled-caiman',
  'clay-colored-thrush', 'basilisk', 'common-basilisk',
  'great-antshrike', 'great-curassow', 'great-tinamou', 'greater-grison',
  'king-vulture', 'long-tailed-manakin', 'nine-banded-armadillo',
  'northern-tamandua', 'oncilla', 'red-brocket-deer', 'royal-flycatcher',
  'rufous-tailed-jacamar', 'spectacled-owl', 'paca', 'tayra', 'white-hawk',
  'gray-fox', 'lesser-short-nosed-fruit-bat', 'mexican-hairy-porcupine',
  'mexican-mouse-opossum',
  'agouti', 'bare-throated-tiger-heron', 'black-hawk-eagle', 'freshwater-turtle',
  'boat-billed-heron', 'cacomistle', 'collared-peccary', 'collared-forest-falcon',
  'crested-guan', 'squirrel-monkey', 'turquoise-browed-motmot',
  'bairds-tapir', 'black-and-white-hawk-eagle', 'great-potoo', 'green-iguana',
  'glass-frog', 'white-faced-capuchin', 'chestnut-mandibled-toucan',
  'collared-aracari', 'emerald-toucanet', 'fiery-billed-aracari',
  'crested-eagle', 'poison-dart-frog-strawberry', 'three-toed-sloth',
  'spectral-bat', 'wrinkle-faced-bat', 'vampire-bat', 'greater-bulldog-bat',
  'tent-making-bat', 'greater-white-lined-bat', 'jamaican-fruit-bat',
  'keel-billed-motmot', 'broad-billed-motmot', 'rufous-motmot', 'lesson-motmot',
  'yellow-eared-toucanet',
  'lovely-cotinga',
  // Round 2
  'jabiru', 'bare-necked-umbrellabird', 'three-wattled-bellbird', 'great-green-macaw',
  'whale-shark', 'leatherback-turtle', 'bushmaster', 'giant-anteater',
  'snowcap', 'neotropical-otter', 'silky-anteater',
  'lemur-leaf-frog', 'agami-heron', 'great-curassow',
  'wood-stork', 'roseate-spoonbill',
  // Round 3 — Category Showcases
  'green-honeycreeper', 'red-legged-honeycreeper',
  'golden-hooded-tanager', 'spangle-cheeked-tanager',
  'ringed-kingfisher', 'american-pygmy-kingfisher',
  'slaty-tailed-trogon', 'lattice-tailed-trogon',
  'halloween-crab', 'sally-lightfoot-crab',
  'starfish', 'sand-dollar',
]);

export const BADGE_LINKED_MEANINGS = new Set([
  'first-rainforest', 'cloud-forest-mist', 'canopy-walkway', 'night-walk',
  'howler-wakeup', 'volcano-view', 'waterfall-discovery',
  'bioluminescence', 'crab-migration', 'crocodile-bridge',
  'first-wildlife-sighting', 'unexpected-encounter', 'pura-vida-moment',
  'last-day', 'guide-lesson', 'local-food', 'wildlife-photo',
  'stone-spheres', 'guayabo-ruins', 'teatro-nacional', 'duran-sanatorium',
  'ujarras-ruins', 'san-lucas-island', 'gold-museum',
  'both-lights', 'stargazing', 'full-moon-walk', 'green-flash',
  'two-oceans', 'above-the-clouds', 'weather-watcher',
  'plastic-free-beach', 'rio-celeste', 'whales-tail', 'la-fortuna-waterfall',
  'national-park-collector', 'osa-peninsula', 'tortuguero-by-boat',
  'bribri-visit', 'night-diver',
  'zip-line', 'white-water', 'canyoneer', 'river-crosser', 'night-diver',
  'tarzan-swing', 'four-by-four', 'horseback-forest', 'waterfall-rappel', 'surfing',
  'gallo-pinto', 'casado', 'ceviche-by-sea', 'agua-de-pipa', 'churchill',
  'soda-local', 'new-fruit', 'coffee-farm', 'chocolate-tour',
  'bribri-visit', 'boruca-masks', 'oxcart-artist', 'la-negrita',
  'jade-museum', 'sabanero-culture', 'calypso-caribbean', 'street-art-sj',
  'conservation-volunteer', 'rescue-center', 'tree-planter', 'citizen-scientist',
  'exp-five-cats', 'exp-bellbird-call', 'exp-glass-frog', 'exp-tapir-tracks',
  'exp-turtle-nesting', 'exp-baby-turtles', 'exp-arribada',
  'exp-stone-spheres', 'exp-guayabo', 'exp-hidden-spring',
  'exp-chirripo', 'exp-san-lucas',
  'toucan-fruit-toss',
  // Round 2
  'two-ocean-day', 'monkey-theft',
]);

// Categories that contain badge-linked items
export const BADGE_LINKED_SPECIES_CATEGORIES = new Set(
  SPECIES.filter(s => BADGE_LINKED_SPECIES.has(s.id)).map(s => s.category)
);
export const BADGE_LINKED_MEANING_CATEGORIES = new Set(
  MEANINGS.filter(m => BADGE_LINKED_MEANINGS.has(m.id)).map(m => m.subtitle)
);

// Returns all badges an item contributes to
export const getBadgesForItem = (itemId, type) => {
  const related = [];
  for (const badge of BADGES) {
    const condStr = badge.condition?.toString() || '';
    if (condStr.includes(`'${itemId}'`)) {
      related.push(badge);
    }
  }
  return related;
};

// Returns first badge icon/image for an entry (used in archive timeline)
export const getBadgeForEntry = (entryId, type) => {
  const testArchive = type === 'species' 
    ? { species: { [entryId]: true }, meanings: {}, badges: [] }
    : { species: {}, meanings: { [entryId]: true }, badges: [] };
  
  for (const badge of BADGES) {
    const checkFn = badge.condition || badge.check;
    if (checkFn) {
      try {
        if (checkFn(testArchive)) {
          return { icon: badge.icon, image: badge.image, id: badge.id };
        }
      } catch (e) {}
    }
  }
  return { icon: '⭐', image: null };
};
