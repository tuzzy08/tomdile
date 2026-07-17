import { Translation } from '../i18n/types';
import { EmailService } from '../services/email';
import { renderCheckerBoundary } from './checker-boundary';

export function initContactStyles() {}

export function renderContact(element: HTMLElement, t: Translation) {
  element.innerHTML = `
    <section id="contact" class="contact-section" data-section-root="contact">
      <div class="page-shell contact-grid">
        <div class="contact-copy">
          <p class="section-kicker">${t.contact.kicker}</p>
          <h2>${t.contact.title}</h2>
          <p>${t.contact.subtitle}</p>
          <div class="contact-direct">
            <span>${t.contact.secondaryCta}</span>
            <a href="mailto:contact@tomdile.com">contact@tomdile.com <i aria-hidden="true">↗</i></a>
          </div>
        </div>

        <form class="contact-form" id="contact-form" novalidate>
          <label>
            <span>01 / ${t.contact.form.name}</span>
            <input type="text" name="user_name" autocomplete="name" required />
          </label>
          <label>
            <span>02 / ${t.contact.form.email}</span>
            <input type="email" name="user_email" autocomplete="email" required />
          </label>
          <label class="form-message">
            <span>03 / ${t.contact.form.message}</span>
            <textarea name="message" rows="3" required></textarea>
          </label>
          <div class="form-footer">
            <p class="message-status" id="message-status" role="status" aria-live="polite"></p>
            <button class="button button-dark" type="submit" id="submit-btn">${t.contact.form.submit}<span aria-hidden="true">→</span></button>
          </div>
        </form>
      </div>
    </section>
    ${renderCheckerBoundary('lime', 'dark')}
  `;

  const form = element.querySelector<HTMLFormElement>('#contact-form');
  const submitButton = element.querySelector<HTMLButtonElement>('#submit-btn');
  const status = element.querySelector<HTMLElement>('#message-status');

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity() || !submitButton || !status) return;

    submitButton.disabled = true;
    submitButton.innerHTML = `${t.contact.form.sending}<span aria-hidden="true">→</span>`;
    status.textContent = '';
    status.className = 'message-status';

    const result = await EmailService.sendEmail(form);
    submitButton.disabled = false;
    submitButton.innerHTML = `${t.contact.form.submit}<span aria-hidden="true">→</span>`;

    if (result.success) {
      status.textContent = t.contact.form.success;
      status.classList.add('is-success');
      form.reset();
    } else {
      status.textContent = t.contact.form.error;
      status.classList.add('is-error');
    }
  });
}
