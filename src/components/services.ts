import { Translation } from '../i18n/types';

let capabilityObserver: IntersectionObserver | null = null;

export function initServicesStyles() {}

/* ---------- Shared SVG helpers ---------- */

function packet(pathId: string, dur: number, begin: number, extra = '') {
  return `
    <circle class="pk" r="3.4" ${extra}>
      <animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines=".45 0 .3 1"><mpath href="#${pathId}"/></animateMotion>
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.85;1" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
    </circle>`;
}

/* ---------- Capability diagrams ---------- */

function agenticVisual() {
  const cx = 320;
  const cy = 240;
  const r = 168;
  const agents = ['Research', 'Voice', 'Support', 'Data', 'Workflow', 'Review'];
  const angles = [-90, -30, 30, 90, 150, 210];
  const points = angles.map((a) => {
    const rad = (a * Math.PI) / 180;
    return [cx + Math.cos(rad) * r, cy + Math.sin(rad) * r * 0.92];
  });

  const wires = points.map(([x, y], i) => `<path id="ag-w${i}" class="dg-wire" d="M${cx} ${cy}L${x.toFixed(1)} ${y.toFixed(1)}"></path>`).join('');
  const nodes = points.map(([x, y], i) => {
    const human = i === 5;
    return `
      <g class="dg-chip ${human ? 'is-human' : ''}">
        <rect x="${(x - 54).toFixed(1)}" y="${(y - 16).toFixed(1)}" width="108" height="32" rx="16"></rect>
        <circle cx="${(x - 38).toFixed(1)}" cy="${y.toFixed(1)}" r="3"></circle>
        <text x="${(x - 28).toFixed(1)}" y="${(y + 3.5).toFixed(1)}">${agents[i].toUpperCase()}</text>
      </g>`;
  }).join('');

  return `
    <div class="diagram-heading"><span>01</span> Multi-agent orchestration</div>
    <svg viewBox="0 0 640 480" aria-hidden="true">
      <g class="dg-orbit">
        <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.92}"></ellipse>
        <ellipse cx="${cx}" cy="${cy}" rx="${r * 0.56}" ry="${r * 0.52}"></ellipse>
      </g>
      <g class="dg-spin" style="transform-origin:${cx}px ${cy}px">
        <ellipse class="dg-orbit-arc" cx="${cx}" cy="${cy}" rx="${r * 0.56}" ry="${r * 0.56}"></ellipse>
      </g>
      ${wires}
      ${points.map((_, i) => packet(`ag-w${i}`, 2.6, i * 0.43)).join('')}
      ${nodes}
      <g class="dg-hub">
        <rect x="${cx - 66}" y="${cy - 30}" width="132" height="60" rx="14"></rect>
        <circle cx="${cx - 44}" cy="${cy}" r="5"></circle>
        <text x="${cx - 32}" y="${cy - 3}">ORCHESTRATOR</text>
        <text x="${cx - 32}" y="${cy + 11}" class="dg-sub">PLAN · ROUTE · CHECK</text>
      </g>
      <g class="dg-callout">
        <path d="M${(points[5][0] - 20).toFixed(1)} ${(points[5][1] - 18).toFixed(1)}V${(points[5][1] - 52).toFixed(1)}H${(points[5][0] + 30).toFixed(1)}"></path>
        <text x="${(points[5][0] + 36).toFixed(1)}" y="${(points[5][1] - 48).toFixed(1)}">HUMAN IN THE LOOP</text>
      </g>
    </svg>
    <div class="diagram-status"><span></span>Approval layer active</div>
  `;
}

