import './style.css';
import { initNavbar, renderNavbar } from './components/navbar';
import { initHeroStyles, renderHero } from './components/hero';
import { initServicesStyles, renderServices } from './components/services';
import { initAboutStyles, renderAbout } from './components/about';
import { initContactStyles, renderContact } from './components/contact';
import { initFooterStyles, renderFooter } from './components/footer';
import { I18nService } from './i18n';

// 1. Setup global layout (empty containers)
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header id="navbar"></header>
  <main>
    <section id="hero"></section>
    <section id="services"></section>
    <section id="about"></section>
    <section id="contact"></section>
  </main>
  <footer id="footer"></footer>
`;

// 2. Get Container Elements
const navbarEl = document.querySelector<HTMLElement>('#navbar')!;
const heroEl = document.querySelector<HTMLElement>('#hero')!;
const servicesEl = document.querySelector<HTMLElement>('#services')!;
const aboutEl = document.querySelector<HTMLElement>('#about')!;
const contactEl = document.querySelector<HTMLElement>('#contact')!;
const footerEl = document.querySelector<HTMLElement>('#footer')!;

// 3. Initialize Styles (Run once)
initNavbar(navbarEl);
initHeroStyles(); // Hero now exports initHeroStyles
initServicesStyles();
initAboutStyles();
initContactStyles();
initFooterStyles();

// 4. Initialize I18n and Render
import { EmailService } from './services/email';

const i18n = I18nService.getInstance();
EmailService.init();

i18n.subscribe((lang, t) => {
  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // Render components with current translations
  renderNavbar(navbarEl, t, lang);
  renderHero(heroEl, t);
  renderServices(servicesEl, t);
  renderAbout(aboutEl, t);
  renderContact(contactEl, t);
  renderFooter(footerEl, t);
});


// 5. Intersection Observer for scroll animations
const observerOptions = {
  root: null,
  rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle of viewport
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 1. Animate section (keep existing logic)
      entry.target.classList.add('active');

      // 2. Update Navbar Link
      const id = entry.target.getAttribute('id');
      if (id) {
        // Query freshly rendered links
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});
