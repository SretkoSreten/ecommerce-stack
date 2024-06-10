import React from "react";
import { Link } from "react-router-dom";

export const OrderItem: React.FC<any> = (props) => {
  const { qty, productItem } = props;
  const { product_image, price, id, product } = productItem;

  return (
    <tr>
      <td className="whitespace-nowrap py-4 w-full">
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="flex items-center aspect-square w-10 h-10 shrink-0"
          >
            <img
              className="h-auto w-full max-h-full"
              src={product_image}
              alt="imac image"
            />
          </a>
          <Link to={`/products/${id}`} className="text-black hover:underline">
            {product.name}
          </Link>
        </div>
      </td>
      <td className="p-4 text-base font-normal text-gray-900">x{qty}</td>
      <td className="p-4 text-right text-base font-bold text-gray-900">
        ${price}
      </td>
    </tr>
  );
};
