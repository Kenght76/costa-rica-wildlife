// Local storage utilities for Costa Rica Wildlife app

const STORAGE_KEY = 'costa-rica-wildlife-archive';

export const loadArchive = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading archive:', error);
  }
  return {
    species: {},
    meanings: {},
    badges: [],
    custom: { species: [], moments: [], expeditions: [] },
    startDate: null,
  };
};

export const saveArchive = (archive) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(archive));
    return true;
  } catch (error) {
    console.error('Error saving archive:', error);
    return false;
  }
};

export const clearArchive = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing archive:', error);
    return false;
  }
};

export const exportArchive = () => {
  const archive = loadArchive();
  const dataStr = JSON.stringify(archive, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `costa-rica-wildlife-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const importArchive = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        saveArchive(data);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};
