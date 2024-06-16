import Breadcrumbs from "../../../components/breadcrumbs";
import Pagination from "../../../components/shop/Pagination";
import ProductBanner from "../../../components/shop/ProductBanner";
import ShopSideNav from "../../../components/shop/ShopSideNav";

const Shop = () => {
  return (
    <div className="max-w-container p-10 mx-auto">
      <div className="py-4">
        <Breadcrumbs title="Products" prevLocation="" />
      </div>
      {/* ================= Products Start here =================== */}
      <div className="w-full flex lg:flex-row flex-col gap-10">
        <div className="lg:w-[25%] w-full md:inline-flex h-full">
          <ShopSideNav />
        </div>

        <div className="lg:w-[80%] w-full flex flex-col gap-10">
          <ProductBanner />
          <Pagination />
        </div>
      </div>
      {/* ================= Products End here ===================== */}
    </div>
  );
};

export default Shop;
