import '../style.css';
import { Translation } from '../i18n/types';
import { I18nService } from '../i18n';

let isInitialized = false;

export function initNavbar(element: HTMLElement) {
  if (isInitialized) return;
  
  // Add styles specific to Navbar
  const style = document.createElement('style');
  style.innerHTML = `
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1000;
      padding: 1rem 0;
      transition: padding 0.3s ease, background 0.3s ease;
    }
    
    .nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-family: var(--font-heading);
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .logo .dot {
      color: var(--color-neon);
    }

    .nav-links {
      display: flex;
      gap: 2rem;
      list-style: none;
      align-items: center;
    }

    .nav-links a {
      font-size: 0.95rem;
      color: var(--color-text-dim);
      font-weight: 500;
      position: relative;
    }

    .nav-links a:hover, .nav-links a.active {
      color: var(--color-neon);
    }

    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--color-neon);
      transition: width 0.3s ease;
    }

    .nav-links a:hover::after, .nav-links a.active::after {
      width: 100%;
    }

    .lang-switch {
      display: flex;
      gap: 0.5rem;
      margin-left: 1rem;
      border-left: 1px solid rgba(255, 255, 255, 0.2);
      padding-left: 1rem;
    }

    .lang-btn {
      background: none;
      border: none;
      color: var(--color-text-dim);
      font-size: 0.85rem;
      cursor: pointer;
      font-weight: 600;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      transition: all 0.2s;
    }

    .lang-btn:hover {
      color: var(--color-white);
    }

    .lang-btn.active {
      color: var(--color-primary);
      background: rgba(59, 130, 246, 0.1);
    }

    .mobile-toggle {
      display: none;
      flex-direction: column;
      gap: 6px;
      cursor: pointer;
    }

    .mobile-toggle span {
      width: 25px;
      height: 2px;
      background: var(--color-text);
      transition: 0.3s;
    }

    @media (max-width: 768px) {
      .nav-links {
        display: none; /* Implement toggle logic later if needed */
      }
      .mobile-toggle {
        display: flex;
      }
    }
  `;
  document.head.appendChild(style);

  // Scroll effect
  window.addEventListener('scroll', () => {
    const nav = element.querySelector('.navbar');
    if (window.scrollY > 50) {
      nav?.classList.add('scrolled');
      // @ts-ignore
      nav!.style.padding = '0.8rem 0';
      // @ts-ignore
      nav!.style.background = 'rgba(5, 5, 8, 0.8)';
    } else {
      nav?.classList.remove('scrolled');
      // @ts-ignore
      nav!.style.padding = '1.5rem 0';
      // @ts-ignore
      nav!.style.background = 'rgba(255, 255, 255, 0.03)';
    }
  });

  // Event Delegation for Language Switcher
  element.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('lang-btn')) {
      const lang = target.getAttribute('data-lang');
      if (lang) {
        I18nService.getInstance().setLanguage(lang as 'en' | 'de');
      }
    }
  });

  // Event Delegation for Smooth Scroll
  element.addEventListener('click', function (e) {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
          e.preventDefault();
          const targetId = target.getAttribute('href');
          const targetElement = document.querySelector(targetId!);
          
          if (targetElement) {
              const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
              const startPosition = window.pageYOffset;
              const distance = targetPosition - startPosition;
              const duration = 1500;
              let start: number | null = null;
      
              function animation(currentTime: number) {
              if (start === null) start = currentTime;
              const timeElapsed = currentTime - start;
              const rub = easeInOutQuad(timeElapsed, startPosition, distance, duration);
              window.scrollTo(0, rub);
              if (timeElapsed < duration) requestAnimationFrame(animation);
              }
      
              function easeInOutQuad(t: number, b: number, c: number, d: number) {
              t /= d / 2;
              if (t < 1) return c / 2 * t * t + b;
              t--;
              return -c / 2 * (t * (t - 2) - 1) + b;
              }
      
              requestAnimationFrame(animation);
          }
      }
  });

  isInitialized = true;
}

export function renderNavbar(element: HTMLElement, t: Translation, currentLang: string) {
  element.innerHTML = `
    <nav class="navbar glass">
      <div class="container nav-container">
        <div class="logo">Tomdile<span class="dot">.</span></div>
        <ul class="nav-links">
          <li><a href="#hero" class="active">${t.navbar.home}</a></li>
          <li><a href="#services">${t.navbar.services}</a></li>
          <li><a href="#about">${t.navbar.about}</a></li>
          <li><a href="#contact">${t.navbar.contact}</a></li>
          <li class="lang-switch">
            <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
            <button class="lang-btn ${currentLang === 'de' ? 'active' : ''}" data-lang="de">DE</button>
          </li>
        </ul>
        <div class="mobile-toggle">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  `;
}
