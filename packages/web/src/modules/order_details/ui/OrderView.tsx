import React from "react";

// cart.helper.ts
export const subtractPrice = (orderLines: any[]): number => {
  return orderLines.reduce((total, orderLine) => {
    return total + parseInt(orderLine.price);
  }, 0);
};

export function calcDiscountAmount(total: number, coupon: any): number {
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

export const OrderView: React.FC<any> = (props) => {
  const {
    id,
    payment_method,
    order_total,
    shippingMethod,
    orderStatus,
    shipping_address,
    orderLines,
    coupon,
  } = props;

  // Calculate subtotal
  const subtotal = subtractPrice(orderLines);

  // Calculate discount from coupon
  const discount = calcDiscountAmount(subtotal, coupon);

  return (
    <div className="w-full max-w-container mx-auto">
      <h2 className="font-manrope font-bold text-3xl sm:text-4xl leading-10 text-black mb-11">
        Your Order {orderStatus.status}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 border-y border-gray-100 mb-6">
        <div className="box group">
          <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
            Delivery Date
          </p>
          <h6 className="font-semibold font-manrope text-2xl leading-9 text-black">
            Dec 01, 2023
          </h6>
        </div>
        <div className="box group">
          <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
            Order
          </p>
          <h6 className="font-semibold font-manrope text-2xl leading-9 text-black">
            #{id}
          </h6>
        </div>
        <div className="box group">
          <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
            Payment Method
          </p>
          <h6 className="font-semibold font-manrope text-2xl leading-9 text-black">
            {payment_method.provider}
          </h6>
        </div>
        <div className="box group">
          <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
            Address
          </p>
          <h6 className="font-semibold font-manrope text-2xl leading-9 text-black">
            {shipping_address.address_line1}
          </h6>
        </div>
      </div>
      {orderLines.map(({ id, qty, price, product }: any) => {
        return (
          <div
            key={id}
            className="grid grid-cols-7 w-full py-6 border-b border-gray-100"
          >
            <div className="col-span-7 min-[500px]:col-span-2 md:col-span-1">
              <img
                src={product.product_image}
                alt={product.product_image}
                className="w-full"
              />
            </div>
            <div className="col-span-7 min-[500px]:col-span-5 md:col-span-6 min-[500px]:pl-5 max-sm:mt-5 flex flex-col justify-center">
              <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center justify-between">
                <div className="">
                  <h5 className="font-manrope font-semibold text-2xl leading-9 text-black mb-6">
                    {product.product.name}
                  </h5>
                  <p className="font-normal text-xl leading-8 text-gray-500">
                    Quantity :{" "}
                    <span className="text-black font-semibold">{qty}</span>
                  </p>
                </div>
                <h5 className="font-manrope font-semibold text-3xl leading-10 text-black sm:text-right mt-3">
                  ${price}
                </h5>
              </div>
            </div>
          </div>
        );
      })}

      <div className="flex items-center justify-center sm:justify-end w-full my-6">
        <div className=" w-full">
          <div className="flex items-center justify-between mb-6">
            <p className="font-normal text-xl leading-8 text-gray-500">
              Subtotal
            </p>
            <p className="font-semibold text-xl leading-8 text-gray-900">
              ${subtotal}
            </p>
          </div>
          <div className="flex items-center justify-between mb-6">
            <p className="font-normal text-xl leading-8 text-gray-500">
              Shipping Charge
            </p>
            <p className="font-semibold text-xl leading-8 text-gray-900">
              -${shippingMethod.price}
            </p>
          </div>
          <div className="flex items-center justify-between mb-6">
            <p className="font-normal text-xl leading-8 text-gray-500">
              Discount
            </p>
            <p className="font-semibold text-xl leading-8 text-gray-900">
              ${discount}
            </p>
          </div>
          <div className="flex items-center justify-between py-6 border-y border-gray-100">
            <p className="font-manrope font-semibold text-2xl leading-9 text-gray-900">
              Total
            </p>
            <p className="font-manrope font-bold text-2xl leading-9 text-indigo-600">
              ${order_total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
