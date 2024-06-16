import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { cancelOrder, orderAgain } from "../../actions/order.actions";
import { StatusType } from "../../constants/status.constants";
import { Link } from "react-router-dom";

export const OrderItem: React.FC<any> = (props) => {
  const dispatch = useDispatch();
  const { id, order_total, order_date, orderStatus, coupon } = props;

  const handleCancel = () => {
    dispatch<any>(cancelOrder(id));
  };

  const handleOrder = () => {
    dispatch<any>(orderAgain(id))
  }

  return (
    <div className="divide-y divide-gray-200">
      <div className="flex flex-wrap gap-4 items-center gap-y-4 py-6">
        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
          <dt className="text-base font-medium text-gray-500">Order ID:</dt>
          <dd className="mt-1.5 text-base font-semibold text-gray-900">
            <a href="#" className="hover:underline">
              #{id}
            </a>
          </dd>
        </dl>
        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
          <dt className="text-base font-medium text-gray-500">Date:</dt>
          <dd className="mt-1.5 text-base font-semibold text-gray-900">
            {moment(order_date).format("DD.MM.YYYY")}
          </dd>
        </dl>
        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
          <dt className="text-base font-medium text-gray-500">Price:</dt>
          <dd className="mt-1.5 text-base font-semibold text-gray-900">
            ${order_total}
          </dd>
        </dl>
        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
          <dt className="text-base font-medium text-gray-500">Coupon:</dt>
          <dd className="mt-1.5 text-base font-semibold text-gray-900">
            {coupon ? (
              <p className="text-green-600">Active</p>
            ) : (
              <p className="text-red-600">Not active</p>
            )}
          </dd>
        </dl>
        <dl className="lg:w-auto lg:flex-1">
          <dt className="text-base font-medium text-gray-500">Status:</dt>
          {orderStatus.status == StatusType.PREORDER && (
            <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-blue-600 px-2.5 py-0.5 text-xs font-medium text-white">
              <svg
                className="me-1 h-3 w-3"
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
                  d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z"
                />
              </svg>
              {orderStatus.status}
            </dd>
          )}
          {orderStatus.status == StatusType.CONFIRMED && (
            <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-green-600 px-2.5 py-0.5 text-xs font-medium text-white">
              <svg
                className="me-1 h-3 w-3"
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
                  d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z"
                />
              </svg>
              {orderStatus.status}
            </dd>
          )}
          {orderStatus.status == StatusType.CANCELLED && (
            <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-red-600 px-2.5 py-0.5 text-xs font-medium text-white">
              <svg
                className="me-1 h-3 w-3"
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
                  d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z"
                />
              </svg>
              {orderStatus.status}
            </dd>
          )}
          {orderStatus.status == StatusType.INTRANSIT && (
            <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-green-600 px-2.5 py-0.5 text-xs font-medium text-white">
              <svg
                className="me-1 h-3 w-3"
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
                  d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z"
                />
              </svg>
              {orderStatus.status}
            </dd>
          )}
        </dl>
        <div className="w-full grid sm:grid-cols-2 lg:flex lg:max-w-64 lg:items-center lg:justify-end gap-4">
          {orderStatus.status != StatusType.CANCELLED ? (
            <button
              type="button"
              onClick={() => handleCancel()}
              className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto"
            >
              Cancel order
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleOrder()}
              className="w-full rounded-lg bg-black px-3 py-2 text-sm font-medium text-white lg:w-auto"
            >
              Order again
            </button>
          )}

          <Link
            to={`/account/orders/${id}`}
            className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-black lg:w-auto"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
};
