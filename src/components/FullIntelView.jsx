import React, { useMemo, useState } from 'react';

function normaliseIntel(rawIntel) {
  if (!rawIntel) return [];
  if (Array.isArray(rawIntel)) {
    return rawIntel.map((item, index) => ({
      ...item,
      id: item.id || item.title || item.name || `intel-${index + 1}`,
    }));
  }
  return Object.entries(rawIntel).map(([id, value]) => (
    typeof value === 'string'
      ? { id, title: id, body: value }
      : { id, ...value }
  ));
}

function labelForIntel(item, index) {
  return item.title || item.name || item.agent || item.id || `Intel ${index + 1}`;
}

export default function FullIntelView({ brandData }) {
  const intelItems = useMemo(
    () => normaliseIntel(brandData.fullIntel || brandData.agentOutputs || brandData.stageOutputs),
    [brandData]
  );
  const [activeId, setActiveId] = useState(intelItems[0]?.id || 'empty');

  const activeItem = intelItems.find(item => item.id === activeId) || intelItems[0];

  if (intelItems.length === 0) {
    return (
      <div className="full-intel-view">
        <div className="full-intel-inner empty">
          <h1>Full Intel</h1>
          <p>No stage agent outputs have been attached to this brand yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="full-intel-view">
      <div className="full-intel-inner">
        <header className="full-intel-header">
          <div>
            <div className="full-intel-kicker">{brandData.meta?.brand || 'Brand'} Research Archive</div>
            <h1>Full Intel</h1>
            <p>Raw output from each stage agent, available as selectable source material.</p>
          </div>
          <select
            className="intel-select"
            value={activeItem?.id}
            onChange={event => setActiveId(event.target.value)}
            aria-label="Select agent output"
          >
            {intelItems.map((item, index) => (
              <option key={item.id || index} value={item.id}>
                {labelForIntel(item, index)}
              </option>
            ))}
          </select>
        </header>

        <div className="intel-tabs" role="tablist" aria-label="Agent outputs">
          {intelItems.map((item, index) => (
            <button
              key={item.id || index}
              type="button"
              className={`intel-tab ${activeItem?.id === item.id ? 'active' : ''}`}
              onClick={() => setActiveId(item.id)}
              role="tab"
              aria-selected={activeItem?.id === item.id}
            >
              <span>{item.stage || item.phase || 'Agent'}</span>
              {labelForIntel(item, index)}
            </button>
          ))}
        </div>

        <article className="intel-reader">
          <div className="intel-reader-meta">
            <span>{activeItem.stage || activeItem.phase || 'Stage output'}</span>
            {activeItem.agent && <span>{activeItem.agent}</span>}
            {activeItem.date && <span>{activeItem.date}</span>}
          </div>
          <h2>{labelForIntel(activeItem, 0)}</h2>
          {activeItem.summary && <p className="intel-summary">{activeItem.summary}</p>}
          <pre className="intel-body">{activeItem.body || activeItem.content || activeItem.output || ''}</pre>
        </article>
      </div>
    </div>
  );
}
