import React from "react";
import { useDispatch } from "react-redux";
import { deletePayment, selectPayment } from "../../actions/payments.actions";

export const PaymentMethod: React.FC<any> = (props) => {
  const dispatch = useDispatch();

  const { id, paymentType, card_number, is_default } = props;

  const handleSelection = () => {
    dispatch<any>(selectPayment(id));
  };

  const handleDelete = () => {
    dispatch<any>(deletePayment(id));
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="paymentMethodId"
            type="radio"
            name="paymentMethodId"
            value={`${id}`}
            checked={is_default}
            className="h-4 w-4 border-gray-300 bg-white text-primary-600"
            onChange={() => handleSelection()}
          />
        </div>
        <div className="ms-4 text-sm">
          <label
            htmlFor="paymentMethodId"
            className="font-medium leading-none text-gray-900"
          >
            {paymentType.value} ****{card_number}
          </label>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => handleDelete()}
          type="button"
          className="text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
