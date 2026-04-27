import React from 'react';

function formatBrandName(key) {
  return key
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default function Header({ view, onViewChange, brandMeta, activeBrand, onBrandChange, brandKeys }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="header-brand">
          <span className="header-logo">◈</span>
          <div>
            <div className="header-title">Cultural Territory Mapper</div>
            <div className="header-subtitle">Powered by Fathom · Landfall</div>
          </div>
        </div>
      </div>

      {brandMeta && (
        <div className="header-center">
          {brandKeys && brandKeys.length > 1 ? (
            <select
              className="brand-switcher"
              value={activeBrand}
              onChange={e => onBrandChange(e.target.value)}
            >
              {brandKeys.map(key => (
                <option key={key} value={key}>{formatBrandName(key)}</option>
              ))}
            </select>
          ) : (
            <span className="header-client-brand">{brandMeta.brand}</span>
          )}
          <span className="header-sep">·</span>
          <span className="header-client">{brandMeta.client}</span>
          <span className="header-sep">·</span>
          <span className="header-date">{brandMeta.date}</span>
        </div>
      )}

      <div className="header-right">
        <div className="view-toggle">
          <button
            className={`toggle-btn ${view === 'map' ? 'active' : ''}`}
            onClick={() => onViewChange('map')}
          >
            <span className="toggle-icon">⬡</span> Map
          </button>
          <button
            className={`toggle-btn ${view === 'report' ? 'active' : ''}`}
            onClick={() => onViewChange('report')}
          >
            <span className="toggle-icon">≡</span> Report
          </button>
          <button
            className={`toggle-btn ${view === 'intel' ? 'active' : ''}`}
            onClick={() => onViewChange('intel')}
          >
            <span className="toggle-icon">▤</span> Full Intel
          </button>
        </div>
      </div>
    </header>
  );
}
