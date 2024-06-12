import { useState } from "react";
import Breadcrumbs from "../../../components/breadcrumbs";
import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";

export const AccountView = () => {
  const [prevLocation, setPrevLocation] = useState<string>("");

  return (
    <div className="max-w-container px-10 mx-auto">
      <div className="py-4">
        <Breadcrumbs title="Profile" prevLocation={prevLocation} />
      </div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>
      <div className="flex lg:flex-row gap-10 w-full flex-col">
        <LeftSide />
        <RightSide />
      </div>
    </div>
  );
};
