export interface Translation {
  navbar: {
    capabilities: string;
    work: string;
    company: string;
    contact: string;
    menu: string;
    close: string;
  };
  hero: {
    eyebrow: string;
    title: string[];
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    status: string[];
  };
  capabilities: {
    kicker: string;
    title: string;
    items: Array<{
      title: string;
      description: string;
      features: string[];
    }>;
  };
  process: {
    kicker: string;
    title: string;
    description: string;
    marquee: string[];
    steps: Array<{ title: string; description: string }>;
  };
  useCases: {
    kicker: string;
    title: string;
    items: Array<{ title: string; description: string }>;
  };
  proof: {
    kicker: string;
    title: string;
    description: string;
    points: Array<{ title: string; description: string }>;
  };
  delivery: {
    kicker: string;
    title: string;
    steps: Array<{ title: string; description: string }>;
  };
  contact: {
    kicker: string;
    title: string;
    subtitle: string;
    cta: string;
    secondaryCta: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
    };
  };
  footer: {
    slogan: string;
    capabilities: string;
    company: string;
    connect: string;
    capabilityLinks: string[];
    companyLinks: string[];
    status: string;
    privacy: string;
    terms: string;
    rights: string;
  };
}
