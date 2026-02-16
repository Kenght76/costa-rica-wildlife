import React from 'react';
import BadgeMedia from './BadgeMedia';
import { colors, spacing, radius, styles } from '../styles/theme';

export default function BadgePopup({ badge, onDismiss }) {
  if (!badge) return null;
  
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.sm,
        animation: 'fadeIn 0.3s ease',
      }}
      onClick={onDismiss}
    >
      <div
        style={{
          background: `linear-gradient(180deg, rgba(40, 40, 40, 0.98) 0%, rgba(20, 20, 20, 0.99) 100%)`,
          border: `2px solid rgba(100, 100, 100, 0.4)`,
          borderRadius: radius.lg,
          padding: spacing.sm,
          maxWidth: 520,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)',
          animation: 'scaleIn 0.4s ease',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.6, marginBottom: spacing.md }}>
          Artifact!
        </div>

        {/* Badge image with frame overlay */}
        <div style={{ 
          position: 'relative', 
          width: '100%',
          maxWidth: 480,
          margin: '0 auto',
          marginBottom: spacing.md,
          aspectRatio: '1',
        }}>
          {/* Badge image behind */}
          <div style={{ 
            position: 'absolute', 
            top: '20%',
            left: '20%',
            right: '20%',
            bottom: '20%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
            {badge.image ? (
              <img src={badge.image} alt={badge.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ fontSize: 80 }}>{badge.icon}</div>
            )}
          </div>
          {/* Frame on top */}
          <img 
            src="/badge-frame.png" 
            alt="" 
            style={{ 
              position: 'relative',
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              zIndex: 1,
              pointerEvents: 'none',
            }} 
          />
        </div>

        <h2 style={{ 
          ...styles.serifHeading, 
          fontSize: '28px', 
          marginBottom: spacing.sm,
          color: colors.accent,
        }}>
          {badge.name}
        </h2>
        <p style={{ opacity: 0.7, fontSize: '15px', marginBottom: spacing.lg }}>
          {badge.description}
        </p>
        <button
          onClick={onDismiss}
          style={{
            background: 'rgba(60, 60, 60, 0.9)',
            color: '#fff',
            border: '1px solid rgba(100, 100, 100, 0.5)',
            borderRadius: '8px',
            padding: '14px 28px',
            fontSize: '16px',
            fontWeight: 500,
            cursor: 'pointer',
            width: '100%',
          }}
        >
          ← Back to Expedition
        </button>
      </div>
    </div>
  );
}
