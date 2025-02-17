import Link from 'next/link';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function HeroSection() {
  return (
    <div className="hero min-h-screen relative">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80")'
        }}
      ></div>
      <div className="hero-overlay bg-gradient-to-b from-black/80 via-black/20 to-black/40 backdrop-brightness-80"></div>
      <div className="hero-content text-center text-neutral-content z-10 px-4">
        <div className="max-w-2xl">
          <div className="flex items-center justify-center gap-2 mb-4 animate-fade-in">
            <FaMapMarkerAlt className="text-primary" />
            <span className="text-primary font-semibold">Singapore&apos;s Most Trusted Cleaning Service</span>
          </div>
          <h1 className="mb-8 text-4xl md:text-6xl font-bold text-white animate-fade-in-down leading-tight">
            Home Cleaning Singapore
          </h1>
          <p className="mb-8 text-base md:text-lg text-gray-200 leading-relaxed animate-fade-in-up max-w-xl mx-auto">
            Experience Singapore&apos;s premium home cleaning service. From HDBs to condos,
            our expert team delivers spotless results with local understanding and international standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link
              href="/booking"
              className="btn btn-primary btn-lg hover:scale-105 transition-transform duration-300 px-8 group"
            >
              Book Now
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
            <Link
              href="/services"
              className="btn btn-ghost btn-lg border-2 border-white hover:bg-white hover:text-black transition-colors duration-300 px-8"
            >
              Explore Services
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 p-6 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-primary">10k+</h3>
              <p className="text-sm text-gray-300 mt-2">Homes Cleaned</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-primary">4.9/5</h3>
              <p className="text-sm text-gray-300 mt-2">Google Rating</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-primary">5k+</h3>
              <p className="text-sm text-gray-300 mt-2">Regular Clients</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-primary">100%</h3>
              <p className="text-sm text-gray-300 mt-2">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 