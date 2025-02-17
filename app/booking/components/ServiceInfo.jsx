export default function ServiceInfo({ data, updateData, nextStep, prevStep }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Service Information</h2>
      
      <div className="form-control w-full mb-4">
        <label className="label">
          <span className="label-text">Number of Rooms</span>
        </label>
        <input 
          type="number" 
          className="input input-bordered w-full"
          value={data.rooms || ''}
          onChange={(e) => updateData({ rooms: e.target.value })}
          min="1"
          placeholder="Enter number of rooms"
        />
      </div>

      <div className="form-control w-full mb-4">
        <label className="label">
          <span className="label-text">Address</span>
        </label>
        <textarea 
          className="textarea textarea-bordered h-24"
          value={data.address || ''}
          onChange={(e) => updateData({ address: e.target.value })}
          placeholder="Enter your full address"
        />
      </div>

      <div className="form-control w-full mb-4">
        <label className="label">
          <span className="label-text">Special Notes</span>
        </label>
        <textarea 
          className="textarea textarea-bordered h-24"
          value={data.notes || ''}
          onChange={(e) => updateData({ notes: e.target.value })}
          placeholder="Any special instructions or requirements?"
        />
      </div>

      <div className="mt-6 flex justify-between">
        <button className="btn btn-outline" onClick={prevStep}>
          Previous
        </button>
        <button 
          className="btn btn-primary"
          onClick={nextStep}
          disabled={!data.rooms || !data.address}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}