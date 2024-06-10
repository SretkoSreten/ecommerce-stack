import React from "react";
import { Link } from "react-router-dom";
import {
  calcDiscountAmount,
  calcTotalPrice,
  subtractPrice,
} from "../../common/helpers/cart.helper";

export const CartBottom: React.FC<any> = ({ data }) => {

  if (!data) return;

  return (
    <div className="md:max-w-96 w-full flex flex-col gap-4">
      <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 sm:mt-0 sm:w-full">
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500">
                  Original price
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  ${subtractPrice(data)}
                </dd>
              </dl>
              {data.coupon && (
                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500">
                    Savings
                  </dt>
                  <dd className="text-base font-medium text-green-600">
                    -${calcDiscountAmount(data)}
                  </dd>
                </dl>
              )}
            </div>
            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
              <dt className="text-base font-bold text-gray-900">Total</dt>
              <dd className="text-base font-bold text-gray-900">
                ${calcTotalPrice(data)}
              </dd>
            </dl>
          </div>
          <Link
            to="/order"
            className="flex w-full uppercase items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800"
          >
            Proceed to Checkout
          </Link>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              or
            </span>
            <Link
              to="/shop"
              title=""
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
            >
              Continue Shopping
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
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
