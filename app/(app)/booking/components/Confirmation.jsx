import { useBookingStore } from '@/store/bookingStore';
import { 
  CalendarDays, 
  Clock, 
  RepeatIcon, 
  Timer, 
  DollarSign,
  User, 
  Phone, 
  Mail, 
  MapPin, 
  FileText 
} from 'lucide-react';

export default function Confirmation() {
  const { 
    frequency,
    duration,
    date,
    time,
    contactName,
    phoneNumber,
    email,
    address,
    postalCode,
    additionalNotes,
    prevStep,
    resetBooking
  } = useBookingStore();

  const frequencies = {
    oneTime: { name: 'One Time Cleaning', price: '$16-$25/hr' },
    everyOtherWeek: { name: 'Every Other Week', price: '$18-$22/hr' },
    oncePerWeek: { name: 'Once per Week', price: '$18-$22/hr' },
    moreThanOnce: { name: '> Once per Week', price: '$18-$22/hr' }
  };

  const durations = {
    '4hours': '4 Hours',
    '3hours': '3 Hours'
  };

  const handleSubmit = () => {
    // Here you would typically submit the booking data to your backend
    alert('Booking submitted successfully!');
    resetBooking();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary/70 
        text-transparent bg-clip-text">
        Confirm Your Booking
      </h2>
      
      <div className="bg-white shadow-xl rounded-2xl p-8 mb-8 space-y-6 border border-gray-100">
        <h3 className="font-bold text-2xl mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-primary rounded-full"></span>
          Booking Summary
        </h3>
        
        <div className="grid gap-6">
          {/* Service Details Section */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <h4 className="font-semibold text-gray-700 mb-4">Service Details</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <RepeatIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Frequency</p>
                  <p className="font-medium">{frequencies[frequency]?.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Timer className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{durations[duration]}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium">{frequencies[frequency]?.price}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CalendarDays className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{date?.toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">{time}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Information Section */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <h4 className="font-semibold text-gray-700 mb-4">Contact Information</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{contactName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 col-span-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{email}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Location Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Service Location</p>
                <p className="font-medium mt-1">{address}</p>
                <p className="font-medium">Postal Code: {postalCode}</p>
              </div>
            </div>
          </div>
          
          {/* Additional Notes Section */}
          {additionalNotes && (
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Additional Notes</p>
                  <p className="font-medium mt-1">{additionalNotes}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button 
          className="px-8 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium 
            hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
          onClick={prevStep}
        >
          Back
        </button>
        <button 
          className="px-8 py-3 rounded-xl bg-primary text-white font-medium 
            hover:bg-primary/90 transition-all duration-200 shadow-lg 
            hover:shadow-primary/30 flex items-center gap-2"
          onClick={handleSubmit}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}