import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import { Loading } from "../loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../actions/shop.actions";
import Product from "../product/Product";

function Items({ currentItems }: any) {
  return (
    <>
      {currentItems &&
        currentItems.map((item: any) => (
          <div key={item.id} className="w-full">
            <Product {...item} />
          </div>
        ))}
    </>
  );
}

const Pagination = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.shop);
  const { loading, products } = data;
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch<any>(fetchProducts());
  }, []);
  // Invoke when user click to request another page.

  const handlePageClick = (event: any) => {
    // Get the existing query parameters
    const existingParams = Object.fromEntries(searchParams.entries());
    existingParams["page"] = event.selected;
    setSearchParams(existingParams);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    dispatch<any>(fetchProducts());
  };

  const getCurrentPage = () => {
    const existingParams = Object.fromEntries(searchParams.entries());
    return existingParams["page"] ? parseInt(existingParams["page"]) : 0;
  };

  if (!products) return;

  return (
    <div>
      {loading ? (
        <div className="w-full flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
          <Items currentItems={products.products} />
        </div>
      )}

      {!loading && (
        <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
          <ReactPaginate
            nextLabel=""
            onPageChange={(e) => handlePageClick(e)}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={products.pagination && products.pagination.pageCount}
            previousLabel=""
            initialPage={getCurrentPage()}
            pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
            pageClassName="mr-6"
            containerClassName="flex text-base font-semibold font-titleFont py-10"
            activeClassName="bg-black text-white"
          />

          <p className="text-base font-normal text-lightText">
            Products found: {products.pagination && products.pagination.count}
          </p>
        </div>
      )}
    </div>
  );
};

export default Pagination;
