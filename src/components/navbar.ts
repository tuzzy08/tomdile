import { Translation } from '../i18n/types';
import { I18nService } from '../i18n';

let initialized = false;

export function initNavbar(element: HTMLElement) {
  if (initialized) return;

  element.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const languageButton = target.closest<HTMLButtonElement>('[data-lang]');
    const menuButton = target.closest<HTMLButtonElement>('[data-menu-toggle]');
    const navLink = target.closest<HTMLAnchorElement>('a[href^="#"]');

    if (languageButton?.dataset.lang) {
      I18nService.getInstance().setLanguage(languageButton.dataset.lang as 'en' | 'de');
    }

    if (menuButton) {
      const nav = element.querySelector<HTMLElement>('.site-nav');
      const isOpen = nav?.classList.toggle('is-open') ?? false;
      menuButton.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('menu-open', isOpen);
    }

    if (navLink) {
      const nav = element.querySelector<HTMLElement>('.site-nav');
      nav?.classList.remove('is-open');
      element.querySelector('[data-menu-toggle]')?.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }
  });

  window.addEventListener('scroll', () => {
    element.classList.toggle('is-scrolled', window.scrollY > 24);
  }, { passive: true });

  initialized = true;
}

export function renderNavbar(element: HTMLElement, t: Translation, currentLang: string) {
  element.innerHTML = `
    <nav class="site-nav" aria-label="Primary navigation">
      <a class="brand" href="#hero" aria-label="Letombor home">
        <span class="brand-mark" aria-hidden="true"><i></i><i></i></span>
        <span>Letombor.</span>
      </a>

      <button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-label="${t.navbar.menu}">
        <span></span><span></span>
      </button>

      <div class="nav-panel">
        <div class="nav-links">
          <a href="#capabilities" data-section="capabilities">${t.navbar.capabilities}</a>
          <a href="#work" data-section="work">${t.navbar.work}</a>
          <a href="#company" data-section="company">${t.navbar.company}</a>
        </div>

        <div class="nav-actions">
          <div class="language-switcher" aria-label="Language">
            <button type="button" data-lang="en" class="${currentLang === 'en' ? 'is-active' : ''}" aria-pressed="${currentLang === 'en'}">EN</button>
            <span>/</span>
            <button type="button" data-lang="de" class="${currentLang === 'de' ? 'is-active' : ''}" aria-pressed="${currentLang === 'de'}">DE</button>
          </div>
          <a class="button button-accent nav-cta" href="#contact">${t.navbar.contact}<span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </nav>
  `;
}
