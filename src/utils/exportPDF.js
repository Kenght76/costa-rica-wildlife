// ═══════════════════════════════════════════════════════════════════════════════
// COSTA RICA MEMORY BOOK PDF EXPORT - V3
// Full-featured PDF generation with survey options support
// ═══════════════════════════════════════════════════════════════════════════════

import { jsPDF } from 'jspdf';
import { ANIMAL_FACTS, MOMENT_FACTS, DESTINATION_INTRO } from '../data/animalFacts';

// Design constants - Jungle expedition + ancient ruins theme
const COLORS = {
  // Page background — aged parchment with green tint
  cream: '#EDF2E8',
  creamRGB: [237, 242, 232],
  // Primary text — deep jungle canopy
  brown: '#1A3328',
  brownRGB: [26, 51, 40],
  // Headlines — darkest jungle shadow
  darkBrown: '#0C1F14',
  darkBrownRGB: [12, 31, 20],
  // Accent — living green (fern/moss)
  accent: '#2D7A4F',
  accentRGB: [45, 122, 79],
  // Light accent — misty jungle
  lightAccent: '#B8CFBA',
  lightAccentRGB: [184, 207, 186],
  // Gold replaced with aged bronze/moss — ancient artifact feel
  gold: '#5C8A4D',
  goldRGB: [92, 138, 77],
  // Keep a warm bronze for special elements
  bronze: '#8B7355',
  bronzeRGB: [139, 115, 85],
  // Flag colors
  flagBlue: '#002B7F',
  flagBlueRGB: [0, 43, 127],
  flagRed: '#CE1126',
  flagRedRGB: [206, 17, 38],
  white: '#FFFFFF',
  whiteRGB: [255, 255, 255],
};

// Page dimensions (A4 in mm)
const PAGE = {
  width: 210,
  height: 297,
  margin: 20,
  contentWidth: 170,
};

// Triangle helper — jsPDF doesn't have a native triangle method
// We polyfill it using the internal API
const ensureTriangle = (pdf) => {
  if (!pdf.triangle) {
    pdf.triangle = (x1, y1, x2, y2, x3, y3, style) => {
      // Use internal path drawing
      const ctx = pdf.context2d || null;
      // Fallback: draw 3 lines + fill using rect workaround
      // Actually use the pdf.lines method which IS available
      pdf.lines(
        [[x2 - x1, y2 - y1], [x3 - x2, y3 - y2], [x1 - x3, y1 - y3]],
        x1, y1, [1, 1], style, true
      );
    };
  }
};

// Costa Rica Flag - blue/white/red/white/blue horizontal stripes
const drawCostaRicaFlag = (pdf, x, y, width, height) => {
  const stripeH = height / 5;
  // Blue
  pdf.setFillColor(0, 43, 127);
  pdf.rect(x, y, width, stripeH, 'F');
  // White
  pdf.setFillColor(255, 255, 255);
  pdf.rect(x, y + stripeH, width, stripeH, 'F');
  // Red (double height)
  pdf.setFillColor(206, 17, 38);
  pdf.rect(x, y + stripeH * 2, width, stripeH, 'F');
  // White
  pdf.setFillColor(255, 255, 255);
  pdf.rect(x, y + stripeH * 3, width, stripeH, 'F');
  // Blue
  pdf.setFillColor(0, 43, 127);
  pdf.rect(x, y + stripeH * 4, width, stripeH, 'F');
};

// Leaf divider — jungle vine with tiny leaves
const drawLeafDivider = (pdf, y) => {
  const cx = PAGE.width / 2;
  pdf.setDrawColor(...COLORS.accentRGB);
  pdf.setLineWidth(0.5);
  pdf.line(cx - 35, y, cx + 35, y);
  // Tiny leaf dots — like seeds on a vine
  pdf.setFillColor(...COLORS.goldRGB);
  [-25, -12, 0, 12, 25].forEach(offset => {
    pdf.circle(cx + offset, y, 1, 'F');
  });
};

// App logo — ancient stone tablet with jungle vines
const drawLogo = (pdf, x, y, width) => {
  const scale = width / 100;
  const centerX = x + width / 2;
  
  // Vine line top
  pdf.setDrawColor(...COLORS.accentRGB);
  pdf.setLineWidth(0.8);
  pdf.line(centerX - 35 * scale, y + 3 * scale, centerX + 35 * scale, y + 3 * scale);
  
  // Leaf dots along vine
  pdf.setFillColor(...COLORS.goldRGB);
  [-30, -15, 0, 15, 30].forEach(offset => {
    pdf.circle(centerX + offset * scale, y + 3 * scale, 1.2 * scale, 'F');
  });
  
  // Main title — ancient carved stone feel
  pdf.setFont('times', 'bold');
  pdf.setFontSize(Math.max(24, 28 * scale));
  pdf.setTextColor(...COLORS.darkBrownRGB);
  pdf.text('COSTA RICA', centerX, y + 20 * scale, { align: 'center' });
  
  // Subtitle — etched in moss
  pdf.setFontSize(Math.max(9, 11 * scale));
  pdf.setTextColor(...COLORS.accentRGB);
  pdf.text('W I L D L I F E   C O M P A N I O N', centerX, y + 28 * scale, { align: 'center' });
  
  // Bottom vine
  pdf.setDrawColor(...COLORS.accentRGB);
  pdf.setLineWidth(0.8);
  pdf.line(centerX - 35 * scale, y + 33 * scale, centerX + 35 * scale, y + 33 * scale);
  pdf.setFillColor(...COLORS.goldRGB);
  [-30, -15, 0, 15, 30].forEach(offset => {
    pdf.circle(centerX + offset * scale, y + 33 * scale, 1.2 * scale, 'F');
  });
  
  return 40 * scale;
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

// Sanitize text to remove problematic characters that jsPDF can't render
const sanitizeText = (text) => {
  if (!text) return '';
  return text
    // Replace common problematic characters
    .replace(/[\u2018\u2019]/g, "'")  // Smart single quotes
    .replace(/[\u201C\u201D]/g, '"')  // Smart double quotes
    .replace(/\u2013/g, '-')          // En dash
    .replace(/\u2014/g, '--')         // Em dash
    .replace(/\u2026/g, '...')        // Ellipsis
    .replace(/\u00A0/g, ' ')          // Non-breaking space
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // Zero-width chars
    // Remove any remaining non-ASCII that might cause issues
    .replace(/[^\x00-\x7F\u00C0-\u00FF]/g, (char) => {
      // Keep common extended Latin chars, replace others with ?
      return char;
    });
};

const formatDateNice = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const formatTimeNice = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
};

const getDayNumber = (timestamp, startDate) => {
  if (!timestamp || !startDate) return 1;
  const start = new Date(startDate);
  const current = new Date(timestamp);
  const diffTime = current - start;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays + 1);
};

// ─────────────────────────────────────────────────────────────────────────────
// DECORATIVE ELEMENTS
// ─────────────────────────────────────────────────────────────────────────────

const drawCornerAccents = (pdf, style = 'normal') => {
  const size = style === 'cover' ? 35 : 18;
  const offset = style === 'cover' ? 10 : 8;
  
  // Vine-like green corners
  pdf.setDrawColor(...COLORS.accentRGB);
  pdf.setLineWidth(style === 'cover' ? 1.2 : 0.5);
  
  // Top left — curving vine
  pdf.line(offset, offset, offset + size, offset);
  pdf.line(offset, offset, offset, offset + size);
  
  // Top right
  pdf.line(PAGE.width - offset, offset, PAGE.width - offset - size, offset);
  pdf.line(PAGE.width - offset, offset, PAGE.width - offset, offset + size);
  
  // Bottom left
  pdf.line(offset, PAGE.height - offset, offset + size, PAGE.height - offset);
  pdf.line(offset, PAGE.height - offset, offset, PAGE.height - offset - size);
  
  // Bottom right
  pdf.line(PAGE.width - offset, PAGE.height - offset, PAGE.width - offset - size, PAGE.height - offset);
  pdf.line(PAGE.width - offset, PAGE.height - offset, PAGE.width - offset, PAGE.height - offset - size);
  
  if (style === 'cover') {
    // Leaf/seed dots at corner ends — like seed pods on a vine
    pdf.setFillColor(...COLORS.goldRGB);
    const r = 1.8;
    // Leaf clusters at each corner
    [
      [offset + size, offset], [offset, offset + size],
      [PAGE.width - offset - size, offset], [PAGE.width - offset, offset + size],
      [offset + size, PAGE.height - offset], [offset, PAGE.height - offset - size],
      [PAGE.width - offset - size, PAGE.height - offset], [PAGE.width - offset, PAGE.height - offset - size],
    ].forEach(([x, y]) => {
      pdf.circle(x, y, r, 'F');
      // Tiny companion leaves
      pdf.setFillColor(...COLORS.accentRGB);
      pdf.circle(x + (x < PAGE.width / 2 ? 3 : -3), y, 0.8, 'F');
    });
    
    // Inner vine layer — thinner, lighter
    pdf.setLineWidth(0.3);
    pdf.setDrawColor(...COLORS.lightAccentRGB);
    const inner = offset + 6;
    const innerSize = size - 12;
    
    pdf.line(inner, inner, inner + innerSize, inner);
    pdf.line(inner, inner, inner, inner + innerSize);
    pdf.line(PAGE.width - inner, inner, PAGE.width - inner - innerSize, inner);
    pdf.line(PAGE.width - inner, inner, PAGE.width - inner, inner + innerSize);
    pdf.line(inner, PAGE.height - inner, inner + innerSize, PAGE.height - inner);
    pdf.line(inner, PAGE.height - inner, inner, PAGE.height - inner - innerSize);
    pdf.line(PAGE.width - inner, PAGE.height - inner, PAGE.width - inner - innerSize, PAGE.height - inner);
    pdf.line(PAGE.width - inner, PAGE.height - inner, PAGE.width - inner, PAGE.height - inner - innerSize);
  }
};

const drawHeader = (pdf, tripName) => {
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(...COLORS.accentRGB);
  pdf.text(tripName || 'Your Costa Rica Expedition', PAGE.width / 2, 16, { align: 'center' });
  
  pdf.setDrawColor(...COLORS.lightAccentRGB);
  pdf.setLineWidth(0.2);
  pdf.line(50, 19, PAGE.width - 50, 19);
};

const drawFooter = (pdf, pageNum) => {
  pdf.setFont('helvetica', 'italic');
  pdf.setFontSize(8);
  pdf.setTextColor(...COLORS.accentRGB);
  pdf.text('Costa Rica Wildlife Companion', PAGE.width / 2, PAGE.height - 15, { align: 'center' });
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.text(`${pageNum}`, PAGE.width / 2, PAGE.height - 8, { align: 'center' });
  
  pdf.setDrawColor(...COLORS.lightAccentRGB);
  pdf.setLineWidth(0.2);
  pdf.line(50, PAGE.height - 20, PAGE.width - 50, PAGE.height - 20);
};

const drawDivider = (pdf, y, style = 'normal') => {
  const cx = PAGE.width / 2;
  
  if (style === 'gold' || style === 'fancy') {
    // Vine divider — main line with leaf accents
    pdf.setDrawColor(...COLORS.accentRGB);
    pdf.setLineWidth(0.6);
    pdf.line(cx - 50, y, cx + 50, y);
    
    // Center leaf cluster
    pdf.setFillColor(...COLORS.goldRGB);
    pdf.circle(cx, y, 2.5, 'F');
    pdf.setFillColor(...COLORS.accentRGB);
    pdf.circle(cx - 5, y, 1.2, 'F');
    pdf.circle(cx + 5, y, 1.2, 'F');
    
    // Vine end dots
    pdf.setFillColor(...COLORS.lightAccentRGB);
    pdf.circle(cx - 50, y, 1, 'F');
    pdf.circle(cx + 50, y, 1, 'F');
  } else if (style === 'wide') {
    pdf.setDrawColor(...COLORS.lightAccentRGB);
    pdf.setLineWidth(0.4);
    pdf.line(PAGE.margin + 10, y, PAGE.width - PAGE.margin - 10, y);
    // Subtle leaf dots
    pdf.setFillColor(...COLORS.accentRGB);
    pdf.circle(cx, y, 1.5, 'F');
  } else {
    // Simple — thin vine tendril
    pdf.setDrawColor(...COLORS.lightAccentRGB);
    pdf.setLineWidth(0.3);
    pdf.line(cx - 40, y, cx + 40, y);
  }
};

