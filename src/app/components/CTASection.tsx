import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-blue-800"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-8">Ready for a Spotless Home?</h2>
          <p className="text-xl mb-12">
            Book your professional cleaning service today and join thousands of satisfied customers across Singapore
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="btn btn-lg bg-white text-primary hover:bg-gray-100 border-none px-12 group"
            >
              Book Now
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
            <a
              href="tel:+6591234567"
              className="btn btn-lg btn-ghost border-2 border-white hover:bg-white hover:text-primary transition-colors duration-300 px-12"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 