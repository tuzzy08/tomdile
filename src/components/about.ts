import { Translation } from '../i18n/types';

export function initAboutStyles() {}

const proofIcons = [
  // Human approval gate: person + confirmation
  '<circle cx="18" cy="16" r="6"></circle><path d="M7 38c0-7 5-12 11-12s11 5 11 12"></path><rect class="pi-accent" x="28" y="24" width="15" height="15" rx="4"></rect><path class="pi-dark" d="m31.5 31.5 2.6 2.6 5-5.2"></path>',
  // Observable: trace waveform across a frame
  '<rect x="5" y="9" width="38" height="30" rx="6"></rect><path d="M10 27h6l3-8 5 14 4-10 3 4h7"></path><circle class="pi-accent" cx="38" cy="27" r="2.6"></circle>',
  // Security by design: shield with keyhole
  '<path d="M24 5 39 11v11c0 10-6 17-15 21C15 39 9 32 9 22V11Z"></path><circle class="pi-accent" cx="24" cy="21" r="4"></circle><path d="M24 25v6"></path>',
  // Resilient: redundant nodes with failover
  '<rect x="6" y="8" width="14" height="14" rx="4"></rect><rect x="28" y="8" width="14" height="14" rx="4"></rect><rect class="pi-accent" x="17" y="28" width="14" height="14" rx="4"></rect><path d="M13 22v3h11v3M35 22v3H24"></path>',
];

export function renderAbout(element: HTMLElement, t: Translation) {
  element.innerHTML = `
    <section id="company" class="proof-section section-dark" data-section-root="company">
      <div class="page-shell proof-intro">
        <p class="section-kicker">${t.proof.kicker}</p>
        <h2>${t.proof.title}</h2>
        <p>${t.proof.description}</p>
      </div>
      <div class="page-shell proof-grid">
        ${t.proof.points.map((point, index) => `
          <article class="proof-item reveal-on-scroll">
            <div class="proof-icon" aria-hidden="true"><svg viewBox="0 0 48 48">${proofIcons[index]}</svg></div>
            <span>0${index + 1}</span>
            <h3>${point.title}</h3>
            <p>${point.description}</p>
          </article>
        `).join('')}
      </div>
    </section>

    <section class="delivery-section section-light" data-section-root="company">
      <div class="page-shell delivery-heading">
        <p class="section-kicker">${t.delivery.kicker}</p>
        <h2>${t.delivery.title}</h2>
      </div>
      <div class="page-shell delivery-steps reveal-on-scroll">
        <div class="delivery-track" aria-hidden="true"><i></i></div>
        ${t.delivery.steps.map((step, index) => `
          <article class="delivery-step" style="--i:${index}">
            <div class="delivery-index"><span class="delivery-node"></span><span>0${index + 1}</span></div>
            <h3>${step.title}</h3>
            <p>${step.description}</p>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}
