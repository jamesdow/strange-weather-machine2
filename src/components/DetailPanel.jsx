import React from 'react';
import MayaGauge from './MayaGauge.jsx';
import { islandColor } from '../utils/colors.js';
import { COMPETITIVE_COLORS, NOVELTY_COLORS } from '../utils/colors.js';

const EMOTION_COLORS = {
  'Surprise':  { bg: '#3b2f6e', text: '#c4b5fd' },
  'Joy':       { bg: '#1a3a2a', text: '#6ee7b7' },
  'Fear':      { bg: '#3a1f1f', text: '#fca5a5' },
  'Sadness':   { bg: '#1e2a40', text: '#93c5fd' },
  'Anger':     { bg: '#3a2010', text: '#fdba74' },
  'Contempt':  { bg: '#2a1f3a', text: '#d8b4fe' },
  'Disgust':   { bg: '#1f3a20', text: '#86efac' },
  'Relief':    { bg: '#1a3530', text: '#5eead4' },
  'default':   { bg: '#1e293b', text: '#94a3b8' },
};

function emotionColor(emotion) {
  if (!emotion) return EMOTION_COLORS.default;
  const key = Object.keys(EMOTION_COLORS).find(k =>
    emotion.toLowerCase().includes(k.toLowerCase())
  );
  return EMOTION_COLORS[key] || EMOTION_COLORS.default;
}

function ScoreBadge({ score, tier }) {
  const colors = islandColor(tier);
  return (
    <div className="score-badge" style={{ background: colors.fill, color: '#0a0f1a' }}>
      <span className="score-num">{score}</span>
      <span className="score-label">Score</span>
    </div>
  );
}

function EmotionBadge({ emotion, label }) {
  if (!emotion) return null;
  const cfg = emotionColor(emotion);
  return (
    <span className="emotion-tag" style={{ background: cfg.bg, color: cfg.text, border: `1px solid ${cfg.text}30` }}>
      {label && <span className="emotion-label-prefix">{label} · </span>}
      {emotion}
    </span>
  );
}

function SayDoGapBar({ gap }) {
  const color = gap >= 75 ? '#FF6B9D' : gap >= 50 ? '#FAAD14' : '#4ECDC4';
  return (
    <div className="saydо-bar-wrapper">
      <div className="saydo-bar-track">
        <div className="saydo-bar-fill" style={{ width: `${gap}%`, background: color }} />
      </div>
      <span className="saydo-gap-label" style={{ color }}>{gap}/100 gap</span>
    </div>
  );
}

function ScoringBreakdown({ scoring }) {
  if (!scoring) return null;
  const rows = [
    { key: 'culturalSize',             label: 'Cultural Size',             max: 30 },
    { key: 'brandReceptivity',         label: 'Brand Receptivity',         max: 30 },
    { key: 'competitiveVulnerability', label: 'Competitive Vulnerability', max: 30 },
    { key: 'authenticityFit',          label: 'Authenticity Fit',          max: 30 },
    { key: 'emotionalPotential',       label: 'Emotional Potential',       max: 30 },
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
          </div>
        );
      })}
    </div>
  );
}

