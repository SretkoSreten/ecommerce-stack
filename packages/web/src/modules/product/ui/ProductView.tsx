import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/breadcrumbs";
import ProductInfo from "../../../components/product/ProductInfo";
import { ProductSpecs } from "../../../components/product/ProductSpecs";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../../actions/product.actions";
import ProductsOnSale from "../../../components/product/ProductsOnSale";
import { Loading } from "../../../components/loading";

const ProductDetails: React.FC = () => {
  const { loading, data } = useSelector((state: any) => state.product);
  const dispatch = useDispatch();

  const location = useLocation();
  const params = useParams();
  const [prevLocation, setPrevLocation] = useState<string>("");

  useEffect(() => {
    if (!params.id) return;
    dispatch<any>(fetchProduct(params.id));
    setPrevLocation(location.pathname);
  }, [location]);

  if (!data) return;

  const { product, sale } = data;

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      {loading ? (
        <Loading/>
      ) : (
        <div className="mx-auto px-10">
          <div>
            <Breadcrumbs title="Product" prevLocation={prevLocation} />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full bg-gray-100">

            <div className="h-full xl:col-span-2">
              <img
                className="h-full object-cover"
                src={product.product_image}
              />
            </div>
            <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
              <ProductInfo {...product} />
            </div>
          </div>
          {product.variations.length && (
            <ProductSpecs variations={product.variations} />
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
