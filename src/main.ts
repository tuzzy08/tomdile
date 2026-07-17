import './style.css';
import { initNavbar, renderNavbar } from './components/navbar';
import { renderHero } from './components/hero';
import { renderServices } from './components/services';
import { renderAbout } from './components/about';
import { renderContact } from './components/contact';
import { renderFooter } from './components/footer';
import { I18nService } from './i18n';
import { EmailService } from './services/email';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <a class="skip-link" href="#main-content">Skip to content</a>
  <header id="navbar"></header>
  <main id="main-content">
    <section id="hero" class="hero-section" data-section-root="hero"></section>
    <div id="services-root"></div>
    <div id="about-root"></div>
    <div id="contact-root"></div>
  </main>
  <footer id="footer"></footer>
`;

const navbarElement = document.querySelector<HTMLElement>('#navbar')!;
const heroElement = document.querySelector<HTMLElement>('#hero')!;
const servicesElement = document.querySelector<HTMLElement>('#services-root')!;
const aboutElement = document.querySelector<HTMLElement>('#about-root')!;
const contactElement = document.querySelector<HTMLElement>('#contact-root')!;
const footerElement = document.querySelector<HTMLElement>('#footer')!;

initNavbar(navbarElement);
EmailService.init();

let revealObserver: IntersectionObserver | null = null;
let sectionObserver: IntersectionObserver | null = null;

function initializePageMotion() {
  revealObserver?.disconnect();
  sectionObserver?.disconnect();

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = document.querySelectorAll<HTMLElement>('.reveal-on-scroll');

  if (reduceMotion) {
    revealElements.forEach((item) => item.classList.add('is-visible'));
  } else {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    revealElements.forEach((item) => revealObserver?.observe(item));
  }

  const sections = document.querySelectorAll<HTMLElement>('[data-section-root]');
  sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const sectionName = (entry.target as HTMLElement).dataset.sectionRoot;
      document.querySelectorAll<HTMLAnchorElement>('.nav-links a').forEach((link) => {
        link.classList.toggle('is-active', link.dataset.section === sectionName);
      });
    });
  }, { rootMargin: '-48% 0px -48% 0px', threshold: 0 });
  sections.forEach((section) => sectionObserver?.observe(section));
}

const i18n = I18nService.getInstance();
i18n.subscribe((language, translation) => {
  document.documentElement.lang = language;
  renderNavbar(navbarElement, translation, language);
  renderHero(heroElement, translation);
  renderServices(servicesElement, translation);
  renderAbout(aboutElement, translation);
  renderContact(contactElement, translation);
  renderFooter(footerElement, translation);
  initializePageMotion();
});
