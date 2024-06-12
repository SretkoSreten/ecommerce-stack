import { useDispatch, useSelector } from "react-redux";
import { AddressBook } from "../../../components/addresses/AddressBook";
import { useEffect } from "react";
import { fetchAddresses } from "../../../actions/addresses.actions";
import { Link } from "react-router-dom";

export const AddressView = () => {
  const { loading, data } = useSelector((state: any) => state.addresses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(fetchAddresses());
  }, []);

  if (!data) return;

  return (
    <div className="w-full">
      {!loading && (
        <div>
          {data.length > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {data.map((address: any) => {
                  return <AddressBook key={address.id} {...address} />;
                })}
              </div>
              <Link
                to="/account/book/addresses/create"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700"
              >
                <svg
                  className="h-5 w-5"
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
                    d="M5 12h14m-7 7V5"
                  />
                </svg>
                Add new address
              </Link>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md">
                <h1 className="font-titleFont text-2xl font-bold">
                  Your address book feels lonely.
                </h1>
                <p className="text-md text-center px-10 -mt-2">
                  Your a lives to serve. Give it purpose - fill it with books,
                  electronics, videos, etc. and make it happy.
                </p>

                <Link
                  to="/account/book/addresses/create"
                  className="bg-black rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300"
                >
                  Create Address
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
