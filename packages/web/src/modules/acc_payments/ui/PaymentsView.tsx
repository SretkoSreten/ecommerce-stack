import React from "react";
import { PaymentMethod } from "../../../components/payments/PaymentMethod";
import { CreatePayment } from "../create";
import SuccessMsg from "../../shared/SuccessMsg";

export const PaymentsView: React.FC = ({ payments, created }: any) => {
  return (
    <div>
      {created && (
        <SuccessMsg name="Payment" content="is created successfully" />
      )}
      <h3 className="text-xl font-semibold text-gray-900">Payments</h3>
      <div className="grid gap-10 xl:grid-cols-2 py-4 grid-cols-1 w-full">
        <div>
          {payments.length > 0 ? (
            payments.map((payment: any) => {
              return <PaymentMethod key={payment.id} {...payment} />;
            })
          ) : (
            <div>
              <div className="max-w-[500px] space-y-2 rounded-md">
                <h1 className="font-titleFont text-2xl font-bold">
                  You don't have any payment method
                </h1>
                <p className="text-base">
                  Let's give your "lives" plenty of purpose and joy by filling
                  it with a diverse and enriching collection of payment methods.
                </p>
              </div>
            </div>
          )}
        </div>
        <CreatePayment />
      </div>
    </div>
  );
};
