import React from "react";
import { ProductInfoProps } from "./dto/product.dto";
import { useDispatch } from "react-redux";
import { increaseQuantity } from "../../actions/cart.actions";

const ProductInfo: React.FC<ProductInfoProps> = (productInfo) => {
  const dispatch = useDispatch();
  const { product, price, SKU } = productInfo;
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{product.name}</h2>
      <p className="text-xl font-semibold">${price}</p>
      <p className="text-base text-gray-600">{product.description}</p>
      <p className="text-sm">Be the first to leave a review.</p>
      <button
        onClick={() => dispatch<any>(increaseQuantity(productInfo.id))}
        className="w-full py-4 bg-gray-700 hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>
      <div className="space-y-2">
        <p className="font-normal text-sm">
          <span className="text-base font-medium">
            Category: {product.category.category_name}
          </span>
        </p>
        <p className="font-normal text-sm">
          <span className="text-base font-medium"> SKU: {SKU}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;
