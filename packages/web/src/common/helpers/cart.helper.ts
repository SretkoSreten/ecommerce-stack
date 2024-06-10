import { Cart } from "../../components/cart/dto/cart.dto";

export function subtractPrice({ items }: Cart): number {
  if (!items) return 0;

  const totalSum = items.reduce(
    (sum, item) => sum + item.qty * item.productItem.price,
    0
  );
  return parseFloat(totalSum.toFixed(2));
}

export function calcDiscountAmount({ items, coupon }: Cart): number {
  const total = subtractPrice({ items });

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

export function calcTotalPrice({ items, coupon, delivery }: Cart): number {
  const deliveryPrice = delivery ? delivery.price : 0;
  const total = subtractPrice({ items });

  if (!coupon) {
    return total;
  }

  const discountTotal = calcDiscountAmount({ items, coupon });
  const discountedTotal = total - discountTotal + deliveryPrice;

  return discountedTotal > 0 ? parseFloat(discountedTotal.toFixed(2)) : 0;
}
