'use client';

import { useBookingStore } from '@/store/bookingStore';
import { motion } from 'framer-motion';
import ButtonNext from './ButtonNext';
import ButtonBack from './ButtonBack';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function ServiceInfo() {
  const { 
    contactName, 
    phoneNumber, 
    email, 
    address,
    additionalNotes,
    updateBookingData, 
  } = useBookingStore();

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      className="space-y-8 max-w-4xl mx-auto"
    >
      {/* Contact Info Section */}
      <motion.div 
        variants={fadeIn}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/10 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">Contact Info</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label className="label font-medium text-gray-700">
              <span className="label-text">Contact Name</span>
            </label>
            <select 
              className="select select-bordered w-full bg-gray-50 border-2 focus:border-primary transition-all duration-200"
              value={contactName || ''}
              onChange={(e) => updateBookingData({ contactName: e.target.value })}
            >
              <option value="">Select contact type</option>
              <option value="Developer Expert">Developer Expert</option>
              <option value="Home Owner">Home Owner</option>
              <option value="Business Owner">Business Owner</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="label font-medium text-gray-700">
              <span className="label-text">Phone Number</span>
            </label>
            <input 
              type="tel" 
              className="input input-bordered w-full input-primary"
              value={phoneNumber || ''}
              onChange={(e) => updateBookingData({ phoneNumber: e.target.value })}
              placeholder="+65 Phone Number"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="label font-medium text-gray-700">
            <span className="label-text">Email</span>
          </label>
          <input 
            type="email" 
            className="input input-bordered w-full input-primary"
            value={email || ''}
            onChange={(e) => updateBookingData({ email: e.target.value })}
            placeholder="Enter your email"
          />
        </div>

      </motion.div>

      {/* Address Info Section */}
      <motion.div 
        variants={fadeIn}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/10 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">Address Info</h2>
        </div>

        <div className="space-y-2">
          <label className="label font-medium text-gray-700">
            <span className="label-text">Full Address</span>
          </label>
          <textarea 
            className="textarea textarea-primary w-full"
            value={address || ''}
            onChange={(e) => updateBookingData({ address: e.target.value })}
            placeholder="Enter full address"
          />
        </div>
      </motion.div>

      {/* Additional Notes Section */}
      <motion.div 
        variants={fadeIn}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/10 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">Additional Notes</h2>
        </div>

        <div>
          <textarea 
            className="textarea textarea-primary w-full h-3"
            value={additionalNotes || ''}
            onChange={(e) => updateBookingData({ additionalNotes: e.target.value })}
            placeholder="Enter additional notes. Please note that for hygiene reasons our cleaners do not bring equipment - imagine a mop that has mopped 50 bathrooms being used in your house! But fret not - a list of recommended equipment will be sent to you on booking confirmation"
          />
        </div>
      </motion.div>

      <div className="mt-8 flex justify-between">
        <ButtonBack />
        <ButtonNext text="Confirmation" disabled={!contactName || !phoneNumber || !email || !address || !additionalNotes} />
      </div>
    </motion.div>
  );
}