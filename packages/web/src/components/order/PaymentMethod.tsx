import React from "react";
import { useDispatch } from "react-redux";
import { deletePayment } from "../../actions/order.actions";
import { useSearchParams } from "react-router-dom";
import { Field } from "formik";
import { CheckField } from "../../modules/shared/CheckField";

export const PaymentMethod: React.FC<any> = (props) => {

  const [, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const { id, paymentType, card_number } = props;

  const handleSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchParams = new URLSearchParams(window.location.search);
    const existingParams = Object.fromEntries(searchParams.entries());
    // Update the sort parameter
    existingParams["payment"] = event.target.value;
    // Update the query parameters
    setSearchParams(existingParams);
  };


  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <Field
            id="paymentMethodId"
            type="radio"
            name="paymentMethodId"
            component={CheckField}
            value={`${id}`}
            className="h-4 w-4 border-gray-300 bg-white text-primary-600"
            onClick={handleSelection}
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
          onClick={() => dispatch<any>(deletePayment(id))}
          type="button"
          className="text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          Delete
        </button>
        <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
};
