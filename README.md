# Costa Rica Wildlife Companion

A wildlife tracking app for Costa Rica - rainforests, cloud forests, and coasts.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Files to Complete

### From Flatdogs (copy and modify):
- `src/App.jsx` - Main app component (update colors, branding)
- `src/components/ExportModal.jsx` - PDF export modal
- `src/components/BadgesModal.jsx` - Badges display
- `src/components/EntryDetailModal.jsx` - Entry detail view
- `src/components/SpeciesInfoSheet.jsx` - Species info popup
- `src/utils/exportPDF.js` - PDF generation (update destination text)

### Already Created (Costa Rica specific):
- `src/data/species.js` - 180+ Costa Rica species
- `src/data/meanings.js` - 45+ moments/experiences
- `src/data/speciesBadges.js` - Species-based badges
- `src/data/momentsBadges.js` - Moment-based badges

### Need to Create:
- `src/data/animalFacts.js` - Facts for each species (for PDF)
- App icons in `public/icons/`

## Color Scheme (Rainforest Theme)
- Primary: #1a472a (dark green)
- Accent: #228b22 (forest green)
- Background: #0d1117 (dark)

## Deployment

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/costa-rica-wildlife.git
git push -u origin main
```

Then connect to Vercel for automatic deployments.
