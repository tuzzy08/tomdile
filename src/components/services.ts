import { Translation } from '../i18n/types';

let isInitialized = false;

export function initServicesStyles() {
  if (isInitialized) return;

  const style = document.createElement('style');
  style.innerHTML = `
    .section-title {
      font-size: 2.5rem;
      text-align: center;
      margin-bottom: 3rem;
      background: var(--gradient-main);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
    }

    .service-card {
      padding: 2.5rem;
      border-radius: 16px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .service-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 10px 30px rgba(0, 243, 255, 0.1);
      border-color: var(--color-neon);
    }

    .service-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: var(--gradient-main);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.4s ease;
    }

    .service-card:hover::before {
      transform: scaleX(1);
    }

    .icon-box {
      font-size: 3rem;
      margin-bottom: 1.5rem;
      display: inline-block;
      transition: transform 0.3s ease;
      animation: float 6s ease-in-out infinite;
    }

    .service-card:hover .icon-box {
      transform: scale(1.2) rotate(5deg);
      animation-play-state: paused;
    }

    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }

    .service-card h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: var(--color-white);
    }

    .service-card p {
      color: var(--color-text-dim);
      margin-bottom: 1.5rem;
      font-size: 0.95rem;
    }

    .service-list {
      list-style: none;
      padding: 0;
    }

    .service-list li {
      color: var(--color-text);
      padding: 0.5rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      font-size: 0.9rem;
      display: flex;
      align-items: center;
    }

    .service-list li::before {
      content: '▹';
      color: var(--color-neon);
      margin-right: 10px;
    }
  `;
  document.head.appendChild(style);
  isInitialized = true;
}

export function renderServices(element: HTMLElement, t: Translation) {
  element.innerHTML = `
    <div class="container section-padding">
      <h2 class="section-title">${t.services.title}</h2>
      <div class="services-grid">
        
        <!-- Infrastructure -->
        <div class="service-card glass">
          <div class="icon-box">⚡</div>
          <h3>${t.services.infrastructure.title}</h3>
          <p>${t.services.infrastructure.description}</p>
          <ul class="service-list">
            ${t.services.infrastructure.items.map(item => `<li>${item}</li>`).join('')}
          </ul> 
        </div>

        <!-- Cybersecurity -->
        <div class="service-card glass">
          <div class="icon-box">🛡️</div>
          <h3>${t.services.cybersecurity.title}</h3>
          <p>${t.services.cybersecurity.description}</p>
           <ul class="service-list">
            ${t.services.cybersecurity.items.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>

        <!-- AI -->
        <div class="service-card glass">
          <div class="icon-box">🤖</div>
          <h3>${t.services.ai.title}</h3>
          <p>${t.services.ai.description}</p>
           <ul class="service-list">
            ${t.services.ai.items.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>

      </div>
    </div>
  `;
}
