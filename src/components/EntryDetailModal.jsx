// ═══════════════════════════════════════════════════════════════════════════════
// ENTRY DETAIL MODAL - Shows details of a species/moment entry
// ═══════════════════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useRef } from 'react';
import { SPECIES, MEANINGS } from '../data';
import { formatDate, formatTime } from '../utils/helpers';
import { styles, colors, radius, spacing } from '../styles/theme';

// ═══════════════════════════════════════════════════════════════════════════════
// NOTES TEXTAREA COMPONENT - Completely independent to prevent re-render issues
// ═══════════════════════════════════════════════════════════════════════════════
const NotesTextarea = ({ initialValue, onSave, placeholder }) => {
  const [value, setValue] = useState(initialValue || '');
  const timeoutRef = useRef(null);
  const isMounted = useRef(false);
  
  // Only set initial value on first mount
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    }
  }, []);
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    // Debounce save - longer delay to prevent jitter
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onSave(newValue);
    }, 2000); // Increased to 2 seconds
  };
  
  // Save on blur (when user clicks away)
  const handleBlur = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    onSave(value);
  };
  
  return (
    <textarea
      style={styles.textarea}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeholder}
    />
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ENTRY DETAIL MODAL
// ═══════════════════════════════════════════════════════════════════════════════
const EntryDetailModal = React.memo(({ 
  activeEntry, 
  archive, 
  onClose, 
  onUpdateNotes, 
  onAddPhoto, 
  onRemovePhoto 
}) => {
  if (!activeEntry || !archive) return null;
  
  const { type, id } = activeEntry;
  const data = archive[type]?.[id];
  const item = type === 'species'
    ? SPECIES.find(s => s.id === id)
    : MEANINGS.find(m => m.id === id);
  
  if (!item || !data) return null;

  const handleSaveNotes = (newValue) => {
    onUpdateNotes(type, id, newValue);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      await onAddPhoto(type, id, file);
      e.target.value = '';
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(20px)',
        zIndex: 90,
        overflowY: 'auto',
        padding: spacing.md,
      }}
      className="animate-fadeIn"
    >
      <div style={{ maxWidth: '680px', margin: '0 auto', paddingTop: '40px', paddingBottom: '60px' }}>
        {/* Back button */}
        <button
          onClick={onClose}
          style={{ ...styles.buttonSecondary, marginBottom: spacing.lg }}
        >
          ← Back
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: spacing.md, marginBottom: spacing.xl }}>
          {type === 'meanings' && (
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: radius.lg,
                background: colors.accentLighter,
                border: `1px solid ${colors.borderAccent}`,
                display: 'grid',
                placeItems: 'center',
                fontSize: '28px',
                flexShrink: 0,
              }}
            >
              {item.icon}
            </div>
          )}
          <div>
            <h1 style={{ ...styles.serifHeading, fontSize: '32px', margin: 0, lineHeight: 1.2 }}>
              {type === 'species' ? item.name : item.title}
            </h1>
            {type === 'species' ? (
              <div style={{ marginTop: 8, opacity: 0.7, fontSize: '14px' }}>
                {item.category} • {item.rarity}
                {item.endemic && ' • Endemic'}
                {item.nocturnal && ' • Nocturnal'}
              </div>
            ) : (
              <div style={{ marginTop: 8, opacity: 0.7, fontSize: '14px' }}>
                {item.subtitle}
              </div>
            )}
            <div style={{ marginTop: 6, opacity: 0.5, fontSize: '13px' }}>
              {formatDate(data.timestamp)} at {formatTime(data.timestamp)}
            </div>
          </div>
        </div>

        {/* Journal Prompt */}
        {data.prompt && (
          <div
            style={{
              ...styles.card,
              padding: '20px 24px',
              marginBottom: spacing.lg,
              borderColor: colors.borderAccent,
            }}
          >
            <div style={{ ...styles.serifHeading, fontSize: '18px', fontStyle: 'italic', opacity: 0.8 }}>
              "{data.prompt}"
            </div>
          </div>
        )}

        {/* Notes */}
        <div style={{ marginBottom: spacing.xl }}>
          <label style={styles.label}>Your Memory</label>
          <NotesTextarea
            key={`${type}-${id}`}
            initialValue={data.notes}
            onSave={handleSaveNotes}
            placeholder="Write what you remember..."
          />
        </div>

        {/* Photos */}
        <div>
          <label style={styles.label}>Photos</label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: spacing.md,
            }}
          >
            {data.photos?.map((photo, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  aspectRatio: '1',
                  borderRadius: radius.md,
                  overflow: 'hidden',
                }}
              >
                <img
                  src={photo.data}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                  onClick={() => onRemovePhoto(type, id, i)}
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.7)',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '16px',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  ×
                </button>
              </div>
            ))}

            <label
              style={{
                aspectRatio: '1',
                borderRadius: radius.md,
                border: `2px dashed ${colors.borderLight}`,
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
              }}
            >
              <div style={{ textAlign: 'center', opacity: 0.5 }}>
                <div style={{ fontSize: '28px', marginBottom: '4px' }}>+</div>
                <div style={{ fontSize: '12px' }}>Add Photo</div>
              </div>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handlePhotoUpload}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
});

export default EntryDetailModal;
