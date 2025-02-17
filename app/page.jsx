import Link from 'next/link';
import { FaRegClock, FaRegStar, FaShieldAlt } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="hero min-h-screen relative" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80)' }}>
        <div className="hero-overlay bg-opacity-60 bg-gradient-to-b from-black/40 to-black/70"></div>
        <div className="hero-content text-center text-neutral-content z-10">
          <div className="max-w-xl">
            <h1 className="mb-8 text-6xl font-bold text-white animate-fade-in-down">
              Professional Home Cleaning
            </h1>
            <p className="mb-8 text-lg text-gray-200 leading-relaxed animate-fade-in-up">
              Transform your space into a pristine sanctuary with our expert cleaning service. 
              Experience the luxury of coming home to spotless perfection.
            </p>
            <div className="flex gap-4 justify-center animate-fade-in">
              <Link 
                href="/booking" 
                className="btn btn-primary btn-lg hover:scale-105 transition-transform duration-300 px-8"
              >
                Book Now
              </Link>
              <Link 
                href="/services" 
                className="btn btn-ghost btn-lg border-2 border-white hover:bg-white hover:text-black transition-colors duration-300 px-8"
              >
                Our Services
              </Link>
            </div>
            <div className="mt-16 grid grid-cols-3 gap-8 p-6 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-primary">500+</h3>
                <p className="text-sm text-gray-300 mt-2">Happy Clients</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-primary">4.9/5</h3>
                <p className="text-sm text-gray-300 mt-2">Client Rating</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-primary">100%</h3>
                <p className="text-sm text-gray-300 mt-2">Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <FaRegClock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="card-title text-xl mb-2">Reliable & Punctual</h3>
                <p className="text-base-content/70">We value your time and always arrive as scheduled</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <FaRegStar className="w-8 h-8 text-primary" />
                </div>
                <h3 className="card-title text-xl mb-2">Professional Service</h3>
                <p className="text-base-content/70">Experienced and trained cleaning experts</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <FaShieldAlt className="w-8 h-8 text-primary" />
                </div>
                <h3 className="card-title text-xl mb-2">100% Guaranteed</h3>
                <p className="text-base-content/70">Your satisfaction is our top priority</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-content">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready for a Cleaner Home?</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Book your professional cleaning service today and experience the difference
          </p>
          <Link 
            href="/booking" 
            className="btn btn-lg bg-white text-primary hover:bg-gray-100 border-none px-12"
          >
            Schedule Now
          </Link>
        </div>
      </section>
    </div>
  );
}