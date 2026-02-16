import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { species as SPECIES } from './data/species';
import { loadBirdExpansion } from './data/birdExpansion';
import { meanings as MEANINGS } from './data/meanings';
import { JUNGLE_SPECIES, BEACH_SPECIES, JUNGLE_MEANINGS, BEACH_MEANINGS } from './data';
import { loadArchive, saveArchive, clearArchive } from './utils/storage';
import { createArchive, formatDate, formatTime, getRarityColor, groupBy, sortedGroupEntries, compressImage, readFileAsDataUrl, getContextualPrompt } from './utils/helpers';
import { BADGES, checkForNewBadges, getEarnedBadges, getBadgeForEntry, BADGE_LINKED_SPECIES, BADGE_LINKED_MEANINGS, BADGE_LINKED_SPECIES_CATEGORIES, BADGE_LINKED_MEANING_CATEGORIES, getBadgesForItem } from './utils/badges';
import Toast from './components/Toast';
import BadgesModal from './components/BadgesModal';
import ExportModal from './components/ExportModal';
import EntryDetailModal from './components/EntryDetailModal';
import NavButtons from './components/NavButtons';
import BadgePopup from './components/BadgePopup';
import BadgeMedia from './components/BadgeMedia';
import SpeciesCard from './components/SpeciesCard';
import MomentCard from './components/MomentCard';
import SupportFooter from './components/SupportFooter';
import { colors, fonts, spacing, radius, styles } from './styles/theme';

import generateMemoryBookPDF from './utils/exportPDF';

// Stub: STORIES (Costa Rica story marks - TODO: build out)
const STORIES = [];

