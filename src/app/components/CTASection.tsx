'use client';

import Link from 'next/link';

// Content object containing all text
const content = {
  title: "Ready for a Spotless Home?",
  description: "Book your professional cleaning service today and join thousands of satisfied customers across Singapore",
  cta: {
    primary: {
      text: "Book Now",
      href: "/booking"
    },
    secondary: {
      text: "Call Us",
      href: "tel:+6531581508"
    }
  }
};

export default function CTASection() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-800 to-blue-900">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-800/80 to-blue-900/90"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=3540&auto=format')] bg-cover bg-center opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-8">{content.title}</h2>
          <p className="text-xl mb-12">
            {content.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={content.cta.primary.href}
              className="btn btn-lg bg-white text-primary hover:bg-gray-100 border-none px-12 group"
            >
              {content.cta.primary.text}
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
            <a
              href={content.cta.secondary.href}
              className="btn btn-lg btn-ghost border-2 border-white hover:bg-white hover:text-primary transition-colors duration-300 px-12"
            >
              {content.cta.secondary.text}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}