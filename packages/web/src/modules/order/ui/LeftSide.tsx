import React from "react";
import { PaymentMethod } from "../../../components/order/PaymentMethod";
import { ShippingMethod } from "../../../components/order/ShippingMethod";
import { AddressBook } from "../../../components/order/AddressBook";

export const LeftSide: React.FC<any> = ({
  payments,
  addresses,
  shippingMethods,
  errors,
}) => {
  return (
    <div className="min-w-0 flex-1 space-y-8">
      <div className="space-y-4">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses &&
              addresses.map((address: any) => {
                return <AddressBook key={address.id} {...address} />;
              })}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Payment</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {payments &&
            payments.map((payment: any) => {
              return <PaymentMethod key={payment.id} {...payment} />;
            })}
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
