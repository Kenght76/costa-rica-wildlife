import React from 'react';
import { styles } from '../styles/theme';

export default function NavButtons({ view, setView, setShowBadgesView }) {
  const btn = { ...styles.buttonSecondary, padding: '8px 14px', fontSize: '13px' };
  const grad = (from, to) => ({
    ...btn,
    background: `linear-gradient(135deg, ${from}, ${to})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    border: `1px solid ${from}33`,
  });
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {view !== 'home' && (
        <button onClick={() => setView('home')} style={grad('#FFB347', '#FF6B00')}>
          ← Home
        </button>
      )}
      {view !== 'jungle' && (
        <button onClick={() => setView('jungle')} style={grad('#81C784', '#2E7D32')}>
          Jungle
        </button>
      )}
      {view !== 'beach' && (
        <button onClick={() => setView('beach')} style={grad('#4FC3F7', '#0277BD')}>
          Beach
        </button>
      )}
      {view !== 'moments' && (
        <button onClick={() => setView('moments')} style={grad('#FFD54F', '#F57C00')}>
          Moments
        </button>
      )}
      {view !== 'memories' && (
        <button onClick={() => setView('memories')} style={grad('#CE93D8', '#7B1FA2')}>
          Archive
        </button>
      )}
      {view !== 'custom' && (
        <button onClick={() => setView('custom')} style={grad('#EF5350', '#B71C1C')}>
          My Own
        </button>
      )}
      <button onClick={() => setShowBadgesView(true)} style={grad('#FFD700', '#FF8F00')}>
        Artifacts
      </button>
    </div>
  );
}
