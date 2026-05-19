import { useEffect, useState } from "react";
import {
  FiShoppingBag,
  FiMapPin,
  FiCreditCard,
  FiTruck,
  FiCheckCircle,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";
import { getCartProductsAction } from "../../store/feature/cart/cartAction";
import { AppDispatch } from "../../store";
import { createOrderAction } from "../../store/feature/order/orderAction";
import { toast } from "react-toastify";
import axios from "axios";
const Checkout = () => {
  const location = useLocation();

  const buyNowProduct: any = location.state;
  console.log("SingleStateProduct", buyNowProduct);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { cart, subtotal, deliveryFee, total } = useSelector(
    (state: any) => state.cart,
  );
  console.log("CheckoutCart", cart);
  console.log("CheckOutSubtotal", subtotal);

  // const isBuyNow = buyNowProduct? true : false;
  // const productToShow = isBuyNow ? buyNowProduct : cart;

  const products = buyNowProduct
    ? [{ ...buyNowProduct, quantity: 1 }]
    : cart.map((item: any) => ({ ...item.productId, quantity: item.quantity }));
  console.log(products, "productsProducts");

  const subtotalProduct = buyNowProduct ? buyNowProduct.price : subtotal;
  const deliveryFeeProduct = buyNowProduct ? 50 : deliveryFee;
  const totalProduct = buyNowProduct ? buyNowProduct.price + 50 : total;

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "Online">("COD");
  console.log("CheckoutpayMentMethod", paymentMethod);

  useEffect(() => {
    if (!buyNowProduct) {
      dispatch(getCartProductsAction());
    }
  }, [dispatch, buyNowProduct]);

  const orderItems = products.map((product: any) => ({
    productId: product._id,
    sellerId: product.shopId,
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    image: product.image[0],
  }));
  console.log("orderItems", orderItems);

  // const orderItems = isBuyNow
  //   ? [
  //       {
  //         productId: buyNowProduct._id,
  //         sellerId: buyNowProduct.sellerId,
  //         name: buyNowProduct.name,
  //         price: buyNowProduct.price,
  //         quantity: 1,
  //         image: buyNowProduct.image[0],
  //       },
  //     ]
  //   : cart.map((item: any) => ({
  //       productId: item.productId._id,
  //       sellerId: item.productId.sellerId,
  //       name: item.productId.name,
  //       price: item.productId.price,
  //       quantity: item.quantity,
  //       image: item.productId.image[0],
  //     }));

  const makePayment = async () => {
    try {
      const body = {
        products: orderItems,
      };

      const response = await axios.post(
        "http://localhost:1001/cart/create-checkout-session",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("ResponseStripe", response);

      const session = response.data;
      console.log("SessionData", session);

      if (session.url) {
        window.location.href = session.url;
      } else {
        console.error(
          "Session URL missing. Ensure your backend returns response.url",
        );
        alert("Payment redirect failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment Not working");
    }
  };

  const handlePlaceOrder = async () => {
    try {
      if (!fullName || !phone || !city || !stateName || !address) {
        toast.error("Please fill all delivery fields");
        return;
      }
      if (orderItems.length === 0) {
        toast.error("Cart is empty");
        return;
      }
      const orderData = {
        items: orderItems,
        deliveryAddress: {
          fullName: fullName,
          phone: phone,
          city: city,
          state: stateName,
          address: address,
        },
        paymentMethod: paymentMethod,
        subtotal: subtotalProduct,
        deliveryFee: deliveryFeeProduct,
        total: totalProduct,
      };

      await dispatch(createOrderAction(orderData));

      if (paymentMethod === "COD") {
        toast("Order Place Successfully !!");
        navigate("/invoice", { state: orderData });
        navigate("/my-orders");
      } else {
        toast("Rediret to payment page");
        await makePayment();
      }
    } catch (error) {
      console.log("Order failed:", error);
      alert("Order Fail , something was Wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>

        <p className="text-gray-500 mt-1">Complete your order securely</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-gray-100 p-3 rounded-xl">
                <FiMapPin className="text-2xl text-gray-700" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Delivery Address
                </h2>

                <p className="text-sm text-gray-500">
                  Enter your shipping details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="border border-gray-200 rounded-xl p-3 outline-none"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="border border-gray-200 rounded-xl p-3 outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <input
                type="text"
                placeholder="City"
                className="border border-gray-200 rounded-xl p-3 outline-none"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <input
                type="text"
                placeholder="State"
                className="border border-gray-200 rounded-xl p-3 outline-none"
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
              />

              <textarea
                placeholder="Full Address"
                className="border border-gray-200 rounded-xl p-3 outline-none sm:col-span-2 h-28 resize-none"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          {/* PAYMENT */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-gray-100 p-3 rounded-xl">
                <FiCreditCard className="text-2xl text-gray-700" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Payment Method
                </h2>

                <p className="text-sm text-gray-500">Select payment option</p>
              </div>
            </div>

            {/* COD */}
            <div className="space-y-5">
              <div
                className={`border border-gray-200 rounded-xl p-4 flex items-center justify-between cursor-pointer  ${
                  paymentMethod === "COD" ? "border-2 border-gray-500" : ""
                }`}
                onClick={() => setPaymentMethod("COD")}
              >
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Cash on Delivery
                  </h3>
                  <p className="text-sm text-gray-500">
                    Pay after receiving order
                  </p>
                </div>
                <FiTruck className="text-2xl text-gray-700" />
              </div>

              {/* Online */}
              <div
                className={`border border-gray-200 rounded-xl p-4 flex items-center justify-between cursor-pointer ${
                  paymentMethod === "Online" ? "border-2 border-gray-500" : ""
                }`}
                onClick={() => setPaymentMethod("Online")}
              >
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Online Payment
                  </h3>
                  <p className="text-sm text-gray-500">
                    UPI / Card / Net Banking
                  </p>
                </div>
                <FiCreditCard className="text-2xl text-gray-700" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 h-fit sticky top-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gray-100 p-3 rounded-xl">
              <FiShoppingBag className="text-2xl text-gray-700" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Order Summary
              </h2>

              <p className="text-sm text-gray-500">Review your product</p>
            </div>
          </div>

          {/* PRODUCTS */}
          {buyNowProduct ? (
            <div className="flex gap-4 border border-gray-100 rounded-2xl p-3">
              <img
                src={buyNowProduct?.image?.[0]}
                alt={buyNowProduct?.name}
                className="w-24 h-24 rounded-xl object-cover border"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {buyNowProduct?.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {buyNowProduct?.category}
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-3">
                  ₹{buyNowProduct?.price}
                </h2>
              </div>
            </div>
          ) : (
            <div className="space-y-4 max-h-[330px] overflow-y-auto">
              {products?.map((item: any) => (
                <div
                  key={item._id}
                  className="flex gap-4 border border-gray-100 rounded-2xl p-3"
                >
                  <img
                    src={item?.image?.[0]}
                    alt={item?.name}
                    className="w-24 h-24 rounded-xl object-cover border"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {item?.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Qty : {item.quantity}
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-3">
                      ₹{item?.price * item.quantity}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PRICE DETAILS */}
          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>

              <span>₹{subtotalProduct}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Delivery Charges</span>

              <span>₹{deliveryFeeProduct}</span>
            </div>

            <div className="border-t pt-4 flex justify-between">
              <span className="text-lg font-semibold text-gray-900">Total</span>

              <span className="text-2xl font-bold text-gray-900">
                ₹{totalProduct}
              </span>
            </div>
          </div>

          {/* BUTTON */}
          <button
            className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
            onClick={handlePlaceOrder}
          >
            <FiCheckCircle className="text-xl" />
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
