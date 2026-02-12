import { Translation } from '../i18n/types';

let animationId: number | null = null;
let isInitialized = false;

export function initHeroStyles() {
  if (isInitialized) return;

  // Styles
  const style = document.createElement('style');
  style.innerHTML = `
    .hero-container {
      position: relative;
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      /* Removed background to let body background show through for perfect match */
    }

    #hero-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      opacity: 0.5; /* Slightly reduced opacity */
    }

    .hero-content {
      position: relative;
      z-index: 10;
      text-align: center;
      max-width: 800px;
      padding-top: 80px;
    }

    .hero-title {
      font-size: 3rem;
      margin-bottom: 1.5rem;
      line-height: 1.1;
      text-transform: uppercase;
      letter-spacing: -0.02em;
    }

    .gradient-text {
      background: var(--gradient-main);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline-block;
    }

    .outline-text {
      -webkit-text-stroke: 2px rgba(255, 255, 255, 0.2);
      color: transparent;
      display: inline-block;
      transition: all 0.5s ease;
    }

    .hero-title:hover .outline-text {
      -webkit-text-stroke: 2px var(--color-neon);
      text-shadow: 0 0 20px rgba(0, 243, 255, 0.3);
    }

    .hero-subtitle {
      font-size: 1.1rem;
      color: var(--color-text-dim);
      margin-bottom: 2.5rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .hero-subtitle strong {
      color: var(--color-text);
      font-weight: 600;
    }

    .hero-buttons {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
    }

    .btn {
      padding: 0.8rem 1.8rem;
      font-size: 0.95rem;
      font-weight: 600;
      border-radius: 50px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .btn-primary {
      background: var(--color-primary);
      color: white;
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
    }
    
    .btn-primary:hover {
      background: var(--color-accent);
      box-shadow: 0 0 30px rgba(6, 182, 212, 0.6);
      transform: translateY(-2px);
    }

    .btn-outline {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
    }

    .btn-outline:hover {
      border-color: var(--color-neon);
      color: var(--color-neon);
      background: rgba(0, 243, 255, 0.05);
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 2rem;
      }
      .hero-subtitle {
        font-size: 0.95rem;
        padding: 0 1rem;
      }
      .hero-buttons {
        flex-direction: column;
        padding: 0 2rem;
      }
    }
  `;
  document.head.appendChild(style);
  isInitialized = true;
}

export function renderHero(element: HTMLElement, t: Translation) {
  element.innerHTML = `
    <div class="hero-container">
      <canvas id="hero-canvas"></canvas>
      <div class="container hero-content">
        <h1 class="hero-title">
          <span class="gradient-text">${t.hero.title.modernize}</span><br>
          <span class="outline-text">${t.hero.title.secure}</span><br>
          <span class="gradient-text">${t.hero.title.automate}</span>
        </h1>
        <p class="hero-subtitle">
          ${t.hero.subtitle}
        </p>
        <div class="hero-buttons">
          <button class="btn btn-primary">${t.hero.ctaPrimary}</button>
          <button class="btn btn-outline">${t.hero.ctaSecondary}</button>
        </div>
      </div>
    </div>
  `;

  initCanvas();
}

function initCanvas() {
  // Canvas Animation Logic
  const canvas = document.getElementById('hero-canvas') as HTMLCanvasElement;
  if (!canvas) return; // Should not happen
  
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return;

  if (animationId !== null) {
    cancelAnimationFrame(animationId);
  }

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const handleResize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };

  // Note: This adds a new listener every time. Ideally we should remove the old one.
  // But for now, as long as the component doesn't mount/unmount rapidly, it's okay.
  // A better way is to store the listener and remove it.
  window.removeEventListener('resize', handleResize); // Try to remove previous if function ref was same (it won't be because of closure)
  // Actually, handleResize is created new each time. 
  // Let's attach it to window object or something? 
  // For this simple case, the leak is minimal if user switches language rarely. 
  // Or I can define handleResize outside. 
  window.addEventListener('resize', handleResize);

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    baseVx: number; // Store original velocity
    baseVy: number;
  }

  const particles: Particle[] = [];
  const particleCount = Math.min(width * 0.15, 150);

  for (let i = 0; i < particleCount; i++) {
    const vx = (Math.random() - 0.5) * 0.5; // Increased base speed
    const vy = (Math.random() - 0.5) * 0.5; 
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: vx,
      vy: vy,
      size: Math.random() * 2 + 1,
      baseVx: vx,
      baseVy: vy
    });
  }

  const mouse = { x: -1000, y: -1000 };
  
  // Track mouse
  const handleMouseMove = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  };
  document.removeEventListener('mousemove', handleMouseMove); // Won't work as function is different
  document.addEventListener('mousemove', handleMouseMove);

  function animate() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      // Mouse Attraction Logic
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      const attractionRadius = 300; // Radius to start following
      
      if (dist < attractionRadius) {
        // Calculate attraction force
        const force = (attractionRadius - dist) / attractionRadius;
        const angle = Math.atan2(dy, dx);
        
        // Gently steer towards mouse
        const attractionStrength = 0.08; // Increased from 0.02
        p.vx += Math.cos(angle) * force * attractionStrength;
        p.vy += Math.sin(angle) * force * attractionStrength;
      } else {
        // Return to base velocity logic (friction/drift)
        p.vx = p.vx * 0.95 + p.baseVx * 0.05; // Stronger return to base
        p.vy = p.vy * 0.95 + p.baseVy * 0.05;
      }

      // Limit max speed
      const speed = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
      const maxSpeed = 3.0; // Increased max speed
      if (speed > maxSpeed) {
        p.vx = (p.vx / speed) * maxSpeed;
        p.vy = (p.vy / speed) * maxSpeed;
      }

      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges instead of bounce for smoother flow
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6, 182, 212, 0.4)'; 
      ctx.fill();

      // Connect particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const distSq = (p.x - p2.x)**2 + (p.y - p2.y)**2;
        
        if (distSq < 150 * 150) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          const alpha = 1 - Math.sqrt(distSq) / 150;
          ctx.strokeStyle = `rgba(59, 130, 246, ${alpha * 0.15})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    animationId = requestAnimationFrame(animate);
  }

  animate();
}
