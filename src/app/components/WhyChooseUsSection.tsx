import { MdSecurity } from 'react-icons/md';
import { FaUserTie, FaHandSparkles } from 'react-icons/fa';

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Singapore Trusts Us</h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Experience the difference with our professional cleaning service
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="card-body items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MdSecurity className="w-8 h-8 text-primary" />
              </div>
              <h3 className="card-title text-xl mb-2">Licensed & Insured</h3>
              <p className="text-base-content/70">
                All our cleaners are licensed, bonded, and fully insured for your peace of mind
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="card-body items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FaUserTie className="w-8 h-8 text-primary" />
              </div>
              <h3 className="card-title text-xl mb-2">Trained Professionals</h3>
              <p className="text-base-content/70">
                Experienced team with extensive training in Singapore&apos;s cleaning standards
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="card-body items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FaHandSparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="card-title text-xl mb-2">Eco-Friendly Products</h3>
              <p className="text-base-content/70">
                Using environmentally safe cleaning products suitable for Singapore&apos;s homes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 