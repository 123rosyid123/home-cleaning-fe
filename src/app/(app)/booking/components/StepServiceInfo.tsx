'use client';

import { motion } from 'framer-motion';
import ButtonNext from './ButtonNext';
import ButtonBack from './ButtonBack';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useServiceInfo } from './StepServiceInfoHook';
import AddressMap from './AddressMap';

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
    addresses,
    selectedAddressId,
    isNextButtonDisabled,
    selectAddress,
    handleAdditionalNotesChange,
  } = useServiceInfo();

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="space-y-8 max-w-4xl mx-auto"
    >
      {/* Address Cards Section */}
      <motion.div
        variants={fadeIn}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {addresses.map((addr) => (
          <motion.div
            key={addr.id}
            onClick={() => selectAddress(addr.id)}
            className={cn(
              "cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md",
              selectedAddressId === addr.id
                ? "border-primary bg-primary/5"
                : "border-gray-200 hover:border-primary/50"
            )}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  addr.is_primary ? "bg-primary" : "bg-gray-400"
                )} />
                <h3 className="font-semibold text-gray-800">{addr.label}</h3>
              </div>
              {addr.is_primary && (
                <span className="text-xs text-primary font-medium px-2 py-1 bg-primary/10 rounded-full">
                  Primary
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm mb-2">{addr.address}</p>
            <p className="text-gray-500 text-sm">{addr.phone}</p>
          </motion.div>
        ))}

        {/* Add New Address Card */}
        <Link href="/account/address"
          className="cursor-pointer p-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-primary/50 transition-all duration-200 hover:shadow-md flex flex-col items-center justify-center text-gray-500 hover:text-primary min-h-[140px]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span className="font-medium">Add New Address</span>
        </Link>
      </motion.div>

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
            <input
              type="text"
              className="input input-bordered w-full input-primary"
              value={contactName || ''}
              readOnly
              placeholder="Select an address to fill contact name"
            />
          </div>

          <div className="space-y-2">
            <label className="label font-medium text-gray-700">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="tel"
              className="input input-bordered w-full input-primary"
              value={phoneNumber || ''}
              readOnly
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
            readOnly
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
            readOnly
            placeholder="Enter full address"
          />
          {address && (
            <div className="mt-4">
              <AddressMap 
                address={address} 
                className="border border-primary/20 shadow-sm" 
              />
            </div>
          )}
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
            className="textarea textarea-primary w-full h-32"
            value={additionalNotes || ''}
            onChange={(e) => handleAdditionalNotesChange(e.target.value)}
            placeholder="Enter additional notes for the cleaner..."
          />
        </div>
      </motion.div>

      <div className="mt-8 flex justify-between">
        <ButtonBack />
        <ButtonNext text="Next" disabled={isNextButtonDisabled} />
      </div>
    </motion.div>
  );
}