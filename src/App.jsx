import { useEffect, useMemo, useState } from 'react';
import { primarkData } from './data/primark';

const viewOptions = [
  { id: 'map', label: 'Map' },
  { id: 'report', label: 'Report' },
  { id: 'intel', label: 'Full Intel' },
];

const competitiveLabels = {
  open: 'White Space',
  contested: 'Contested',
  owned: 'Owned',
};

function formatLabel(key) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

function isEmptyValue(value) {
  if (value == null) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

function ValueRenderer({ value }) {
  if (isEmptyValue(value)) return <span className="field-empty">Not provided</span>;

  if (Array.isArray(value)) {
    if (value.every(item => item == null || typeof item !== 'object')) {
      return (
        <ul className="field-list">
          {value.map((item, index) => <li key={index}>{String(item)}</li>)}
        </ul>
      );
    }

    return (
      <div className="field-stack">
        {value.map((item, index) => (
          <div className="nested-item" key={index}>
            <div className="nested-index">{index + 1}</div>
            <ValueRenderer value={item} />
          </div>
        ))}
      </div>
    );
  }

  if (typeof value === 'object') {
    return (
      <div className="field-stack">
        {Object.entries(value).map(([key, item]) => (
          <div className="nested-object" key={key}>
            <div className="nested-key">{formatLabel(key)}</div>
            <ValueRenderer value={item} />
          </div>
        ))}
      </div>
    );
  }

  return <span>{String(value)}</span>;
}

function FieldCard({ label, value }) {
  return (
    <div className="field-card">
      <div className="field-label">{label}</div>
      <div className="field-value"><ValueRenderer value={value} /></div>
    </div>
  );
}

function Header({ view, setView }) {
  return (
    <header className="app-header">
      <div>
        <div className="eyebrow">Landfall</div>
        <h1>Primark Mapper</h1>
      </div>
      <div className="view-toggle">
        {viewOptions.map(option => (
          <button
            key={option.id}
            className={view === option.id ? 'toggle-btn active' : 'toggle-btn'}
            onClick={() => setView(option.id)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </header>
  );
}

function MapView({ data }) {
  const [selectedId, setSelectedId] = useState(data.islands[0]?.id);
  const selected = data.islands.find(island => island.id === selectedId) || data.islands[0];

  return (
    <div className="layout two-column">
      <section className="panel hero-panel">
        <div className="eyebrow">Cultural Territory Map</div>
        <h2>{data.meta.narrative}</h2>
        <p className="lead">{data.meta.tagline}</p>
        <div className="map-grid">
          {data.islands.map(island => (
            <button
              key={island.id}
              type="button"
              className={selectedId === island.id ? 'island-chip active' : 'island-chip'}
              onClick={() => setSelectedId(island.id)}
            >
              <span className="chip-tier">Tier {island.tier}</span>
              <strong>{island.name}</strong>
              <span className="chip-meta">{island.score} · {island.noveltyDistance === 'unexplored' ? 'Unexplored Lands' : 'Familiar Landscape'}</span>
            </button>
          ))}
        </div>
      </section>

      <aside className="panel detail-panel">
        <div className="detail-topline">
          <span>Tier {selected.tier}</span>
          <span>{competitiveLabels[selected.competitiveSpace] || selected.competitiveSpace}</span>
        </div>
        <h3>{selected.name}</h3>
        <div className="score-row">
          <div className="score-pill">{selected.score}</div>
          <div>
            <div className="detail-status">{selected.status}</div>
            <div className="detail-window">{selected.window}</div>
          </div>
        </div>
        <p className="lead small">{selected.emotionalJourney}</p>
        <div className="mini-section">
          <div className="mini-label">Say / Do Gap</div>
          <p>{selected.sayDo.gap}/100</p>
          <p>{selected.sayDo.brandRole}</p>
        </div>
        <div className="mini-section">
          <div className="mini-label">Community</div>
          <p>{selected.community.name}</p>
          <p>{selected.community.members}</p>
        </div>
        <div className="mini-section">
          <div className="mini-label">Content Strategy</div>
          <ul className="field-list compact">
            {selected.contentStrategy.formats.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </aside>
    </div>
  );
}

function ReportView({ data }) {
  const topLevelEntries = Object.entries(data).filter(([key]) => key !== 'fullIntel');
  const allIslandKeys = [...new Set(data.islands.flatMap(island => Object.keys(island)))];

  return (
    <div className="report-shell">
      <section className="panel report-header-panel">
        <div className="eyebrow">Report</div>
        <h2>{data.meta.brand}</h2>
        <p className="lead">{data.meta.narrative}</p>
        <div className="summary-strip">
          <div><span>Client</span><strong>{data.meta.client}</strong></div>
          <div><span>Date</span><strong>{data.meta.date}</strong></div>
          <div><span>Method</span><strong>{data.meta.methodology}</strong></div>
        </div>
      </section>

      <section className="panel section-panel">
        <div className="section-heading-row">
          <h3>Key Insights</h3>
        </div>
        <div className="insight-list">
          {data.insights.map((insight, index) => (
            <div className="insight-card" key={insight}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{insight}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel section-panel">
        <div className="section-heading-row">
          <h3>Strategic Brief</h3>
        </div>
        <div className="brief-card">
          <h4>{data.strategicBrief.headline}</h4>
          <p>{data.strategicBrief.recommendation}</p>
          <ul className="field-list">
            {data.strategicBrief.sequencing.map(step => <li key={step}>{step}</li>)}
          </ul>
        </div>
      </section>

      <section className="panel section-panel">
        <div className="section-heading-row">
          <h3>Risk Flags</h3>
        </div>
        <div className="risk-grid">
          {data.riskFlags.map(risk => (
            <div className="risk-card" key={risk.territory}>
              <strong>{risk.territory}</strong>
              <p>{risk.risk}</p>
              <small>{risk.mitigation}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="panel section-panel">
        <div className="section-heading-row">
          <h3>Complete Report Fields</h3>
        </div>
        <div className="field-grid top-grid">
          {topLevelEntries.map(([key, value]) => (
            <FieldCard key={key} label={formatLabel(key)} value={value} />
          ))}
        </div>
      </section>

      <section className="panel section-panel">
        <div className="section-heading-row">
          <h3>Island Output</h3>
        </div>
        <div className="island-output-list">
          {data.islands.map(island => (
            <article className="panel island-output-card" key={island.id}>
              <div className="section-heading-row compact-row">
                <h4>{island.name}</h4>
                <span className="tier-badge">Tier {island.tier}</span>
              </div>
              <div className="field-grid island-grid">
                {allIslandKeys.map(key => (
                  <FieldCard key={key} label={formatLabel(key)} value={island[key]} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function FullIntelView({ data }) {
  const items = useMemo(() => data.fullIntel || [], [data]);
  const [activeId, setActiveId] = useState(items[0]?.id || '');
  const [cache, setCache] = useState({});
  const active = items.find(item => item.id === activeId) || items[0];

  useEffect(() => {
    if (!active?.bodyUrl || cache[active.id]) return;
    let cancelled = false;

    fetch(active.bodyUrl)
      .then(response => response.text())
      .then(text => {
        if (!cancelled) {
          setCache(current => ({ ...current, [active.id]: text }));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCache(current => ({ ...current, [active.id]: 'Unable to load this intel file right now.' }));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [active, cache]);

  if (!active) {
    return (
      <section className="panel empty-panel">
        <h2>Full Intel</h2>
        <p>No stage agent outputs have been attached to this brand yet.</p>
      </section>
    );
  }

  return (
    <div className="report-shell">
      <section className="panel report-header-panel intel-header">
        <div>
          <div className="eyebrow">Research Archive</div>
          <h2>Full Intel</h2>
          <p className="lead">Raw output from each stage agent, available as selectable source material.</p>
        </div>
        <select className="intel-select" value={active.id} onChange={event => setActiveId(event.target.value)}>
          {items.map(item => (
            <option key={item.id} value={item.id}>{item.title}</option>
          ))}
        </select>
      </section>

      <section className="intel-tabs">
        {items.map(item => (
          <button
            key={item.id}
            type="button"
            className={item.id === active.id ? 'intel-tab active' : 'intel-tab'}
            onClick={() => setActiveId(item.id)}
          >
            <span>{item.stage}</span>
            <strong>{item.title}</strong>
          </button>
        ))}
      </section>

      <section className="panel intel-reader">
        <div className="intel-meta-row">
          <span>{active.stage}</span>
          <span>{active.agent}</span>
          {active.date && <span>{active.date}</span>}
        </div>
        <h3>{active.title}</h3>
        {active.summary && <p className="lead small">{active.summary}</p>}
        <pre>{cache[active.id] || 'Loading intel...'}</pre>
      </section>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState('map');

  return (
    <div className="app-shell">
      <Header view={view} setView={setView} />
      <main className="app-main">
        {view === 'map' && <MapView data={primarkData} />}
        {view === 'report' && <ReportView data={primarkData} />}
        {view === 'intel' && <FullIntelView data={primarkData} />}
      </main>
    </div>
  );
}