function securityVisual() {
  const cx = 330;
  const cy = 240;
  const rings = [
    { s: 380, label: 'CLOUD' },
    { s: 292, label: 'NETWORK' },
    { s: 204, label: 'APPLICATION' },
    { s: 118, label: 'IDENTITY' },
  ];
  const threats = [150, 240, 330];
  return `
    <div class="diagram-heading"><span>02</span> Defense across every layer</div>
    <svg viewBox="0 0 640 480" aria-hidden="true">
      <defs>
        <clipPath id="sec-clip"><rect x="${cx - 190}" y="${cy - 190}" width="380" height="380" rx="40"></rect></clipPath>
        <linearGradient id="sec-sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#c8ff00" stop-opacity="0"/>
          <stop offset="1" stop-color="#c8ff00" stop-opacity=".22"/>
        </linearGradient>
      </defs>
      <g clip-path="url(#sec-clip)">
        <g class="sec-radar" style="transform-origin:${cx}px ${cy}px">
          <path d="M${cx} ${cy}L${cx + 280} ${cy - 120}A304 304 0 0 1 ${cx + 304} ${cy}Z" fill="url(#sec-sweep)"></path>
          <path class="sec-radar-edge" d="M${cx} ${cy}H${cx + 300}"></path>
        </g>
      </g>
      <g class="sec-rings">
        ${rings.map((ring, i) => `
          <rect class="${i === 2 ? 'is-accent' : ''}" x="${cx - ring.s / 2}" y="${cy - ring.s / 2}" width="${ring.s}" height="${ring.s}" rx="${40 - i * 8}"></rect>
          <text x="${cx - ring.s / 2 + 14}" y="${cy - ring.s / 2 + 22}">${ring.label}</text>
        `).join('')}
      </g>
      ${threats.map((y, i) => `<path id="sec-t${i}" class="sec-threat-path" d="M8 ${y}H${cx - 194}"></path>`).join('')}
      ${threats.map((y, i) => `
        <circle class="pk pk-threat" r="3.4">
          <animateMotion dur="2.2s" begin="${i * 0.7}s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines=".4 0 1 1"><mpath href="#sec-t${i}"/></animateMotion>
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.96;1" dur="2.2s" begin="${i * 0.7}s" repeatCount="indefinite"/>
        </circle>
        <g class="sec-block" transform="translate(${cx - 190} ${y})">
          <circle r="9">
            <animate attributeName="r" values="4;4;14" keyTimes="0;.95;1" dur="2.2s" begin="${i * 0.7}s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;0;1" keyTimes="0;.95;1" dur="2.2s" begin="${i * 0.7}s" repeatCount="indefinite"/>
          </circle>
          <path d="M-3 -3l6 6M3 -3l-6 6"></path>
        </g>
      `).join('')}
      <path id="sec-ok" class="sec-ok-path" d="M636 ${cy}H${cx + 32}"></path>
      ${packet('sec-ok', 2.6, 0.3)}
      ${packet('sec-ok', 2.6, 1.6)}
      <g class="dg-core">
        <circle class="dg-core-pulse" cx="${cx}" cy="${cy}" r="30"></circle>
        <circle cx="${cx}" cy="${cy}" r="30"></circle>
        <path d="M${cx} ${cy - 15}l12 5v7c0 8-5 13-12 16-7-3-12-8-12-16v-7z" class="dg-core-shield"></path>
        <path d="M${cx - 5} ${cy + 1}l4 4 7-8" class="dg-core-check"></path>
      </g>
      <text class="dg-label" x="8" y="${threats[0] - 14}">UNTRUSTED</text>
      <text class="dg-label is-accent" x="632" y="${cy - 14}" text-anchor="end">VERIFIED</text>
    </svg>
    <div class="diagram-status"><span></span>Control boundary verified</div>
  `;
}

