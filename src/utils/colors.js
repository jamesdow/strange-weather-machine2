// Landfall / Fathom colour system

export const OCEAN = '#0a0f1a';
export const OCEAN_MID = '#0d1526';
export const OCEAN_LIGHT = '#111e33';

export const TIER1_PRIMARY = '#F5A623';
export const TIER1_GLOW = 'rgba(245, 166, 35, 0.35)';
export const TIER1_STROKE = '#FFD06B';

export const TIER2_PRIMARY = '#4ECDC4';
export const TIER2_GLOW = 'rgba(78, 205, 196, 0.25)';
export const TIER2_STROKE = '#8EEAE4';

export const HOME_PRIMARY = '#7B68EE';
export const HOME_GLOW = 'rgba(123, 104, 238, 0.4)';
export const HOME_STROKE = '#A89BF5';

export const TEXT_PRIMARY = '#F0EDE8';
export const TEXT_MUTED = '#8A9BB0';
export const TEXT_ACCENT = '#C8B89A';

export const COMPETITIVE_COLORS = {
  zero: { bg: 'rgba(82, 196, 26, 0.15)', text: '#52C41A', label: 'White Space' },
  contested: { bg: 'rgba(250, 173, 20, 0.15)', text: '#FAAD14', label: 'Contested' },
  owned: { bg: 'rgba(255, 77, 79, 0.15)', text: '#FF4D4F', label: 'Owned' },
};

// Novelty distance — Familiar Landscape vs Unexplored Lands
export const NOVELTY_COLORS = {
  familiar: { bg: 'rgba(123, 104, 238, 0.15)', text: '#A89BF5', label: 'Familiar Landscape' },
  unexplored: { bg: 'rgba(255, 107, 157, 0.15)', text: '#FF6B9D', label: 'Unexplored Lands' },
};

export function islandColor(tier) {
  return tier === 1
    ? { fill: TIER1_PRIMARY, glow: TIER1_GLOW, stroke: TIER1_STROKE }
    : { fill: TIER2_PRIMARY, glow: TIER2_GLOW, stroke: TIER2_STROKE };
}

export function scoreToSize(score, minScore, maxScore, minSize = 38, maxSize = 72) {
  // If explicit range not provided, we still need a fallback — but callers should pass brand-relative range
  const lo = minScore ?? 90;
  const hi = maxScore ?? 125;
  const ratio = Math.max(0, Math.min(1, (score - lo) / (hi - lo)));
  return minSize + ratio * (maxSize - minSize);
}
