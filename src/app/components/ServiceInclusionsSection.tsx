import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { GiKitchenTap, GiShower, GiBed, GiVacuumCleaner } from 'react-icons/gi';
import Image from 'next/image';

const services = [
  {
    id: 0,
    title: "Kitchen Cleaning",
    icon: <GiKitchenTap className="w-8 h-8" />,
    features: [
      "Washing dishes and cutlery",
      "Dusting and wiping all surfaces",
      "Vacuuming and mopping of floor",
      "Scrubbing stove and counter tops",
      "Cleaning inside microwave and exterior of appliances",
      "Sanitizing sink and faucets"
    ],
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80"
  },
  {
    id: 1,
    title: "Bathroom Cleaning",
    icon: <GiShower className="w-8 h-8" />,
    features: [
      "Scrubbing toilets, showers, tubs and sinks",
      "Dusting of all accessible surfaces",
      "Wiping down mirrors and glass",
      "Mopping and scrubbing floors",
      "Sanitizing high-touch areas",
      "Cleaning shower screens and tiles"
    ],
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Bedroom & Living Areas",
    icon: <GiBed className="w-8 h-8" />,
    features: [
      "Dusting all surfaces and furniture",
      "Vacuuming carpets and mopping floors",
      "Making beds and changing linens",
      "Cleaning mirrors and windows",
      "Organizing and tidying spaces",
      "Wiping door handles and light switches"
    ],
    image: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Extra Services",
    icon: <GiVacuumCleaner className="w-8 h-8" />,
    features: [
      "Deep carpet cleaning",
      "Window washing (interior/exterior)",
      "Balcony cleaning",
      "Cabinet organization",
      "Appliance deep cleaning",
      "Wall washing and spot cleaning"
    ],
    image: "https://images.unsplash.com/photo-1527515545081-5db817172677?auto=format&fit=crop&q=80"
  }
];

export default function ServiceInclusionsSection() {
  const [activeService, setActiveService] = useState(0);

  return (
    <section className="py-12 sm:py-24 bg-gradient-to-b from-base-200 to-base-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-5xl font-bold mb-8 sm:mb-16 text-blue-800">
          Home Cleaning Service Inclusions
        </h2>

        <div className="flex flex-col gap-6 sm:gap-12">
          {/* Service Navigation Icons */}
          <div className="flex pb-4 sm:pb-0 sm:justify-start space-x-4 hide-scrollbar">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => setActiveService(index)}
                className={`flex-shrink-0 w-16 sm:w-20 h-16 sm:h-20 rounded-2xl flex flex-col items-center justify-center gap-1 sm:gap-2 transition-all duration-300 ${
                  activeService === index
                    ? 'bg-primary text-white shadow-lg scale-110'
                    : 'bg-white text-primary shadow hover:scale-105'
                }`}
              >
                {service.icon}
                <span className="text-[10px] sm:text-xs font-medium text-center">
                  {service.title.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Service Content */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${activeService * 100}%)`
              }}
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 flex flex-col lg:flex-row gap-4 sm:gap-8"
                >
                  <div className="card w-full lg:w-1/2 bg-white shadow-xl">
                    <div className="card-body p-4 sm:p-8">
                      <h3 className="card-title text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                        {service.title}
                      </h3>
                      <ul className="space-y-3 sm:space-y-4">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 sm:gap-3">
                            <FaCheck className="text-primary mt-1 flex-shrink-0" />
                            <span className="text-sm sm:text-base text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="card w-full lg:w-1/2 bg-base-100 shadow-xl image-full h-[200px] sm:h-[300px] lg:h-[400px]">
                    <figure>
                      <Image
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover opacity-50"
                        width={300}
                        height={300}
                      />
                    </figure>
                    <div className="card-body justify-end">
                      <h2 className="card-title text-white">{service.title}</h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 pt-4 sm:pt-0">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveService(index)}
                className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all duration-300 ${
                  activeService === index
                    ? 'bg-primary w-6 sm:w-8'
                    : 'bg-primary/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}