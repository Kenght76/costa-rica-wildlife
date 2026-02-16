// ═══════════════════════════════════════════════════════════════════════════════
// SPECIES INFO SHEET - Bottom sheet panel for species facts
// Modern mobile-friendly slide-up panel
// ═══════════════════════════════════════════════════════════════════════════════

import React, { useEffect, useState } from 'react';
import { colors, radius, spacing } from '../styles/theme';
import { ANIMAL_FACTS } from '../data/animalFacts';

const SpeciesInfoSheet = ({ 
  isOpen, 
  onClose, 
  species, // { id, name, category, rarity, nocturnal, endemic, etc. }
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Handle open/close animations
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Small delay to trigger CSS transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before hiding
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  if (!isVisible || !species) return null;
  
  const factData = ANIMAL_FACTS[species.id];
  
  // Get facts array or fall back to single fact
  const facts = factData?.facts || (factData?.fact ? [factData.fact] : []);
  const scientific = factData?.scientific;
  const localInfo = factData?.local;
  
  // Styles
  const overlay = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: isAnimating ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0)',
    zIndex: 1100,
    transition: 'background-color 0.3s ease',
  };
  
  const sheet = {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '75vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 -10px 40px rgba(0,0,0,0.4)',
    transform: isAnimating ? 'translateY(0)' : 'translateY(100%)',
    transition: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
    zIndex: 1101,
  };
  
  const handle = {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    margin: '12px auto 8px',
    cursor: 'pointer',
  };
  
  const header = {
    padding: `0 ${spacing.lg}px ${spacing.md}px`,
    borderBottom: `1px solid ${colors.border}`,
    flexShrink: 0,
  };
  
  const body = {
    padding: spacing.lg,
    overflowY: 'auto',
    flex: 1,
  };
  
  const factBox = {
    padding: spacing.md,
    backgroundColor: 'rgba(139, 90, 43, 0.08)',
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    borderLeft: `3px solid ${colors.accent}`,
  };
  
  const localBox = {
    padding: spacing.md,
    backgroundColor: 'rgba(76, 132, 168, 0.1)',
    borderRadius: radius.md,
    marginTop: spacing.md,
    borderLeft: `3px solid #4C84A8`,
  };
  
  const badge = {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: radius.sm,
    fontSize: 11,
    fontWeight: 600,
    marginRight: 6,
    marginBottom: 6,
  };
  
  const rarityColors = {
    'Common': { bg: 'rgba(100, 100, 100, 0.2)', color: '#888' },
    'Uncommon': { bg: 'rgba(76, 132, 168, 0.2)', color: '#4C84A8' },
    'Rare': { bg: 'rgba(139, 90, 43, 0.2)', color: '#D4A574' },
    'Legendary': { bg: 'rgba(212, 165, 116, 0.3)', color: '#FFD700' },
  };
  
  const rarityStyle = rarityColors[species.rarity] || rarityColors['Common'];
  
  return (
    <>
      {/* Overlay */}
      <div style={overlay} onClick={onClose} />
      
      {/* Bottom Sheet */}
      <div style={sheet}>
        {/* Drag Handle */}
        <div style={handle} onClick={onClose} />
        
        {/* Header */}
        <div style={header}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: colors.text }}>
                {species.name}
              </h2>
              
              {scientific && (
                <p style={{ 
                  margin: '4px 0 0', 
                  fontSize: 14, 
                  fontStyle: 'italic',
                  color: colors.textSecondary 
                }}>
                  {scientific}
                </p>
              )}
            </div>
            
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: colors.textSecondary,
                fontSize: 18,
                flexShrink: 0,
                marginLeft: 12,
              }}
            >
              ×
            </button>
          </div>
          
          <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap' }}>
            <span style={{ 
              ...badge, 
              backgroundColor: rarityStyle.bg, 
              color: rarityStyle.color 
            }}>
              {species.rarity}
            </span>
            
            <span style={{ 
              ...badge, 
              backgroundColor: 'rgba(139, 90, 43, 0.15)', 
              color: colors.accent 
            }}>
              {species.category}
            </span>
            
            {species.nocturnal && (
              <span style={{ 
                ...badge, 
                backgroundColor: 'rgba(62, 39, 35, 0.2)', 
                color: '#8B7355' 
              }}>
                🌙 Nocturnal
              </span>
            )}
            
            {species.endemic && (
              <span style={{ 
                ...badge, 
                backgroundColor: 'rgba(212, 165, 116, 0.2)', 
                color: '#D4A574' 
              }}>
                ⭐ Costa Rica Endemic
              </span>
            )}
            
            {species.greenSeason && (
              <span style={{ 
                ...badge, 
                backgroundColor: 'rgba(107, 142, 35, 0.2)', 
                color: '#9ACD32' 
              }}>
                🌿 Green Season
              </span>
            )}
          </div>
        </div>
        
        {/* Body */}
        <div style={body}>
          {facts.length > 0 ? (
            <>
              <h3 style={{ 
                margin: '0 0 12px', 
                fontSize: 12, 
                fontWeight: 600,
                color: colors.textSecondary,
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}>
                Did You Know?
              </h3>
              
              {facts.map((fact, i) => (
                <div key={i} style={factBox}>
                  <p style={{ 
                    margin: 0, 
                    fontSize: 14, 
                    lineHeight: 1.6,
                    color: colors.text,
                  }}>
                    {fact}
                  </p>
                </div>
              ))}
            </>
          ) : (
            <p style={{ color: colors.textSecondary, fontStyle: 'italic' }}>
              No facts available for this species yet.
            </p>
          )}
          
          {localInfo && (
            <div style={localBox}>
              <h4 style={{ 
                margin: '0 0 8px', 
                fontSize: 11, 
                fontWeight: 600,
                color: '#4C84A8',
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}>
                📍 In Costa Rica
              </h4>
              <p style={{ 
                margin: 0, 
                fontSize: 13, 
                lineHeight: 1.5,
                color: colors.text,
              }}>
                {localInfo}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SpeciesInfoSheet;
