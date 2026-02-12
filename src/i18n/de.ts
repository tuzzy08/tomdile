import { Translation } from './types';

export const de: Translation = {
  navbar: {
    home: 'Startseite',
    services: 'Leistungen',
    about: 'Über uns',
    contact: 'Kontakt',
  },
  hero: {
    title: {
      modernize: 'Modernisieren.',
      secure: 'Sichern.',
      automate: 'Automatisieren.',
    },
    subtitle: 'Ihr vertrauenswürdiger Partner für <strong>IT-Infrastruktur</strong>, <strong>Cybersicherheit</strong> und <strong>KI-Lösungen</strong>. Wir helfen Unternehmen, effizient zu arbeiten und sicher zu skalieren.',
    ctaPrimary: 'Transformation starten',
    ctaSecondary: 'Leistungen erkunden',
  },
  services: {
    title: 'Unsere Kompetenz',
    infrastructure: {
      title: 'IT-Infrastruktur',
      description: 'Design, Implementierung und Management für operative Kontinuität und Skalierbarkeit.',
      items: [
        'Hardware & Rechenzentren',
        'Cloud & Virtualisierung',
        'Netzwerkoptimierung',
        'Proaktive Überwachung'
      ]
    },
    cybersecurity: {
      title: 'Cybersicherheit',
      description: 'Risikobewertung, Beratung und Schutz geschäftskritischer Systeme.',
      items: [
        'Bedrohungserkennung',
        'Identitätsmanagement',
        'Verschlüsselung & Firewalls',
        'Regulatorische Compliance'
      ]
    },
    ai: {
      title: 'Künstliche Intelligenz',
      description: 'Datenwert erschließen und Entscheidungen mit verantwortungsvollen KI-Strategien automatisieren.',
      items: [
        'Prozessautomatisierung',
        'KI-Kundensupport',
        'Prädiktive Analysen',
        'AIOps-Management'
      ]
    }
  },
  about: {
    badge: 'Über Tomdile',
    title: 'Ihr <span class="gradient-text">Vertrauenswürdiger Berater</span> im digitalen Zeitalter.',
    lead: 'Wir reparieren nicht nur Computer; wir entwickeln <strong>Resilienz</strong> und <strong>Wachstum</strong>.',
    description: 'Seit über einem Jahrzehnt ist Tomdile der stille Motor hinter erfolgreichen kleinen und mittleren Unternehmen. Wir schließen die Lücke zwischen komplexer Unternehmenstechnologie und praktischen Geschäftsanforderungen, damit Sie sicher, effizient und der Konkurrenz voraus bleiben.',
    values: {
      integrity: {
        title: 'Integrität',
        desc: 'Transparente Beratung. Keine versteckten Kosten.'
      },
      passion: {
        title: 'Leidenschaft',
        desc: 'Unermüdliches Streben nach Exzellenz.'
      },
      partnership: {
        title: 'Partnerschaft',
        desc: 'Ihr Erfolg ist unser Maßstab.'
      }
    },
    stats: {
      experience: 'Jahre Erfahrung',
      support: 'Proaktiver Support',
      clients: 'Kundenfokus'
    }
  },
  contact: {
    title: 'Gespräch beginnen',
    subtitle: 'Bereit, Ihr Unternehmen zu modernisieren? Lassen Sie uns reden.',
    form: {
      name: 'Name',
      email: 'E-Mail-Adresse',
      message: 'Wie können wir Ihnen helfen?',
      submit: 'Nachricht senden'
    },
    emailLabel: 'E-Mail'
  },
  footer: {
    slogan: 'Moderne IT-Beratung für die Zukunft.',
    rights: 'Tomdile. Alle Rechte vorbehalten.'
  }
};