const drawDayDivider = (pdf, dayNum, y) => {
  // Mossy green band
  pdf.setFillColor(...COLORS.lightAccentRGB);
  pdf.rect(PAGE.margin, y, PAGE.contentWidth, 12, 'F');
  // Thin vine accent on top
  pdf.setFillColor(...COLORS.accentRGB);
  pdf.rect(PAGE.margin, y, PAGE.contentWidth, 0.8, 'F');
  
  pdf.setFont('times', 'bold');
  pdf.setFontSize(14);
  pdf.setTextColor(...COLORS.darkBrownRGB);
  pdf.text(`Day ${dayNum}`, PAGE.width / 2, y + 8, { align: 'center' });
  
  return 20;
};

const drawCategoryDivider = (pdf, category, y) => {
  pdf.setFillColor(...COLORS.lightAccentRGB);
  pdf.rect(PAGE.margin, y, PAGE.contentWidth, 12, 'F');
  pdf.setFillColor(...COLORS.accentRGB);
  pdf.rect(PAGE.margin, y, PAGE.contentWidth, 0.8, 'F');
  
  pdf.setFont('times', 'bold');
  pdf.setFontSize(14);
  pdf.setTextColor(...COLORS.darkBrownRGB);
  pdf.text(category, PAGE.width / 2, y + 8, { align: 'center' });
  
  return 20;
};

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE HANDLING
// ─────────────────────────────────────────────────────────────────────────────

