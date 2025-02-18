import Link from 'next/link';
import Image from 'next/image';

const servicesData = [
  {
    type: "One Time Cleaning",
    priceRange: {
      min: 17.44,
      max: 27.25,
      gstRange: "16 - 25"
    },
    inclusions: [
      "Scrubbing toilets, showers, tubs and sinks",
      "Dusting of all accessible surfaces",
      "Wiping down mirrors and glass",
      "Mopping and scrubbing floors",
      "Emptying waste and recycling"
    ],
    cleanerInfo: "You will be assigned the closest cleaner available at your booked schedule",
    isRecommended: false
  },
  {
    type: "Recurring Cleaning",
    priceRange: {
      min: 19.62,
      max: 23.98,
      gstRange: "18 - 22"
    },
    inclusions: [
      "Standard home cleaning checklist",
      "Weekly and fortnightly options available",
      "Instant booking confirmation",
      "Same cleaner every session",
      "Dedicated customer support"
    ],
    cleanerInfo: "You will be assigned the same cleaner for every recurring session so they remember your preferences",
    isRecommended: true
  }
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-blue-700">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold mb-8 sm:mb-16 text-slate-300">
            Great Quality at a Great Price
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Don&apos;t believe us? Check out our home cleaning rates:
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          {servicesData.map((service) => (
            <div 
              key={service.type}
              className={`bg-white rounded-2xl p-6 w-[400px] h-[650px] shadow-lg relative flex flex-col ${
                service.isRecommended ? 'border-t-4 border-[#FF6F3D]' : ''
              }`}
            >
              <h2 className="text-[#0A46D6] text-lg font-semibold">
                {service.type}
              </h2>
              <div className="flex justify-between items-start mt-2">
                <div>
                  <div className="flex items-end space-x-2">
                    <span className="text-[#0A46D6] text-3xl font-bold">${service.priceRange.min}</span>
                    <span className="text-gray-500 text-xl">—</span>
                    <span className="text-[#0A46D6] text-3xl font-bold">${service.priceRange.max}</span>
                    <span className="text-gray-400 text-sm">/hr</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">${service.priceRange.gstRange}/hr + GST</p>
                </div>
              </div>

              <hr className="border-gray-200 my-4" />

              <Link href="/booking" className="inline-block">
                <button className="bg-[#FF6F3D] text-white font-semibold py-2 px-4 rounded-lg mt-4 cursor-pointer">
                  Book a Service
                </button>
              </Link>

              <div className="flex-grow">
                <div className="bg-[#E9F1FF] rounded-xl mt-6 p-4">
                  <h3 className="text-[#0A46D6] font-semibold">This plan includes:</h3>
                  <ul className="list-disc text-sm text-[#0A46D6] mt-2 pl-5 space-y-1">
                    {service.inclusions.map((inclusion, idx) => (
                      <li key={idx}>{inclusion}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#F3F5F9] rounded-xl mt-4 p-4">
                  <h3 className="text-[#0A46D6] font-semibold">Your assigned cleaner:</h3>
                  <p className="text-sm text-[#0A46D6] mt-1">{service.cleanerInfo}</p>
                </div>
              </div>

              {service.isRecommended && (
                <div className="flex flex-col items-center py-6 mb-2 transform hover:scale-105 transition-transform duration-200">
                  <div className="bg-[#E9F1FF] rounded-full p-3 shadow-md">
                    <Image 
                      src="https://cdn.prod.website-files.com/647e01c6bc9b144cf70df6ff/6492773c5674f584818caa50_recomended.svg" 
                      alt="Recommended Badge"
                      className="w-8 h-8" 
                      width={32}
                      height={32}
                    />
                  </div>
                  <span className="text-[#0A46D6] text-sm font-bold text-center leading-tight mt-2 bg-[#E9F1FF] px-4 py-1 rounded-full shadow-sm">RECOMMENDED</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 