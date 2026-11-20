import { Translation } from '../i18n/types';

export function initHeroStyles() {}

const agents = ['Data', 'Risk', 'Compliance', 'Fraud', 'Support', 'Analytics'];
const rails = ['Cards', 'Banks', 'Wallets', 'Payouts', 'Remittance', 'Real-time'];

const ROWS = [96, 158, 220, 282, 344, 406];
const CORE_X = 380;
const CORE_Y = 251;
const LEFT_PORT = 306;
const RIGHT_PORT = 454;

const logLines = [
  ['AGT.RISK', 'score 0.12 · cleared'],
  ['GATE.07', 'approval requested'],
  ['PAY.SEPA', 'transfer settled'],
  ['SEC.IAM', 'token scope verified'],
  ['AGT.FRAUD', 'pattern check · pass'],
  ['FX.EURNGN', 'quote locked · 30s'],
  ['AGT.SUPPORT', 'case resolved'],
  ['LEDGER', 'entries balanced'],
];

let logTimer: number | undefined;

function chip(x: number, y: number, label: string, side: 'left' | 'right', index: number) {
  const width = 132;
  const left = side === 'left' ? x : x - width;
  const dotX = side === 'left' ? left + 16 : left + width - 16;
  const textX = side === 'left' ? left + 30 : left + width - 30;
  const anchor = side === 'left' ? 'start' : 'end';
  return `
    <g class="hv-chip hv-chip-${side}" style="--i:${index}">
      <rect x="${left}" y="${y - 16}" width="${width}" height="32" rx="7"></rect>
      <circle class="hv-chip-dot" cx="${dotX}" cy="${y}" r="3"></circle>
      <text x="${textX}" y="${y + 3.5}" text-anchor="${anchor}">${label.toUpperCase()}</text>
    </g>
  `;
}

function renderSystemVisual() {
  const spread = (index: number) => CORE_Y + (index - 2.5) * 9;

  const leftPaths = ROWS.map((y, i) => (
    `<path id="hv-l${i}" class="hv-wire" pathLength="1" style="--i:${i}" d="M146 ${y} C 228 ${y}, 236 ${spread(i)}, ${LEFT_PORT} ${spread(i)}"></path>`
  )).join('');

  const rightPaths = ROWS.map((y, i) => (
    `<path id="hv-r${i}" class="hv-wire" pathLength="1" style="--i:${i + 6}" d="M${RIGHT_PORT} ${spread(i)} C 524 ${spread(i)}, 532 ${y}, 614 ${y}"></path>`
  )).join('');

  const packets = ROWS.map((_, i) => {
    const begin = (i * 0.53).toFixed(2);
    const beginRight = (i * 0.53 + 1.9).toFixed(2);
    return `
      <g class="hv-packet">
        <circle r="3.2">
          <animateMotion dur="2.4s" begin="${begin}s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines=".45 0 .25 1"><mpath href="#hv-l${i}"/></animateMotion>
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.82;1" dur="2.4s" begin="${begin}s" repeatCount="indefinite"/>
        </circle>
      </g>
      <g class="hv-packet">
        <circle r="3.2">
          <animateMotion dur="2.4s" begin="${beginRight}s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines=".45 0 .25 1"><mpath href="#hv-r${i}"/></animateMotion>
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.82;1" dur="2.4s" begin="${beginRight}s" repeatCount="indefinite"/>
        </circle>
      </g>
    `;
  }).join('');

  return `
    <div class="system-visual" data-tilt>
      <svg viewBox="0 0 760 500" role="img" aria-labelledby="hv-title">
        <title id="hv-title">Specialised AI agents route work through a security core onto payment rails</title>
        <defs>
          <radialGradient id="hv-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#c8ff00" stop-opacity=".22"/>
            <stop offset="100%" stop-color="#c8ff00" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="hv-sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#c8ff00" stop-opacity="0"/>
            <stop offset="100%" stop-color="#c8ff00" stop-opacity=".9"/>
          </linearGradient>
        </defs>

        <g class="hv-heads">
          <text x="14" y="44">AGENTS / 06</text>
          <text x="${CORE_X}" y="44" text-anchor="middle">SECURITY CORE</text>
          <text x="746" y="44" text-anchor="end" class="is-accent">RAILS / 06</text>
          <path d="M14 58H146M${LEFT_PORT} 58H${RIGHT_PORT}M614 58H746"></path>
        </g>

        <circle cx="${CORE_X}" cy="${CORE_Y}" r="150" fill="url(#hv-glow)"></circle>

        <g class="hv-wires">${leftPaths}${rightPaths}</g>

        ${ROWS.map((y, i) => chip(14, y, agents[i], 'left', i)).join('')}
        ${ROWS.map((y, i) => chip(746, y, rails[i], 'right', i)).join('')}

        <g class="hv-core">
          <rect class="hv-core-frame" x="${LEFT_PORT}" y="${CORE_Y - 74}" width="148" height="148" rx="28"></rect>
          <rect class="hv-core-inner" x="${LEFT_PORT + 18}" y="${CORE_Y - 56}" width="112" height="112" rx="20"></rect>
          <g class="hv-core-spin">
            <circle cx="${CORE_X}" cy="${CORE_Y}" r="44" class="hv-core-ring"></circle>
            <path d="M${CORE_X} ${CORE_Y - 44} A44 44 0 0 1 ${CORE_X + 44} ${CORE_Y}" class="hv-core-arc"></path>
          </g>
          <circle class="hv-core-pulse" cx="${CORE_X}" cy="${CORE_Y}" r="26"></circle>
          <circle class="hv-core-disc" cx="${CORE_X}" cy="${CORE_Y}" r="24"></circle>
          <path class="hv-core-lock" d="M${CORE_X - 7} ${CORE_Y - 2}v-5a7 7 0 0 1 14 0v5M${CORE_X - 10} ${CORE_Y - 2}h20v13h-20z"></path>
          <circle class="hv-port" cx="${LEFT_PORT}" cy="${CORE_Y}" r="4"></circle>
          <circle class="hv-port" cx="${RIGHT_PORT}" cy="${CORE_Y}" r="4"></circle>
        </g>

        <g class="hv-packets">${packets}</g>
      </svg>

      <div class="hv-log" aria-hidden="true">
        <div class="hv-log-head"><span></span>Event stream</div>
        <ol class="hv-log-list"></ol>
      </div>
    </div>
  `;
}

