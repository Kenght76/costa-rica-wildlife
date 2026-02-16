import React from 'react';
import { colors, radius, fonts } from '../styles/theme';

export default function Toast({ message, visible }) {
  if (!visible || !message) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 12,
        left: '50%',
        transform: 'translateX(-50%)',
        whiteSpace: 'nowrap',
        padding: '12px 24px',
        borderRadius: radius.full,
        background: 'rgba(0, 0, 0, 0.85)',
        border: `1px solid ${colors.borderAccent}`,
        color: colors.textPrimary,
        fontFamily: fonts.sans,
        fontSize: '14px',
        fontWeight: 500,
        zIndex: 100,
        animation: 'fadeInUp 0.3s ease-out',
        pointerEvents: 'none',
      }}
    >
      {message}
    </div>
  );
}
