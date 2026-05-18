import React from "react";
import { useSelector } from "react-redux";

export const SellerOrderSkeleton = () => {
  const { order } = useSelector((state: any) => state);
  console.log("OrderSeller", order);
  return (
    <div className="p-6 space-y-6 animate-pulse">
      <div className="h-10 w-1/3 bg-gray-200 rounded" />
      <div className="h-8 w-1/4 bg-gray-200 rounded" />
      {Array(3)
        .fill(0)
        .map((_, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl shadow space-y-3">
            <div className="flex justify-between">
              <div className="h-5 w-1/4 bg-gray-200 rounded" />
              <div className="h-5 w-20 bg-gray-200 rounded" />
            </div>
            <div className="h-4 w-1/3 bg-gray-200 rounded" />
            <div className="space-y-2 mt-4">
              {Array(2)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex gap-4 border p-3 rounded-lg">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg" />{" "}
                    {/* Image */}
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-2/3 bg-gray-200 rounded" />{" "}
                      {/* Name */}
                      <div className="h-3 w-1/2 bg-gray-200 rounded" />{" "}
                      {/* Qty */}
                      <div className="h-3 w-1/4 bg-gray-200 rounded" />{" "}
                      {/* Price */}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};
