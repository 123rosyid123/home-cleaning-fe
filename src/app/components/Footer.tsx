import Link from 'next/link';
import { FaFacebook, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

const footerContent = {
  company: {
    name: "Home Cleaning SG",
    description: "Our cleaners safety is of utmost priority to us. If there are unanticipated situations that compromise their safety, we reserve the right to decline service. We sincerely regret if we are unable to serve you under these circumstances."
  },
  links: [
    { label: "Home", href: "/" },
    { label: "Services", href: "#service-inclusions" },
    { label: "Book Now", href: "/booking" }
  ],
  contact: {
    email: "admin@homecleaningsg.com",
    phone: "+65 3158 1508",
    address: ["71 Ubi Rd 1, #10-42", "Singapore 408732"]
  },
  social: {
    facebook: "https://www.facebook.com/homecleaningspore/",
    instagram: "https://www.instagram.com/homecleaningsg/",
    followText: "Follow us on social media for promotions and cleaning tips."
  },
  copyright: "Home Cleaning SG. All rights reserved."
};

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-content relative">
      {/* Top wave decoration */}
      <div className="absolute top-0 left-0 w-full overflow-hidden -translate-y-[98%] h-16">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative h-16 w-full">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C75.69,52,158,76,244.73,100.07Z" fill="currentColor" className="opacity-20"></path>
        </svg>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Company Info */}
          <div className="md:col-span-4 space-y-5 transform transition-all duration-300">
            <h4 className="text-xl font-bold flex items-center">
              <span className="w-1.5 h-8 bg-white rounded-full mr-3 inline-block"></span>
              {footerContent.company.name}
            </h4>
            <p className="text-sm opacity-90 leading-relaxed">
              {footerContent.company.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-5 transform transition-all duration-300">
            <h4 className="text-xl font-bold flex items-center">
              <span className="w-1.5 h-8 bg-white rounded-full mr-3 inline-block"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerContent.links.map((link, index) => (
                <li key={index} className="transition-transform duration-300 hover:translate-x-1">
                  <Link href={link.href} className="hover:text-white flex items-center">
                    <FaArrowRight className="mr-2 text-xs opacity-70" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-3 space-y-5 transform transition-all duration-300">
            <h4 className="text-xl font-bold flex items-center">
              <span className="w-1.5 h-8 bg-white rounded-full mr-3 inline-block"></span>
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <FaEnvelope className="mt-1 mr-3 flex-shrink-0" />
                <a href={`mailto:${footerContent.contact.email}`} className="hover:text-white">{footerContent.contact.email}</a>
              </li>
              <li className="flex items-start">
                <FaPhone className="mt-1 mr-3 flex-shrink-0" />
                <a href={`tel:${footerContent.contact.phone}`} className="hover:text-white">{footerContent.contact.phone}</a>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 flex-shrink-0" />
                <span style={{ whiteSpace: 'pre-line' }}>{footerContent.contact.address.join('\n')}</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-5 transform transition-all duration-300">
            <h4 className="text-xl font-bold flex items-center">
              <span className="w-1.5 h-8 bg-white rounded-full mr-3 inline-block"></span>
              Stay Updated
            </h4>
            <div className="flex space-x-4">
              <a href={footerContent.social.facebook} 
                 className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110" 
                 aria-label="Facebook">
                <FaFacebook size={20} />
              </a>
              <a href={footerContent.social.instagram} 
                 className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
                 aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
            </div>
            <p className="text-sm opacity-90">{footerContent.social.followText}</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-primary-content/20 text-center text-sm opacity-80">
          <p>© {new Date().getFullYear()} {footerContent.copyright}</p>
        </div>
      </div>
      
      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/10"></div>
    </footer>
  );
}