export default function DetailPanel({ island, onClose, allSources }) {
  const tierColor = islandColor(island.tier);
  const isNewFormat = !!(island.primaryEmotion || island.emotionalJourney);

  const islandSources = (island.sources || [])
    .map(id => allSources?.find(s => s.id === id))
    .filter(Boolean);

  const sayDoSources = (island.sayDo?.sources || [])
    .map(id => allSources?.find(s => s.id === id))
    .filter(Boolean);

  return (
    <div className="detail-panel">
      <div className="detail-panel-inner">
        <button className="detail-close" onClick={onClose} aria-label="Close">✕</button>

        {/* Header */}
        <div className="detail-header">
          <div className="detail-tier-tag" style={{ color: tierColor.fill }}>
            Tier {island.tier} · {island.tier === 1 ? 'Immediate' : island.tier === 2 ? 'Secondary' : 'Monitor'}
          </div>
          <h2 className="detail-name">{island.name}</h2>
          <div className="detail-badges">
            <ScoreBadge score={island.score} tier={island.tier} />
            {isNewFormat && island.primaryEmotion && (
              <EmotionBadge emotion={island.primaryEmotion} label="Primary" />
            )}
            {isNewFormat && island.secondaryEmotion && (
              <EmotionBadge emotion={island.secondaryEmotion} label="Secondary" />
            )}
          </div>
          <div className="detail-status">{island.status}</div>
        </div>

        {/* Growth + Window + Momentum */}
        <div className="detail-section">
          <div className="detail-stat-row">
            <div className="detail-stat">
              <div className="stat-label">Growth Signal</div>
              <div className="stat-value" style={{ color: tierColor.stroke }}>{island.growth}</div>
            </div>
            <div className="detail-stat">
              <div className="stat-label">Window</div>
              <div className="stat-value">{island.window}</div>
            </div>
          </div>
          {island.culturalMomentum && (
            <div className="momentum-block">
              <div className="stat-label">Cultural Momentum</div>
              <div className="momentum-text">{island.culturalMomentum}</div>
            </div>
          )}
        </div>

        {/* Emotional Journey (new format) */}
        {isNewFormat && island.emotionalJourney && (
          <div className="detail-section">
            <div className="section-heading">Emotional Journey</div>
            <p className="emotional-journey">{island.emotionalJourney}</p>
          </div>
        )}

        {island.maya && (
          <div className="detail-section">
            <div className="section-heading">MAYA Fit</div>
            <MayaGauge value={island.maya.incongruence} />
            {island.maya.whyItPasses && <p className="momentum-text">{island.maya.whyItPasses}</p>}
          </div>
        )}

        {(island.humanTruth || island.culturalFriction || island.ritual || island.earnedRight) && (
          <div className="detail-section">
            <div className="section-heading">Creative Directive</div>
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

        {/* Say / Do Gap */}
        {island.sayDo && (
          <div className="detail-section saydo-section">
            <div className="section-heading">
              Say / Do Gap
              <span className="saydo-gap-inline"> — delta {island.sayDo.gap}/100</span>
            </div>
            <SayDoGapBar gap={island.sayDo.gap} />
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
          <div className="detail-section">
            <div className="section-heading">Community</div>
            <div className="community-new">
              <div className="community-row">
                <span className="community-platform-tag">{island.community.platform}</span>
                <strong>{island.community.name}</strong>
              </div>
              {island.community.members && <div className="community-members-text">{island.community.members}</div>}
              {island.community.keyCreators?.length > 0 && (
                <div className="card-tags-row">
                  <span className="tags-label">Key creators:</span>
                  {island.community.keyCreators.map(c => <span key={c} className="meta-tag creator-tag">{c}</span>)}
                </div>
              )}
              {island.community.contentTypes?.length > 0 && (
                <div className="card-tags-row">
                  <span className="tags-label">Content types:</span>
                  {island.community.contentTypes.map(c => <span key={c} className="meta-tag">{c}</span>)}
                </div>
              )}
              {island.community.gatekeepers?.length > 0 && (
                <div className="card-tags-row">
                  <span className="tags-label">Gatekeepers:</span>
                  {island.community.gatekeepers.map(g => <span key={g} className="meta-tag gatekeeper">{g}</span>)}
                </div>
              )}
              {island.community.brandMentions != null && (
                <div className="community-mentions">
                  <span className="mentions-count">{island.community.brandMentions}</span> brand mentions
                  {island.community.brandSentiment && <span className="mentions-sentiment"> · {island.community.brandSentiment}</span>}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Community — old format */}
        {!isNewFormat && island.community && (
          <div className="detail-section">
            <div className="section-heading">Community</div>
            <div className="community-card">
              <div className="community-name">
                <span className="community-platform">{island.community.platform}</span>
                <span className="community-handle">{island.community.name}</span>
                <span className="community-members">{island.community.members}</span>
              </div>
              {island.community.language && <div className="community-language">"{island.community.language}"</div>}
              <div className="community-meta">
                {island.community.decisionDrivers && (
                  <div>
                    <div className="meta-label">Decision Drivers</div>
                    <div className="meta-tags">
                      {island.community.decisionDrivers.map(d => <span key={d} className="meta-tag">{d}</span>)}
                    </div>
                  </div>
                )}
                {island.community.gatekeepers && (
                  <div>
                    <div className="meta-label">Gatekeepers</div>
                    <div className="meta-tags">
                      {island.community.gatekeepers.map(g => <span key={g} className="meta-tag gatekeeper">{g}</span>)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Brand Fit — old format */}
        {!isNewFormat && island.brandFit && (
          <div className="detail-section">
            <div className="section-heading">
              Brand Fit
              <span className="fit-score" style={{ color: tierColor.fill }}> {island.brandFit.score}/100</span>
            </div>
            <div className="right-to-play">
              <span className={`rtp-badge ${island.brandFit.rightToPlay ? 'yes' : 'no'}`}>
                {island.brandFit.rightToPlay ? '✓ Right to Play' : '✗ Weak Right to Play'}
              </span>
            </div>
            {island.brandFit.products && (
              <div className="products-list">
                {island.brandFit.products.map(p => <span key={p} className="product-tag">{p}</span>)}
              </div>
            )}
            {island.brandFit.reasons && (
              <ul className="detail-list">
                {island.brandFit.reasons.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            )}
          </div>
        )}

        {/* Content Strategy — new format */}
        {isNewFormat && island.contentStrategy && (
          <div className="detail-section">
            <div className="section-heading">Content Strategy</div>
            {island.contentStrategy.formats?.length > 0 && (
              <>
                <div className="cs-sub-label">Formats</div>
                <ul className="detail-list">
                  {island.contentStrategy.formats.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </>
            )}
            {island.contentStrategy.platforms?.length > 0 && (
              <div className="card-tags-row">
                <span className="tags-label">Platforms:</span>
                {island.contentStrategy.platforms.map(p => <span key={p} className="meta-tag platform-tag">{p}</span>)}
              </div>
            )}
            {island.contentStrategy.creatorTypes?.length > 0 && (
              <div className="card-tags-row">
                <span className="tags-label">Creator types:</span>
                {island.contentStrategy.creatorTypes.map(c => <span key={c} className="meta-tag creator-tag">{c}</span>)}
              </div>
            )}
            {island.contentStrategy.pathToTrust && (
              <div className="saydo-role-block">
                <div className="saydo-role-label">Path to trust</div>
                <p className="saydo-role-text">{island.contentStrategy.pathToTrust}</p>
              </div>
            )}
          </div>
        )}

        {island.mediaHabitat && (
          <div className="detail-section">
            <div className="section-heading">Media Habitat</div>
            {island.mediaHabitat.primaryPlatform && (
              <div className="brief-block">
                <div className="brief-label">Primary Platform</div>
                <p className="brief-text">{island.mediaHabitat.primaryPlatform}</p>
              </div>
            )}
            {island.mediaHabitat.formatFamily && (
              <div className="brief-block">
                <div className="brief-label">Format Family</div>
                <p className="brief-text">{island.mediaHabitat.formatFamily}</p>
              </div>
            )}
            {island.mediaHabitat.creatorLandscape && (
              <div className="brief-block">
                <div className="brief-label">Creator Landscape</div>
                <p className="brief-text">{island.mediaHabitat.creatorLandscape}</p>
              </div>
            )}
            {island.mediaHabitat.activationPattern && (
              <div className="brief-block">
                <div className="brief-label">Activation Pattern</div>
                <p className="brief-text">{island.mediaHabitat.activationPattern}</p>
              </div>
            )}
          </div>
        )}

        {/* Content Strategy — old format */}
        {!isNewFormat && island.contentStrategy && Array.isArray(island.contentStrategy) && (
          <div className="detail-section">
            <div className="section-heading">Content Strategy</div>
            <ul className="detail-list strategy">
              {island.contentStrategy.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        )}

        {/* Scoring Breakdown (new format) */}
        {isNewFormat && island.scoring && (
          <div className="detail-section">
            <div className="section-heading">Scoring Breakdown</div>
            <ScoringBreakdown scoring={island.scoring} />
          </div>
        )}

        {/* Why — old format */}
        {!isNewFormat && island.why && (
          <div className="detail-section">
            <div className="section-heading">Why This Island</div>
            <ul className="detail-list why">
              {island.why.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </div>
        )}

        {/* Brand Narrative */}
        {island.brandNarrative && (
          <blockquote className="brand-narrative">"{island.brandNarrative}"</blockquote>
        )}

        {/* Public / Private Signal Gap */}
        {(island.publicSignal || island.privateTruth || island.gapStatement) && (
          <div className="detail-section">
            <div className="section-heading">Public / Private Signal</div>
            {island.gapStatement && (
              <div className="gap-statement">
                <div className="gap-statement-label">The Gap</div>
                <p className="gap-statement-text">"{island.gapStatement}"</p>
              </div>
            )}
            {island.publicSignal && (
              <div className="signal-block">
                <div className="signal-label signal-public">Public Signal</div>
                {island.publicSignal.summary && <p className="signal-summary">{island.publicSignal.summary}</p>}
                {island.publicSignal.verbatim?.length > 0 && (
                  <div className="signal-quotes">
                    {island.publicSignal.verbatim.map((q, i) => (
                      <div key={i} className="signal-quote public-quote">"{q}"</div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {island.privateTruth && (
              <div className="signal-block">
                <div className="signal-label signal-private">Private Truth</div>
                {island.privateTruth.summary && <p className="signal-summary">{island.privateTruth.summary}</p>}
                {island.privateTruth.verbatim?.length > 0 && (
                  <div className="signal-quotes">
                    {island.privateTruth.verbatim.map((q, i) => (
                      <div key={i} className="signal-quote private-quote">"{q}"</div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Creative Brief */}
        {island.creativeBrief && (
          <div className="detail-section creative-brief-section">
            <div className="section-heading">Creative Brief</div>

            {island.creativeBrief.theHuman && (
              <div className="brief-block">
                <div className="brief-label">The Human</div>
                <p className="brief-text">{island.creativeBrief.theHuman}</p>
              </div>
            )}

            {island.creativeBrief.theTerritory && (
              <div className="brief-block">
                <div className="brief-label">The Territory</div>
                <p className="brief-text">{island.creativeBrief.theTerritory}</p>
              </div>
            )}

            {island.creativeBrief.theEnemy && (
              <div className="brief-block">
                <div className="brief-label">The Enemy</div>
                <p className="brief-text">{island.creativeBrief.theEnemy}</p>
              </div>
            )}

            {island.creativeBrief.theTask && (
              <div className="brief-block">
                <div className="brief-label">The Task</div>
                <p className="brief-text task-text">{island.creativeBrief.theTask}</p>
              </div>
            )}

            {island.creativeBrief.emotionalArc && (
              <div className="brief-block">
                <div className="brief-label">Emotional Arc</div>
                {island.creativeBrief.emotionalArc.arrest && (
                  <div className="arc-row"><span className="arc-stage">Arrest</span><span className="arc-desc">{island.creativeBrief.emotionalArc.arrest}</span></div>
                )}
                {island.creativeBrief.emotionalArc.middle && (
                  <div className="arc-row"><span className="arc-stage">Hold</span><span className="arc-desc">{island.creativeBrief.emotionalArc.middle}</span></div>
                )}
                {island.creativeBrief.emotionalArc.resolve && (
                  <div className="arc-row"><span className="arc-stage">Resolve</span><span className="arc-desc">{island.creativeBrief.emotionalArc.resolve}</span></div>
                )}
              </div>
            )}

            {island.creativeBrief.theEmotion && (
              <div className="brief-block">
                <div className="brief-label">The Emotion</div>
                <span className="emotion-landing">{island.creativeBrief.theEmotion}</span>
              </div>
            )}

            {island.creativeBrief.theIncongruence && (
              <div className="brief-block">
                <div className="brief-label">The Incongruence</div>
                <p className="brief-text">{island.creativeBrief.theIncongruence}</p>
              </div>
            )}

            {island.creativeBrief.earnedReason && (
              <div className="brief-block">
                <div className="brief-label">Earned Reason</div>
                <p className="brief-text">{island.creativeBrief.earnedReason}</p>
              </div>
            )}

            {island.creativeBrief.proof?.length > 0 && (
              <div className="brief-block">
                <div className="brief-label">Proof</div>
                <ul className="detail-list">
                  {island.creativeBrief.proof.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            )}

            {island.creativeBrief.landmines?.length > 0 && (
              <div className="brief-block">
                <div className="brief-label">What Would Kill This</div>
                <ul className="detail-list">
                  {island.creativeBrief.landmines.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            )}

            {island.creativeBrief.oneSentence && (
              <blockquote className="brief-provocation">
                "{island.creativeBrief.oneSentence}"
              </blockquote>
            )}
          </div>
        )}

        {/* Sources */}
        {islandSources.length > 0 && (
          <div className="detail-section">
            <div className="section-heading">Sources</div>
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
    </div>
  );
}
