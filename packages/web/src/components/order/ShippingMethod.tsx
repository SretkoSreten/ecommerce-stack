import React from "react";
import { Field } from "formik";
import { useSearchParams } from "react-router-dom"; // Assuming you are using react-router for navigation
import { CheckField } from "../../modules/shared/CheckField";

export const ShippingMethod: React.FC<any> = (props) => {
  const [, setSearchParams] = useSearchParams();
  const { id, name, price } = props;

  const handleSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchParams = new URLSearchParams(window.location.search);
    const existingParams = Object.fromEntries(searchParams.entries());
    // Update the sort parameter
    existingParams["shipping"] = event.target.value;
    // Update the query parameters
    setSearchParams(existingParams);
  };

  return (
    <div id="shipping" className="shipping rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <Field
            id={`shipMethodId-${id}`}
            type="radio"
            name="shipMethodId"
            value={`${id}`}
            component={CheckField}
            className="h-4 w-4 border-gray-300 bg-white text-primary-600"
            onClick={handleSelection}
          />
        </div>
        <div className="ms-4 text-sm">
          <label
            htmlFor={`shipMethodId-${id}`}
            className="font-medium leading-none text-gray-900"
          >
            ${price} - {name}
          </label>
        </div>
      </div>
    </div>
  );
};
