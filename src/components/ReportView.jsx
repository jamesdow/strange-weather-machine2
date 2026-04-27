import React from 'react';
import IslandCard from './IslandCard.jsx';
import { islandColor, COMPETITIVE_COLORS, NOVELTY_COLORS } from '../utils/colors.js';
import { downloadReportPdf } from '../utils/downloadPdf.js';

const FIELD_LABELS = {
  id: 'ID',
  mapX: 'Map X',
  mapY: 'Map Y',
  sayDo: 'Say / Do',
  strategicBrief: 'Strategic Brief',
  riskFlags: 'Risk Flags',
  fullIntel: 'Full Intel',
  agentOutputs: 'Agent Outputs',
  stageOutputs: 'Stage Outputs',
};

function formatFieldLabel(key) {
  if (FIELD_LABELS[key]) return FIELD_LABELS[key];
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

function ReportFieldValue({ value }) {
  if (isEmptyValue(value)) return <span className="field-empty">Not provided</span>;

  if (Array.isArray(value)) {
    if (value.every(item => typeof item !== 'object' || item == null)) {
      return (
        <ul className="field-list">
          {value.map((item, i) => <li key={i}>{String(item)}</li>)}
        </ul>
      );
    }

    return (
      <div className="field-nested-list">
        {value.map((item, i) => (
          <div key={i} className="field-nested-item">
            <span className="field-index">{i + 1}</span>
            <ReportFieldValue value={item} />
          </div>
        ))}
      </div>
    );
  }

  if (typeof value === 'object') {
    return (
      <div className="field-object">
        {Object.entries(value).map(([key, item]) => (
          <div key={key} className="field-object-row">
            <div className="field-object-key">{formatFieldLabel(key)}</div>
            <div className="field-object-value"><ReportFieldValue value={item} /></div>
          </div>
        ))}
      </div>
    );
  }

  if (typeof value === 'boolean') return <span>{value ? 'Yes' : 'No'}</span>;
  return <span>{String(value)}</span>;
}

function FieldCard({ label, value }) {
  return (
    <div className="field-card">
      <div className="field-label">{label}</div>
      <div className="field-value">
        <ReportFieldValue value={value} />
      </div>
    </div>
  );
}

function SummaryTable({ islands }) {
  return (
    <div className="summary-table-wrapper">
      <table className="summary-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Territory</th>
            <th>Score</th>
            <th>Tier</th>
            <th>Distance</th>
            <th>Say/Do Gap</th>
            <th>Competitive Space</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {islands.map((island, i) => {
            const colors = islandColor(island.tier);
            const comp = COMPETITIVE_COLORS[island.competitiveSpace] || COMPETITIVE_COLORS.contested;
            const novelty = island.noveltyDistance
              ? (NOVELTY_COLORS[island.noveltyDistance] || NOVELTY_COLORS.familiar)
              : null;
            const gapColor = island.sayDo
              ? island.sayDo.gap >= 75 ? '#FF6B9D' : island.sayDo.gap >= 50 ? '#FAAD14' : '#4ECDC4'
              : null;
            return (
              <tr key={island.id}>
                <td className="rank-cell">{i + 1}</td>
                <td className="name-cell">{island.name}</td>
                <td>
                  <span className="table-score" style={{ background: colors.fill, color: '#0a0f1a' }}>
                    {island.score}
                  </span>
                </td>
                <td>
                  <span style={{ color: colors.fill, fontWeight: 600 }}>
                    Tier {island.tier}
                  </span>
                </td>
                <td>
                  {novelty && (
                    <span className="novelty-tag" style={{ background: novelty.bg, color: novelty.text, fontSize: '10px' }}>
                      {novelty.label}
                    </span>
                  )}
                </td>
                <td>
                  {island.sayDo && (
                    <span style={{ color: gapColor, fontWeight: 700, fontSize: '12px' }}>
                      {island.sayDo.gap}/100
                    </span>
                  )}
                </td>
                <td>
                  <span className="competitive-tag" style={{ background: comp.bg, color: comp.text }}>
                    {comp.label}
                  </span>
                </td>
                <td className="status-cell">{island.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function StrategicBrief({ brief }) {
  if (!brief) return null;
  return (
    <section className="report-section strategic-brief-section">
      <h2 className="report-section-title">Strategic Brief</h2>
      <div className="strategic-brief-card">
        <div className="strategic-brief-headline">{brief.headline}</div>
        <p className="strategic-brief-body">{brief.recommendation}</p>
        {brief.sequencing?.length > 0 && (
          <div className="strategic-sequence">
            {brief.sequencing.map((step, i) => (
              <div key={i} className="sequence-step">
                <span className="sequence-num">{i + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        )}
        {brief.brandNarrative && (
          <blockquote className="brief-provocation strategic-provocation">
            "{brief.brandNarrative}"
          </blockquote>
        )}
      </div>
    </section>
  );
}

function MediaHabitatSection({ islands }) {
  const habitats = islands.filter(island => island.mediaHabitat);
  if (habitats.length === 0) return null;
  return (
    <section className="report-section">
      <h2 className="report-section-title">Media Habitat</h2>
      <p className="section-intro">
        Where each territory should live in culture, and what kind of execution fits there.
      </p>
      <div className="habitat-grid">
        {habitats.map(island => (
          <div key={island.id} className="habitat-card">
            <div className="habitat-name">{island.name}</div>
            <div className="habitat-row">
              <span>Platform</span>
              <p>{island.mediaHabitat.primaryPlatform}</p>
            </div>
            <div className="habitat-row">
              <span>Formats</span>
              <p>{island.mediaHabitat.formatFamily}</p>
            </div>
            <div className="habitat-row">
              <span>Creators</span>
              <p>{island.mediaHabitat.creatorLandscape}</p>
            </div>
            <div className="habitat-row">
              <span>Activation</span>
              <p>{island.mediaHabitat.activationPattern}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CreativeBriefsSection({ islands }) {
  const briefs = islands.filter(island => island.creativeBrief).slice(0, 3);
  if (briefs.length === 0) return null;
  return (
    <section className="report-section report-creative-briefs">
      <h2 className="report-section-title">Creative Briefs - Top 3 Islands</h2>
      <p className="section-intro">
        These are the creative unlocks at the end of the map: the human, the enemy, the task,
        the emotional movement, the proof, and the landmines.
      </p>
      <div className="creative-brief-report-list">
        {briefs.map((island, i) => {
          const brief = island.creativeBrief;
          return (
            <article key={island.id} className="creative-brief-report-card">
              <div className="brief-report-kicker">Brief {i + 1}</div>
              <h3>{island.name}</h3>
              {brief.theTerritory && (
                <div className="brief-report-block">
                  <span>The Territory</span>
                  <p>{brief.theTerritory}</p>
                </div>
              )}
              {brief.theHuman && (
                <div className="brief-report-block">
                  <span>The Human</span>
                  <p>{brief.theHuman}</p>
                </div>
              )}
              {(island.publicSignal || island.privateTruth || island.gapStatement) && (
                <div className="brief-report-signal-grid">
                  {island.publicSignal && (
                    <div className="brief-report-signal public">
                      <span>Public Signal</span>
                      <p>{island.publicSignal.summary}</p>
                    </div>
                  )}
                  {island.privateTruth && (
                    <div className="brief-report-signal private">
                      <span>Private Truth</span>
                      <p>{island.privateTruth.summary}</p>
                    </div>
                  )}
                  {island.gapStatement && (
                    <div className="brief-report-signal gap">
                      <span>The Gap</span>
                      <p>{island.gapStatement}</p>
                    </div>
                  )}
                </div>
              )}
              <div className="brief-report-block">
                <span>The Enemy</span>
                <p>{brief.theEnemy}</p>
              </div>
              <div className="brief-report-block task">
                <span>The Task</span>
                <p>{brief.theTask}</p>
              </div>
              {brief.emotionalArc && (
                <div className="brief-report-arc">
                  <span>Emotional Arc</span>
                  <p><strong>Arrest:</strong> {brief.emotionalArc.arrest}</p>
                  <p><strong>Hold:</strong> {brief.emotionalArc.middle}</p>
                  <p><strong>Resolve:</strong> {brief.emotionalArc.resolve}</p>
                </div>
              )}
              {brief.proof?.length > 0 && (
                <div className="brief-report-list-block">
                  <span>Proof</span>
                  <ul>{brief.proof.map(item => <li key={item}>{item}</li>)}</ul>
                </div>
              )}
              {brief.landmines?.length > 0 && (
                <div className="brief-report-list-block landmines">
                  <span>What Would Kill This</span>
                  <ul>{brief.landmines.map(item => <li key={item}>{item}</li>)}</ul>
                </div>
              )}
              {brief.oneSentence && (
                <blockquote className="brief-provocation">"{brief.oneSentence}"</blockquote>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function RiskFlagsSection({ risks }) {
  if (!risks || risks.length === 0) return null;
  return (
    <section className="report-section">
      <h2 className="report-section-title">Risk Flags</h2>
      <div className="risk-grid">
        {risks.map(risk => (
          <div key={risk.territory} className="risk-card">
            <div className="risk-territory">{risk.territory}</div>
            <p className="risk-copy">{risk.risk}</p>
            <div className="risk-mitigation">
              <span>Mitigation</span>
              <p>{risk.mitigation}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CompleteReportFieldsSection({ brandData }) {
  const reportEntries = Object.entries(brandData)
    .filter(([key, value]) => key !== 'islands' && !['fullIntel', 'agentOutputs', 'stageOutputs'].includes(key) && !isEmptyValue(value));

  const islandFieldNames = [...new Set((brandData.islands || []).flatMap(island => Object.keys(island || {})))];

  return (
    <section className="report-section complete-fields-section">
      <h2 className="report-section-title">Complete Report Fields</h2>
      <p className="section-intro">
        Full structured output from the report payload, including fields that do not have a bespoke visual module.
      </p>

      {reportEntries.length > 0 && (
        <div className="complete-field-group">
          <h3>Report-Level Output</h3>
          <div className="field-grid">
            {reportEntries.map(([key, value]) => (
              <FieldCard key={key} label={formatFieldLabel(key)} value={value} />
            ))}
          </div>
        </div>
      )}

      {islandFieldNames.length > 0 && (
        <div className="complete-field-group">
          <h3>Island-Level Output</h3>
          <div className="island-field-list">
            {brandData.islands.map(island => (
              <article key={island.id || island.name} className="island-field-card">
                <div className="island-field-head">
                  <span>{island.name || island.id}</span>
                  {island.tier && <small>Tier {island.tier}</small>}
                </div>
                <div className="field-grid compact">
                  {islandFieldNames.map(key => (
                    <FieldCard key={key} label={formatFieldLabel(key)} value={island[key]} />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default function ReportView({ brandData }) {
  const { meta, islands, insights = [], sources, strategicBrief, riskFlags, risks } = brandData;
  const tier1 = islands.filter(i => i.tier === 1);
  const tier2 = islands.filter(i => i.tier === 2);

  // Familiar Landscape / Unexplored Lands split (all tiers)
  const familiar = islands.filter(i => i.noveltyDistance === 'familiar');
  const unexplored = islands.filter(i => i.noveltyDistance === 'unexplored');

  function handleDownload() {
    downloadReportPdf(brandData);
  }

  return (
    <div className="report-view">
      <div className="report-view-inner">
      {/* Download Button */}
      <div className="report-download-bar">
        <button className="pdf-download-btn" onClick={handleDownload}>
          ⬇ Download PDF
        </button>
      </div>

      {/* Report Header */}
      <div className="report-header">
        <div className="report-meta">
          <span className="report-meta-item">
            <span className="meta-key">Client</span>
            <span className="meta-val">{meta.client}</span>
          </span>
          <span className="report-sep">·</span>
          <span className="report-meta-item">
            <span className="meta-key">Brand</span>
            <span className="meta-val">{meta.brand}</span>
          </span>
          <span className="report-sep">·</span>
          <span className="report-meta-item">
            <span className="meta-key">Delivered</span>
            <span className="meta-val">{meta.date}</span>
          </span>
        </div>
        <h1 className="report-title">Cultural Territory Map</h1>
        <div className="report-subtitle">Stage 2: Plotting the Map</div>
        <div className="report-methodology">{meta.methodology}</div>
      </div>

      {/* Summary Table */}
      <section className="report-section">
        <h2 className="report-section-title">All Islands</h2>
        <SummaryTable islands={islands} />
      </section>

      {/* Unifying Narrative */}
      <section className="report-section narrative-section">
        <h2 className="report-section-title">The Unifying Narrative</h2>
        <div className="narrative-card">
          <div className="narrative-headline">{meta.narrative}</div>
          {insights && insights.length > 0 && (
            <ul className="narrative-insights">
              {insights.map((insight, i) => (
                <li key={i} className="narrative-body">{insight}</li>
              ))}
            </ul>
          )}
          <blockquote className="brand-narrative report-narrative">
            "{meta.tagline}"
          </blockquote>
        </div>
      </section>

      {/* Familiar Landscape */}
      {familiar.length > 0 && (
        <section className="report-section">
          <h2 className="report-section-title">
            <span style={{ color: '#A89BF5' }}>◈</span> Familiar Landscape
          </h2>
          <p className="section-intro">
            Adjacent territories the brand has a clear right to enter. Lower risk, faster execution.
            The say/do gap is known — the brand role is to close it honestly.
          </p>
          <div className="islands-list">
            {familiar.map(island => (
              <IslandCard key={island.id} island={island} allSources={sources} />
            ))}
          </div>
        </section>
      )}

      {/* Unexplored Lands */}
      {unexplored.length > 0 && (
        <section className="report-section">
          <h2 className="report-section-title">
            <span style={{ color: '#FF6B9D' }}>◈</span> Unexplored Lands
          </h2>
          <p className="section-intro">
            Territories further from the brand's current world. Higher novelty premium — the say/do
            tension is greater, the brand role is less obvious, and that's exactly why they're worth claiming first.
          </p>
          <div className="islands-list">
            {unexplored.map(island => (
              <IslandCard key={island.id} island={island} allSources={sources} />
            ))}
          </div>
        </section>
      )}

      {/* Tier 1 Islands — kept as a separate cut for the action-oriented view */}
      <section className="report-section">
        <h2 className="report-section-title">
          <span style={{ color: '#F5A623' }}>●</span> Tier 1 — Immediate Opportunities
        </h2>
        <p className="section-intro">Test first. First-mover windows are open now.</p>
        <div className="islands-list">
          {tier1.map(island => <IslandCard key={island.id} island={island} allSources={sources} />)}
        </div>
      </section>

      {/* Tier 2 Islands */}
      <section className="report-section">
        <h2 className="report-section-title">
          <span style={{ color: '#4ECDC4' }}>●</span> Tier 2 — Secondary Opportunities
        </h2>
        <p className="section-intro">Monitor and test later. Infrastructure and future plays.</p>
        <div className="islands-list">
          {tier2.map(island => <IslandCard key={island.id} island={island} allSources={sources} />)}
        </div>
      </section>

      {/* Key Insights */}
      <section className="report-section">
        <h2 className="report-section-title">Critical Insights from Stage 2</h2>
        <div className="insights-list">
          {insights.map((insight, i) => (
            <div key={i} className="insight-item">
              <span className="insight-num">{String(i + 1).padStart(2, '0')}</span>
              <p className="insight-text">{insight}</p>
            </div>
          ))}
        </div>
      </section>

      <StrategicBrief brief={strategicBrief} />
      <MediaHabitatSection islands={islands} />
      <CreativeBriefsSection islands={tier1} />
      <RiskFlagsSection risks={riskFlags || risks} />
      <CompleteReportFieldsSection brandData={brandData} />

      {/* Next Phase */}
      <section className="report-section next-phase-section">
        <h2 className="report-section-title">Recommended Next: Stage 3 — Setting Sail</h2>
        <div className="next-phase-grid">
          {tier1.map((island, i) => (
            <div key={island.id} className="next-phase-item">
              <span className="next-phase-num">{i + 1}</span>
              <div>
                <div className="next-phase-name">{island.name}</div>
                <div className="next-phase-reason">{island.status}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="next-phase-description">
          Stage 3 will deliver 3–5 elastic expression concepts per territory, community testing
          with real audiences, authenticity + resonance measurement, and production-ready
          strategic briefs for Stage 4.
        </p>
      </section>

      {/* Sources */}
      {sources && sources.length > 0 && (
        <section className="report-section sources-section">
          <h2 className="report-section-title">Sources & Citations</h2>
          <p className="section-intro">
            Every claim in this report is traceable. Click any source to verify the underlying data.
          </p>
          <div className="sources-grid">
            {sources.map(src => (
              <a
                key={src.id}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="source-full-chip"
              >
                <span className="source-full-label">↗ {src.label}</span>
                <span className="source-full-url">{src.url}</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="report-footer">
        <div className="footer-powered">
          Powered by <strong>Strange Weather</strong>
        </div>
        <div className="footer-note">
          For: {meta.client} · {meta.brand} · Confidential
        </div>
      </footer>
      </div>
    </div>
  );
}
