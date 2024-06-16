import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  calcDiscountAmount,
  subtractPrice,
} from "../../common/helpers/cart.helper";
import { OrderBottomProps } from "./dto/order.dto";
import { LoadingButton } from "../../modules/shared/LoadingButton";

export const OrderBottom: React.FC<OrderBottomProps> = ({
  data,
  shippingMethods,
  creating
}) => {
  const [searchParams] = useSearchParams();
  const [shipPrice, setShipPrice] = useState<any>(0);

  if (!data) return;

  useEffect(() => {
    const shippingID = searchParams.get("shipping");
    if (shippingID && shippingMethods) {
      const shipping = shippingMethods.find((ship) => ship.id == shippingID);
      if (shipping) {
        setShipPrice(shipping.price);
      }
    }
    
  }, [searchParams]);

  const total = subtractPrice(data);
  const discountAmount = calcDiscountAmount(data);
  const finalTotal = total - discountAmount + parseFloat(shipPrice);

  const formattedPrice = typeof shipPrice === 'number' ? shipPrice.toFixed(2) : shipPrice;

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
                  <dd className="text-base font-medium text-red-600">
                    +${formattedPrice}
                  </dd>
                </dl>
              )}
            </div>
            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
              <dt className="text-base font-bold text-gray-900">Total</dt>
              <dd className="text-base font-bold text-gray-900">
                ${finalTotal}
              </dd>
            </dl>
          </div>
          <LoadingButton name="Complete Order" creating={creating} />
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
