// Costa Rica Wildlife Species — Comprehensive List
// 500+ species across mammals, birds, reptiles, amphibians, marine life, and insects
// Categories are designed to be collapsible and filterable in the UI

export const species = [
  // ═══════════════════════════════════════════════════════════════════════════
  // ICONIC COSTA RICA — The must-see bucket list
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'resplendent-quetzal', name: 'Resplendent Quetzal', category: 'Iconic Costa Rica', rarity: 'Rare', description: 'Sacred bird of the Maya with iridescent green plumage and long tail streamers' },
  { id: 'scarlet-macaw', name: 'Scarlet Macaw', category: 'Iconic Costa Rica', rarity: 'Uncommon', description: 'Brilliant red, yellow, and blue parrot of the Pacific lowlands' },
  { id: 'three-toed-sloth', name: 'Three-toed Sloth', category: 'Iconic Costa Rica', rarity: 'Common', description: 'Slow-moving tree dweller with algae-covered fur and a permanent smile' },
  { id: 'two-toed-sloth', name: 'Two-toed Sloth', category: 'Iconic Costa Rica', rarity: 'Uncommon', nocturnal: true, description: 'Nocturnal sloth, larger and faster than its three-toed cousin' },
  { id: 'white-faced-capuchin', name: 'White-faced Capuchin', category: 'Iconic Costa Rica', rarity: 'Common', description: 'Intelligent monkey known for tool use and complex social behavior' },
  { id: 'red-eyed-tree-frog', name: 'Red-eyed Tree Frog', category: 'Iconic Costa Rica', rarity: 'Common', nocturnal: true, description: 'Iconic frog with brilliant red eyes, blue-striped sides, and orange feet' },
  { id: 'keel-billed-toucan', name: 'Keel-billed Toucan', category: 'Iconic Costa Rica', rarity: 'Common', description: 'Rainbow-billed toucan with green, orange, red, and purple bill' },
  { id: 'blue-morpho', name: 'Blue Morpho Butterfly', category: 'Iconic Costa Rica', rarity: 'Common', description: 'Brilliant iridescent blue butterfly that flashes as it flies' },
  { id: 'jaguar', name: 'Jaguar', category: 'Iconic Costa Rica', rarity: 'Legendary', nocturnal: true, description: 'Largest cat in the Americas, apex predator of the rainforest' },
  { id: 'humpback-whale', name: 'Humpback Whale', category: 'Iconic Costa Rica', rarity: 'Uncommon', description: 'Migrating whale visible from shore, longest migration of any mammal' },

  // ═══════════════════════════════════════════════════════════════════════════
  // PRIMATES
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'mantled-howler', name: 'Mantled Howler Monkey', category: 'Primates', rarity: 'Common', description: 'Loudest land animal, dawn calls heard 3 miles away' },
  { id: 'spider-monkey', name: 'Central American Spider Monkey', category: 'Primates', rarity: 'Uncommon', description: 'Acrobatic monkey with prehensile tail, endangered' },
  { id: 'squirrel-monkey', name: 'Central American Squirrel Monkey', category: 'Primates', rarity: 'Rare', description: 'Tiny endangered monkey of the Pacific coast, travels in large troops' },

  // ═══════════════════════════════════════════════════════════════════════════
  // WILD CATS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'puma', name: 'Puma', category: 'Wild Cats', rarity: 'Rare', description: 'Adaptable big cat also known as mountain lion' },
  { id: 'ocelot', name: 'Ocelot', category: 'Wild Cats', rarity: 'Rare', nocturnal: true, description: 'Beautiful spotted wild cat, mostly nocturnal' },
  { id: 'margay', name: 'Margay', category: 'Wild Cats', rarity: 'Rare', nocturnal: true, description: 'Small spotted cat, the only cat that can climb down trees headfirst' },
  { id: 'jaguarundi', name: 'Jaguarundi', category: 'Wild Cats', rarity: 'Rare', description: 'Unusual solid-colored wild cat, looks like a large weasel' },
  { id: 'oncilla', name: 'Oncilla', category: 'Wild Cats', rarity: 'Legendary', nocturnal: true, description: 'Tiny spotted cat of cloud forests, extremely rare' },

  // ═══════════════════════════════════════════════════════════════════════════
  // OTHER CARNIVORES
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'white-nosed-coati', name: 'White-nosed Coati', category: 'Carnivores', rarity: 'Common', description: 'Raccoon relative with long snout, travels in bands of 10-30' },
  { id: 'kinkajou', name: 'Kinkajou', category: 'Carnivores', rarity: 'Uncommon', nocturnal: true, description: 'Nocturnal honey bear with prehensile tail, pollinates balsa trees' },
  { id: 'tayra', name: 'Tayra', category: 'Carnivores', rarity: 'Uncommon', description: 'Large weasel-like carnivore that loves fruit' },
  { id: 'northern-raccoon', name: 'Northern Raccoon', category: 'Carnivores', rarity: 'Common', nocturnal: true, description: 'Masked nocturnal mammal' },
  { id: 'crab-eating-raccoon', name: 'Crab-eating Raccoon', category: 'Carnivores', rarity: 'Uncommon', nocturnal: true, description: 'Coastal raccoon species with shorter fur' },
  { id: 'cacomistle', name: 'Cacomistle', category: 'Carnivores', rarity: 'Rare', nocturnal: true, description: 'Slender ringtail relative with huge eyes, strictly nocturnal' },
  { id: 'striped-hog-nosed-skunk', name: 'Striped Hog-nosed Skunk', category: 'Carnivores', rarity: 'Uncommon', nocturnal: true, description: 'Large skunk with pig-like snout' },
  { id: 'long-tailed-weasel', name: 'Long-tailed Weasel', category: 'Carnivores', rarity: 'Rare', description: 'Slender, fast predator rarely seen' },
  { id: 'neotropical-otter', name: 'Neotropical Otter', category: 'Carnivores', rarity: 'Rare', description: 'River otter found in clean waterways' },
  { id: 'greater-grison', name: 'Greater Grison', category: 'Carnivores', rarity: 'Rare', description: 'Bold grey-and-black mustelid, fearless hunter' },

  // ═══════════════════════════════════════════════════════════════════════════
  // OTHER MAMMALS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'bairds-tapir', name: "Baird's Tapir", category: 'Other Mammals', rarity: 'Rare', description: 'Largest land mammal in Central America, endangered' },
  { id: 'collared-peccary', name: 'Collared Peccary', category: 'Other Mammals', rarity: 'Common', description: 'Pig-like mammal traveling in herds, also called javelina' },
  { id: 'white-lipped-peccary', name: 'White-lipped Peccary', category: 'Other Mammals', rarity: 'Rare', description: 'Large herding peccary in groups of 50-300, increasingly rare' },
  { id: 'nine-banded-armadillo', name: 'Nine-banded Armadillo', category: 'Other Mammals', rarity: 'Common', nocturnal: true, description: 'Armored mammal, always gives birth to identical quadruplets' },
  { id: 'northern-tamandua', name: 'Northern Tamandua', category: 'Other Mammals', rarity: 'Uncommon', description: 'Tree-climbing anteater with vest-like markings' },
  { id: 'giant-anteater', name: 'Giant Anteater', category: 'Other Mammals', rarity: 'Legendary', description: 'Large ground-dwelling anteater, extremely rare in Costa Rica' },
  { id: 'silky-anteater', name: 'Silky Anteater', category: 'Other Mammals', rarity: 'Rare', nocturnal: true, description: 'Tiny nocturnal anteater the size of a hand, hides in silk cotton trees' },
  { id: 'hoffmanns-porcupine', name: "Hoffmann's Porcupine", category: 'Other Mammals', rarity: 'Uncommon', nocturnal: true, description: 'Nocturnal tree porcupine with prehensile tail' },
  { id: 'agouti', name: 'Central American Agouti', category: 'Other Mammals', rarity: 'Common', description: 'Large rodent, the only animal that can crack Brazil nuts' },
  { id: 'paca', name: 'Paca', category: 'Other Mammals', rarity: 'Uncommon', nocturnal: true, description: 'Large spotted nocturnal rodent, third-largest rodent in the Americas' },
  { id: 'variegated-squirrel', name: 'Variegated Squirrel', category: 'Other Mammals', rarity: 'Common', description: 'Colorful Central American squirrel with variable coat' },
  { id: 'red-tailed-squirrel', name: 'Red-tailed Squirrel', category: 'Other Mammals', rarity: 'Common', description: 'Small forest squirrel with rusty tail' },
  { id: 'white-tailed-deer', name: 'White-tailed Deer', category: 'Other Mammals', rarity: 'Common', description: 'Common deer of open areas and forest edges' },
  { id: 'red-brocket-deer', name: 'Red Brocket Deer', category: 'Other Mammals', rarity: 'Uncommon', description: 'Small shy forest deer, rarely seen' },
  { id: 'western-cottontail', name: 'Eastern Cottontail', category: 'Other Mammals', rarity: 'Common', description: 'Common rabbit of highland areas' },

  // ═══════════════════════════════════════════════════════════════════════════
  // BATS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'jamaican-fruit-bat', name: 'Jamaican Fruit Bat', category: 'Bats', rarity: 'Common', nocturnal: true, description: 'Common fruit-eating bat seen at dusk' },
  { id: 'tent-making-bat', name: 'Honduran White Bat', category: 'Bats', rarity: 'Uncommon', description: 'Tiny white bat that creates leaf tents, bright orange ears and nose' },
  { id: 'greater-white-lined-bat', name: 'Greater White-lined Bat', category: 'Bats', rarity: 'Common', nocturnal: true, description: 'Bat with distinctive white stripes on face' },
  { id: 'vampire-bat', name: 'Common Vampire Bat', category: 'Bats', rarity: 'Uncommon', nocturnal: true, description: 'Blood-feeding bat that walks on all fours' },
  { id: 'greater-bulldog-bat', name: 'Greater Bulldog Bat', category: 'Bats', rarity: 'Uncommon', nocturnal: true, description: 'Fish-eating bat that drags claws through water' },
  { id: 'long-tongued-bat', name: 'Pallas\'s Long-tongued Bat', category: 'Bats', rarity: 'Common', nocturnal: true, description: 'Important pollinator with extremely long tongue' },
  { id: 'wrinkle-faced-bat', name: 'Wrinkle-faced Bat', category: 'Bats', rarity: 'Rare', nocturnal: true, description: 'Bizarre-looking fruit bat with deeply wrinkled face' },
  { id: 'spectral-bat', name: 'Spectral Bat', category: 'Bats', rarity: 'Rare', nocturnal: true, description: 'Largest bat in the Americas, 3-foot wingspan, carnivorous' },

  // ═══════════════════════════════════════════════════════════════════════════
  // TOUCANS & ARACARIS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'chestnut-mandibled-toucan', name: 'Yellow-throated Toucan', category: 'Toucans & Aracaris', rarity: 'Common', description: 'Large toucan with yellow chest and chestnut-brown bill' },
  { id: 'collared-aracari', name: 'Collared Aracari', category: 'Toucans & Aracaris', rarity: 'Common', description: 'Small toucan with colorful belly band' },
  { id: 'fiery-billed-aracari', name: 'Fiery-billed Aracari', category: 'Toucans & Aracaris', rarity: 'Uncommon', endemic: true, description: 'Aracari with bright orange bill, Costa Rica/Panama endemic' },
  { id: 'emerald-toucanet', name: 'Emerald Toucanet', category: 'Toucans & Aracaris', rarity: 'Uncommon', description: 'Small green toucan of cloud forests with blue throat' },
  { id: 'yellow-eared-toucanet', name: 'Yellow-eared Toucanet', category: 'Toucans & Aracaris', rarity: 'Rare', description: 'Small dark toucanet with yellow ear tufts' },

  // ═══════════════════════════════════════════════════════════════════════════
  // PARROTS & MACAWS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'great-green-macaw', name: 'Great Green Macaw', category: 'Parrots & Macaws', rarity: 'Rare', description: 'Endangered large green macaw dependent on almendro trees' },
  { id: 'crimson-fronted-parakeet', name: 'Crimson-fronted Parakeet', category: 'Parrots & Macaws', rarity: 'Common', description: 'Noisy green parakeet with red forehead' },
  { id: 'orange-fronted-parakeet', name: 'Orange-fronted Parakeet', category: 'Parrots & Macaws', rarity: 'Common', description: 'Dry forest parakeet with orange forehead' },
  { id: 'orange-chinned-parakeet', name: 'Orange-chinned Parakeet', category: 'Parrots & Macaws', rarity: 'Common', description: 'Small green parakeet, common in gardens' },
  { id: 'sulphur-winged-parakeet', name: 'Sulphur-winged Parakeet', category: 'Parrots & Macaws', rarity: 'Uncommon', description: 'Highland parakeet with yellow wing patches' },
  { id: 'red-fronted-parrotlet', name: 'Red-fronted Parrotlet', category: 'Parrots & Macaws', rarity: 'Uncommon', description: 'Tiny parrot, one of the smallest in the Americas' },
  { id: 'brown-hooded-parrot', name: 'Brown-hooded Parrot', category: 'Parrots & Macaws', rarity: 'Uncommon', description: 'Colorful parrot with brown head and red ear patch' },
  { id: 'white-crowned-parrot', name: 'White-crowned Parrot', category: 'Parrots & Macaws', rarity: 'Common', description: 'Green parrot with distinctive white cap' },
  { id: 'red-lored-parrot', name: 'Red-lored Parrot', category: 'Parrots & Macaws', rarity: 'Uncommon', description: 'Amazon parrot with red forehead, yellow cheeks' },
  { id: 'mealy-parrot', name: 'Mealy Parrot', category: 'Parrots & Macaws', rarity: 'Uncommon', description: 'Largest Amazon parrot in Costa Rica' },

  // ═══════════════════════════════════════════════════════════════════════════
  // HUMMINGBIRDS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'violet-sabrewing', name: 'Violet Sabrewing', category: 'Hummingbirds', rarity: 'Uncommon', description: 'Largest hummingbird in Costa Rica, deep violet plumage' },
  { id: 'green-hermit', name: 'Green Hermit', category: 'Hummingbirds', rarity: 'Uncommon', description: 'Large hermit with curved bill, visits Heliconia flowers' },
  { id: 'long-billed-hermit', name: 'Long-billed Hermit', category: 'Hummingbirds', rarity: 'Common', description: 'Brown hermit that trap-lines through the forest understory' },
  { id: 'stripe-throated-hermit', name: 'Stripe-throated Hermit', category: 'Hummingbirds', rarity: 'Common', description: 'Small hermit with striped throat' },
  { id: 'green-crowned-brilliant', name: 'Green-crowned Brilliant', category: 'Hummingbirds', rarity: 'Uncommon', description: 'Large hummingbird with glittering green crown' },
  { id: 'magnificent-hummingbird', name: 'Rivoli\'s Hummingbird', category: 'Hummingbirds', rarity: 'Uncommon', description: 'Large dark hummingbird of highland gardens' },
  { id: 'purple-throated-mountaingem', name: 'Purple-throated Mountaingem', category: 'Hummingbirds', rarity: 'Uncommon', description: 'Highland gem with brilliant purple throat' },
  { id: 'white-throated-mountaingem', name: 'White-throated Mountaingem', category: 'Hummingbirds', rarity: 'Uncommon', endemic: true, description: 'Endemic highland hummingbird with white throat' },
  { id: 'fiery-throated-hummingbird', name: 'Fiery-throated Hummingbird', category: 'Hummingbirds', rarity: 'Uncommon', description: 'Rainbow-throated gem of the highest cloud forests' },
  { id: 'volcano-hummingbird', name: 'Volcano Hummingbird', category: 'Hummingbirds', rarity: 'Uncommon', endemic: true, description: 'Tiny endemic hummingbird of volcanic highlands' },
  { id: 'rufous-tailed-hummingbird', name: 'Rufous-tailed Hummingbird', category: 'Hummingbirds', rarity: 'Common', description: 'Most common garden hummingbird in Costa Rica' },
  { id: 'coppery-headed-emerald', name: 'Coppery-headed Emerald', category: 'Hummingbirds', rarity: 'Uncommon', endemic: true, description: 'Endemic emerald with coppery crown' },
  { id: 'snowcap', name: 'Snowcap', category: 'Hummingbirds', rarity: 'Rare', description: 'Tiny deep purple hummingbird with brilliant white cap' },
  { id: 'white-necked-jacobin', name: 'White-necked Jacobin', category: 'Hummingbirds', rarity: 'Common', description: 'Striking hummingbird with blue head and white belly' },
  { id: 'bronze-tailed-plumeleteer', name: 'Bronze-tailed Plumeleteer', category: 'Hummingbirds', rarity: 'Uncommon', description: 'Large green hummingbird with white leg tufts' },
  { id: 'scintillant-hummingbird', name: 'Scintillant Hummingbird', category: 'Hummingbirds', rarity: 'Uncommon', endemic: true, description: 'Tiny highland hummingbird with fiery gorget' },
  { id: 'green-thorntail', name: 'Green Thorntail', category: 'Hummingbirds', rarity: 'Rare', description: 'Tiny hummingbird with wire-like tail extensions' },
  { id: 'violet-headed-hummingbird', name: 'Violet-headed Hummingbird', category: 'Hummingbirds', rarity: 'Uncommon', description: 'Small hummer with glittering violet head' },
  { id: 'steely-vented-hummingbird', name: 'Steely-vented Hummingbird', category: 'Hummingbirds', rarity: 'Common', description: 'Common garden hummer of Pacific slope' },
  { id: 'mangrove-hummingbird', name: 'Mangrove Hummingbird', category: 'Hummingbirds', rarity: 'Rare', endemic: true, description: 'Endangered endemic hummingbird of Pacific mangroves' },
  { id: 'garden-emerald', name: 'Garden Emerald', category: 'Hummingbirds', rarity: 'Common', endemic: true, description: 'Small bright green endemic of Pacific lowlands' },
  { id: 'charming-hummingbird', name: 'Charming Hummingbird', category: 'Hummingbirds', rarity: 'Uncommon', description: 'Rose-throated hummingbird of Pacific slope' },
  { id: 'black-crested-coquette', name: 'Black-crested Coquette', category: 'Hummingbirds', rarity: 'Rare', description: 'Tiny ornate hummingbird with spiky black crest' },

  // ═══════════════════════════════════════════════════════════════════════════
  // TROGONS & QUETZALS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'slaty-tailed-trogon', name: 'Slaty-tailed Trogon', category: 'Trogons', rarity: 'Uncommon', description: 'Large trogon with red belly and dark tail' },
  { id: 'black-headed-trogon', name: 'Black-headed Trogon', category: 'Trogons', rarity: 'Common', description: 'Yellow-bellied trogon with black head' },
  { id: 'baird-trogon', name: "Baird's Trogon", category: 'Trogons', rarity: 'Rare', description: 'Large trogon of southern Pacific forests' },
  { id: 'black-throated-trogon', name: 'Black-throated Trogon', category: 'Trogons', rarity: 'Uncommon', description: 'Green trogon with yellow belly and black throat' },
  { id: 'gartered-trogon', name: 'Gartered Trogon', category: 'Trogons', rarity: 'Common', description: 'Formerly violaceous trogon, yellow belly with barred tail' },
  { id: 'orange-bellied-trogon', name: 'Orange-bellied Trogon', category: 'Trogons', rarity: 'Uncommon', description: 'Cloud forest trogon with orange belly' },
  { id: 'collared-trogon', name: 'Collared Trogon', category: 'Trogons', rarity: 'Uncommon', description: 'Highland trogon with white breast band' },
  { id: 'lattice-tailed-trogon', name: 'Lattice-tailed Trogon', category: 'Trogons', rarity: 'Rare', endemic: true, description: 'Rare Costa Rica/Panama endemic with intricate tail pattern' },

  // ═══════════════════════════════════════════════════════════════════════════
  // MOTMOTS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'turquoise-browed-motmot', name: 'Turquoise-browed Motmot', category: 'Motmots', rarity: 'Common', description: 'Stunning motmot with turquoise eyebrow and racket tail' },
  { id: 'lesson-motmot', name: "Lesson's Motmot", category: 'Motmots', rarity: 'Common', description: 'Blue-crowned motmot that swings its racket tail like a pendulum' },
  { id: 'rufous-motmot', name: 'Rufous Motmot', category: 'Motmots', rarity: 'Uncommon', description: 'Large rufous motmot of Caribbean lowlands' },
  { id: 'broad-billed-motmot', name: 'Broad-billed Motmot', category: 'Motmots', rarity: 'Uncommon', description: 'Green motmot with broad flat bill and rufous head' },
  { id: 'keel-billed-motmot', name: 'Keel-billed Motmot', category: 'Motmots', rarity: 'Rare', description: 'Elusive motmot with flat keel-shaped bill' },
  { id: 'tody-motmot', name: 'Tody Motmot', category: 'Motmots', rarity: 'Rare', description: 'Tiny motmot without racket tail, hard to spot' },

  // ═══════════════════════════════════════════════════════════════════════════
  // TANAGERS & HONEYCREEPERS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'blue-gray-tanager', name: 'Blue-gray Tanager', category: 'Tanagers & Honeycreepers', rarity: 'Common', description: 'Ubiquitous pale blue tanager of gardens and edges' },
  { id: 'palm-tanager', name: 'Palm Tanager', category: 'Tanagers & Honeycreepers', rarity: 'Common', description: 'Olive-green tanager common around palm trees' },
  { id: 'summer-tanager', name: 'Summer Tanager', category: 'Tanagers & Honeycreepers', rarity: 'Common', description: 'All-red North American migrant that catches bees in flight' },
  { id: 'scarlet-tanager', name: 'Scarlet Tanager', category: 'Tanagers & Honeycreepers', rarity: 'Uncommon', description: 'Brilliant red migrant with black wings' },
  { id: 'flame-colored-tanager', name: 'Flame-colored Tanager', category: 'Tanagers & Honeycreepers', rarity: 'Uncommon', description: 'Orange-red highland tanager' },
  { id: 'silver-throated-tanager', name: 'Silver-throated Tanager', category: 'Tanagers & Honeycreepers', rarity: 'Common', description: 'Bright yellow tanager with silver throat streak' },
  { id: 'spangle-cheeked-tanager', name: 'Spangle-cheeked Tanager', category: 'Tanagers & Honeycreepers', rarity: 'Uncommon', description: 'Dark tanager with iridescent spangles on cheeks' },
  { id: 'bay-headed-tanager', name: 'Bay-headed Tanager', category: 'Tanagers & Honeycreepers', rarity: 'Common', description: 'Green tanager with chestnut head' },
  { id: 'golden-hooded-tanager', name: 'Golden-hooded Tanager', category: 'Tanagers & Honeycreepers', rarity: 'Common', description: 'Stunning tanager with golden hood and blue wings' },
  { id: 'emerald-tanager', name: 'Emerald Tanager', category: 'Tanagers & Honeycreepers', rarity: 'Uncommon', description: 'Bright green tanager with black streaking' },
  { id: 'speckled-tanager', name: 'Speckled Tanager', category: 'Tanagers & Honeycreepers', rarity: 'Uncommon', description: 'Green tanager covered in dark speckles' },
  { id: 'green-honeycreeper', name: 'Green Honeycreeper', category: 'Tanagers & Honeycreepers', rarity: 'Common', description: 'Brilliant turquoise bird with black head, curved bill' },
  { id: 'red-legged-honeycreeper', name: 'Red-legged Honeycreeper', category: 'Tanagers & Honeycreepers', rarity: 'Common', description: 'Purple-blue male with bright red legs and turquoise crown' },
  { id: 'scarlet-thighed-dacnis', name: 'Scarlet-thighed Dacnis', category: 'Tanagers & Honeycreepers', rarity: 'Uncommon', description: 'Blue dacnis with hidden scarlet thighs' },
  { id: 'blue-dacnis', name: 'Blue Dacnis', category: 'Tanagers & Honeycreepers', rarity: 'Common', description: 'Tiny turquoise and black dacnis' },
  { id: 'passerinis-tanager', name: "Passerini's Tanager", category: 'Tanagers & Honeycreepers', rarity: 'Common', description: 'Velvet black tanager with scarlet rump, Caribbean slope' },
  { id: 'cherries-tanager', name: "Cherrie's Tanager", category: 'Tanagers & Honeycreepers', rarity: 'Common', description: 'Pacific counterpart to Passerini\'s with orange-scarlet rump' },
  { id: 'white-lined-tanager', name: 'White-lined Tanager', category: 'Tanagers & Honeycreepers', rarity: 'Common', description: 'Black tanager with hidden white wing lining' },
  { id: 'crimson-collared-tanager', name: 'Crimson-collared Tanager', category: 'Tanagers & Honeycreepers', rarity: 'Uncommon', description: 'Striking black tanager with crimson collar and rump' },

  // ═══════════════════════════════════════════════════════════════════════════
  // MANAKINS, COTINGAS & BELLBIRDS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'long-tailed-manakin', name: 'Long-tailed Manakin', category: 'Manakins & Cotingas', rarity: 'Uncommon', description: 'Blue and black manakin with cooperative courtship dance' },
  { id: 'red-capped-manakin', name: 'Red-capped Manakin', category: 'Manakins & Cotingas', rarity: 'Uncommon', description: 'Black manakin with red head that does moonwalk display' },
  { id: 'white-collared-manakin', name: 'White-collared Manakin', category: 'Manakins & Cotingas', rarity: 'Uncommon', description: 'Green and white manakin with explosive wing snaps' },
  { id: 'orange-collared-manakin', name: 'Orange-collared Manakin', category: 'Manakins & Cotingas', rarity: 'Uncommon', description: 'Pacific slope manakin with bright orange collar' },
  { id: 'three-wattled-bellbird', name: 'Three-wattled Bellbird', category: 'Manakins & Cotingas', rarity: 'Rare', description: 'Loudest bird in the world with three dangling worm-like wattles' },
  { id: 'bare-necked-umbrellabird', name: 'Bare-necked Umbrellabird', category: 'Manakins & Cotingas', rarity: 'Rare', description: 'Rare bird with umbrella-like crest and inflatable red throat' },
  { id: 'lovely-cotinga', name: 'Lovely Cotinga', category: 'Manakins & Cotingas', rarity: 'Uncommon', description: 'Electric blue cotinga with purple patches' },
  { id: 'turquoise-cotinga', name: 'Turquoise Cotinga', category: 'Manakins & Cotingas', rarity: 'Uncommon', description: 'Stunning turquoise-blue cotinga of Caribbean slope' },
  { id: 'snowy-cotinga', name: 'Snowy Cotinga', category: 'Manakins & Cotingas', rarity: 'Uncommon', description: 'Pure white cotinga with blue-gray wings' },
  { id: 'yellow-billed-cotinga', name: 'Yellow-billed Cotinga', category: 'Manakins & Cotingas', rarity: 'Rare', description: 'White cotinga with yellow bill, very range-restricted' },

  // ═══════════════════════════════════════════════════════════════════════════
  // RAPTORS & VULTURES
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'harpy-eagle', name: 'Harpy Eagle', category: 'Raptors & Vultures', rarity: 'Legendary', description: 'Largest and most powerful eagle in the Americas' },
  { id: 'crested-eagle', name: 'Crested Eagle', category: 'Raptors & Vultures', rarity: 'Legendary', description: 'Massive forest eagle, even rarer than the Harpy' },
  { id: 'ornate-hawk-eagle', name: 'Ornate Hawk-Eagle', category: 'Raptors & Vultures', rarity: 'Rare', description: 'Stunning crested eagle with bold black and white pattern' },
  { id: 'black-hawk-eagle', name: 'Black Hawk-Eagle', category: 'Raptors & Vultures', rarity: 'Rare', description: 'Dark eagle with checkered underwings and small crest' },
  { id: 'black-and-white-hawk-eagle', name: 'Black-and-white Hawk-Eagle', category: 'Raptors & Vultures', rarity: 'Rare', description: 'Striking black and white eagle of forest canopy' },
  { id: 'king-vulture', name: 'King Vulture', category: 'Raptors & Vultures', rarity: 'Uncommon', description: 'Massive colorful vulture with orange and purple head' },
  { id: 'black-vulture', name: 'Black Vulture', category: 'Raptors & Vultures', rarity: 'Common', description: 'Common scavenger seen soaring everywhere' },
  { id: 'turkey-vulture', name: 'Turkey Vulture', category: 'Raptors & Vultures', rarity: 'Common', description: 'Red-headed vulture with keen sense of smell' },
  { id: 'lesser-yellow-headed-vulture', name: 'Lesser Yellow-headed Vulture', category: 'Raptors & Vultures', rarity: 'Uncommon', description: 'Lowland vulture of open wetlands' },
  { id: 'swallow-tailed-kite', name: 'Swallow-tailed Kite', category: 'Raptors & Vultures', rarity: 'Common', description: 'Elegant black and white raptor with deeply forked tail' },
  { id: 'double-toothed-kite', name: 'Double-toothed Kite', category: 'Raptors & Vultures', rarity: 'Uncommon', description: 'Small raptor that follows monkey troops to catch flushed insects' },
  { id: 'plumbeous-kite', name: 'Plumbeous Kite', category: 'Raptors & Vultures', rarity: 'Uncommon', description: 'Gray kite that catches dragonflies on the wing' },
  { id: 'white-hawk', name: 'White Hawk', category: 'Raptors & Vultures', rarity: 'Uncommon', description: 'Stunning all-white raptor with black wing markings' },
  { id: 'roadside-hawk', name: 'Roadside Hawk', category: 'Raptors & Vultures', rarity: 'Common', description: 'Common small hawk seen perched along roads' },
  { id: 'broad-winged-hawk', name: 'Broad-winged Hawk', category: 'Raptors & Vultures', rarity: 'Common', description: 'Migrant hawk that kettles in thousands over Costa Rica' },
  { id: 'gray-hawk', name: 'Gray Hawk', category: 'Raptors & Vultures', rarity: 'Common', description: 'Gray hawk of forest edges and rivers' },
  { id: 'laughing-falcon', name: 'Laughing Falcon', category: 'Raptors & Vultures', rarity: 'Uncommon', description: 'Snake-eating falcon with laughing call and bandit mask' },
  { id: 'bat-falcon', name: 'Bat Falcon', category: 'Raptors & Vultures', rarity: 'Uncommon', description: 'Small fast falcon that catches bats at dusk' },
  { id: 'yellow-headed-caracara', name: 'Yellow-headed Caracara', category: 'Raptors & Vultures', rarity: 'Common', description: 'Common opportunistic raptor with buff head' },
  { id: 'crested-caracara', name: 'Crested Caracara', category: 'Raptors & Vultures', rarity: 'Common', description: 'Bold ground-walking raptor of open areas' },
  { id: 'osprey', name: 'Osprey', category: 'Raptors & Vultures', rarity: 'Common', description: 'Fish-eating raptor that plunge-dives from height' },

  // ═══════════════════════════════════════════════════════════════════════════
  // OWLS & NIGHTJARS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'spectacled-owl', name: 'Spectacled Owl', category: 'Owls & Nightjars', rarity: 'Uncommon', nocturnal: true, description: 'Large owl with white spectacle markings around eyes' },
  { id: 'mottled-owl', name: 'Mottled Owl', category: 'Owls & Nightjars', rarity: 'Uncommon', nocturnal: true, description: 'Common forest owl heard more than seen' },
  { id: 'black-and-white-owl', name: 'Black-and-white Owl', category: 'Owls & Nightjars', rarity: 'Rare', nocturnal: true, description: 'Striking barred owl of lowland forests' },
  { id: 'crested-owl', name: 'Crested Owl', category: 'Owls & Nightjars', rarity: 'Rare', nocturnal: true, description: 'Unusual owl with long white ear tufts' },
  { id: 'ferruginous-pygmy-owl', name: 'Ferruginous Pygmy-Owl', category: 'Owls & Nightjars', rarity: 'Uncommon', description: 'Tiny owl active during the day, false eye spots on back of head' },
  { id: 'central-american-pygmy-owl', name: 'Central American Pygmy-Owl', category: 'Owls & Nightjars', rarity: 'Uncommon', description: 'Small highland owl with rapid tooting call' },
  { id: 'striped-owl', name: 'Striped Owl', category: 'Owls & Nightjars', rarity: 'Uncommon', nocturnal: true, description: 'Open-country owl with prominent ear tufts and streaked breast' },
  { id: 'tropical-screech-owl', name: 'Tropical Screech-Owl', category: 'Owls & Nightjars', rarity: 'Common', nocturnal: true, description: 'Common small owl with bouncing-ball trill call' },
  { id: 'bare-shanked-screech-owl', name: 'Bare-shanked Screech-Owl', category: 'Owls & Nightjars', rarity: 'Rare', nocturnal: true, endemic: true, description: 'Highland endemic owl with bare orange legs' },
  { id: 'common-pauraque', name: 'Common Pauraque', category: 'Owls & Nightjars', rarity: 'Common', nocturnal: true, description: 'Nightjar often seen on roads at night, eyes glow red' },
  { id: 'great-potoo', name: 'Great Potoo', category: 'Owls & Nightjars', rarity: 'Rare', nocturnal: true, description: 'Master of camouflage, looks exactly like a broken branch' },
  { id: 'common-potoo', name: 'Common Potoo', category: 'Owls & Nightjars', rarity: 'Uncommon', nocturnal: true, description: 'Nocturnal bird with haunting descending whistle' },

  // ═══════════════════════════════════════════════════════════════════════════
  // KINGFISHERS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'ringed-kingfisher', name: 'Ringed Kingfisher', category: 'Kingfishers', rarity: 'Common', description: 'Largest kingfisher, big crested head and rattling call' },
  { id: 'amazon-kingfisher', name: 'Amazon Kingfisher', category: 'Kingfishers', rarity: 'Common', description: 'Medium green and white kingfisher of rivers' },
  { id: 'green-kingfisher', name: 'Green Kingfisher', category: 'Kingfishers', rarity: 'Common', description: 'Small riverine kingfisher with copper breast band' },
  { id: 'american-pygmy-kingfisher', name: 'American Pygmy Kingfisher', category: 'Kingfishers', rarity: 'Uncommon', description: 'Tiny forest stream kingfisher, size of a sparrow' },
  { id: 'belted-kingfisher', name: 'Belted Kingfisher', category: 'Kingfishers', rarity: 'Common', description: 'North American migrant with shaggy crest and rattling call' },

  // ═══════════════════════════════════════════════════════════════════════════
  // WOODPECKERS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'lineated-woodpecker', name: 'Lineated Woodpecker', category: 'Woodpeckers', rarity: 'Common', description: 'Large black and white woodpecker with red crest' },
  { id: 'pale-billed-woodpecker', name: 'Pale-billed Woodpecker', category: 'Woodpeckers', rarity: 'Uncommon', description: 'Largest woodpecker in Costa Rica, similar to ivory-billed' },
  { id: 'chestnut-colored-woodpecker', name: 'Chestnut-colored Woodpecker', category: 'Woodpeckers', rarity: 'Uncommon', description: 'Rich chestnut woodpecker of Caribbean lowlands' },
  { id: 'black-cheeked-woodpecker', name: 'Black-cheeked Woodpecker', category: 'Woodpeckers', rarity: 'Common', description: 'Colorful woodpecker with red crown and barred belly' },
  { id: 'hoffmanns-woodpecker', name: "Hoffmann's Woodpecker", category: 'Woodpeckers', rarity: 'Common', description: 'Common Pacific slope woodpecker with golden nape' },
  { id: 'red-crowned-woodpecker', name: 'Red-crowned Woodpecker', category: 'Woodpeckers', rarity: 'Common', description: 'Small woodpecker common in gardens and parks' },
  { id: 'rufous-winged-woodpecker', name: 'Rufous-winged Woodpecker', category: 'Woodpeckers', rarity: 'Uncommon', description: 'Small olive woodpecker with rufous wing patches' },
  { id: 'acorn-woodpecker', name: 'Acorn Woodpecker', category: 'Woodpeckers', rarity: 'Common', description: 'Clown-faced social woodpecker that stores acorns in tree bark' },
  { id: 'golden-olive-woodpecker', name: 'Golden-olive Woodpecker', category: 'Woodpeckers', rarity: 'Uncommon', description: 'Olive-green woodpecker with golden tinge' },
  { id: 'cinnamon-woodpecker', name: 'Cinnamon Woodpecker', category: 'Woodpeckers', rarity: 'Uncommon', description: 'Warm cinnamon-colored woodpecker of lowland forests' },

  // ═══════════════════════════════════════════════════════════════════════════
  // HERONS, EGRETS & SHOREBIRDS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'boat-billed-heron', name: 'Boat-billed Heron', category: 'Herons & Shorebirds', rarity: 'Uncommon', nocturnal: true, description: 'Nocturnal heron with enormous wide bill and huge eyes' },
  { id: 'roseate-spoonbill', name: 'Roseate Spoonbill', category: 'Herons & Shorebirds', rarity: 'Uncommon', description: 'Pink wading bird with spoon-shaped bill' },
  { id: 'jabiru', name: 'Jabiru', category: 'Herons & Shorebirds', rarity: 'Rare', description: 'Tallest flying bird in the Americas, massive stork' },
  { id: 'wood-stork', name: 'Wood Stork', category: 'Herons & Shorebirds', rarity: 'Uncommon', description: 'Large wading stork that feeds by touch' },
  { id: 'great-blue-heron', name: 'Great Blue Heron', category: 'Herons & Shorebirds', rarity: 'Common', description: 'Largest heron, tall and elegant' },
  { id: 'little-blue-heron', name: 'Little Blue Heron', category: 'Herons & Shorebirds', rarity: 'Common', description: 'Slate-blue heron, juveniles are white' },
  { id: 'tricolored-heron', name: 'Tricolored Heron', category: 'Herons & Shorebirds', rarity: 'Uncommon', description: 'Slender heron with blue, purple and white plumage' },
  { id: 'green-heron', name: 'Green Heron', category: 'Herons & Shorebirds', rarity: 'Common', description: 'Small heron that uses bait to fish — drops objects to lure prey' },
  { id: 'yellow-crowned-night-heron', name: 'Yellow-crowned Night-Heron', category: 'Herons & Shorebirds', rarity: 'Uncommon', nocturnal: true, description: 'Stocky night heron with yellow crown stripe' },
  { id: 'great-egret', name: 'Great Egret', category: 'Herons & Shorebirds', rarity: 'Common', description: 'Tall white egret with yellow bill' },
  { id: 'snowy-egret', name: 'Snowy Egret', category: 'Herons & Shorebirds', rarity: 'Common', description: 'Elegant white egret with black bill and yellow feet' },
  { id: 'cattle-egret', name: 'Cattle Egret', category: 'Herons & Shorebirds', rarity: 'Common', description: 'Small white egret that follows livestock' },
  { id: 'bare-throated-tiger-heron', name: 'Bare-throated Tiger-Heron', category: 'Herons & Shorebirds', rarity: 'Uncommon', description: 'Large barred heron of rivers and mangroves' },
  { id: 'whimbrel', name: 'Whimbrel', category: 'Herons & Shorebirds', rarity: 'Common', description: 'Large shorebird with long curved bill' },
  { id: 'willet', name: 'Willet', category: 'Herons & Shorebirds', rarity: 'Common', description: 'Large gray shorebird with striking black and white wing pattern' },
  { id: 'spotted-sandpiper', name: 'Spotted Sandpiper', category: 'Herons & Shorebirds', rarity: 'Common', description: 'Bobbing shorebird found along any waterway' },
  { id: 'black-necked-stilt', name: 'Black-necked Stilt', category: 'Herons & Shorebirds', rarity: 'Common', description: 'Elegant black and white wader with extremely long pink legs' },
  { id: 'northern-jacana', name: 'Northern Jacana', category: 'Herons & Shorebirds', rarity: 'Common', description: 'Lily-trotter with enormous feet that walks on floating vegetation' },
  { id: 'sungrebe', name: 'Sungrebe', category: 'Herons & Shorebirds', rarity: 'Rare', description: 'Secretive striped bird that swims low in forest rivers' },

  // ═══════════════════════════════════════════════════════════════════════════
  // SEABIRDS & PELICANS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'magnificent-frigatebird', name: 'Magnificent Frigatebird', category: 'Seabirds', rarity: 'Common', description: 'Soaring seabird with forked tail, males inflate red throat pouch' },
  { id: 'brown-pelican', name: 'Brown Pelican', category: 'Seabirds', rarity: 'Common', description: 'Coastal pelican that plunge-dives for fish' },
  { id: 'anhinga', name: 'Anhinga', category: 'Seabirds', rarity: 'Common', description: 'Snakebird that swims with only neck above water' },
  { id: 'neotropic-cormorant', name: 'Neotropic Cormorant', category: 'Seabirds', rarity: 'Common', description: 'Common fishing bird that dries wings on branches' },
  { id: 'brown-booby', name: 'Brown Booby', category: 'Seabirds', rarity: 'Uncommon', description: 'Tropical seabird that dives from height for fish' },
  { id: 'royal-tern', name: 'Royal Tern', category: 'Seabirds', rarity: 'Common', description: 'Large tern with shaggy black crest and orange bill' },
  { id: 'sandwich-tern', name: 'Sandwich Tern', category: 'Seabirds', rarity: 'Common', description: 'Sleek tern with black bill tipped in yellow' },
  { id: 'laughing-gull', name: 'Laughing Gull', category: 'Seabirds', rarity: 'Common', description: 'Coastal gull with black hood and laughing call' },

  // ═══════════════════════════════════════════════════════════════════════════
  // FLYCATCHERS & WRENS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'great-kiskadee', name: 'Great Kiskadee', category: 'Flycatchers & Wrens', rarity: 'Common', description: 'Bold yellow flycatcher with black mask, calls its name' },
  { id: 'social-flycatcher', name: 'Social Flycatcher', category: 'Flycatchers & Wrens', rarity: 'Common', description: 'Similar to kiskadee but smaller and less aggressive' },
  { id: 'boat-billed-flycatcher', name: 'Boat-billed Flycatcher', category: 'Flycatchers & Wrens', rarity: 'Common', description: 'Heavy-billed flycatcher with olive back' },
  { id: 'tropical-kingbird', name: 'Tropical Kingbird', category: 'Flycatchers & Wrens', rarity: 'Common', description: 'Common kingbird that hawks insects from exposed perches' },
  { id: 'scissor-tailed-flycatcher', name: 'Scissor-tailed Flycatcher', category: 'Flycatchers & Wrens', rarity: 'Uncommon', description: 'Elegant flycatcher with extremely long forked tail' },
  { id: 'fork-tailed-flycatcher', name: 'Fork-tailed Flycatcher', category: 'Flycatchers & Wrens', rarity: 'Uncommon', description: 'Black and white flycatcher with streaming tail feathers' },
  { id: 'bright-rumped-attila', name: 'Bright-rumped Attila', category: 'Flycatchers & Wrens', rarity: 'Common', description: 'Loud forest flycatcher heard far more than seen' },
  { id: 'rufous-tailed-jacamar', name: 'Rufous-tailed Jacamar', category: 'Flycatchers & Wrens', rarity: 'Uncommon', description: 'Iridescent green bird that catches butterflies like a flycatcher' },
  { id: 'white-ringed-flycatcher', name: 'White-ringed Flycatcher', category: 'Flycatchers & Wrens', rarity: 'Uncommon', description: 'Dark flycatcher with distinctive white eye ring' },
  { id: 'rufous-naped-wren', name: 'Rufous-naped Wren', category: 'Flycatchers & Wrens', rarity: 'Common', description: 'Large loud wren of Pacific dry forests' },
  { id: 'house-wren', name: 'House Wren', category: 'Flycatchers & Wrens', rarity: 'Common', description: 'Tiny energetic wren with huge voice' },
  { id: 'bay-wren', name: 'Bay Wren', category: 'Flycatchers & Wrens', rarity: 'Common', description: 'Rich rufous wren of Caribbean lowlands' },
  { id: 'riverside-wren', name: 'Riverside Wren', category: 'Flycatchers & Wrens', rarity: 'Uncommon', description: 'Stream-side wren with bold duetting song' },
  { id: 'white-breasted-wood-wren', name: 'White-breasted Wood-Wren', category: 'Flycatchers & Wrens', rarity: 'Common', description: 'Forest floor wren with beautiful whistled song' },

  // ═══════════════════════════════════════════════════════════════════════════
  // WARBLERS, VIREOS & MIGRANTS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'prothonotary-warbler', name: 'Prothonotary Warbler', category: 'Warblers & Vireos', rarity: 'Uncommon', description: 'Brilliant golden warbler of mangroves and wet forest' },
  { id: 'tennessee-warbler', name: 'Tennessee Warbler', category: 'Warblers & Vireos', rarity: 'Common', description: 'Abundant winter visitor, loves flowering trees' },
  { id: 'yellow-warbler', name: 'Yellow Warbler', category: 'Warblers & Vireos', rarity: 'Common', description: 'Bright yellow warbler of mangroves and gardens' },
  { id: 'chestnut-sided-warbler', name: 'Chestnut-sided Warbler', category: 'Warblers & Vireos', rarity: 'Common', description: 'Common winter visitor with olive-green cap' },
  { id: 'black-and-white-warbler', name: 'Black-and-white Warbler', category: 'Warblers & Vireos', rarity: 'Common', description: 'Striped warbler that creeps along branches like a nuthatch' },
  { id: 'wilson-warbler', name: "Wilson's Warbler", category: 'Warblers & Vireos', rarity: 'Common', description: 'Small yellow warbler with black cap' },
  { id: 'golden-winged-warbler', name: 'Golden-winged Warbler', category: 'Warblers & Vireos', rarity: 'Rare', description: 'Declining migrant with golden wing patches and black throat' },
  { id: 'baltimore-oriole', name: 'Baltimore Oriole', category: 'Warblers & Vireos', rarity: 'Common', description: 'Bright orange and black winter visitor' },
  { id: 'yellow-throated-vireo', name: 'Yellow-throated Vireo', category: 'Warblers & Vireos', rarity: 'Uncommon', description: 'Bright yellow-spectacled vireo of forest canopy' },
  { id: 'philadelphia-vireo', name: 'Philadelphia Vireo', category: 'Warblers & Vireos', rarity: 'Uncommon', description: 'Yellow-washed vireo, common winter visitor' },
  { id: 'rufous-capped-warbler', name: 'Rufous-capped Warbler', category: 'Warblers & Vireos', rarity: 'Common', description: 'Resident warbler with rufous cap and white eyebrow' },
  { id: 'buff-rumped-warbler', name: 'Buff-rumped Warbler', category: 'Warblers & Vireos', rarity: 'Common', description: 'Stream-side warbler that fans its buff tail' },
  { id: 'slate-throated-redstart', name: 'Slate-throated Redstart', category: 'Warblers & Vireos', rarity: 'Common', description: 'Highland warbler with red breast and fanned tail' },
  { id: 'collared-redstart', name: 'Collared Redstart', category: 'Warblers & Vireos', rarity: 'Common', endemic: true, description: 'Friendly yellow-faced warbler endemic to highlands, approaches hikers' },

  // ═══════════════════════════════════════════════════════════════════════════
  // OTHER NOTABLE BIRDS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'clay-colored-thrush', name: 'Clay-colored Thrush', category: 'Other Notable Birds', rarity: 'Common', description: 'National bird of Costa Rica, beautiful melodic song' },
  { id: 'montezuma-oropendola', name: 'Montezuma Oropendola', category: 'Other Notable Birds', rarity: 'Common', description: 'Large bird with pendulous woven nests and gurgling call' },
  { id: 'chestnut-headed-oropendola', name: 'Chestnut-headed Oropendola', category: 'Other Notable Birds', rarity: 'Common', description: 'Colonial nesting bird with yellow tail' },
  { id: 'scarlet-rumped-cacique', name: 'Scarlet-rumped Cacique', category: 'Other Notable Birds', rarity: 'Common', description: 'Black bird with scarlet rump, nests in colonies' },
  { id: 'yellow-throated-euphonia', name: 'Yellow-throated Euphonia', category: 'Other Notable Birds', rarity: 'Common', description: 'Tiny dark blue and yellow fruit eater' },
  { id: 'blue-crowned-chlorophonia', name: 'Blue-crowned Chlorophonia', category: 'Other Notable Birds', rarity: 'Uncommon', description: 'Jewel-like green bird with blue crown' },
  { id: 'great-curassow', name: 'Great Curassow', category: 'Other Notable Birds', rarity: 'Uncommon', description: 'Large turkey-like ground bird with curly crest' },
  { id: 'crested-guan', name: 'Crested Guan', category: 'Other Notable Birds', rarity: 'Uncommon', description: 'Large arboreal bird with red dewlap' },
  { id: 'black-guan', name: 'Black Guan', category: 'Other Notable Birds', rarity: 'Uncommon', description: 'Highland forest bird with blue facial skin' },
  { id: 'gray-headed-chachalaca', name: 'Gray-headed Chachalaca', category: 'Other Notable Birds', rarity: 'Common', description: 'Loud, gregarious bird of forest edges' },
  { id: 'sunbittern', name: 'Sunbittern', category: 'Other Notable Birds', rarity: 'Uncommon', description: 'Unique bird that flashes sun-like eye patterns on spread wings' },
  { id: 'white-throated-magpie-jay', name: 'White-throated Magpie-Jay', category: 'Other Notable Birds', rarity: 'Common', description: 'Gorgeous blue jay with long tail and curly crest' },
  { id: 'brown-jay', name: 'Brown Jay', category: 'Other Notable Birds', rarity: 'Common', description: 'Large noisy jay that travels in family groups' },
  { id: 'resplendent-quetzal-f', name: 'Fiery-billed Aracari', category: 'Other Notable Birds', rarity: 'Uncommon', description: 'Aracari with bright orange and red bill' },
  { id: 'blue-crowned-motmot', name: 'Blue-diademed Motmot', category: 'Other Notable Birds', rarity: 'Common', description: 'Turquoise and green motmot with racket tail' },
  { id: 'olivaceous-piculet', name: 'Olivaceous Piculet', category: 'Other Notable Birds', rarity: 'Uncommon', description: 'Tiny woodpecker the size of a kinglet' },
  { id: 'red-headed-barbet', name: 'Red-headed Barbet', category: 'Other Notable Birds', rarity: 'Uncommon', description: 'Chunky bird with bright red head and green body' },
  { id: 'prong-billed-barbet', name: 'Prong-billed Barbet', category: 'Other Notable Birds', rarity: 'Uncommon', description: 'Unusual barbet with tooth-like bill projections' },
  { id: 'long-tailed-silky-flycatcher', name: 'Long-tailed Silky-Flycatcher', category: 'Other Notable Birds', rarity: 'Uncommon', description: 'Elegant gray bird with long tail and yellow crest' },
  { id: 'turquoise-browed-motmot-2', name: 'Streak-chested Antpitta', category: 'Other Notable Birds', rarity: 'Rare', description: 'Secretive ground bird that bounces like a ball' },
  { id: 'torrent-tyrannulet', name: 'Torrent Tyrannulet', category: 'Other Notable Birds', rarity: 'Uncommon', description: 'Tiny black and white bird that bobs on river rocks' },
  { id: 'black-faced-solitaire', name: 'Black-faced Solitaire', category: 'Other Notable Birds', rarity: 'Uncommon', description: 'Gray thrush of cloud forests with ethereal organ-pipe song' },
  { id: 'sooty-robin', name: 'Sooty Thrush', category: 'Other Notable Birds', rarity: 'Common', description: 'Dark highland thrush with orange bill and legs' },
  { id: 'white-eared-ground-sparrow', name: 'White-eared Ground-Sparrow', category: 'Other Notable Birds', rarity: 'Uncommon', description: 'Beautiful ground sparrow with yellow shoulder and white ear' },
  { id: 'volcano-junco', name: 'Volcano Junco', category: 'Other Notable Birds', rarity: 'Uncommon', endemic: true, description: 'Yellow-eyed sparrow found only on highest peaks' },

  // ═══════════════════════════════════════════════════════════════════════════
  // REPTILES — LIZARDS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'green-iguana', name: 'Green Iguana', category: 'Lizards', rarity: 'Common', description: 'Large green lizard that basks in riverside trees' },
  { id: 'black-iguana', name: 'Black Spiny-tailed Iguana', category: 'Lizards', rarity: 'Common', description: 'Fastest lizard on earth, can run 21 mph' },
  { id: 'common-basilisk', name: 'Green Basilisk', category: 'Lizards', rarity: 'Common', description: 'Jesus Christ lizard — runs across water on hind legs' },
  { id: 'striped-basilisk', name: 'Striped Basilisk', category: 'Lizards', rarity: 'Common', description: 'Brown basilisk also capable of running on water' },
  { id: 'helmeted-basilisk', name: 'Helmeted Basilisk', category: 'Lizards', rarity: 'Uncommon', description: 'Forest basilisk with prominent casque' },
  { id: 'green-anole', name: 'Green Anole', category: 'Lizards', rarity: 'Common', description: 'Color-changing anole with pink dewlap display' },
  { id: 'ground-anole', name: 'Slender Anole', category: 'Lizards', rarity: 'Common', description: 'Common forest floor anole' },
  { id: 'gecko-house', name: 'Common House Gecko', category: 'Lizards', rarity: 'Common', nocturnal: true, description: 'Nocturnal gecko found on walls and ceilings' },
  { id: 'leaf-litter-gecko', name: 'Clawed Gecko', category: 'Lizards', rarity: 'Uncommon', nocturnal: true, description: 'Tiny gecko of the forest floor' },

  // ═══════════════════════════════════════════════════════════════════════════
  // REPTILES — SNAKES
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'boa-constrictor', name: 'Boa Constrictor', category: 'Snakes', rarity: 'Uncommon', description: 'Large constricting snake, beautifully patterned' },
  { id: 'fer-de-lance', name: 'Fer-de-Lance', category: 'Snakes', rarity: 'Uncommon', description: 'Most dangerous snake in Costa Rica, well camouflaged' },
  { id: 'eyelash-viper', name: 'Eyelash Viper', category: 'Snakes', rarity: 'Uncommon', description: 'Beautiful small viper with horn-like scales above eyes, comes in yellow, green, and red' },
  { id: 'coral-snake', name: 'Central American Coral Snake', category: 'Snakes', rarity: 'Rare', description: 'Brightly banded venomous snake, red-yellow-black pattern' },
  { id: 'bushmaster', name: 'Bushmaster', category: 'Snakes', rarity: 'Legendary', nocturnal: true, description: 'Largest viper in the Americas, extremely rare to see' },
  { id: 'parrot-snake', name: 'Green Parrot Snake', category: 'Snakes', rarity: 'Uncommon', description: 'Bright green arboreal snake, mildly venomous, big-eyed' },
  { id: 'bird-eating-snake', name: 'Brown Vine Snake', category: 'Snakes', rarity: 'Uncommon', description: 'Incredibly thin tree snake that looks like a vine' },
  { id: 'tiger-rat-snake', name: 'Tiger Rat Snake', category: 'Snakes', rarity: 'Uncommon', description: 'Large yellow and black snake, excellent tree climber' },
  { id: 'mussurana', name: 'Mussurana', category: 'Snakes', rarity: 'Rare', description: 'Snake that eats other snakes, including venomous species' },
  { id: 'green-palm-viper', name: 'Side-striped Palm Viper', category: 'Snakes', rarity: 'Uncommon', nocturnal: true, description: 'Bright green arboreal viper of Caribbean forests' },

  // ═══════════════════════════════════════════════════════════════════════════
  // REPTILES — CROCODILIANS & TURTLES
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'american-crocodile', name: 'American Crocodile', category: 'Crocodilians & Turtles', rarity: 'Common', description: 'Large crocodile found in rivers and coastal areas, Tarcoles Bridge famous for them' },
  { id: 'spectacled-caiman', name: 'Spectacled Caiman', category: 'Crocodilians & Turtles', rarity: 'Common', nocturnal: true, description: 'Smaller crocodilian with bony ridge between eyes' },
  { id: 'olive-ridley-turtle', name: 'Olive Ridley Sea Turtle', category: 'Crocodilians & Turtles', rarity: 'Uncommon', description: 'Sea turtle famous for mass nesting events (arribadas)' },
  { id: 'green-sea-turtle', name: 'Green Sea Turtle', category: 'Crocodilians & Turtles', rarity: 'Uncommon', description: 'Large herbivorous sea turtle of Tortuguero' },
  { id: 'leatherback-turtle', name: 'Leatherback Sea Turtle', category: 'Crocodilians & Turtles', rarity: 'Rare', description: 'Largest sea turtle, can weigh 2000 lbs' },
  { id: 'hawksbill-turtle', name: 'Hawksbill Sea Turtle', category: 'Crocodilians & Turtles', rarity: 'Rare', description: 'Critically endangered turtle with beautiful shell' },
  { id: 'snapping-turtle', name: 'Central American Snapping Turtle', category: 'Crocodilians & Turtles', rarity: 'Uncommon', description: 'Large freshwater turtle with powerful jaws' },

  // ═══════════════════════════════════════════════════════════════════════════
  // FROGS & AMPHIBIANS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'glass-frog', name: 'Reticulated Glass Frog', category: 'Frogs & Amphibians', rarity: 'Uncommon', nocturnal: true, description: 'Transparent frog — you can see its beating heart through its belly' },
  { id: 'glass-frog-fleischmanns', name: "Fleischmann's Glass Frog", category: 'Frogs & Amphibians', rarity: 'Uncommon', nocturnal: true, description: 'Lime green glass frog with golden eyes' },
  { id: 'poison-dart-frog-green-black', name: 'Green-and-black Poison Frog', category: 'Frogs & Amphibians', rarity: 'Common', description: 'Metallic green and black toxic frog, active by day' },
  { id: 'poison-dart-frog-strawberry', name: 'Strawberry Poison Frog', category: 'Frogs & Amphibians', rarity: 'Common', description: 'Red and blue "blue jeans" frog, carries tadpoles on its back' },
  { id: 'poison-dart-frog-granular', name: 'Granular Poison Frog', category: 'Frogs & Amphibians', rarity: 'Uncommon', description: 'Small red poison frog of Pacific lowlands' },
  { id: 'golden-poison-frog', name: 'Golfo Dulce Poison Frog', category: 'Frogs & Amphibians', rarity: 'Rare', endemic: true, description: 'Range-restricted endemic poison frog' },
  { id: 'marine-toad', name: 'Cane Toad', category: 'Frogs & Amphibians', rarity: 'Common', nocturnal: true, description: 'Huge nocturnal toad with toxic glands' },
  { id: 'smoky-jungle-frog', name: 'Smoky Jungle Frog', category: 'Frogs & Amphibians', rarity: 'Uncommon', nocturnal: true, description: 'Large terrestrial frog that produces toxic foam nest' },
  { id: 'masked-tree-frog', name: 'Masked Tree Frog', category: 'Frogs & Amphibians', rarity: 'Common', nocturnal: true, description: 'Common nocturnal tree frog with dark mask' },
  { id: 'hourglass-tree-frog', name: 'Hourglass Tree Frog', category: 'Frogs & Amphibians', rarity: 'Common', nocturnal: true, description: 'Tan tree frog with hourglass pattern on back' },
  { id: 'gladiator-tree-frog', name: 'Gladiator Tree Frog', category: 'Frogs & Amphibians', rarity: 'Uncommon', nocturnal: true, description: 'Large tree frog, males fight with spines on their hands' },
  { id: 'lemur-leaf-frog', name: 'Lemur Leaf Frog', category: 'Frogs & Amphibians', rarity: 'Rare', nocturnal: true, description: 'Critically endangered bright green frog with huge eyes' },
  { id: 'dink-frog', name: 'Common Dink Frog', category: 'Frogs & Amphibians', rarity: 'Common', nocturnal: true, description: 'Tiny frog with distinctive "dink" call heard everywhere at night' },
  { id: 'brilliant-forest-frog', name: 'Brilliant Forest Frog', category: 'Frogs & Amphibians', rarity: 'Uncommon', description: 'Small brown frog of leaf litter with bright blue-green flash colors' },
  { id: 'tungara-frog', name: 'Tungara Frog', category: 'Frogs & Amphibians', rarity: 'Common', nocturnal: true, description: 'Small frog with strange "whine-chuck" call, makes foam nests' },
  { id: 'caecilian', name: 'Caecilian', category: 'Frogs & Amphibians', rarity: 'Rare', description: 'Legless amphibian that looks like a worm, lives underground' },
  { id: 'salamander-bolitoglossa', name: 'Ring-tailed Salamander', category: 'Frogs & Amphibians', rarity: 'Uncommon', nocturnal: true, description: 'Lungless salamander found on plants at night in cloud forests' },

  // ═══════════════════════════════════════════════════════════════════════════
  // MARINE LIFE
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'bottlenose-dolphin', name: 'Bottlenose Dolphin', category: 'Marine Life', rarity: 'Common', description: 'Familiar coastal dolphin, playful and intelligent' },
  { id: 'spinner-dolphin', name: 'Spinner Dolphin', category: 'Marine Life', rarity: 'Uncommon', description: 'Acrobatic dolphin that spins through the air' },
  { id: 'spotted-dolphin', name: 'Pantropical Spotted Dolphin', category: 'Marine Life', rarity: 'Uncommon', description: 'Spotted oceanic dolphin in large pods' },
  { id: 'manta-ray', name: 'Giant Manta Ray', category: 'Marine Life', rarity: 'Rare', description: 'Huge filter-feeding ray with 20-foot wingspan' },
  { id: 'spotted-eagle-ray', name: 'Spotted Eagle Ray', category: 'Marine Life', rarity: 'Uncommon', description: 'Beautiful spotted ray that flies through the water' },
  { id: 'whale-shark', name: 'Whale Shark', category: 'Marine Life', rarity: 'Legendary', description: 'Largest fish in the ocean, gentle filter feeder' },
  { id: 'whitetip-reef-shark', name: 'Whitetip Reef Shark', category: 'Marine Life', rarity: 'Uncommon', description: 'Common reef shark resting in caves during the day' },
  { id: 'bull-shark', name: 'Bull Shark', category: 'Marine Life', rarity: 'Rare', description: 'Shark that enters fresh water, found in river mouths' },
  { id: 'hammerhead-shark', name: 'Scalloped Hammerhead', category: 'Marine Life', rarity: 'Rare', description: 'Schools of hammerheads around Cocos Island' },
  { id: 'nurse-shark', name: 'Nurse Shark', category: 'Marine Life', rarity: 'Uncommon', description: 'Docile bottom-dwelling shark' },
  { id: 'green-moray-eel', name: 'Green Moray Eel', category: 'Marine Life', rarity: 'Uncommon', description: 'Large green eel hiding in reef crevices' },
  { id: 'porcupinefish', name: 'Porcupinefish', category: 'Marine Life', rarity: 'Common', description: 'Spiky fish that inflates into a ball when threatened' },
  { id: 'seahorse', name: 'Pacific Seahorse', category: 'Marine Life', rarity: 'Rare', description: 'Largest seahorse in the Americas' },
  { id: 'giant-pacific-octopus', name: 'Common Octopus', category: 'Marine Life', rarity: 'Uncommon', description: 'Master of camouflage and intelligence' },
  { id: 'blue-parrotfish', name: 'Blue Parrotfish', category: 'Marine Life', rarity: 'Common', description: 'Colorful reef fish that crunches coral into sand' },

  // ═══════════════════════════════════════════════════════════════════════════
  // INSECTS & ARACHNIDS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'owl-butterfly', name: 'Owl Butterfly', category: 'Insects & Arachnids', rarity: 'Common', description: 'Huge butterfly with realistic owl-eye spots on wings' },
  { id: 'glasswing-butterfly', name: 'Glasswing Butterfly', category: 'Insects & Arachnids', rarity: 'Common', description: 'Butterfly with completely transparent wings' },
  { id: 'leafcutter-ant', name: 'Leafcutter Ant', category: 'Insects & Arachnids', rarity: 'Common', description: 'Fungus-farming ant that carries leaf pieces in highways' },
  { id: 'army-ant', name: 'Army Ant', category: 'Insects & Arachnids', rarity: 'Common', description: 'Nomadic swarm-raiding ant that flushes everything in its path' },
  { id: 'bullet-ant', name: 'Bullet Ant', category: 'Insects & Arachnids', rarity: 'Uncommon', description: 'Ant with the most painful sting of any insect' },
  { id: 'golden-silk-orb-weaver', name: 'Golden Silk Orb-weaver', category: 'Insects & Arachnids', rarity: 'Common', description: 'Huge spider with golden web strong enough to catch birds' },
  { id: 'tarantula', name: 'Costa Rican Zebra Tarantula', category: 'Insects & Arachnids', rarity: 'Uncommon', description: 'Large striped tarantula with urticating hairs' },
  { id: 'wandering-spider', name: 'Wandering Spider', category: 'Insects & Arachnids', rarity: 'Uncommon', nocturnal: true, description: 'Large fast-moving nocturnal spider, venomous but shy' },
  { id: 'hercules-beetle', name: 'Hercules Beetle', category: 'Insects & Arachnids', rarity: 'Rare', description: 'Largest beetle in the world with enormous horns' },
  { id: 'rhinoceros-beetle', name: 'Rhinoceros Beetle', category: 'Insects & Arachnids', rarity: 'Uncommon', description: 'Large beetle with rhinoceros-like horn' },
  { id: 'scorpion', name: 'Bark Scorpion', category: 'Insects & Arachnids', rarity: 'Common', nocturnal: true, description: 'Glows under UV light, painful but not deadly sting' },
  { id: 'walking-stick', name: 'Giant Walking Stick', category: 'Insects & Arachnids', rarity: 'Uncommon', description: 'Insect disguised as a twig, up to a foot long' },
  { id: 'praying-mantis', name: 'Tropical Praying Mantis', category: 'Insects & Arachnids', rarity: 'Common', description: 'Ambush predator that catches hummingbirds' },
  { id: 'lantern-fly', name: 'Peanut-head Bug', category: 'Insects & Arachnids', rarity: 'Uncommon', description: 'Bizarre insect with peanut-shaped head, false snake-face' },
  { id: 'katydid-leaf', name: 'Leaf Mimic Katydid', category: 'Insects & Arachnids', rarity: 'Uncommon', description: 'Katydid that looks exactly like a green or brown leaf' },
  { id: 'harlequin-beetle', name: 'Harlequin Beetle', category: 'Insects & Arachnids', rarity: 'Uncommon', description: 'Ornate longhorn beetle with psychedelic patterns' },
  { id: 'firefly', name: 'Tropical Firefly', category: 'Insects & Arachnids', rarity: 'Common', nocturnal: true, description: 'Bioluminescent beetle that lights up the forest at night' },
  { id: 'cicada', name: 'Tropical Cicada', category: 'Insects & Arachnids', rarity: 'Common', description: 'Deafeningly loud insect, the soundtrack of the forest' },
  { id: 'whip-scorpion', name: 'Tailless Whip Scorpion', category: 'Insects & Arachnids', rarity: 'Uncommon', nocturnal: true, description: 'Alien-looking arachnid, harmless but terrifying' },
  { id: 'centipede', name: 'Giant Centipede', category: 'Insects & Arachnids', rarity: 'Uncommon', nocturnal: true, description: 'Large venomous centipede up to 8 inches long' },

  // ═══════════════════════════════════════════════════════════════════════════
  // ADDITIONAL HUMMINGBIRDS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'band-tailed-barbthroat', name: 'Band-tailed Barbthroat', category: 'Hummingbirds', rarity: 'Uncommon', description: 'Hermit with striped throat and curved bill' },
  { id: 'brown-violet-ear', name: 'Brown Violetear', category: 'Hummingbirds', rarity: 'Uncommon', description: 'Iridescent green hummer with violet ear patches' },
  { id: 'green-violet-ear', name: 'Mexican Violetear', category: 'Hummingbirds', rarity: 'Common', description: 'Large green hummingbird with purple chest band' },
  { id: 'crowned-woodnymph', name: 'Crowned Woodnymph', category: 'Hummingbirds', rarity: 'Common', description: 'Violet and green gem of forest edges' },
  { id: 'stripe-tailed-hummingbird', name: 'Stripe-tailed Hummingbird', category: 'Hummingbirds', rarity: 'Uncommon', description: 'Highland hummer with banded tail feathers' },
  { id: 'magenta-throated-woodstar', name: 'Magenta-throated Woodstar', category: 'Hummingbirds', rarity: 'Uncommon', endemic: true, description: 'Tiny endemic with blazing magenta throat' },
  { id: 'blue-chested-hummingbird', name: 'Blue-chested Hummingbird', category: 'Hummingbirds', rarity: 'Uncommon', description: 'Green hummer with glittering blue chest' },
  { id: 'ruby-throated-hummingbird', name: 'Ruby-throated Hummingbird', category: 'Hummingbirds', rarity: 'Uncommon', description: 'North American migrant passing through Costa Rica' },

  // ═══════════════════════════════════════════════════════════════════════════
  // ADDITIONAL TANAGERS & FINCHES
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'hepatic-tanager', name: 'Hepatic Tanager', category: 'Tanagers & Honeycreepers', rarity: 'Uncommon', description: 'Brick-red highland tanager' },
  { id: 'scarlet-rumped-tanager', name: 'Flame-rumped Tanager', category: 'Tanagers & Honeycreepers', rarity: 'Common', description: 'Black tanager with fiery orange-red rump' },
  { id: 'plain-colored-tanager', name: 'Plain-colored Tanager', category: 'Tanagers & Honeycreepers', rarity: 'Common', description: 'Subtle gray tanager, often overlooked' },
  { id: 'tawny-capped-euphonia', name: 'Tawny-capped Euphonia', category: 'Tanagers & Honeycreepers', rarity: 'Uncommon', description: 'Small euphonia with rusty cap' },
  { id: 'olive-backed-euphonia', name: 'Olive-backed Euphonia', category: 'Tanagers & Honeycreepers', rarity: 'Uncommon', description: 'Olive and yellow euphonia of forest edges' },
  { id: 'spot-crowned-euphonia', name: 'Spot-crowned Euphonia', category: 'Tanagers & Honeycreepers', rarity: 'Uncommon', description: 'Highland euphonia with spotted crown' },
  { id: 'shining-honeycreeper', name: 'Shining Honeycreeper', category: 'Tanagers & Honeycreepers', rarity: 'Common', description: 'Electric purple-blue honeycreeper with yellow legs' },
  { id: 'common-chlorospingus', name: 'Common Chlorospingus', category: 'Tanagers & Honeycreepers', rarity: 'Common', description: 'Olive bird of highland flocks, the glue of mixed species groups' },
  { id: 'sooty-capped-chlorospingus', name: 'Sooty-capped Chlorospingus', category: 'Tanagers & Honeycreepers', rarity: 'Common', description: 'Dark-capped version common in cloud forests' },

  // ═══════════════════════════════════════════════════════════════════════════
  // ANTBIRDS, ANTSHRIKES & ANTPITTAS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'ocellated-antbird', name: 'Ocellated Antbird', category: 'Antbirds & Allies', rarity: 'Uncommon', description: 'Follows army ant swarms, stunning blue eye ring' },
  { id: 'bicolored-antbird', name: 'Bicolored Antbird', category: 'Antbirds & Allies', rarity: 'Uncommon', description: 'Army ant follower with brown and white plumage' },
  { id: 'spotted-antbird', name: 'Spotted Antbird', category: 'Antbirds & Allies', rarity: 'Uncommon', description: 'Spotted ant follower of dark forest understory' },
  { id: 'chestnut-backed-antbird', name: 'Chestnut-backed Antbird', category: 'Antbirds & Allies', rarity: 'Common', description: 'Rich chestnut antbird often near ant swarms' },
  { id: 'great-antshrike', name: 'Great Antshrike', category: 'Antbirds & Allies', rarity: 'Common', description: 'Large black and white antshrike with red eyes' },
  { id: 'barred-antshrike', name: 'Barred Antshrike', category: 'Antbirds & Allies', rarity: 'Common', description: 'Boldly barred antshrike of edges and second growth' },
  { id: 'slaty-antshrike', name: 'Slaty Antshrike', category: 'Antbirds & Allies', rarity: 'Common', description: 'Gray antshrike with nasal laughing call' },
  { id: 'dot-winged-antwren', name: 'Dot-winged Antwren', category: 'Antbirds & Allies', rarity: 'Common', description: 'Tiny active antwren with white wing dots' },
  { id: 'checker-throated-antwren', name: 'Checker-throated Stipplethroat', category: 'Antbirds & Allies', rarity: 'Uncommon', description: 'Small antwren with checkered throat pattern' },
  { id: 'dull-mantled-antbird', name: 'Dull-mantled Antbird', category: 'Antbirds & Allies', rarity: 'Uncommon', description: 'Understated antbird of Caribbean lowlands' },
  { id: 'thicket-antpitta', name: 'Thicket Antpitta', category: 'Antbirds & Allies', rarity: 'Rare', description: 'Secretive ground bird, almost impossible to see' },
  { id: 'scaled-antpitta', name: 'Scaled Antpitta', category: 'Antbirds & Allies', rarity: 'Rare', description: 'Rare ground bird with scaling pattern on breast' },

  // ═══════════════════════════════════════════════════════════════════════════
  // SWIFTS & SWALLOWS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'white-collared-swift', name: 'White-collared Swift', category: 'Swifts & Swallows', rarity: 'Common', description: 'Large swift that roosts behind waterfalls' },
  { id: 'chestnut-collared-swift', name: 'Chestnut-collared Swift', category: 'Swifts & Swallows', rarity: 'Common', description: 'Swift with rufous collar, screams in large flocks' },
  { id: 'gray-rumped-swift', name: 'Gray-rumped Swift', category: 'Swifts & Swallows', rarity: 'Common', description: 'Small swift of open skies' },
  { id: 'lesser-swallow-tailed-swift', name: 'Lesser Swallow-tailed Swift', category: 'Swifts & Swallows', rarity: 'Common', description: 'Distinctive forked-tail swift' },
  { id: 'mangrove-swallow', name: 'Mangrove Swallow', category: 'Swifts & Swallows', rarity: 'Common', description: 'Blue-green swallow of rivers and coast' },
  { id: 'blue-and-white-swallow', name: 'Blue-and-white Swallow', category: 'Swifts & Swallows', rarity: 'Common', description: 'Clean blue and white highland swallow' },
  { id: 'barn-swallow', name: 'Barn Swallow', category: 'Swifts & Swallows', rarity: 'Common', description: 'Long-tailed migrant swallow, abundant in winter' },
  { id: 'southern-rough-winged-swallow', name: 'Southern Rough-winged Swallow', category: 'Swifts & Swallows', rarity: 'Common', description: 'Brown-backed swallow along rivers' },

  // ═══════════════════════════════════════════════════════════════════════════
  // ADDITIONAL RAPTORS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'collared-forest-falcon', name: 'Collared Forest-Falcon', category: 'Raptors & Vultures', rarity: 'Uncommon', description: 'Long-tailed forest falcon heard more than seen, haunting call' },
  { id: 'barred-forest-falcon', name: 'Barred Forest-Falcon', category: 'Raptors & Vultures', rarity: 'Uncommon', description: 'Small agile falcon of forest interior' },
  { id: 'slaty-backed-forest-falcon', name: 'Slaty-backed Forest-Falcon', category: 'Raptors & Vultures', rarity: 'Rare', description: 'Rare large forest falcon with piercing eyes' },
  { id: 'crane-hawk', name: 'Crane Hawk', category: 'Raptors & Vultures', rarity: 'Uncommon', description: 'Long-legged hawk that reaches into tree holes for prey' },
  { id: 'pearl-kite', name: 'Pearl Kite', category: 'Raptors & Vultures', rarity: 'Uncommon', description: 'Tiny raptor that catches lizards, recently expanding range' },
  { id: 'short-tailed-hawk', name: 'Short-tailed Hawk', category: 'Raptors & Vultures', rarity: 'Uncommon', description: 'Forest hawk with light and dark color morphs' },
  { id: 'semiplumbeous-hawk', name: 'Semiplumbeous Hawk', category: 'Raptors & Vultures', rarity: 'Uncommon', description: 'Slate-gray forest hawk with orange legs' },

  // ═══════════════════════════════════════════════════════════════════════════
  // ADDITIONAL SHOREBIRDS & WATERBIRDS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'limpkin', name: 'Limpkin', category: 'Herons & Shorebirds', rarity: 'Uncommon', description: 'Wading bird that cries like a lost soul, eats apple snails' },
  { id: 'rufescent-tiger-heron', name: 'Rufescent Tiger-Heron', category: 'Herons & Shorebirds', rarity: 'Uncommon', description: 'Streaked heron of forested streams' },
  { id: 'agami-heron', name: 'Agami Heron', category: 'Herons & Shorebirds', rarity: 'Rare', description: 'Stunning chestnut and green heron, extremely shy' },
  { id: 'white-ibis', name: 'White Ibis', category: 'Herons & Shorebirds', rarity: 'Common', description: 'White wading bird with curved red bill' },
  { id: 'glossy-ibis', name: 'Glossy Ibis', category: 'Herons & Shorebirds', rarity: 'Uncommon', description: 'Dark iridescent ibis of wetlands' },
  { id: 'wilson-plover', name: "Wilson's Plover", category: 'Herons & Shorebirds', rarity: 'Uncommon', description: 'Beach plover with heavy dark bill' },
  { id: 'collared-plover', name: 'Collared Plover', category: 'Herons & Shorebirds', rarity: 'Uncommon', description: 'Small sand-colored plover of riverbanks' },
  { id: 'american-oystercatcher', name: 'American Oystercatcher', category: 'Herons & Shorebirds', rarity: 'Uncommon', description: 'Bold black and white shorebird with bright red bill' },
  { id: 'double-striped-thick-knee', name: 'Double-striped Thick-knee', category: 'Herons & Shorebirds', rarity: 'Uncommon', nocturnal: true, description: 'Large-eyed nocturnal shorebird of dry fields' },

  // ═══════════════════════════════════════════════════════════════════════════
  // PIGEONS & DOVES
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'band-tailed-pigeon', name: 'Band-tailed Pigeon', category: 'Pigeons & Doves', rarity: 'Common', description: 'Large highland pigeon with pale tail band' },
  { id: 'red-billed-pigeon', name: 'Red-billed Pigeon', category: 'Pigeons & Doves', rarity: 'Common', description: 'Dark pigeon with red bill and legs' },
  { id: 'short-billed-pigeon', name: 'Short-billed Pigeon', category: 'Pigeons & Doves', rarity: 'Common', description: 'Forest pigeon with monotonous cooing call' },
  { id: 'white-tipped-dove', name: 'White-tipped Dove', category: 'Pigeons & Doves', rarity: 'Common', description: 'Ground dove of forest edges' },
  { id: 'ruddy-ground-dove', name: 'Ruddy Ground-Dove', category: 'Pigeons & Doves', rarity: 'Common', description: 'Tiny rufous dove common on lawns' },
  { id: 'inca-dove', name: 'Inca Dove', category: 'Pigeons & Doves', rarity: 'Common', description: 'Small scaled dove of dry areas' },
  { id: 'ruddy-quail-dove', name: 'Ruddy Quail-Dove', category: 'Pigeons & Doves', rarity: 'Uncommon', description: 'Shy forest floor dove, deep rufous color' },
  { id: 'purplish-backed-quail-dove', name: 'Purplish-backed Quail-Dove', category: 'Pigeons & Doves', rarity: 'Rare', description: 'Rare ground dove of highland forests' },

  // ═══════════════════════════════════════════════════════════════════════════
  // CUCKOOS & ANIS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'squirrel-cuckoo', name: 'Squirrel Cuckoo', category: 'Cuckoos & Anis', rarity: 'Common', description: 'Large rufous cuckoo that hops through branches like a squirrel' },
  { id: 'striped-cuckoo', name: 'Striped Cuckoo', category: 'Cuckoos & Anis', rarity: 'Uncommon', description: 'Streaked cuckoo with distinctive two-note whistle' },
  { id: 'groove-billed-ani', name: 'Groove-billed Ani', category: 'Cuckoos & Anis', rarity: 'Common', description: 'All-black bird with grooved bill, nests communally' },
  { id: 'smooth-billed-ani', name: 'Smooth-billed Ani', category: 'Cuckoos & Anis', rarity: 'Common', description: 'Similar to groove-billed but with smooth bill' },
  { id: 'lesser-ground-cuckoo', name: 'Lesser Ground-Cuckoo', category: 'Cuckoos & Anis', rarity: 'Uncommon', description: 'Secretive ground cuckoo with beautiful whistle' },
  { id: 'rufous-vented-ground-cuckoo', name: 'Rufous-vented Ground-Cuckoo', category: 'Cuckoos & Anis', rarity: 'Rare', description: 'Rare army ant follower, runs along forest floor' },
  { id: 'pheasant-cuckoo', name: 'Pheasant Cuckoo', category: 'Cuckoos & Anis', rarity: 'Rare', description: 'Large crested cuckoo, very hard to see' },

  // ═══════════════════════════════════════════════════════════════════════════
  // TINAMOUS & QUAIL
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'great-tinamou', name: 'Great Tinamou', category: 'Tinamous & Quail', rarity: 'Uncommon', description: 'Ancient bird with haunting tremolo whistle, rarely seen' },
  { id: 'little-tinamou', name: 'Little Tinamou', category: 'Tinamous & Quail', rarity: 'Uncommon', description: 'Small tinamou heard everywhere but almost never seen' },
  { id: 'highland-tinamou', name: 'Highland Tinamou', category: 'Tinamous & Quail', rarity: 'Rare', description: 'Cloud forest ghost, heard but essentially invisible' },
  { id: 'thicket-tinamou', name: 'Thicket Tinamou', category: 'Tinamous & Quail', rarity: 'Rare', description: 'Pacific slope tinamou, extremely secretive' },
  { id: 'spotted-wood-quail', name: 'Spotted Wood-Quail', category: 'Tinamous & Quail', rarity: 'Uncommon', description: 'Shy quail of forest floor with spotted plumage' },
  { id: 'buffy-crowned-wood-partridge', name: 'Buffy-crowned Wood-Partridge', category: 'Tinamous & Quail', rarity: 'Rare', description: 'Highland partridge with buff crown, walks in groups' },
  { id: 'crested-bobwhite', name: 'Crested Bobwhite', category: 'Tinamous & Quail', rarity: 'Common', description: 'Small quail of dry grasslands with jaunty crest' },

  // ═══════════════════════════════════════════════════════════════════════════
  // OVENBIRDS & WOODCREEPERS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'plain-brown-woodcreeper', name: 'Plain-brown Woodcreeper', category: 'Ovenbirds & Woodcreepers', rarity: 'Common', description: 'Common woodcreeper that follows army ants' },
  { id: 'wedge-billed-woodcreeper', name: 'Wedge-billed Woodcreeper', category: 'Ovenbirds & Woodcreepers', rarity: 'Common', description: 'Tiny woodcreeper with upturned bill' },
  { id: 'cocoa-woodcreeper', name: 'Cocoa Woodcreeper', category: 'Ovenbirds & Woodcreepers', rarity: 'Common', description: 'Streaked woodcreeper with beautiful song' },
  { id: 'streak-headed-woodcreeper', name: 'Streak-headed Woodcreeper', category: 'Ovenbirds & Woodcreepers', rarity: 'Common', description: 'Pale woodcreeper with heavily streaked head' },
  { id: 'spotted-woodcreeper', name: 'Spotted Woodcreeper', category: 'Ovenbirds & Woodcreepers', rarity: 'Uncommon', description: 'Spotted highland woodcreeper of cloud forests' },
  { id: 'buff-throated-foliage-gleaner', name: 'Buff-throated Foliage-gleaner', category: 'Ovenbirds & Woodcreepers', rarity: 'Uncommon', description: 'Searches dead leaves in canopy for insects' },
  { id: 'ruddy-treerunner', name: 'Ruddy Treerunner', category: 'Ovenbirds & Woodcreepers', rarity: 'Uncommon', description: 'Highland bird that spirals up tree trunks' },
  { id: 'red-faced-spinetail', name: 'Red-faced Spinetail', category: 'Ovenbirds & Woodcreepers', rarity: 'Common', description: 'Active highland spinetail with rusty face' },
  { id: 'pale-breasted-spinetail', name: 'Pale-breasted Spinetail', category: 'Ovenbirds & Woodcreepers', rarity: 'Common', description: 'Wren-like spinetail of marshes and gardens' },
  { id: 'slaty-spinetail', name: 'Slaty Spinetail', category: 'Ovenbirds & Woodcreepers', rarity: 'Uncommon', description: 'Dark spinetail of thick riverside vegetation' },

  // ═══════════════════════════════════════════════════════════════════════════
  // ADDITIONAL FLYCATCHERS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'yellow-bellied-elaenia', name: 'Yellow-bellied Elaenia', category: 'Flycatchers & Wrens', rarity: 'Common', description: 'Common crested flycatcher of open areas' },
  { id: 'mountain-elaenia', name: 'Mountain Elaenia', category: 'Flycatchers & Wrens', rarity: 'Common', description: 'Highland elaenia with raspy call' },
  { id: 'common-tody-flycatcher', name: 'Common Tody-Flycatcher', category: 'Flycatchers & Wrens', rarity: 'Common', description: 'Tiny flat-billed flycatcher that wags its tail' },
  { id: 'black-headed-tody-flycatcher', name: 'Black-headed Tody-Flycatcher', category: 'Flycatchers & Wrens', rarity: 'Uncommon', description: 'Tiny flycatcher with black head and yellow belly' },
  { id: 'slate-headed-tody-flycatcher', name: 'Slate-headed Tody-Flycatcher', category: 'Flycatchers & Wrens', rarity: 'Common', description: 'Active little flycatcher of forest edges' },
  { id: 'royal-flycatcher', name: 'Royal Flycatcher', category: 'Flycatchers & Wrens', rarity: 'Rare', description: 'Plain brown bird that unfurls spectacular red-and-blue fan crest' },
  { id: 'sulphur-bellied-flycatcher', name: 'Sulphur-bellied Flycatcher', category: 'Flycatchers & Wrens', rarity: 'Common', description: 'Heavily streaked flycatcher with squeaky call' },
  { id: 'streaked-flycatcher', name: 'Streaked Flycatcher', category: 'Flycatchers & Wrens', rarity: 'Common', description: 'Large streaked flycatcher similar to Sulphur-bellied' },
  { id: 'dusky-capped-flycatcher', name: 'Dusky-capped Flycatcher', category: 'Flycatchers & Wrens', rarity: 'Common', description: 'Whistling flycatcher with dark cap' },
  { id: 'golden-bellied-flycatcher', name: 'Golden-bellied Flycatcher', category: 'Flycatchers & Wrens', rarity: 'Uncommon', endemic: true, description: 'Endemic highland flycatcher with bright yellow belly' },
  { id: 'ochraceous-wren', name: 'Ochraceous Wren', category: 'Flycatchers & Wrens', rarity: 'Uncommon', endemic: true, description: 'Endemic highland wren with rich buff plumage' },
  { id: 'timberline-wren', name: 'Timberline Wren', category: 'Flycatchers & Wrens', rarity: 'Uncommon', description: 'Highest-elevation wren, found near páramo' },

  // ═══════════════════════════════════════════════════════════════════════════
  // ADDITIONAL MARINE & FRESHWATER
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'pilot-whale', name: 'Short-finned Pilot Whale', category: 'Marine Life', rarity: 'Rare', description: 'Deep-water whale in pods of 20-50' },
  { id: 'false-killer-whale', name: 'False Killer Whale', category: 'Marine Life', rarity: 'Rare', description: 'Large dolphin relative, surprisingly friendly' },
  { id: 'sea-lion', name: 'California Sea Lion', category: 'Marine Life', rarity: 'Rare', description: 'Occasional visitor to Costa Rican waters' },
  { id: 'loggerhead-turtle', name: 'Loggerhead Sea Turtle', category: 'Crocodilians & Turtles', rarity: 'Rare', description: 'Large-headed sea turtle, occasional visitor' },
  { id: 'freshwater-turtle', name: 'Black River Turtle', category: 'Crocodilians & Turtles', rarity: 'Uncommon', description: 'Large freshwater turtle of lowland rivers' },

  // ═══════════════════════════════════════════════════════════════════════════
  // ADDITIONAL REPTILES & AMPHIBIANS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'fer-de-lance-juvenile', name: 'Central American Bushmaster', category: 'Snakes', rarity: 'Legendary', nocturnal: true, description: 'Different from regular bushmaster, incredibly rare' },
  { id: 'rainbow-boa', name: 'Rainbow Boa', category: 'Snakes', rarity: 'Rare', nocturnal: true, description: 'Iridescent shimmering boa, stunning in light' },
  { id: 'chunk-headed-snake', name: 'Blunt-headed Tree Snake', category: 'Snakes', rarity: 'Uncommon', nocturnal: true, description: 'Bizarre thin snake with oversized blunt head' },
  { id: 'whip-snake', name: 'Green Vine Snake', category: 'Snakes', rarity: 'Uncommon', description: 'Extremely thin bright green snake with pointed snout' },
  { id: 'cat-eyed-snake', name: 'Cat-eyed Snake', category: 'Snakes', rarity: 'Common', nocturnal: true, description: 'Nocturnal tree snake that eats frog eggs' },
  { id: 'helmeted-iguana', name: 'Helmeted Iguana', category: 'Lizards', rarity: 'Uncommon', description: 'Casque-headed lizard of forest understory' },
  { id: 'spectacled-lizard', name: 'Spectacled Lizard', category: 'Lizards', rarity: 'Uncommon', description: 'Forest floor lizard with large scales' },
  { id: 'crocodile-lizard', name: 'Galliwasp', category: 'Lizards', rarity: 'Rare', description: 'Unusual smooth-scaled forest floor lizard' },
  { id: 'olive-sea-snake', name: 'Pelagic Sea Snake', category: 'Snakes', rarity: 'Rare', description: 'Only sea snake in the Americas, yellow-bellied' },

  // ═══════════════════════════════════════════════════════════════════════════
  // ADDITIONAL INSECTS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'postman-butterfly', name: 'Postman Butterfly', category: 'Insects & Arachnids', rarity: 'Common', description: 'Red-banded toxic butterfly that roosts communally' },
  { id: 'malachite-butterfly', name: 'Malachite Butterfly', category: 'Insects & Arachnids', rarity: 'Common', description: 'Green and black butterfly often seen at fruit' },
  { id: 'sara-longwing', name: 'Sara Longwing', category: 'Insects & Arachnids', rarity: 'Common', description: 'Black butterfly with blue and white streaks' },
  { id: 'julia-butterfly', name: 'Julia Butterfly', category: 'Insects & Arachnids', rarity: 'Common', description: 'Bright orange longwing butterfly' },
  { id: 'zebra-longwing', name: 'Zebra Longwing', category: 'Insects & Arachnids', rarity: 'Common', description: 'Black and yellow striped butterfly that collects pollen' },
  { id: 'caligo-butterfly', name: 'Giant Owl Butterfly', category: 'Insects & Arachnids', rarity: 'Common', description: 'Massive butterfly active at dawn and dusk' },
  { id: 'clearwing-moth', name: 'Hummingbird Hawk-Moth', category: 'Insects & Arachnids', rarity: 'Uncommon', description: 'Moth that hovers like a hummingbird at flowers' },
  { id: 'orchid-bee', name: 'Orchid Bee', category: 'Insects & Arachnids', rarity: 'Common', description: 'Metallic green bee essential for orchid pollination' },
  { id: 'rhinoceros-katydid', name: 'Rhinoceros Katydid', category: 'Insects & Arachnids', rarity: 'Uncommon', description: 'Armored katydid with horn-like projection' },
  { id: 'dobsonfly', name: 'Dobsonfly', category: 'Insects & Arachnids', rarity: 'Uncommon', nocturnal: true, description: 'Large nocturnal insect with enormous mandibles' },

  // ═══════════════════════════════════════════════════════════════════════════
  // ADDITIONAL BIRDS TO REACH 500+
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'american-dipper', name: 'American Dipper', category: 'Other Notable Birds', rarity: 'Uncommon', description: 'Aquatic songbird that walks underwater in mountain streams' },
  { id: 'resplendent-trogon', name: 'Elegant Trogon', category: 'Trogons', rarity: 'Uncommon', description: 'Green and red trogon of highland forests' },
  { id: 'white-tailed-trogon', name: 'White-tailed Trogon', category: 'Trogons', rarity: 'Uncommon', description: 'Dark violet trogon with white tail' },
  { id: 'red-throated-ant-tanager', name: 'Red-throated Ant-Tanager', category: 'Tanagers & Honeycreepers', rarity: 'Common', description: 'Dark red tanager of forest understory' },
  { id: 'carmiol-tanager', name: 'Olive Tanager', category: 'Tanagers & Honeycreepers', rarity: 'Uncommon', description: 'Olive-yellow tanager of Caribbean lowlands' },
  { id: 'white-shouldered-tanager', name: 'White-shouldered Tanager', category: 'Tanagers & Honeycreepers', rarity: 'Common', description: 'Black tanager with white shoulder patch' },
  { id: 'tawny-crested-tanager', name: 'Tawny-crested Tanager', category: 'Tanagers & Honeycreepers', rarity: 'Uncommon', description: 'Dark tanager with tawny crest, travels in noisy flocks' },
  { id: 'gray-headed-tanager', name: 'Gray-headed Tanager', category: 'Tanagers & Honeycreepers', rarity: 'Common', description: 'Olive tanager with gray head that leads mixed flocks' },
  { id: 'masked-tityra', name: 'Masked Tityra', category: 'Other Notable Birds', rarity: 'Common', description: 'Chunky pale bird with black mask and red bill base' },
  { id: 'black-crowned-tityra', name: 'Black-crowned Tityra', category: 'Other Notable Birds', rarity: 'Uncommon', description: 'Similar to Masked but with full black crown' },
  { id: 'purple-throated-fruitcrow', name: 'Purple-throated Fruitcrow', category: 'Manakins & Cotingas', rarity: 'Uncommon', description: 'All-black cotinga with purple throat patch' },
  { id: 'rufous-piha', name: 'Rufous Piha', category: 'Manakins & Cotingas', rarity: 'Common', description: 'Plain brown bird with explosive wolf-whistle call' },
  { id: 'speckled-mourner', name: 'Speckled Mourner', category: 'Manakins & Cotingas', rarity: 'Uncommon', description: 'Rufous bird with spotted breast, mimics toxic caterpillar as nestling' },
  { id: 'golden-crowned-spadebill', name: 'Golden-crowned Spadebill', category: 'Flycatchers & Wrens', rarity: 'Uncommon', description: 'Tiny flat-billed flycatcher with hidden golden crown' },
  { id: 'eye-ringed-flatbill', name: 'Eye-ringed Flatbill', category: 'Flycatchers & Wrens', rarity: 'Common', description: 'Olive flycatcher with prominent white eye ring' },
  { id: 'yellow-olive-flycatcher', name: 'Yellow-olive Flycatcher', category: 'Flycatchers & Wrens', rarity: 'Common', description: 'Common yellowish forest flycatcher' },
  { id: 'tropical-pewee', name: 'Tropical Pewee', category: 'Flycatchers & Wrens', rarity: 'Common', description: 'Small sit-and-wait flycatcher of forest edges' },
  { id: 'dark-pewee', name: 'Dark Pewee', category: 'Flycatchers & Wrens', rarity: 'Common', description: 'Highland pewee with distinctive whistled song' },
  { id: 'scale-crested-pygmy-tyrant', name: 'Scale-crested Pygmy-Tyrant', category: 'Flycatchers & Wrens', rarity: 'Common', description: 'Tiny bird with spiky orange crest' },
  { id: 'northern-bentbill', name: 'Northern Bentbill', category: 'Flycatchers & Wrens', rarity: 'Uncommon', description: 'Tiny flycatcher with downward-bent bill' },
  { id: 'yellow-green-vireo', name: 'Yellow-green Vireo', category: 'Warblers & Vireos', rarity: 'Common', description: 'Breeding visitor with monotonous song' },
  { id: 'lesser-greenlet', name: 'Lesser Greenlet', category: 'Warblers & Vireos', rarity: 'Common', description: 'Tiny olive vireo of forest canopy flocks' },
  { id: 'tawny-crowned-greenlet', name: 'Tawny-crowned Greenlet', category: 'Warblers & Vireos', rarity: 'Uncommon', description: 'Small vireo with rusty crown' },
  { id: 'golden-crowned-warbler', name: 'Golden-crowned Warbler', category: 'Warblers & Vireos', rarity: 'Common', description: 'Active warbler with golden crown stripe' },
  { id: 'three-striped-warbler', name: 'Three-striped Warbler', category: 'Warblers & Vireos', rarity: 'Common', description: 'Highland warbler with black and buff head stripes' },
  { id: 'tropical-parula', name: 'Tropical Parula', category: 'Warblers & Vireos', rarity: 'Common', description: 'Small blue and yellow warbler with orange breast band' },
  { id: 'northern-waterthrush', name: 'Northern Waterthrush', category: 'Warblers & Vireos', rarity: 'Common', description: 'Teetering warbler of stream edges and mangroves' },
  { id: 'louisiana-waterthrush', name: 'Louisiana Waterthrush', category: 'Warblers & Vireos', rarity: 'Uncommon', description: 'Stream warbler with bold white eyebrow' },
  { id: 'bananaquit', name: 'Bananaquit', category: 'Other Notable Birds', rarity: 'Common', description: 'Tiny nectar-loving bird with curved bill and yellow belly' },
  { id: 'variable-seedeater', name: 'Variable Seedeater', category: 'Other Notable Birds', rarity: 'Common', description: 'Common black and white seed-eating finch' },
  { id: 'buff-throated-saltator', name: 'Buff-throated Saltator', category: 'Other Notable Birds', rarity: 'Common', description: 'Large olive finch with buff throat and gray head' },
  { id: 'grayish-saltator', name: 'Grayish Saltator', category: 'Other Notable Birds', rarity: 'Common', description: 'Gray finch-like bird with white eyebrow' },
  { id: 'black-striped-sparrow', name: 'Black-striped Sparrow', category: 'Other Notable Birds', rarity: 'Common', description: 'Common ground sparrow with bold black head stripes' },
  { id: 'rufous-collared-sparrow', name: 'Rufous-collared Sparrow', category: 'Other Notable Birds', rarity: 'Common', description: 'Ubiquitous highland sparrow with rufous collar and crest' },
  { id: 'large-footed-finch', name: 'Large-footed Finch', category: 'Other Notable Birds', rarity: 'Uncommon', endemic: true, description: 'Chunky endemic sparrow of bamboo thickets' },
  { id: 'yellow-thighed-finch', name: 'Yellow-thighed Finch', category: 'Other Notable Birds', rarity: 'Common', endemic: true, description: 'Dark highland bird with flash of yellow on thighs' },
  { id: 'sooty-faced-finch', name: 'Sooty-faced Finch', category: 'Other Notable Birds', rarity: 'Uncommon', description: 'Olive finch with dark face, found at bamboo edges' },
  { id: 'great-green-macaw-2', name: 'Lesson\'s Motmot', category: 'Other Notable Birds', rarity: 'Common', description: 'Beautiful motmot often seen sitting quietly on branches' },
  { id: 'stripe-breasted-wren', name: 'Stripe-breasted Wren', category: 'Flycatchers & Wrens', rarity: 'Uncommon', description: 'Highland wren with boldly streaked breast' },
  { id: 'gray-breasted-wood-wren', name: 'Gray-breasted Wood-Wren', category: 'Flycatchers & Wrens', rarity: 'Common', description: 'Cloud forest wren with rich whistled duets' },
  { id: 'song-wren', name: 'Song Wren', category: 'Flycatchers & Wrens', rarity: 'Uncommon', description: 'Dark wren with spectacular musical song' },
  { id: 'nightingale-wren', name: 'Nightingale Wren', category: 'Flycatchers & Wrens', rarity: 'Uncommon', description: 'Forest floor wren with hauntingly beautiful song' },

  // ═══════════════════════════════════════════════════════════════════════════
  // BEACH & TIDEPOOL LIFE — No snorkel needed
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'halloween-crab', name: 'Halloween Crab', category: 'Beach & Tidepool', rarity: 'Common', description: 'Stunning purple and orange land crab that emerges at dusk' },
  { id: 'blue-land-crab', name: 'Blue Land Crab', category: 'Beach & Tidepool', rarity: 'Common', description: 'Large blue-gray crab found near beaches and mangroves' },
  { id: 'ghost-crab', name: 'Ghost Crab', category: 'Beach & Tidepool', rarity: 'Common', nocturnal: true, description: 'Pale sand-colored crab that sprints sideways across the beach at night' },
  { id: 'hermit-crab', name: 'Caribbean Hermit Crab', category: 'Beach & Tidepool', rarity: 'Common', description: 'Crab carrying a borrowed shell, found in huge groups near shore' },
  { id: 'fiddler-crab', name: 'Fiddler Crab', category: 'Beach & Tidepool', rarity: 'Common', description: 'Male waves one giant claw to attract mates in mangrove mud' },
  { id: 'sally-lightfoot-crab', name: 'Sally Lightfoot Crab', category: 'Beach & Tidepool', rarity: 'Common', description: 'Brilliant red and blue rock crab that dances over wave-splashed rocks' },
  { id: 'mangrove-crab', name: 'Mangrove Tree Crab', category: 'Beach & Tidepool', rarity: 'Uncommon', description: 'Crab that climbs mangrove roots above the waterline' },
  { id: 'sea-cucumber', name: 'Sea Cucumber', category: 'Beach & Tidepool', rarity: 'Common', description: 'Squishy bottom-dweller found in shallow tide pools' },
  { id: 'sea-urchin', name: 'Sea Urchin', category: 'Beach & Tidepool', rarity: 'Common', description: 'Spiny ball in tide pools and shallow water — watch your feet!' },
  { id: 'starfish', name: 'Cushion Sea Star', category: 'Beach & Tidepool', rarity: 'Uncommon', description: 'Large puffy starfish found in shallow Caribbean waters' },
  { id: 'sea-anemone', name: 'Giant Sea Anemone', category: 'Beach & Tidepool', rarity: 'Uncommon', description: 'Colorful anemone in tide pools with stinging tentacles' },
  { id: 'conch', name: 'Queen Conch', category: 'Beach & Tidepool', rarity: 'Uncommon', description: 'Large pink-lipped snail found in shallow sandy areas' },
  { id: 'chiton', name: 'Chiton', category: 'Beach & Tidepool', rarity: 'Common', description: 'Ancient armored mollusk clinging to intertidal rocks' },
  { id: 'sand-dollar', name: 'Sand Dollar', category: 'Beach & Tidepool', rarity: 'Uncommon', description: 'Flat disc-shaped urchin found washed up or in shallow sand' },
  { id: 'coconut-crab', name: 'Land Hermit Crab', category: 'Beach & Tidepool', rarity: 'Common', description: 'Large terrestrial hermit crab found under beach vegetation' },
  { id: 'rock-oyster', name: 'Mangrove Oyster', category: 'Beach & Tidepool', rarity: 'Common', description: 'Oyster attached to mangrove roots at the waterline' },
  { id: 'gray-fox', name: 'Gray Fox', category: 'Other Mammals', rarity: 'Rare', nocturnal: true, description: 'The only canid that can climb trees — uses curved claws to scale trunks and escape predators' },
  { id: 'lesser-short-nosed-fruit-bat', name: 'Lesser Short-nosed Fruit Bat', category: 'Bats', rarity: 'Common', nocturnal: true, description: 'Tiny fruit bat with a stubby nose, crucial pollinator of jungle plants and seed disperser' },
  { id: 'mexican-hairy-porcupine', name: 'Mexican Hairy Porcupine', category: 'Other Mammals', rarity: 'Rare', nocturnal: true, description: 'Prehensile-tailed porcupine that lives high in the canopy — quills hidden under long dark hair' },
  { id: 'mexican-mouse-opossum', name: 'Mexican Mouse Opossum', category: 'Other Mammals', rarity: 'Rare', nocturnal: true, description: 'Tiny marsupial the size of a mouse — huge dark eyes, no pouch, carries babies on its back' },
  { id: 'honduran-white-bat', name: 'Honduran White Bat', category: 'Bats', rarity: 'Rare', nocturnal: true, description: 'Tiny snow-white bat that builds leaf tents — cuts heliconia leaf veins so it folds into a shelter' },
];

export default species;
