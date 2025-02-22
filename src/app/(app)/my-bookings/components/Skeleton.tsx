const Skeleton = () => {
  return (
    <div className="card bg-white shadow-lg p-4 rounded-lg animate-pulse">
      <div className="flex items-center mb-2">
        <div className="h-5 w-5 bg-gray-300 rounded-full mr-2"></div>
        <div className="h-5 bg-gray-300 rounded w-1/2"></div>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <div className="flex flex-col w-full">
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
        </div>
        <div className="flex flex-col gap-2 justify-end mt-2 md:mt-0 w-full">
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton; 