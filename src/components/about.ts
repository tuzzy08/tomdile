import { Translation } from '../i18n/types';

let isInitialized = false;

export function initAboutStyles() {
  if (isInitialized) return;

  const style = document.createElement('style');
  style.innerHTML = `
    /* Background Glow */
    .about-background {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 0% 50%, rgba(59, 130, 246, 0.15), transparent 60%);
      z-index: 0;
      pointer-events: none;
    }

    .relative {
      position: relative;
      z-index: 1;
    }

    .about-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5rem;
      align-items: center;
    }

    /* Text Column Styles */
    .badge {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: rgba(6, 182, 212, 0.1);
      border: 1px solid rgba(6, 182, 212, 0.3);
      border-radius: 50px;
      color: var(--color-accent);
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: 1.5rem;
      letter-spacing: 0.05em;
    }

    .left-align {
      text-align: left;
      margin-bottom: 2rem;
    }

    .lead {
      font-size: 1.25rem;
      color: var(--color-white);
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }
    
    .description {
      color: var(--color-text-dim);
      margin-bottom: 2.5rem;
      line-height: 1.7;
    }

    /* Value Cards */
    .values-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .value-card {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 1.5rem;
      border-radius: 12px;
      transition: transform 0.3s ease, border-color 0.3s ease;
      border-left: 3px solid transparent;
    }

    .value-card:hover {
      transform: translateX(10px);
      border-left-color: var(--color-neon);
      background: rgba(255, 255, 255, 0.07);
    }

    .value-icon {
      font-size: 1.8rem;
    }

    .value-card h4 {
      margin-bottom: 0.25rem;
      color: var(--color-white);
    }

    .value-card p {
      font-size: 0.9rem;
      color: var(--color-text-dim);
      margin: 0;
    }

    /* Visual Column / HUD */
    .about-visual {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .stats-hud {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0;
      background: rgba(10, 10, 15, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 3rem;
      width: 100%;
      max-width: 400px;
      position: relative;
      overflow: hidden;
      backdrop-filter: blur(20px);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    }

    .stat-item {
      text-align: center;
      padding: 1.5rem 0;
    }

    .stat-number {
      display: block;
      font-family: var(--font-heading);
      font-size: 3.5rem;
      font-weight: 700;
      color: var(--color-white);
      text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
      line-height: 1;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-size: 0.85rem;
      color: var(--color-accent);
      font-weight: 600;
    }

    .stat-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      width: 100%;
    }

    /* Decorative Elements */
    .hud-decoration {
      position: absolute;
      width: 20px;
      height: 20px;
      border: 2px solid var(--color-neon);
      transition: all 0.5s ease;
    }

    .top-left {
      top: 10px;
      left: 10px;
      border-right: none;
      border-bottom: none;
    }

    .bottom-right {
      bottom: 10px;
      right: 10px;
      border-left: none;
      border-top: none;
    }

    .stats-hud:hover .hud-decoration {
      width: 100%;
      height: 100%;
      border-color: rgba(6, 182, 212, 0.2);
    }

    .floating-tech-element {
      position: absolute;
      background: var(--gradient-main);
      border-radius: 50%;
      filter: blur(40px);
      z-index: -1;
      opacity: 0.3;
      animation: floatOrbit 8s infinite linear;
    }

    .tech-1 {
      width: 150px;
      height: 150px;
      top: -20px;
      right: -20px;
      background: var(--color-primary);
    }
    
    .tech-2 {
      width: 100px;
      height: 100px;
      bottom: -20px;
      left: -20px;
      background: var(--color-accent);
      animation-delay: -4s;
    }

    @keyframes floatOrbit {
      0% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0, 0) scale(1); }
    }

    @media (max-width: 900px) {
      .about-wrapper {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
      
      .about-visual {
        order: -1; /* Show stats first on mobile? Or keep as is */
      }
      
      .left-align {
        text-align: center;
      }
      
      .badge {
        display: block;
        width: fit-content;
        margin: 0 auto 1.5rem auto;
      }
      
      .lead, .description {
        text-align: center;
      }
    }
  `;
  document.head.appendChild(style);
  isInitialized = true;
}

export function renderAbout(element: HTMLElement, t: Translation) {
  element.innerHTML = `
    <div class="about-background"></div>
    <div class="container section-padding relative">
      <div class="about-wrapper">
        
        <div class="about-text">
          <div class="badge">${t.about.badge}</div>
          <h2 class="section-title left-align">
            ${t.about.title}
          </h2>
          <p class="lead">
            ${t.about.lead}
          </p>
          <p class="description">
            ${t.about.description}
          </p>
          
          <div class="values-list">
            <div class="value-card glass">
              <div class="value-icon">💎</div>
              <div>
                <h4>${t.about.values.integrity.title}</h4>
                <p>${t.about.values.integrity.desc}</p>
              </div>
            </div>
            <div class="value-card glass">
              <div class="value-icon">🔥</div>
              <div>
                <h4>${t.about.values.passion.title}</h4>
                <p>${t.about.values.passion.desc}</p>
              </div>
            </div>
            <div class="value-card glass">
              <div class="value-icon">🤝</div>
              <div>
                <h4>${t.about.values.partnership.title}</h4>
                <p>${t.about.values.partnership.desc}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="about-visual">
          <div class="stats-hud glass">
            <div class="stat-item">
              <span class="stat-number">10+</span>
              <span class="stat-label">${t.about.stats.experience}</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">24/7</span>
              <span class="stat-label">${t.about.stats.support}</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">100%</span>
              <span class="stat-label">${t.about.stats.clients}</span>
            </div>
            
            <div class="hud-decoration top-left"></div>
            <div class="hud-decoration bottom-right"></div>
          </div>
          
          <div class="floating-tech-element tech-1"></div>
          <div class="floating-tech-element tech-2"></div>
        </div>

      </div>
    </div>
  `;
}
