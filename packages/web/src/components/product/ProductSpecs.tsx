import React from "react";
import { ProductSpecsProps } from "./dto/variation.dto";


export const ProductSpecs: React.FC<ProductSpecsProps> = ({ variations }) => {
  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <table className="w-full border text-base my-10 text-gray-500">
        <tbody>
          {variations.map(({ id, value, variation: { name } }) => (
            <tr key={id} className="border-b border-gray-200 text-left">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-black whitespace-nowrap bg-gray-100"
              >
                {name}
              </th>
              <td className="px-6 py-4 text-black font-medium">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

