import Breadcrumbs from "../../../components/breadcrumbs";
import Pagination from "../../../components/shop/Pagination";
import ProductBanner from "../../../components/shop/ProductBanner";
import ShopSideNav from "../../../components/shop/ShopSideNav";

const Shop = () => {
  return (
    <div className="max-w-container px-10 mx-auto">
      <Breadcrumbs title="Products" prevLocation="" />
      {/* ================= Products Start here =================== */}
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lg:w-[25%] hidden md:inline-flex h-full">
          <ShopSideNav />
        </div>

        <div className="w-full md:w-[80%] lg:w-[75%] h-full flex flex-col gap-10">
          <ProductBanner />
          <Pagination />
        </div>
      </div>
      {/* ================= Products End here ===================== */}
    </div>
  );
};

export default Shop;
