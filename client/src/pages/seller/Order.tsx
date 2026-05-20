import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FiMapPin, FiPhone, FiUser } from "react-icons/fi";

import { AppDispatch } from "../../store";

import {
  getSellerOrdersAction,
  updateOrderStatusAction,
} from "../../store/feature/order/orderAction";

import { getTotalEarnings } from "../../utils/calcHelpers";

import { SellerOrderSkeleton } from "../../components/common/sellerOrderSkeleton";

const Orders = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { order } = useSelector(
    (state: any) => state
  );

  const isLoading = order.loading;

  const totalEarnings = getTotalEarnings(
    order.orders
  );

  const totalLength = order.orders.length;

  useEffect(() => {
    dispatch(getSellerOrdersAction());
  }, []);

  // if (isLoading) {
  //   return (
  //     <SellerOrderSkeleton
  //       count={totalLength}
  //     />
  //   );
  // }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">
        Seller Orders
      </h1>

      <h2 className="text-lg font-medium mb-6">
        Total Sales : ₹
        {totalEarnings}
      </h2>

      <div className="space-y-6">
        {order?.orders?.map(
          (order: any) => (
            <div
              key={order._id}
              className="bg-white p-5 rounded-2xl shadow"
            >
              {/* TOP */}
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h2 className="font-bold text-lg">
                    Order #
                    {order._id.slice(-6)}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {new Date(
                      order.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <h2 className="font-bold text-xl">
                    ₹{order.sellerTotal}
                  </h2>

                  <p className="text-sm mt-1">
                    Payment :
                    <span className="font-semibold ml-1">
                      {
                        order.paymentStatus
                      }
                    </span>
                  </p>
                </div>
              </div>

              {/* STATUS */}
              <div className="mt-4">
                <h2 className="font-semibold mb-3">
                  Order Status :
                  <span className="ml-2">
                    {
                      order.orderStatus
                    }
                  </span>
                </h2>

                <div className="flex gap-3">
                  <button
                    className={`px-4 py-2 rounded-lg text-white ${
                      order.orderStatus ===
                      "Pending"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                    }`}
                    onClick={() =>
                      dispatch(
                        updateOrderStatusAction(
                          order._id,
                          "Pending"
                        )
                      )
                    }
                  >
                    Pending
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg text-white ${
                      order.orderStatus ===
                      "Complete"
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                    onClick={() =>
                      dispatch(
                        updateOrderStatusAction(
                          order._id,
                          "Complete"
                        )
                      )
                    }
                  >
                    Complete
                  </button>
                </div>
              </div>

              {/* CUSTOMER */}
              <div className="mt-6 border rounded-xl p-4">
                <h2 className="font-bold text-lg mb-4">
                  Customer Details
                </h2>

                <div className="space-y-3">
                  <p className="flex items-center">
                    <FiUser className="mr-2" />

                    <span className="font-semibold mr-2">
                      Full Name :
                    </span>

                    {
                      order
                        .deliveryAddress
                        .fullName
                    }
                  </p>

                  <p className="flex items-center">
                    <FiPhone className="mr-2" />

                    <span className="font-semibold mr-2">
                      Phone :
                    </span>

                    {
                      order
                        .deliveryAddress
                        .phone
                    }
                  </p>

                  <p className="flex items-center">
                    <FiMapPin className="mr-2" />

                    <span className="font-semibold mr-2">
                      Address :
                    </span>

                    {
                      order
                        .deliveryAddress
                        .address
                    }
                  </p>
                </div>
              </div>

              {/* PRODUCTS */}
              <div className="mt-6 space-y-4">
                {order.items.map(
                  (item: any) => (
                    <div
                      key={
                        item.productId
                      }
                      className="flex gap-4 border rounded-xl p-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 rounded-xl object-cover"
                      />

                      <div>
                        <h2 className="font-bold text-lg">
                          {item.name}
                        </h2>

                        <p className="mt-1">
                          Quantity :
                          {
                            item.quantity
                          }
                        </p>

                        <p className="mt-1">
                          Price :
                          ₹
                          {
                            item.price
                          }
                        </p>

                        <p className="mt-1 font-semibold">
                          Total :
                          ₹
                          {item.price *
                            item.quantity}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Orders;