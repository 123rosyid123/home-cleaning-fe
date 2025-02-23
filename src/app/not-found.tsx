'use client';

import Link from 'next/link';
import { FiAlertTriangle } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-8 max-w-md"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
          className="flex justify-center mb-6"
        >
          <motion.div 
            animate={{ 
              rotate: [0, 10, -10, 10, 0],
            }}
            transition={{ 
              duration: 0.5,
              delay: 0.5,
              ease: "easeInOut"
            }}
            className="bg-red-100 p-4 rounded-full"
          >
            <FiAlertTriangle className="text-red-500 w-12 h-12" />
          </motion.div>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl font-bold text-gray-800 mb-4"
        >
          Page Not Found
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-gray-600 mb-6"
        >
          Sorry, the page you are looking for does not exist or has been moved.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/" className="btn btn-primary">
            Go Back Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
