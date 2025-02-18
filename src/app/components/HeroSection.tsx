import Link from 'next/link';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection() {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="hero min-h-screen relative">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80")'
        }}
      ></div>
      <div className="hero-overlay bg-gradient-to-b from-blue-800 via-blue-800/20 to-sky-800/20 backdrop-brightness-80"></div>
      <div className="hero-content text-center text-neutral-content z-10 px-4">
        <motion.div
          className="max-w-5xl"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-2 mb-4 md:mb-8"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-white" />
              <span className="text-white font-semibold">Singapore&apos;s Most Trusted Cleaning Service</span>
            </div>
          </motion.div>

          <motion.h1
            className="mb-8 text-4xl md:text-6xl font-bold text-white flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6"
            variants={slideUp}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <Image
                src="/logo-only.png"
                alt="Home Cleaning SG"
                height={80}
                width={80}
                className="drop-shadow-lg w-[80px] h-[80px] md:w-[120px] md:h-[120px]"
              />
              <div className="absolute -bottom-2 w-full h-4 bg-gradient-to-t from-white/20 to-transparent blur-sm"></div>
            </div>
            <span className="drop-shadow-lg text-center hidden md:block">
              Home Cleaning Singapore
            </span>
            <span className="drop-shadow-lg text-center md:hidden">
              Home Cleaning SG
            </span>
          </motion.h1>

          <motion.p
            className="mb-8 text-base md:text-lg text-gray-200 leading-relaxed max-w-xl mx-auto "
            variants={slideUp}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience Singapore&apos;s premium home cleaning service. From HDBs to condos,
            our expert team delivers spotless results with local understanding and international standards.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeIn}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/booking"
              className="btn btn-primary sm:btn-lg hover:scale-105 transition-transform duration-300 px-4 sm:px-8 group"
            >
              Book Now
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
            <Link
              href="/services"
              className="btn btn-ghost sm:btn-lg border-2 border-white hover:bg-white hover:text-black transition-colors duration-300 px-4 sm:px-8"
            >
              Explore Services
            </Link>
          </motion.div>

          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 p-6 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10"
            variants={fadeIn}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { value: '10k+', label: 'Homes Cleaned' },
              { value: '4.9/5', label: 'Google Rating' },
              { value: '5k+', label: 'Regular Clients' },
              { value: '100%', label: 'Satisfaction' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                <p className="text-sm text-gray-300 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}