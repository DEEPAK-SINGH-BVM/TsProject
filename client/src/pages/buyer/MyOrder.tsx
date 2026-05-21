import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "../../store";

import { getMyOrdersAction } from "../../store/feature/order/orderAction";
import { io } from "socket.io-client";
import { useSocket } from "../../context/SocketContext";

const MyOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { socket } = useSocket();
  const { orders, loading } = useSelector((state: any) => state.order);

  useEffect(() => {
    dispatch(getMyOrdersAction());
  }, []);

  const socketRef = useRef<any>(null);
  console.log("socketRef", socketRef);

  useEffect(() => {
    if (!socket) return;
    socket.on("orderStatusUpdated", (updatedOrder: any) => {
      console.log("Order status updated:", updatedOrder);
      dispatch(getMyOrdersAction());
    });

    return () => {
      socket.off("orderStatusUpdated");
    };
  }, [socket]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="space-y-5">
        {orders?.map((order: any) => (
          <div key={order._id} className="bg-white p-5 rounded-xl shadow">
            <div className="flex justify-between">
              <div>
                <h2 className="font-bold text-lg">
                  Order ID: {order._id.slice(-6)}
                </h2>

                <p className="text-gray-500">
                  {new Date(order.createdAt).toDateString()}
                </p>
              </div>

              <div>
                <p className="font-semibold">Total Amount : ₹{order.total}</p>
                <p className="mt-2 font-semibold">
                  Status : {order.orderStatus}
                </p>
                {/* <p className="text-sm text-gray-500">
                  {order.paymentStatus}
                </p> */}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {order.items.map((item: any) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-4 border rounded-lg p-3"
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
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
