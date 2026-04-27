import React, { useState } from 'react';
import { blobPath } from '../utils/mapLayout.js';
import { islandColor, scoreToSize } from '../utils/colors.js';

// Say/Do gap colour: teal (low) → amber (mid) → pink (high)
function sayDoColor(gap) {
  if (gap >= 75) return '#FF6B9D';
  if (gap >= 50) return '#FAAD14';
  return '#4ECDC4';
}

export default function IslandBlob({ island, index, onClick, isSelected, scoreMin, scoreMax }) {
  const [hovered, setHovered] = useState(false);
  const colors = islandColor(island.tier);
  const r = scoreToSize(island.score, scoreMin, scoreMax);
  const cx = island.mapX;
  const cy = island.mapY;
  const path = blobPath(cx, cy, r, index + 1);

  const selected = isSelected;
  const active = hovered || selected;
  const isUnexplored = island.noveltyDistance === 'unexplored';
  const gap = island.sayDo?.gap;
  const gapColor = gap != null ? sayDoColor(gap) : null;

  // Dashed stroke for unexplored — computed as SVG dasharray
  const strokeDash = isUnexplored ? '6 3' : undefined;
  // Unexplored islands get a faint pink outer ring; familiar get the standard tier glow
  const glowColor = isUnexplored
    ? 'rgba(255, 107, 157, 0.22)'
    : colors.glow;

  return (
    <g
      className="island-group"
      onClick={() => onClick(island)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      {/* Invisible large touch target */}
      <circle
        cx={cx}
        cy={cy}
        r={Math.max(r * 1.8, 35)}
        fill="transparent"
        style={{ cursor: 'pointer' }}
      />

      {/* Glow ring — pink for unexplored, tier colour for familiar */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={r * 1.6}
        ry={r * 1.3}
        fill={glowColor}
        opacity={active ? 0.95 : 0.5}
        style={{ transition: 'opacity 0.3s' }}
      />

      {/* Shadow blob underneath */}
      <path
        d={blobPath(cx + 3, cy + 5, r * 0.92, index + 100)}
        fill="rgba(0,0,0,0.35)"
        style={{ transition: 'all 0.3s' }}
      />

      {/* Main island blob */}
      <path
        d={path}
        fill={colors.fill}
        stroke={isUnexplored ? '#FF6B9D' : colors.stroke}
        strokeWidth={active ? 2.5 : 1.5}
        strokeDasharray={strokeDash}
        opacity={active ? 1 : 0.88}
        style={{ transition: 'all 0.3s' }}
      />

      {/* Inner texture highlight */}
      <path
        d={blobPath(cx - r * 0.15, cy - r * 0.2, r * 0.45, index + 50)}
        fill="rgba(255,255,255,0.1)"
      />

      {/* Score label */}
      <text
        x={cx}
        y={cy + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="rgba(10,15,26,0.9)"
        fontSize={r > 55 ? 13 : 11}
        fontWeight="700"
        fontFamily="'Inter', sans-serif"
        style={{ pointerEvents: 'none' }}
      >
        {island.score}
      </text>

      {/* Island name label below */}
      <text
        x={cx}
        y={cy + r + 14}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={active ? (isUnexplored ? '#FF6B9D' : colors.stroke) : 'rgba(240,237,232,0.7)'}
        fontSize={10}
        fontWeight="500"
        fontFamily="'Inter', sans-serif"
        style={{ pointerEvents: 'none', transition: 'fill 0.3s' }}
      >
        {island.name.length > 22 ? island.name.slice(0, 21) + '…' : island.name}
      </text>

      {/* Tier badge — top right */}
      <circle
        cx={cx + r * 0.65}
        cy={cy - r * 0.65}
        r={9}
        fill={island.tier === 1 ? '#F5A623' : '#4ECDC4'}
        stroke="rgba(10,15,26,0.8)"
        strokeWidth={1.5}
      />
      <text
        x={cx + r * 0.65}
        y={cy - r * 0.65 + 0.5}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="rgba(10,15,26,0.95)"
        fontSize={8}
        fontWeight="800"
        fontFamily="'Inter', sans-serif"
        style={{ pointerEvents: 'none' }}
      >
        T{island.tier}
      </text>

      {/* Say/Do gap badge — bottom left, only if data exists */}
      {gap != null && (
        <>
          <circle
            cx={cx - r * 0.65}
            cy={cy + r * 0.65}
            r={9}
            fill={gapColor}
            stroke="rgba(10,15,26,0.8)"
            strokeWidth={1.5}
            opacity={0.92}
          />
          <text
            x={cx - r * 0.65}
            y={cy + r * 0.65 + 0.5}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(10,15,26,0.95)"
            fontSize={7}
            fontWeight="800"
            fontFamily="'Inter', sans-serif"
            style={{ pointerEvents: 'none' }}
          >
            {gap}
          </text>
        </>
      )}

      {/* Hover tooltip — expanded to show novelty + gap */}
      {hovered && !isSelected && (
        <g>
          <rect
            x={cx - 82}
            y={cy - r - 60}
            width={164}
            height={50}
            rx={6}
            fill="rgba(13,21,38,0.97)"
            stroke={isUnexplored ? '#FF6B9D' : colors.stroke}
            strokeWidth={1}
          />
          <text
            x={cx}
            y={cy - r - 46}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={isUnexplored ? '#FF6B9D' : colors.stroke}
            fontSize={10.5}
            fontWeight="600"
            fontFamily="'Inter', sans-serif"
            style={{ pointerEvents: 'none' }}
          >
            {island.name.length > 24 ? island.name.slice(0, 23) + '…' : island.name}
          </text>
          <text
            x={cx}
            y={cy - r - 31}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(240,237,232,0.55)"
            fontSize={9}
            fontFamily="'Inter', sans-serif"
            style={{ pointerEvents: 'none' }}
          >
            {island.noveltyDistance === 'unexplored' ? '◈ Unexplored Lands' : '◈ Familiar Landscape'}
            {gap != null ? `  ·  S/D gap ${gap}` : ''}
          </text>
          <text
            x={cx}
            y={cy - r - 17}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(240,237,232,0.38)"
            fontSize={8.5}
            fontFamily="'Inter', sans-serif"
            style={{ pointerEvents: 'none' }}
          >
            Receptivity {island.score} · {island.window}
          </text>
        </g>
      )}
    </g>
  );
}
