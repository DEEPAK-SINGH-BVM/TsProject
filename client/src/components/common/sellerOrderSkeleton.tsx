interface OrderLength {
  count:number
}

export const SellerOrderSkeleton = ({count}:OrderLength) => {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      <div className="h-10 w-1/3 bg-gray-200 rounded" />
      <div className="h-8 w-1/4 bg-gray-200 rounded" />
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex gap-4 border p-3 rounded-lg">
            <div className="w-20 h-20 bg-gray-200 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
              <div className="h-3 w-1/2 bg-gray-200 rounded" />
              <div className="h-3 w-1/4 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
    </div>
  );
};
