import Link from 'next/link';
import { MdCleaningServices } from 'react-icons/md';
import { FaHandSparkles, FaUserTie, FaCheck } from 'react-icons/fa';

export default function ServicesSection() {
  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Cleaning Services</h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Comprehensive cleaning solutions tailored for Singapore homes
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <MdCleaningServices className="w-8 h-8" />,
              title: "Regular Cleaning",
              price: "From $16/hr",
              features: ["Weekly/Bi-weekly sessions", "Customizable cleaning checklist", "Ideal for HDB flats & Condos"]
            },
            {
              icon: <FaHandSparkles className="w-8 h-8" />,
              title: "Deep Cleaning",
              price: "From $25/hr",
              features: ["Thorough deep cleaning", "Cabinet & Appliance cleaning", "Window & Frame cleaning"]
            },
            {
              icon: <FaUserTie className="w-8 h-8" />,
              title: "Move In/Out Cleaning",
              price: "Custom Quote",
              features: ["Complete property cleaning", "Cabinet sanitization", "Ready for handover"]
            }
          ].map((service, index) => (
            <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="card-body">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="card-title text-xl mb-2">{service.title}</h3>
                <p className="text-primary font-bold text-lg mb-4">{service.price}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <FaCheck className="text-primary" />
                      <span className="text-base-content/70">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="card-actions justify-end mt-6">
                  <Link href="/booking" className="btn btn-primary btn-block">
                    Book Service
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 