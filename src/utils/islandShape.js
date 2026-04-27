// Island shape generation using seeded noise for organic coastlines

// Simple seeded PRNG (Mulberry32)
function mulberry32(seed) {
  return function() {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// Convert string ID to numeric seed
function idToSeed(id) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Generate organic island SVG path
// Returns a path string centered at (0,0) with approximate radius `r`
export function generateIslandPath(id, radius, complexity = 0.6) {
  const seed = idToSeed(id);
  const rand = mulberry32(seed);
  
  // Number of control points (more = more complex coastline)
  const numPoints = Math.floor(12 + complexity * 10);
  const points = [];
  
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 2;
    
    // Perlin-like noise via multiple harmonics
    const noise = 
      (rand() - 0.5) * 0.45 +
      (rand() - 0.5) * 0.25 +
      (rand() - 0.5) * 0.12;
    
    const r = radius * (1 + noise * complexity);
    points.push({
      x: Math.cos(angle) * r,
      y: Math.sin(angle) * r
    });
  }
  
  // Create smooth SVG path using quadratic curves
  let path = '';
  for (let i = 0; i < points.length; i++) {
    const curr = points[i];
    const next = points[(i + 1) % points.length];
    const midX = (curr.x + next.x) / 2;
    const midY = (curr.y + next.y) / 2;
    
    if (i === 0) {
      path += `M ${midX.toFixed(1)} ${midY.toFixed(1)}`;
    }
    path += ` Q ${curr.x.toFixed(1)} ${curr.y.toFixed(1)} ${midX.toFixed(1)} ${midY.toFixed(1)}`;
  }
  path += ' Z';
  
  return path;
}

// Generate beach ring path (slightly larger, same shape)
export function generateBeachPath(id, radius, complexity = 0.6) {
  return generateIslandPath(id, radius * 1.15, complexity * 0.8);
}

// Get receptivity colour from score (0 = barren desert, 1 = lush forest)
export function receptivityToColor(score) {
  if (score < 0.15) return '#8c6b35'; // Deep desert
  if (score < 0.30) return '#c2a36e'; // Sandy desert
  if (score < 0.45) return '#b5a455'; // Dry scrubland
  if (score < 0.55) return '#9aab5a'; // Yellow-green scrubland
  if (score < 0.65) return '#7d9440'; // Sparse grassland
  if (score < 0.75) return '#5a9e4f'; // Grassland
  if (score < 0.85) return '#438a3a'; // Dense grassland
  return '#2d7a2f';                    // Forest/thriving
}

// Get a slightly darker variant for terrain variation
export function receptivityToColorDark(score) {
  if (score < 0.30) return '#6b4f28';
  if (score < 0.55) return '#7a8535';
  if (score < 0.75) return '#2d7030';
  return '#1a5e1c';
}

// Get shallow water colour (ring around island)
export const SHALLOW_WATER = '#163a5c';
export const BEACH_COLOR = '#e8d5a3';
export const OCEAN_COLOR = '#0a1628';
export const HOME_GLOW = '#f59e0b';
