import emailjs from '@emailjs/browser';

export const EmailService = {
  init: () => {
    emailjs.init({
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    });
  },

  sendEmail: async (form: HTMLFormElement) => {
    try {
      const result = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form
      );
      return { success: true, text: result.text };
    } catch (error) {
      console.error('EmailJS Error:', error);
      return { success: false, error };
    }
  }
};
