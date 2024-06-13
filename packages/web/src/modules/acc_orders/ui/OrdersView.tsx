import { useDispatch, useSelector } from "react-redux";
import { OrderItem } from "../../../components/acc_orders/OrderItem";
import { useEffect } from "react";
import { fetchAccOrders } from "../../../actions/order.actions";
import { Link, useSearchParams } from "react-router-dom";

export const OrdersView = () => {
  const { loading, data } = useSelector((state: any) => state.accOrders);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch<any>(fetchAccOrders());
  }, []);

  if (!data) return;

  const handleSort = (event: any) => {
    const existingParams = Object.fromEntries(searchParams.entries());
    existingParams["status"] = event.target.value;
    setSearchParams(existingParams);
    dispatch<any>(fetchAccOrders());
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white w-full antialiased">
      {!loading && (
        <div className="mx-auto max-w-container px-4 2xl:px-0">
          <div className="mx-auto">
            <div className="gap-4 sm:flex sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                My orders
              </h2>
              <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                <div>
                  <label
                    htmlFor="order-type"
                    className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select order type
                  </label>
                  <select
                    id="sort"
                    onChange={(e: any) => handleSort(e)}
                    className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  >
                    <option>All orders</option>
                    {data.status.map(({ id, status }: any) => {
                      return (
                        <option key={id} value={status}>
                          {status}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-6 flow-root">
              {data.orders.length == 0 ? (
                <div className="w-full flex justify-center">
                  <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md">
                    <h1 className="font-titleFont text-2xl font-bold">
                      Your order history feels lonely.
                    </h1>
                    <p className="text-md text-center px-10 -mt-2">
                      Your a lives to serve. Give it purpose - fill it with
                      books, electronics, videos, etc. and make it happy.
                    </p>

                    <Link
                      to="/shop"
                      className="bg-black rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300"
                    >
                      Go shopping
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  {data.orders.map((item: any) => {
                    return <OrderItem key={item.id} {...item} />;
                  })}
                </div>
              )}
            </div>
            {/* <nav
     className="mt-6 flex items-center justify-center sm:mt-8"
     aria-label="Page navigation example"
   >
     <ul className="flex h-8 items-center -space-x-px text-sm">
       <li>
         <a
           href="#"
           className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
         >
           <span className="sr-only">Previous</span>
           <svg
             className="h-4 w-4 rtl:rotate-180"
             aria-hidden="true"
             xmlns="http://www.w3.org/2000/svg"
             width={24}
             height={24}
             fill="none"
             viewBox="0 0 24 24"
           >
             <path
               stroke="currentColor"
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth={2}
               d="m15 19-7-7 7-7"
             />
           </svg>
         </a>
       </li>
       <li>
         <a
           href="#"
           className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
         >
           1
         </a>
       </li>
       <li>
         <a
           href="#"
           className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
         >
           2
         </a>
       </li>
       <li>
         <a
           href="#"
           aria-current="page"
           className="z-10 flex h-8 items-center justify-center border border-primary-300 bg-primary-50 px-3 leading-tight text-primary-600 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
         >
           3
         </a>
       </li>
       <li>
         <a
           href="#"
           className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
         >
           ...
         </a>
       </li>
       <li>
         <a
           href="#"
           className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
         >
           100
         </a>
       </li>
       <li>
         <a
           href="#"
           className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
         >
           <span className="sr-only">Next</span>
           <svg
             className="h-4 w-4 rtl:rotate-180"
             aria-hidden="true"
             xmlns="http://www.w3.org/2000/svg"
             width={24}
             height={24}
             fill="none"
             viewBox="0 0 24 24"
           >
             <path
               stroke="currentColor"
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth={2}
               d="m9 5 7 7-7 7"
             />
           </svg>
         </a>
       </li>
     </ul>
   </nav> */}
          </div>
        </div>
      )}
    </section>
  );
};
