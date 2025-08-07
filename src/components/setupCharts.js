import { Chart as ChartJS } from 'chart.js';

export const getResponsiveFontSize = () => {
  const width = window.innerWidth;
  if (width > 2000) return 19; 
  if (width > 1600) return 17;
  if (width > 1280) return 13;
  if (width > 768) return 12;
  return 11;
};

let hasConfigured = false;

export const configureChartDefaults = () => {
  if (hasConfigured) return; // Avoid re-configuring globally
  hasConfigured = true;

  ChartJS.defaults.font.size = getResponsiveFontSize();

  // Optional: Also update on resize (for dynamic font adaptation)
  window.addEventListener('resize', () => {
    ChartJS.defaults.font.size = getResponsiveFontSize();
  });
};
