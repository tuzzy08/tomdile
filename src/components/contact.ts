import { Translation } from '../i18n/types';
import { EmailService } from '../services/email';

let isInitialized = false;

export function initContactStyles() {
  if (isInitialized) return;

  const style = document.createElement('style');
  style.innerHTML = `
    .contact-box {
      max-width: 600px;
      margin: 0 auto;
      padding: 3rem;
      border-radius: 20px;
      text-align: center;
      animation: fadeInUp 0.8s ease-out;
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .contact-subtitle {
      margin-bottom: 2rem;
      color: var(--color-text-dim);
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .form-group {
      position: relative;
      transition: transform 0.3s ease;
    }
    
    .form-group:focus-within {
      transform: scale(1.02);
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 1rem;
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      color: white;
      font-family: var(--font-body);
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: var(--color-neon);
      background: rgba(0, 243, 255, 0.05);
      box-shadow: 0 0 15px rgba(0, 243, 255, 0.2);
    }

    .self-center {
      align-self: center;
      padding: 1rem 3rem;
      border-radius: 50px;
      background: var(--gradient-main);
      color: white;
      font-weight: 600;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .self-center:hover:not(:disabled) {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(6, 182, 212, 0.4);
    }
    
    .self-center:active:not(:disabled) {
      transform: translateY(-1px);
    }

    .self-center:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      filter: grayscale(1);
    }

    .message-status {
      margin-top: 1rem;
      font-size: 0.9rem;
      min-height: 1.5em; /* Prevent layout shift */
    }

    .message-status.success {
      color: var(--color-neon);
    }

    .message-status.error {
      color: #ff4d4d;
    }

    .contact-info {
      margin-top: 2rem;
      font-size: 0.9rem;
      color: var(--color-text-dim);
      opacity: 0;
      animation: fadeIn 1s ease-out 0.5s forwards;
    }
    
    @keyframes fadeIn {
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  isInitialized = true;
}

export function renderContact(element: HTMLElement, t: Translation) {
  element.innerHTML = `
    <div class="container section-padding">
      <div class="contact-box glass">
        <h2 class="section-title">${t.contact.title}</h2>
        <p class="contact-subtitle">${t.contact.subtitle}</p>
        
        <form class="contact-form" id="contact-form">
          <div class="form-group">
            <input type="text" name="user_name" placeholder="${t.contact.form.name}" required />
          </div>
          <div class="form-group">
            <input type="email" name="user_email" placeholder="${t.contact.form.email}" required />
          </div>
          <div class="form-group">
            <textarea name="message" rows="5" placeholder="${t.contact.form.message}" required></textarea>
          </div>
          <button type="submit" class="self-center btn-primary" id="submit-btn">${t.contact.form.submit}</button>
          <div class="message-status" id="message-status"></div>
        </form>

        <div class="contact-info">
          <p>${t.contact.emailLabel}: <a href="mailto:contact@tomdile.com">contact@tomdile.com</a></p>
        </div>
      </div>
    </div>
  `;

  const form = element.querySelector('#contact-form') as HTMLFormElement;
  const submitBtn = element.querySelector('#submit-btn') as HTMLButtonElement;
  const statusDiv = element.querySelector('#message-status') as HTMLElement;

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      statusDiv.textContent = '';
      statusDiv.className = 'message-status';

      const result = await EmailService.sendEmail(form);

      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;

      if (result.success) {
        statusDiv.textContent = 'Message sent successfully!';
        statusDiv.classList.add('success');
        form.reset();
      } else {
        statusDiv.textContent = 'Failed to send message. Please try again.';
        statusDiv.classList.add('error');
      }
    });
  }
}
