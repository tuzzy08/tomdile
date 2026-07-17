import { Translation } from '../i18n/types';

export function initHeroStyles() {}

const agentLabels = ['DATA', 'RISK', 'COMPLIANCE', 'FRAUD', 'SUPPORT', 'ANALYTICS'];
const railLabels = ['CARDS', 'BANKS', 'WALLETS', 'PAYOUTS', 'REMITTANCE', 'REAL-TIME'];

function renderSystemVisual() {
  const nodeY = [82, 148, 214, 280, 346, 412];
  const agentNodes = nodeY.map((y, index) => `
    <g class="system-node agent-node" style="--node-delay:${index * 120}ms">
      <text x="18" y="${y + 4}">${agentLabels[index]}</text>
      <circle cx="154" cy="${y}" r="17"></circle>
      <circle class="node-core" cx="154" cy="${y}" r="4"></circle>
      <path class="flow-line" d="M171 ${y} C248 ${y}, 278 ${250 + (index - 2.5) * 8}, 354 250"></path>
    </g>
  `).join('');

  const railNodes = nodeY.map((y, index) => `
    <g class="system-node rail-node" style="--node-delay:${index * 120 + 360}ms">
      <path class="flow-line" d="M504 250 C566 ${250 + (index - 2.5) * 8}, 568 ${y}, 618 ${y}"></path>
      <circle cx="636" cy="${y}" r="17"></circle>
      <circle class="node-core" cx="636" cy="${y}" r="4"></circle>
      <text x="666" y="${y + 4}">${railLabels[index]}</text>
    </g>
  `).join('');

  return `
    <div class="system-visual" data-tilt aria-label="Diagram showing specialized AI agents flowing through a security core into financial rails">
      <div class="visual-label visual-label-agents">Specialized agents</div>
      <div class="visual-label visual-label-core">Security core</div>
      <div class="visual-label visual-label-rails">Payment rails</div>
      <svg viewBox="0 0 760 500" role="img" aria-hidden="true">
        <defs>
          <pattern id="hero-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0H0V28" fill="none" stroke="currentColor" stroke-opacity=".12" stroke-width="1" />
          </pattern>
        </defs>
        <rect class="svg-grid" width="760" height="500" fill="url(#hero-grid)"></rect>
        ${agentNodes}
        <g class="security-core">
          <path d="M430 174 L504 216 L504 300 L430 342 L356 300 L356 216 Z"></path>
          <path d="M430 196 L484 227 L484 289 L430 320 L376 289 L376 227 Z"></path>
          <path d="M430 220 L464 239 L464 278 L430 298 L396 278 L396 239 Z"></path>
          <circle cx="430" cy="258" r="9"></circle>
          <path class="core-lock" d="M424 254v-7a6 6 0 0 1 12 0v7m-15 0h18v16h-18z"></path>
        </g>
        <circle class="junction" cx="354" cy="250" r="5"></circle>
        <circle class="junction" cx="504" cy="250" r="5"></circle>
        ${railNodes}
      </svg>
      <div class="visual-corner visual-corner-top"></div>
      <div class="visual-corner visual-corner-bottom"></div>
    </div>
  `;
}

export function renderHero(element: HTMLElement, t: Translation) {
  element.innerHTML = `
    <div class="hero-grid" aria-hidden="true"></div>
    <div class="hero-inner page-shell">
      <div class="hero-copy">
        <p class="eyebrow"><span></span>${t.hero.eyebrow}</p>
        <h1 class="hero-title">
          ${t.hero.title.map((line) => `<span>${line}</span>`).join('')}
          <i class="hero-reveal-block reveal-a" aria-hidden="true"></i>
          <i class="hero-reveal-block reveal-b" aria-hidden="true"></i>
        </h1>
        <p class="hero-subtitle">${t.hero.subtitle}</p>
        <div class="hero-actions">
          <a class="button button-accent" href="#contact">${t.hero.ctaPrimary}<span aria-hidden="true">↗</span></a>
          <a class="text-link" href="#capabilities">${t.hero.ctaSecondary}<span aria-hidden="true">→</span></a>
        </div>
      </div>

      ${renderSystemVisual()}
    </div>

    <div class="telemetry" aria-label="Live system indicators">
      <div class="telemetry-live"><span></span>LIVE</div>
      ${t.hero.status.map((label, index) => `
        <div class="telemetry-item">
          <span>${label}</span>
          <strong>${index === 4 ? 'ACTIVE' : index === 0 ? 'LIVE' : '03'}</strong>
        </div>
      `).join('')}
      <div class="telemetry-progress"><strong>01</strong><i></i><span>04</span></div>
    </div>
  `;

  const visual = element.querySelector<HTMLElement>('[data-tilt]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (visual && !reduceMotion) {
    element.addEventListener('pointermove', (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      visual.style.setProperty('--tilt-x', `${x * 8}px`);
      visual.style.setProperty('--tilt-y', `${y * 6}px`);
    });
    element.addEventListener('pointerleave', () => {
      visual.style.setProperty('--tilt-x', '0px');
      visual.style.setProperty('--tilt-y', '0px');
    });
  }
}
