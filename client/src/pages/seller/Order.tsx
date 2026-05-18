import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "../../store";

import { getSellerOrdersAction } from "../../store/feature/order/orderAction";
import { getTotalEarnings, getTotalOrders } from "../../utils/calcHelpers";
import { SellerOrderSkeleton } from "../../components/common/sellerOrderSkeleton";

const Orders = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { order } = useSelector((state: any) => state);
  console.log("OrderSeller", order);

  // const totalOrders = getTotalOrders(orders?.orders);
  const isLoading = order.loading;
  const totalEarnings = getTotalEarnings(order.orders);
  console.log("totalEarningsTotalEarnings", totalEarnings);
  
  useEffect(() => {
    dispatch(getSellerOrdersAction());
  }, []);

  // if (isLoading) return <SellerOrderSkeleton/>;
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Seller Orders</h1>
        <h1 className="text-xl font-medium mb-6">
          Total Earing : ₹ {totalEarnings}
        </h1>
        <div className="space-y-5">
          {order?.orders?.map((order: any) => (
            <div key={order._id} className="bg-white p-5 rounded-xl shadow">
              <div className="flex justify-between">
                <h2 className="font-bold">Order #{order._id.slice(-6)}</h2>

                <p>Total : ₹{order.total}</p>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                {new Date(order.createdAt).toDateString()}
              </p>

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

                      <p>₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default Orders;
