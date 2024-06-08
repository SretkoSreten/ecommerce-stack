import { useEffect } from "react";
import Category from "./shopBy/Category";
import Price from "./shopBy/Price";
import { useDispatch, useSelector } from "react-redux";
import { fetchSideNav } from "../../actions/shop.actions";
import Variation from "./shopBy/Variation";
import { priceList } from "../../constants";

const ShopSideNav = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state: any) => state.shop);

  useEffect(() => {
    dispatch<any>(fetchSideNav());
  }, []);

  if (!data) return;
  
  return (
    <div className="w-full">
      {!loading && (
        <div className="w-full flex flex-col gap-6">
          <Category categories={data.categories} />
          {data.variations &&
            data.variations.map(({ id, options, name }: any) => {
              return <Variation key={id} options={options} name={name} />;
            })}
          <Price priceList={priceList} />
        </div>
      )}
    </div>
  );
};

export default ShopSideNav;