function financeVisual() {
  const y = 262;
  const nodes = [
    { x: 72, label: 'WALLET', glyph: '€' },
    { x: 196, label: 'KYC / AML', glyph: '✓', gate: true },
    { x: 320, label: 'LEDGER', glyph: '≡' },
    { x: 444, label: 'FX', glyph: '⇄' },
    { x: 568, label: 'PAYOUT', glyph: '₦' },
  ];
  const corridors = [
    ['EUR', 'NGN'],
    ['USD', 'GBP'],
    ['GBP', 'KES'],
  ];
  const spark = 'M40 150 C 90 140, 110 118, 150 122 S 210 96, 250 104 S 320 70, 360 82 S 430 52, 470 60 S 550 36, 600 40';
  return `
    <div class="diagram-heading"><span>03</span> Trusted money movement</div>
    <svg viewBox="0 0 640 480" aria-hidden="true">
      <defs>
        <linearGradient id="fin-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#c8ff00" stop-opacity=".18"/>
          <stop offset="1" stop-color="#c8ff00" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <g class="fin-chart">
        <text x="40" y="34">SETTLEMENT FLOW</text>
        <path d="M40 160H600" class="fin-axis"></path>
        <path d="${spark} V160 H40Z" fill="url(#fin-area)" stroke="none"></path>
        <path d="${spark}" class="fin-line" pathLength="1"></path>
        <circle cx="600" cy="40" r="4" class="fin-head"></circle>
      </g>
      <path id="fin-rail" class="fin-rail" d="M${nodes[0].x} ${y}H${nodes[4].x}"></path>
      ${packet('fin-rail', 4.2, 0)}
      ${packet('fin-rail', 4.2, 1.4)}
      ${packet('fin-rail', 4.2, 2.8)}
      ${nodes.map((n) => `
        <g class="fin-node ${n.gate ? 'is-gate' : ''}">
          <rect x="${n.x - 50}" y="${y - 40}" width="100" height="80" rx="12"></rect>
          <text class="fin-glyph" x="${n.x}" y="${y + 6}" text-anchor="middle">${n.glyph}</text>
          <text x="${n.x}" y="${y + 28}" text-anchor="middle">${n.label}</text>
        </g>
      `).join('')}
      <g class="fin-corridors">
        ${corridors.map(([from, to], i) => `
          <g transform="translate(${40 + i * 192} 360)">
            <rect width="176" height="54" rx="10"></rect>
            <text x="16" y="24">${from} <tspan class="is-accent">→</tspan> ${to}</text>
            <text x="16" y="42" class="dg-sub">CORRIDOR 0${i + 1}</text>
            <circle cx="156" cy="27" r="4" class="fin-ok"></circle>
          </g>
        `).join('')}
      </g>
    </svg>
    <div class="diagram-status"><span></span>Transaction path observable</div>
  `;
}

/* ---------- Process glyphs (one per step, 240x120) ---------- */

const processGlyphs = [
  // Sense: signal emanating from a source
  `<circle cx="60" cy="60" r="6" class="g-fill"/>
   <circle cx="60" cy="60" r="20" class="g-wave"/><circle cx="60" cy="60" r="20" class="g-wave" style="animation-delay:.8s"/><circle cx="60" cy="60" r="20" class="g-wave" style="animation-delay:1.6s"/>
   <path d="M120 36h80M120 60h56M120 84h96" class="g-line"/><circle cx="200" cy="36" r="3" class="g-fill"/><circle cx="176" cy="60" r="3" class="g-dot"/><circle cx="216" cy="84" r="3" class="g-dot"/>`,
  // Plan: branching routes, one chosen
  `<circle cx="28" cy="60" r="6" class="g-fill"/><circle cx="212" cy="60" r="6" class="g-ring"/>
   <path d="M34 60C80 60 80 22 120 22S170 60 206 60" class="g-dash"/>
   <path d="M34 60C80 60 80 98 120 98S170 60 206 60" class="g-dash"/>
   <path d="M34 60H206" class="g-accent g-draw" pathLength="1"/>
   <rect x="110" y="52" width="20" height="16" rx="4" class="g-box"/>`,
  // Coordinate: hub and satellites
  `<path d="M120 60L50 26M120 60L50 94M120 60L190 26M120 60L190 94" class="g-line"/>
   <rect x="104" y="44" width="32" height="32" rx="9" class="g-hubbox"/><circle cx="120" cy="60" r="4" class="g-fill"/>
   <circle cx="50" cy="26" r="9" class="g-ring"/><circle cx="50" cy="94" r="9" class="g-ring"/><circle cx="190" cy="26" r="9" class="g-ring"/><circle cx="190" cy="94" r="9" class="g-ring"/>
   <circle r="3" class="g-fill"><animateMotion dur="2.2s" repeatCount="indefinite" path="M120 60L190 26L120 60L50 94L120 60L190 94L120 60L50 26Z"/></circle>`,
  // Act: action passes an approval gate
  `<path d="M16 60H96M144 60H224" class="g-line"/>
   <rect x="96" y="38" width="48" height="44" rx="10" class="g-gate"/>
   <path d="M110 60l7 7 13-14" class="g-check"/>
   <path d="M196 50l12 10-12 10" class="g-arrow"/>
   <circle r="3.5" class="g-fill"><animateMotion dur="2.6s" repeatCount="indefinite" path="M16 60H224" keyPoints="0;.36;.36;1" keyTimes="0;.35;.6;1" calcMode="linear"/></circle>`,
  // Verify: audit trail with confirmation
  `<rect x="36" y="16" width="112" height="88" rx="10" class="g-box"/>
   <path d="M54 38h56M54 54h76M54 70h44M54 86h64" class="g-line"/>
   <circle cx="168" cy="78" r="22" class="g-badge"/><path d="M158 78l7 7 13-14" class="g-check-dark"/>
   <path d="M198 30h26M204 44h20" class="g-line"/>`,
];

