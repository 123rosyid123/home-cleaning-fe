'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRegisterForm } from './hook';

export default function RegisterPage() {
  const { register, handleSubmit, errors, isLoading, onSubmit } = useRegisterForm();

  const formAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center px-4 sm:px-0"
      >
        <h2 className="text-xl sm:text-2xl font-bold mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Create Account
        </h2>
        <p className="mt-2 text-sm sm:text-base text-base-content/70">
          Join us for professional home cleaning services
        </p>
      </motion.div>

      <motion.form
        variants={formAnimation}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-6 mt-6 sm:mt-8 text-left px-4 sm:px-0 w-full max-w-[320px] sm:max-w-md mx-auto"
      >
        <motion.div variants={itemAnimation} className="form-control w-full">
          <label className="text-xs sm:text-sm font-medium text-base-content/80 mb-1.5 sm:mb-2">
            Email
          </label>
          <motion.div whileTap={{ scale: 0.995 }}>
            <input
              type="email"
              placeholder="your@email.com"
              className={`input input-bordered w-full transition-all duration-200 ${
                errors.email ? 'input-error' : ''
              } focus:ring-2 focus:ring-primary/20`}
              {...register('email')}
            />
          </motion.div>
          {errors.email && (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-error text-sm mt-1 block"
            >
              {errors.email.message}
            </motion.span>
          )}
        </motion.div>

        <motion.div variants={itemAnimation} className="form-control w-full">
          <label className="text-xs sm:text-sm font-medium text-base-content/80 mb-1.5 sm:mb-2">
            Password
          </label>
          <motion.div whileTap={{ scale: 0.995 }}>
            <input
              type="password"
              placeholder="••••••••"
              className={`input input-bordered w-full transition-all duration-200 ${
                errors.password ? 'input-error' : ''
              } focus:ring-2 focus:ring-primary/20`}
              {...register('password')}
            />
          </motion.div>
          {errors.password && (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-error text-sm mt-1 block"
            >
              {errors.password.message}
            </motion.span>
          )}
        </motion.div>

        <motion.div variants={itemAnimation} className="form-control w-full">
          <label className="text-xs sm:text-sm font-medium text-base-content/80 mb-1.5 sm:mb-2">
            Confirm Password
          </label>
          <motion.div whileTap={{ scale: 0.995 }}>
            <input
              type="password"
              placeholder="••••••••"
              className={`input input-bordered w-full transition-all duration-200 ${
                errors.confirmPassword ? 'input-error' : ''
              } focus:ring-2 focus:ring-primary/20`}
              {...register('confirmPassword')}
            />
          </motion.div>
          {errors.confirmPassword && (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-error text-sm mt-1 block"
            >
              {errors.confirmPassword.message}
            </motion.span>
          )}
        </motion.div>

        <motion.div
          variants={itemAnimation}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="mt-4 sm:mt-6"
        >
          <button
            type="submit"
            className={`btn btn-primary w-full shadow-lg shadow-primary/20 text-sm sm:text-base h-10 min-h-0 sm:h-12`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-bars loading-xs"></span>
            ) : (
              'Create Account'
            )}
          </button>
        </motion.div>
      </motion.form>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-xs sm:text-sm mt-4 sm:mt-6 px-4 sm:px-0"
      >
        Already have an account?{' '}
        <Link href="/auth/login" className="text-primary hover:underline font-medium">
          Sign in
        </Link>
      </motion.p>
    </>
  );
}
