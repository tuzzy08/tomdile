import { Translation } from '../i18n/types';
import { renderCheckerBoundary } from './checker-boundary';

let capabilityObserver: IntersectionObserver | null = null;

export function initServicesStyles() {}

function agenticVisual() {
  return `
    <div class="diagram-heading"><span>01</span> Multi-agent orchestration</div>
    <svg viewBox="0 0 700 500" aria-hidden="true">
      <g class="diagram-orbits">
        <circle cx="350" cy="250" r="72"></circle>
        <circle cx="350" cy="250" r="132"></circle>
        <circle cx="350" cy="250" r="194"></circle>
      </g>
      <g class="diagram-lines">
        <path d="M350 250L350 56"></path><path d="M350 250L514 148"></path>
        <path d="M350 250L520 354"></path><path d="M350 250L350 444"></path>
        <path d="M350 250L184 354"></path><path d="M350 250L184 148"></path>
      </g>
      <g class="diagram-nodes">
        <circle cx="350" cy="56" r="22"></circle><circle cx="514" cy="148" r="22"></circle>
        <circle cx="520" cy="354" r="22"></circle><circle cx="350" cy="444" r="22"></circle>
        <circle cx="184" cy="354" r="22"></circle><circle cx="184" cy="148" r="22"></circle>
      </g>
      <g class="diagram-core">
        <rect x="302" y="202" width="96" height="96"></rect>
        <circle cx="350" cy="250" r="17"></circle>
        <path d="M336 250h28M350 236v28"></path>
      </g>
    </svg>
    <div class="diagram-status"><span></span>Approval layer active</div>
  `;
}

function securityVisual() {
  return `
    <div class="diagram-heading"><span>02</span> Defense across every layer</div>
    <svg viewBox="0 0 700 500" aria-hidden="true">
      <g class="security-rings">
        <path d="M350 44L555 162L555 338L350 456L145 338L145 162Z"></path>
        <path d="M350 96L502 184L502 316L350 404L198 316L198 184Z"></path>
        <path d="M350 150L455 210L455 290L350 350L245 290L245 210Z"></path>
        <path d="M350 205L405 236L405 264L350 295L295 264L295 236Z"></path>
      </g>
      <g class="security-signals">
        <path d="M38 118H145"></path><path d="M54 250H198"></path><path d="M38 382H145"></path>
        <circle cx="38" cy="118" r="6"></circle><circle cx="54" cy="250" r="6"></circle><circle cx="38" cy="382" r="6"></circle>
        <path d="M555 162H660"></path><path d="M502 250H646"></path><path d="M555 338H660"></path>
      </g>
      <g class="diagram-core">
        <circle cx="350" cy="250" r="22"></circle>
        <path d="M339 250l8 8 17-20"></path>
      </g>
      <text x="72" y="108">CLOUD</text><text x="72" y="240">WEB</text><text x="72" y="372">NETWORK</text>
      <text x="570" y="152">DETECT</text><text x="540" y="240">CONTROL</text><text x="570" y="328">RESPOND</text>
    </svg>
    <div class="diagram-status"><span></span>Control boundary verified</div>
  `;
}

function financeVisual() {
  return `
    <div class="diagram-heading"><span>03</span> Trusted money movement</div>
    <svg viewBox="0 0 700 500" aria-hidden="true">
      <g class="finance-rail">
        <path d="M90 250H610"></path>
        <path d="M196 250V138H310"></path><path d="M386 250V364H510"></path>
      </g>
      <g class="finance-nodes">
        <rect x="55" y="210" width="92" height="80"></rect>
        <rect x="276" y="98" width="110" height="80"></rect>
        <rect x="276" y="210" width="110" height="80"></rect>
        <rect x="476" y="324" width="126" height="80"></rect>
        <rect x="554" y="210" width="92" height="80"></rect>
      </g>
      <g class="finance-dots">
        <circle cx="196" cy="250" r="8"></circle><circle cx="386" cy="250" r="8"></circle><circle cx="510" cy="364" r="8"></circle>
      </g>
      <text x="76" y="244">WALLET</text><text x="296" y="132">COMPLIANCE</text>
      <text x="306" y="244">LEDGER</text><text x="500" y="358">REMITTANCE</text><text x="574" y="244">PAYOUT</text>
      <text class="finance-currency" x="84" y="269">€</text><text class="finance-currency" x="316" y="269">₦</text><text class="finance-currency" x="583" y="269">$</text>
    </svg>
    <div class="diagram-status"><span></span>Transaction path observable</div>
  `;
}

