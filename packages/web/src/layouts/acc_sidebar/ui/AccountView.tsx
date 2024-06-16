import { useState } from "react";
import Breadcrumbs from "../../../components/breadcrumbs";
import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";

export const AccountView = () => {
  const [prevLocation, setPrevLocation] = useState<string>("");

  return (
    <div className="max-w-container p-10 mx-auto">
      <div className="py-4">
        <Breadcrumbs title="Profile" prevLocation={prevLocation} />
      </div>
      <div className="flex lg:flex-row gap-10 w-full flex-col">
        <LeftSide />
        <RightSide />
      </div>
    </div>
  );
};
