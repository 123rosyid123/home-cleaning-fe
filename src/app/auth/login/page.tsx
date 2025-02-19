'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLoginForm } from './hook';

export default function LoginPage() {
  const { register, handleSubmit, errors, isLoading, onSubmit, showPassword, setShowPassword } = useLoginForm();

  const formAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
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
          Welcome Back
        </h2>
        <p className="mt-2 text-sm sm:text-base text-base-content/70">
          Please sign in to your account
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
          <motion.div
            whileTap={{ scale: 0.995 }}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className={`input input-bordered w-full transition-all duration-200 ${errors.email ? 'input-error' : ''
                } focus:ring-2 focus:ring-primary/20`}
              {...register('email')}
              autoComplete="email"
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
          <motion.div
            whileTap={{ scale: 0.995 }}
            className="relative"
          >
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`input input-bordered w-full transition-all duration-200 ${errors.password ? 'input-error' : ''
                } focus:ring-2 focus:ring-primary/20`}
              {...register('password')}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/70 hover:text-base-content"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
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
          <div className="mt-1.5 sm:mt-2 text-right">
            <Link
              href="/auth/forgot-password"
              className="text-xs sm:text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
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
              'Sign in'
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
        Don&apos;t have an account?{' '}
        <Link href="/auth/register" className="text-primary hover:underline font-medium">
          Sign up
        </Link>
      </motion.p>
    </>
  );
}
