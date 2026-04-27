import React, { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react';
import IslandBlob from './IslandBlob.jsx';
import DetailPanel from './DetailPanel.jsx';
import { MAP_WIDTH, MAP_HEIGHT, HOME_X, HOME_Y, HOME_RADIUS, blobPath } from '../utils/mapLayout.js';
import { HOME_PRIMARY, HOME_GLOW, HOME_STROKE } from '../utils/colors.js';

const MIN_ZOOM = 0.3;
const MAX_ZOOM = 5;

function WavePath({ y, opacity }) {
  return (
    <path
      d={`M 0 ${y} Q 245 ${y - 18} 490 ${y} Q 735 ${y + 18} 980 ${y} L 980 ${y + 40} L 0 ${y + 40} Z`}
      fill={`rgba(255,255,255,${opacity})`}
    />
  );
}

function OceanGrid() {
  const dots = [];
  for (let x = 40; x < MAP_WIDTH; x += 55) {
    for (let y = 40; y < MAP_HEIGHT; y += 55) {
      const dist = Math.sqrt((x - HOME_X) ** 2 + (y - HOME_Y) ** 2);
      if (dist > 90) {
        dots.push(
          <circle
            key={`${x}-${y}`}
            cx={x + (Math.sin(x * 0.31) * 8)}
            cy={y + (Math.cos(y * 0.27) * 8)}
            r={1}
            fill="rgba(255,255,255,0.07)"
          />
        );
      }
    }
  }
  return <g>{dots}</g>;
}

export default function IslandMap({ brandData }) {
  const [selectedIsland, setSelectedIsland] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const scores = brandData.islands.map(i => i.score);
  const scoreMin = Math.min(...scores);
  const scoreMax = Math.max(...scores);

  const containerRef = useRef(null);
  const zoomRef = useRef(1);
  const panRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef(null);
  const hasDraggedRef = useRef(false);
  const brandWords = (brandData?.meta?.brand || 'Brand').toUpperCase().split(' ');

  // Keep refs in sync with state for use in event handlers
  useEffect(() => { zoomRef.current = zoom; }, [zoom]);
  useEffect(() => { panRef.current = pan; }, [pan]);

  // Center map in container on mount and on brand change
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // Use rAF to ensure layout is fully settled
    const frame = requestAnimationFrame(() => {
      const { width, height } = el.getBoundingClientRect();
      const initialZoom = Math.min(width / MAP_WIDTH, height / MAP_HEIGHT) * 0.9;
      const z = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, initialZoom));
      const initialPan = {
        x: (width - MAP_WIDTH * z) / 2,
        y: (height - MAP_HEIGHT * z) / 2,
      };
      setPan(initialPan);
      setZoom(z);
      panRef.current = initialPan;
      zoomRef.current = z;
    });
    return () => cancelAnimationFrame(frame);
  }, [brandData]);

  // --- Pan handlers ---
  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    hasDraggedRef.current = false;
    dragRef.current = {
      startClientX: e.clientX,
      startClientY: e.clientY,
      startPanX: panRef.current.x,
      startPanY: panRef.current.y,
    };
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startClientX;
    const dy = e.clientY - dragRef.current.startClientY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) hasDraggedRef.current = true;
    const next = {
      x: dragRef.current.startPanX + dx,
      y: dragRef.current.startPanY + dy,
    };
    panRef.current = next;
    setPan(next);
  }, []);

  const handleMouseUp = useCallback(() => {
    dragRef.current = null;
    setIsDragging(false);
  }, []);

  // --- Zoom on wheel (non-passive so we can preventDefault) ---
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      // Cursor position relative to container
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const factor = e.deltaY < 0 ? 1.1 : 0.909;
      const oldZoom = zoomRef.current;
      const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, oldZoom * factor));
      // Zoom toward cursor: keep the world point under cursor fixed
      // screenPoint = pan + zoom * worldPoint  (in CSS px)
      // cx = panX + oldZoom * worldX  =>  worldX = (cx - panX) / oldZoom
      // cx = panX_new + newZoom * worldX  =>  panX_new = cx - newZoom * worldX
      const next = {
        x: cx - (cx - panRef.current.x) * (newZoom / oldZoom),
        y: cy - (cy - panRef.current.y) * (newZoom / oldZoom),
      };
      panRef.current = next;
      zoomRef.current = newZoom;
      setPan(next);
      setZoom(newZoom);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // Global mouseup in case cursor leaves container
  useEffect(() => {
    const up = () => { dragRef.current = null; setIsDragging(false); };
    window.addEventListener('mouseup', up);
    return () => window.removeEventListener('mouseup', up);
  }, []);

  // --- Zoom buttons ---
  const doZoom = useCallback((factor) => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const cx = width / 2;
    const cy = height / 2;
    const oldZoom = zoomRef.current;
    const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, oldZoom * factor));
    const next = {
      x: cx - (cx - panRef.current.x) * (newZoom / oldZoom),
      y: cy - (cy - panRef.current.y) * (newZoom / oldZoom),
    };
    panRef.current = next;
    zoomRef.current = newZoom;
    setPan(next);
    setZoom(newZoom);
  }, []);

  const resetView = useCallback(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const z = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Math.min(width / MAP_WIDTH, height / MAP_HEIGHT) * 0.9));
    const next = { x: (width - MAP_WIDTH * z) / 2, y: (height - MAP_HEIGHT * z) / 2 };
    panRef.current = next;
    zoomRef.current = z;
    setPan(next);
    setZoom(z);
  }, []);

  const handleIslandClick = useCallback((island) => {
    if (hasDraggedRef.current) return;
    setSelectedIsland(prev => prev?.id === island.id ? null : island);
  }, []);

  const handleClose = () => setSelectedIsland(null);

  const homeBlob = blobPath(HOME_X, HOME_Y, HOME_RADIUS, 0);
  const homeShadow = blobPath(HOME_X + 4, HOME_Y + 6, HOME_RADIUS * 0.9, 99);

  return (
    <div className="map-shell">
      <div
        ref={containerRef}
        className={`map-container ${selectedIsland ? 'panel-open' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab', position: 'relative', overflow: 'hidden' }}
      >
        {/* SVG fills 100% of container — ocean background is always full-bleed */}
        <svg
          width="100%"
          height="100%"
          style={{ display: 'block', position: 'absolute', inset: 0 }}
        >
          <defs>
            <radialGradient id="oceanGrad" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="45%" stopColor="#1e40af" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </radialGradient>
            <linearGradient id="oceanLinear" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>

            <filter id="homeGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="islandGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Full-bleed background — always covers the whole SVG regardless of zoom/pan */}
          <rect width="100%" height="100%" fill="url(#oceanLinear)" />
          <rect width="100%" height="100%" fill="url(#oceanGrad)" opacity={0.55} />

          {/* Pan/zoom group — only the content moves, not the background */}
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>

            <WavePath y={130} opacity={0.012} />
            <WavePath y={310} opacity={0.018} />
            <WavePath y={510} opacity={0.013} />
            <WavePath y={680} opacity={0.016} />

            <OceanGrid />

            <circle cx={HOME_X} cy={HOME_Y} r={220} fill="none" stroke="rgba(56,189,248,0.14)" strokeWidth={1} strokeDasharray="4 8" />
            <circle cx={HOME_X} cy={HOME_Y} r={370} fill="none" stroke="rgba(37,99,235,0.1)" strokeWidth={1} strokeDasharray="3 10" />

            {brandData.islands.map((island, i) => (
              <IslandBlob
                key={island.id}
                island={island}
                index={i}
                onClick={handleIslandClick}
                isSelected={selectedIsland?.id === island.id}
                scoreMin={scoreMin}
                scoreMax={scoreMax}
              />
            ))}

            <g filter="url(#homeGlow)">
              <ellipse cx={HOME_X} cy={HOME_Y} rx={HOME_RADIUS * 2.1} ry={HOME_RADIUS * 1.8} fill={HOME_GLOW} />
              <path d={homeShadow} fill="rgba(0,0,0,0.4)" />
              <path d={homeBlob} fill={HOME_PRIMARY} stroke={HOME_STROKE} strokeWidth={2} opacity={0.95} />
              <path d={blobPath(HOME_X - 12, HOME_Y - 14, HOME_RADIUS * 0.4, 77)} fill="rgba(255,255,255,0.12)" />
            </g>

            {brandWords.map((word, i) => (
              <text
                key={i}
                x={HOME_X}
                y={HOME_Y - 6 + (i * 13) - ((brandWords.length - 1) * 6.5)}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(15,23,42,0.95)"
                fontSize={12}
                fontWeight="800"
                fontFamily="'Inter', sans-serif"
                letterSpacing="0.5"
              >
                {word}
              </text>
            ))}

          </g> {/* end pan/zoom group */}

        </svg>

        {/* Legend — top left (HTML overlay, always fixed to container) */}
        <div style={legendStyle} className="map-legend-html">
          <LegendRow color="#F5A623" label="Tier 1 — Immediate" />
          <LegendRow color="#4ECDC4" label="Tier 2 — Secondary" />
          <LegendRow color="#7B68EE" label="Home Brand" />
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', margin: '6px 0' }} />
          <LegendRow color="#A89BF5" label="Familiar Landscape" outline />
          <LegendRow color="#FF6B9D" label="Unexplored Lands" outline dashed />
        </div>

        {/* Legend — top right */}
        <div style={{ ...legendStyle, left: 'auto', right: 20 }} className="map-legend-html">
          <div style={{ fontSize: 9, color: 'rgba(138,155,176,0.9)', fontWeight: 600, letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: 8 }}>Say / Do Gap</div>
          <LegendRow color="#4ECDC4" label="Low tension (0–49)" />
          <LegendRow color="#FAAD14" label="Medium (50–74)" />
          <LegendRow color="#FF6B9D" label="High tension (75+)" />
        </div>

        {/* Zoom controls — bottom right, always on top */}
        <div style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          zIndex: 50,
          pointerEvents: 'all',
        }}>
          <button
            onMouseDown={e => e.stopPropagation()}
            onClick={() => doZoom(1.25)}
            style={zoomBtnStyle}
            title="Zoom in"
          >+</button>
          <button
            onMouseDown={e => e.stopPropagation()}
            onClick={resetView}
            style={{ ...zoomBtnStyle, fontSize: 10, letterSpacing: 0 }}
            title="Reset view"
          >⊙</button>
          <button
            onMouseDown={e => e.stopPropagation()}
            onClick={() => doZoom(0.8)}
            style={zoomBtnStyle}
            title="Zoom out"
          >−</button>
        </div>

        {/* Zoom level indicator */}
        <div style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          color: 'rgba(255,255,255,0.35)',
          fontSize: 11,
          fontFamily: "'Inter', sans-serif",
          pointerEvents: 'none',
          letterSpacing: '0.5px',
        }}>
          {Math.round(zoom * 100)}%
        </div>
      </div>

      {selectedIsland && (
        <DetailPanel island={selectedIsland} onClose={handleClose} allSources={brandData.sources} />
      )}
    </div>
  );
}

const legendStyle = {
  position: 'absolute',
  top: 20,
  left: 20,
  background: 'rgba(15,23,42,0.88)',
  border: '1px solid rgba(255,255,255,0.13)',
  borderRadius: 10,
  padding: '10px 14px',
  backdropFilter: 'blur(12px)',
  pointerEvents: 'none',
  zIndex: 10,
  minWidth: 170,
};

function LegendRow({ color, label, outline, dashed }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
      <div style={{
        width: 12, height: 12, borderRadius: '50%', flexShrink: 0,
        background: outline ? 'transparent' : color,
        border: outline ? `2px ${dashed ? 'dashed' : 'solid'} ${color}` : 'none',
      }} />
      <span style={{ fontSize: 10, color: outline ? color : '#F0EDE8', fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>{label}</span>
    </div>
  );
}

const zoomBtnStyle = {
  width: 32,
  height: 32,
  background: 'rgba(15,23,42,0.88)',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: 8,
  color: '#fff',
  fontSize: 18,
  fontWeight: 300,
  lineHeight: 1,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(8px)',
  transition: 'background 0.15s',
};
