import React from "react";
import { PaymentMethod } from "../../../components/order/PaymentMethod";
import { ShippingMethod } from "../../../components/order/ShippingMethod";
import { AddressBook } from "../../../components/order/AddressBook";
import { Link, useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../shared/PrimaryButton";

export const LeftSide: React.FC<any> = ({
  payments,
  addresses,
  shippingMethods,
  errors,
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-w-0 flex-1 space-y-8">
      <div className="space-y-4">
        {errors.addressId && (
          <div className="text-sm pt-2 rounded-lg text-red-400">
            <span className="font-medium">{errors.addressId}</span>
          </div>
        )}
        <div>
          {addresses && addresses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((address: any) => {
                return <AddressBook key={address.id} {...address} />;
              })}
            </div>
          ) : (
            <Link
              to="/account/book/addresses/create"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700"
            >
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14m-7 7V5"
                />
              </svg>
              Add new address
            </Link>
          )}
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Payment</h3>
        {errors.paymentMethodId && (
          <div className="text-sm pt-2 rounded-lg text-red-400">
            <span className="font-medium">{errors.paymentMethodId}</span>
          </div>
        )}
        <div>
          {payments.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {payments.map((payment: any) => {
                return <PaymentMethod key={payment.id} {...payment} />;
              })}
            </div>
          ) : (
            <div className="py-4">
              <div className="max-w-[500px] space-y-2 rounded-md">
                <h1 className="font-titleFont text-xl font-bold">
                  You don't have any payment method
                </h1>
                <p className="text-base pb-2">
                  Let's give your "lives" plenty of purpose and joy by filling
                  it with a diverse and enriching collection of payment methods.
                </p>
                <PrimaryButton
                  name="Go to account"
                  onClick={() => navigate("/account/payments")}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">
          Delivery Methods
        </h3>
        {errors.shipMethodId && (
          <div className="text-sm pt-2 rounded-lg text-red-400">
            <span className="font-medium">{errors.shipMethodId}</span>
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {shippingMethods &&
            shippingMethods.map((method: any) => {
              return <ShippingMethod key={method.id} {...method} />;
            })}
        </div>
      </div>
    </div>
  );
};
