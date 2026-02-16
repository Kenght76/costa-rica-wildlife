// ═══════════════════════════════════════════════════════════════════════════════
// BADGES MODAL - Shows all artifacts/badges
// ═══════════════════════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import { BADGES, getEarnedBadges } from '../data/index.js';
import { styles, colors, radius, spacing } from '../styles/theme';

const BadgesModal = ({ 
  isOpen, 
  onClose, 
  archive, 
  showBadgePopups, 
  onTogglePopups,
  setView 
}) => {
  const [badgeSearch, setBadgeSearch] = useState('');
  
  if (!isOpen) return null;
  
  const earnedBadges = getEarnedBadges(archive);
  const earnedIds = archive?.badges || [];
  const customBadges = archive?.customBadges || [];
  
  // Filter badges by search
  const filteredBadges = BADGES.filter(badge => 
    badge.name.toLowerCase().includes(badgeSearch.toLowerCase()) ||
    badge.description.toLowerCase().includes(badgeSearch.toLowerCase())
  );
  
  const filteredCustomBadges = customBadges.filter(badge =>
    badge.name.toLowerCase().includes(badgeSearch.toLowerCase()) ||
    badge.description.toLowerCase().includes(badgeSearch.toLowerCase())
  );
  
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(10px)',
        zIndex: 150,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: spacing.md,
        overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <div
        style={{
          ...styles.card,
          padding: spacing.lg,
          maxWidth: 500,
          width: '100%',
          marginTop: spacing.xl,
          marginBottom: spacing.xl,
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
          <img 
            src="/artifacts.png" 
            alt="Artifacts" 
            style={{ height: 'auto', width: '100%' }}
          />
        </div>

        {/* Navigation */}
        {setView && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: spacing.md }}>
            {[
              { label: '← Home', view: 'home', color: '#FF8C00' },
              { label: 'Jungle', view: 'jungle', color: '#66BB6A' },
              { label: 'Beach', view: 'beach', color: '#4FC3F7' },
              { label: 'Moments', view: 'moments', color: '#FFB74D' },
              { label: 'Archive', view: 'memories', color: '#9C27B0' },
              { label: 'My Own', view: 'custom', color: '#EF5350' },
            ].map(nav => (
              <button
                key={nav.view}
                onClick={() => { onClose(); setView(nav.view); }}
                style={{ ...styles.buttonSecondary, padding: '8px 14px', fontSize: '13px', color: nav.color }}
              >
                {nav.label}
              </button>
            ))}
          </div>
        )}
        
        {/* Search input */}
        <input
          type="text"
          placeholder="Search artifacts..."
          value={badgeSearch}
          onChange={(e) => setBadgeSearch(e.target.value)}
          style={{
            ...styles.input,
            marginBottom: spacing.md,
          }}
        />
        
        <p style={{ opacity: 0.6, fontSize: '14px', marginBottom: spacing.lg }}>
          {earnedBadges.length + customBadges.length} of {BADGES.length + customBadges.length} artifacts earned
        </p>
        
        {/* Custom Badges Section */}
        {filteredCustomBadges.length > 0 && (
          <>
            <div style={{ 
              fontSize: '11px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em', 
              opacity: 0.5, 
              marginBottom: spacing.sm,
              paddingBottom: spacing.sm,
              borderBottom: `1px solid ${colors.border}`,
            }}>
              Your Own Artifacts
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md, marginBottom: spacing.lg }}>
              {filteredCustomBadges.map(badge => (
                <div
                  key={badge.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.md,
                    padding: spacing.md,
                    background: 'rgba(239, 83, 80, 0.12)',
                    borderRadius: radius.md,
                    border: '1px solid rgba(239, 83, 80, 0.3)',
                  }}
                >
                  {badge.image ? (
                    <img 
                      src={badge.image} 
                      alt={badge.name}
                      style={{ 
                        width: 48, 
                        height: 48, 
                        objectFit: 'cover',
                        borderRadius: radius.sm,
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: '32px' }}>{badge.icon}</div>
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      fontWeight: 600, 
                      marginBottom: 2,
                      color: '#EF5350',
                    }}>
                      {badge.name}
                    </div>
                    <div style={{ fontSize: '13px', opacity: 0.7 }}>
                      {badge.description}
                    </div>
                  </div>
                  <div style={{ color: '#EF5350', fontSize: '20px' }}>✓</div>
                </div>
              ))}
            </div>
          </>
        )}
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
          {filteredBadges.map(badge => {
            const isEarned = earnedIds.includes(badge.id);
            return (
              <div
                key={badge.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.md,
                  padding: spacing.md,
                  background: isEarned ? 'rgba(139, 90, 43, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  borderRadius: radius.md,
                  border: `1px solid ${isEarned ? 'rgba(212, 175, 130, 0.3)' : colors.border}`,
                  opacity: isEarned ? 1 : 0.5,
                }}
              >
                {badge.image && (
                  <img 
                    src={badge.image} 
                    alt={badge.name}
                    onLoad={(e) => { if (e.target.nextSibling) e.target.nextSibling.style.display = 'none'; }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                    style={{ 
                      width: 48, 
                      height: 48, 
                      objectFit: 'contain',
                      filter: isEarned ? 'none' : 'grayscale(100%)',
                    }}
                  />
                )}
                <div style={{ 
                  fontSize: '32px',
                  filter: isEarned ? 'none' : 'grayscale(100%)',
                }}>
                  {badge.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontWeight: 600, 
                    marginBottom: 2,
                    color: isEarned ? colors.accent : colors.textPrimary,
                  }}>
                    {badge.starred && <span style={{ marginRight: 4 }}>⭐</span>}
                    {badge.name}
                  </div>
                  <div style={{ fontSize: '13px', opacity: 0.7 }}>
                    {badge.description}
                  </div>
                </div>
                {isEarned && (
                  <div style={{ color: colors.accent, fontSize: '20px' }}>✓</div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Badge Popup Toggle */}
        <div style={{ 
          marginTop: spacing.lg, 
          paddingTop: spacing.md,
          borderTop: `1px solid ${colors.border}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ fontSize: '14px', opacity: 0.8 }}>
            Show celebration popups
          </span>
          <button
            onClick={onTogglePopups}
            style={{
              width: 50,
              height: 28,
              borderRadius: 14,
              border: 'none',
              background: showBadgePopups ? colors.accent : 'rgba(255,255,255,0.2)',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background 0.2s',
            }}
          >
            <div style={{
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: '#fff',
              position: 'absolute',
              top: 3,
              left: showBadgePopups ? 25 : 3,
              transition: 'left 0.2s',
            }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BadgesModal;
