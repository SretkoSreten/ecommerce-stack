import React from "react";
import { AddressProps } from "./dto/order.dto";
import { Field } from "formik";
import { CheckField } from "../../modules/shared/CheckField";
import { useSearchParams } from "react-router-dom";

export const AddressBook: React.FC<AddressProps> = (props) => {

  const [, setSearchParams] = useSearchParams();

  const { id, address } = props;

  const handleSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchParams = new URLSearchParams(window.location.search);
    const existingParams = Object.fromEntries(searchParams.entries());
    // Update the sort parameter
    existingParams["address"] = event.target.value;
    // Update the query parameters
    setSearchParams(existingParams);
  };

  return (
    <div
      id={`address-${id}`}
      className={`w-full p-4 bg-white border-2 border-gray-200 flex space-x-4 rounded-lg shadow`}
    >
      <div className="flex h-5 items-center">
        <Field
          id="addressId"
          type="radio"
          name="addressId"
          value={`${id}`}
          component={CheckField}
          className="h-4 w-4 border-gray-300 bg-white text-primary-600"
          onClick={handleSelection}
        />
      </div>
      <ul role="list">
        <li className="flex text-sm items-center space-x-2">
          <span>Address:</span>
          <span className="font-normal leading-tight text-gray-500">
            {address.address_line1}
          </span>
        </li>
        <li className="flex text-sm items-center space-x-2">
          <span>City:</span>
          <span className="font-normal leading-tight text-gray-500">
            {address.city}
          </span>
        </li>
        <li className="flex text-sm items-center space-x-2">
          <span>Postal code:</span>
          <span className="font-normal leading-tight text-gray-500">
            {address.postal_code}
          </span>
        </li>
        <li className="flex text-sm items-center space-x-2">
          <span>Region:</span>
          <span className="font-normal leading-tight text-gray-500">
            {address.region}
          </span>
        </li>
        <li className="flex text-sm items-center space-x-2">
          <span>Street number:</span>
          <span className="font-normal leading-tight text-gray-500">
            {address.street_number}
          </span>
        </li>
        <li className="flex text-sm items-center space-x-2">
          <span>Unit number:</span>
          <span className="font-normal leading-tight text-gray-500">
            {address.unit_number}
          </span>
        </li>
      </ul>
    </div>
  );
};
