export default function SelectSlot({ data, updateData, nextStep, prevStep }) {
  const times = [
    '09:00', '10:00', '11:00', '13:00', '14:00', '15:00'
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Select Date & Time</h2>
      
      <div className="form-control w-full mb-6">
        <label className="label">
          <span className="label-text">Select Date</span>
        </label>
        <input 
          type="date" 
          className="input input-bordered w-full"
          value={data.date || ''}
          onChange={(e) => updateData({ date: e.target.value })}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div className="form-control w-full mb-6">
        <label className="label">
          <span className="label-text">Select Time</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {times.map((time) => (
            <button
              key={time}
              className={`btn ${data.time === time ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => updateData({ time })}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button className="btn btn-outline" onClick={prevStep}>
          Previous
        </button>
        <button 
          className="btn btn-primary"
          onClick={nextStep}
          disabled={!data.date || !data.time}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}