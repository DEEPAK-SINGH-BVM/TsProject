// order
export const getTotalProducts = (products: any[] | undefined) =>
  products?.length || 0;

export const getTotalOrders = (orders: any[] | undefined) =>
  orders?.length || 0;

export const getTotalEarnings = (orders: any[] | undefined) =>
  orders?.reduce((sum: number, order: any) => sum + order.total || 0, 0);
