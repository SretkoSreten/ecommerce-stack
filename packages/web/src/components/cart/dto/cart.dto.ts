export type Item = {
  qty: number;
  productItem: {
    price: number;
  };
};

export type Coupon = {
  discountType: "percentage" | "fixed_amount";
  discount: number;
};

export type Delivery = {
  id: number;
  name: string;
  price: number;
};

export type Cart = {
  items: Item[];
  delivery?: Delivery;
  coupon?: Coupon;
};
