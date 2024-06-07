import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";

// function Items({ currentItems }:any) {
//   return (
//     <>
//       {currentItems &&
//         currentItems.map((item:any) => (
//           <div key={item._id} className="w-full">
//             <Product
//               _id={item._id}
//               img={item.img}
//               productName={item.productName}
//               price={item.price}
//               color={item.color}
//               badge={item.badge}
//               des={item.des}
//             />
//           </div>
//         ))}
//     </>
//   );
// }

const Pagination = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const existingParams = Object.fromEntries(searchParams.entries());
    // Update sort state based on query parameter
    const pageValue = existingParams.page ? parseInt(existingParams.page) : 1;
    setPage(pageValue);
    setLoading(false);

  }, [searchParams]);
  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    // Get the existing query parameters
    const existingParams = Object.fromEntries(searchParams.entries());
    existingParams["page"] = event.selected;
    setSearchParams(existingParams);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        {/* <Items currentItems={currentItems} /> */}
      </div>
      {!loading && (
        <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
          <ReactPaginate
            nextLabel=""
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={5}
            previousLabel=""
            initialPage={page}
            pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
            pageClassName="mr-6"
            containerClassName="flex text-base font-semibold font-titleFont py-10"
            activeClassName="bg-black text-white"
          />

          {/* <p className="text-base font-normal text-lightText">
    Products from {itemStart === 0 ? 1 : itemStart} to {endOffset} of{" "}
    {items.length}
  </p> */}
        </div>
      )}
    </div>
  );
};

export default Pagination;
