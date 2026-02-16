import React from 'react';
import { getBadgesForItem } from '../utils/badges';
import { colors, radius } from '../styles/theme';

export default function InfoPanel({ item, type }) {
  const badges = getBadgesForItem(item.id, type);
  const hasBadge = badges.length > 0;
  
  return (
    <div style={{
      marginTop: 10,
      padding: '14px 16px',
      borderRadius: radius.md,
      background: 'rgba(255, 255, 255, 0.03)',
      border: `1px solid ${colors.border}`,
      fontSize: '13px',
      lineHeight: 1.6,
    }}>
      {/* Badge Connection */}
      <div style={{ marginBottom: item.description ? 12 : 0 }}>
        <div style={{ 
          fontWeight: 600, 
          fontSize: '11px', 
          textTransform: 'uppercase', 
          letterSpacing: '0.1em', 
          marginBottom: 6,
          color: hasBadge ? '#FFC107' : 'rgba(255,255,255,0.4)',
        }}>
          {hasBadge ? '⭐ Artifact Connection' : 'No Artifact Linked'}
        </div>
        {hasBadge ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {badges.map(badge => (
              <div key={badge.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 10px',
                borderRadius: radius.sm,
                background: 'rgba(255, 193, 7, 0.08)',
                border: '1px solid rgba(255, 193, 7, 0.2)',
              }}>
                <span style={{ fontSize: '18px' }}>{badge.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: '#FFC107' }}>{badge.name}</div>
                  <div style={{ fontSize: '11px', opacity: 0.6 }}>{badge.description}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ opacity: 0.4, fontSize: '12px' }}>
            This {type === 'species' ? 'species' : 'experience'} doesn't directly unlock an artifact, but every sighting counts toward milestone badges!
          </div>
        )}
      </div>

      {/* Fun Facts / Description */}
      {item.description && (
        <div>
          <div style={{ 
            fontWeight: 600, 
            fontSize: '11px', 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em', 
            marginBottom: 6,
            color: 'rgba(255,255,255,0.5)',
          }}>
            {type === 'species' ? '🔍 About This Species' : '📖 About This Experience'}
          </div>
          <div style={{ opacity: 0.7 }}>
            {item.description}
          </div>
        </div>
      )}
    </div>
  );
}
