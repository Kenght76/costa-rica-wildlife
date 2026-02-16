import React from 'react';
import { getRarityColor } from '../utils/helpers';
import { BADGE_LINKED_SPECIES } from '../utils/badges';
import InfoPanel from './InfoPanel';
import { colors, radius } from '../styles/theme';

export default function SpeciesCard({ species, recorded, onRecord, onEdit, expandedInfoId, setExpandedInfoId }) {
  const rarityColor = getRarityColor(species.rarity);
  const isInfoOpen = expandedInfoId === `species-${species.id}`;

  return (
    <div
      style={{
        padding: '14px 16px',
        borderRadius: radius.md,
        background: recorded ? rarityColor.bg : 'rgba(255, 255, 255, 0.02)',
        border: `1px solid ${recorded ? rarityColor.border : colors.border}`,
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: 4 }}>
            {BADGE_LINKED_SPECIES.has(species.id) && <span style={{ color: "#FFC107", marginRight: 4 }}>⭐</span>}
            {species.name}
          </div>
          <div style={{ fontSize: '12px', opacity: 0.6, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ color: rarityColor.text }}>{species.rarity}</span>
            {species.endemic && <span>Endemic</span>}
            {species.nocturnal && <span>🌙 Nocturnal</span>}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => setExpandedInfoId(isInfoOpen ? null : `species-${species.id}`)}
            style={{
              padding: '8px 10px',
              borderRadius: radius.sm,
              border: `1px solid ${isInfoOpen ? 'rgba(255, 193, 7, 0.4)' : colors.borderLight}`,
              background: isInfoOpen ? 'rgba(255, 193, 7, 0.1)' : 'rgba(255, 255, 255, 0.05)',
              color: isInfoOpen ? '#FFC107' : 'rgba(255, 255, 255, 0.8)',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            ℹ️
          </button>
          {recorded && (
            <button
              onClick={onEdit}
              style={{
                padding: '8px 12px',
                borderRadius: radius.sm,
                border: `1px solid ${colors.borderLight}`,
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              Edit
            </button>
          )}
          <button
            onClick={onRecord}
            style={{
              padding: '8px 14px',
              borderRadius: radius.sm,
              border: `1px solid ${recorded ? rarityColor.border : colors.borderLight}`,
              background: recorded ? rarityColor.bg : 'rgba(255, 255, 255, 0.05)',
              color: recorded ? rarityColor.text : 'rgba(255, 255, 255, 0.8)',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              minWidth: 70,
            }}
          >
            {recorded ? 'Seen' : 'Not Seen'}
          </button>
        </div>
      </div>
      {isInfoOpen && <InfoPanel item={species} type="species" />}
    </div>
  );
}
