import React from 'react';
import { BADGE_LINKED_MEANINGS } from '../utils/badges';
import InfoPanel from './InfoPanel';
import { colors, radius } from '../styles/theme';

export default function MomentCard({ meaning, recorded, onRecord, onEdit, expandedInfoId, setExpandedInfoId }) {
  const isInfoOpen = expandedInfoId === `meaning-${meaning.id}`;

  return (
    <div
      style={{
        padding: '16px 18px',
        borderRadius: radius.md,
        background: recorded ? colors.accentLighter : 'rgba(255, 255, 255, 0.02)',
        border: `1px solid ${recorded ? colors.borderAccent : colors.border}`,
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, flex: 1, minWidth: 0 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: radius.md,
              background: recorded ? 'rgba(139, 90, 43, 0.2)' : 'rgba(255, 255, 255, 0.04)',
              display: 'grid',
              placeItems: 'center',
              fontSize: '20px',
              flexShrink: 0,
            }}
          >
            {meaning.icon}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: 3 }}>
              {BADGE_LINKED_MEANINGS.has(meaning.id) && <span style={{ color: "#FFC107", marginRight: 4 }}>⭐</span>}
              {meaning.title}
            </div>
            <div style={{ fontSize: '12px', opacity: 0.6, lineHeight: 1.4 }}>
              {meaning.subtitle}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0, alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', gap: 6 }}>
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
                border: `1px solid ${recorded ? colors.borderAccent : colors.borderLight}`,
                background: recorded ? colors.accentLighter : 'rgba(255, 255, 255, 0.05)',
                color: recorded ? 'rgba(212, 165, 116, 0.9)' : 'rgba(255, 255, 255, 0.8)',
                fontSize: '10px',
                fontWeight: 600,
                cursor: 'pointer',
                minWidth: 95,
              }}
            >
              {recorded ? 'Experienced' : 'Not Experienced'}
            </button>
          </div>
          <button
            onClick={() => setExpandedInfoId(isInfoOpen ? null : `meaning-${meaning.id}`)}
            style={{
              padding: '3px 10px',
              borderRadius: radius.sm,
              border: `1px solid ${isInfoOpen ? 'rgba(255, 193, 7, 0.4)' : colors.borderLight}`,
              background: isInfoOpen ? 'rgba(255, 193, 7, 0.1)' : 'rgba(255, 255, 255, 0.03)',
              color: isInfoOpen ? '#FFC107' : 'rgba(255, 255, 255, 0.5)',
              fontSize: '11px',
              cursor: 'pointer',
            }}
          >
            ℹ️ {isInfoOpen ? 'Hide' : 'Info'}
          </button>
        </div>
      </div>
      {isInfoOpen && <InfoPanel item={meaning} type="meaning" />}
    </div>
  );
}
