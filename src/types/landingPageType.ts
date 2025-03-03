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