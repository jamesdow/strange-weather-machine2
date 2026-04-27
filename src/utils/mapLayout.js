// Organic blob path generation for island shapes

/**
 * Generate an organic blob SVG path centred at (cx, cy) with radius r.
 * Uses a fixed seed per island id so blobs are stable across renders.
 */
export function blobPath(cx, cy, r, seed = 0) {
  const points = 8;
  const angleStep = (Math.PI * 2) / points;
  const variance = 0.32;

  // Simple deterministic noise from seed
  function pseudoRandom(n) {
    const x = Math.sin(seed * 9301 + n * 49297 + 233720) * 43758.5453;
    return x - Math.floor(x);
  }

  const pts = [];
  for (let i = 0; i < points; i++) {
    const angle = i * angleStep - Math.PI / 2;
    const rand = pseudoRandom(i);
    const radius = r * (1 - variance / 2 + rand * variance);
    pts.push({
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
    });
  }

  // Build smooth cubic bezier path
  const path = [];
  for (let i = 0; i < pts.length; i++) {
    const curr = pts[i];
    const next = pts[(i + 1) % pts.length];
    const prev = pts[(i - 1 + pts.length) % pts.length];

    const cpDist = 0.38;
    const cp1x = curr.x + (next.x - prev.x) * cpDist;
    const cp1y = curr.y + (next.y - prev.y) * cpDist;

    if (i === 0) {
      path.push(`M ${curr.x.toFixed(2)} ${curr.y.toFixed(2)}`);
    }
    path.push(`C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}`);
  }

  // Close the path with proper control points
  const result = [];
  for (let i = 0; i < pts.length; i++) {
    const curr = pts[i];
    const next = pts[(i + 1) % pts.length];
    const nextNext = pts[(i + 2) % pts.length];
    const prev = pts[(i - 1 + pts.length) % pts.length];

    const cpDist = 0.3;

    const cp1x = curr.x + (next.x - prev.x) * cpDist;
    const cp1y = curr.y + (next.y - prev.y) * cpDist;
    const cp2x = next.x - (nextNext.x - curr.x) * cpDist;
    const cp2y = next.y - (nextNext.y - curr.y) * cpDist;

    if (i === 0) {
      result.push(`M ${curr.x.toFixed(2)} ${curr.y.toFixed(2)}`);
    }
    result.push(
      `C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${next.x.toFixed(2)} ${next.y.toFixed(2)}`
    );
  }
  result.push('Z');
  return result.join(' ');
}

/** Map viewport dimensions */
export const MAP_WIDTH = 980;
export const MAP_HEIGHT = 780;
export const HOME_X = 490;
export const HOME_Y = 390;
export const HOME_RADIUS = 52;