/* ---------- Use-case glyphs (one per card, 120x80) ---------- */

const useCaseGlyphs = [
  // Customer ops: conversation
  `<rect x="8" y="10" width="64" height="26" rx="8" class="u-box"/><path d="M20 23h40" class="u-line"/>
   <rect x="44" y="44" width="68" height="26" rx="8" class="u-fill"/><path d="M56 57h44" class="u-line-dark"/>`,
  // Voice: waveform
  `${[14, 28, 44, 22, 52, 34, 18, 40, 26, 12].map((h, i) => `<rect class="u-bar" style="--h:${h};animation-delay:${i * 90}ms" x="${12 + i * 10}" y="${40 - h / 2}" width="4" height="${h}" rx="2"/>`).join('')}`,
  // Security ops: target with alert
  `<circle cx="60" cy="40" r="32" class="u-ring"/><circle cx="60" cy="40" r="18" class="u-ring"/><path d="M60 4v12M60 64v12M24 40h12M84 40h12" class="u-line"/><circle cx="72" cy="30" r="5" class="u-fill"/>`,
  // Cloud hardening: cloud + shield
  `<path d="M30 58a16 16 0 0 1 2-32 22 22 0 0 1 42-4 16 16 0 0 1 16 36z" class="u-box"/><path d="M60 30l12 5v8c0 8-5 13-12 16-7-3-12-8-12-16v-8z" class="u-fill"/>`,
  // Payments & wallets: card
  `<rect x="16" y="14" width="88" height="56" rx="9" class="u-box"/><rect x="28" y="28" width="16" height="12" rx="3" class="u-fill"/><path d="M28 54h28M64 54h28" class="u-line"/>`,
  // Remittance: arc between two points
  `<path d="M14 62H106" class="u-line"/><path id="u-arc" d="M24 62C34 8 86 8 96 62" class="u-dash"/><circle cx="24" cy="62" r="5" class="u-box-solid"/><circle cx="96" cy="62" r="5" class="u-fill"/>
   <circle r="3" class="u-fill"><animateMotion dur="2.4s" repeatCount="indefinite"><mpath href="#u-arc"/></animateMotion></circle>`,
];

/* ---------- Sections ---------- */

