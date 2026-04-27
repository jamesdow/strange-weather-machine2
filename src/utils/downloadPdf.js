/**
 * PDF export — works with new Fathom data format.
 * Opens print dialog via popup (with iframe fallback if blocked).
 */

function esc(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function arr(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') return [val];
  return [];
}

function renderIslandCard(island) {
  const tierColor = island.tier === 1 ? '#d97706' : island.tier === 2 ? '#0891b2' : '#6366f1';
  const tierLabel = island.tier === 1 ? 'Tier 1 — Immediate' : island.tier === 2 ? 'Tier 2 — Secondary' : 'Tier 3 — Monitor';

  // Content strategy — handle both array and object formats
  let contentFormats = [];
  if (island.contentStrategy) {
    if (Array.isArray(island.contentStrategy)) {
      contentFormats = island.contentStrategy;
    } else if (island.contentStrategy.formats) {
      contentFormats = arr(island.contentStrategy.formats);
    }
  }

  // Community
  const community = island.community || {};
  const communityName = community.name || '';
  const communityMembers = community.members || '';
  const communityPlatform = community.platform || '';

  // Say/Do gap
  const sayDo = island.sayDo || {};

  return `
    <div class="island-card">
      <div class="card-header">
        <div>
          <div class="card-tier" style="color:${tierColor}">${tierLabel}</div>
          <div class="card-name">${esc(island.name)}</div>
          ${island.primaryEmotion ? `<div class="card-emotion">Primary: <strong>${esc(island.primaryEmotion)}</strong>${island.secondaryEmotion ? ` · Secondary: ${esc(island.secondaryEmotion)}` : ''}</div>` : ''}
          <div class="card-status">${esc(island.status || '')}</div>
        </div>
        <div class="card-score-block">
          <div class="card-score">${island.score}</div>
          ${sayDo.gap != null ? `<div class="card-gap">S/D gap ${sayDo.gap}</div>` : ''}
        </div>
      </div>

      ${island.growth || island.window ? `
        <div class="card-growth">
          ${island.growth ? `↑ ${esc(island.growth)}` : ''}
          ${island.growth && island.window ? ' · ' : ''}
          ${island.window ? esc(island.window) : ''}
        </div>` : ''}

      ${island.culturalMomentum ? `
        <div class="card-section">
          <div class="card-section-title">Cultural Momentum</div>
          <p>${esc(island.culturalMomentum)}</p>
        </div>` : ''}

      ${sayDo.stated || sayDo.revealed || sayDo.brandRole ? `
        <div class="card-section">
          <div class="card-section-title">Say / Do Gap — ${sayDo.gap != null ? sayDo.gap + '/100' : ''}</div>
          ${sayDo.stated ? `<p><strong>Stated:</strong> ${esc(sayDo.stated)}</p>` : ''}
          ${sayDo.revealed ? `<p><strong>Revealed:</strong> ${esc(sayDo.revealed)}</p>` : ''}
          ${sayDo.brandRole ? `<p><strong>Brand Role:</strong> ${esc(sayDo.brandRole)}</p>` : ''}
        </div>` : ''}

      ${island.emotionalJourney ? `
        <div class="card-section">
          <div class="card-section-title">Emotional Journey</div>
          <p>${esc(island.emotionalJourney)}</p>
        </div>` : ''}

      ${communityName || communityMembers ? `
        <div class="card-section">
          <div class="card-section-title">Community${communityPlatform ? ' · ' + esc(communityPlatform) : ''}</div>
          ${communityName ? `<p><strong>${esc(communityName)}</strong></p>` : ''}
          ${communityMembers ? `<p>${esc(communityMembers)}</p>` : ''}
        </div>` : ''}

      ${contentFormats.length > 0 ? `
        <div class="card-section">
          <div class="card-section-title">Content Strategy</div>
          <ul>${contentFormats.map(f => `<li>${esc(f)}</li>`).join('')}</ul>
        </div>` : ''}

      ${island.competitiveSpace ? `
        <div class="card-section">
          <div class="card-section-title">Competitive Space</div>
          <p>${esc(island.competitiveSpace)}</p>
        </div>` : ''}
    </div>
  `;
}

function renderSummaryTable(islands) {
  return `
    <table>
      <thead>
        <tr>
          <th>#</th><th>Territory</th><th>Emotion</th><th>Score</th><th>Tier</th><th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${islands.map((island, i) => `
          <tr>
            <td>${i + 1}</td>
            <td><strong>${esc(island.name)}</strong></td>
            <td>${esc(island.primaryEmotion || '—')}</td>
            <td><strong>${island.score}</strong></td>
            <td>Tier ${island.tier}</td>
            <td>${esc(island.status || '—')}</td>
          </tr>`).join('')}
      </tbody>
    </table>
  `;
}

const PRINT_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Inter', Georgia, sans-serif;
    font-size: 13px; color: #111; background: #fff;
    padding: 32px 40px 60px; max-width: 860px; margin: 0 auto; line-height: 1.6;
  }
  h1 { font-size: 26px; font-weight: 800; margin: 10px 0 4px; }
  h2 { font-size: 14px; font-weight: 700; border-bottom: 2px solid #111;
       padding-bottom: 6px; margin: 32px 0 14px; text-transform: uppercase; letter-spacing: 0.06em; }
  p { margin-bottom: 8px; color: #333; }
  .report-header { border-bottom: 2px solid #111; padding-bottom: 20px; margin-bottom: 32px; }
  .report-meta { font-size: 11px; color: #666; margin-bottom: 8px; }
  .report-meta span { margin-right: 12px; }
  .report-subtitle { font-size: 13px; color: #555; margin-bottom: 4px; }
  .report-methodology { font-size: 11px; color: #888; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 12px; }
  th { background: #f5f5f5; font-weight: 700; text-align: left; padding: 7px 10px; border: 1px solid #ccc; }
  td { padding: 6px 10px; border: 1px solid #ddd; vertical-align: top; }
  tr:nth-child(even) td { background: #fafafa; }
  .narrative-card { border: 1px solid #ccc; padding: 20px; margin-bottom: 24px; border-radius: 4px; }
  .narrative-headline { font-size: 16px; font-weight: 700; margin-bottom: 10px; }
  blockquote { border-left: 3px solid #111; padding-left: 14px; font-style: italic; color: #444; margin: 14px 0 0; font-size: 13px; }
  .island-card { border: 1px solid #ddd; padding: 18px; margin-bottom: 22px; page-break-inside: avoid; border-radius: 4px; }
  .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; gap: 12px; }
  .card-tier { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 3px; }
  .card-name { font-size: 16px; font-weight: 800; margin-bottom: 3px; }
  .card-emotion { font-size: 11px; color: #555; margin-bottom: 3px; }
  .card-status { font-size: 11px; color: #777; }
  .card-score-block { text-align: right; flex-shrink: 0; }
  .card-score { font-size: 22px; font-weight: 800; background: #f5f5f5; padding: 4px 12px; border-radius: 6px; display: inline-block; }
  .card-gap { font-size: 10px; color: #888; margin-top: 4px; }
  .card-growth { font-size: 11px; color: #666; margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px solid #eee; }
  .card-section { margin-bottom: 12px; }
  .card-section-title { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #111; margin-bottom: 6px; }
  ul { padding-left: 16px; margin: 0; }
  li { margin-bottom: 4px; color: #333; font-size: 12px; }
  .insight-item { display: flex; gap: 14px; margin-bottom: 14px; page-break-inside: avoid; }
  .insight-num { font-size: 18px; font-weight: 800; min-width: 28px; color: #bbb; line-height: 1.4; }
  .report-footer { border-top: 1px solid #ccc; margin-top: 40px; padding-top: 14px; font-size: 11px; color: #888; }
  @media print {
    body { padding: 0; }
    @page { margin: 16mm; }
  }
`;

export function downloadReportPdf(brandData) {
  const { meta, islands, insights } = brandData;
  const tier1 = islands.filter(i => i.tier === 1);
  const tier2 = islands.filter(i => i.tier === 2);
  const tier3 = islands.filter(i => i.tier === 3);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${esc(meta.brand)} — Cultural Territory Map</title>
  <style>${PRINT_CSS}</style>
</head>
<body>
  <div class="report-header">
    <div class="report-meta">
      <span>Client: <strong>${esc(meta.client || '')}</strong></span>
      <span>Brand: <strong>${esc(meta.brand)}</strong></span>
      <span>${esc(meta.date || '')}</span>
    </div>
    <h1>Cultural Territory Map</h1>
    <div class="report-subtitle">${esc(meta.role || 'Stage 2: Plotting the Map')}</div>
    <div class="report-methodology">${esc(meta.methodology || '')}</div>
  </div>

  <h2>The Islands at a Glance</h2>
  ${renderSummaryTable(islands)}

  ${meta.narrative || meta.tagline ? `
  <h2>The Core Narrative</h2>
  <div class="narrative-card">
    ${meta.narrative ? `<div class="narrative-headline">${esc(meta.narrative)}</div>` : ''}
    ${insights && insights.length ? `<ul style="margin:12px 0">${insights.slice(0,4).map(i => `<li>${esc(i)}</li>`).join('')}</ul>` : ''}
    ${meta.tagline ? `<blockquote>"${esc(meta.tagline)}"</blockquote>` : ''}
  </div>` : ''}

  ${tier1.length ? `<h2>Tier 1 — Immediate Opportunities</h2>${tier1.map(renderIslandCard).join('')}` : ''}
  ${tier2.length ? `<h2>Tier 2 — Secondary Opportunities</h2>${tier2.map(renderIslandCard).join('')}` : ''}
  ${tier3.length ? `<h2>Tier 3 — Monitor</h2>${tier3.map(renderIslandCard).join('')}` : ''}

  ${insights && insights.length > 4 ? `
  <h2>Key Insights</h2>
  ${insights.map((insight, i) => `
    <div class="insight-item">
      <span class="insight-num">${String(i + 1).padStart(2, '0')}</span>
      <p>${esc(insight)}</p>
    </div>`).join('')}` : ''}

  <div class="report-footer">
    <div>Powered by <strong>Fathom</strong> Agentic Research System · <strong>Landfall</strong></div>
    <div>${meta.client ? `For: ${esc(meta.client)} · ` : ''}${esc(meta.brand)} · Confidential</div>
  </div>
</body>
</html>`;

  // Try popup first; fall back to hidden iframe if blocked
  let win = null;
  try { win = window.open('', '_blank'); } catch(e) { win = null; }

  if (win && win.document) {
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 900);
  } else {
    // Popup blocked — render in full-screen iframe overlay
    const existing = document.getElementById('__pdf_frame');
    if (existing) existing.remove();
    const iframe = document.createElement('iframe');
    iframe.id = '__pdf_frame';
    iframe.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;border:none;z-index:99999;background:#fff;';
    document.body.appendChild(iframe);
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();
    // Inject close + print buttons
    const bar = doc.createElement('div');
    bar.style.cssText = 'position:fixed;top:14px;right:18px;display:flex;gap:8px;z-index:9';
    bar.innerHTML = `
      <button onclick="window.print()" style="padding:8px 18px;background:#111;color:#fff;border:none;border-radius:6px;font:600 13px/1 sans-serif;cursor:pointer;">Print / Save PDF</button>
      <button onclick="parent.document.getElementById('__pdf_frame').remove()" style="padding:8px 14px;background:#eee;color:#333;border:none;border-radius:6px;font:600 13px/1 sans-serif;cursor:pointer;">✕ Close</button>
    `;
    doc.body.appendChild(bar);
    setTimeout(() => iframe.contentWindow.print(), 900);
  }
}