const addImageToPDF = (pdf, imageData, x, y, maxWidth, maxHeight) => {
  return new Promise((resolve) => {
    if (!imageData) {
      resolve({ width: 0, height: 0 });
      return;
    }
    
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      
      // Scale to fit
      const ratio = Math.min(maxWidth / width, maxHeight / height);
      width *= ratio;
      height *= ratio;
      
      // Center horizontally
      const centeredX = x + (maxWidth - width) / 2;
      
      try {
        pdf.addImage(imageData, 'JPEG', centeredX, y, width, height);
        resolve({ width, height, x: centeredX, y });
      } catch (e) {
        console.warn('Could not add image:', e);
        resolve({ width: 0, height: 0 });
      }
    };
    img.onerror = () => {
      console.warn('Image failed to load');
      resolve({ width: 0, height: 0 });
    };
    img.src = imageData;
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// COVER PAGE
// ─────────────────────────────────────────────────────────────────────────────

const createCoverPage = async (pdf, options = {}) => {
  const { 
    title = 'Your Costa Rica Expedition', 
    travelers = '', 
    fromDate, 
    toDate,
    occasion = '',
    dedication = '',
    expeditionGuide = '',
    coverType = 'default',
    customCoverPhoto = null,
  } = options;
  
  // Background
  pdf.setFillColor(...COLORS.creamRGB);
  pdf.rect(0, 0, PAGE.width, PAGE.height, 'F');
  
  const hasCustomPhoto = coverType === 'custom' && customCoverPhoto;
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // TOP SECTION - Title, dates, occasion (no overlay needed)
  // ═══════════════════════════════════════════════════════════════════════════════
  let yPos = 18;
  
  // Main title at very top
  pdf.setFont('times', 'bold');
  pdf.setFontSize(32);
  pdf.setTextColor(...COLORS.darkBrownRGB);
  const titleLines = pdf.splitTextToSize(title, PAGE.contentWidth - 10);
  titleLines.forEach((line, i) => {
    pdf.text(line, PAGE.width / 2, yPos + (i * 11), { align: 'center' });
  });
  yPos += titleLines.length * 11 + 4;
  
  // Decorative line under title
  drawDivider(pdf, yPos, 'gold');
  yPos += 8;
  
  // Dates
  if (fromDate || toDate) {
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    pdf.setTextColor(...COLORS.accentRGB);
    let dateText = '';
    if (fromDate && toDate) {
      dateText = `${formatDateNice(fromDate)} - ${formatDateNice(toDate)}`;
    } else {
      dateText = formatDateNice(fromDate || toDate);
    }
    pdf.text(dateText, PAGE.width / 2, yPos, { align: 'center' });
    yPos += 6;
  }
  
  // Occasion
  if (occasion) {
    pdf.setFont('helvetica', 'italic');
    pdf.setFontSize(10);
    pdf.setTextColor(...COLORS.brownRGB);
    pdf.text(occasion, PAGE.width / 2, yPos, { align: 'center' });
    yPos += 6;
  }
  
  // Travelers
  if (travelers) {
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.setTextColor(...COLORS.brownRGB);
    pdf.text(travelers, PAGE.width / 2, yPos, { align: 'center' });
    yPos += 6;
  }
  
  // Expedition Guide
  if (expeditionGuide) {
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(...COLORS.accentRGB);
    pdf.text(`Guide: ${expeditionGuide}`, PAGE.width / 2, yPos, { align: 'center' });
  }
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // MIDDLE SECTION - Photo with elegant frame
  // ═══════════════════════════════════════════════════════════════════════════════
  const photoTop = 75;
  const photoBottom = PAGE.height - 70;
  const photoHeight = photoBottom - photoTop;
  const photoMargin = 15;
  const frameWidth = PAGE.width - (photoMargin * 2);
  const frameHeight = photoHeight;
  
  if (hasCustomPhoto) {
    try {
      // Draw elegant double-line frame first
      pdf.setDrawColor(...COLORS.goldRGB);
      pdf.setLineWidth(1.5);
      pdf.rect(photoMargin, photoTop, frameWidth, frameHeight, 'S');
      
      pdf.setDrawColor(...COLORS.lightAccentRGB);
      pdf.setLineWidth(0.5);
      pdf.rect(photoMargin + 3, photoTop + 3, frameWidth - 6, frameHeight - 6, 'S');
      
      // Add photo inside frame
      await addImageToPDF(pdf, customCoverPhoto, photoMargin + 5, photoTop + 5, frameWidth - 10, frameHeight - 10);
      
      // Draw corner accents on frame
      const cornerSize = 12;
      pdf.setDrawColor(...COLORS.goldRGB);
      pdf.setLineWidth(2);
      
      // Top-left corner
      pdf.line(photoMargin - 2, photoTop + cornerSize, photoMargin - 2, photoTop - 2);
      pdf.line(photoMargin - 2, photoTop - 2, photoMargin + cornerSize, photoTop - 2);
      
      // Top-right corner
      pdf.line(photoMargin + frameWidth + 2, photoTop + cornerSize, photoMargin + frameWidth + 2, photoTop - 2);
      pdf.line(photoMargin + frameWidth + 2, photoTop - 2, photoMargin + frameWidth - cornerSize, photoTop - 2);
      
      // Bottom-left corner
      pdf.line(photoMargin - 2, photoBottom - cornerSize, photoMargin - 2, photoBottom + 2);
      pdf.line(photoMargin - 2, photoBottom + 2, photoMargin + cornerSize, photoBottom + 2);
      
      // Bottom-right corner
      pdf.line(photoMargin + frameWidth + 2, photoBottom - cornerSize, photoMargin + frameWidth + 2, photoBottom + 2);
      pdf.line(photoMargin + frameWidth + 2, photoBottom + 2, photoMargin + frameWidth - cornerSize, photoBottom + 2);
      
    } catch (e) {
      console.warn('Could not add cover photo');
      // Draw decorative placeholder
      pdf.setDrawColor(...COLORS.lightAccentRGB);
      pdf.setLineWidth(1);
      pdf.rect(photoMargin + 20, photoTop + 20, frameWidth - 40, frameHeight - 40, 'S');
      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(14);
      pdf.setTextColor(...COLORS.lightAccentRGB);
      pdf.text('Your Expedition Photo', PAGE.width / 2, photoTop + frameHeight / 2, { align: 'center' });
    }
  } else {
    // No custom photo - draw the logo area
    drawCornerAccents(pdf, 'cover');
    
    // Draw decorative illustration placeholder
    pdf.setDrawColor(...COLORS.goldRGB);
    pdf.setLineWidth(1);
    pdf.roundedRect(photoMargin + 30, photoTop + 30, frameWidth - 60, frameHeight - 60, 8, 8, 'S');
    
    // Add decorative text
    pdf.setFont('times', 'italic');
    pdf.setFontSize(16);
    pdf.setTextColor(...COLORS.accentRGB);
    pdf.text('Your Expedition Memories', PAGE.width / 2, photoTop + frameHeight / 2 - 10, { align: 'center' });
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.setTextColor(...COLORS.brownRGB);
    pdf.text('Costa Rica', PAGE.width / 2, photoTop + frameHeight / 2 + 5, { align: 'center' });
  }
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // BOTTOM SECTION - Location and dedication (clean, no overlay)
  // ═══════════════════════════════════════════════════════════════════════════════
  let bottomY = PAGE.height - 55;
  
  // Decorative line
  drawDivider(pdf, bottomY - 10, 'gold');
  
  // Dedication (if provided)
  if (dedication) {
    pdf.setFont('helvetica', 'italic');
    pdf.setFontSize(10);
    pdf.setTextColor(...COLORS.brownRGB);
    const dedLines = pdf.splitTextToSize(`"${dedication}"`, PAGE.contentWidth - 30);
    dedLines.forEach((line, i) => {
      pdf.text(line, PAGE.width / 2, bottomY + (i * 5), { align: 'center' });
    });
    bottomY += dedLines.length * 5 + 6;
  }
  
  // Location
  pdf.setFont('times', 'normal');
  pdf.setFontSize(12);
  pdf.setTextColor(...COLORS.darkBrownRGB);
  pdf.text('Costa Rica', PAGE.width / 2, bottomY, { align: 'center' });
  bottomY += 5;
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(...COLORS.accentRGB);
  pdf.text('Costa Rica, Central America', PAGE.width / 2, bottomY, { align: 'center' });
};

// ─────────────────────────────────────────────────────────────────────────────
// TABLE OF CONTENTS
// ─────────────────────────────────────────────────────────────────────────────

const createTableOfContents = (pdf, options, tocPageNum, sections) => {
  pdf.addPage();
  
  pdf.setFillColor(...COLORS.creamRGB);
  pdf.rect(0, 0, PAGE.width, PAGE.height, 'F');
  
  drawCornerAccents(pdf);
  drawHeader(pdf, options.title);
  drawFooter(pdf, tocPageNum);
  
  // Title
  pdf.setFont('times', 'bold');
  pdf.setFontSize(26);
  pdf.setTextColor(...COLORS.darkBrownRGB);
  pdf.text('Contents', PAGE.width / 2, 38, { align: 'center' });
  
  drawDivider(pdf, 45, 'fancy');
  
  let yPos = 58;
  const lineHeight = 10;
  
  // Helper to draw a TOC entry
  const drawTocEntry = (title, pageRange, isSection = false) => {
    if (isSection) {
      pdf.setFont('times', 'bold');
      pdf.setFontSize(12);
      pdf.setTextColor(...COLORS.darkBrownRGB);
    } else {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(...COLORS.brownRGB);
    }
    
    pdf.text(title, PAGE.margin + 8, yPos);
    pdf.text(pageRange, PAGE.width - PAGE.margin - 8, yPos, { align: 'right' });
    
    // Dotted leader line
    pdf.setDrawColor(...COLORS.lightAccentRGB);
    pdf.setLineDashPattern([1, 2], 0);
    const titleWidth = pdf.getTextWidth(title);
    const pageWidth = pdf.getTextWidth(pageRange);
    pdf.line(PAGE.margin + 12 + titleWidth, yPos - 1, PAGE.width - PAGE.margin - 12 - pageWidth, yPos - 1);
    pdf.setLineDashPattern([], 0);
    
    yPos += lineHeight;
  };
  
  // Draw each section
  sections.forEach(section => {
    if (section.pages && yPos < PAGE.height - 50) {
      const pageRange = section.endPage && section.endPage !== section.startPage 
        ? `${section.startPage} - ${section.endPage}`
        : `${section.startPage}`;
      drawTocEntry(section.title, pageRange, section.isSection);
    }
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// CHART DRAWING HELPERS
// ─────────────────────────────────────────────────────────────────────────────

// Draw a horizontal bar chart
const drawHorizontalBarChart = (pdf, data, x, y, width, height, title) => {
  const barHeight = Math.min(14, (height - 20) / data.length);
  const maxValue = Math.max(...data.map(d => d.value), 1);
  const labelWidth = 45;
  const barAreaWidth = width - labelWidth - 25;
  
  // Title
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(...COLORS.darkBrownRGB);
  pdf.text(title, x + width / 2, y, { align: 'center' });
  
  let barY = y + 12;
  
  data.forEach((item, i) => {
    // Label
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(...COLORS.brownRGB);
    pdf.text(item.label, x, barY + barHeight / 2 + 2);
    
    // Bar background
    pdf.setFillColor(...COLORS.lightAccentRGB);
    pdf.roundedRect(x + labelWidth, barY, barAreaWidth, barHeight - 2, 2, 2, 'F');
    
    // Bar fill
    const barWidth = (item.value / maxValue) * barAreaWidth;
    if (barWidth > 0) {
      pdf.setFillColor(...(item.color || COLORS.accentRGB));
      pdf.roundedRect(x + labelWidth, barY, barWidth, barHeight - 2, 2, 2, 'F');
    }
    
    // Value
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(...COLORS.darkBrownRGB);
    pdf.text(`${item.value}`, x + labelWidth + barAreaWidth + 3, barY + barHeight / 2 + 2);
    
    barY += barHeight + 2;
  });
};

// Draw a simple pie chart (using segments)
const drawPieChart = (pdf, data, centerX, centerY, radius, title) => {
  // Title above
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9);
  pdf.setTextColor(...COLORS.darkBrownRGB);
  pdf.text(title, centerX, centerY - radius - 8, { align: 'center' });
  
  const total = data.reduce((sum, d) => sum + d.value, 0);
  if (total === 0) return;
  
  // Draw pie segments using filled arcs approximated with triangles
  let startAngle = -Math.PI / 2; // Start at top
  
  data.forEach((item, i) => {
    if (item.value === 0) return;
    
    const sliceAngle = (item.value / total) * 2 * Math.PI;
    const endAngle = startAngle + sliceAngle;
    
    // Draw segment as a filled polygon (approximate arc with lines)
    pdf.setFillColor(...(item.color || COLORS.accentRGB));
    
    // Create path points for the arc
    const points = [[centerX, centerY]];
    const steps = Math.max(8, Math.floor(sliceAngle * 10));
    for (let j = 0; j <= steps; j++) {
      const angle = startAngle + (sliceAngle * j / steps);
      points.push([
        centerX + radius * Math.cos(angle),
        centerY + radius * Math.sin(angle)
      ]);
    }
    
    // Draw filled polygon
    if (points.length > 2) {
      pdf.setFillColor(...(item.color || [139, 90, 43]));
      
      // Move to center
      const pathData = points.map((p, idx) => {
        if (idx === 0) return `${p[0]} ${p[1]} m`;
        return `${p[0]} ${p[1]} l`;
      }).join(' ') + ' h f';
      
      // Use triangle fan approach for simplicity
      for (let j = 1; j < points.length - 1; j++) {
        pdf.triangle(
          points[0][0], points[0][1],
          points[j][0], points[j][1],
          points[j + 1][0], points[j + 1][1],
          'F'
        );
      }
    }
    
    startAngle = endAngle;
  });
  
  // Draw center circle (donut style)
  pdf.setFillColor(...COLORS.creamRGB);
  pdf.circle(centerX, centerY, radius * 0.5, 'F');
  
  // Total in center
  pdf.setFont('times', 'bold');
  pdf.setFontSize(14);
  pdf.setTextColor(...COLORS.darkBrownRGB);
  pdf.text(`${total}`, centerX, centerY + 2, { align: 'center' });
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(6);
  pdf.setTextColor(...COLORS.accentRGB);
  pdf.text('total', centerX, centerY + 8, { align: 'center' });
  
  // Legend below
  let legendY = centerY + radius + 10;
  const legendX = centerX - 30;
  
  data.forEach((item, i) => {
    if (item.value === 0) return;
    
    pdf.setFillColor(...(item.color || [139, 90, 43]));
    pdf.rect(legendX, legendY - 3, 6, 6, 'F');
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(...COLORS.brownRGB);
    pdf.text(`${item.label} (${item.value})`, legendX + 9, legendY + 1);
    
    legendY += 9;
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// DESTINATION PAGE - About Your Destination
// ─────────────────────────────────────────────────────────────────────────────

const createDestinationPage = (pdf, options, pageNum, archive) => {
  const { title = 'Your Costa Rica Expedition' } = options;
  let currentPage = pageNum;
  
  // Helper for page breaks
  const checkPageBreak = (neededSpace, yPos) => {
    if (yPos + neededSpace > PAGE.height - 40) {
      pdf.addPage();
      currentPage++;
      pdf.setFillColor(...COLORS.creamRGB);
      pdf.rect(0, 0, PAGE.width, PAGE.height, 'F');
      drawCornerAccents(pdf);
      drawHeader(pdf, title);
      drawFooter(pdf, currentPage);
      return 35;
    }
    return yPos;
  };
  
  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE 1 — About Costa Rica
  // ═══════════════════════════════════════════════════════════════════════════
  
  pdf.addPage();
  pdf.setFillColor(...COLORS.creamRGB);
  pdf.rect(0, 0, PAGE.width, PAGE.height, 'F');
  drawCornerAccents(pdf, 'cover');
  drawHeader(pdf, title);
  drawFooter(pdf, currentPage);
  
  let yPos = 35;
  
  // Page header
  pdf.setFont('helvetica', 'italic');
  pdf.setFontSize(10);
  pdf.setTextColor(...COLORS.accentRGB);
  pdf.text('About Your Destination', PAGE.width / 2, yPos, { align: 'center' });
  yPos += 14;
  
  // Title
  pdf.setFont('times', 'bold');
  pdf.setFontSize(32);
  pdf.setTextColor(...COLORS.darkBrownRGB);
  pdf.text('Costa Rica', PAGE.width / 2, yPos, { align: 'center' });
  yPos += 10;
  
  // Flag
  drawCostaRicaFlag(pdf, (PAGE.width - 36) / 2, yPos, 36, 20);
  yPos += 26;
  
  // Pura Vida
  pdf.setFont('times', 'italic');
  pdf.setFontSize(20);
  pdf.setTextColor(...COLORS.goldRGB);
  pdf.text('Pura Vida', PAGE.width / 2, yPos, { align: 'center' });
  yPos += 6;
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(...COLORS.accentRGB);
  pdf.text('A Living Treasure of Biodiversity', PAGE.width / 2, yPos, { align: 'center' });
  yPos += 12;
  
  drawDivider(pdf, yPos, 'fancy');
  yPos += 14;
  
  // Description paragraphs
  pdf.setFont('times', 'normal');
  pdf.setFontSize(10.5);
  pdf.setTextColor(...COLORS.brownRGB);
  
  const paras = [
    "Costa Rica occupies just 0.03% of the Earth's surface yet contains nearly 6% of the world's biodiversity. This small Central American nation stretches between the Pacific Ocean and Caribbean Sea, packed with volcanoes, cloud forests, and coral reefs.",
    "With over 500,000 species — from resplendent quetzals to four species of sea turtle — Costa Rica's 30+ national parks protect some of the most diverse ecosystems on the planet. Over 25% of the country is protected land.",
    "Costa Rica pioneered ecotourism and abolished its army in 1948, redirecting funds to education and conservation. The country runs on nearly 100% renewable energy and aims to be fully carbon neutral.",
  ];
  
  paras.forEach(para => {
    const lines = pdf.splitTextToSize(para, PAGE.contentWidth - 10);
    pdf.text(lines, PAGE.margin + 5, yPos);
    yPos += lines.length * 4.8 + 4;
  });
  
  yPos += 4;
  drawDivider(pdf, yPos, 'simple');
  yPos += 10;
  
  // Did You Know box
  pdf.setFont('times', 'bold');
  pdf.setFontSize(12);
  pdf.setTextColor(...COLORS.darkBrownRGB);
  pdf.text('Did You Know?', PAGE.margin + 5, yPos);
  yPos += 7;
  
  const boxY = yPos - 3;
  pdf.setFillColor(228, 238, 225);
  pdf.roundedRect(PAGE.margin + 3, boxY, PAGE.contentWidth - 6, 34, 2, 2, 'F');
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.5);
  pdf.setTextColor(...COLORS.brownRGB);
  
  const keyFacts = [
    'Costa Rica means "Rich Coast" — named by Columbus in 1502.',
    'The country has no army — abolished in 1948, funds went to education and conservation.',
    'Over 500,000 species live here — more per square mile than almost anywhere on Earth.',
  ];
  
  keyFacts.forEach(fact => {
    pdf.text(`•  ${fact}`, PAGE.margin + 8, yPos);
    yPos += 9;
  });
  
  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE 2 — Wildlife Showcases
  // ═══════════════════════════════════════════════════════════════════════════
  
  pdf.addPage();
  currentPage++;
  pdf.setFillColor(...COLORS.creamRGB);
  pdf.rect(0, 0, PAGE.width, PAGE.height, 'F');
  drawCornerAccents(pdf);
  drawHeader(pdf, title);
  drawFooter(pdf, currentPage);
  
  yPos = 35;
  
  pdf.setFont('times', 'bold');
  pdf.setFontSize(24);
  pdf.setTextColor(...COLORS.darkBrownRGB);
  pdf.text('Wildlife of Costa Rica', PAGE.width / 2, yPos, { align: 'center' });
  yPos += 6;
  
  pdf.setFont('helvetica', 'italic');
  pdf.setFontSize(9);
  pdf.setTextColor(...COLORS.accentRGB);
  pdf.text('Some of the extraordinary creatures that call this country home', PAGE.width / 2, yPos, { align: 'center' });
  yPos += 10;
  
  drawDivider(pdf, yPos, 'fancy');
  yPos += 12;
  
  // ── SHOWCASE PANEL HELPER ──
  const drawShowcase = (title, emoji, items, description, speciesIds) => {
    // Pre-calculate total height needed
    // We'll do a dry-run to measure, then check page break, then render
    
    const gridColWidth = (PAGE.contentWidth - 16) / 2;
    const itemMaxWidth = gridColWidth - 8; // leave room for circle + padding
    const lineHeight = 3.8;
    
    // Measure description height
    pdf.setFont('times', 'italic');
    pdf.setFontSize(9);
    const descLines = pdf.splitTextToSize(description, PAGE.contentWidth - 12);
    
    // Measure each row of items (2 per row)
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8.5);
    let totalGridHeight = 0;
    for (let row = 0; row < Math.ceil(items.length / 2); row++) {
      const leftIdx = row * 2;
      const rightIdx = row * 2 + 1;
      const leftLines = pdf.splitTextToSize(items[leftIdx], itemMaxWidth);
      const rightLines = rightIdx < items.length ? pdf.splitTextToSize(items[rightIdx], itemMaxWidth) : [' '];
      const rowLines = Math.max(leftLines.length, rightLines.length);
      totalGridHeight += rowLines * lineHeight + 2; // 2mm gap between rows
    }
    
    const totalHeight = 15 + descLines.length * 4 + 4 + totalGridHeight + 8;
    yPos = checkPageBreak(totalHeight, yPos);
    
    // Header bar
    pdf.setFillColor(...COLORS.lightAccentRGB);
    pdf.roundedRect(PAGE.margin, yPos, PAGE.contentWidth, 11, 1.5, 1.5, 'F');
    pdf.setFillColor(...COLORS.accentRGB);
    pdf.rect(PAGE.margin, yPos, PAGE.contentWidth, 1, 'F');
    
    pdf.setFont('times', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(...COLORS.darkBrownRGB);
    pdf.text(title, PAGE.margin + 6, yPos + 7.5);
    yPos += 15;
    
    // Description
    pdf.setFont('times', 'italic');
    pdf.setFontSize(9);
    pdf.setTextColor(...COLORS.accentRGB);
    pdf.text(descLines, PAGE.margin + 6, yPos);
    yPos += descLines.length * 4 + 4;
    
    // Species grid — 2 columns, dynamic row heights
    for (let row = 0; row < Math.ceil(items.length / 2); row++) {
      const indices = [row * 2, row * 2 + 1];
      
      // Measure this row's height
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8.5);
      let maxLinesInRow = 1;
      
      indices.forEach(idx => {
        if (idx < items.length) {
          const wrapped = pdf.splitTextToSize(items[idx], itemMaxWidth);
          maxLinesInRow = Math.max(maxLinesInRow, wrapped.length);
        }
      });
      
      // Render each item in this row
      indices.forEach((idx, colIdx) => {
        if (idx >= items.length) return;
        
        const x = PAGE.margin + 8 + (colIdx * gridColWidth);
        const seen = speciesIds && speciesIds[idx] && archive?.species?.[speciesIds[idx]];
        const wrapped = pdf.splitTextToSize(items[idx], itemMaxWidth);
        
        if (seen) {
          pdf.setFillColor(...COLORS.accentRGB);
          pdf.circle(x + 2, yPos + 1, 1.8, 'F');
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(8.5);
          pdf.setTextColor(...COLORS.darkBrownRGB);
        } else {
          pdf.setDrawColor(...COLORS.lightAccentRGB);
          pdf.setLineWidth(0.4);
          pdf.circle(x + 2, yPos + 1, 1.5, 'S');
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(8.5);
          pdf.setTextColor(160, 170, 160);
        }
        
        wrapped.forEach((line, lineIdx) => {
          pdf.text(line, x + 6, yPos + 2.5 + (lineIdx * lineHeight));
        });
      });
      
      yPos += maxLinesInRow * lineHeight + 2;
    }
    
    yPos += 6;
  };
  
  // ── PRIMATES ──
  drawShowcase(
    'Primates — All Four New World Families',
    '',
    [
      'White-faced Capuchin — clever tool user',
      'Howler Monkey — loudest land animal',
      'Spider Monkey — acrobat of the canopy',
      'Squirrel Monkey — endangered, Pacific coast only',
    ],
    'Costa Rica is one of few places where all four New World primate families coexist. Howler monkeys can be heard up to 3 miles away. The Central American squirrel monkey is endangered, found only in Manuel Antonio and the Osa Peninsula.',
    ['white-faced-capuchin', 'mantled-howler', 'spider-monkey', 'squirrel-monkey']
  );
  
  // ── HUMMINGBIRDS ──
  drawShowcase(
    'Hummingbirds — Jewels of the Cloud Forest',
    '',
    [
      'Violet Sabrewing — largest hummingbird in CR',
      'Green Hermit — curved bill, forest understory',
      'Fiery-throated Hummingbird — rainbow gorget',
      'Snowcap — tiny, plum-and-white, highland endemic',
      'Green-crowned Brilliant — iridescent emerald',
      'Scintillant Hummingbird — one of the world\'s smallest',
    ],
    'Over 50 hummingbird species visit Costa Rica. Their hearts beat 1,200 times per minute. They can fly backwards and hover in place. Cloud forests like Monteverde are the best place to see rare highland species.',
    ['violet-sabrewing', 'green-hermit', 'fiery-throated-hummingbird', 'snowcap', 'green-crowned-brilliant', 'scintillant-hummingbird']
  );
  
  // ── SEA TURTLES ──
  drawShowcase(
    'Sea Turtles — Ancient Mariners',
    '',
    [
      'Green Sea Turtle — Tortuguero, the world\'s most important nesting site',
      'Leatherback — largest living turtle, dives 4,000 feet',
      'Hawksbill — critically endangered, coral reef specialist',
      'Olive Ridley — arrives by thousands in the "arribada"',
    ],
    'All four species of sea turtle found in Costa Rica are endangered. Tortuguero National Park was created specifically to protect green turtle nesting. The olive ridley arribada at Ostional is one of nature\'s greatest spectacles — up to 500,000 turtles nesting in a single week.',
    ['green-sea-turtle', 'leatherback-turtle', 'hawksbill-turtle', 'olive-ridley-turtle']
  );
  
  // ── WILD CATS ──
  drawShowcase(
    'Wild Cats — Six Species of Shadow',
    '',
    [
      'Jaguar — apex predator, swims rivers, crushes skulls',
      'Puma — ghost of the highlands, most widespread cat',
      'Ocelot — spotted beauty of the night forest',
      'Margay — only cat that can climb down trees headfirst',
      'Jaguarundi — otter-like, oddest-looking cat',
      'Oncilla — smallest, rarest, almost never seen',
    ],
    'Costa Rica has six of the New World\'s wild cat species. All are elusive and mostly nocturnal. Corcovado National Park on the Osa Peninsula has the highest density of jaguars in Central America.',
    ['jaguar', 'puma', 'ocelot', 'margay', 'jaguarundi', 'oncilla']
  );
  
  // ── FROGS & AMPHIBIANS ──
  drawShowcase(
    'Frogs — Tiny, Loud, and Impossibly Colorful',
    '',
    [
      'Red-eyed Tree Frog — the icon, neon green with red eyes',
      'Strawberry Poison Dart Frog — blue jeans morph',
      'Green-and-black Poison Frog — jewel of the leaf litter',
      'Glass Frog — transparent belly, visible beating heart',
      'Smoky Jungle Frog — largest frog in Central America',
      'Masked Tree Frog — found by sound, not by sight',
    ],
    'Over 200 frog species live in Costa Rica. Poison dart frogs get their toxicity from the ants they eat — captive-bred frogs are harmless. Glass frogs are nearly invisible from above; flip one over and you can watch its heart pump.',
    ['red-eyed-tree-frog', 'poison-dart-frog-strawberry', 'poison-dart-frog-green-black', 'glass-frog', 'smoky-jungle-frog', 'masked-tree-frog']
  );
  
  // ── TOUCANS ──
  drawShowcase(
    'Toucans & Aracaris — The Rainbow Bills',
    '',
    [
      'Keel-billed Toucan — the national bird of Belize, iconic',
      'Chestnut-mandibled Toucan — largest toucan in Costa Rica',
      'Fiery-billed Aracari — flame-orange, southern Pacific only',
      'Collared Aracari — travels in noisy family groups',
      'Emerald Toucanet — jewel-green, cloud forest specialist',
      'Yellow-eared Toucanet — rarest, highland endemic',
    ],
    'Toucans cannot eat normally — their bills are too long. They toss food in the air and throw their heads back to swallow. Despite their size, toucan bills are mostly hollow and incredibly lightweight.',
    ['keel-billed-toucan', 'chestnut-mandibled-toucan', 'fiery-billed-aracari', 'collared-aracari', 'emerald-toucanet', 'yellow-eared-toucanet']
  );
  
  // Final closing text
  yPos = checkPageBreak(30, yPos);
  drawDivider(pdf, yPos, 'fancy');
  yPos += 10;
  
  pdf.setFont('times', 'italic');
  pdf.setFontSize(11);
  pdf.setTextColor(...COLORS.accentRGB);
  pdf.text('Costa Rica stretches between two oceans, from Caribbean coral reefs', PAGE.width / 2, yPos, { align: 'center' });
  yPos += 5.5;
  pdf.text('to Pacific mangroves, with volcanic peaks and cloud forests in between.', PAGE.width / 2, yPos, { align: 'center' });
  yPos += 5.5;
  pdf.text('Every corner of this country holds a different world.', PAGE.width / 2, yPos, { align: 'center' });
  
  return currentPage;
};

// ─────────────────────────────────────────────────────────────────────────────
// STATS PAGE
// ─────────────────────────────────────────────────────────────────────────────

const createStatsPage = (pdf, archive, entries, allSpecies, options, pageNum) => {
  let currentPage = pageNum;
  
  // Helper to check if we need a new page and add one if so
  const checkPageBreak = (neededSpace, yPos) => {
    if (yPos + neededSpace > PAGE.height - 40) {
      pdf.addPage();
      currentPage++;
      pdf.setFillColor(...COLORS.creamRGB);
      pdf.rect(0, 0, PAGE.width, PAGE.height, 'F');
      drawCornerAccents(pdf);
      drawHeader(pdf, options.title);
      drawFooter(pdf, currentPage);
      return 35; // Return new yPos after header
    }
    return yPos;
  };
  
  pdf.addPage();
  
  pdf.setFillColor(...COLORS.creamRGB);
  pdf.rect(0, 0, PAGE.width, PAGE.height, 'F');
  
  drawCornerAccents(pdf);
  drawHeader(pdf, options.title);
  drawFooter(pdf, currentPage);
  
  // Title
  pdf.setFont('times', 'bold');
  pdf.setFontSize(28);
  pdf.setTextColor(...COLORS.darkBrownRGB);
  pdf.text('Your Expedition Story', PAGE.width / 2, 40, { align: 'center' });
  
  // Flag accent
  drawCostaRicaFlag(pdf, (PAGE.width - 24) / 2, 44, 24, 10);
  
  // Subtitle
  pdf.setFont('helvetica', 'italic');
  pdf.setFontSize(11);
  pdf.setTextColor(...COLORS.accentRGB);
  pdf.text('Pura Vida — what an incredible adventure!', PAGE.width / 2, 60, { align: 'center' });
  
  drawDivider(pdf, 66, 'fancy');
  
  let yPos = 76;
  
  const statsConfig = options.stats || { all: true };
  const showAll = statsConfig.all;
  
  // Calculate all stats
  const speciesIds = Object.keys(archive?.species || {}).filter(k => archive.species[k]);
  const speciesCount = speciesIds.length;
  const momentsCount = Object.keys(archive?.meanings || {}).filter(k => archive.meanings[k]).length;
  const customCount = (archive?.custom?.species?.filter(e => e.experienced).length || 0) +
                      (archive?.custom?.moments?.filter(e => e.experienced).length || 0);
  const totalPhotos = entries.reduce((sum, e) => sum + (e.data?.photos?.length || 0), 0);
  const badgeCount = archive?.badges?.length || 0;
  
  // Category counts for charts — actual Costa Rica categories
  const birdCategories = ['Hummingbirds', 'Raptors & Vultures', 'Parrots & Macaws', 'Toucans & Aracaris', 'Trogons', 'Motmots', 'Tanagers & Honeycreepers', 'Manakins & Cotingas', 'Herons & Shorebirds', 'Kingfishers', 'Owls & Nightjars', 'Woodpeckers', 'Flycatchers & Wrens', 'Warblers & Vireos', 'Swifts & Swallows', 'Ovenbirds & Woodcreepers', 'Antbirds & Allies', 'Cuckoos & Anis', 'Pigeons & Doves', 'Tinamous & Quail', 'Seabirds', 'Other Notable Birds'];
  const mammalCategories = ['Wild Cats', 'Primates', 'Other Mammals', 'Bats', 'Marine Life', 'Carnivores'];
  const reptileCategories = ['Snakes', 'Lizards', 'Crocodilians & Turtles'];
  const amphibianCategories = ['Frogs & Amphibians'];
  const insectCategories = ['Insects & Arachnids'];
  
  let birdCount = 0;
  let mammalCount = 0;
  let reptileCount = 0;
  let nightCount = 0;
  let hummingbirdCount = 0;
  let primateCount = 0;
  let frogCount = 0;
  let seaTurtleCount = 0;
  let butterflyCount = 0;
  let wildCatCount = 0;
  let toucanCount = 0;
  
  // Time of day tracking
  const timeSlots = {
    'Dawn (5-7am)': 0,
    'Morning (7-10am)': 0,
    'Midday (10am-2pm)': 0,
    'Afternoon (2-5pm)': 0,
    'Dusk (5-7pm)': 0,
    'Night (7pm-5am)': 0,
  };
  
  // Category breakdown for detailed chart
  const categoryBreakdown = {};
  
  speciesIds.forEach(id => {
    const species = allSpecies.find(s => s.id === id);
    const entryData = archive?.species?.[id];
    
    if (species) {
      const cat = species.category || 'Other';
      
      // Count by type
      if (birdCategories.includes(cat)) birdCount++;
      else if (mammalCategories.includes(cat)) mammalCount++;
      else if (reptileCategories.includes(cat)) reptileCount++;
      else if (amphibianCategories.includes(cat)) frogCount++;
      else if (insectCategories.includes(cat)) butterflyCount++;
      else mammalCount++;
      
      // Costa Rica specialty counts
      if (cat === 'Hummingbirds') hummingbirdCount++;
      if (cat === 'Primates') primateCount++;
      if (cat === 'Wild Cats') wildCatCount++;
      if (cat === 'Frogs & Amphibians') frogCount++;
      if (cat === 'Toucans & Aracaris') toucanCount++;
      if (cat === 'Crocodilians & Turtles' && species.name?.toLowerCase().includes('turtle')) seaTurtleCount++;
      if (species.nocturnal) nightCount++;
      
      // Category breakdown
      categoryBreakdown[cat] = (categoryBreakdown[cat] || 0) + 1;
      
      // Time of day
      if (entryData?.timestamp) {
        const hour = new Date(entryData.timestamp).getHours();
        if (hour >= 5 && hour < 7) timeSlots['Dawn (5-7am)']++;
        else if (hour >= 7 && hour < 10) timeSlots['Morning (7-10am)']++;
        else if (hour >= 10 && hour < 14) timeSlots['Midday (10am-2pm)']++;
        else if (hour >= 14 && hour < 17) timeSlots['Afternoon (2-5pm)']++;
        else if (hour >= 17 && hour < 19) timeSlots['Dusk (5-7pm)']++;
        else timeSlots['Night (7pm-5am)']++;
      }
    }
  });
  
  // Costa Rica Bucket List — achievable in 1-2 weeks
  const bucketListIds = ['resplendent-quetzal', 'three-toed-sloth', 'scarlet-macaw', 'red-eyed-tree-frog', 'white-faced-capuchin', 'keel-billed-toucan'];
  const bucketListNames = ['Quetzal', 'Sloth', 'Scarlet Macaw', 'Red-eyed Tree Frog', 'Capuchin', 'Toucan'];
  const bucketListSeen = bucketListIds.filter(id => archive?.species?.[id]).length;
  
  // Costa Rica Highlights — iconic species
  const highlightIds = ['resplendent-quetzal', 'scarlet-macaw', 'bairds-tapir'];
  const highlightSeen = highlightIds.filter(id => archive?.species?.[id]).length;
  
  // Days of adventure
  let daysOnExpedition = 1;
  if (entries.length > 0) {
    const timestamps = entries
      .filter(e => e.data?.timestamp)
      .map(e => new Date(e.data.timestamp).getTime());
    if (timestamps.length > 1) {
      const minTime = Math.min(...timestamps);
      const maxTime = Math.max(...timestamps);
      daysOnExpedition = Math.max(1, Math.ceil((maxTime - minTime) / (1000 * 60 * 60 * 24)) + 1);
    }
  }
  
  // First and last sighting
  let firstSighting = null;
  let lastSighting = null;
  const sortedEntries = entries
    .filter(e => e.data?.timestamp && e.type === 'species')
    .sort((a, b) => new Date(a.data.timestamp) - new Date(b.data.timestamp));
  if (sortedEntries.length > 0) {
    firstSighting = sortedEntries[0];
    lastSighting = sortedEntries[sortedEntries.length - 1];
  }
  
  // Rarest sighting + Top 5 rarest
  let rarestSighting = null;
  let rarestRarity = '';
  const rarityOrder = ['Legendary', 'Rare', 'Uncommon', 'Common'];
  
  // Collect all sightings with rarity for top 5
  const sightingsWithRarity = [];
  
  speciesIds.forEach(id => {
    const species = allSpecies.find(s => s.id === id);
    if (species) {
      const currentIdx = rarityOrder.indexOf(species.rarity);
      sightingsWithRarity.push({ species, rarityIdx: currentIdx === -1 ? 99 : currentIdx });
      
      const rarestIdx = rarityOrder.indexOf(rarestRarity);
      if (currentIdx !== -1 && (rarestIdx === -1 || currentIdx < rarestIdx)) {
        rarestSighting = species;
        rarestRarity = species.rarity;
      }
    }
  });
  
  // Top 5 rarest (excluding common)
  const top5Rarest = sightingsWithRarity
    .filter(s => s.rarityIdx < 3) // Legendary, Rare, Uncommon only
    .sort((a, b) => a.rarityIdx - b.rarityIdx)
    .slice(0, 5)
    .map(s => s.species);
  
  // ═══════════════════════════════════════════════════════════════════════════
  // LAYOUT: Key stats at top, then charts, then Bucket List & Rarest
  // ═══════════════════════════════════════════════════════════════════════════
  
  // Row 1: Main stats
  const keyStats = [
    { value: speciesCount, label: 'Species' },
    { value: momentsCount, label: 'Moments' },
    { value: totalPhotos, label: 'Photos' },
    { value: badgeCount, label: 'Artifacts' },
  ];
  
  const statWidth = PAGE.contentWidth / keyStats.length;
  keyStats.forEach((stat, i) => {
    const x = PAGE.margin + (i * statWidth) + statWidth / 2;
    
    pdf.setFont('times', 'bold');
    pdf.setFontSize(22);
    pdf.setTextColor(...COLORS.darkBrownRGB);
    pdf.text(`${stat.value}`, x, yPos, { align: 'center' });
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(...COLORS.accentRGB);
    pdf.text(stat.label, x, yPos + 7, { align: 'center' });
  });
  
  yPos += 24;
  
  // Row 2: Secondary stats
  const secondaryStats = [
    { value: daysOnExpedition, label: 'Days of Adventure' },
    { value: birdCount, label: 'Birds' },
    { value: hummingbirdCount, label: 'Hummingbirds' },
    { value: primateCount, label: 'Primates' },
  ];
  
  secondaryStats.forEach((stat, i) => {
    const x = PAGE.margin + (i * statWidth) + statWidth / 2;
    
    pdf.setFont('times', 'bold');
    pdf.setFontSize(18);
    pdf.setTextColor(...COLORS.brownRGB);
    pdf.text(`${stat.value}`, x, yPos, { align: 'center' });
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(...COLORS.accentRGB);
    pdf.text(stat.label, x, yPos + 6, { align: 'center' });
  });
  
  yPos += 20;
  
  // Row 3: More Costa Rica stats
  const tertiaryStats = [
    { value: frogCount, label: 'Frogs' },
    { value: toucanCount, label: 'Toucans' },
    { value: wildCatCount, label: 'Wild Cats' },
    { value: nightCount, label: 'Nocturnal' },
  ];
  
  tertiaryStats.forEach((stat, i) => {
    const x = PAGE.margin + (i * statWidth) + statWidth / 2;
    
    pdf.setFont('times', 'bold');
    pdf.setFontSize(18);
    pdf.setTextColor(...COLORS.brownRGB);
    pdf.text(`${stat.value}`, x, yPos, { align: 'center' });
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(...COLORS.accentRGB);
    pdf.text(stat.label, x, yPos + 6, { align: 'center' });
  });
  
  yPos += 22;
  drawDivider(pdf, yPos, 'simple');
  yPos += 10;
  
  // ═══════════════════════════════════════════════════════════════════════════
  // COSTA RICA BUCKET LIST - The Classic Six
  // ═══════════════════════════════════════════════════════════════════════════
  
  yPos = checkPageBreak(45, yPos);
  
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(...COLORS.darkBrownRGB);
  pdf.text(`Costa Rica Bucket List — ${bucketListSeen} of ${bucketListIds.length}`, PAGE.width / 2, yPos, { align: 'center' });
  yPos += 10;
  
  const blCircleRadius = 7;
  const blSpacing = (PAGE.contentWidth - 20) / (bucketListIds.length - 1);
  let blX = PAGE.margin + 10;
  
  bucketListIds.forEach((id, i) => {
    const seen = archive?.species?.[id];
    
    if (seen) {
      pdf.setFillColor(...COLORS.goldRGB);
      pdf.circle(blX, yPos + 4, blCircleRadius, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.text('\u2713', blX, yPos + 7, { align: 'center' });
    } else {
      pdf.setDrawColor(...COLORS.lightAccentRGB);
      pdf.setLineWidth(0.8);
      pdf.circle(blX, yPos + 4, blCircleRadius, 'S');
    }
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(6.5);
    pdf.setTextColor(...(seen ? COLORS.darkBrownRGB : COLORS.lightAccentRGB));
    pdf.text(bucketListNames[i], blX, yPos + 15, { align: 'center' });
    
    blX += blSpacing;
  });
  
  yPos += 26;
  drawDivider(pdf, yPos, 'simple');
  yPos += 10;
  
  // ═══════════════════════════════════════════════════════════════════════════
  // FIRST AND LAST SIGHTING
  // ═══════════════════════════════════════════════════════════════════════════
  
  if (firstSighting || lastSighting) {
    yPos = checkPageBreak(30, yPos);
    const colWidth = PAGE.contentWidth / 2;
    
    if (firstSighting) {
      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(8);
      pdf.setTextColor(...COLORS.accentRGB);
      pdf.text('First Sighting', PAGE.margin, yPos);
      
      pdf.setFont('times', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(...COLORS.darkBrownRGB);
      pdf.text(firstSighting.item?.name || 'Unknown', PAGE.margin, yPos + 8);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7);
      pdf.setTextColor(...COLORS.brownRGB);
      pdf.text(formatDateNice(firstSighting.data?.timestamp), PAGE.margin, yPos + 14);
    }
    
    if (lastSighting) {
      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(8);
      pdf.setTextColor(...COLORS.accentRGB);
      pdf.text('Last Sighting', PAGE.margin + colWidth, yPos);
      
      pdf.setFont('times', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(...COLORS.darkBrownRGB);
      pdf.text(lastSighting.item?.name || 'Unknown', PAGE.margin + colWidth, yPos + 8);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7);
      pdf.setTextColor(...COLORS.brownRGB);
      pdf.text(formatDateNice(lastSighting.data?.timestamp), PAGE.margin + colWidth, yPos + 14);
    }
    
    yPos += 22;
    drawDivider(pdf, yPos, 'simple');
    yPos += 10;
  }
  
  // ═══════════════════════════════════════════════════════════════════════════
  // WILDLIFE TYPES - Expanded breakdown
  // ═══════════════════════════════════════════════════════════════════════════
  
  yPos = checkPageBreak(85, yPos);
  
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(...COLORS.darkBrownRGB);
  pdf.text('Wildlife Breakdown', PAGE.width / 2, yPos, { align: 'center' });
  yPos += 10;
  
  // Larger horizontal bar chart for wildlife types
  const wildlifeData = [
    { label: 'Mammals', value: mammalCount, color: [139, 90, 43] },
    { label: 'Birds', value: birdCount, color: [76, 132, 168] },
    { label: 'Reptiles', value: reptileCount, color: [107, 142, 35] },
    { label: 'Primates', value: primateCount, color: [160, 120, 60] },
    { label: 'Wild Cats', value: wildCatCount, color: [120, 60, 40] },
    { label: 'Nocturnal', value: nightCount, color: [62, 39, 35] },
  ].filter(d => d.value > 0);
  
  if (wildlifeData.length > 0) {
    drawHorizontalBarChart(
      pdf, 
      wildlifeData, 
      PAGE.margin, 
      yPos, 
      PAGE.contentWidth, 
      70, 
      ''
    );
    yPos += 78;
  }
  
  // ═══════════════════════════════════════════════════════════════════════════
  // TIME OF DAY BAR CHART
  // ═══════════════════════════════════════════════════════════════════════════
  
  yPos = checkPageBreak(90, yPos);
  
  const timeData = Object.entries(timeSlots)
    .map(([label, value]) => ({ 
      label: label.split(' ')[0], // Just "Dawn", "Morning", etc.
      value,
      color: label.includes('Night') || label.includes('Dawn') || label.includes('Dusk') 
        ? [62, 39, 35] : [139, 90, 43]
    }));
  
  const hasTimeData = timeData.some(d => d.value > 0);
  if (hasTimeData && (showAll || statsConfig.timeOfDay !== false)) {
    drawHorizontalBarChart(
      pdf, 
      timeData, 
      PAGE.margin, 
      yPos, 
      PAGE.contentWidth, 
      75, 
      'When You Spotted Wildlife'
    );
    yPos += 85;
  }
  
  // ═══════════════════════════════════════════════════════════════════════════
  // TOP CATEGORIES BAR CHART
  // ═══════════════════════════════════════════════════════════════════════════
  
  // Check if we need page break for top categories (~80px needed)
  yPos = checkPageBreak(80, yPos);
  
  // Get top 6 categories
  const topCategories = Object.entries(categoryBreakdown)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([label, value]) => ({ 
      label: label.length > 12 ? label.substring(0, 12) + '...' : label, 
      value,
      color: COLORS.accentRGB
    }));
  
  if (topCategories.length > 0) {
    drawHorizontalBarChart(
      pdf,
      topCategories,
      PAGE.margin,
      yPos,
      PAGE.contentWidth,
      70,
      'Top Categories'
    );
    yPos += 78;
  }
  
  // ═══════════════════════════════════════════════════════════════════════════
  // BUCKET LIST PROGRESS (detailed version)
  // ═══════════════════════════════════════════════════════════════════════════
  
  if (showAll || statsConfig.bigFour) {
    yPos = checkPageBreak(50, yPos);
    
    drawDivider(pdf, yPos, 'wide');
    yPos += 10;
    
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.setTextColor(...COLORS.darkBrownRGB);
    pdf.text(`Bucket List — ${bucketListSeen} of ${bucketListIds.length}`, PAGE.width / 2, yPos, { align: 'center' });
    yPos += 10;
    
    const circleRadius = 10;
    const spacing = 28;
    const totalWidth = spacing * (bucketListIds.length - 1);
    let xOffset = (PAGE.width - totalWidth) / 2;
    
    bucketListIds.forEach((id, i) => {
      const seen = archive?.species?.[id];
      
      if (seen) {
        pdf.setFillColor(...COLORS.goldRGB);
        pdf.circle(xOffset, yPos + 5, circleRadius, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(14);
        pdf.text('\u2713', xOffset, yPos + 9, { align: 'center' });
      } else {
        pdf.setDrawColor(...COLORS.lightAccentRGB);
        pdf.setLineWidth(1);
        pdf.circle(xOffset, yPos + 5, circleRadius, 'S');
      }
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(6.5);
      pdf.setTextColor(...(seen ? COLORS.darkBrownRGB : COLORS.lightAccentRGB));
      pdf.text(bucketListNames[i], xOffset, yPos + 20, { align: 'center' });
      
      xOffset += spacing;
    });
    
    yPos += 30;
  }
  
  // ═══════════════════════════════════════════════════════════════════════════
  // RAREST SIGHTING
  // ═══════════════════════════════════════════════════════════════════════════
  // TOP 5 RAREST HIGHLIGHTS
  // ═══════════════════════════════════════════════════════════════════════════
  
  if ((showAll || statsConfig.rarest) && top5Rarest.length > 0) {
    // Check if we need page break for top 5 rarest (~70px needed)
    yPos = checkPageBreak(70, yPos);
    
    drawDivider(pdf, yPos, 'wide');
    yPos += 10;
    
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.setTextColor(...COLORS.darkBrownRGB);
    pdf.text('Your Rarest Sightings', PAGE.width / 2, yPos, { align: 'center' });
    yPos += 14;
    
    top5Rarest.forEach((species, i) => {
      const rank = i + 1;
      const xStart = PAGE.margin + 15;
      
      // Rank number
      pdf.setFont('times', 'bold');
      pdf.setFontSize(12);
      pdf.setTextColor(...COLORS.goldRGB);
      pdf.text(`${rank}.`, xStart, yPos);
      
      // Species name
      pdf.setFont('times', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(...COLORS.darkBrownRGB);
      pdf.text(species.name, xStart + 10, yPos);
      
      // Rarity on the right side
      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(8);
      const rarityColor = species.rarity === 'Rare' ? COLORS.goldRGB : 
                          species.rarity === 'Legendary' ? [180, 130, 50] : COLORS.accentRGB;
      pdf.setTextColor(...rarityColor);
      pdf.text(species.rarity, PAGE.width - PAGE.margin - 15, yPos, { align: 'right' });
      
      yPos += 11;
    });
    
    yPos += 5;
  }
  
  // ═══════════════════════════════════════════════════════════════════════════
  // RARITY BREAKDOWN
  // ═══════════════════════════════════════════════════════════════════════════
  
  // Count by rarity
  const rarityBreakdown = { Legendary: 0, Rare: 0, Uncommon: 0, Common: 0 };
  speciesIds.forEach(id => {
    const species = allSpecies.find(s => s.id === id);
    if (species?.rarity && rarityBreakdown.hasOwnProperty(species.rarity)) {
      rarityBreakdown[species.rarity]++;
    }
  });
  
  yPos = checkPageBreak(50, yPos);
  
  drawDivider(pdf, yPos, 'simple');
  yPos += 10;
  
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(...COLORS.darkBrownRGB);
  pdf.text('Sightings by Rarity', PAGE.width / 2, yPos, { align: 'center' });
  yPos += 12;
  
  const rarityData = [
    { label: 'Legendary', value: rarityBreakdown.Legendary, color: [180, 130, 50] },
    { label: 'Rare', value: rarityBreakdown.Rare, color: COLORS.goldRGB },
    { label: 'Uncommon', value: rarityBreakdown.Uncommon, color: COLORS.accentRGB },
    { label: 'Common', value: rarityBreakdown.Common, color: COLORS.brownRGB },
  ].filter(d => d.value > 0);
  
  if (rarityData.length > 0) {
    drawHorizontalBarChart(pdf, rarityData, PAGE.margin, yPos, PAGE.contentWidth, 50, '');
    yPos += 58;
  }
  
  return currentPage; // Return the last page number used
};

// ─────────────────────────────────────────────────────────────────────────────
// ENTRY PAGE
// ─────────────────────────────────────────────────────────────────────────────

const createEntryPage = async (pdf, entry, pageNum, options = {}) => {
  const { 
    includePrompts = false, 
    photoSize = 'large',
    photosPerEntry = 'first',
    title = 'Your Costa Rica Expedition',
    badgeImage = null,
  } = options;
  
  pdf.addPage();
  
  pdf.setFillColor(...COLORS.creamRGB);
  pdf.rect(0, 0, PAGE.width, PAGE.height, 'F');
  
  drawCornerAccents(pdf);
  drawHeader(pdf, title);
  drawFooter(pdf, pageNum);
  
  let yPos = 30;
  
  // Entry name
  pdf.setFont('times', 'bold');
  pdf.setFontSize(26);
  pdf.setTextColor(...COLORS.darkBrownRGB);
  const name = entry.item?.name || entry.item?.title || 'Unknown';
  pdf.text(name, PAGE.width / 2, yPos, { align: 'center' });
  yPos += 8;
  
  // Category/subtitle
  const subtitle = entry.item?.category || entry.item?.subtitle || '';
  if (subtitle) {
    pdf.setFont('helvetica', 'italic');
    pdf.setFontSize(11);
    pdf.setTextColor(...COLORS.accentRGB);
    pdf.text(subtitle, PAGE.width / 2, yPos, { align: 'center' });
    yPos += 6;
  }
  
  // Date/time
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(...COLORS.brownRGB);
  const dateTime = `${formatDateNice(entry.data?.timestamp)} • ${formatTimeNice(entry.data?.timestamp)}`;
  pdf.text(dateTime, PAGE.width / 2, yPos, { align: 'center' });
  yPos += 10;
  
  drawDivider(pdf, yPos);
  yPos += 12;
  
  // Photos - max 4 per entry
  const photos = entry.data?.photos || [];
  const photosToShow = photosPerEntry === 'all' ? photos.slice(0, 4) : photos.slice(0, 1);
  
  let maxHeight;
  switch (photoSize) {
    case 'small': maxHeight = 50; break;
    case 'medium': maxHeight = 80; break;
    case 'large': 
    default: maxHeight = 110; break;
  }
  
  if (photosToShow.length > 0) {
    const halfWidth = (PAGE.contentWidth - 8) / 2; // 8mm gap between photos
    const gap = 6; // vertical gap between rows
    
    // Helper to get photo data
    const getPhotoData = (photo) => typeof photo === 'string' ? photo : photo?.data;
    
    // 4 photos - 2x2 grid
    if (photosToShow.length === 4) {
      const gridMaxHeight = 80; // Each cell max height
      
      // Row 1: photos 0 and 1 - render at same Y, track max height
      const startY1 = yPos;
      const result1 = await addImageToPDF(pdf, getPhotoData(photosToShow[0]), PAGE.margin, startY1, halfWidth, gridMaxHeight);
      const result2 = await addImageToPDF(pdf, getPhotoData(photosToShow[1]), PAGE.margin + halfWidth + 8, startY1, halfWidth, gridMaxHeight);
      const row1Height = Math.max(result1.height, result2.height);
      yPos = startY1 + row1Height + gap;
      
      // Row 2: photos 2 and 3
      if (yPos < PAGE.height - 60) {
        const startY2 = yPos;
        const result3 = await addImageToPDF(pdf, getPhotoData(photosToShow[2]), PAGE.margin, startY2, halfWidth, gridMaxHeight);
        const result4 = await addImageToPDF(pdf, getPhotoData(photosToShow[3]), PAGE.margin + halfWidth + 8, startY2, halfWidth, gridMaxHeight);
        const row2Height = Math.max(result3.height, result4.height);
        yPos = startY2 + row2Height + 8;
      }
      
    // 3 photos - 2 on top, 1 below (centered or full width based on orientation)
    } else if (photosToShow.length === 3) {
      // Row 1: photos 0 and 1
      const startY1 = yPos;
      const result1 = await addImageToPDF(pdf, getPhotoData(photosToShow[0]), PAGE.margin, startY1, halfWidth, maxHeight);
      const result2 = await addImageToPDF(pdf, getPhotoData(photosToShow[1]), PAGE.margin + halfWidth + 8, startY1, halfWidth, maxHeight);
      const row1Height = Math.max(result1.height, result2.height);
      yPos = startY1 + row1Height + gap;
      
      // Row 2: photo 2 (full width for horizontal, centered half for vertical)
      if (yPos < PAGE.height - 60) {
        const result3 = await addImageToPDF(pdf, getPhotoData(photosToShow[2]), PAGE.margin, yPos, PAGE.contentWidth, maxHeight);
        yPos += result3.height + 8;
      }
      
    // 2 photos - side by side
    } else if (photosToShow.length === 2) {
      const startY = yPos;
      const result1 = await addImageToPDF(pdf, getPhotoData(photosToShow[0]), PAGE.margin, startY, halfWidth, maxHeight);
      const result2 = await addImageToPDF(pdf, getPhotoData(photosToShow[1]), PAGE.margin + halfWidth + 8, startY, halfWidth, maxHeight);
      const rowHeight = Math.max(result1.height, result2.height);
      yPos = startY + rowHeight + 8;
      
    // 1 photo - full width
    } else {
      const photoData = getPhotoData(photosToShow[0]);
      if (photoData && yPos < PAGE.height - 60) {
        const result = await addImageToPDF(pdf, photoData, PAGE.margin, yPos, PAGE.contentWidth, maxHeight);
        if (result.height > 0) {
          yPos += result.height + 8;
        }
      }
    }
  }
  // Note: No placeholder for entries without photos - they go on compact pages
  
  // Journal prompt
  if (includePrompts && entry.data?.prompt) {
    pdf.setFont('helvetica', 'italic');
    pdf.setFontSize(10);
    pdf.setTextColor(...COLORS.accentRGB);
    const sanitizedPrompt = sanitizeText(entry.data.prompt);
    const promptLines = pdf.splitTextToSize(`"${sanitizedPrompt}"`, PAGE.contentWidth - 20);
    if (yPos + promptLines.length * 5 < PAGE.height - 50) {
      pdf.text(promptLines, PAGE.margin + 10, yPos);
      yPos += promptLines.length * 5 + 8;
    }
  }
  
  // Notes
  if (entry.data?.notes) {
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    pdf.setTextColor(...COLORS.darkBrownRGB);
    const sanitizedNotes = sanitizeText(entry.data.notes);
    const noteLines = pdf.splitTextToSize(sanitizedNotes, PAGE.contentWidth);
    
    const lineHeight = 5;
    const availableSpace = PAGE.height - yPos - 55; // Leave room for fact
    const maxLines = Math.floor(availableSpace / lineHeight);
    const linesToDraw = noteLines.slice(0, maxLines);
    
    pdf.text(linesToDraw, PAGE.margin, yPos);
    yPos += linesToDraw.length * lineHeight + 8;
  }
  
  // Animal or Moment fact (from curated database)
  const entryId = entry.id;
  const animalFact = ANIMAL_FACTS[entryId];
  const momentFact = MOMENT_FACTS[entryId];
  const factData = animalFact || momentFact;
  
  // Get fact from facts array (preferred) or single fact property
  const allFacts = factData?.facts || (factData?.fact ? [factData.fact] : []);
  const factToShow = allFacts.length > 0 ? allFacts[0] : null;
  
  if (factToShow && yPos < PAGE.height - 40) {
    // Draw a subtle divider line
    pdf.setDrawColor(...COLORS.lightAccentRGB);
    pdf.setLineWidth(0.5);
    pdf.line(PAGE.margin + 20, yPos, PAGE.width - PAGE.margin - 20, yPos);
    yPos += 8;
    
    // Scientific name in italics (only for animals)
    if (animalFact?.scientific) {
      pdf.setFont('times', 'italic');
      pdf.setFontSize(9);
      pdf.setTextColor(...COLORS.accentRGB);
      pdf.text(animalFact.scientific, PAGE.width / 2, yPos, { align: 'center' });
      yPos += 6;
    }
    
    // Fun fact
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(...COLORS.brownRGB);
    const sanitizedFact = sanitizeText(factToShow);
    const factLines = pdf.splitTextToSize(sanitizedFact, PAGE.contentWidth - 20);
    const maxFactLines = 4; // Limit fact length
    const factLinesToDraw = factLines.slice(0, maxFactLines);
    pdf.text(factLinesToDraw, PAGE.width / 2, yPos, { align: 'center', maxWidth: PAGE.contentWidth - 20 });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPACT ENTRIES PAGE (Multiple no-photo entries per page)
// ─────────────────────────────────────────────────────────────────────────────

const createCompactEntriesPage = (pdf, entries, startPageNum, options = {}) => {
  const { title = 'Your Costa Rica Expedition', sectionTitle = 'Additional Sightings' } = options;
  
  if (entries.length === 0) return 0;
  
  let pageNum = startPageNum;
  let currentPageStarted = false;
  let yPos = 0;
  const pageBottom = PAGE.height - 25; // Use more of the page
  
  entries.forEach((entry, index) => {
    // Calculate actual height needed for this entry
    const animalFact = ANIMAL_FACTS[entry.id];
    const momentFact = MOMENT_FACTS[entry.id];
    const factData = animalFact || momentFact;
    const allFacts = factData?.facts || (factData?.fact ? [factData.fact] : []);
    const hasNotes = entry.data?.notes;
    
    // Estimate: name line (4) + fact (~7) + notes (~4) + separator (4) = ~19-25mm per entry
    let entryHeight = 18; // Base
    if (allFacts.length > 0) entryHeight += 8;
    if (hasNotes) entryHeight += 4;
    
    // Check if we need a new page
    if (!currentPageStarted || yPos + entryHeight > pageBottom) {
      pdf.addPage();
      pdf.setFillColor(...COLORS.creamRGB);
      pdf.rect(0, 0, PAGE.width, PAGE.height, 'F');
      
      drawCornerAccents(pdf);
      drawHeader(pdf, title);
      drawFooter(pdf, pageNum);
      
      // Page title for first page only
      if (!currentPageStarted) {
        pdf.setFont('times', 'bold');
        pdf.setFontSize(14);
        pdf.setTextColor(...COLORS.darkBrownRGB);
        pdf.text(sectionTitle, PAGE.width / 2, 28, { align: 'center' });
        
        drawDivider(pdf, 33, 'simple');
        yPos = 38;
      } else {
        yPos = 26;
      }
      
      currentPageStarted = true;
      pageNum++;
    }
    
    // Draw compact entry
    const name = entry.item?.name || entry.item?.title || 'Unknown';
    const category = entry.item?.category || entry.item?.subtitle || '';
    const dateStr = entry.data?.timestamp ? formatDateNice(entry.data.timestamp) : '';
    
    // Row 1: Species name (bold) + scientific name + category/date on right
    pdf.setFont('times', 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(...COLORS.darkBrownRGB);
    pdf.text(name, PAGE.margin, yPos);
    
    // Scientific name inline after species name
    if (animalFact?.scientific) {
      const nameWidth = pdf.getTextWidth(name);
      pdf.setFont('times', 'italic');
      pdf.setFontSize(7);
      pdf.setTextColor(...COLORS.brownRGB);
      pdf.text(` (${animalFact.scientific})`, PAGE.margin + nameWidth, yPos);
    }
    
    // Category and date on right
    const rightText = category && dateStr ? `${category} • ${dateStr}` : (category || dateStr);
    if (rightText) {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7);
      pdf.setTextColor(...COLORS.accentRGB);
      pdf.text(rightText, PAGE.width - PAGE.margin, yPos, { align: 'right' });
    }
    yPos += 4;
    
    // One fact only (keep it brief)
    if (allFacts.length > 0) {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7.5);
      pdf.setTextColor(...COLORS.brownRGB);
      const sanitizedFact = sanitizeText(allFacts[0]);
      const factLines = pdf.splitTextToSize(sanitizedFact, PAGE.contentWidth);
      const linesToDraw = factLines.slice(0, 2); // Max 2 lines
      pdf.text(linesToDraw, PAGE.margin, yPos);
      yPos += linesToDraw.length * 3 + 1;
    }
    
    // Notes (if any, single line)
    if (entry.data?.notes) {
      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(7);
      pdf.setTextColor(...COLORS.accentRGB);
      const sanitizedNotes = sanitizeText(entry.data.notes);
      const noteText = sanitizedNotes.length > 90 ? sanitizedNotes.substring(0, 87) + '...' : sanitizedNotes;
      pdf.text(`"${noteText}"`, PAGE.margin, yPos);
      yPos += 3;
    }
    
    // Thin separator line
    yPos += 1.5;
    pdf.setDrawColor(...COLORS.lightAccentRGB);
    pdf.setLineWidth(0.15);
    pdf.line(PAGE.margin + 10, yPos, PAGE.width - PAGE.margin - 10, yPos);
    yPos += 3;
  });
  
  return pageNum - startPageNum; // Return number of pages created
};

// ─────────────────────────────────────────────────────────────────────────────
// ARTIFACTS PAGE
// ─────────────────────────────────────────────────────────────────────────────

const createSouvenirsPage = (pdf, earnedBadges, pageNum, options) => {
  let currentPage = pageNum;
  let yPos = 0;
  const bottomMargin = 40;
  
  const startNewPage = (isFirst) => {
    pdf.addPage();
    pdf.setFillColor(...COLORS.creamRGB);
    pdf.rect(0, 0, PAGE.width, PAGE.height, 'F');
    drawCornerAccents(pdf);
    drawHeader(pdf, options.title);
    drawFooter(pdf, currentPage);
    
    if (isFirst) {
      pdf.setFont('times', 'bold');
      pdf.setFontSize(28);
      pdf.setTextColor(...COLORS.darkBrownRGB);
      pdf.text('Artifacts Collected', PAGE.width / 2, 45, { align: 'center' });
      
      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(11);
      pdf.setTextColor(...COLORS.accentRGB);
      pdf.text(`${earnedBadges.length} artifacts collected during your expedition`, PAGE.width / 2, 55, { align: 'center' });
      
      drawDivider(pdf, 62, 'fancy');
      yPos = 72;
    } else {
      yPos = 35;
    }
  };
  
  // Start first page
  startNewPage(true);
  
  // Render badges in 2-column layout with dynamic flow
  const colWidth = (PAGE.contentWidth - 10) / 2;
  const cols = [PAGE.margin, PAGE.margin + colWidth + 10];
  let col = 0;
  let rowStartY = yPos;
  let leftHeight = 0;
  let rightHeight = 0;
  
  earnedBadges.forEach((badge, index) => {
    // Measure this badge's height
    pdf.setFont('times', 'bold');
    pdf.setFontSize(10);
    const nameText = badge.name || 'Achievement';
    const nameLines = pdf.splitTextToSize(nameText, colWidth - 4);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.5);
    const desc = badge.description || '';
    const descLines = pdf.splitTextToSize(desc, colWidth - 4);
    const descToShow = descLines.slice(0, 2); // Max 2 lines of description
    
    const itemHeight = nameLines.length * 4.5 + descToShow.length * 3.5 + 5; // name + desc + padding
    
    // Check if we need a new page
    const currentY = col === 0 ? rowStartY : rowStartY;
    if (currentY + itemHeight > PAGE.height - bottomMargin) {
      // Before new page, advance yPos past any remaining right column
      currentPage++;
      startNewPage(false);
      col = 0;
      rowStartY = yPos;
      leftHeight = 0;
      rightHeight = 0;
    }
    
    const x = cols[col];
    const y = col === 0 ? rowStartY + leftHeight : rowStartY + rightHeight;
    
    // Rarity indicator dot
    const rarityColor = badge.rarity === 'Legendary' ? [180, 140, 50] :
                        badge.rarity === 'Gold' ? [160, 130, 40] :
                        badge.rarity === 'Silver' ? [140, 150, 160] :
                        COLORS.accentRGB;
    pdf.setFillColor(...rarityColor);
    pdf.circle(x + 2, y + 2, 1.5, 'F');
    
    // Badge name
    pdf.setFont('times', 'bold');
    pdf.setFontSize(10);
    pdf.setTextColor(...COLORS.darkBrownRGB);
    nameLines.forEach((line, li) => {
      pdf.text(line, x + 6, y + 3 + (li * 4.5));
    });
    
    // Description
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.5);
    pdf.setTextColor(...COLORS.brownRGB);
    const descStartY = y + 3 + nameLines.length * 4.5;
    descToShow.forEach((line, li) => {
      pdf.text(line, x + 6, descStartY + (li * 3.5));
    });
    
    // Track column heights
    if (col === 0) {
      leftHeight += itemHeight;
    } else {
      rightHeight += itemHeight;
    }
    
    // Alternate columns
    col = 1 - col;
    
    // After filling both columns of a pair, advance rowStartY if needed
    if (col === 0) {
      // We just finished the right column, advance row
      rowStartY += Math.max(leftHeight, rightHeight);
      leftHeight = 0;
      rightHeight = 0;
    }
  });
  
  return currentPage - pageNum + 1;
};

// ─────────────────────────────────────────────────────────────────────────────
// NOTES PAGE
// ─────────────────────────────────────────────────────────────────────────────

const createNotesPage = (pdf, pageNum, options) => {
  pdf.addPage();
  
  pdf.setFillColor(...COLORS.creamRGB);
  pdf.rect(0, 0, PAGE.width, PAGE.height, 'F');
  
  drawCornerAccents(pdf);
  drawHeader(pdf, options.title);
  drawFooter(pdf, pageNum);
  
  // Title
  pdf.setFont('times', 'bold');
  pdf.setFontSize(24);
  pdf.setTextColor(...COLORS.darkBrownRGB);
  pdf.text('Additional Notes', PAGE.width / 2, 45, { align: 'center' });
  
  drawDivider(pdf, 52, 'fancy');
  
  // Draw faint lines
  pdf.setDrawColor(...COLORS.lightAccentRGB);
  pdf.setLineWidth(0.1);
  
  for (let y = 70; y < PAGE.height - 40; y += 10) {
    pdf.line(PAGE.margin + 10, y, PAGE.width - PAGE.margin - 10, y);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT FUNCTION
// ─────────────────────────────────────────────────────────────────────────────

export const generateMemoryBookPDF = async (archive, allSpecies, allMeanings, badges, options = {}) => {
  const {
    title = 'Your Costa Rica Expedition',
    travelers = '',
    fromDate = archive?.startDate,
    toDate = null,
    occasion = '',
    dedication = '',
    expeditionGuide = '',
    includeSpecies = true,
    includeMoments = true,
    includeCustom = true,
    includeSouvenirs = true,
    includeStats = true,
    includePrompts = false,
    includeNotesPage = true,
    includeEmptyEntries = false,
    photoSize = 'large',
    photosPerEntry = 'first',
    grouping = 'chronological',
    souvenirsDisplay = 'text',
    stats = { all: true },
    coverType = 'app',
    customCoverPhoto = null,
    onProgress = () => {},
  } = options;
  
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });
  
  // Polyfill triangle method
  ensureTriangle(pdf);
  
  onProgress('Creating cover page...');
  
  // Cover page
  await createCoverPage(pdf, { 
    title, travelers, fromDate, toDate, occasion, dedication, expeditionGuide,
    coverType, customCoverPhoto 
  });
  
  // Collect entries
  const entries = [];
  
  // Species
  if (includeSpecies) {
    Object.entries(archive?.species || {})
      .filter(([_, v]) => v && (includeEmptyEntries || v.notes || v.photos?.length > 0))
      .forEach(([id, data]) => {
        const item = allSpecies.find(s => s.id === id);
        if (item) {
          entries.push({ type: 'species', id, data, item });
        }
      });
  }
  
  // Moments
  if (includeMoments) {
    Object.entries(archive?.meanings || {})
      .filter(([_, v]) => v && (includeEmptyEntries || v.notes || v.photos?.length > 0))
      .forEach(([id, data]) => {
        const item = allMeanings.find(m => m.id === id);
        if (item) {
          entries.push({ type: 'meaning', id, data, item });
        }
      });
  }
  
  // Custom entries
  if (includeCustom && archive?.custom) {
    (archive.custom.species || [])
      .filter(e => e.experienced && e.name)
      .forEach(entry => {
        entries.push({
          type: 'custom_species',
          id: entry.id,
          data: { 
            timestamp: entry.timestamp, 
            notes: entry.description, 
            photos: entry.photo ? [entry.photo] : [] 
          },
          item: { name: entry.name, category: 'Custom Species' },
        });
      });
    
    (archive.custom.moments || [])
      .filter(e => e.experienced && e.name)
      .forEach(entry => {
        entries.push({
          type: 'custom_moment',
          id: entry.id,
          data: { 
            timestamp: entry.timestamp, 
            notes: entry.description, 
            photos: entry.photo ? [entry.photo] : [] 
          },
          item: { title: entry.name, subtitle: 'Custom Moment' },
        });
      });
  }
  
  // Sort entries based on grouping
  const startDate = fromDate || archive?.startDate;
  
  if (grouping === 'day') {
    entries.sort((a, b) => {
      const dayA = getDayNumber(a.data?.timestamp, startDate);
      const dayB = getDayNumber(b.data?.timestamp, startDate);
      if (dayA !== dayB) return dayA - dayB;
      return new Date(a.data?.timestamp || 0) - new Date(b.data?.timestamp || 0);
    });
  } else if (grouping === 'category') {
    entries.sort((a, b) => {
      const catA = a.item?.category || a.item?.subtitle || 'ZZZ';
      const catB = b.item?.category || b.item?.subtitle || 'ZZZ';
      if (catA !== catB) return catA.localeCompare(catB);
      return new Date(a.data?.timestamp || 0) - new Date(b.data?.timestamp || 0);
    });
  } else {
    // Chronological
    entries.sort((a, b) => new Date(a.data?.timestamp || 0) - new Date(b.data?.timestamp || 0));
  }
  
  onProgress('Organizing content...');
  
  // ═══════════════════════════════════════════════════════════════════════════
  // SEPARATE ENTRIES INTO ORGANIZED SECTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  
  // Species with photos
  const speciesWithPhotos = entries.filter(e => 
    (e.type === 'species' || e.type === 'custom_species') && e.data?.photos?.length > 0
  );
  
  // Species without photos
  const speciesWithoutPhotos = entries.filter(e => 
    (e.type === 'species' || e.type === 'custom_species') && !e.data?.photos?.length
  );
  
  // Moments with photos
  const momentsWithPhotos = entries.filter(e => 
    (e.type === 'meaning' || e.type === 'custom_moment') && e.data?.photos?.length > 0
  );
  
  // Moments without photos
  const momentsWithoutPhotos = entries.filter(e => 
    (e.type === 'meaning' || e.type === 'custom_moment') && !e.data?.photos?.length
  );
  
  // Get badges
  const earnedBadgeIds = archive?.badges || [];
  const earnedBadges = badges.filter(b => earnedBadgeIds.includes(b.id));
  
  // ═══════════════════════════════════════════════════════════════════════════
  // CALCULATE PAGE NUMBERS FOR TOC
  // ═══════════════════════════════════════════════════════════════════════════
  
  let pageNum = 2; // After cover
  const tocSections = [];
  
  // TOC page
  const tocPage = pageNum;
  pageNum++;
  
  // About Your Destination (2-3 pages with wildlife showcases)
  const destinationStart = pageNum;
  tocSections.push({ title: 'About Your Destination', startPage: destinationStart, endPage: destinationStart + 2, pages: true, isSection: true });
  pageNum += 3; // Reserve 3 pages for destination + wildlife showcases
  
  // Stats pages (estimate 2 pages)
  let statsStart = null, statsEnd = null;
  if (includeStats) {
    statsStart = pageNum;
    pageNum += 2; // Stats typically spans 2 pages
    statsEnd = pageNum - 1;
    tocSections.push({ title: 'Expedition Statistics', startPage: statsStart, endPage: statsEnd, pages: true, isSection: true });
  }
  
  // Species with photos
  let speciesPhotosStart = null, speciesPhotosEnd = null;
  if (speciesWithPhotos.length > 0) {
    speciesPhotosStart = pageNum;
    pageNum += speciesWithPhotos.length;
    speciesPhotosEnd = pageNum - 1;
    tocSections.push({ title: 'Species Sightings', startPage: speciesPhotosStart, endPage: speciesPhotosEnd, pages: true, isSection: true });
  }
  
  // Species without photos (compact)
  let speciesCompactStart = null, speciesCompactEnd = null;
  if (speciesWithoutPhotos.length > 0) {
    speciesCompactStart = pageNum;
    const compactPages = Math.ceil(speciesWithoutPhotos.length / 10);
    pageNum += compactPages;
    speciesCompactEnd = pageNum - 1;
    tocSections.push({ title: 'Additional Species', startPage: speciesCompactStart, endPage: speciesCompactEnd, pages: true, isSection: false });
  }
  
  // Moments with photos
  let momentsPhotosStart = null, momentsPhotosEnd = null;
  if (momentsWithPhotos.length > 0) {
    momentsPhotosStart = pageNum;
    pageNum += momentsWithPhotos.length;
    momentsPhotosEnd = pageNum - 1;
    tocSections.push({ title: 'Moments & Experiences', startPage: momentsPhotosStart, endPage: momentsPhotosEnd, pages: true, isSection: true });
  }
  
  // Moments without photos (compact)
  let momentsCompactStart = null, momentsCompactEnd = null;
  if (momentsWithoutPhotos.length > 0) {
    momentsCompactStart = pageNum;
    const compactPages = Math.ceil(momentsWithoutPhotos.length / 10);
    pageNum += compactPages;
    momentsCompactEnd = pageNum - 1;
    tocSections.push({ title: 'Additional Moments', startPage: momentsCompactStart, endPage: momentsCompactEnd, pages: true, isSection: false });
  }
  
  // Artifacts
  let souvenirsStart = null, souvenirsEnd = null;
  if (includeSouvenirs && earnedBadges.length > 0) {
    souvenirsStart = pageNum;
    const souvenirsPages = Math.ceil(earnedBadges.length / 12); // ~12 badges per page (compact)
    pageNum += souvenirsPages;
    souvenirsEnd = pageNum - 1;
    tocSections.push({ title: 'Artifacts Collected', startPage: souvenirsStart, endPage: souvenirsEnd, pages: true, isSection: true });
  }
  
  // Notes page
  let notesPage = null;
  if (includeNotesPage) {
    notesPage = pageNum;
    tocSections.push({ title: 'Notes', startPage: notesPage, endPage: notesPage, pages: true, isSection: false });
    pageNum++;
  }
  
  // ═══════════════════════════════════════════════════════════════════════════
  // CREATE ALL PAGES IN ORDER
  // ═══════════════════════════════════════════════════════════════════════════
  
  onProgress('Creating table of contents...');
  createTableOfContents(pdf, { ...options, title }, tocPage, tocSections);
  
  // 1. DESTINATION PAGE
  onProgress('Creating destination overview...');
  createDestinationPage(pdf, { title }, destinationStart, archive);
  
  // 2. STATS PAGES
  if (includeStats) {
    onProgress('Creating statistics pages...');
    createStatsPage(pdf, archive, entries, allSpecies, { ...options, title, stats }, statsStart);
  }
  
  // 3. SPECIES WITH PHOTOS (full page each)
  pageNum = speciesPhotosStart || (statsEnd ? statsEnd + 1 : destinationStart + 1);
  for (let i = 0; i < speciesWithPhotos.length; i++) {
    const entry = speciesWithPhotos[i];
    onProgress(`Creating species ${i + 1} of ${speciesWithPhotos.length}...`);
    await createEntryPage(pdf, entry, pageNum, { includePrompts, photoSize, photosPerEntry, title });
    pageNum++;
  }
  
  // 4. SPECIES WITHOUT PHOTOS (compact)
  if (speciesWithoutPhotos.length > 0) {
    onProgress(`Creating compact species pages...`);
    createCompactEntriesPage(pdf, speciesWithoutPhotos, speciesCompactStart, { title, sectionTitle: 'Additional Species' });
  }
  
  // 5. MOMENTS WITH PHOTOS (full page each)
  pageNum = momentsPhotosStart || pageNum;
  for (let i = 0; i < momentsWithPhotos.length; i++) {
    const entry = momentsWithPhotos[i];
    onProgress(`Creating moment ${i + 1} of ${momentsWithPhotos.length}...`);
    await createEntryPage(pdf, entry, pageNum, { includePrompts, photoSize, photosPerEntry, title });
    pageNum++;
  }
  
  // 6. MOMENTS WITHOUT PHOTOS (compact)
  if (momentsWithoutPhotos.length > 0) {
    onProgress(`Creating compact moments pages...`);
    createCompactEntriesPage(pdf, momentsWithoutPhotos, momentsCompactStart, { title, sectionTitle: 'Additional Moments' });
  }
  
  // 7. SOUVENIRS PAGES
  if (includeSouvenirs && earnedBadges.length > 0) {
    onProgress('Creating artifacts pages...');
    createSouvenirsPage(pdf, earnedBadges, souvenirsStart, { ...options, title, souvenirsDisplay });
  }
  
  // 8. NOTES PAGE
  if (includeNotesPage) {
    onProgress('Creating notes page...');
    createNotesPage(pdf, notesPage, { ...options, title });
  }
  
  onProgress('Finishing...');
  
  // Save — with fallback for mobile/PWA
  const filename = `${title.replace(/[^a-z0-9]/gi, '_')}_Memory_Book.pdf`;
  try {
    const blob = pdf.output('blob');
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (e) {
    // Fallback to jsPDF native save
    pdf.save(filename);
  }
  
  return { success: true, filename, pageCount: pageNum };
};

export default generateMemoryBookPDF;
