import { Translation } from './types';

export const en: Translation = {
  navbar: {
    home: 'Home',
    services: 'Services',
    about: 'About',
    contact: 'Contact',
  },
  hero: {
    title: {
      modernize: 'Modernize.',
      secure: 'Secure.',
      automate: 'Automate.',
    },
    subtitle: 'Your trusted partner for <strong>IT Infrastructure</strong>, <strong>Cybersecurity</strong>, and <strong>AI Solutions</strong>. We help businesses operate efficiently and scale confidently.',
    ctaPrimary: 'Start Your Transformation',
    ctaSecondary: 'Explore Services',
  },
  services: {
    title: 'Our Expertise',
    infrastructure: {
      title: 'IT Infrastructure',
      description: 'Design, implement, and manage to ensure operational continuity and scalability.',
      items: [
        'Hardware & Data Centers',
        'Cloud & Virtualization',
        'Network Optimization',
        'Proactive Monitoring'
      ]
    },
    cybersecurity: {
      title: 'Cybersecurity',
      description: 'Assess risk, advise on controls, and protect business-critical systems.',
      items: [
        'Threat Detection',
        'Identity Management',
        'Encryption & Firewalls',
        'Regulatory Compliance'
      ]
    },
    ai: {
      title: 'Artificial Intelligence',
      description: 'Unlock data value and automate decisions with responsible AI strategies.',
      items: [
        'Process Automation',
        'AI Customer Support',
        'Predictive Analytics',
        'AIOps Management'
      ]
    }
  },
  about: {
    badge: 'About Tomdile',
    title: 'Your <span class="gradient-text">Trusted Advisor</span> in the Digital Age.',
    lead: 'We don\'t just fix computers; we engineer <strong>resilience</strong> and <strong>growth</strong>.',
    description: 'For over a decade, Tomdile has been the silent engine behind successful small and medium businesses. We bridge the gap between complex enterprise technology and practical business needs, ensuring you stay secure, efficient, and ahead of the curve.',
    values: {
      integrity: {
        title: 'Integrity',
        desc: 'Transparent advice. No hidden costs.'
      },
      passion: {
        title: 'Passion',
        desc: 'Relentless pursuit of excellence.'
      },
      partnership: {
        title: 'Partnership',
        desc: 'Your success is our scorecard.'
      }
    },
    stats: {
      experience: 'Years Experience',
      support: 'Proactive Support',
      clients: 'Client Focus'
    }
  },
  contact: {
    title: 'Start a Conversation',
    subtitle: 'Ready to modernize your business? Let\'s talk.',
    form: {
      name: 'Name',
      email: 'Email Address',
      message: 'How can we help you?',
      submit: 'Send Message'
    },
    emailLabel: 'Email'
  },
  footer: {
    slogan: 'Modern IT Consulting for the future.',
    rights: 'Tomdile. All rights reserved.'
  }
};
