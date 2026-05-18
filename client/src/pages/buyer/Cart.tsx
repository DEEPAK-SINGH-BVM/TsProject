import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";

import {
  deleteCartProductAction,
  getCartProductsAction,
  updateCartProductAction,
} from "../../store/feature/cart/cartAction";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { cart, subtotal, deliveryFee, total, loading } = useSelector(
    (state: any) => state.cart,
  );
  console.log("cartData", cart);
  useEffect(() => {
    dispatch(getCartProductsAction());
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">

          {!loading && cart?.length === 0 && (
            <div className="bg-white p-10 rounded-xl text-center shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-700">
                Cart is Empty
              </h2>

              <p className="text-gray-500 mt-2">Add products into cart</p>
            </div>
          )}

          {cart?.map((item: any) => {
            console.log("CartItem", item);

            return (
              <div
                key={item._id}
                className="flex items-center bg-white p-4 rounded-xl shadow-sm"
              >
                <img
                  src={item.productId?.image?.[0]}
                  alt="product"
                  className="w-24 h-24 rounded-lg border object-cover"
                />

                <div className="ml-4 flex-1">
                  <h2 className="font-semibold text-lg">
                    {item.productId?.name}
                  </h2>

                  <p className="text-gray-500">₹ {item.productId?.price}</p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() =>
                        dispatch(
                          updateCartProductAction(
                            item.productId._id,
                            "decrease",
                          ),
                        )
                      }
                    >
                      -
                    </button>

                    <span className="font-medium">{item.quantity}</span>

                    <button
                      className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() =>
                        dispatch(
                          updateCartProductAction(
                            item.productId._id,
                            "increase",
                          ),
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-lg">
                    ₹ {item.productId?.price * item.quantity}
                  </p>

                  <button
                    className="text-red-500 text-sm mt-2 hover:text-red-700"
                    onClick={() => {
                      dispatch(deleteCartProductAction(item.productId._id));
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm h-fit sticky top-5">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2 text-gray-600">
            <span>Subtotal</span>

            <span>₹ {subtotal}</span>
          </div>

          <div className="flex justify-between mb-2 text-gray-600">
            <span>Delivery Charges</span>

            <span>₹ {deliveryFee}</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>

            <span>₹ {total}</span>
          </div>

          <button
            className={`w-full mt-5 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition
              ${
                cart.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            onClick={() => cart.length > 0 && navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
