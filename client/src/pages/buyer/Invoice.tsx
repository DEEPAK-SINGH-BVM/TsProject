import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Invoice = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const order: any = location.state;

  console.log("InvoiceOrder", order);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">No Invoice Data Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-5">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Invoice
            </h1>

            <p className="text-gray-500 mt-2">
              Order Successfully Placed
            </p>
          </div>

          <button
            onClick={() => navigate("/home")}
            className="bg-black text-white px-5 py-2 rounded-xl"
          >
            Back Home
          </button>
        </div>

        {/* CUSTOMER DETAILS */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Customer Details
            </h2>

            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Name :</span>{" "}
                {order?.deliveryAddress?.fullName}
              </p>

              <p>
                <span className="font-semibold">Phone :</span>{" "}
                {order?.deliveryAddress?.phone}
              </p>

              <p>
                <span className="font-semibold">City :</span>{" "}
                {order?.deliveryAddress?.city}
              </p>

              <p>
                <span className="font-semibold">State :</span>{" "}
                {order?.deliveryAddress?.state}
              </p>

              <p>
                <span className="font-semibold">Address :</span>{" "}
                {order?.deliveryAddress?.address}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">
              Payment Details
            </h2>

            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">
                  Payment Method :
                </span>{" "}
                {order?.paymentMethod}
              </p>

              <p>
                <span className="font-semibold">
                  Order Status :
                </span>{" "}
                Pending
              </p>
            </div>
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-5">
            Product Details
          </h2>

          <div className="space-y-5">
            {order?.items?.map((item: any, index: number) => (
              <div
                key={index}
                className="flex items-center gap-5 border rounded-2xl p-4"
              >
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="w-24 h-24 rounded-xl object-cover border"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    {item?.name}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Quantity : {item?.quantity}
                  </p>

                  <p className="text-gray-500">
                    Price : ₹{item?.price}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    ₹{item?.price * item?.quantity}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TOTAL */}
        <div className="mt-10 border-t pt-6">
          <div className="space-y-3 max-w-sm ml-auto">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>

              <span>₹{order?.subtotal}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>

              <span>₹{order?.deliveryFee}</span>
            </div>

            <div className="flex justify-between text-2xl font-bold border-t pt-4">
              <span>Total</span>

              <span>₹{order?.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;