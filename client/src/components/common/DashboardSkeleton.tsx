
const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 animate-pulse">
      {/* Header */}
      <div className="mb-8">
        <div className="h-8 w-1/3 bg-gray-200 rounded mb-2" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {Array(4)
          .fill(0)
          .map((_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="h-12 w-12 bg-gray-200 rounded-xl" />
                <div className="h-5 w-20 bg-gray-200 rounded-full" />
              </div>
              <div className="h-8 bg-gray-200 rounded-md w-1/2 mb-2" />
              <div className="h-4 bg-gray-200 rounded-md w-2/3" />
            </div>
          ))}
      </div>

      {/* Quick Actions + Order Summary */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 space-y-4">
          <div className="h-6 w-1/3 bg-gray-200 rounded mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array(4)
              .fill(0)
              .map((_, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-gray-200 h-28" />
              ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-4">
          <div className="h-6 w-1/2 bg-gray-200 rounded mb-4" />
          {Array(3)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-gray-200 h-16 rounded-xl"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
