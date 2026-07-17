import { Translation } from '../i18n/types';

export function initAboutStyles() {}

const proofIcons = [
  '<circle cx="24" cy="24" r="14"></circle><path d="M18 24h12M24 18v12"></path>',
  '<path d="M6 24s7-11 18-11 18 11 18 11-7 11-18 11S6 24 6 24Z"></path><circle cx="24" cy="24" r="5"></circle>',
  '<path d="M24 5 39 11v11c0 10-6 17-15 21C15 39 9 32 9 22V11Z"></path><path d="m17 24 5 5 10-12"></path>',
  '<path d="m24 5 15 9v20l-15 9-15-9V14Z"></path><path d="m9 14 15 9 15-9M24 23v20"></path>',
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
      <div class="page-shell delivery-steps">
        ${t.delivery.steps.map((step, index) => `
          <article class="delivery-step reveal-on-scroll">
            <div class="delivery-index"><span>0${index + 1}</span><i></i></div>
            <h3>${step.title}</h3>
            <p>${step.description}</p>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}
