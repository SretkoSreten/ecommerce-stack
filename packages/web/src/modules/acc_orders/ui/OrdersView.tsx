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
        <div className="mx-auto max-w-container">
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
                    <option value="">All orders</option>
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
          </div>
        </div>
      )}
    </section>
  );
};