function renderCapabilitySection(t: Translation) {
  const count = t.capabilities.items.length;
  return `
    <section id="capabilities" class="capabilities-section section-dark" data-section-root="capabilities">
      <div class="capability-scroll">
        <div class="capability-sticky page-shell">
          <div class="capability-copy">
            <p class="section-kicker">${t.capabilities.kicker}</p>
            <h2>${t.capabilities.title}</h2>
            <div class="capability-list" role="tablist" aria-label="${t.capabilities.title}">
              ${t.capabilities.items.map((item, index) => `
                <button class="capability-item ${index === 0 ? 'is-active' : ''}" type="button" role="tab" aria-selected="${index === 0}" data-capability="${index}">
                  <span class="capability-index">0${index + 1}</span>
                  <span class="capability-item-copy">
                    <strong>${item.title}</strong>
                    <span class="capability-reveal">
                      <span class="capability-reveal-inner">
                        <span class="capability-description">${item.description}</span>
                        <span class="capability-features">${item.features.map((feature) => `<i>${feature}</i>`).join('')}</span>
                      </span>
                    </span>
                  </span>
                  <span class="capability-toggle" aria-hidden="true"></span>
                </button>
              `).join('')}
            </div>
          </div>

          <div class="capability-stage">
            <div class="capability-visuals">
              <div class="capability-panel is-active" data-panel="0">${agenticVisual()}</div>
              <div class="capability-panel" data-panel="1">${securityVisual()}</div>
              <div class="capability-panel" data-panel="2">${financeVisual()}</div>
            </div>
            <div class="section-progress" aria-hidden="true">
              <span class="section-progress-current">01</span>
              <i style="--progress:${1 / count}"></i>
              <span>0${count}</span>
            </div>
          </div>
        </div>
        <div class="capability-triggers" aria-hidden="true">
          ${t.capabilities.items.map((_, i) => `<span data-trigger="${i}"></span>`).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderProcessSection(t: Translation) {
  const marquee = t.process.marquee.map((item) => `<span>${item}</span><i aria-hidden="true"></i>`).join('');
  return `
    <section id="work" class="process-section section-light" data-section-root="work">
      <div class="marquee" aria-hidden="true">
        <div>${marquee}${marquee}</div>
      </div>
      <div class="page-shell process-intro">
        <div>
          <p class="section-kicker">${t.process.kicker}</p>
          <h2>${t.process.title}</h2>
        </div>
        <p>${t.process.description}</p>
      </div>
      <div class="page-shell process-flow reveal-on-scroll">
        <div class="process-track" aria-hidden="true"><i></i></div>
        ${t.process.steps.map((step, index) => `
          <article class="process-step" style="--i:${index}">
            <div class="process-step-head">
              <span class="process-num">0${index + 1}</span>
              ${index === 3 ? '<em class="approval-gate">Human approval</em>' : ''}
            </div>
            <svg class="process-glyph" viewBox="0 0 240 120" aria-hidden="true">${processGlyphs[index] ?? ''}</svg>
            <h3>${step.title}</h3>
            <p>${step.description}</p>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function renderUseCases(t: Translation) {
  return `
    <section class="use-cases-section section-light" data-section-root="work">
      <div class="page-shell use-cases-heading">
        <p class="section-kicker">${t.useCases.kicker}</p>
        <h2>${t.useCases.title}</h2>
      </div>
      <div class="page-shell use-case-grid">
        ${t.useCases.items.map((item, index) => `
          <a class="use-case-card reveal-on-scroll" href="#contact">
            <div class="use-case-top">
              <span class="use-case-index">0${index + 1}</span>
              <span class="use-case-arrow" aria-hidden="true">↗</span>
            </div>
            <svg class="use-case-glyph" viewBox="0 0 120 80" aria-hidden="true">${useCaseGlyphs[index] ?? ''}</svg>
            <div>
              <h3>${item.title}</h3>
              <p>${item.description}</p>
            </div>
          </a>
        `).join('')}
      </div>
    </section>
  `;
}

function setupCapabilities(element: HTMLElement) {
  capabilityObserver?.disconnect();
  const buttons = Array.from(element.querySelectorAll<HTMLButtonElement>('[data-capability]'));
  const panels = Array.from(element.querySelectorAll<HTMLElement>('[data-panel]'));
  const progress = element.querySelector<HTMLElement>('.section-progress-current');
  const bar = element.querySelector<HTMLElement>('.section-progress i');

  const setActive = (index: number) => {
    buttons.forEach((button, buttonIndex) => {
      const active = buttonIndex === index;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', String(active));
    });
    panels.forEach((panel, panelIndex) => panel.classList.toggle('is-active', panelIndex === index));
    if (progress) progress.textContent = `0${index + 1}`;
    bar?.style.setProperty('--progress', String((index + 1) / buttons.length));
  };

  buttons.forEach((button, index) => button.addEventListener('click', () => setActive(index)));

  const triggers = element.querySelectorAll<HTMLElement>('[data-trigger]');
  capabilityObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.trigger));
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
  triggers.forEach((trigger) => capabilityObserver?.observe(trigger));

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    element.querySelectorAll('svg').forEach((svg) => svg.pauseAnimations());
  }
}

export function renderServices(element: HTMLElement, t: Translation) {
  element.innerHTML = `
    ${renderCapabilitySection(t)}
    ${renderProcessSection(t)}
    ${renderUseCases(t)}
  `;
  setupCapabilities(element);
}
