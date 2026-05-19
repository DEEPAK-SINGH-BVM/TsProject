import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../store";

import { getSellerOrdersAction } from "../../store/feature/order/orderAction";
import { getTotalEarnings, getTotalOrders } from "../../utils/calcHelpers";
import { SellerOrderSkeleton } from "../../components/common/sellerOrderSkeleton";
import { FiMapPin, FiPhone, FiUser } from "react-icons/fi";

const Orders = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { order } = useSelector((state: any) => state);
  console.log("OrderSeller", order);

  // const totalOrders = getTotalOrders(orders?.orders);
  const isLoading = order.loading;
  const totalEarnings = getTotalEarnings(order.orders);
  const totalLength = order.orders.length;
  console.log("totalLength", totalLength);

  useEffect(() => {
    dispatch(getSellerOrdersAction());
  }, []);

  if (isLoading) return <SellerOrderSkeleton count={totalLength} />;
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Seller Orders</h1>
      <h1 className="text-xl font-medium mb-6">
        Total Sales : ₹{totalEarnings}
      </h1>
      <div className="space-y-5">
        {order?.orders?.map((order: any) => {
          console.log("OrderDevel", order?.deliveryAddress);
          return (
            <div key={order._id} className="bg-white p-5 rounded-xl shadow">
              <div className="flex justify-between">
                <h2 className="font-bold">Order #{order._id.slice(-6)}</h2>
                <p>Total : ₹{order.total}</p>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <div className="mt-4 space-y-3">
                <div className="flex gap-4 border p-3 rounded-lg">
                  <div className="p-4">
                    <h2 className="font-bold text-lg mb-4 flex items-center">
                      Person Details
                    </h2>

                    <div className="space-y-2">
                      <p className="flex items-center">
                        <FiUser className="mr-2 text-gray-600" />
                        <span className="font-semibold">Full Name: </span>
                         {order.deliveryAddress.fullName}
                      </p>

                      <p className="flex items-center">
                        <FiPhone className="mr-2 text-gray-600" />
                        <span className="font-semibold">Phone: </span>
                        {order.deliveryAddress.phone}
                      </p>

                      <p className="flex items-center">
                        <FiMapPin className="mr-2 text-gray-600" />
                        <span className="font-semibold">Address: </span>
                        {order.deliveryAddress.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {order.items.map((item: any) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 border p-3 rounded-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />

                    <div>
                      <h2 className="font-semibold">{item.name}</h2>

                      <p>Qty: {item.quantity}</p>

                      <p>Per Item : ₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
