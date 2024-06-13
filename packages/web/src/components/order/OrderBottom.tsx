import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  calcDiscountAmount,
  calcWithShippingPrice,
  subtractPrice,
} from "../../common/helpers/cart.helper";
import { OrderBottomProps } from "./dto/order.dto";

export const OrderBottom: React.FC<OrderBottomProps> = ({ data, shippingMethods }) => {
  const [searchParams] = useSearchParams();
  const [shipPrice, setShipPrice] = useState<number | null>(null);

  useEffect(() => {
    const shippingID = searchParams.get('shipping');
    if (shippingID && shippingMethods) {
      const shipping = shippingMethods.find((ship) => ship.id == shippingID);
      if (shipping) {
        setShipPrice(shipping.price);
      } else {
        setShipPrice(0); 
      }
    }
  }, [searchParams, shippingMethods]);

  if (!data) return null;

  const total = subtractPrice(data);
  const discountAmount = calcDiscountAmount(data);
  const finalTotal = calcWithShippingPrice(data, shipPrice ?? 0);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500">
                  Original price
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  ${total.toFixed(2)}
                </dd>
              </dl>
              {data.coupon && (
                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500">
                    Savings
                  </dt>
                  <dd className="text-base font-medium text-green-600">
                    -${discountAmount.toFixed(2)}
                  </dd>
                </dl>
              )}
              {shipPrice !== null && (
                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500">
                    Delivery
                  </dt>
                  {shipPrice === 0 ? (
                    <dd className="text-base font-medium text-green-600">
                      Free
                    </dd>
                  ) : (
                    <dd className="text-base font-medium text-red-600">
                      +${shipPrice.toFixed(2)}
                    </dd>
                  )}
                </dl>
              )}
            </div>
            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
              <dt className="text-base font-bold text-gray-900">Total</dt>
              <dd className="text-base font-bold text-gray-900">
                ${finalTotal.toFixed(2)}
              </dd>
            </dl>
          </div>
          <button
            type="submit"
            className="flex w-full uppercase items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800"
          >
            Complete order
          </button>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              or
            </span>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
            >
              Continue Shopping
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};