'use client';

import { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { FAQ as FAQType } from '@/types/landingPageType';

// Example dummy data
// const CONTENT = {
//   title: "Frequently Asked Questions",
//   subtitle: "Everything you need to know about our cleaning services",
//   faqs: [
//     {
//       question: "How do you select and screen your cleaners?",
//       answer: "All our cleaners undergo a rigorous screening process including background checks, professional reference checks, and in-person interviews. They are fully licensed, bonded and insured. We only work with experienced cleaners who meet our high standards for professionalism and expertise."
//     },
//     {
//       question: "What cleaning products do you use?",
//       answer: "We use eco-friendly, non-toxic cleaning products that are safe for your family, pets, and the environment while still being highly effective. All our products meet Singapore's safety standards and are specially chosen for local homes and conditions."
//     },
//     {
//       question: "What if I'm not satisfied with the cleaning?",
//       answer: "Your satisfaction is our top priority. If you're not completely happy with any aspect of our service, simply let us know within 24 hours and we'll return to re-clean the areas in question at no additional cost. We stand behind our work with a 100% satisfaction guarantee."
//     },
//     {
//       question: "How do I schedule or reschedule a cleaning?",
//       answer: "Booking is easy through our online platform - simply select your preferred date and time. Need to reschedule? No problem! You can modify your booking up to 24 hours before the scheduled service with no penalty. Our customer service team is also available to help if needed."
//     },
//     {
//       question: "Do you provide your own cleaning supplies?",
//       answer: "Yes, our cleaners bring all necessary professional-grade cleaning supplies and equipment. However, if you prefer us to use specific products you provide, we're happy to accommodate your preferences."
//     }
//   ]
// };

export default function FAQ({ faq }: { faq: FAQType }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-base-200/50 to-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-blue-800 relative inline-block">
            {faq.title}
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-500 rounded-full"></span>
          </h2>
          <p className="text-lg text-base-faq/70 max-w-2xl mx-auto">
            {faq.subtitle}
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-6">
          {faq.faqs.map((faq, index) => (
            <div 
              key={index}
              className="rounded-xl border border-base-300 bg-base-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                className="w-full px-8 py-5 text-left flex justify-between items-center hover:bg-base-200/50 transition-all duration-300 rounded-xl"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-lg text-blue-900">{faq.question}</span>
                <span className="flex-shrink-0 ml-4 w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  {openIndex === index ? (
                    <FiMinus className="w-5 h-5" />
                  ) : (
                    <FiPlus className="w-5 h-5" />
                  )}
                </span>
              </button>
              
              <div 
                className={`px-8 overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-96 py-5 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-base-content/70 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}