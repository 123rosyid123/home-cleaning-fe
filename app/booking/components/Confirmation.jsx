export default function Confirmation({ data, prevStep }) {
  const services = {
    basic: { name: 'Basic Cleaning', price: '$80' },
    deep: { name: 'Deep Cleaning', price: '$150' },
    move: { name: 'Move In/Out', price: '$200' }
  };

  const handleSubmit = () => {
    // Here you would typically submit the booking data to your backend
    alert('Booking submitted successfully!');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Confirm Your Booking</h2>
      
      <div className="bg-base-100 p-6 rounded-lg mb-6">
        <h3 className="font-bold text-lg mb-4">Booking Summary</h3>
        
        <div className="grid gap-3">
          <div className="flex justify-between">
            <span className="font-semibold">Service:</span>
            <span>{services[data.service]?.name}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-semibold">Price:</span>
            <span>{services[data.service]?.price}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-semibold">Date:</span>
            <span>{data.date}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-semibold">Time:</span>
            <span>{data.time}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-semibold">Rooms:</span>
            <span>{data.rooms}</span>
          </div>
          
          <div className="divider"></div>
          
          <div>
            <span className="font-semibold">Address:</span>
            <p className="mt-1">{data.address}</p>
          </div>
          
          {data.notes && (
            <div>
              <span className="font-semibold">Special Notes:</span>
              <p className="mt-1">{data.notes}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button className="btn btn-outline" onClick={prevStep}>
          Previous
        </button>
        <button 
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}