function renderCapabilitySection(t: Translation) {
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
                    <span class="capability-description">${item.description}</span>
                    <span class="capability-features">${item.features.map((feature) => `<i>${feature}</i>`).join('')}</span>
                  </span>
                  <span class="capability-toggle" aria-hidden="true">${index === 0 ? '−' : '+'}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <div class="capability-visuals" aria-live="polite">
            <div class="capability-panel is-active" data-panel="0">${agenticVisual()}</div>
            <div class="capability-panel" data-panel="1">${securityVisual()}</div>
            <div class="capability-panel" data-panel="2">${financeVisual()}</div>
            <div class="capability-scanline" aria-hidden="true"></div>
          </div>

          <div class="section-progress" aria-hidden="true"><span>01</span><i></i><span>03</span></div>
        </div>
        <div class="capability-triggers" aria-hidden="true">
          <span data-trigger="0"></span><span data-trigger="1"></span><span data-trigger="2"></span>
        </div>
      </div>
    </section>
  `;
}

function renderProcessSection(t: Translation) {
  const marquee = t.process.marquee.map((item) => `<span>${item}</span><i>→</i>`).join('');
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
      <div class="page-shell process-flow">
        ${t.process.steps.map((step, index) => `
          <article class="process-step reveal-on-scroll">
            <div class="process-step-head"><span>0${index + 1}</span><i aria-hidden="true">${index === 4 ? '✓' : '○'}</i></div>
            <div class="process-glyph process-glyph-${index + 1}" aria-hidden="true"><b></b><b></b><b></b><b></b></div>
            <h3>${step.title}</h3>
            <p>${step.description}</p>
            ${index === 2 ? '<em class="approval-gate">Human approval</em>' : ''}
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
          <article class="use-case-card reveal-on-scroll" tabindex="0">
            <span class="use-case-index">0${index + 1}</span>
            <div class="use-case-preview" aria-hidden="true">
              <i></i><i></i><i></i><b></b>
            </div>
            <div>
              <h3>${item.title}</h3>
              <p>${item.description}</p>
            </div>
            <span class="use-case-arrow" aria-hidden="true">↗</span>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function setupCapabilities(element: HTMLElement) {
  capabilityObserver?.disconnect();
  const buttons = Array.from(element.querySelectorAll<HTMLButtonElement>('[data-capability]'));
  const panels = Array.from(element.querySelectorAll<HTMLElement>('[data-panel]'));
  const progress = element.querySelector<HTMLElement>('.section-progress span');

  const setActive = (index: number) => {
    buttons.forEach((button, buttonIndex) => {
      const active = buttonIndex === index;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', String(active));
      const toggle = button.querySelector('.capability-toggle');
      if (toggle) toggle.textContent = active ? '−' : '+';
    });
    panels.forEach((panel, panelIndex) => panel.classList.toggle('is-active', panelIndex === index));
    if (progress) progress.textContent = `0${index + 1}`;
  };

  buttons.forEach((button, index) => button.addEventListener('click', () => setActive(index)));

  const triggers = element.querySelectorAll<HTMLElement>('[data-trigger]');
  capabilityObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.trigger));
    });
  }, { rootMargin: '-42% 0px -42% 0px', threshold: 0 });
  triggers.forEach((trigger) => capabilityObserver?.observe(trigger));
}

export function renderServices(element: HTMLElement, t: Translation) {
  element.innerHTML = `
    ${renderCapabilitySection(t)}
    ${renderCheckerBoundary('dark', 'light')}
    ${renderProcessSection(t)}
    ${renderUseCases(t)}
  `;
  setupCapabilities(element);
}
