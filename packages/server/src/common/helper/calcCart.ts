import { ShippingMethod } from "src/database/entities/ship_method/ship_method.entity";

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
  total: number;
  coupon?: Coupon;
  shipping?: ShippingMethod;
};

export function calcDiscountAmount(total: number, coupon: Coupon): number {
  if (!coupon) {
    return 0;
  }

  const { discountType, discount } = coupon;
  let discountTotal = 0;

  if (discountType === "percentage") {
    discountTotal = (total * discount) / 100;
  } else if (discountType === "fixed_amount") {
    discountTotal = discount;
  }

  if (isNaN(discountTotal) || discountTotal <= 0) {
    return 0;
  }

  // Ensure the discount total is rounded to 2 decimal places
  return Math.round(discountTotal * 100) / 100;
}