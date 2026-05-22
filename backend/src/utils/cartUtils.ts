import Cart from "../models/cart.model";

export const calculateCartTotals = async (userId: string) => {
  const cart = await Cart.find({ userId }).populate({
    path: "productId",
    populate: {
      path: "shopId",
      select: "owner",
    },
  });
  console.log("calculateCartTotalsCart", cart);

  const subtotal = cart?.reduce(
    (acc: number, item: any) => acc + item.productId?.price * item.quantity,
    0,
  );

  const deliveryFee = 0;

  const total = subtotal + deliveryFee;
  return { cart, subtotal, deliveryFee, total };
};
