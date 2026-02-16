// Costa Rica Wildlife Species Badges
// Redesigned per badge philosophy: Story, Skill, Emotional, Rarity, Beauty, Journey tests
// REMOVED: howler-hearer (→ moments), bellbird-listener (→ moments), national-bird (→ moments),
//          basilisk-believer (→ moments), hummingbird-hero, butterfly-collector, ant-observer,
//          all milestone badges (first-sighting through pura-vida-naturalist)
// ADDED: rainbow-bill, individual cat badges, honey-bear, white-bat-discovery, glass-wings,
//        living-rainbow, eyes-in-the-sky
// REWORKED: sloth-seeker (either species), monkey-business (2 species), croc-spotter (both required),
//           poison-collector (1 species), night-hunter → honey-bear

export const speciesBadges = [
  // ═══════════════════════════════════════════════════════════════════════════
  // ICONIC SPECIES BADGES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'quetzal-quest',
    name: 'Quetzal Quest',
    description: 'Spotted the legendary Resplendent Quetzal',
    icon: '🐦',
    image: '/badges/quetzal-quest.png',
    condition: (archive) => archive?.species?.['resplendent-quetzal'],
    tier: 'legendary'
  },
  {
    id: 'scarlet-spotter',
    name: 'Scarlet Spotter',
    description: 'Witnessed a Scarlet Macaw in the wild',
    icon: '🦜',
    image: '/badges/scarlet-spotter.png',
    condition: (archive) => archive?.species?.['scarlet-macaw'],
    tier: 'gold'
  },
  {
    id: 'sloth-seeker',
    name: 'Sloth Seeker',
    description: 'Found a sloth — three-toed or two-toed',
    icon: '🦥',
    image: '/badges/sloth-seeker.png',
    condition: (archive) => 
      archive?.species?.['three-toed-sloth'] || 
      archive?.species?.['two-toed-sloth'],
    tier: 'gold'
  },
  {
    id: 'rainbow-bill',
    name: 'Rainbow Bill',
    description: 'Saw a Keel-billed Toucan in the wild',
    icon: '🐦',
    image: '/badges/rainbow-bill.png',
    condition: (archive) => archive?.species?.['keel-billed-toucan'],
    tier: 'silver'
  },
  {
    id: 'toucan-trio',
    name: 'Toucan Trio',
    description: 'Spotted 3 different toucan/aracari species',
    icon: '🐦',
    image: '/badges/badge-bird.png',
    condition: (archive) => {
      const toucans = ['keel-billed-toucan', 'chestnut-mandibled-toucan', 'collared-aracari', 'fiery-billed-aracari', 'emerald-toucanet'];
      return toucans.filter(id => archive?.species?.[id]).length >= 3;
    },
    tier: 'gold'
  },
  {
    id: 'red-eyed-wonder',
    name: 'Red-eyed Wonder',
    description: 'Found the iconic Red-eyed Tree Frog',
    icon: '🐸',
    image: '/badges/red-eyed-wonder.png',
    condition: (archive) => archive?.species?.['red-eyed-tree-frog'],
    tier: 'gold'
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // PRIMATE BADGES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'monkey-business',
    name: 'Monkey Business',
    description: 'Encountered 2 different monkey species',
    icon: '🐒',
    image: '/badges/badge-primate.png',
    condition: (archive) => {
      const monkeys = ['white-faced-capuchin', 'mantled-howler', 'spider-monkey', 'squirrel-monkey'];
      return monkeys.filter(id => archive?.species?.[id]).length >= 2;
    },
    tier: 'silver'
  },
  {
    id: 'primate-watcher',
    name: 'Primate Watcher',
    description: 'Encountered all 4 Costa Rican monkey species',
    icon: '🐒',
    image: '/badges/badge-primate.png',
    condition: (archive) => {
      const monkeys = ['white-faced-capuchin', 'mantled-howler', 'spider-monkey', 'squirrel-monkey'];
      return monkeys.every(id => archive?.species?.[id]);
    },
    tier: 'legendary'
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // CAT & CARNIVORE BADGES — Each cat gets its own badge
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'jaguar-dreamer',
    name: 'Jaguar Dreamer',
    description: 'Witnessed the elusive Jaguar',
    icon: '🐆',
    image: '/badges/jaguar-dreamer.png',
    condition: (archive) => archive?.species?.['jaguar'],
    tier: 'legendary'
  },
  {
    id: 'puma-shadow',
    name: 'Puma Shadow',
    description: 'Spotted the ghost of the mountains — a wild Puma',
    icon: '🐱',
    image: '/badges/puma-shadow.png',
    condition: (archive) => archive?.species?.['puma'],
    tier: 'legendary'
  },
  {
    id: 'ocelot-eyes',
    name: 'Ocelot Eyes',
    description: 'Found an Ocelot in the wild',
    icon: '🐱',
    image: '/badges/ocelot.png',
    condition: (archive) => archive?.species?.['ocelot'],
    tier: 'legendary'
  },
  {
    id: 'margay-mystery',
    name: 'Margay Mystery',
    description: 'Spotted the rare, tree-climbing Margay',
    icon: '🐱',
    image: '/badges/margay-mystery.png',
    condition: (archive) => archive?.species?.['margay'],
    tier: 'legendary'
  },
  {
    id: 'jaguarundi-ghost',
    name: 'Jaguarundi Ghost',
    description: 'Witnessed the weasel-cat — the Jaguarundi',
    icon: '🐱',
    image: '/badges/badge-cat.png',
    condition: (archive) => archive?.species?.['jaguarundi'],
    tier: 'legendary'
  },
  {
    id: 'cat-collector',
    name: 'Cat Collector',
    description: 'Spotted 3 different wild cat species',
    icon: '🐆',
    image: '/badges/badge-cat.png',
    condition: (archive) => {
      const cats = ['jaguar', 'puma', 'ocelot', 'margay', 'jaguarundi', 'oncilla'];
      return cats.filter(id => archive?.species?.[id]).length >= 3;
    },
    tier: 'legendary'
  },
  {
    id: 'coati-encounter',
    name: 'Coati Encounter',
    description: 'Met the curious White-nosed Coati',
    icon: '🦝',
    image: '/badges/white-nosed-coati.png',
    condition: (archive) => archive?.species?.['white-nosed-coati'],
    tier: 'bronze'
  },
  {
    id: 'honey-bear',
    name: 'Honey Bear',
    description: 'Spotted the nocturnal Kinkajou',
    icon: '🌙',
    image: '/badges/honey-bear.png',
    condition: (archive) => archive?.species?.['kinkajou'],
    tier: 'gold'
  },
  {
    id: 'white-bat-discovery',
    name: 'White Bat Discovery',
    description: 'Found Honduran White Bats roosting in their leaf tent',
    icon: '🦇',
    image: '/badges/honduran-white-bat.png',
    condition: (archive) => archive?.species?.['honduran-white-bat'],
    tier: 'gold'
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // BIRD BADGES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'hummingbird-master',
    name: 'Hummingbird Master',
    description: 'Spotted 10 different hummingbird species',
    icon: '✨',
    image: '/badges/badge-bird.png',
    condition: (archive) => {
      const hummers = ['violet-sabrewing', 'green-hermit', 'long-billed-hermit', 'green-crowned-brilliant', 'magnificent-hummingbird', 'purple-throated-mountaingem', 'fiery-throated-hummingbird', 'volcano-hummingbird', 'rufous-tailed-hummingbird', 'coppery-headed-emerald', 'snowcap', 'white-necked-jacobin', 'bronze-tailed-plumeleteer', 'scintillant-hummingbird'];
      return hummers.filter(id => archive?.species?.[id]).length >= 10;
    },
    tier: 'legendary'
  },
  {
    id: 'trogon-tracker',
    name: 'Trogon Tracker',
    description: 'Spotted 3 different trogon species — each one a jewel',
    icon: '🌈',
    image: '/badges/badge-bird.png',
    condition: (archive) => {
      const trogons = ['slaty-tailed-trogon', 'black-headed-trogon', 'baird-trogon', 'black-throated-trogon', 'gartered-trogon', 'orange-bellied-trogon', 'collared-trogon'];
      return trogons.filter(id => archive?.species?.[id]).length >= 3;
    },
    tier: 'gold'
  },
  {
    id: 'motmot-maven',
    name: 'Motmot Maven',
    description: 'Spotted 3 different motmot species',
    icon: '🪶',
    image: '/badges/badge-bird.png',
    condition: (archive) => {
      const motmots = ['turquoise-browed-motmot', 'lesson-motmot', 'rufous-motmot', 'broad-billed-motmot', 'keel-billed-motmot'];
      return motmots.filter(id => archive?.species?.[id]).length >= 3;
    },
    tier: 'gold'
  },
  {
    id: 'living-rainbow',
    name: 'Living Rainbow',
    description: 'Spotted 5 tanager or honeycreeper species',
    icon: '🎨',
    image: '/badges/badge-bird.png',
    condition: (archive) => {
      const tanagers = ['blue-gray-tanager', 'palm-tanager', 'summer-tanager', 'scarlet-tanager', 'flame-colored-tanager', 'silver-throated-tanager', 'spangle-cheeked-tanager', 'bay-headed-tanager', 'golden-hooded-tanager', 'emerald-tanager', 'speckled-tanager', 'green-honeycreeper', 'red-legged-honeycreeper', 'scarlet-thighed-dacnis'];
      return tanagers.filter(id => archive?.species?.[id]).length >= 5;
    },
    tier: 'gold'
  },
  {
    id: 'eyes-in-the-sky',
    name: 'Eyes in the Sky',
    description: 'Spotted 3 raptors — hawks, eagles, or falcons (not vultures)',
    icon: '🦅',
    image: '/badges/badge-bird.png',
    condition: (archive) => {
      const raptors = ['harpy-eagle', 'crested-eagle', 'ornate-hawk-eagle', 'black-hawk-eagle', 'swallow-tailed-kite', 'laughing-falcon', 'bat-falcon', 'roadside-hawk'];
      return raptors.filter(id => archive?.species?.[id]).length >= 3;
    },
    tier: 'gold'
  },
  {
    id: 'harpy-hunter',
    name: 'Harpy Hunter',
    description: 'Spotted the mighty Harpy Eagle — rarer than jaguar',
    icon: '🦅',
    image: '/badges/harpy-eagle.png',
    condition: (archive) => archive?.species?.['harpy-eagle'],
    tier: 'legendary'
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // REPTILE & AMPHIBIAN BADGES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'frog-finder',
    name: 'Frog Finder',
    description: 'Identified 3 different frog species',
    icon: '🐸',
    image: '/badges/badge-amphibian2.png',
    condition: (archive) => {
      const frogs = ['red-eyed-tree-frog', 'glass-frog', 'poison-dart-frog-green-black', 'poison-dart-frog-strawberry', 'poison-dart-frog-granular', 'marine-toad', 'smoky-jungle-frog', 'masked-tree-frog'];
      return frogs.filter(id => archive?.species?.[id]).length >= 3;
    },
    tier: 'silver'
  },
  {
    id: 'poison-collector',
    name: 'Poison Collector',
    description: 'Spotted a poison dart frog species',
    icon: '☠️',
    image: '/badges/badge-amphibian.png',
    condition: (archive) => {
      const poison = ['poison-dart-frog-green-black', 'poison-dart-frog-strawberry', 'poison-dart-frog-granular'];
      return poison.some(id => archive?.species?.[id]);
    },
    tier: 'gold'
  },
  {
    id: 'croc-spotter',
    name: 'Croc Spotter',
    description: 'Spotted both a crocodile and a caiman',
    icon: '🐊',
    image: '/badges/croc-spotter.png',
    condition: (archive) => 
      archive?.species?.['american-crocodile'] && 
      archive?.species?.['spectacled-caiman'],
    tier: 'gold'
  },
  {
    id: 'snake-charmer',
    name: 'Snake Charmer',
    description: 'Spotted 2 different snake species',
    icon: '🐍',
    image: '/badges/badge-reptile.png',
    condition: (archive) => {
      const snakes = ['boa-constrictor', 'fer-de-lance', 'eyelash-viper', 'coral-snake'];
      return snakes.filter(id => archive?.species?.[id]).length >= 2;
    },
    tier: 'gold'
  },
  {
    id: 'turtle-time',
    name: 'Turtle Time',
    description: 'Witnessed sea turtles',
    icon: '🐢',
    image: '/badges/sea-turtle-wave-gold.png',
    condition: (archive) => {
      const turtles = ['olive-ridley-turtle', 'green-sea-turtle', 'leatherback-turtle', 'hawksbill-turtle'];
      return turtles.some(id => archive?.species?.[id]);
    },
    tier: 'gold'
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // MARINE BADGES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'whale-watcher',
    name: 'Whale Watcher',
    description: 'Spotted a Humpback Whale',
    icon: '🐋',
    image: '/badges/badge-ocean.png',
    condition: (archive) => archive?.species?.['humpback-whale'],
    tier: 'gold'
  },
  {
    id: 'dolphin-dancer',
    name: 'Dolphin Dancer',
    description: 'Encountered dolphins',
    icon: '🐬',
    image: '/badges/badge-ocean.png',
    condition: (archive) => {
      const dolphins = ['bottlenose-dolphin', 'spinner-dolphin', 'spotted-dolphin'];
      return dolphins.some(id => archive?.species?.[id]);
    },
    tier: 'silver'
  },
  {
    id: 'shark-seeker',
    name: 'Shark Seeker',
    description: 'Spotted a shark species',
    icon: '🦈',
    image: '/badges/badge-ocean.png',
    condition: (archive) => {
      const sharks = ['whale-shark', 'whitetip-reef-shark', 'bull-shark', 'hammerhead-shark'];
      return sharks.some(id => archive?.species?.[id]);
    },
    tier: 'gold'
  },
  {
    id: 'ray-rider',
    name: 'Ray Rider',
    description: 'Spotted a manta or eagle ray',
    icon: '🌊',
    image: '/badges/badge-ocean.png',
    condition: (archive) => 
      archive?.species?.['manta-ray'] || 
      archive?.species?.['spotted-eagle-ray'],
    tier: 'gold'
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // INSECT BADGES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'morpho-moment',
    name: 'Morpho Moment',
    description: 'Spotted a Blue Morpho butterfly — electric blue flash on the trail',
    icon: '🦋',
    image: '/badges/morpho-moment.png',
    condition: (archive) => archive?.species?.['blue-morpho'],
    tier: 'silver'
  },
  {
    id: 'glass-wings',
    name: 'Glass Wings',
    description: 'Spotted a Glasswing Butterfly — transparent wings like magic',
    icon: '✨',
    image: '/badges/badge-insect.png',
    condition: (archive) => archive?.species?.['glasswing-butterfly'],
    tier: 'gold'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INDIVIDUAL SPECIES BADGES — Each sighting is its own reward
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'great-antshrike',
    name: 'Great Antshrike',
    description: 'Spotted the Great Antshrike — boldly patterned sentinel of the understory',
    icon: '🐦',
    image: '/badges/great-antshrike.png',
    condition: (archive) => archive?.species?.['great-antshrike'],
    tier: 'bronze'
  },
  {
    id: 'great-curassow',
    name: 'The King Bird',
    description: 'Spotted a Great Curassow — a turkey-sized bird with a curly crest and yellow bill knob, strutting through the forest floor like royalty',
    icon: '👑',
    image: '/badges/great-curassow.png',
    condition: (archive) => archive?.species?.['great-curassow'],
    tier: 'gold'
  },
  {
    id: 'great-tinamou',
    name: 'Great Tinamou',
    description: 'Heard or saw the Great Tinamou — its haunting whistle is the voice of the deep forest',
    icon: '🐦',
    image: '/badges/great-tinamou.png',
    condition: (archive) => archive?.species?.['great-tinamou'],
    tier: 'silver'
  },
  {
    id: 'greater-grison',
    name: 'Greater Grison',
    description: 'Spotted the Greater Grison — fearless weasel-like predator, rarely seen',
    icon: '🦡',
    image: '/badges/greater-grison.png',
    condition: (archive) => archive?.species?.['greater-grison'],
    tier: 'gold'
  },
  {
    id: 'king-vulture-badge',
    name: 'King Vulture',
    description: 'Witnessed the King Vulture — that painted face is one of nature\'s wildest designs',
    icon: '🦅',
    image: '/badges/king-vulture.png',
    condition: (archive) => archive?.species?.['king-vulture'],
    tier: 'gold'
  },
  {
    id: 'long-tailed-manakin',
    name: 'Long-tailed Manakin',
    description: 'Found the Long-tailed Manakin — two males perform a cooperative moonwalk dance to impress females',
    icon: '🐦',
    image: '/badges/long-tailed-manakin.png',
    condition: (archive) => archive?.species?.['long-tailed-manakin'],
    tier: 'gold'
  },
  {
    id: 'nine-banded-armadillo-badge',
    name: 'Nine-banded Armadillo',
    description: 'Found a Nine-banded Armadillo — always gives birth to identical quadruplets',
    icon: '🦔',
    image: '/badges/nine-banded-armadillo.png',
    condition: (archive) => archive?.species?.['nine-banded-armadillo'],
    tier: 'bronze'
  },
  {
    id: 'northern-tamandua-badge',
    name: 'Northern Tamandua',
    description: 'Spotted the Northern Tamandua — tree-climbing anteater with a vest-like pattern',
    icon: '🐾',
    image: '/badges/northern-tamandua.png',
    condition: (archive) => archive?.species?.['northern-tamandua'],
    tier: 'silver'
  },
  {
    id: 'oncilla-badge',
    name: 'Oncilla',
    description: 'Spotted the Oncilla — Costa Rica\'s smallest and rarest wild cat, a spotted ghost of the cloud forest',
    icon: '🐱',
    image: '/badges/oncilla.png',
    condition: (archive) => archive?.species?.['oncilla'],
    tier: 'legendary'
  },
  {
    id: 'red-brocket-deer-badge',
    name: 'Red Brocket Deer',
    description: 'Found a Red Brocket Deer — shy forest deer that freezes like a statue when spotted',
    icon: '🦌',
    image: '/badges/red-brocket-deer.png',
    condition: (archive) => archive?.species?.['red-brocket-deer'],
    tier: 'silver'
  },
  {
    id: 'royal-flycatcher-badge',
    name: 'Royal Flycatcher',
    description: 'Witnessed the Royal Flycatcher — when it fans that insane red-orange crest, time stops',
    icon: '👑',
    image: '/badges/royal-flycatcher.png',
    condition: (archive) => archive?.species?.['royal-flycatcher'],
    tier: 'gold'
  },
  {
    id: 'rufous-tailed-jacamar-badge',
    name: 'Rufous-tailed Jacamar',
    description: 'Spotted the Rufous-tailed Jacamar — iridescent green hummingbird-lookalike that catches butterflies mid-air',
    icon: '🐦',
    image: '/badges/rufous-tailed-jacamar.png',
    condition: (archive) => archive?.species?.['rufous-tailed-jacamar'],
    tier: 'silver'
  },
  {
    id: 'spectacled-owl-badge',
    name: 'Spectacled Owl',
    description: 'Found the Spectacled Owl — those yellow eyes ringed in white staring from the darkness',
    icon: '🦉',
    image: '/badges/spectacled-owl.png',
    condition: (archive) => archive?.species?.['spectacled-owl'],
    tier: 'gold'
  },
  {
    id: 'paca-badge',
    name: 'Spotted Paca',
    description: 'Spotted a Paca — large nocturnal rodent with rows of white spots, prized by jaguars',
    icon: '🐾',
    image: '/badges/paca.png',
    condition: (archive) => archive?.species?.['paca'],
    tier: 'silver'
  },
  {
    id: 'tayra-badge',
    name: 'Tayra',
    description: 'Spotted a Tayra — fearless weasel that sprints through the canopy raiding fruit and honey',
    icon: '🐾',
    image: '/badges/tayra-badge.png',
    condition: (archive) => archive?.species?.['tayra'],
    tier: 'silver'
  },
  {
    id: 'white-hawk-badge',
    name: 'White Hawk',
    description: 'Spotted the White Hawk — ghostly white raptor soaring above the canopy',
    icon: '🦅',
    image: '/badges/white-hawk.png',
    condition: (archive) => archive?.species?.['white-hawk'],
    tier: 'silver'
  },
  {
    id: 'gray-fox-badge',
    name: 'Gray Fox',
    description: 'Found the Gray Fox — the only canid that can climb trees, using curved claws to scale trunks',
    icon: '🦊',
    image: '/badges/gray-fox-badge.png',
    condition: (archive) => archive?.species?.['gray-fox'],
    tier: 'gold'
  },
  {
    id: 'fruit-bat-badge',
    name: 'Lesser Short-nosed Fruit Bat',
    description: 'Found the Lesser Short-nosed Fruit Bat — tiny pollinator that keeps the jungle alive',
    icon: '🦇',
    image: '/badges/fruit-bat.png',
    condition: (archive) => archive?.species?.['lesser-short-nosed-fruit-bat'],
    tier: 'bronze'
  },
  {
    id: 'hairy-porcupine-badge',
    name: 'Mexican Hairy Porcupine',
    description: 'Spotted the Mexican Hairy Porcupine — quills hidden under long dark hair, lives high in the canopy',
    icon: '🦔',
    image: '/badges/mexican-hairy-porcupine-badge.png',
    condition: (archive) => archive?.species?.['mexican-hairy-porcupine'],
    tier: 'gold'
  },
  {
    id: 'mouse-opossum-badge',
    name: 'Mexican Mouse Opossum',
    description: 'Found the Mexican Mouse Opossum — tiny marsupial with huge dark eyes, carries babies on its back',
    icon: '🐭',
    image: '/badges/mexican-mouse-opossum-badge.png',
    condition: (archive) => archive?.species?.['mexican-mouse-opossum'],
    tier: 'gold'
  },
  {
    id: 'agouti-badge',
    name: 'Agouti',
    description: 'Spotted the Central American Agouti — the only animal that can crack a Brazil nut',
    icon: '🐿️',
    image: '/badges/agouti.png',
    condition: (archive) => archive?.species?.['agouti'],
    tier: 'bronze'
  },
  {
    id: 'tiger-heron-badge',
    name: 'Bare-throated Tiger-Heron',
    description: 'Found the Bare-throated Tiger-Heron — large barred heron stalking rivers and mangroves',
    icon: '🐦',
    image: '/badges/bare-throated-tiger-heron.png',
    condition: (archive) => archive?.species?.['bare-throated-tiger-heron'],
    tier: 'silver'
  },
  {
    id: 'black-hawk-eagle-badge',
    name: 'Black Hawk-Eagle',
    description: 'Spotted the Black Hawk-Eagle — dark crested eagle with checkered underwings soaring over the canopy',
    icon: '🦅',
    image: '/badges/black-hawk-eagle.png',
    condition: (archive) => archive?.species?.['black-hawk-eagle'],
    tier: 'gold'
  },
  {
    id: 'river-turtle-badge',
    name: 'Black River Turtle',
    description: 'Found a Black River Turtle — large freshwater turtle of the lowland rivers',
    icon: '🐢',
    image: '/badges/black-river-turtle.png',
    condition: (archive) => archive?.species?.['freshwater-turtle'],
    tier: 'silver'
  },
  {
    id: 'boat-billed-heron-badge',
    name: 'Boat-billed Heron',
    description: 'Found the Boat-billed Heron — nocturnal heron with an enormous wide bill and huge eyes',
    icon: '🐦',
    image: '/badges/boat-billed-heron.png',
    condition: (archive) => archive?.species?.['boat-billed-heron'],
    tier: 'silver'
  },
  {
    id: 'cacomistle-badge',
    name: 'Cacomistle',
    description: 'Spotted the Cacomistle — slender ringtail relative with huge eyes, strictly nocturnal and rarely seen',
    icon: '🌙',
    image: '/badges/cacomistle.png',
    condition: (archive) => archive?.species?.['cacomistle'],
    tier: 'gold'
  },
  {
    id: 'collared-peccary-badge',
    name: 'Collared Peccary',
    description: 'Encountered a Collared Peccary herd — pig-like mammals that travel in groups and smell before you see them',
    icon: '🐗',
    image: '/badges/collared-peccary.png',
    condition: (archive) => archive?.species?.['collared-peccary'],
    tier: 'bronze'
  },
  {
    id: 'forest-falcon-badge',
    name: 'Collared Forest-Falcon',
    description: 'Found the Collared Forest-Falcon — heard more than seen, its haunting call echoes through the understory',
    icon: '🦅',
    image: '/badges/collared-forest-falcon.png',
    condition: (archive) => archive?.species?.['collared-forest-falcon'],
    tier: 'gold'
  },
  {
    id: 'crested-guan-badge',
    name: 'Crested Guan',
    description: 'Spotted the Crested Guan — large arboreal bird with a red dewlap crashing through the canopy',
    icon: '🐦',
    image: '/badges/crested-guan.png',
    condition: (archive) => archive?.species?.['crested-guan'],
    tier: 'silver'
  },
  {
    id: 'green-black-dart-frog-badge',
    name: 'Green-and-black Poison Frog',
    description: 'Found the Green-and-black Poison Dart Frog — metallic green and black, active by day, toxic to the touch',
    icon: '🐸',
    image: '/badges/green-and-black-poison-dart-frog.png',
    condition: (archive) => archive?.species?.['poison-dart-frog-green-black'],
    tier: 'gold'
  },
  {
    id: 'ornate-hawk-eagle-badge',
    name: 'Ornate Hawk-Eagle',
    description: 'Witnessed the Ornate Hawk-Eagle — stunning crested raptor with bold black and white markings',
    icon: '🦅',
    image: '/badges/ornate-hawk-eagle.png',
    condition: (archive) => archive?.species?.['ornate-hawk-eagle'],
    tier: 'gold'
  },
  {
    id: 'squirrel-monkey-badge',
    name: 'Squirrel Monkey',
    description: 'Found the Central American Squirrel Monkey — tiny, endangered, travels in troops of up to 75 on the Pacific coast',
    icon: '🐒',
    image: '/badges/squirrel-monkey.png',
    condition: (archive) => archive?.species?.['squirrel-monkey'],
    tier: 'gold'
  },
  {
    id: 'turquoise-motmot-badge',
    name: 'Turquoise-browed Motmot',
    description: 'Spotted the Turquoise-browed Motmot — that electric blue eyebrow and pendulum racket tail are unmistakable',
    icon: '🪶',
    image: '/badges/turquoise-browed-motmot.png',
    condition: (archive) => archive?.species?.['turquoise-browed-motmot'],
    tier: 'silver'
  },
  {
    id: 'bairds-tapir-badge',
    name: "Baird's Tapir",
    description: "Found a Baird's Tapir — largest land mammal in Central America, gentle giant of the rainforest",
    icon: '🐾',
    image: '/badges/bairds-tapir.png',
    condition: (archive) => archive?.species?.['bairds-tapir'],
    tier: 'legendary'
  },
  {
    id: 'black-white-hawk-eagle-badge',
    name: 'Black-and-white Hawk-Eagle',
    description: 'Spotted the Black-and-white Hawk-Eagle — striking raptor with checkered wings and piercing yellow eyes',
    icon: '🦅',
    image: '/badges/black-and-white-hawk-eagle.png',
    condition: (archive) => archive?.species?.['black-and-white-hawk-eagle'],
    tier: 'gold'
  },
  {
    id: 'great-potoo-badge',
    name: 'Great Potoo',
    description: 'Found a Great Potoo — master of disguise, looks exactly like a broken branch until it opens those enormous eyes',
    icon: '🌙',
    image: '/badges/great-potoo.png',
    condition: (archive) => archive?.species?.['great-potoo'],
    tier: 'gold'
  },
  {
    id: 'green-iguana-badge',
    name: 'Green Iguana',
    description: 'Spotted a Green Iguana — prehistoric-looking dragon sunning on the riverbank',
    icon: '🦎',
    image: '/badges/green-iguana.png',
    condition: (archive) => archive?.species?.['green-iguana'],
    tier: 'bronze'
  },
  {
    id: 'glass-frog-badge',
    name: 'Glass Frog',
    description: 'Found a Glass Frog — translucent belly reveals a beating heart, bones, and organs',
    icon: '🐸',
    image: '/badges/glass-frog.png',
    condition: (archive) => archive?.species?.['glass-frog'],
    tier: 'gold'
  },
  {
    id: 'capuchin-badge',
    name: 'White-faced Capuchin',
    description: 'Met the White-faced Capuchin — clever, curious, known to use tools and steal your lunch',
    icon: '🐒',
    image: '/badges/white-faced-capuchin.png',
    condition: (archive) => archive?.species?.['white-faced-capuchin'],
    tier: 'bronze'
  },
  {
    id: 'chestnut-toucan-badge',
    name: 'Chestnut-mandibled Toucan',
    description: 'Spotted the Chestnut-mandibled Toucan — the largest toucan in Costa Rica with a massive two-toned bill',
    icon: '🐦',
    image: '/badges/chestnut-mandibled-toucan.png',
    condition: (archive) => archive?.species?.['chestnut-mandibled-toucan'],
    tier: 'silver'
  },
  {
    id: 'collared-aracari-badge',
    name: 'Collared Aracari',
    description: 'Found a Collared Aracari — small toucan with a fiery chest band, travels in noisy family groups',
    icon: '🐦',
    image: '/badges/collared-aracari.png',
    condition: (archive) => archive?.species?.['collared-aracari'],
    tier: 'silver'
  },
  {
    id: 'emerald-toucanet-badge',
    name: 'Emerald Toucanet',
    description: 'Spotted the Emerald Toucanet — jewel-green cloud forest toucan with a blue-and-yellow bill',
    icon: '🐦',
    image: '/badges/emerald-toucanet.png',
    condition: (archive) => archive?.species?.['emerald-toucanet'],
    tier: 'silver'
  },
  {
    id: 'fiery-aracari-badge',
    name: 'Fiery-billed Aracari',
    description: 'Found the Fiery-billed Aracari — flame-orange bill endemic to southern Costa Rica and western Panama',
    icon: '🐦',
    image: '/badges/fiery-billed-aracari.png',
    condition: (archive) => archive?.species?.['fiery-billed-aracari'],
    tier: 'gold'
  },
  {
    id: 'crested-eagle-badge',
    name: 'Crested Eagle',
    description: 'Witnessed the Crested Eagle — massive forest eagle nearly as rare as the Harpy, ghostly pale face',
    icon: '🦅',
    image: '/badges/crested-eagle.png',
    condition: (archive) => archive?.species?.['crested-eagle'],
    tier: 'legendary'
  },
  {
    id: 'strawberry-dart-frog-badge',
    name: 'Strawberry Poison Dart Frog',
    description: 'Found the Strawberry Poison Dart Frog — tiny, brilliant red, the blue-jeans morph is unforgettable',
    icon: '🐸',
    image: '/badges/poison-dart-frog.png',
    condition: (archive) => archive?.species?.['poison-dart-frog-strawberry'],
    tier: 'gold'
  },
  {
    id: 'three-toed-sloth-badge',
    name: 'Three-toed Sloth',
    description: 'Found a Three-toed Sloth — that permanent smile and algae-covered fur, slow-motion king of the canopy',
    icon: '🦥',
    image: '/badges/three-toed-sloth.png',
    condition: (archive) => archive?.species?.['three-toed-sloth'],
    tier: 'silver'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BAT BADGES — Night flyers of the jungle
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'spectral-bat-badge',
    name: 'Spectral Bat',
    description: 'Found the Spectral Bat — largest bat in the Americas with a 3-foot wingspan. It hunts other bats.',
    icon: '🦇',
    image: '/badges/platinum-bat.png',
    condition: (archive) => archive?.species?.['spectral-bat'],
    tier: 'legendary'
  },
  {
    id: 'wrinkle-faced-bat-badge',
    name: 'Wrinkle-faced Bat',
    description: 'Found the Wrinkle-faced Bat — the most bizarre face in the animal kingdom, like a bulldog crossed with a gargoyle',
    icon: '🦇',
    image: '/badges/ruby-bat.png',
    condition: (archive) => archive?.species?.['wrinkle-faced-bat'],
    tier: 'gold'
  },
  {
    id: 'vampire-bat-badge',
    name: 'Vampire Bat',
    description: 'Found a Vampire Bat — the only mammal that feeds entirely on blood, walks on all fours like a spider',
    icon: '🦇',
    image: '/badges/emerald-bat.png',
    condition: (archive) => archive?.species?.['vampire-bat'],
    tier: 'gold'
  },
  {
    id: 'bulldog-bat-badge',
    name: 'Greater Bulldog Bat',
    description: 'Spotted the Greater Bulldog Bat — fish-eating bat that drags its claws through water like a trawling net',
    icon: '🦇',
    image: '/badges/gold-bat.png',
    condition: (archive) => archive?.species?.['greater-bulldog-bat'],
    tier: 'gold'
  },
  {
    id: 'tent-making-bat-badge',
    name: 'Tent-making Bat',
    description: 'Found a Tent-making Bat — chews leaf veins to fold them into rain shelters, tiny architect of the jungle',
    icon: '🦇',
    image: '/badges/silverbat.png',
    condition: (archive) => archive?.species?.['tent-making-bat'],
    tier: 'silver'
  },
  {
    id: 'ghost-bat-badge',
    name: 'Greater White-lined Bat',
    description: 'Spotted the Greater White-lined Bat — distinctive white racing stripes on a dark face',
    icon: '🦇',
    image: '/badges/northern-ghost-bat.png',
    condition: (archive) => archive?.species?.['greater-white-lined-bat'],
    tier: 'silver'
  },
  {
    id: 'fruit-bat-common-badge',
    name: 'Jamaican Fruit Bat',
    description: 'Spotted a Jamaican Fruit Bat — the most common bat at dusk, essential seed disperser of the forest',
    icon: '🦇',
    image: '/badges/bronze-bat.png',
    condition: (archive) => archive?.species?.['jamaican-fruit-bat'],
    tier: 'bronze'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MOTMOT BADGES — Pendulum tails of the forest
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'keel-billed-motmot-badge',
    name: 'Keel-billed Motmot',
    description: 'Found the Keel-billed Motmot — the rarest motmot, elusive jewel of the Caribbean slope',
    icon: '🪶',
    image: '/badges/diamond-motmot.png',
    condition: (archive) => archive?.species?.['keel-billed-motmot'],
    tier: 'legendary'
  },
  {
    id: 'broad-billed-motmot-badge',
    name: 'Broad-billed Motmot',
    description: 'Spotted the Broad-billed Motmot — rufous head with a turquoise crown, sits motionless then strikes',
    icon: '🪶',
    image: '/badges/gold-motmot.png',
    condition: (archive) => archive?.species?.['broad-billed-motmot'],
    tier: 'gold'
  },
  {
    id: 'rufous-motmot-badge',
    name: 'Rufous Motmot',
    description: 'Found the Rufous Motmot — largest motmot, cinnamon plumage with that signature pendulum racket tail',
    icon: '🪶',
    image: '/badges/silver-motmot.png',
    condition: (archive) => archive?.species?.['rufous-motmot'],
    tier: 'silver'
  },
  {
    id: 'lesson-motmot-badge',
    name: "Lesson's Motmot",
    description: "Spotted Lesson's Motmot — blue-crowned beauty that swings its racket tail like a hypnotist's pendulum",
    icon: '🪶',
    image: '/badges/bronze-motmot.png',
    condition: (archive) => archive?.species?.['lesson-motmot'],
    tier: 'silver'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ADDITIONAL TOUCAN BADGES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'yellow-eared-toucanet-badge',
    name: 'Yellow-eared Toucanet',
    description: 'Found the Yellow-eared Toucanet — tiny highland toucan with a bright yellow ear patch, cloud forest specialty',
    icon: '🐦',
    image: '/badges/yellow-throated-toucan.png',
    condition: (archive) => archive?.species?.['yellow-eared-toucanet'],
    tier: 'gold'
  },
  {
    id: 'lovely-cotinga-badge',
    name: 'Lovely Cotinga',
    description: 'Spotted the Lovely Cotinga — electric blue plumage so vivid it looks painted, perches silently in the canopy like a jewel',
    icon: '🐦',
    image: '/badges/lovely-cotinga-badge.png',
    condition: (archive) => archive?.species?.['lovely-cotinga'],
    tier: 'gold'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ROUND 2 — ICONIC MUST-HAVES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'jabiru-stork',
    name: 'The Tower',
    description: 'Spotted a Jabiru — tallest flying bird in the Americas, standing nearly 5 feet tall with a massive upturned bill and blood-red throat pouch',
    icon: '🦩',
    image: '/badges/jabiru.png',
    condition: (archive) => archive?.species?.['jabiru'],
    tier: 'legendary'
  },
  {
    id: 'umbrellabird-sighting',
    name: 'The Umbrella',
    description: 'Found a Bare-necked Umbrellabird — the bird with the parasol crest and inflatable red throat wattle that looks like it was designed by committee',
    icon: '☂️',
    image: '/badges/bare-necked-umbrellabird.png',
    condition: (archive) => archive?.species?.['bare-necked-umbrellabird'],
    tier: 'legendary'
  },
  {
    id: 'bellbird-encounter',
    name: 'The Loudest Voice',
    description: 'Found a Three-wattled Bellbird — the loudest bird on Earth with three bizarre worm-like wattles dangling from its bill',
    icon: '🔔',
    image: '/badges/three-wattled-bellbird.png',
    condition: (archive) => archive?.species?.['three-wattled-bellbird'],
    tier: 'legendary'
  },
  {
    id: 'great-green-macaw-sighting',
    name: 'The Last Giant',
    description: 'Spotted a Great Green Macaw — critically endangered, fewer than 300 remain in Costa Rica. An enormous emerald parrot that depends on wild almond trees',
    icon: '🦜',
    image: '/badges/great-green-macaw.png',
    condition: (archive) => archive?.species?.['great-green-macaw'],
    tier: 'legendary'
  },
  {
    id: 'whale-shark-encounter',
    name: 'Gentle Giant',
    description: 'Encountered a Whale Shark — the largest fish on Earth, filter-feeding its way through the Pacific with a mouth wide enough to swallow a kayak',
    icon: '🦈',
    image: '/badges/whale-shark.png',
    condition: (archive) => archive?.species?.['whale-shark'],
    tier: 'legendary'
  },
  {
    id: 'leatherback-sighting',
    name: 'The Deep Diver',
    description: 'Witnessed a Leatherback Sea Turtle — the largest living turtle, capable of diving 4,000 feet into the abyss. Ancient beyond comprehension',
    icon: '🐢',
    image: '/badges/leatherback-sea-turtle.png',
    condition: (archive) => archive?.species?.['leatherback-turtle'],
    tier: 'legendary'
  },
  {
    id: 'bushmaster-encounter',
    name: 'The Fer-de-Lance\'s King',
    description: 'Found a Bushmaster — the largest pit viper in the Western Hemisphere. Extremely rare, extremely dangerous, extremely beautiful',
    icon: '🐍',
    image: '/badges/bushmaster.png',
    condition: (archive) => archive?.species?.['bushmaster'],
    tier: 'legendary'
  },
  {
    id: 'giant-anteater-sighting',
    name: 'The Tongue',
    description: 'Spotted a Giant Anteater — 7-foot body, 2-foot tongue, claws that can kill a jaguar. Walks on its knuckles to protect them. Almost extinct in Costa Rica',
    icon: '🐾',
    image: '/badges/giant-anteater.png',
    condition: (archive) => archive?.species?.['giant-anteater'],
    tier: 'legendary'
  },
  {
    id: 'snowcap-sighting',
    name: 'The Snow Crown',
    description: 'Found a Snowcap hummingbird — a birder\'s holy grail. Tiny plum-purple body with a brilliant white cap. One of the smallest and hardest-to-find birds in Costa Rica',
    icon: '💎',
    image: '/badges/snowcap.png',
    condition: (archive) => archive?.species?.['snowcap'],
    tier: 'gold'
  },
  {
    id: 'otter-encounter',
    name: 'River Dancer',
    description: 'Spotted a Neotropical Otter — the playful river acrobat, sliding down mudbanks and catching fish with its whiskers',
    icon: '🦦',
    image: '/badges/neotropical-otter.png',
    condition: (archive) => archive?.species?.['neotropical-otter'],
    tier: 'gold'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ROUND 2 — STRONG CANDIDATES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'silky-anteater-sighting',
    name: 'The Teddy Bear',
    description: 'Found a Silky Anteater — the world\'s smallest anteater, no bigger than a tennis ball, with golden fur and a face like a stuffed animal',
    icon: '🧸',
    image: '/badges/silky-anteater.png',
    condition: (archive) => archive?.species?.['silky-anteater'],
    tier: 'legendary'
  },
  {
    id: 'lemur-leaf-frog-sighting',
    name: 'Alien Eyes',
    description: 'Found a Lemur Leaf Frog — enormous silver eyes with vertical slit pupils staring from a lime-green body. Critically endangered, looks extraterrestrial',
    icon: '👽',
    image: '/badges/lemur-leaf-frog.png',
    condition: (archive) => archive?.species?.['lemur-leaf-frog'],
    tier: 'gold'
  },
  {
    id: 'agami-heron-sighting',
    name: 'The Blue Ghost',
    description: 'Spotted an Agami Heron — possibly the most beautiful heron alive, with powder-blue head plumes flowing like silk. Almost never seen',
    icon: '🪶',
    image: '/badges/agami-heron.png',
    condition: (archive) => archive?.species?.['agami-heron'],
    tier: 'legendary'
  },
  {
    id: 'wood-stork-sighting',
    name: 'Old Bones',
    description: 'Spotted a Wood Stork — prehistoric-looking wader with a wrinkled, featherless head and a bill that snaps shut in 25 milliseconds',
    icon: '🦩',
    image: '/badges/wood-stork.png',
    condition: (archive) => archive?.species?.['wood-stork'],
    tier: 'silver'
  },
  {
    id: 'roseate-spoonbill-sighting',
    name: 'Pink Spoon',
    description: 'Spotted a Roseate Spoonbill — hot pink plumage and a spoon-shaped bill that it sweeps side to side through the shallows like a metal detector',
    icon: '🩷',
    image: '/badges/roseate spoonbill.png',
    condition: (archive) => archive?.species?.['roseate-spoonbill'],
    tier: 'silver'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ROUND 3 — CATEGORY SHOWCASES
  // ═══════════════════════════════════════════════════════════════════════════

  // HONEYCREEPERS (2)
  {
    id: 'green-honeycreeper-sighting',
    name: 'Living Turquoise',
    description: 'Spotted a Green Honeycreeper — the male is brilliant turquoise-green with a jet-black head, like a jewel that escaped a treasure chest',
    icon: '💎',
    image: '/badges/green-honeycreeper.png',
    condition: (archive) => archive?.species?.['green-honeycreeper'],
    tier: 'silver'
  },
  {
    id: 'red-legged-honeycreeper-sighting',
    name: 'Electric Purple',
    description: 'Spotted a Red-legged Honeycreeper — electric purple-blue plumage with bright red legs. In non-breeding plumage they turn completely green',
    icon: '💜',
    image: '/badges/red-legged-honeycreeper.png',
    condition: (archive) => archive?.species?.['red-legged-honeycreeper'],
    tier: 'silver'
  },

  // TANAGERS (2)
  {
    id: 'golden-hooded-tanager-sighting',
    name: 'The Golden Bandit',
    description: 'Spotted a Golden-hooded Tanager — a golden hood framing a black mask, turquoise wings, and a swagger that says they own the feeder',
    icon: '✨',
    image: '/badges/golden-hooded-tanager.png',
    condition: (archive) => archive?.species?.['golden-hooded-tanager'],
    tier: 'silver'
  },
  {
    id: 'spangle-cheeked-tanager-sighting',
    name: 'Cloud Forest Jewel',
    description: 'Spotted a Spangle-cheeked Tanager — found only in Costa Rica and western Panama, with iridescent blue-green speckles across their cheeks',
    icon: '🌿',
    image: '/badges/spangle-cheeked-tanager.png',
    condition: (archive) => archive?.species?.['spangle-cheeked-tanager'],
    tier: 'gold'
  },

  // KINGFISHERS (2)
  {
    id: 'ringed-kingfisher-sighting',
    name: 'The Rattler',
    description: 'Spotted a Ringed Kingfisher — the largest kingfisher in the Americas, announcing itself with a machine-gun rattle before plunging into the river',
    icon: '🐟',
    image: '/badges/ringed-kingfisher.png',
    condition: (archive) => archive?.species?.['ringed-kingfisher'],
    tier: 'silver'
  },
  {
    id: 'pygmy-kingfisher-sighting',
    name: 'Pocket Diver',
    description: 'Spotted an American Pygmy Kingfisher — the smallest kingfisher in the Americas, barely bigger than a hummingbird, perching on twigs just above the water',
    icon: '🔍',
    image: '/badges/american-pygmy-kingfisher.png',
    condition: (archive) => archive?.species?.['american-pygmy-kingfisher'],
    tier: 'gold'
  },

  // TROGONS (2)
  {
    id: 'slaty-tailed-trogon-sighting',
    name: 'The Red Flash',
    description: 'Spotted a Slaty-tailed Trogon — sitting so still you thought it was a leaf, until a brilliant red belly flashed as it took flight',
    icon: '❤️',
    image: '/badges/slaty-tailed-trogon.png',
    condition: (archive) => archive?.species?.['slaty-tailed-trogon'],
    tier: 'silver'
  },
  {
    id: 'lattice-tailed-trogon-sighting',
    name: 'The Lattice',
    description: 'Spotted a Lattice-tailed Trogon — the rarest trogon in Costa Rica, with a fine black-and-white lattice pattern on its tail found nowhere else',
    icon: '🪶',
    image: '/badges/lattice-tailed-trogon.png',
    condition: (archive) => archive?.species?.['lattice-tailed-trogon'],
    tier: 'legendary'
  },

  // CRABS (2)
  {
    id: 'halloween-crab-sighting',
    name: 'Trick or Treat',
    description: 'Found a Halloween Crab — purple body, orange legs, black claws. They look like they were designed for October 31st but live here year-round',
    icon: '🎃',
    image: '/badges/halloween-crab.png',
    condition: (archive) => archive?.species?.['halloween-crab'],
    tier: 'silver'
  },
  {
    id: 'sally-lightfoot-sighting',
    name: 'The Dancer',
    description: 'Found a Sally Lightfoot Crab — brilliant red and blue, sprinting sideways across wet rocks with impossible agility. Darwin described them on the Galápagos',
    icon: '💃',
    image: '/badges/sally-lightfoot-crab.png',
    condition: (archive) => archive?.species?.['sally-lightfoot-crab'],
    tier: 'silver'
  },

  // SEA STAR & SAND DOLLAR
  {
    id: 'sea-star-sighting',
    name: 'Stargazer',
    description: 'Found a sea star in the wild — no blood, no brain, stomach pushed out through its mouth to eat. They can regenerate entire arms',
    icon: '⭐',
    image: '/badges/sea-star.png',
    condition: (archive) => archive?.species?.['starfish'],
    tier: 'silver'
  },
  {
    id: 'sand-dollar-sighting',
    name: 'The Sand Coin',
    description: 'Found a living sand dollar — they are actually flattened sea urchins covered in tiny purple spines. The white ones on the beach are just skeletons',
    icon: '🪙',
    image: '/badges/badge-beach.png',
    condition: (archive) => archive?.species?.['sand-dollar'],
    tier: 'silver'
  },
];
