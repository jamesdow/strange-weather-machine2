import React, { useState } from 'react';
import MayaGauge from './MayaGauge.jsx';
import { islandColor, COMPETITIVE_COLORS, NOVELTY_COLORS } from '../utils/colors.js';

// ─── Emotion badge ────────────────────────────────────────────────────────────
const EMOTION_COLORS = {
  'Surprise':            { bg: '#3b2f6e', text: '#c4b5fd' },
  'Joy':                 { bg: '#1a3a2a', text: '#6ee7b7' },
  'Fear':                { bg: '#3a1f1f', text: '#fca5a5' },
  'Sadness':             { bg: '#1e2a40', text: '#93c5fd' },
  'Anger':               { bg: '#3a2010', text: '#fdba74' },
  'Contempt':            { bg: '#2a1f3a', text: '#d8b4fe' },
  'Disgust':             { bg: '#1f3a20', text: '#86efac' },
  'Relief':              { bg: '#1a3530', text: '#5eead4' },
  'default':             { bg: '#1e293b', text: '#94a3b8' },
};

function emotionColor(emotion) {
  if (!emotion) return EMOTION_COLORS.default;
  const key = Object.keys(EMOTION_COLORS).find(k =>
    emotion.toLowerCase().includes(k.toLowerCase())
  );
  return EMOTION_COLORS[key] || EMOTION_COLORS.default;
}

function EmotionTag({ emotion, label }) {
  if (!emotion) return null;
  const cfg = emotionColor(emotion);
  return (
    <span className="emotion-tag" style={{ background: cfg.bg, color: cfg.text, border: `1px solid ${cfg.text}30` }}>
      {label && <span className="emotion-label-prefix">{label} · </span>}
      {emotion}
    </span>
  );
}

