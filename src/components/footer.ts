import { Translation } from '../i18n/types';

let isInitialized = false;

export function initFooterStyles() {
  if (isInitialized) return;

  const style = document.createElement('style');
  style.innerHTML = `
    #footer {
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      padding: 3rem 0;
      margin-top: 4rem;
      background: #020203;
    }

    .footer-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      text-align: center;
    }

    .footer-brand h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    .footer-brand .dot {
      color: var(--color-neon);
    }

    .footer-brand p {
      color: var(--color-text-dim);
      font-size: 0.9rem;
    }

    .footer-links {
      display: flex;
      gap: 2rem;
    }

    .footer-links a {
      color: var(--color-text-dim);
      font-size: 0.9rem;
    }

    .footer-links a:hover {
      color: var(--color-neon);
    }

    .footer-copy {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.2);
    }
  `;
  document.head.appendChild(style);
  isInitialized = true;
}

export function renderFooter(element: HTMLElement, t: Translation) {
  element.innerHTML = `
    <div class="container footer-content">
      <div class="footer-brand">
        <h3>Tomdile<span class="dot">.</span></h3>
        <p>${t.footer.slogan}</p>
      </div>
      <div class="footer-links">
        <a href="#hero">${t.navbar.home}</a>
        <a href="#services">${t.navbar.services}</a>
        <a href="#contact">${t.navbar.contact}</a>
      </div>
      <div class="footer-copy">
        &copy; ${new Date().getFullYear()} ${t.footer.rights}
      </div>
    </div>
  `;
}
