export default function SelectService({ data, updateData, nextStep }) {
  const services = [
    { id: 'basic', name: 'Basic Cleaning', price: '$80', description: 'Basic house cleaning service' },
    { id: 'deep', name: 'Deep Cleaning', price: '$150', description: 'Thorough deep cleaning service' },
    { id: 'move', name: 'Move In/Out', price: '$200', description: 'Comprehensive cleaning for moving' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Select Your Service</h2>
      <div className="grid gap-4">
        {services.map((service) => (
          <div 
            key={service.id}
            className={`card bg-base-100 cursor-pointer hover:bg-base-200 transition-colors
              ${data.service === service.id ? 'border-2 border-primary' : ''}`}
            onClick={() => updateData({ service: service.id })}
          >
            <div className="card-body">
              <h3 className="card-title">{service.name}</h3>
              <p>{service.description}</p>
              <p className="text-xl font-bold">{service.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <button 
          className="btn btn-primary"
          onClick={nextStep}
          disabled={!data.service}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}