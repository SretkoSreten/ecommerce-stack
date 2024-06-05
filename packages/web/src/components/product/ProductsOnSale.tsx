import React from "react";
import { NewArrivalsProps, ProductDto } from "./dto/product.dto";

const ProductsOnSale: React.FC<NewArrivalsProps> = ({ products }) => {
  return (
    <div>
      <h3 className="font-titleFont text-xl font-semibold mb-6 underline underline-offset-4 decoration-[1px]">
        Products on sale
      </h3>
      <div className="flex flex-col gap-2">
        {products &&
          products.map((item: ProductDto) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b-[1px] border-b-gray-300 py-2"
            >
              <div>
                <img
                  className="w-24"
                  src={item.product_image}
                  alt={item.product_image}
                />
              </div>
              <div className="flex flex-col gap-2 font-titleFont">
                <p className="text-base font-medium">{item.product.name}</p>
                <p className="text-sm font-semibold">${item.price}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductsOnSale;
