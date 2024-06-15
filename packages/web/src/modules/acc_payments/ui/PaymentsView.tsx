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
      <div className="grid gap-5 xl:grid-cols-2 py-4 grid-cols-1 w-full">
        <div className="grid w-full grid-cols-1 gap-4">
          {payments &&
            payments.map((payment: any) => {
              return <PaymentMethod key={payment.id} {...payment} />;
            })}
        </div>
        <CreatePayment />
      </div>
    </div>
  );
};