function formatTime(date: Date) {
  return date.toTimeString().slice(0, 8);
}

function startEventLog(list: HTMLOListElement, animate: boolean) {
  window.clearInterval(logTimer);
  let cursor = 0;
  const push = () => {
    const [source, message] = logLines[cursor % logLines.length];
    cursor += 1;
    const item = document.createElement('li');
    item.innerHTML = `<time>${formatTime(new Date())}</time><b>${source}</b><span>${message}</span>`;
    list.prepend(item);
    while (list.children.length > 3) list.lastElementChild?.remove();
  };
  push(); push(); push();
  if (animate) logTimer = window.setInterval(push, 2400);
}

export function renderHero(element: HTMLElement, t: Translation) {
  const lines = t.hero.title;
  element.innerHTML = `
    <div class="hero-backdrop" aria-hidden="true"></div>
    <div class="hero-inner page-shell">
      <div class="hero-copy">
        <p class="eyebrow hero-enter" style="--d:0"><span></span>${t.hero.eyebrow}</p>
        <h1 class="hero-title">
          ${lines.map((line, index) => `
            <span class="hero-line"><span style="--d:${index + 1}" class="${index === lines.length - 1 ? 'is-accent' : ''}">${line}</span></span>
          `).join('')}
        </h1>
        <p class="hero-subtitle hero-enter" style="--d:4">${t.hero.subtitle}</p>
        <div class="hero-actions hero-enter" style="--d:5">
          <a class="button button-accent" href="#contact">${t.hero.ctaPrimary}<span aria-hidden="true">↗</span></a>
          <a class="text-link" href="#capabilities">${t.hero.ctaSecondary}<span aria-hidden="true">→</span></a>
        </div>
      </div>

      ${renderSystemVisual()}
    </div>

    <div class="telemetry page-shell" aria-label="System indicators">
      <div class="telemetry-live"><span></span>Live</div>
      ${t.hero.status.map((label, index) => `
        <div class="telemetry-item">
          <span>${label}</span>
          <strong>${t.hero.statusValues[index] ?? ''}</strong>
        </div>
      `).join('')}
      <a class="telemetry-scroll" href="#capabilities" aria-label="${t.hero.ctaSecondary}"><i></i></a>
    </div>
  `;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const visual = element.querySelector<HTMLElement>('[data-tilt]');
  const svg = visual?.querySelector('svg');
  const log = element.querySelector<HTMLOListElement>('.hv-log-list');

  if (log) startEventLog(log, !reduceMotion);
  if (reduceMotion) svg?.pauseAnimations();

  if (visual && !reduceMotion && !element.dataset.tiltBound) {
    element.dataset.tiltBound = 'true';
    element.addEventListener('pointermove', (event) => {
      const target = element.querySelector<HTMLElement>('[data-tilt]');
      if (!target) return;
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      target.style.setProperty('--tilt-x', `${x * 10}px`);
      target.style.setProperty('--tilt-y', `${y * 8}px`);
    });
    element.addEventListener('pointerleave', () => {
      const target = element.querySelector<HTMLElement>('[data-tilt]');
      target?.style.setProperty('--tilt-x', '0px');
      target?.style.setProperty('--tilt-y', '0px');
    });
  }
}
