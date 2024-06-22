import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/breadcrumbs";
import ProductInfo from "../../../components/product/ProductInfo";
import { ProductSpecs } from "../../../components/product/ProductSpecs";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../../actions/product.actions";
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

  const { product } = data;

  return (
    <div className="max-w-container w-full mx-auto border-b-[1px] border-b-gray-300">
      {loading ? (
        <Loading />
      ) : (
        <div className="mx-auto p-10">
          <div className="py-4">
            <Breadcrumbs title="Product" prevLocation={prevLocation} />
          </div>
          <div className="mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
              <div className="lg:col-span-2">
                <img
                  className="h-full object-cover"
                  src={product.product_image}
                />
              </div>
              <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-6 justify-center">
                <ProductInfo {...product} />
              </div>
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
