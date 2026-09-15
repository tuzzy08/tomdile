import { Translation } from '../i18n/types';

export function initFooterStyles() {}

export function renderFooter(element: HTMLElement, t: Translation) {
  element.innerHTML = `
    <div class="page-shell footer-main">
      <div class="footer-brand">
        <a class="brand" href="#hero" aria-label="Letombor home">
          <span class="brand-mark" aria-hidden="true"><i></i><i></i></span>
          <span>Letombor.</span>
        </a>
        <p>${t.footer.slogan}</p>
        <div class="footer-status"><span></span>${t.footer.status}</div>
      </div>

      <div class="footer-column">
        <h2>${t.footer.capabilities}</h2>
        ${t.footer.capabilityLinks.map((link) => `<a href="#capabilities">${link}</a>`).join('')}
      </div>

      <div class="footer-column">
        <h2>${t.footer.company}</h2>
        <a href="#work">${t.footer.companyLinks[0]}</a>
        <a href="#company">${t.footer.companyLinks[1]}</a>
        <a href="#contact">${t.footer.companyLinks[2]}</a>
      </div>

      <div class="footer-column">
        <h2>${t.footer.connect}</h2>
        <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
        <a href="mailto:contact@letombor.com">contact@letombor.com</a>
      </div>
    </div>

    <div class="page-shell footer-utility">
      <div><span>EN / DE</span><a href="#">${t.footer.privacy}</a><a href="#">${t.footer.terms}</a></div>
      <p>© ${new Date().getFullYear()} ${t.footer.rights}</p>
      <div class="footer-stream" aria-hidden="true">AGT.01 · TASK.RSK.07 · PAY.03 · SEC.ACTIVE · AGT.05 · FLOW.12</div>
    </div>

    <div class="footer-wordmark" aria-hidden="true">Letombor.</div>
  `;
}
