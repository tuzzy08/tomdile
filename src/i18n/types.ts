export interface Translation {
  navbar: {
    home: string;
    services: string;
    about: string;
    contact: string;
  };
  hero: {
    title: {
      modernize: string;
      secure: string;
      automate: string;
    };
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  services: {
    title: string;
    infrastructure: {
      title: string;
      description: string;
      items: string[];
    };
    cybersecurity: {
      title: string;
      description: string;
      items: string[];
    };
    ai: {
      title: string;
      description: string;
      items: string[];
    };
  };
  about: {
    badge: string;
    title: string; // Contains HTML but we'll handle it or split it
    lead: string; // Contains HTML
    description: string;
    values: {
      integrity: { title: string; desc: string };
      passion: { title: string; desc: string };
      partnership: { title: string; desc: string };
    };
    stats: {
      experience: string;
      support: string;
      clients: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
    };
    emailLabel: string;
  };
  footer: {
    slogan: string;
    rights: string;
  };
}
