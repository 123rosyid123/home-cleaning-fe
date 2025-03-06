export interface ServiceInclusion {
  id: number;
  title: string;
  icon: string;
  features: string[];
  image: string;
}

export interface WhyChooseUs {
  title: string;
  cards: {
    icon: string;
    title: string;
    description: string;
    highlight: string;
  }[];
}

export interface FAQ {
  title: string;
  subtitle: string;
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface Footer {
  company: {
    name: string;
    description: string;
  };
  links: {
    label: string;
    href: string;
  }[];
  contact: {
    email: string;
    phone: string;
    address: string[];
  };
  social: {
    facebook: string;
    instagram: string;
    followText: string;
  };
  copyright: string;
}
