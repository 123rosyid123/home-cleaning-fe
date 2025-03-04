'use client';

import { FiDollarSign, FiCalendar, FiAward } from 'react-icons/fi';
import { IconType } from 'react-icons';
import React from 'react';
import { WhyChooseUs } from '@/types/landingPageType';
// Icon mapping
const iconComponents: { [key: string]: IconType } = {
  FiDollarSign,
  FiCalendar,
  FiAward
};

// Example dummy data
// const whyChooseUs = {
//   title: "Experience the difference",
//   cards: [
//     {
//       icon: "FiDollarSign",
//       title: "Friendly\nRates",
//       description: "We don't sacrifice quality for price. We offer high quality home cleaning services from $16/hr. No upfront charges, no sign up fees, no hidden costs.",
//       highlight: "$16/hr"
//     },
//     {
//       icon: "FiCalendar",
//       title: "Flexible\nSchedule",
//       description: "Our timeslot options fit into anyone's lifestyle. Get weekly part time maid with flexible terms, or last minute availability on ad hoc sessions when you book with Luce."
//     },
//     {
//       icon: "FiAward",
//       title: "Expert\nCleaners",
//       description: "Our customers love our cleaners! All our workers are full time Luce employees, and they undergo training to ensure they deliver our signature quality."
//     }
//   ]
// };

export default function FeaturesSection({ whyChooseUs }: { whyChooseUs: WhyChooseUs }) {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-base-100 to-base-200">
      <div className="container mx-auto px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-blue-800">
          {whyChooseUs.title}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {whyChooseUs.cards.map((card, index) => (
            <div key={index} className="group bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 p-4 sm:p-6 md:p-8 hover:-translate-y-2">
              <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-5 mb-3 sm:mb-4 md:mb-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  {iconComponents[card.icon] && React.createElement(iconComponents[card.icon], { className: "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary" })}
                </div>
                <div className="border-l-2 border-primary/20 pl-3 sm:pl-4 md:pl-5">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 whitespace-pre-line">
                    {card.title}
                  </h2>
                </div>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-primary/5 via-primary/20 to-primary/5 my-3 sm:my-4 md:my-5"></div>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                {card.highlight ? 
                  card.description.split(card.highlight).map((part, i) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < card.description.split(card.highlight).length - 1 && (
                        <span className="text-primary font-semibold">{card.highlight}</span>
                      )}
                    </React.Fragment>
                  ))
                  : card.description
                }
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 