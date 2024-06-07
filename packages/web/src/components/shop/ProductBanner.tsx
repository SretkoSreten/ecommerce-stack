import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BsGridFill } from "react-icons/bs";
import { ImList } from "react-icons/im";
import { GoTriangleDown } from "react-icons/go";

const ProductBanner = () => {
  const [sortValue, setSortValue] = useState("Best Sellers");
  const [pageSize, setPageSize] = useState(12);
  const [girdViewActive, setGridViewActive] = useState(true);
  const [listViewActive, setListViewActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const existingParams = Object.fromEntries(searchParams.entries());

    // Update sort state based on query parameter
    const sortValue = existingParams.sort || "Best Sellers"; // Default to 'Best Sellers' if not found
    setSortValue(sortValue);

    // Update page size state based on query parameter
    const pageSize = parseInt(existingParams.pageSizes);
    if (!isNaN(pageSize)) {
      setPageSize(pageSize);
    }

    // Update view state based on query parameter
    if (existingParams.view === "grid") {
      setGridViewActive(true);
      setListViewActive(false);
    } else if (existingParams.view === "list") {
      setGridViewActive(false);
      setListViewActive(true);
    }

    const gridView: any = document.querySelector(".gridView");
    const listView: any = document.querySelector(".listView");

    gridView.addEventListener("click", () => {
      setListViewActive(false);
      setGridViewActive(true);
      const existingParams = Object.fromEntries(searchParams.entries());
      existingParams["view"] = "grid";
      setSearchParams(existingParams);
    });
    listView.addEventListener("click", () => {
      setGridViewActive(false);
      setListViewActive(true);
      const existingParams = Object.fromEntries(searchParams.entries());
      existingParams["view"] = "list";
      setSearchParams(existingParams);
    });
  }, [searchParams]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortValue = e.target.value;
    setSortValue(newSortValue);

    // Get the existing query parameters
    const existingParams = Object.fromEntries(searchParams.entries());

    // Update the sort parameter
    existingParams["sort"] = newSortValue;

    // Update the query parameters
    setSearchParams(existingParams);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = parseInt(e.target.value);
    setPageSize(newPageSize);

    // Get the existing query parameters
    const existingParams = Object.fromEntries(searchParams.entries());

    // Update the pageSizes parameter
    existingParams["pageSizes"] = newPageSize.toString();

    // Update the query parameters
    setSearchParams(existingParams);
  };

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between">
      <div className="flex items-center gap-4">
        <span
          className={`${
            girdViewActive
              ? "bg-primeColor text-white"
              : "border-[1px] border-gray-300 text-[#737373]"
          } w-8 h-8 text-lg flex items-center justify-center cursor-pointer gridView`}
        >
          <BsGridFill />
        </span>
        <span
          className={`${
            listViewActive
              ? "bg-primeColor text-white"
              : "border-[1px] border-gray-300 text-[#737373]"
          } w-8 h-8 text-base flex items-center justify-center cursor-pointer listView`}
        >
          <ImList />
        </span>
      </div>

      <div className="flex items-center gap-2 md:gap-6 mt-4 md:mt-0">
        <div className="flex items-center gap-2 text-base text-[#767676] relative">
          <label className="block">Sort by:</label>
          <select
            value={sortValue}
            onChange={handleSortChange}
            id="sort"
            className="w-32 md:w-52 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
          >
            <option value="Best Sellers">Best Sellers</option>
            <option value="New Arrival">New Arrival</option>
            <option value="Featured">Featured</option>
            <option value="Final Offer">Final Offer</option>
          </select>
          <span className="absolute text-sm right-2 md:right-4 top-2.5">
            <GoTriangleDown />
          </span>
        </div>
        <div className="flex items-center gap-2 text-[#767676] relative">
          <label className="block">Show:</label>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            id="pageSizes"
            className="w-16 md:w-20 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
          >
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="36">36</option>
            <option value="48">48</option>
          </select>
          <span className="absolute text-sm right-3 top-2.5">
            <GoTriangleDown />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;