// ─── Scoring breakdown table ──────────────────────────────────────────────────
function ScoringBreakdown({ scoring }) {
  if (!scoring) return null;
  const rows = [
    { key: 'culturalSize',           label: 'Cultural Size',           max: 30 },
    { key: 'brandReceptivity',       label: 'Brand Receptivity',       max: 30 },
    { key: 'competitiveVulnerability', label: 'Competitive Vulnerability', max: 30 },
    { key: 'authenticityFit',        label: 'Authenticity Fit',        max: 30 },
    { key: 'emotionalPotential',     label: 'Emotional Potential',     max: 30 },
  ];
  return (
    <div className="scoring-breakdown">
      {rows.map(r => {
        const val = scoring[r.key];
        if (val == null) return null;
        const pct = (val / r.max) * 100;
        const color = pct >= 80 ? '#6ee7b7' : pct >= 60 ? '#faad14' : '#fca5a5';
        return (
          <div key={r.key} className="scoring-row">
            <div className="scoring-row-label">{r.label}</div>
            <div className="scoring-row-bar-track">
              <div className="scoring-row-bar-fill" style={{ width: `${pct}%`, background: color }} />
            </div>
            <div className="scoring-row-val" style={{ color }}>{val}/{r.max}</div>
            {scoring[r.key + 'Notes'] && (
              <div className="scoring-row-notes">{scoring[r.key + 'Notes']}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Content strategy (new rich format) ──────────────────────────────────────
function ContentStrategyNew({ cs }) {
  if (!cs) return null;
  return (
    <div className="cs-new">
      {cs.formats && cs.formats.length > 0 && (
        <div className="cs-block">
          <div className="cs-sub-label">Formats</div>
          <ul className="card-list">
            {cs.formats.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
      )}
      {cs.platforms && cs.platforms.length > 0 && (
        <div className="cs-block">
          <div className="cs-sub-label">Platforms</div>
          <div className="card-tags-row">
            {cs.platforms.map(p => <span key={p} className="meta-tag platform-tag">{p}</span>)}
          </div>
        </div>
      )}
      {cs.creatorTypes && cs.creatorTypes.length > 0 && (
        <div className="cs-block">
          <div className="cs-sub-label">Creator types</div>
          <div className="card-tags-row">
            {cs.creatorTypes.map(c => <span key={c} className="meta-tag creator-tag">{c}</span>)}
          </div>
        </div>
      )}
      {cs.pathToTrust && (
        <div className="cs-block">
          <div className="cs-sub-label">Path to trust</div>
          <p className="path-to-trust">{cs.pathToTrust}</p>
        </div>
      )}
    </div>
  );
}

// ─── Community (new rich format) ─────────────────────────────────────────────
function CommunityNew({ community }) {
  if (!community) return null;
  return (
    <div className="community-new">
      <div className="community-row">
        <span className="community-platform-tag">{community.platform}</span>
        <strong className="community-name-text">{community.name}</strong>
      </div>
      {community.members && (
        <div className="community-members-text">{community.members}</div>
      )}
      {community.keyCreators && community.keyCreators.length > 0 && (
        <div className="card-tags-row">
          <span className="tags-label">Key creators:</span>
          {community.keyCreators.map(c => <span key={c} className="meta-tag creator-tag">{c}</span>)}
        </div>
      )}
      {community.gatekeepers && community.gatekeepers.length > 0 && (
        <div className="card-tags-row">
          <span className="tags-label">Gatekeepers:</span>
          {community.gatekeepers.map(g => <span key={g} className="meta-tag gatekeeper">{g}</span>)}
        </div>
      )}
      {community.contentTypes && community.contentTypes.length > 0 && (
        <div className="card-tags-row">
          <span className="tags-label">Content types:</span>
          {community.contentTypes.map(c => <span key={c} className="meta-tag">{c}</span>)}
        </div>
      )}
      {(community.brandMentions != null) && (
        <div className="community-mentions">
          <span className="mentions-count">{community.brandMentions}</span> brand mentions
          {community.brandSentiment && <span className="mentions-sentiment"> · {community.brandSentiment}</span>}
        </div>
      )}
    </div>
  );
}

// ─── Main card ────────────────────────────────────────────────────────────────
export default function IslandCard({ island, allSources }) {
  const [expanded, setExpanded] = useState(false);
  const colors = islandColor(island.tier);
  const comp = COMPETITIVE_COLORS[island.competitiveSpace] || COMPETITIVE_COLORS.contested;
  const novelty = island.noveltyDistance
    ? (NOVELTY_COLORS[island.noveltyDistance] || NOVELTY_COLORS.familiar)
    : null;

  // Detect data format: new (has primaryEmotion) vs old (has brandFit)
  const isNewFormat = !!(island.primaryEmotion || island.emotionalJourney);

  const islandSources = (island.sources || [])
    .map(id => allSources?.find(s => s.id === id))
    .filter(Boolean);

  const sayDoSources = (island.sayDo?.sources || [])
    .map(id => allSources?.find(s => s.id === id))
    .filter(Boolean);

  const sayDoColor = island.sayDo
    ? island.sayDo.gap >= 75 ? '#FF6B9D' : island.sayDo.gap >= 50 ? '#FAAD14' : '#4ECDC4'
    : null;

  return (
    <div className={`island-card ${expanded ? 'expanded' : ''}`}>
      {/* Card Header */}
      <div className="card-header" onClick={() => setExpanded(!expanded)}>
        <div className="card-header-left">
          <div className="card-tier" style={{ color: colors.fill }}>
            Tier {island.tier}
          </div>
          <div className="card-name">{island.name}</div>
          <div className="card-status">{island.status}</div>
          <div className="card-badges-row">
            {novelty && (
              <span className="novelty-tag" style={{ background: novelty.bg, color: novelty.text }}>
                {novelty.label}
              </span>
            )}
            {isNewFormat && island.primaryEmotion && (
              <EmotionTag emotion={island.primaryEmotion} />
            )}
          </div>
        </div>
        <div className="card-header-right">
          <div className="card-score" style={{ background: colors.fill, color: '#0a0f1a' }}>
            {island.score}
          </div>
          <div className="card-comp" style={{ color: comp.text }}>{comp.label}</div>
          {island.sayDo && (
            <div className="card-saydo-mini" style={{ color: sayDoColor }}>
              S/D {island.sayDo.gap}
            </div>
          )}
          <span className="card-expand">{expanded ? '▲' : '▼'}</span>
        </div>
      </div>

      {/* Growth strip */}
      <div className="card-growth">
        <span className="growth-icon">↑</span> {island.growth}
        <span className="growth-sep">·</span>
        <span className="growth-window">{island.window}</span>
      </div>

      {expanded && (
        <div className="card-body">

          {/* Emotional Signature (new format) */}
          {isNewFormat && (island.primaryEmotion || island.secondaryEmotion) && (
            <div className="card-section">
              <div className="card-section-title">Emotional Signature</div>
              <div className="emotion-tags-row">
                {island.primaryEmotion && <EmotionTag emotion={island.primaryEmotion} label="Primary" />}
                {island.secondaryEmotion && <EmotionTag emotion={island.secondaryEmotion} label="Secondary" />}
              </div>
              {island.emotionalJourney && (
                <p className="emotional-journey">{island.emotionalJourney}</p>
              )}
            </div>
          )}

          {island.maya && (
            <div className="card-section">
              <div className="card-section-title">MAYA Fit</div>
              <MayaGauge value={island.maya.incongruence} />
              {island.maya.whyItPasses && <p className="momentum-text">{island.maya.whyItPasses}</p>}
            </div>
          )}

          {(island.humanTruth || island.culturalFriction || island.ritual || island.earnedRight) && (
            <div className="card-section">
              <div className="card-section-title">Creative Directive</div>
              {island.humanTruth && (
                <div className="brief-block">
                  <div className="brief-label">Human Truth</div>
                  <p className="brief-text">{island.humanTruth}</p>
                </div>
              )}
              {island.culturalFriction && (
                <div className="brief-block">
                  <div className="brief-label">Cultural Friction</div>
                  <p className="brief-text">{island.culturalFriction}</p>
                </div>
              )}
              {island.ritual && (
                <div className="brief-block">
                  <div className="brief-label">Ritual</div>
                  <p className="brief-text">{island.ritual}</p>
                </div>
              )}
              {island.earnedRight && (
                <div className="brief-block">
                  <div className="brief-label">Earned Right</div>
                  <p className="brief-text">{island.earnedRight}</p>
                </div>
              )}
              {island.nativeTongue?.length > 0 && (
                <div className="card-tags-row">
                  <span className="tags-label">Native tongue:</span>
                  {island.nativeTongue.map(term => <span key={term} className="meta-tag">{term}</span>)}
                </div>
              )}
            </div>
          )}

          {/* Cultural Momentum */}
          {island.culturalMomentum && (
            <div className="card-section">
              <div className="card-section-title">Cultural Momentum</div>
              <p className="momentum-text">{island.culturalMomentum}</p>
            </div>
          )}

          {/* Say / Do Gap */}
          {island.sayDo && (
            <div className="card-section saydo-section">
              <div className="card-section-title">
                Say / Do Gap
                <span className="saydo-gap-inline" style={{ color: sayDoColor }}> — {island.sayDo.gap}/100</span>
              </div>
              <div className="saydo-bar-wrapper">
                <div className="saydo-bar-track">
                  <div className="saydo-bar-fill" style={{ width: `${island.sayDo.gap}%`, background: sayDoColor }} />
                </div>
              </div>
              <div className="saydo-grid">
                <div className="saydo-col">
                  <div className="saydo-col-label saydo-say">What the brand says</div>
                  <p className="saydo-text">{island.sayDo.stated}</p>
                </div>
                <div className="saydo-col">
                  <div className="saydo-col-label saydo-do">What the audience does</div>
                  <p className="saydo-text">{island.sayDo.revealed}</p>
                </div>
              </div>
              <div className="saydo-role-block">
                <div className="saydo-role-label">Brand role in the gap</div>
                <p className="saydo-role-text">{island.sayDo.brandRole}</p>
              </div>
              {sayDoSources.length > 0 && (
                <div className="source-links">
                  {sayDoSources.map(src => (
                    <a key={src.id} href={src.url} target="_blank" rel="noopener noreferrer" className="source-chip">
                      ↗ {src.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Community — new format */}
          {isNewFormat && island.community && (
            <div className="card-section">
              <div className="card-section-title">Community</div>
              <CommunityNew community={island.community} />
            </div>
          )}

          {/* Community — old format */}
          {!isNewFormat && island.community && (
            <div className="card-section">
              <div className="card-section-title">Community</div>
              <div className="card-community">
                <strong>{island.community.name}</strong> — {island.community.members}
                {island.community.language && (
                  <><br /><span className="community-lang">"{island.community.language}"</span></>
                )}
              </div>
              {island.community.decisionDrivers && (
                <div className="card-tags-row">
                  <span className="tags-label">Drivers:</span>
                  {island.community.decisionDrivers.map(d => (
                    <span key={d} className="meta-tag">{d}</span>
                  ))}
                </div>
              )}
              {island.community.gatekeepers && (
                <div className="card-tags-row">
                  <span className="tags-label">Gatekeepers:</span>
                  {island.community.gatekeepers.map(g => (
                    <span key={g} className="meta-tag gatekeeper">{g}</span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Brand Fit — old format only */}
          {!isNewFormat && island.brandFit && (
            <div className="card-section">
              <div className="card-section-title">
                Brand Fit
                <span className="fit-inline" style={{ color: colors.fill }}> {island.brandFit.score}/100</span>
              </div>
              <div className="right-to-play">
                <span className={`rtp-badge ${island.brandFit.rightToPlay ? 'yes' : 'no'}`}>
                  {island.brandFit.rightToPlay ? '✓ Right to Play' : '✗ Weak Right to Play'}
                </span>
                {island.brandFit.products && island.brandFit.products.map(p => (
                  <span key={p} className="product-tag">{p}</span>
                ))}
              </div>
              {island.brandFit.reasons && (
                <ul className="card-list">
                  {island.brandFit.reasons.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              )}
            </div>
          )}

          {/* Content Strategy — new format */}
          {isNewFormat && island.contentStrategy && (
            <div className="card-section">
              <div className="card-section-title">Content Strategy</div>
              <ContentStrategyNew cs={island.contentStrategy} />
            </div>
          )}

          {/* Content Strategy — old format */}
          {!isNewFormat && island.contentStrategy && Array.isArray(island.contentStrategy) && (
            <div className="card-section">
              <div className="card-section-title">Content Strategy</div>
              <ul className="card-list">
                {island.contentStrategy.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

          {/* Scoring Breakdown (new format) */}
          {isNewFormat && island.scoring && (
            <div className="card-section">
              <div className="card-section-title">Scoring Breakdown</div>
              <ScoringBreakdown scoring={island.scoring} />
            </div>
          )}

          {/* Why This Island — old format */}
          {!isNewFormat && island.why && (
            <div className="card-section">
              <div className="card-section-title">Why This Island</div>
              <ul className="card-list">
                {island.why.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>
          )}

          {/* Brand Narrative */}
          {island.brandNarrative && (
            <blockquote className="brand-narrative card-narrative">
              "{island.brandNarrative}"
            </blockquote>
          )}

          {/* Sources */}
          {islandSources.length > 0 && (
            <div className="card-section">
              <div className="card-section-title">Sources</div>
              <div className="source-links">
                {islandSources.map(src => (
                  <a key={src.id} href={src.url} target="_blank" rel="noopener noreferrer" className="source-chip">
                    ↗ {src.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
