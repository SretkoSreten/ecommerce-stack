import React from "react";
import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteAddress, selectAddress } from "../../actions/addresses.actions";
import { useNavigate } from "react-router-dom";

export const AddressBook: React.FC<any> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, address, is_default } = props;

  const handleDeleteAddress = () => {
    dispatch<any>(deleteAddress(address.id));
  };

  const handleEditAddress = () => {
    navigate(`/account/book/addresses/edit/${address.id}`);
  };

  const handleDefault = () => {
    dispatch<any>(selectAddress(id));
  }

  return (
    <div
      className={`w-full p-4 bg-white border-2 ${
        is_default ? "border-black" : "border-gray-300"
      } flex space-x-4 rounded-lg shadow`}
    >
      <ul className="w-full">
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
        <li className="flex w-full text-sm justify-between items-center mt-4">
          <div className="flex text-sm gap-4 items-center">
            <button
              type="button"
              onClick={() => handleEditAddress()}
              className="inline-flex items-center text-lg font-medium text-center text-black"
            >
              <FaPencilAlt />
            </button>
            <button
              type="button"
              onClick={() => handleDeleteAddress()}
              className="inline-flex items-center text-lg font-medium text-center text-red-600"
            >
              <FaRegTrashAlt />
            </button>
          </div>
          <button
            type="button"
            onClick={() => handleDefault()}
            className="flex items-center justify-center rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white"
          >
            Set default
          </button>
        </li>
      </ul>
    </div>
  );
};
