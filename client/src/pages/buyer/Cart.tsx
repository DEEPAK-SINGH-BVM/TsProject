import React from "react";

const Cart = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* LEFT - STATIC ITEMS */}
        <div className="lg:col-span-2 space-y-4">

          {/* ITEM 1 */}
          <div className="flex items-center bg-white p-4 rounded-xl shadow-sm">
            <img
              src="https://via.placeholder.com/100"
              alt="product"
              className="w-24 h-24 rounded-lg border"
            />

            <div className="ml-4 flex-1">
              <h2 className="font-semibold text-lg">iPhone 14</h2>
              <p className="text-gray-500">₹ 79,999</p>

              {/* STATIC QTY */}
              <div className="flex items-center gap-3 mt-3">
                <button className="w-8 h-8 bg-gray-200 rounded">-</button>
                <span className="font-medium">1</span>
                <button className="w-8 h-8 bg-gray-200 rounded">+</button>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-lg">₹ 79,999</p>
              <button className="text-red-500 text-sm mt-2">
                Remove
              </button>
            </div>
          </div>

          {/* ITEM 2 */}
          <div className="flex items-center bg-white p-4 rounded-xl shadow-sm">
            <img
              src="https://via.placeholder.com/100"
              alt="product"
              className="w-24 h-24 rounded-lg border"
            />

            <div className="ml-4 flex-1">
              <h2 className="font-semibold text-lg">Nike Shoes</h2>
              <p className="text-gray-500">₹ 4,999</p>

              <div className="flex items-center gap-3 mt-3">
                <button className="w-8 h-8 bg-gray-200 rounded">-</button>
                <span className="font-medium">2</span>
                <button className="w-8 h-8 bg-gray-200 rounded">+</button>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-lg">₹ 9,998</p>
              <button className="text-red-500 text-sm mt-2">
                Remove
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT - STATIC SUMMARY */}
        <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2 text-gray-600">
            <span>Subtotal</span>
            <span>₹ 89,997</span>
          </div>

          <div className="flex justify-between mb-2 text-gray-600">
            <span>Delivery Fee</span>
            <span>₹ 50</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹ 90,047</span>
          </div>

          <button className="w-full mt-5 bg-black text-white py-3 rounded-lg hover:bg-gray-800">
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  );
};

export default Cart;