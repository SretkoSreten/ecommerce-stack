import moment from "moment";
import React from "react";

export const OrderView: React.FC<any> = (props) => {
  const {
    id,
    payment_method,
    order_total,
    shippingMethod,
    orderStatus,
    shipping_address,
    orderLines,
    delivery_date,
    discount_amount,
    final_total
  } = props;
  
  return (
    <div className="w-full max-w-container mx-auto">
      <h2 className="font-manrope font-bold text-2xl leading-10 text-black">
        Your Order {orderStatus.status}
      </h2>
      <div className="grid grid-cols-1 py-5 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="box group">
          <p className="font-normal text-lg leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">
            Delivery Date
          </p>
          <h6 className="font-semibold font-manrope text-lg leading-9 text-black">
            {moment(delivery_date).format("MMM DD, YYYY")}
          </h6>
        </div>
        <div className="box group">
          <p className="font-normal text-lg leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">
            Order
          </p>
          <h6 className="font-semibold font-manrope text-lg leading-9 text-black">
            #{id}
          </h6>
        </div>
        <div className="box group">
          <p className="font-normal text-lg leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">
            Payment Method
          </p>
          <h6 className="font-semibold font-manrope text-lg leading-9 text-black">
            {payment_method ? payment_method.paymentType.value : ""}
          </h6>
        </div>
        <div className="box group">
          <p className="font-normal text-lg leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">
            Address
          </p>
          <h6 className="font-semibold font-manrope text-lg leading-9 text-black">
            {shipping_address ? shipping_address.address_line1 : ""}
          </h6>
        </div>
      </div>
      {orderLines.map(({ id, qty, price, product }: any) => {
        return (
          <div
            key={id}
            className="grid grid-cols-7 pt-5 w-full gap-5 border-b border-gray-100"
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
                  <h5 className="font-manrope font-semibold text-lg leading-9 text-black">
                    {product.product.name}
                  </h5>
                  <p className="font-normal text-base leading-8 text-gray-500">
                    Quantity :{" "}
                    <span className="text-black font-semibold">{qty}</span>
                  </p>
                </div>
                <h5 className="font-manrope font-semibold text-xl leading-10 text-black sm:text-right">
                  ${price}
                </h5>
              </div>
            </div>
          </div>
        );
      })}

      <div className="flex items-center justify-center sm:justify-end w-full my-6">
        <div className=" w-full">
          <div className="flex items-center justify-between">
            <p className="font-normal text-lg leading-8 text-gray-500">
              Subtotal
            </p>
            <p className="font-semibold text-lg leading-8 text-gray-900">
              ${order_total}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-normal text-lg leading-8 text-gray-500">
              Shipping Charge
            </p>
            <p className="font-semibold text-lg leading-8 text-gray-900">
              +${shippingMethod.price}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-normal text-lg leading-8 text-gray-500">
              Discount
            </p>
            <p className="font-semibold text-lg leading-8 text-gray-900">
              -${discount_amount}
            </p>
          </div>
          <div className="flex items-center justify-between py-6 border-y border-gray-100">
            <p className="font-manrope font-semibold text-2xl leading-9 text-gray-900">
              Total
            </p>
            <p className="font-manrope font-bold text-2xl leading-9 text-indigo-600">
              ${final_total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