// ═══════════════════════════════════════════════════════════════════════════════
// COSTA RICA DATA SETUP
// ═══════════════════════════════════════════════════════════════════════════════
const CATEGORIES = [...new Set(SPECIES.map(s => s.category))];
const JUNGLE_CATEGORIES = [...new Set(JUNGLE_SPECIES.map(s => s.category))];
const BEACH_CATEGORIES = [...new Set(BEACH_SPECIES.map(s => s.category))];
const MEANING_CATEGORIES = [...new Set(MEANINGS.map(m => m.subtitle || 'Experiences'))];

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function App() {
  // ─────────────────────────────────────────────────────────────────────────────
  // State
  // ─────────────────────────────────────────────────────────────────────────────
  const [archive, setArchive] = useState(() => loadArchive());
  const [view, setView] = useState('home'); // home, jungle, beach, moments, memories
  const [activeEntry, setActiveEntry] = useState(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [meaningCategoryFilter, setMeaningCategoryFilter] = useState(null);
  const [toast, setToast] = useState({ message: '', visible: false });
  const [showExport, setShowExport] = useState(false);
  const [expandedInfoId, setExpandedInfoId] = useState(null); // Which item's info panel is open
  const [playingIntro, setPlayingIntro] = useState(false);
  const [introVideo, setIntroVideo] = useState('/intro-jungle.mp4');
  const [introTarget, setIntroTarget] = useState('jungle'); // where to go after intro
  const [showSpeciesFilters, setShowSpeciesFilters] = useState(false);
  const [showMomentsFilters, setShowMomentsFilters] = useState(false);
  const [expandedSpeciesCategories, setExpandedSpeciesCategories] = useState({});
  const [expandedMomentsCategories, setExpandedMomentsCategories] = useState({});
  
  // Seen/Experienced filters: null = all, true = seen/experienced, false = not seen/not experienced
  const [seenFilter, setSeenFilter] = useState(null);
  const [experiencedFilter, setExperiencedFilter] = useState(null);
  
  // Toggle states with localStorage persistence
  const [hideBirds, setHideBirds] = useState(() => {
    const saved = localStorage.getItem('costarica_hideBirds');
    return saved === 'true';
  });
  const [expandedBirds, setExpandedBirds] = useState(() => {
    const saved = localStorage.getItem('costarica_expandedBirds');
    return saved === 'true';
  });
  const [confirmingToggle, setConfirmingToggle] = useState(null); // 'birds' | 'expansion' | null
  
  // Badge popup state
  const [badgePopup, setBadgePopup] = useState(null); // Badge object to show in popup
  const [badgeQueue, setBadgeQueue] = useState([]); // Queue of badges to show
  const [showBadgesView, setShowBadgesView] = useState(false); // Show all badges modal
  const [showBadgePopups, setShowBadgePopups] = useState(() => {
    const saved = localStorage.getItem('costarica_showBadgePopups');
    return saved !== null ? saved === 'true' : true; // Default to true
  });
  
  const toastTimer = useRef(null);
  const videoRef = useRef(null);
  const awardedBadgesRef = useRef(new Set()); // Track badges awarded this session to prevent loops
  
  // Initialize awarded badges ref from archive
  useEffect(() => {
    if (archive?.badges) {
      awardedBadgesRef.current = new Set(archive.badges);
    }
  }, []);

  // Show next badge from queue when current popup is dismissed
  useEffect(() => {
    if (!badgePopup && badgeQueue.length > 0) {
      const [nextBadge, ...rest] = badgeQueue;
      setBadgePopup(nextBadge);
      setBadgeQueue(rest);
    }
  }, [badgePopup, badgeQueue.length]);
  
  // Save toggle preferences to localStorage
  useEffect(() => {
    localStorage.setItem('costarica_showBadgePopups', showBadgePopups);
  }, [showBadgePopups]);
  
  useEffect(() => {
    localStorage.setItem('costarica_hideBirds', hideBirds);
  }, [hideBirds]);

  useEffect(() => {
    localStorage.setItem('costarica_expandedBirds', expandedBirds);
  }, [expandedBirds]);
  
  // Play intro for a specific destination (jungle, beach, moments, memories)
  const playIntroFor = (target) => {
    const introMap = {
      jungle: '/intro-jungle.mp4',
      beach: '/intro-beach.mp4',
      moments: '/intro-moments.mp4',
      memories: '/intro-export.mp4',
      artifacts: '/intro-artifacts.mp4',
    };
    setIntroVideo(introMap[target] || '/intro-jungle.mp4');
    setIntroTarget(target);
    setPlayingIntro(true);
  };
  
  // Toggle category expansion
  const toggleSpeciesCategory = (category) => {
    setExpandedSpeciesCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  const toggleMomentsCategory = (category) => {
    setExpandedMomentsCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  // Special category filters that work differently
  const SPECIAL_FILTERS = ['Cats', 'Primates', 'Marine'];

  // ─────────────────────────────────────────────────────────────────────────────
  // Load/Save
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (archive) {
      saveArchive(archive);
    }
  }, [archive]);

  // ─────────────────────────────────────────────────────────────────────────────
  // Toast helper
  // ─────────────────────────────────────────────────────────────────────────────
  const showToast = useCallback((message) => {
    setToast({ message, visible: true });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setToast({ message: '', visible: false });
    }, 2000);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  // Actions
  // ─────────────────────────────────────────────────────────────────────────────
  const startWildlifeTrip = () => {
    const newArchive = createArchive();
    setArchive(newArchive);
    setView('home');
    showToast('Let the Expeditions begin! 🌿');
  };

  // Handle PDF export
  const handleExport = async (options) => {
    try {
      showToast('Generating your memory book...');
      const earnedBadges = getEarnedBadges(archive);
      await generateMemoryBookPDF(archive, SPECIES, MEANINGS, earnedBadges, options);
      showToast('Memory book downloaded!');
      setShowExport(false);
      // Award archive badge
      if (!archive.archiveCreated) {
        const updatedArchive = { ...archive, archiveCreated: true };
        setArchive(updatedArchive);
        checkAndAwardBadges(updatedArchive);
      }
    } catch (error) {
      console.error('Export error:', error);
      showToast('Export failed. Please try again.');
    }
  };

  // Check and award new badges
  const checkAndAwardBadges = useCallback((updatedArchive) => {
    if (!updatedArchive) return;
    
    // Check for newly earned badges
    const newBadges = checkForNewBadges(updatedArchive, SPECIES);
    
    if (newBadges.length > 0) {
      // Filter against ref (synchronous, no stale state issues)
      const trulyNewBadges = newBadges.filter(b => !awardedBadgesRef.current.has(b.id));
      
      if (trulyNewBadges.length === 0) return;
      
      // Mark as awarded IMMEDIATELY in ref (prevents any re-entry)
      trulyNewBadges.forEach(b => awardedBadgesRef.current.add(b.id));
      
      const trulyNewIds = trulyNewBadges.map(b => b.id);
      
      // Update archive with new badges
      setArchive(prev => ({
        ...prev,
        badges: [...new Set([...(prev.badges || []), ...trulyNewIds])]
      }));
      
      // Show popup immediately for first badge, queue the rest
      if (showBadgePopups) {
        const [first, ...rest] = trulyNewBadges;
        setBadgePopup(first);
        if (rest.length > 0) {
          setBadgeQueue(prev => [...prev, ...rest]);
        }
      }
    }
  }, [showBadgePopups]);

  // Check and remove badges that are no longer valid
  const checkAndRemoveBadges = useCallback((updatedArchive) => {
    if (!updatedArchive || !updatedArchive.badges) return;
    
    const currentBadges = updatedArchive.badges || [];
    const stillValidBadges = currentBadges.filter(badgeId => {
      const badge = BADGES.find(b => b.id === badgeId);
      if (!badge) return false;
      
      const checkFn = badge.condition || badge.check;
      if (checkFn) {
        try { return checkFn(updatedArchive); } catch { return false; }
      }
      return false;
    });
    
    // If any badges were removed, update the archive and ref
    if (stillValidBadges.length < currentBadges.length) {
      awardedBadgesRef.current = new Set(stillValidBadges);
      setArchive(prev => ({
        ...prev,
        badges: stillValidBadges
      }));
    }
  }, []);

  const recordSpecies = (species) => {
    if (!archive) return;
    const id = species.id;
    const exists = archive.species[id];

    // If removing, check if there are notes or photos and confirm
    if (exists) {
      const entry = archive.species[id];
      const hasContent = entry.notes?.trim() || entry.photos?.length > 0;
      if (hasContent) {
        const confirmed = window.confirm(`Remove ${species.name}? Your notes and photos will be deleted.`);
        if (!confirmed) return;
      }
    }

    // Build updated archive for badge checking
    const updatedSpecies = { ...archive.species };
    if (exists) {
      delete updatedSpecies[id];
    } else {
      updatedSpecies[id] = {
        timestamp: new Date().toISOString(),
        notes: '',
        photos: [],
        prompt: getContextualPrompt(species, 'species'),
      };
    }
    const updatedArchive = { ...archive, species: updatedSpecies, badges: archive.badges || [] };
    
    // Update state
    setArchive(updatedArchive);

    if (!exists) {
      showToast(`${species.name} recorded`);
      // Check for badges immediately
      checkAndAwardBadges(updatedArchive);
    } else {
      // Species was removed - check if any artifacts should be removed
      checkAndRemoveBadges(updatedArchive);
    }
  };

  const recordMeaning = (meaning) => {
    if (!archive) return;
    const id = meaning.id;
    const exists = archive.meanings[id];

    // If removing, check if there are notes or photos and confirm
    if (exists) {
      const entry = archive.meanings[id];
      const hasContent = entry.notes?.trim() || entry.photos?.length > 0;
      if (hasContent) {
        const confirmed = window.confirm(`Remove "${meaning.title}"? Your notes and photos will be deleted.`);
        if (!confirmed) return;
      }
    }

    setArchive(prev => {
      const newMeanings = { ...prev.meanings };
      if (exists) {
        delete newMeanings[id];
      } else {
        newMeanings[id] = {
          timestamp: new Date().toISOString(),
          notes: '',
          photos: [],
          prompt: getContextualPrompt(meaning, 'meaning'),
        };
      }
      return { ...prev, meanings: newMeanings };
    });

    if (!exists) {
      showToast(`"${meaning.title}" recorded`);
      const updatedMeanings = { ...archive.meanings, [id]: { timestamp: new Date().toISOString() } };
      const updatedArchive = { ...archive, meanings: updatedMeanings, badges: archive.badges || [] };
      checkAndAwardBadges(updatedArchive);
    } else {
      // Meaning was removed - check if any artifacts should be removed
      const updatedMeanings = { ...archive.meanings };
      delete updatedMeanings[id];
      const updatedArchive = { ...archive, meanings: updatedMeanings, badges: archive.badges || [] };
      checkAndRemoveBadges(updatedArchive);
    }
  };

  const updateNotes = (type, id, notes) => {
    setArchive(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [id]: {
          ...prev[type][id],
          notes,
        },
      },
    }));
  };

  const addPhoto = async (type, id, file) => {
    try {
      const dataUrl = await readFileAsDataUrl(file);
      const compressed = await compressImage(dataUrl, 1200, 0.8);
      
      setArchive(prev => ({
        ...prev,
        [type]: {
          ...prev[type],
          [id]: {
            ...prev[type][id],
            photos: [
              ...(prev[type][id]?.photos || []),
              {
                data: compressed,
                timestamp: new Date().toISOString(),
              },
            ],
          },
        },
      }));
      showToast('Photo added');
    } catch (error) {
      showToast('Failed to add photo');
    }
  };

  const removePhoto = (type, id, photoIndex) => {
    setArchive(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [id]: {
          ...prev[type][id],
          photos: prev[type][id].photos.filter((_, i) => i !== photoIndex),
        },
      },
    }));
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Computed values
  // ─────────────────────────────────────────────────────────────────────────────
  const speciesCount = archive ? Object.keys(archive.species).filter(k => archive.species[k]).length : 0;
  const meaningCount = archive ? Object.keys(archive.meanings).filter(k => archive.meanings[k]).length : 0;
  const customCount = archive?.custom 
    ? (archive.custom.species?.filter(e => e.experienced).length || 0) + 
      (archive.custom.moments?.filter(e => e.experienced).length || 0) +
      (archive.custom.expeditions?.filter(e => e.experienced).length || 0)
    : 0;
  const totalCount = speciesCount + meaningCount + customCount;
  const badgeCount = archive?.badges?.length || 0;

  // Build the base species list (include green season if toggled)
  // Bird categories for filter
  const BIRD_CATEGORIES = [
    'Toucans & Aracaris', 'Parrots & Macaws', 'Hummingbirds', 
    'Raptors & Vultures', 'Tanagers & Honeycreepers', 'Trogons', 'Motmots',
    'Other Notable Birds', 'Manakins & Cotingas', 'Herons & Shorebirds',
    'Kingfishers', 'Owls & Nightjars', 'Woodpeckers', 'Flycatchers & Wrens',
    'Warblers & Vireos', 'Swifts & Swallows', 'Ovenbirds & Woodcreepers',
    'Antbirds & Allies', 'Cuckoos & Anis', 'Pigeons & Doves',
    'Tinamous & Quail', 'Seabirds',
  ];

  const baseSpecies = useMemo(() => {
    // Build full species list, with expansion if enabled
    const fullSpecies = expandedBirds ? loadBirdExpansion([...SPECIES]) : [...SPECIES];
    
    // Filter by ecosystem view
    const BEACH_CATS = ['Marine Life', 'Seabirds', 'Beach & Tidepool'];
    const BOTH_CATS = ['Iconic Costa Rica', 'Herons & Shorebirds', 'Crocodilians & Turtles', 'Kingfishers'];
    
    let species;
    if (view === 'beach') {
      species = fullSpecies.filter(s => BEACH_CATS.includes(s.category) || BOTH_CATS.includes(s.category));
    } else if (view === 'jungle') {
      species = fullSpecies.filter(s => !BEACH_CATS.includes(s.category) || BOTH_CATS.includes(s.category));
    } else {
      species = fullSpecies;
    }
    
    // Hide birds if toggled
    if (hideBirds) {
      species = species.filter(s => !BIRD_CATEGORIES.includes(s.category));
    }
    return species;
  }, [hideBirds, expandedBirds, view]);

  // Define mammal categories for the Mammals filter
  const MAMMAL_CATEGORIES = [
    'Iconic Costa Rica', 'Primates', 'Cats & Carnivores', 'Other Mammals', 'Bats'
  ];

  // Filter species - supports special filters like Cats, Mammals
  const filteredSpecies = useMemo(() => {
    let filtered = baseSpecies;
    
    if (categoryFilter) {
      // Special filter: Cats - show all cat species
      if (categoryFilter === 'Cats') {
        filtered = filtered.filter(s => 
          s.category === 'Cats & Carnivores' && (
            s.id === 'jaguar' || 
            s.id === 'puma' ||
            s.id === 'ocelot' ||
            s.id === 'margay' ||
            s.id === 'jaguarundi'
          )
        );
      }
      // Special filter: Primates
      else if (categoryFilter === 'Primates') {
        filtered = filtered.filter(s => s.category === 'Primates');
      }
      // Special filter: Marine Life
      else if (categoryFilter === 'Marine') {
        filtered = filtered.filter(s => s.category === 'Marine Life');
      }
      // Regular category filter
      else {
        filtered = filtered.filter(s => s.category === categoryFilter);
      }
    }
    
    // Seen/Not Seen filter
    if (seenFilter !== null && archive) {
      filtered = filtered.filter(s => {
        const isSeen = !!archive.species[s.id];
        return seenFilter ? isSeen : !isSeen;
      });
    }
    
    const q = search.toLowerCase().trim();
    if (q) {
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.category.toLowerCase().includes(q)
      );
    }
    
    return filtered;
  }, [search, categoryFilter, baseSpecies, seenFilter, archive]);

  // Group species by category
  const groupedSpecies = useMemo(() => {
    return sortedGroupEntries(groupBy(filteredSpecies, 'category'));
  }, [filteredSpecies]);

  // Moments search state
  const [momentsSearch, setMomentsSearch] = useState('');
  
  // Archive search state
  const [archiveSearch, setArchiveSearch] = useState('');

  // Filter meanings with experienced filter and search
  const filteredMeanings = useMemo(() => {
    let filtered = MEANINGS;
    
    // Search filter
    if (momentsSearch) {
      const searchLower = momentsSearch.toLowerCase();
      filtered = filtered.filter(m => 
        m.title.toLowerCase().includes(searchLower) ||
        m.subtitle.toLowerCase().includes(searchLower) ||
        (m.description || '').toLowerCase().includes(searchLower)
      );
    }
    
    // Category filter (including special type filters)
    if (meaningCategoryFilter) {
      if (meaningCategoryFilter === '_moments') {
        filtered = filtered.filter(m => m.type === 'moment');
      } else if (meaningCategoryFilter === '_expeditions') {
        filtered = filtered.filter(m => m.type === 'expedition');
      } else {
        filtered = filtered.filter(m => m.subtitle === meaningCategoryFilter);
      }
    }
    
    // Experienced/Not Experienced filter
    if (experiencedFilter !== null && archive) {
      filtered = filtered.filter(m => {
        const isExperienced = !!archive.meanings[m.id];
        return experiencedFilter ? isExperienced : !isExperienced;
      });
    }
    
    return filtered;
  }, [meaningCategoryFilter, experiencedFilter, archive, momentsSearch]);

  // Group meanings by category
  const groupedMeanings = useMemo(() => {
    const categories = (meaningCategoryFilter && !meaningCategoryFilter.startsWith('_'))
      ? [meaningCategoryFilter] 
      : MEANING_CATEGORIES;
    
    return categories.map(cat => [
      cat,
      filteredMeanings.filter(m => m.subtitle === cat),
    ]).filter(([_, items]) => items.length > 0); // Only show categories with items
  }, [meaningCategoryFilter, filteredMeanings]);

  // Earned story marks
  const earnedStories = useMemo(() => {
    if (!archive) return [];
    const recordedIds = new Set(Object.keys(archive.species).filter(k => archive.species[k]));
    const total = speciesCount;

    return STORIES.filter(story => {
      // Check specific required species
      if (story.requires) {
        return story.requires.every(id => recordedIds.has(id));
      }
      
      // Check total count
      if (story.requiresTotal) {
        return total >= story.requiresTotal;
      }
      
      // Check nocturnal count
      if (story.requiresNocturnal) {
        const nocturnalCount = SPECIES.filter(s => s.nocturnal && recordedIds.has(s.id)).length;
        return nocturnalCount >= story.requiresNocturnal;
      }
      
      // Check category count
      if (story.requiresFromCategory) {
        const { category, count } = story.requiresFromCategory;
        const categoryCount = SPECIES.filter(s => s.category === category && recordedIds.has(s.id)).length;
        return categoryCount >= count;
      }
      
      // Check multiple categories
      if (story.requiresFromCategories) {
        const { categories, count } = story.requiresFromCategories;
        const catCount = SPECIES.filter(s => categories.includes(s.category) && recordedIds.has(s.id)).length;
        return catCount >= count;
      }
      
      // Check rarity
      if (story.requiresRarity) {
        const { rarity, count } = story.requiresRarity;
        const rarityCount = SPECIES.filter(s => s.rarity === rarity && recordedIds.has(s.id)).length;
        return rarityCount >= count;
      }
      
      // Check any of multiple options
      if (story.requiresAny) {
        return story.requiresAny.some(group => 
          group.every(id => recordedIds.has(id))
        );
      }
      
      return false;
    });
  }, [archive, speciesCount]);

  // ─────────────────────────────────────────────────────────────────────────────
  // Navigation buttons - pass props to NavButtons component
  // ─────────────────────────────────────────────────────────────────────────────
  const navProps = { view, setView, setShowBadgesView };

  // ─────────────────────────────────────────────────────────────────────────────
  // HOME VIEW - FULL BLEED BACKGROUND IMAGE
  // ─────────────────────────────────────────────────────────────────────────────
  if (view === 'home') {
    // Auto-start expedition if not started
    if (!archive) {
      startWildlifeTrip();
    }

    return (
      <div 
       
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#0a0c10',
          overflow: 'hidden',
        }}
      >
        {/* Badges Modal */}
        <BadgesModal isOpen={showBadgesView} onClose={() => setShowBadgesView(false)} archive={archive} showBadgePopups={showBadgePopups} onTogglePopups={() => setShowBadgePopups(!showBadgePopups)} setView={setView} />
        <ExportModal isOpen={showExport} onClose={() => setShowExport(false)} onExport={handleExport} archive={archive} speciesCount={speciesCount} momentsCount={meaningCount} badgeCount={badgeCount} />

        {/* Background image — fills viewport, no scroll */}
        <img 
          src="/home-bg.png" 
          alt="Costa Rica - Your Expedition"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
          }}
        />

        {/* Tap zones — positioned relative to visible image area */}
        {(() => {
          // Image is 1350x3000. With objectFit: cover + top center,
          // the image fills width and crops from bottom.
          // Tap zone positions are expressed as % of the original image dimensions,
          // then converted to viewport % based on how much image is visible.
          
          // On any screen, image width fills 100%. Visible height = screenAspect / imageAspect * 100%.
          // Image aspect = 1350/3000 = 0.45
          // For a phone at 0.46 aspect, visibleImageHeight = 0.46/0.45 = 1.022 → sees ~100% of image
          // For a phone at 0.50 aspect, visibleImageHeight = 0.50/0.45 = 1.11 → sees ~90% of image
          // Tap zone at imageY% maps to viewportY% = imageY / visibleFraction
          
          const imgW = 1350, imgH = 3000;
          const imgAspect = imgW / imgH; // 0.45
          const screenAspect = typeof window !== 'undefined' ? window.innerWidth / window.innerHeight : 0.46;
          const visibleFraction = Math.min(1, imgAspect / screenAspect); // fraction of image height visible
          
          // Convert image-space Y% to viewport Y%
          const toVP = (imgYPct) => imgYPct * visibleFraction;
          // Convert image-space height% to viewport height%
          const toVPH = (imgHPct) => imgHPct * visibleFraction;
          
          return (
            <>
              {/* Enter the Jungle — in image space: top ~45%, left 1% */}
              <button
                onClick={() => playIntroFor('jungle')}
                style={{
                  position: 'absolute',
                  top: `${toVP(45)}%`,
                  left: '1%',
                  width: '49%',
                  height: `${toVPH(5)}%`,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 8,
                  transition: 'all 0.2s ease',
                  zIndex: 10,
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(46, 139, 87, 0.2)'}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
                aria-label="Enter the Jungle"
              />

              {/* Hit the Beach — in image space: top ~61%, left 50% */}
              <button
                onClick={() => playIntroFor('beach')}
                style={{
                  position: 'absolute',
                  top: `${toVP(61)}%`,
                  left: '50%',
                  width: '47%',
                  height: `${toVPH(7.5)}%`,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 8,
                  transition: 'all 0.2s ease',
                  zIndex: 10,
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(79, 195, 247, 0.2)'}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
                aria-label="Hit the Beach"
              />

              {/* Artifacts — in image space: bottom ~11% = top ~86% */}
              <button
                onClick={() => playIntroFor('artifacts')}
                style={{
                  position: 'absolute',
                  top: `${toVP(86)}%`,
                  left: '6%',
                  width: '26%',
                  height: `${toVPH(3.5)}%`,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 8,
                  transition: 'all 0.2s ease',
                  zIndex: 10,
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
                aria-label="Artifacts"
              />

              {/* Moments — in image space: bottom ~11% = top ~86% */}
              <button
                onClick={() => playIntroFor('moments')}
                style={{
                  position: 'absolute',
                  top: `${toVP(86)}%`,
                  left: '36%',
                  width: '28%',
                  height: `${toVPH(3.5)}%`,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 8,
                  transition: 'all 0.2s ease',
                  zIndex: 10,
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
                aria-label="Moments"
              />

              {/* Journal/Export — in image space: bottom ~11% = top ~86% */}
              <button
                onClick={() => playIntroFor('memories')}
                style={{
                  position: 'absolute',
                  top: `${toVP(86)}%`,
                  right: '6%',
                  width: '26%',
                  height: `${toVPH(3.5)}%`,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 8,
                  transition: 'all 0.2s ease',
                  zIndex: 10,
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
                aria-label="Export"
              />
            </>
          );
        })()}

        {/* Intro Video Overlay */}
        {playingIntro && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: '#000',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <video
              ref={videoRef}
              src={introVideo}
              autoPlay
              muted
              playsInline
              webkit-playsinline="true"
              onEnded={() => {
                setPlayingIntro(false);
                if (introTarget === 'artifacts') {
                  setShowBadgesView(true);
                } else {
                  setView(introTarget);
                }
              }}
              onCanPlay={(e) => e.target.play()}
              onError={() => {
                setPlayingIntro(false);
                if (introTarget === 'artifacts') {
                  setShowBadgesView(true);
                } else {
                  setView(introTarget);
                }
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <button
              onClick={() => {
                setPlayingIntro(false);
                if (introTarget === 'artifacts') {
                  setShowBadgesView(true);
                } else {
                  setView(introTarget);
                }
              }}
              style={{
                position: 'absolute',
                bottom: 40,
                right: 40,
                padding: '12px 24px',
                borderRadius: radius.md,
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(0, 0, 0, 0.5)',
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: fonts.sans,
                fontSize: '14px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
              }}
            >
              Skip →
            </button>
          </div>
        )}

        <Toast message={toast.message} visible={toast.visible} />
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // WILD VIEW (Species)
  // ─────────────────────────────────────────────────────────────────────────────
  if (view === 'jungle') {
    return (
      <div style={{ ...styles.shell, position: 'relative', background: 'transparent' }}>
        {/* Background Image */}
        <img 
          src="/jungle-bg.png" 
          alt=""
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }} 
        />
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.88) 100%)',
          zIndex: 1,
        }} />
        
        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Badges Modal */}
        <BadgesModal isOpen={showBadgesView} onClose={() => setShowBadgesView(false)} archive={archive} showBadgePopups={showBadgePopups} onTogglePopups={() => setShowBadgePopups(!showBadgePopups)} setView={setView} />
        <ExportModal isOpen={showExport} onClose={() => setShowExport(false)} onExport={handleExport} archive={archive} speciesCount={speciesCount} momentsCount={meaningCount} badgeCount={badgeCount} />
        
        <div style={styles.container}>
          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <img src="/jungle.png" alt="Enter the Jungle" style={{ height: 'auto', width: '100%', maxWidth: 360, marginBottom: 8 }} />
            <p style={{ opacity: 0.6, fontSize: '14px', marginBottom: 12 }}>
              {baseSpecies.filter(s => archive?.species?.[s.id]).length} of {baseSpecies.length} species recorded
            </p>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <NavButtons {...navProps} />
              </div>
              <div style={{ textAlign: 'center', flexShrink: 0 }}>
                <div style={{ 
                  fontSize: '10px', 
                  opacity: 0.5, 
                  marginBottom: 2,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  Sponsored by
                </div>
                <img 
                  src="/sponsor-logo.png" 
                  alt="Sponsor" 
                  style={{ 
                    height: 70, 
                    width: 'auto',
                    opacity: 0.85,
                  }} 
                />
              </div>
            </div>
          </div>

          {/* Search */}
          <div style={{ marginBottom: spacing.lg }}>
            <input
              type="text"
              placeholder="Search species or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* Category filter toggle */}
          <div style={{ marginBottom: spacing.md }}>
            <button
              onClick={() => setShowSpeciesFilters(!showSpeciesFilters)}
              style={{
                ...styles.buttonGhost,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              {showSpeciesFilters ? '▼' : '▶'} Filters
              {categoryFilter && (
                <span style={{ 
                  background: colors.accentLighter, 
                  padding: '2px 8px', 
                  borderRadius: radius.sm,
                  fontSize: '12px',
                }}>
                  {categoryFilter}
                </span>
              )}
              {seenFilter !== null && (
                <span style={{ 
                  background: colors.accentLighter, 
                  padding: '2px 8px', 
                  borderRadius: radius.sm,
                  fontSize: '12px',
                }}>
                  {seenFilter ? 'Seen' : 'Not Seen'}
                </span>
              )}
            </button>
          </div>

          {/* Category filters - collapsible */}
          {showSpeciesFilters && (
            <div style={{ marginBottom: spacing.lg, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <button
                onClick={() => setCategoryFilter(null)}
                style={{
                  ...styles.buttonGhost,
                  background: !categoryFilter ? colors.accentLighter : 'transparent',
                  borderColor: !categoryFilter ? colors.borderAccent : 'transparent',
                }}
              >
                All
              </button>
              
              {/* Special filters */}
              {['Cats', 'Primates', 'Marine'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setCategoryFilter(categoryFilter === filter ? null : filter)}
                  style={{
                    ...styles.buttonGhost,
                    background: categoryFilter === filter ? colors.accentLighter : 'transparent',
                    borderColor: categoryFilter === filter ? colors.borderAccent : 'transparent',
                    fontStyle: 'italic',
                  }}
                >
                  ★ {filter}
                </button>
              ))}
              
              {/* Separator */}
              <div style={{ width: '100%', height: 1, background: colors.border, margin: '4px 0' }} />
              
              {/* Seen/Not Seen filter */}
              <div style={{ width: '100%', display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: '12px', opacity: 0.6, marginRight: 4 }}>Status:</span>
                <button
                  onClick={() => setSeenFilter(null)}
                  style={{
                    ...styles.buttonGhost,
                    padding: '4px 12px',
                    fontSize: '12px',
                    background: seenFilter === null ? colors.accentLighter : 'transparent',
                    borderColor: seenFilter === null ? colors.borderAccent : 'transparent',
                  }}
                >
                  All
                </button>
                <button
                  onClick={() => setSeenFilter(true)}
                  style={{
                    ...styles.buttonGhost,
                    padding: '4px 12px',
                    fontSize: '12px',
                    background: seenFilter === true ? colors.accentLighter : 'transparent',
                    borderColor: seenFilter === true ? colors.borderAccent : 'transparent',
                  }}
                >
                  Seen
                </button>
                <button
                  onClick={() => setSeenFilter(false)}
                  style={{
                    ...styles.buttonGhost,
                    padding: '4px 12px',
                    fontSize: '12px',
                    background: seenFilter === false ? colors.accentLighter : 'transparent',
                    borderColor: seenFilter === false ? colors.borderAccent : 'transparent',
                  }}
                >
                  Not Seen
                </button>
              </div>
              
              {/* Separator */}
              <div style={{ width: '100%', height: 1, background: colors.border, margin: '4px 0' }} />
              
              {/* Regular categories */}
              {(view === 'beach' ? BEACH_CATEGORIES : view === 'jungle' ? JUNGLE_CATEGORIES : CATEGORIES).map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(categoryFilter === cat ? null : cat)}
                  style={{
                    ...styles.buttonGhost,
                    background: categoryFilter === cat ? colors.accentLighter : 'transparent',
                    borderColor: categoryFilter === cat ? colors.borderAccent : 'transparent',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Species Grid */}
          <div style={{ display: 'grid', gap: spacing.lg }}>
            {groupedSpecies.map(([category, speciesList]) => {
              const isExpanded = expandedSpeciesCategories[category];
              const recordedCount = speciesList.filter(s => archive?.species[s.id]).length;
              
              return (
              <div key={category} style={{ ...styles.card, padding: spacing.md, ...(BADGE_LINKED_SPECIES_CATEGORIES.has(category) ? { borderColor: "rgba(255, 193, 7, 0.4)", boxShadow: "0 0 8px rgba(255, 193, 7, 0.1)" } : {}) }}>
                <div 
                  onClick={() => toggleSpeciesCategory(category)}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'baseline', 
                    marginBottom: isExpanded ? spacing.md : 0,
                    cursor: 'pointer',
                  }}
                >
                  <h2 style={{ ...styles.sectionTitle, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '12px' }}>{isExpanded ? '▼' : '▶'}</span>
                    {BADGE_LINKED_SPECIES_CATEGORIES.has(category) && <span style={{ color: "#FFC107", fontSize: "14px" }}>⭐</span>}{category}
                  </h2>
                  <span style={{ opacity: 0.5, fontSize: '13px' }}>
                    {recordedCount}/{speciesList.length}
                  </span>
                </div>

                {isExpanded && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
                  {speciesList.map(species => (
                    <SpeciesCard
                      key={species.id}
                      species={species}
                      recorded={archive?.species[species.id]}
                      onRecord={() => recordSpecies(species)}
                      onEdit={() => setActiveEntry({ type: 'species', id: species.id, data: archive?.species[species.id] })}
                      expandedInfoId={expandedInfoId}
                      setExpandedInfoId={setExpandedInfoId}
                    />
                  ))}
                </div>
                )}
              </div>
              );
            })}
          </div>
          
          {/* Advanced Settings - Bottom of page (obscure) */}
          <div style={{ 
            marginTop: spacing.xl * 2, 
            paddingTop: spacing.lg,
            borderTop: `1px solid ${colors.border}`,
            opacity: 0.5,
          }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: spacing.md, opacity: 0.6 }}>
              Advanced Settings
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
              {/* Hide Birds Toggle */}
              <button
                onClick={() => setConfirmingToggle('birds')}
                style={{
                  ...styles.buttonGhost,
                  fontSize: '12px',
                  opacity: 0.7,
                  justifyContent: 'flex-start',
                }}
              >
                {hideBirds ? '✓' : '○'} Hide All Birds
              </button>
              
              {/* Expanded Bird List Toggle */}
              <button
                onClick={() => setConfirmingToggle('expansion')}
                style={{
                  ...styles.buttonGhost,
                  fontSize: '12px',
                  opacity: 0.7,
                  justifyContent: 'flex-start',
                }}
              >
                {expandedBirds ? '✓' : '○'} 900 Bird Checklist
              </button>
            </div>
          </div>
          
          {/* Confirmation Modal */}
          {confirmingToggle && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(10px)',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: spacing.md,
              }}
              onClick={() => setConfirmingToggle(null)}
            >
              <div
                style={{
                  ...styles.card,
                  padding: spacing.lg,
                  maxWidth: 400,
                  textAlign: 'center',
                }}
                onClick={e => e.stopPropagation()}
              >
                <h3 style={{ ...styles.serifHeading, fontSize: '20px', marginBottom: spacing.md }}>
                  Are you sure?
                </h3>
                <p style={{ opacity: 0.7, marginBottom: spacing.lg, fontSize: '14px' }}>
                  {confirmingToggle === 'birds'
                    ? (hideBirds 
                        ? 'This will show all bird species again.'
                        : 'This will hide all bird categories from the species list.')
                    : (expandedBirds
                        ? 'This will switch back to the core species list (~520 species).'
                        : 'This will load the full 900-bird checklist. Expansion birds won\'t have badges or fun facts.')}
                </p>
                <div style={{ display: 'flex', gap: spacing.md, justifyContent: 'center' }}>
                  <button
                    onClick={() => setConfirmingToggle(null)}
                    style={styles.buttonSecondary}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (confirmingToggle === 'birds') {
                        setHideBirds(!hideBirds);
                        showToast(hideBirds ? 'Birds visible again' : 'Birds hidden');
                      } else if (confirmingToggle === 'expansion') {
                        setExpandedBirds(!expandedBirds);
                        showToast(expandedBirds ? 'Core species list restored' : '900 bird checklist loaded');
                      }
                      setConfirmingToggle(null);
                    }}
                    style={styles.buttonPrimary}
                  >
                    {confirmingToggle === 'birds' 
                      ? `Yes, ${hideBirds ? 'Show' : 'Hide'}`
                      : `Yes, ${expandedBirds ? 'Disable' : 'Enable'}`}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <SupportFooter />

        <BadgePopup badge={badgePopup} onDismiss={() => setBadgePopup(null)} />

        <Toast message={toast.message} visible={toast.visible} />
        <EntryDetailModal activeEntry={activeEntry} archive={archive} onClose={() => setActiveEntry(null)} onUpdateNotes={updateNotes} onAddPhoto={addPhoto} onRemovePhoto={removePhoto} />
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // BEACH VIEW — Marine life, shore birds, coastal species
  // ─────────────────────────────────────────────────────────────────────────────
  if (view === 'beach') {
    return (
      <div style={{ ...styles.shell, position: 'relative', background: 'transparent' }}>
        {/* Background Image */}
        <img 
          src="/beach-bg.png" 
          alt=""
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }} 
        />
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.88) 100%)',
          zIndex: 1,
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2 }}>
        <BadgesModal isOpen={showBadgesView} onClose={() => setShowBadgesView(false)} archive={archive} showBadgePopups={showBadgePopups} onTogglePopups={() => setShowBadgePopups(!showBadgePopups)} setView={setView} />
        <ExportModal isOpen={showExport} onClose={() => setShowExport(false)} onExport={handleExport} archive={archive} speciesCount={speciesCount} momentsCount={meaningCount} badgeCount={badgeCount} />

        <div style={styles.container}>
          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <img src="/beach.png" alt="Hit the Beach" style={{ height: 'auto', width: '100%', maxWidth: 360, marginBottom: 8 }} />
            <p style={{ opacity: 0.6, fontSize: '14px', marginBottom: 12 }}>
              {baseSpecies.filter(s => archive?.species?.[s.id]).length} of {baseSpecies.length} species recorded
            </p>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <NavButtons {...navProps} />
              </div>
              <div style={{ textAlign: 'center', flexShrink: 0 }}>
                <div style={{ 
                  fontSize: '10px', 
                  opacity: 0.5, 
                  marginBottom: 2,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  Sponsored by
                </div>
                <img 
                  src="/sponsor-logo.png" 
                  alt="Sponsor" 
                  style={{ 
                    height: 70, 
                    width: 'auto',
                    opacity: 0.85,
                  }} 
                />
              </div>
            </div>
          </div>

          {/* Search */}
          <div style={{ marginBottom: spacing.lg }}>
            <input
              type="text"
              placeholder="Search marine species..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* Species Grid */}
          <div style={{ display: 'grid', gap: spacing.lg }}>
            {groupedSpecies.map(([category, speciesList]) => {
              const isExpanded = expandedSpeciesCategories[category];
              const recordedCount = speciesList.filter(s => archive?.species[s.id]).length;
              
              return (
              <div key={category} style={{ ...styles.card, padding: spacing.md, ...(BADGE_LINKED_SPECIES_CATEGORIES.has(category) ? { borderColor: "rgba(255, 193, 7, 0.4)", boxShadow: "0 0 8px rgba(255, 193, 7, 0.1)" } : {}) }}>
                <div 
                  onClick={() => toggleSpeciesCategory(category)}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'baseline', 
                    marginBottom: isExpanded ? spacing.md : 0,
                    cursor: 'pointer',
                  }}
                >
                  <h2 style={{ ...styles.sectionTitle, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '12px' }}>{isExpanded ? '▼' : '▶'}</span>
                    {BADGE_LINKED_SPECIES_CATEGORIES.has(category) && <span style={{ color: "#FFC107", fontSize: "14px" }}>⭐</span>}{category}
                  </h2>
                  <span style={{ fontSize: '13px', opacity: 0.5 }}>
                    {recordedCount}/{speciesList.length}
                  </span>
                </div>

                {isExpanded && speciesList.map(species => (
                  <SpeciesCard
                    key={species.id}
                    species={species}
                    recorded={archive?.species[species.id]}
                    onRecord={() => recordSpecies(species)}
                    onEdit={() => setActiveEntry({ type: 'species', id: species.id, data: archive?.species[species.id] })}
                    expandedInfoId={expandedInfoId}
                    setExpandedInfoId={setExpandedInfoId}
                  />
                ))}
              </div>
              );
            })}
          </div>
        </div>

        <SupportFooter />

        <BadgePopup badge={badgePopup} onDismiss={() => setBadgePopup(null)} />
        <Toast message={toast.message} visible={toast.visible} />
        <EntryDetailModal activeEntry={activeEntry} archive={archive} onClose={() => setActiveEntry(null)} onUpdateNotes={updateNotes} onAddPhoto={addPhoto} onRemovePhoto={removePhoto} />
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // MOMENTS VIEW (Meanings)
  // ─────────────────────────────────────────────────────────────────────────────
  if (view === 'moments') {
    return (
      <div style={styles.shell}>
        {/* Badges Modal */}
        <BadgesModal isOpen={showBadgesView} onClose={() => setShowBadgesView(false)} archive={archive} showBadgePopups={showBadgePopups} onTogglePopups={() => setShowBadgePopups(!showBadgePopups)} setView={setView} />
        <ExportModal isOpen={showExport} onClose={() => setShowExport(false)} onExport={handleExport} archive={archive} speciesCount={speciesCount} momentsCount={meaningCount} badgeCount={badgeCount} />
        
        <div style={styles.container}>
          {/* Header */}
          <div style={{ marginBottom: 20 }}>
            <img src="/moments.png" alt="Moments & Expeditions" style={{ height: 'auto', width: '100%', maxWidth: 360, marginBottom: 8 }} />
            <p style={{ opacity: 0.6, fontSize: '14px', marginBottom: 12 }}>
              {meaningCount} moments recorded
            </p>
            <NavButtons {...navProps} />
          </div>
          
          {/* Search input */}
          <input
            type="text"
            placeholder="Search moments..."
            value={momentsSearch}
            onChange={(e) => setMomentsSearch(e.target.value)}
            style={{
              ...styles.input,
              marginBottom: spacing.md,
            }}
          />

          {/* Category filter toggle */}
          <div style={{ marginBottom: spacing.md }}>
            <button
              onClick={() => setShowMomentsFilters(!showMomentsFilters)}
              style={{
                ...styles.buttonGhost,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              {showMomentsFilters ? '▼' : '▶'} Filters
              {meaningCategoryFilter && (
                <span style={{ 
                  background: colors.accentLighter, 
                  padding: '2px 8px', 
                  borderRadius: radius.sm,
                  fontSize: '12px',
                }}>
                  {meaningCategoryFilter}
                </span>
              )}
              {experiencedFilter !== null && (
                <span style={{ 
                  background: colors.accentLighter, 
                  padding: '2px 8px', 
                  borderRadius: radius.sm,
                  fontSize: '12px',
                }}>
                  {experiencedFilter ? 'Experienced' : 'Not Experienced'}
                </span>
              )}
            </button>
          </div>

          {/* Category filters - collapsible */}
          {showMomentsFilters && (
            <div style={{ marginBottom: spacing.lg, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <button
                onClick={() => setMeaningCategoryFilter(null)}
                style={{
                  ...styles.buttonGhost,
                  background: !meaningCategoryFilter ? colors.accentLighter : 'transparent',
                  borderColor: !meaningCategoryFilter ? colors.borderAccent : 'transparent',
                }}
              >
                All
              </button>
              
              {/* Starred type filters */}
              <button
                onClick={() => setMeaningCategoryFilter(meaningCategoryFilter === '_moments' ? null : '_moments')}
                style={{
                  ...styles.buttonGhost,
                  background: meaningCategoryFilter === '_moments' ? 'rgba(255, 193, 7, 0.2)' : 'transparent',
                  borderColor: meaningCategoryFilter === '_moments' ? 'rgba(255, 193, 7, 0.5)' : 'transparent',
                  color: meaningCategoryFilter === '_moments' ? '#FFC107' : undefined,
                }}
              >
                ⭐ Moments
              </button>
              <button
                onClick={() => setMeaningCategoryFilter(meaningCategoryFilter === '_expeditions' ? null : '_expeditions')}
                style={{
                  ...styles.buttonGhost,
                  background: meaningCategoryFilter === '_expeditions' ? 'rgba(255, 193, 7, 0.2)' : 'transparent',
                  borderColor: meaningCategoryFilter === '_expeditions' ? 'rgba(255, 193, 7, 0.5)' : 'transparent',
                  color: meaningCategoryFilter === '_expeditions' ? '#FFC107' : undefined,
                }}
              >
                ⭐ Expeditions
              </button>

              {/* Separator */}
              <div style={{ width: '100%', height: 1, background: colors.border, margin: '4px 0' }} />

              {MEANING_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setMeaningCategoryFilter(meaningCategoryFilter === cat ? null : cat)}
                  style={{
                    ...styles.buttonGhost,
                    background: meaningCategoryFilter === cat ? colors.accentLighter : 'transparent',
                    borderColor: meaningCategoryFilter === cat ? colors.borderAccent : 'transparent',
                  }}
                >
                  {cat}
                </button>
              ))}
              
              {/* Separator */}
              <div style={{ width: '100%', height: 1, background: colors.border, margin: '4px 0' }} />
              
              {/* Experienced/Not Experienced filter */}
              <div style={{ width: '100%', display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: '12px', opacity: 0.6, marginRight: 4 }}>Status:</span>
                <button
                  onClick={() => setExperiencedFilter(null)}
                  style={{
                    ...styles.buttonGhost,
                    padding: '4px 12px',
                    fontSize: '12px',
                    background: experiencedFilter === null ? colors.accentLighter : 'transparent',
                    borderColor: experiencedFilter === null ? colors.borderAccent : 'transparent',
                  }}
                >
                  All
                </button>
                <button
                  onClick={() => setExperiencedFilter(true)}
                  style={{
                    ...styles.buttonGhost,
                    padding: '4px 12px',
                    fontSize: '12px',
                    background: experiencedFilter === true ? colors.accentLighter : 'transparent',
                    borderColor: experiencedFilter === true ? colors.borderAccent : 'transparent',
                  }}
                >
                  Experienced
                </button>
                <button
                  onClick={() => setExperiencedFilter(false)}
                  style={{
                    ...styles.buttonGhost,
                    padding: '4px 12px',
                    fontSize: '12px',
                    background: experiencedFilter === false ? colors.accentLighter : 'transparent',
                    borderColor: experiencedFilter === false ? colors.borderAccent : 'transparent',
                  }}
                >
                  Not Experienced
                </button>
              </div>
            </div>
          )}

          {/* Meanings Grid */}
          <div style={{ display: 'grid', gap: spacing.lg }}>
            {groupedMeanings.map(([category, meanings]) => {
              const isExpanded = expandedMomentsCategories[category];
              const recordedCount = meanings.filter(m => archive?.meanings[m.id]).length;
              
              return (
              <div key={category} style={{ ...styles.card, padding: spacing.md, ...(BADGE_LINKED_MEANING_CATEGORIES.has(category) ? { borderColor: "rgba(255, 193, 7, 0.4)", boxShadow: "0 0 8px rgba(255, 193, 7, 0.1)" } : {}) }}>
                <div 
                  onClick={() => toggleMomentsCategory(category)}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'baseline',
                    marginBottom: isExpanded ? spacing.md : 0,
                    cursor: 'pointer',
                  }}
                >
                  <h2 style={{ ...styles.sectionTitle, opacity: 0.9, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '12px' }}>{isExpanded ? '▼' : '▶'}</span>
                    {BADGE_LINKED_MEANING_CATEGORIES.has(category) && <span style={{ color: "#FFC107", fontSize: "14px" }}>⭐</span>}{category}
                  </h2>
                  <span style={{ opacity: 0.5, fontSize: '13px' }}>
                    {recordedCount}/{meanings.length}
                  </span>
                </div>

                {isExpanded && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
                  {meanings.map(meaning => (
                    <MomentCard
                      key={meaning.id}
                      meaning={meaning}
                      recorded={archive?.meanings[meaning.id]}
                      onRecord={() => recordMeaning(meaning)}
                      onEdit={() => setActiveEntry({ type: 'meanings', id: meaning.id, data: archive?.meanings[meaning.id] })}
                      expandedInfoId={expandedInfoId}
                      setExpandedInfoId={setExpandedInfoId}
                    />
                  ))}
                </div>
                )}
              </div>
              );
            })}
          </div>
        </div>

        <SupportFooter />

        <BadgePopup badge={badgePopup} onDismiss={() => setBadgePopup(null)} />

        <Toast message={toast.message} visible={toast.visible} />
        <EntryDetailModal activeEntry={activeEntry} archive={archive} onClose={() => setActiveEntry(null)} onUpdateNotes={updateNotes} onAddPhoto={addPhoto} onRemovePhoto={removePhoto} />
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // CUSTOM VIEW — User's own species, moments & expeditions
  // ─────────────────────────────────────────────────────────────────────────────
  if (view === 'custom') {
    const defaultCustom = {
      species: [
        { id: 'custom_species_1', name: '', description: '', photo: null, experienced: false, timestamp: null },
        { id: 'custom_species_2', name: '', description: '', photo: null, experienced: false, timestamp: null },
        { id: 'custom_species_3', name: '', description: '', photo: null, experienced: false, timestamp: null },
      ],
      moments: [
        { id: 'custom_moment_1', name: '', description: '', photo: null, experienced: false, timestamp: null },
        { id: 'custom_moment_2', name: '', description: '', photo: null, experienced: false, timestamp: null },
        { id: 'custom_moment_3', name: '', description: '', photo: null, experienced: false, timestamp: null },
      ],
      expeditions: [
        { id: 'custom_expedition_1', name: '', description: '', photo: null, experienced: false, timestamp: null },
        { id: 'custom_expedition_2', name: '', description: '', photo: null, experienced: false, timestamp: null },
        { id: 'custom_expedition_3', name: '', description: '', photo: null, experienced: false, timestamp: null },
      ],
    };
    const customData = {
      species: [0,1,2].map(i => archive?.custom?.species?.[i] || defaultCustom.species[i]),
      moments: [0,1,2].map(i => archive?.custom?.moments?.[i] || defaultCustom.moments[i]),
      expeditions: [0,1,2].map(i => archive?.custom?.expeditions?.[i] || defaultCustom.expeditions[i]),
    };

    const updateCustomEntry = (type, index, field, value) => {
      setArchive(prev => {
        const custom = {
          species: prev.custom?.species || defaultCustom.species,
          moments: prev.custom?.moments || defaultCustom.moments,
          expeditions: prev.custom?.expeditions || defaultCustom.expeditions,
        };
        const updatedItems = [...custom[type]];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        return { ...prev, custom: { ...custom, [type]: updatedItems } };
      });
    };

    const markAsExperienced = (type, index) => {
      const entry = customData[type][index];
      updateCustomEntry(type, index, 'experienced', true);
      updateCustomEntry(type, index, 'timestamp', new Date().toISOString());
      
      // Auto-create a badge/artifact if entry has a name
      if (entry.name.trim()) {
        const badgeId = `custom_${type}_badge_${index + 1}`;
        const customBadge = {
          id: badgeId,
          name: entry.name,
          description: entry.description || `Your custom ${type === 'species' ? 'species sighting' : type === 'moments' ? 'moment' : 'expedition'}`,
          icon: type === 'species' ? '🔍' : type === 'moments' ? '✨' : '🗺️',
          image: entry.photo || null,
          isCustom: true,
        };
        
        setArchive(prev => {
          const existingCustomBadges = (prev.customBadges || []).filter(b => b.id !== badgeId);
          const badges = prev.badges || [];
          return {
            ...prev,
            customBadges: [...existingCustomBadges, customBadge],
            badges: badges.includes(badgeId) ? badges : [...badges, badgeId],
          };
        });
        
        if (showBadgePopups) {
          setBadgePopup(customBadge);
        }
        showToast('Artifact earned! 🏆');
      } else {
        showToast('Entry recorded! 🎉');
      }
    };

    const undoExperienced = (type, index) => {
      const badgeId = `custom_${type}_badge_${index + 1}`;
      updateCustomEntry(type, index, 'experienced', false);
      updateCustomEntry(type, index, 'timestamp', null);
      // Remove the associated badge
      setArchive(prev => ({
        ...prev,
        customBadges: (prev.customBadges || []).filter(b => b.id !== badgeId),
        badges: (prev.badges || []).filter(id => id !== badgeId),
      }));
    };

    const handlePhotoUpload = async (type, index, e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const dataUrl = await readFileAsDataUrl(file);
        const compressed = await compressImage(dataUrl);
        updateCustomEntry(type, index, 'photo', compressed);
        
        // Update existing badge image if already experienced
        const entry = customData[type][index];
        if (entry.experienced) {
          const badgeId = `custom_${type}_badge_${index + 1}`;
          setArchive(prev => ({
            ...prev,
            customBadges: (prev.customBadges || []).map(b => 
              b.id === badgeId ? { ...b, image: compressed } : b
            ),
          }));
        }
        showToast('Photo added');
      } catch (err) {
        showToast('Failed to add photo');
      }
    };

    const removeCustomPhoto = (type, index) => {
      updateCustomEntry(type, index, 'photo', null);
      // Update badge too
      const badgeId = `custom_${type}_badge_${index + 1}`;
      setArchive(prev => ({
        ...prev,
        customBadges: (prev.customBadges || []).map(b => 
          b.id === badgeId ? { ...b, image: null } : b
        ),
      }));
    };

    const renderCustomCard = (entry, type, index) => {
      const isExperienced = entry.experienced;
      const typeLabels = { species: 'Species', moments: 'Moment', expeditions: 'Expedition' };
      const placeholderNames = { species: 'Species name...', moments: 'Moment name...', expeditions: 'Expedition name...' };
      const placeholderDescs = { 
        species: 'What made this sighting special?', 
        moments: 'Why was this moment meaningful?',
        expeditions: 'Describe your expedition...',
      };
      const markLabels = { species: '✓ Mark as Seen', moments: '✓ Mark as Experienced', expeditions: '✓ Mark as Complete' };
      
      return (
        <div
          key={entry.id}
          style={{
            ...styles.card,
            padding: spacing.lg,
            marginBottom: spacing.md,
            borderColor: isExperienced ? colors.borderAccent : colors.border,
            background: isExperienced ? 'rgba(139, 90, 43, 0.1)' : colors.cardBg,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.md }}>
            <span style={{ fontSize: '14px', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '1px' }}>
              {`Custom ${typeLabels[type]} ${index + 1}`}
            </span>
            {isExperienced && (
              <span style={{ 
                background: colors.accentLighter, 
                padding: '4px 10px', 
                borderRadius: radius.sm,
                fontSize: '12px',
                color: colors.accent,
              }}>
                ✓ Recorded
              </span>
            )}
          </div>

          {/* Name input */}
          <input
            type="text"
            placeholder={placeholderNames[type]}
            value={entry.name}
            onChange={(e) => updateCustomEntry(type, index, 'name', e.target.value)}
            disabled={isExperienced}
            style={{
              ...styles.input,
              marginBottom: spacing.sm,
              opacity: isExperienced ? 0.7 : 1,
            }}
          />

          {/* Description input */}
          <textarea
            placeholder={placeholderDescs[type]}
            value={entry.description}
            onChange={(e) => updateCustomEntry(type, index, 'description', e.target.value)}
            disabled={isExperienced}
            rows={2}
            style={{
              ...styles.input,
              marginBottom: spacing.md,
              resize: 'vertical',
              minHeight: 60,
              opacity: isExperienced ? 0.7 : 1,
            }}
          />

          {/* Photo section */}
          <div style={{ marginBottom: spacing.md }}>
            {entry.photo ? (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img 
                  src={entry.photo} 
                  alt="Custom entry" 
                  style={{ 
                    width: 120, 
                    height: 120, 
                    objectFit: 'cover', 
                    borderRadius: radius.md,
                    border: `1px solid ${colors.border}`,
                  }} 
                />
                {!isExperienced && (
                  <button
                    onClick={() => removeCustomPhoto(type, index)}
                    style={{
                      position: 'absolute',
                      top: -6,
                      right: -6,
                      background: 'rgba(220, 53, 69, 0.9)',
                      border: 'none',
                      borderRadius: '50%',
                      width: 28,
                      height: 28,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      color: '#fff',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            ) : !isExperienced ? (
              <label style={{ cursor: 'pointer' }}>
                <div style={{
                  ...styles.buttonGhost,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  📷 Add Photo
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(type, index, e)}
                  style={{ display: 'none' }}
                />
              </label>
            ) : null}
          </div>

          {/* Artifact badge indicator */}
          {isExperienced && entry.photo && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8, 
              marginBottom: spacing.md,
              padding: '8px 12px',
              background: 'rgba(255, 193, 7, 0.1)',
              border: '1px solid rgba(255, 193, 7, 0.3)',
              borderRadius: radius.sm,
              fontSize: '13px',
            }}>
              <span>🏆</span>
              <span style={{ color: '#FFC107' }}>Artifact earned — your photo is the badge!</span>
            </div>
          )}

          {/* Action buttons */}
          {!isExperienced ? (
            <button
              onClick={() => markAsExperienced(type, index)}
              disabled={!entry.name.trim()}
              style={{
                ...styles.buttonPrimary,
                opacity: entry.name.trim() ? 1 : 0.5,
                cursor: entry.name.trim() ? 'pointer' : 'not-allowed',
              }}
            >
              {markLabels[type]}
            </button>
          ) : (
            <button
              onClick={() => undoExperienced(type, index)}
              style={styles.buttonGhost}
            >
              ↩ Reset Entry
            </button>
          )}
        </div>
      );
    };

    return (
      <div style={styles.shell}>
        <BadgePopup badge={badgePopup} onDismiss={() => setBadgePopup(null)} />

        {/* Badges Modal */}
        <BadgesModal isOpen={showBadgesView} onClose={() => setShowBadgesView(false)} archive={archive} showBadgePopups={showBadgePopups} onTogglePopups={() => setShowBadgePopups(!showBadgePopups)} setView={setView} />
        <ExportModal isOpen={showExport} onClose={() => setShowExport(false)} onExport={handleExport} archive={archive} speciesCount={speciesCount} momentsCount={meaningCount} badgeCount={badgeCount} />
        
        <div style={styles.container}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
            <div>
              <img src="/own.png" alt="My Own" style={{ height: 'auto', width: '100%', maxWidth: 360, marginBottom: 8 }} />
              <p style={{ opacity: 0.6, fontSize: '14px' }}>
                Add your own species, moments and expeditions
              </p>
            </div>
            <NavButtons {...navProps} />
          </div>

          {/* Custom Species */}
          <div style={{ marginBottom: spacing.xl }}>
            <h2 style={{ ...styles.sectionTitle, marginBottom: spacing.md }}>
              🌟 Custom Species
            </h2>
            <p style={{ opacity: 0.5, fontSize: '14px', marginBottom: spacing.lg }}>
              Saw something special not on our list? Add it here.
            </p>
            {customData.species.map((entry, index) => renderCustomCard(entry, 'species', index))}
          </div>

          {/* Custom Moments */}
          <div style={{ marginBottom: spacing.xl }}>
            <h2 style={{ ...styles.sectionTitle, marginBottom: spacing.md }}>
              ✨ Custom Moments
            </h2>
            <p style={{ opacity: 0.5, fontSize: '14px', marginBottom: spacing.lg }}>
              Had a meaningful experience? Capture it here.
            </p>
            {customData.moments.map((entry, index) => renderCustomCard(entry, 'moments', index))}
          </div>

          {/* Custom Expeditions */}
          <div>
            <h2 style={{ ...styles.sectionTitle, marginBottom: spacing.md }}>
              🗺️ Custom Expeditions
            </h2>
            <p style={{ opacity: 0.5, fontSize: '14px', marginBottom: spacing.lg }}>
              Went on an unforgettable adventure? Record it here.
            </p>
            {customData.expeditions.map((entry, index) => renderCustomCard(entry, 'expeditions', index))}
          </div>
        </div>

        <SupportFooter />

        <Toast message={toast.message} visible={toast.visible} />
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // MEMORIES VIEW (Archive)
  // ─────────────────────────────────────────────────────────────────────────────
  if (view === 'memories') {
    // Get custom entries
    const customData = archive?.custom || { species: [], moments: [] };
    
    // Combine all entries and sort by timestamp
    const allEntries = [
      ...Object.entries(archive?.species || {})
        .filter(([_, v]) => v)
        .map(([id, data]) => ({
          type: 'species',
          id,
          data,
          item: SPECIES.find(s => s.id === id),
        })),
      ...Object.entries(archive?.meanings || {})
        .filter(([_, v]) => v)
        .map(([id, data]) => ({
          type: 'meanings',
          id,
          data,
          item: MEANINGS.find(m => m.id === id),
        })),
      // Add custom species
      ...(customData.species || [])
        .filter(entry => entry.experienced)
        .map(entry => ({
          type: 'custom_species',
          id: entry.id,
          data: { timestamp: entry.timestamp, notes: entry.description, photos: entry.photo ? [entry.photo] : [] },
          item: { name: entry.name, category: 'Custom Species', icon: '🌟' },
        })),
      // Add custom moments
      ...(customData.moments || [])
        .filter(entry => entry.experienced)
        .map(entry => ({
          type: 'custom_moment',
          id: entry.id,
          data: { timestamp: entry.timestamp, notes: entry.description, photos: entry.photo ? [entry.photo] : [] },
          item: { title: entry.name, subtitle: 'Custom Moment', icon: '✨' },
        })),
      // Add custom expeditions
      ...(customData.expeditions || [])
        .filter(entry => entry.experienced)
        .map(entry => ({
          type: 'custom_expedition',
          id: entry.id,
          data: { timestamp: entry.timestamp, notes: entry.description, photos: entry.photo ? [entry.photo] : [] },
          item: { title: entry.name, subtitle: 'Custom Expedition', icon: '🗺️' },
        })),
    ].sort((a, b) => new Date(b.data.timestamp) - new Date(a.data.timestamp));
    
    // Filter by search
    const filteredEntries = allEntries.filter(entry => {
      if (!archiveSearch) return true;
      const searchLower = archiveSearch.toLowerCase();
      const name = entry.type === 'species' || entry.type === 'custom_species' ? entry.item?.name : entry.item?.title;
      const category = entry.type === 'species' || entry.type === 'custom_species' ? entry.item?.category : entry.item?.subtitle;
      const notes = entry.data?.notes || '';
      return (
        name?.toLowerCase().includes(searchLower) ||
        category?.toLowerCase().includes(searchLower) ||
        notes.toLowerCase().includes(searchLower)
      );
    });

    return (
      <div style={styles.shell}>
        {/* Badges Modal */}
        <BadgesModal isOpen={showBadgesView} onClose={() => setShowBadgesView(false)} archive={archive} showBadgePopups={showBadgePopups} onTogglePopups={() => setShowBadgePopups(!showBadgePopups)} setView={setView} />
        <ExportModal isOpen={showExport} onClose={() => setShowExport(false)} onExport={handleExport} archive={archive} speciesCount={speciesCount} momentsCount={meaningCount} badgeCount={badgeCount} />
        
        <div style={styles.container}>
          {/* Header */}
          <div style={{ marginBottom: 20 }}>
            <img src="/archive.png" alt="Your Expedition Archive" style={{ height: 'auto', width: '100%', maxWidth: 360, marginBottom: 8 }} />
            <p style={{ opacity: 0.6, fontSize: '14px', marginBottom: 12 }}>
              {totalCount} memories • Started {formatDate(archive?.startDate)}
            </p>
            <NavButtons {...navProps} />
          </div>
          
          {/* Export + Search row */}
          <div style={{ display: 'flex', gap: 12, marginBottom: spacing.lg }}>
            <input
              type="text"
              placeholder="Search archive..."
              value={archiveSearch}
              onChange={(e) => setArchiveSearch(e.target.value)}
              style={{ ...styles.input, flex: 1 }}
            />
            <button
              onClick={() => setShowExport(true)}
              style={{
                ...styles.buttonSecondary,
                padding: '8px 14px',
                fontSize: '13px',
                whiteSpace: 'nowrap',
              }}
            >
              📄 Export
            </button>
          </div>

          {/* Story Marks Earned */}
          {earnedStories.length > 0 && (
            <div style={{ ...styles.card, padding: spacing.lg, marginBottom: spacing.lg, borderColor: colors.borderAccent }}>
              <h2 style={{ ...styles.serifHeading, fontSize: '20px', marginBottom: spacing.md, opacity: 0.9 }}>
                The Animals That Shaped Our Story
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {earnedStories.map(story => (
                  <div
                    key={story.id}
                    style={{
                      padding: '10px 18px',
                      borderRadius: radius.full,
                      background: colors.accentLighter,
                      border: `1px solid ${colors.borderAccent}`,
                      fontSize: '14px',
                      fontWeight: 500,
                    }}
                  >
                    {story.icon} {story.title}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline */}
          {filteredEntries.length === 0 ? (
            <div style={{ ...styles.card, padding: 60, textAlign: 'center' }}>
              <p style={{ opacity: 0.6 }}>
                {archiveSearch ? 'No results found.' : 'Your archive is empty. Start recording your wildlife trip experiences.'}
              </p>
              {!archiveSearch && (
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
                  <button onClick={() => setView('jungle')} style={styles.buttonPrimary}>
                    Record Species
                  </button>
                  <button onClick={() => setView('moments')} style={styles.buttonSecondary}>
                    Record Moments
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'grid', gap: spacing.md }}>
              {filteredEntries.map(entry => {
                if (!entry.item) return null;
                const isSpecies = entry.type === 'species' || entry.type === 'custom_species';
                const isCustom = entry.type === 'custom_species' || entry.type === 'custom_moment' || entry.type === 'custom_expedition';

                return (
                  <div
                    key={`${entry.type}-${entry.id}`}
                    onClick={() => !isCustom && setActiveEntry(entry)}
                    style={{ ...styles.card, padding: spacing.md, cursor: isCustom ? 'default' : 'pointer', transition: 'all 0.2s ease' }}
                  >
                    <div style={{ display: 'flex', gap: spacing.md }}>
                      {/* Icon/Photo */}
                      {entry.data.photos?.[0] ? (
                        <div
                          style={{
                            width: 80,
                            height: 80,
                            borderRadius: radius.md,
                            background: `url(${typeof entry.data.photos[0] === 'string' ? entry.data.photos[0] : entry.data.photos[0].data}) center/cover`,
                            border: `1px solid ${colors.borderLight}`,
                            flexShrink: 0,
                          }}
                        />
                      ) : (() => {
                        const badgeInfo = isCustom 
                          ? { icon: entry.item.icon || (isSpecies ? '🌟' : entry.type === 'custom_expedition' ? '🗺️' : '✨'), image: null }
                          : getBadgeForEntry(entry.id, entry.type);
                        return (
                          <div
                            style={{
                              width: 80,
                              height: 80,
                              borderRadius: radius.md,
                              background: isSpecies ? 'rgba(255, 255, 255, 0.04)' : colors.accentLighter,
                              border: `1px solid ${isSpecies ? colors.border : colors.borderAccent}`,
                              display: 'grid',
                              placeItems: 'center',
                              fontSize: '28px',
                              flexShrink: 0,
                              overflow: 'hidden',
                            }}
                          >
                            {badgeInfo.image && (
                              <img 
                                src={badgeInfo.image}
                                alt=""
                                onLoad={(e) => { e.target.nextSibling.style.display = 'none'; }}
                                onError={(e) => { e.target.style.display = 'none'; }}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            )}
                            <span>{badgeInfo.icon}</span>
                          </div>
                        );
                      })()}

                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '17px', fontWeight: 600, marginBottom: 4 }}>
                          {isSpecies ? entry.item.name : entry.item.title}
                        </div>
                        <div style={{ fontSize: '13px', opacity: 0.6, marginBottom: 10 }}>
                          {isSpecies ? entry.item.category : entry.item.subtitle}
                          {' • '}
                          {formatDate(entry.data.timestamp)}
                        </div>
                        {entry.data.notes && (
                          <div
                            style={{
                              fontFamily: fonts.serif,
                              fontSize: '15px',
                              fontStyle: 'italic',
                              opacity: 0.8,
                              lineHeight: 1.5,
                              overflow: 'hidden',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            "{entry.data.notes}"
                          </div>
                        )}
                      </div>

                      {/* Photo count badge */}
                      {entry.data.photos?.length > 1 && (
                        <div
                          style={{
                            padding: '4px 10px',
                            borderRadius: radius.full,
                            background: 'rgba(255, 255, 255, 0.08)',
                            fontSize: '12px',
                            alignSelf: 'flex-start',
                          }}
                        >
                          +{entry.data.photos.length - 1} photos
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <SupportFooter />

        <Toast message={toast.message} visible={toast.visible} />
        <EntryDetailModal activeEntry={activeEntry} archive={archive} onClose={() => setActiveEntry(null)} onUpdateNotes={updateNotes} onAddPhoto={addPhoto} onRemovePhoto={removePhoto} />
      </div>
    );
  }

  return null;
}
