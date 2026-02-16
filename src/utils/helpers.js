// Shared helper functions

export const createArchive = () => ({
  species: {},
  meanings: {},
  badges: [],
  custom: { species: [], moments: [] },
  startDate: new Date().toISOString(),
});

export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const formatTime = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

export const getRarityColor = (rarity) => {
  switch (rarity) {
    case 'Common': return { bg: 'rgba(255, 193, 7, 0.12)', border: 'rgba(255, 193, 7, 0.3)', text: '#FFD54F' };
    case 'Uncommon': return { bg: 'rgba(76, 132, 168, 0.15)', border: 'rgba(76, 132, 168, 0.3)', text: '#4C84A8' };
    case 'Rare': return { bg: 'rgba(46, 139, 87, 0.15)', border: 'rgba(46, 139, 87, 0.3)', text: '#2E8B57' };
    case 'Legendary': return { bg: 'rgba(255, 185, 0, 0.15)', border: 'rgba(255, 185, 0, 0.3)', text: '#FFB900' };
    default: return { bg: 'rgba(100, 100, 100, 0.15)', border: 'rgba(150, 150, 150, 0.3)', text: '#999' };
  }
};

export const groupBy = (arr, key) => {
  return arr.reduce((acc, item) => {
    const k = item[key];
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});
};

export const sortedGroupEntries = (grouped) => {
  return Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0]));
};

export const compressImage = async (dataUrl, maxWidth = 1200) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ratio = Math.min(maxWidth / img.width, 1);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', 0.8));
    };
    img.src = dataUrl;
  });
};

export const readFileAsDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const getContextualPrompt = (item, type) => {
  if (type === 'species') return `What was it like seeing a ${item.name}?`;
  return item.prompt || `Tell us about this moment.`;
};
