'use client';

import { motion } from 'framer-motion';
import { useVerifyOtpForm } from './hook';

export default function VerifyOtpPage() {
  const { 
    register, 
    handleSubmit, 
    errors, 
    isLoading, 
    onSubmit,
    resendOtp,
    goToRegister,
    phone,
    otpValues,
    otpRefs,
    formAnimation,
    itemAnimation,
    handleOtpInput,
    handleKeyDown
  } = useVerifyOtpForm();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center px-4 sm:px-0"
      >
        <h2 className="text-xl sm:text-2xl font-bold mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Verify Your Phone
        </h2>
        <p className="mt-2 text-sm sm:text-base text-base-content/70">
          Enter the OTP sent to {phone ? phone : 'your phone'}
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
            One-Time Password (OTP)
          </label>
          
          {/* Hidden input to store the OTP value for form submission */}
          <input type="hidden" {...register('otp')} />
          
          <div className="flex justify-between gap-2 sm:gap-3">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <motion.div key={index} whileTap={{ scale: 0.95 }} className="flex-1">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  ref={(el) => { otpRefs.current[index] = el as HTMLInputElement; }}
                  value={otpValues[index]}
                  onChange={(e) => handleOtpInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="input input-bordered w-full aspect-square text-center text-xl font-semibold focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  autoComplete="one-time-code"
                  pattern="\d*"
                />
              </motion.div>
            ))}
          </div>
          
          {errors.otp && (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-error text-sm mt-1 block"
            >
              {errors.otp.message}
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
              'Verify'
            )}
          </button>
        </motion.div>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-xs sm:text-sm mt-4 sm:mt-6 px-4 sm:px-0"
      >
        <button 
          onClick={resendOtp} 
          className="text-primary hover:underline font-medium cursor-pointer"
          type="button"
        >
          Didn&apos;t receive OTP? Resend
        </button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-xs sm:text-sm mt-2 sm:mt-3 px-4 sm:px-0"
      >
        <button 
          onClick={goToRegister} 
          className="text-secondary hover:underline font-medium cursor-pointer"
          type="button"
        >
          Change phone number
        </button>
      </motion.p>
    </>
  );
}
