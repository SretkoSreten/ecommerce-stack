import Banner from "../../../components/banner";
import NewArrivals from "../../../components/arrivals";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../actions";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state: any) => state.home);

  useEffect(() => {
    dispatch<any>(fetchProducts());
  }, []);

  return (
    <div className="mx-auto">
      <div className="md:block hidden">
        <Banner />
      </div>
      <div className="max-w-container mx-auto px-10">
        {!loading && products.data && <NewArrivals products={products.data} />}
      </div>
    </div>
  );
};

export default Home;
