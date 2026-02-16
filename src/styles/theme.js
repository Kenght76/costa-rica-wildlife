// ═══════════════════════════════════════════════════════════════════════════════
// COSTA RICA WILDLIFE COMPANION — Design Tokens
// Rainforest / Cloud Forest palette
// ═══════════════════════════════════════════════════════════════════════════════

export const fonts = {
  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
};

export const colors = {
  // Backgrounds
  background: '#0d1117',
  surface: '#151b23',
  cardBg: 'rgba(255, 255, 255, 0.04)',

  // Primary / Accent — lush green
  primary: '#228B22',
  accent: '#2E8B57',
  accentLighter: 'rgba(46, 139, 87, 0.15)',
  success: '#4CAF50',

  // Text
  text: 'rgba(255, 255, 255, 0.92)',
  textPrimary: 'rgba(255, 255, 255, 0.92)',
  textSecondary: 'rgba(255, 255, 255, 0.55)',

  // Borders
  border: 'rgba(255, 255, 255, 0.08)',
  borderLight: 'rgba(255, 255, 255, 0.12)',
  borderAccent: 'rgba(46, 139, 87, 0.35)',
};

export const spacing = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 40,
};

export const radius = {
  sm: 6,
  md: 12,
  lg: 16,
  full: 9999,
};

// ═══════════════════════════════════════════════════════════════════════════════
// REUSABLE STYLE OBJECTS
// ═══════════════════════════════════════════════════════════════════════════════

export const styles = {
  shell: {
    minHeight: '100dvh',
    background: colors.background,
    color: colors.text,
    fontFamily: fonts.sans,
  },

  container: {
    maxWidth: 540,
    margin: '0 auto',
    padding: `${spacing.md}px`,
  },

  card: {
    background: colors.cardBg,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.md,
  },

  pageTitle: {
    fontFamily: fonts.serif,
    fontSize: '36px',
    fontWeight: 600,
    lineHeight: 1.15,
    color: colors.textPrimary,
  },

  sectionTitle: {
    fontFamily: fonts.sans,
    fontSize: '13px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    color: colors.textSecondary,
  },

  serifHeading: {
    fontFamily: fonts.serif,
    fontWeight: 600,
    color: colors.textPrimary,
  },

  input: {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(255, 255, 255, 0.06)',
    border: `1px solid ${colors.border}`,
    borderRadius: radius.md,
    color: colors.textPrimary,
    fontFamily: fonts.sans,
    fontSize: '15px',
    outline: 'none',
  },

  textarea: {
    width: '100%',
    minHeight: 120,
    padding: '12px 16px',
    background: 'rgba(255, 255, 255, 0.06)',
    border: `1px solid ${colors.border}`,
    borderRadius: radius.md,
    color: colors.textPrimary,
    fontFamily: fonts.sans,
    fontSize: '15px',
    lineHeight: 1.6,
    resize: 'vertical',
    outline: 'none',
  },

  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },

  buttonPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '12px 24px',
    background: colors.accent,
    color: '#fff',
    border: 'none',
    borderRadius: radius.md,
    fontFamily: fonts.sans,
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },

  buttonSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '10px 20px',
    background: 'rgba(255, 255, 255, 0.06)',
    color: colors.textPrimary,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.md,
    fontFamily: fonts.sans,
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },

  buttonGhost: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 16px',
    background: 'transparent',
    color: colors.textSecondary,
    border: 'none',
    borderRadius: radius.md,
    fontFamily: fonts.sans,
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
  },
};
