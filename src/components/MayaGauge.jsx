import React from 'react';

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function polarPoint(cx, cy, radius, degrees) {
  const radians = (degrees * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  };
}

function describeArc(cx, cy, radius, startAngle, endAngle) {
  const start = polarPoint(cx, cy, radius, startAngle);
  const end = polarPoint(cx, cy, radius, endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

function getFitLabel(value) {
  if (value < 4) return 'Too Obvious';
  if (value <= 7) return 'Sweet Spot';
  return 'High Risk';
}

export default function MayaGauge({ value, compact = false }) {
  const safeValue = clamp(Number(value) || 0, 0, 10);
  const angle = -180 + (safeValue / 10) * 180;
  const needle = polarPoint(100, 92, compact ? 42 : 54, angle);
  const label = getFitLabel(safeValue);

  return (
    <div className={`maya-gauge ${compact ? 'compact' : ''}`}>
      <svg viewBox="0 0 200 120" role="img" aria-label={`MAYA fit: ${label}`}>
        <path className="maya-arc low" d={describeArc(100, 92, 72, -180, -126)} />
        <path className="maya-arc sweet" d={describeArc(100, 92, 72, -126, -54)} />
        <path className="maya-arc high" d={describeArc(100, 92, 72, -54, 0)} />
        <line className="maya-baseline" x1="28" y1="92" x2="172" y2="92" />
        <line className="maya-needle" x1="100" y1="92" x2={needle.x} y2={needle.y} />
        <circle className="maya-pin" cx="100" cy="92" r="5" />
        {!compact && (
          <>
            <text className="maya-axis-label" x="30" y="112">Too obvious</text>
            <text className="maya-axis-label" x="100" y="28" textAnchor="middle">Sweet spot</text>
            <text className="maya-axis-label" x="170" y="112" textAnchor="end">Too risky</text>
          </>
        )}
      </svg>
      <div className="maya-gauge-readout">
        <span>{label}</span>
        <strong>{safeValue.toFixed(safeValue % 1 === 0 ? 0 : 1)}</strong>
      </div>
    </div>
  );
}
