'use client';

import Link from 'next/link';
import { FaFacebook, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Footer as FooterType } from '@/types/landingPageType';

// Add this new component before the Footer component
const BubbleStarsAnimation = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={`bubble-${i}`}
            className="absolute bg-white/20 rounded-full pointer-events-none"
            style={{
              width: `${4 + Math.random() * 4}px`,
              height: `${4 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              bottom: '-10%',
              animation: `bubbleAnimation ${3 + Math.random() * 7}s linear infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes bubbleAnimation {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-50vh) scale(1.2);
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes starTwinkle {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
        }
      `}</style>
    </>
  );
};

// Dummy data
// const footerContent = {
//   company: {
//     name: "Home Cleaning SG",
//     description: "Our cleaners safety is of utmost priority to us. If there are unanticipated situations that compromise their safety, we reserve the right to decline service. We sincerely regret if we are unable to serve you under these circumstances."
//   },
//   links: [
//     { label: "Home", href: "/" },
//     { label: "Services", href: "#service-inclusions" },
//     { label: "Book Now", href: "/booking" }
//   ],
//   contact: {
//     email: "admin@homecleaningsg.com",
//     phone: "+65 3158 1508",
//     address: ["71 Ubi Rd 1, #10-42", "Singapore 408732"]
//   },
//   social: {
//     facebook: "https://www.facebook.com/homecleaningspore/",
//     instagram: "https://www.instagram.com/homecleaningsg/",
//     followText: "Follow us on social media for promotions and cleaning tips."
//   },
//   copyright: "Home Cleaning SG. All rights reserved."
// };

export default function Footer({ footer }: { footer: FooterType }) {
  return (
    <footer className="bg-primary text-primary-content relative overflow-hidden">
      {/* Add the animation component */}
      <BubbleStarsAnimation />

      <div className="container mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Company Info */}
          <div className="md:col-span-1 lg:col-span-4 space-y-4">
            <h4 className="text-lg md:text-xl font-bold flex items-center">
              <span className="w-1.5 h-6 md:h-8 bg-white rounded-full mr-3 inline-block"></span>
              {footer.company.name}
            </h4>
            <p className="text-xs md:text-sm opacity-90 leading-relaxed">
              {footer.company.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1 lg:col-span-2 space-y-4">
            <h4 className="text-lg md:text-xl font-bold flex items-center">
              <span className="w-1.5 h-6 md:h-8 bg-white rounded-full mr-3 inline-block"></span>
              Quick Links
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {footer.links.map((link, index) => (
                <li key={index} className="transition-transform duration-300 hover:translate-x-1">
                  <Link href={link.href} 
                        className="hover:text-white flex items-center relative z-10 transition-colors duration-300">
                    <FaArrowRight className="mr-2 text-xs opacity-70" />
                    <span className="text-sm md:text-base">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1 lg:col-span-3 space-y-4">
            <h4 className="text-lg md:text-xl font-bold flex items-center">
              <span className="w-1.5 h-6 md:h-8 bg-white rounded-full mr-3 inline-block"></span>
              Contact Us
            </h4>
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
              <li className="flex items-start">
                <FaEnvelope className="mt-1 mr-3 flex-shrink-0" />
                <a href={`mailto:${footer.contact.email}`} 
                   className="hover:text-white transition-colors duration-300">
                   {footer.contact.email}
                </a>
              </li>
              <li className="flex items-start">
                <FaPhone className="mt-1 mr-3 flex-shrink-0" />
                <a href={`tel:${footer.contact.phone}`} 
                   className="hover:text-white transition-colors duration-300">
                   {footer.contact.phone}
                </a>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 flex-shrink-0" />
                <span style={{ whiteSpace: 'pre-line' }}>{footer.contact.address.join('\n')}</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1 lg:col-span-3 space-y-4">
            <h4 className="text-lg md:text-xl font-bold flex items-center">
              <span className="w-1.5 h-6 md:h-8 bg-white rounded-full mr-3 inline-block"></span>
              Stay Updated
            </h4>
            <div className="flex space-x-4">
              <a href={footer.social.facebook} 
                 className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110" 
                 aria-label="Facebook"
                 target="_blank"
                 rel="noopener noreferrer">
                <FaFacebook size={20} />
              </a>
              <a href={footer.social.instagram} 
                 className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
                 aria-label="Instagram"
                 target="_blank"
                 rel="noopener noreferrer">
                <FaInstagram size={20} />
              </a>
            </div>
            <p className="text-sm opacity-90">{footer.social.followText}</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-primary-content/20 text-center text-sm opacity-80">
          <p>© {new Date().getFullYear()} {footer.copyright}</p>
        </div>
      </div>
      
      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/10"></div>
    </footer>
  );
}