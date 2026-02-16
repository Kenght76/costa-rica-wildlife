// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT MODAL - Survey flow for PDF Memory Book customization
// ═══════════════════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { colors, radius, spacing } from '../styles/theme';

const ExportModal = ({ 
  isOpen, 
  onClose, 
  onExport, 
  archive,
  speciesCount,
  momentsCount,
  badgeCount,
}) => {
  // Load saved settings from localStorage
  const loadSavedSettings = () => {
    try {
      const saved = localStorage.getItem('cr_export_settings');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  };
  
  const saved = loadSavedSettings();
  
  // Step tracking
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  
  // Step 1: Basic Info (persisted)
  const [tripTitle, setTripTitle] = useState(saved?.tripTitle || 'Your Costa Rica Expedition');
  const [travelers, setTravelers] = useState(saved?.travelers || '');
  const [fromDate, setFromDate] = useState(saved?.fromDate || '');
  const [toDate, setToDate] = useState(saved?.toDate || '');
  const [expeditionGuide, setExpeditionGuide] = useState(saved?.expeditionGuide || '');
  const [occasion, setOccasion] = useState(saved?.occasion || '');
  const [dedication, setDedication] = useState(saved?.dedication || '');
  
  // Step 2: What to Include (persisted)
  const [includeSpecies, setIncludeSpecies] = useState(saved?.includeSpecies ?? true);
  const [includeMoments, setIncludeMoments] = useState(saved?.includeMoments ?? true);
  const [includeCustom, setIncludeCustom] = useState(saved?.includeCustom ?? true);
  const [includeSouvenirs, setIncludeSouvenirs] = useState(saved?.includeSouvenirs ?? true);
  const [includeStats, setIncludeStats] = useState(saved?.includeStats ?? true);
  const [includePrompts, setIncludePrompts] = useState(saved?.includePrompts ?? false);
  const [includeNotesPage, setIncludeNotesPage] = useState(saved?.includeNotesPage ?? true);
  const [includeEmptyEntries, setIncludeEmptyEntries] = useState(saved?.includeEmptyEntries ?? false);
  
  // Step 3: Layout Options (persisted)
  const [photoSize, setPhotoSize] = useState(saved?.photoSize || 'large');
  const [photosPerEntry, setPhotosPerEntry] = useState(saved?.photosPerEntry || 'all');
  const [grouping, setGrouping] = useState(saved?.grouping || 'chronological');
  
  // Step 4: Souvenirs Display (persisted)
  const [souvenirsDisplay, setSouvenirsDisplay] = useState(saved?.souvenirsDisplay || 'text');
  
  // Step 5: Stats Selection (persisted)
  const [statsAll, setStatsAll] = useState(saved?.statsAll ?? true);
  const [statsTotalSpecies, setStatsTotalSpecies] = useState(saved?.statsTotalSpecies ?? true);
  const [statsTotalMoments, setStatsTotalMoments] = useState(saved?.statsTotalMoments ?? true);
  const [statsTotalPhotos, setStatsTotalPhotos] = useState(saved?.statsTotalPhotos ?? true);
  const [statsSouvenirs, setStatsSouvenirs] = useState(saved?.statsSouvenirs ?? true);
  const [statsRarest, setStatsRarest] = useState(saved?.statsRarest ?? true);
  const [statsNightSpecies, setStatsNightSpecies] = useState(saved?.statsNightSpecies ?? true);
  const [statsBirds, setStatsBirds] = useState(saved?.statsBirds ?? true);
  const [statsAntelopes, setStatsAntelopes] = useState(saved?.statsAntelopes ?? true);
  const [statsCarnivores, setStatsCarnivores] = useState(saved?.statsCarnivores ?? true);
  const [statsBigFour, setStatsBigFour] = useState(saved?.statsBigFour ?? true);
  const [statsCustom, setStatsCustom] = useState(saved?.statsCustom ?? true);
  const [statsTimeOfDay, setStatsTimeOfDay] = useState(saved?.statsTimeOfDay ?? true);
  const [statsWildlifeTypes, setStatsWildlifeTypes] = useState(saved?.statsWildlifeTypes ?? true);
  const [statsTopCategories, setStatsTopCategories] = useState(saved?.statsTopCategories ?? true);
  
  // Step 6: Cover Page (persisted - except photo which is too large)
  const [coverType, setCoverType] = useState(saved?.coverType || 'default');
  const [customCoverPhoto, setCustomCoverPhoto] = useState(null); // Don't persist - too large
  
  // Save settings to localStorage whenever they change
  useEffect(() => {
    const settings = {
      tripTitle, travelers, fromDate, toDate, expeditionGuide, occasion, dedication,
      includeSpecies, includeMoments, includeCustom, includeSouvenirs, includeStats,
      includePrompts, includeNotesPage, includeEmptyEntries,
      photoSize, photosPerEntry, grouping,
      souvenirsDisplay,
      statsAll, statsTotalSpecies, statsTotalMoments, statsTotalPhotos, statsSouvenirs,
      statsRarest, statsNightSpecies, statsBirds, statsAntelopes, statsCarnivores,
      statsBigFour, statsCustom, statsTimeOfDay, statsWildlifeTypes, statsTopCategories,
      coverType,
    };
    try {
      localStorage.setItem('cr_export_settings', JSON.stringify(settings));
    } catch (e) {
      // Ignore storage errors
    }
  }, [
    tripTitle, travelers, fromDate, toDate, expeditionGuide, occasion, dedication,
    includeSpecies, includeMoments, includeCustom, includeSouvenirs, includeStats,
    includePrompts, includeNotesPage, includeEmptyEntries,
    photoSize, photosPerEntry, grouping,
    souvenirsDisplay,
    statsAll, statsTotalSpecies, statsTotalMoments, statsTotalPhotos, statsSouvenirs,
    statsRarest, statsNightSpecies, statsBirds, statsAntelopes, statsCarnivores,
    statsBigFour, statsCustom, statsTimeOfDay, statsWildlifeTypes, statsTopCategories,
    coverType,
  ]);
  
  // Reset to step 1 when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
    }
  }, [isOpen]);
  
  // Handle stats "All" toggle
  const handleStatsAllToggle = (checked) => {
    setStatsAll(checked);
    if (checked) {
      setStatsTotalSpecies(true);
      setStatsTotalMoments(true);
      setStatsTotalPhotos(true);
      setStatsSouvenirs(true);
      setStatsRarest(true);
      setStatsNightSpecies(true);
      setStatsBirds(true);
      setStatsAntelopes(true);
      setStatsCarnivores(true);
      setStatsBigFour(true);
      setStatsCustom(true);
      setStatsTimeOfDay(true);
      setStatsWildlifeTypes(true);
      setStatsTopCategories(true);
    }
  };
  
  // Handle cover photo upload
  const handleCoverPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomCoverPhoto(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Navigation
  const nextStep = () => {
    // Skip souvenirs step if not including souvenirs
    if (step === 3 && !includeSouvenirs) {
      setStep(5);
    } 
    // Skip stats step if not including stats
    else if (step === 4 && !includeStats) {
      setStep(6);
    }
    else if (step < totalSteps) {
      setStep(step + 1);
    }
  };
  
  const prevStep = () => {
    // Skip back over souvenirs step if not including souvenirs
    if (step === 5 && !includeSouvenirs) {
      setStep(3);
    }
    // Skip back over stats step if not including stats
    else if (step === 6 && !includeStats) {
      setStep(includeSouvenirs ? 4 : 3);
    }
    else if (step > 1) {
      setStep(step - 1);
    }
  };
  
  // Submit
  const handleExport = () => {
    console.log('ExportModal handleExport called');
    const options = {
      // Basic Info
      title: tripTitle,
      travelers,
      fromDate: fromDate || archive?.startDate,
      toDate: toDate || null,
      expeditionGuide,
      occasion,
      dedication,
      
      // What to Include
      includeSpecies,
      includeMoments,
      includeCustom,
      includeSouvenirs,
      includeStats,
      includePrompts,
      includeNotesPage,
      includeEmptyEntries,
      
      // Layout
      photoSize,
      photosPerEntry,
      grouping,
      
      // Souvenirs
      souvenirsDisplay,
      
      // Stats
      stats: {
        all: statsAll,
        totalSpecies: statsTotalSpecies,
        totalMoments: statsTotalMoments,
        totalPhotos: statsTotalPhotos,
        souvenirs: statsSouvenirs,
        rarest: statsRarest,
        nightSpecies: statsNightSpecies,
        birds: statsBirds,
        antelopes: statsAntelopes,
        carnivores: statsCarnivores,
        bigFour: statsBigFour,
        custom: statsCustom,
        timeOfDay: statsTimeOfDay,
        wildlifeTypes: statsWildlifeTypes,
        topCategories: statsTopCategories,
      },
      
      // Cover
      coverType,
      customCoverPhoto,
    };
    
    console.log('Calling onExport with options:', options);
    onExport(options);
  };
  
  if (!isOpen) return null;
  
  // Styles
  const modalOverlay = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: 20,
  };
  
  const modalContent = {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    maxWidth: 500,
    width: '100%',
    maxHeight: '85vh',
    overflow: 'auto',
    border: `1px solid ${colors.border}`,
  };
  
  const header = {
    padding: spacing.lg,
    borderBottom: `1px solid ${colors.border}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
  
  const body = {
    padding: spacing.lg,
  };
  
  const footer = {
    padding: spacing.lg,
    borderTop: `1px solid ${colors.border}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
  
  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: radius.md,
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.background,
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 12,
    colorScheme: 'dark', // Makes date picker icons/text white
  };
  
  // Special style for select dropdowns
  const selectStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: radius.md,
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.background,
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 12,
    colorScheme: 'dark',
  };
  
  const labelStyle = {
    display: 'block',
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  };
  
  const checkboxRow = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '8px 0',
    cursor: 'pointer',
  };
  
  const radioRow = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '8px 0',
    cursor: 'pointer',
  };
  
  const sectionTitle = {
    fontSize: 14,
    fontWeight: 600,
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  };
  
  const buttonPrimary = {
    padding: '10px 20px',
    borderRadius: radius.md,
    border: 'none',
    backgroundColor: '#1a1a1a',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
  };
  
  const buttonSecondary = {
    padding: '10px 20px',
    borderRadius: radius.md,
    border: `1px solid ${colors.border}`,
    backgroundColor: '#e5e5e5',
    color: '#1a1a1a',
    fontSize: 14,
    cursor: 'pointer',
  };
  
  const progressBar = {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  };
  
  const progressFill = {
    height: '100%',
    backgroundColor: colors.primary,
    width: `${(step / totalSteps) * 100}%`,
    transition: 'width 0.3s ease',
  };
  
  // Render steps
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3 style={{ margin: '0 0 16px', fontSize: 18 }}>Trip Details</h3>
            
            <label style={labelStyle}>Trip Title</label>
            <input
              type="text"
              value={tripTitle}
              onChange={(e) => setTripTitle(e.target.value)}
              placeholder="Your Costa Rica Expedition"
              style={inputStyle}
            />
            
            <label style={labelStyle}>Traveler Name(s)</label>
            <input
              type="text"
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              placeholder="The Smith Family"
              style={inputStyle}
            />
            
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>From Date</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>To Date</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
            
            <label style={labelStyle}>Expedition Guide (optional)</label>
            <input
              type="text"
              value={expeditionGuide}
              onChange={(e) => setExpeditionGuide(e.target.value)}
              placeholder="Guide's name"
              style={inputStyle}
            />
            
            <label style={labelStyle}>Occasion</label>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              style={inputStyle}
            >
              <option value="">Select occasion...</option>
              <option value="First Adventure">First Adventure</option>
              <option value="Honeymoon">Honeymoon</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Family Trip">Family Trip</option>
              <option value="Birthday">Birthday</option>
              <option value="Solo Adventure">Solo Adventure</option>
              <option value="Work Trip">Work Trip</option>
              <option value="Other">Other</option>
            </select>
            
            <label style={labelStyle}>Dedication (optional)</label>
            <input
              type="text"
              value={dedication}
              onChange={(e) => setDedication(e.target.value)}
              placeholder="For our first adventure together..."
              style={inputStyle}
            />
          </div>
        );
        
      case 2:
        return (
          <div>
            <h3 style={{ margin: '0 0 16px', fontSize: 18 }}>What to Include</h3>
            
            <label style={checkboxRow}>
              <input
                type="checkbox"
                checked={includeSpecies}
                onChange={(e) => setIncludeSpecies(e.target.checked)}
              />
              <span>Species Sightings ({speciesCount})</span>
            </label>
            
            <label style={checkboxRow}>
              <input
                type="checkbox"
                checked={includeMoments}
                onChange={(e) => setIncludeMoments(e.target.checked)}
              />
              <span>Moments & Experiences ({momentsCount})</span>
            </label>
            
            <label style={checkboxRow}>
              <input
                type="checkbox"
                checked={includeCustom}
                onChange={(e) => setIncludeCustom(e.target.checked)}
              />
              <span>Custom Entries</span>
            </label>
            
            <label style={checkboxRow}>
              <input
                type="checkbox"
                checked={includeSouvenirs}
                onChange={(e) => setIncludeSouvenirs(e.target.checked)}
              />
              <span>Souvenirs Section ({badgeCount} collected)</span>
            </label>
            
            <label style={checkboxRow}>
              <input
                type="checkbox"
                checked={includeStats}
                onChange={(e) => setIncludeStats(e.target.checked)}
              />
              <span>Stats Page</span>
            </label>
            
            <label style={checkboxRow}>
              <input
                type="checkbox"
                checked={includePrompts}
                onChange={(e) => setIncludePrompts(e.target.checked)}
              />
              <span>Journal Prompts (show prompts that inspired notes)</span>
            </label>
            
            <label style={checkboxRow}>
              <input
                type="checkbox"
                checked={includeNotesPage}
                onChange={(e) => setIncludeNotesPage(e.target.checked)}
              />
              <span>Blank Notes Page (for additional journaling)</span>
            </label>
            
            <label style={checkboxRow}>
              <input
                type="checkbox"
                checked={includeEmptyEntries}
                onChange={(e) => setIncludeEmptyEntries(e.target.checked)}
              />
              <span>Include entries without notes/photos</span>
            </label>
          </div>
        );
        
      case 3:
        return (
          <div>
            <h3 style={{ margin: '0 0 16px', fontSize: 18 }}>Layout Options</h3>
            
            <p style={sectionTitle}>Photo Size</p>
            <label style={radioRow}>
              <input
                type="radio"
                name="photoSize"
                checked={photoSize === 'large'}
                onChange={() => setPhotoSize('large')}
              />
              <span>Large (1 per page, cinematic)</span>
            </label>
            <label style={radioRow}>
              <input
                type="radio"
                name="photoSize"
                checked={photoSize === 'medium'}
                onChange={() => setPhotoSize('medium')}
              />
              <span>Medium</span>
            </label>
            <label style={radioRow}>
              <input
                type="radio"
                name="photoSize"
                checked={photoSize === 'small'}
                onChange={() => setPhotoSize('small')}
              />
              <span>Small (more compact)</span>
            </label>
            
            <p style={sectionTitle}>Photos per Entry</p>
            <label style={radioRow}>
              <input
                type="radio"
                name="photosPerEntry"
                checked={photosPerEntry === 'first'}
                onChange={() => setPhotosPerEntry('first')}
              />
              <span>First photo only</span>
            </label>
            <label style={radioRow}>
              <input
                type="radio"
                name="photosPerEntry"
                checked={photosPerEntry === 'all'}
                onChange={() => setPhotosPerEntry('all')}
              />
              <span>All photos</span>
            </label>
            
            <p style={sectionTitle}>Grouping</p>
            <label style={radioRow}>
              <input
                type="radio"
                name="grouping"
                checked={grouping === 'chronological'}
                onChange={() => setGrouping('chronological')}
              />
              <span>Chronological (by time)</span>
            </label>
            <label style={radioRow}>
              <input
                type="radio"
                name="grouping"
                checked={grouping === 'day'}
                onChange={() => setGrouping('day')}
              />
              <span>By Day (Day 1, Day 2...)</span>
            </label>
            <label style={radioRow}>
              <input
                type="radio"
                name="grouping"
                checked={grouping === 'category'}
                onChange={() => setGrouping('category')}
              />
              <span>By Category (Birds, Cats, etc.)</span>
            </label>
          </div>
        );
        
      case 4:
        return (
          <div>
            <h3 style={{ margin: '0 0 16px', fontSize: 18 }}>Souvenirs Display</h3>
            <p style={{ color: colors.textSecondary, fontSize: 13, marginBottom: 16 }}>
              How would you like your {badgeCount} souvenirs displayed?
            </p>
            
            <label style={radioRow}>
              <input
                type="radio"
                name="souvenirsDisplay"
                checked={souvenirsDisplay === 'images'}
                onChange={() => setSouvenirsDisplay('images')}
              />
              <span>Badge images + name + description</span>
            </label>
            <label style={radioRow}>
              <input
                type="radio"
                name="souvenirsDisplay"
                checked={souvenirsDisplay === 'text'}
                onChange={() => setSouvenirsDisplay('text')}
              />
              <span>Name + description only (no images)</span>
            </label>
          </div>
        );
        
      case 5:
        return (
          <div>
            <h3 style={{ margin: '0 0 16px', fontSize: 18 }}>Stats to Include</h3>
            
            <label style={{ ...checkboxRow, fontWeight: 600, borderBottom: `1px solid ${colors.border}`, paddingBottom: 12, marginBottom: 8 }}>
              <input
                type="checkbox"
                checked={statsAll}
                onChange={(e) => handleStatsAllToggle(e.target.checked)}
              />
              <span>All Stats</span>
            </label>
            
            <div style={{ paddingLeft: 20, opacity: statsAll ? 0.6 : 1 }}>
              <label style={checkboxRow}>
                <input
                  type="checkbox"
                  checked={statsTotalSpecies}
                  onChange={(e) => { setStatsTotalSpecies(e.target.checked); setStatsAll(false); }}
                  disabled={statsAll}
                />
                <span>Total Species</span>
              </label>
              
              <label style={checkboxRow}>
                <input
                  type="checkbox"
                  checked={statsTotalMoments}
                  onChange={(e) => { setStatsTotalMoments(e.target.checked); setStatsAll(false); }}
                  disabled={statsAll}
                />
                <span>Total Moments</span>
              </label>
              
              <label style={checkboxRow}>
                <input
                  type="checkbox"
                  checked={statsTotalPhotos}
                  onChange={(e) => { setStatsTotalPhotos(e.target.checked); setStatsAll(false); }}
                  disabled={statsAll}
                />
                <span>Total Photos</span>
              </label>
              
              <label style={checkboxRow}>
                <input
                  type="checkbox"
                  checked={statsSouvenirs}
                  onChange={(e) => { setStatsSouvenirs(e.target.checked); setStatsAll(false); }}
                  disabled={statsAll}
                />
                <span>Souvenirs Collected</span>
              </label>
              
              <label style={checkboxRow}>
                <input
                  type="checkbox"
                  checked={statsRarest}
                  onChange={(e) => { setStatsRarest(e.target.checked); setStatsAll(false); }}
                  disabled={statsAll}
                />
                <span>Rarest Sighting</span>
              </label>
              
              <label style={checkboxRow}>
                <input
                  type="checkbox"
                  checked={statsNightSpecies}
                  onChange={(e) => { setStatsNightSpecies(e.target.checked); setStatsAll(false); }}
                  disabled={statsAll}
                />
                <span>Night Species</span>
              </label>
              
              <label style={checkboxRow}>
                <input
                  type="checkbox"
                  checked={statsBirds}
                  onChange={(e) => { setStatsBirds(e.target.checked); setStatsAll(false); }}
                  disabled={statsAll}
                />
                <span>Birds</span>
              </label>
              
              <label style={checkboxRow}>
                <input
                  type="checkbox"
                  checked={statsAntelopes}
                  onChange={(e) => { setStatsAntelopes(e.target.checked); setStatsAll(false); }}
                  disabled={statsAll}
                />
                <span>Primates</span>
              </label>
              
              <label style={checkboxRow}>
                <input
                  type="checkbox"
                  checked={statsCarnivores}
                  onChange={(e) => { setStatsCarnivores(e.target.checked); setStatsAll(false); }}
                  disabled={statsAll}
                />
                <span>Carnivores</span>
              </label>
              
              <label style={checkboxRow}>
                <input
                  type="checkbox"
                  checked={statsBigFour}
                  onChange={(e) => { setStatsBigFour(e.target.checked); setStatsAll(false); }}
                  disabled={statsAll}
                />
                <span>Bucket List Progress</span>
              </label>
              
              <label style={checkboxRow}>
                <input
                  type="checkbox"
                  checked={statsCustom}
                  onChange={(e) => { setStatsCustom(e.target.checked); setStatsAll(false); }}
                  disabled={statsAll}
                />
                <span>Custom Entries</span>
              </label>
            </div>
            
            <p style={{ fontSize: 13, fontWeight: 600, color: colors.text, marginTop: 16, marginBottom: 8 }}>
              Charts & Visualizations
            </p>
            <p style={{ fontSize: 11, color: colors.textSecondary, marginBottom: 8 }}>
              Note: Time of Day chart uses when you logged each sighting
            </p>
            
            <div style={{ paddingLeft: 0 }}>
              <label style={checkboxRow}>
                <input
                  type="checkbox"
                  checked={statsTimeOfDay}
                  onChange={(e) => { setStatsTimeOfDay(e.target.checked); setStatsAll(false); }}
                  disabled={statsAll}
                />
                <span>📊 Time of Day Chart</span>
              </label>
              
              <label style={checkboxRow}>
                <input
                  type="checkbox"
                  checked={statsWildlifeTypes}
                  onChange={(e) => { setStatsWildlifeTypes(e.target.checked); setStatsAll(false); }}
                  disabled={statsAll}
                />
                <span>🥧 Wildlife Types (Mammals/Birds/Reptiles)</span>
              </label>
              
              <label style={checkboxRow}>
                <input
                  type="checkbox"
                  checked={statsTopCategories}
                  onChange={(e) => { setStatsTopCategories(e.target.checked); setStatsAll(false); }}
                  disabled={statsAll}
                />
                <span>📈 Top Categories</span>
              </label>
            </div>
          </div>
        );
        
      case 6:
        return (
          <div>
            <h3 style={{ margin: '0 0 16px', fontSize: 18 }}>Cover Page</h3>
            
            <label style={radioRow}>
              <input
                type="radio"
                name="coverType"
                checked={coverType === 'default'}
                onChange={() => setCoverType('default')}
              />
              <span>Classic design (no photo)</span>
            </label>
            
            <label style={radioRow}>
              <input
                type="radio"
                name="coverType"
                checked={coverType === 'custom'}
                onChange={() => setCoverType('custom')}
              />
              <span>Use my own cover photo</span>
            </label>
            
            {coverType === 'custom' && (
              <div style={{ marginTop: 16, padding: 16, backgroundColor: colors.background, borderRadius: radius.md }}>
                <p style={{ fontSize: 13, color: colors.textSecondary, marginBottom: 12 }}>
                  Your photo will be the cover background with your trip title and details overlaid.
                </p>
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverPhotoUpload}
                  style={{ marginBottom: 12 }}
                />
                
                {customCoverPhoto && (
                  <div style={{ marginTop: 12 }}>
                    <img 
                      src={customCoverPhoto} 
                      alt="Cover preview" 
                      style={{ 
                        width: '100%', 
                        maxHeight: 150, 
                        objectFit: 'cover',
                        borderRadius: radius.md,
                      }} 
                    />
                    <p style={{ fontSize: 12, color: colors.textSecondary, marginTop: 8 }}>
                      Preview of your cover photo
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div style={modalOverlay} onClick={onClose}>
      <div style={modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={header}>
          <div>
            <h2 style={{ margin: 0, fontSize: 20 }}>📖 Export Memory Book</h2>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: colors.textSecondary }}>
              Step {step} of {totalSteps}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 24,
              cursor: 'pointer',
              color: colors.textSecondary,
            }}
          >
            ×
          </button>
        </div>
        
        {/* Step indicators - clickable to go back */}
        <div style={{ 
          padding: `${spacing.sm}px ${spacing.lg}px`, 
          display: 'flex', 
          justifyContent: 'center',
          gap: 8,
          borderBottom: `1px solid ${colors.border}`,
        }}>
          {[1, 2, 3, 4, 5, 6].map((s) => {
            // Determine if this step should be shown (skip souvenirs/stats if not included)
            const isSkipped = (s === 4 && !includeSouvenirs) || (s === 5 && !includeStats);
            if (isSkipped) return null;
            
            const isCompleted = s < step;
            const isCurrent = s === step;
            const isClickable = s < step; // Can only go back
            
            const stepLabels = {
              1: 'Details',
              2: 'Content',
              3: 'Layout',
              4: 'Souvenirs',
              5: 'Stats',
              6: 'Cover',
            };
            
            return (
              <button
                key={s}
                onClick={() => isClickable && setStep(s)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  padding: '4px 8px',
                  border: 'none',
                  background: 'none',
                  cursor: isClickable ? 'pointer' : 'default',
                  opacity: isCurrent ? 1 : isCompleted ? 0.8 : 0.4,
                }}
              >
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 600,
                  backgroundColor: isCurrent ? colors.primary : isCompleted ? colors.success : colors.border,
                  color: isCurrent || isCompleted ? '#fff' : colors.textSecondary,
                }}>
                  {isCompleted ? '✓' : s}
                </div>
                <span style={{
                  fontSize: 10,
                  color: isCurrent ? colors.primary : colors.textSecondary,
                  fontWeight: isCurrent ? 600 : 400,
                }}>
                  {stepLabels[s]}
                </span>
              </button>
            );
          })}
        </div>
        
        {/* Progress bar */}
        <div style={{ padding: `0 ${spacing.lg}px`, paddingTop: spacing.md }}>
          <div style={progressBar}>
            <div style={progressFill} />
          </div>
        </div>
        
        {/* Body */}
        <div style={body}>
          {renderStep()}
        </div>
        
        {/* Footer */}
        <div style={footer}>
          <button
            onClick={step === 1 ? onClose : prevStep}
            style={buttonSecondary}
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          
          {step === totalSteps ? (
            <button onClick={handleExport} style={buttonPrimary}>
              Generate PDF
            </button>
          ) : (
            <button onClick={nextStep} style={buttonPrimary}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
