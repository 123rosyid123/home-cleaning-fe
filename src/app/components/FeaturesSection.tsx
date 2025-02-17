import { FiDollarSign, FiCalendar, FiAward } from 'react-icons/fi';

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-base-100 to-base-200">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
          Experience the difference
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 hover:-translate-y-2">
            <div className="flex items-center space-x-6 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <FiDollarSign className="w-7 h-7 text-primary" />
              </div>
              <div className="border-l-2 border-primary/20 pl-6">
                <h2 className="text-2xl font-bold text-gray-800">Friendly<br />Rates</h2>
              </div>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-primary/5 via-primary/20 to-primary/5 my-6"></div>
            <p className="text-lg text-gray-600 leading-relaxed">
              We don&apos;t sacrifice quality for price. We offer high quality home cleaning services from{' '}
              <span className="text-primary font-semibold">$16/hr</span>. No upfront charges, no sign up fees, no hidden costs.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 hover:-translate-y-2">
            <div className="flex items-center space-x-6 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <FiCalendar className="w-7 h-7 text-primary" />
              </div>
              <div className="border-l-2 border-primary/20 pl-6">
                <h2 className="text-2xl font-bold text-gray-800">Flexible<br />Schedule</h2>
              </div>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-primary/5 via-primary/20 to-primary/5 my-6"></div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our timeslot options fit into anyone&apos;s lifestyle. Get weekly part time maid with flexible terms, or last minute availability on ad hoc sessions when you book with Luce.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 hover:-translate-y-2">
            <div className="flex items-center space-x-6 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <FiAward className="w-7 h-7 text-primary" />
              </div>
              <div className="border-l-2 border-primary/20 pl-6">
                <h2 className="text-2xl font-bold text-gray-800">Expert<br />Cleaners</h2>
              </div>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-primary/5 via-primary/20 to-primary/5 my-6"></div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our customers love our cleaners! All our workers are full time Luce employees, and they undergo training to ensure they deliver our signature quality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 