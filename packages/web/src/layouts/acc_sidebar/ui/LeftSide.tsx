import { Link, useLocation } from "react-router-dom";
import { accSidebarList } from "../../../constants";
import { useEffect, useState } from "react";

export const LeftSide = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState<string>(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  return (
    <aside className="z-40 md:min-w-96">
      <div className="py-4 space-y-4 overflow-y-auto">
        <div className="space-y-4">
          <h2 className="font-medium">Manage My Account</h2>
          <ul className="space-y-2">
            {accSidebarList.map(({ _id, title, link }) => (
              <li key={_id}>
                <Link
                  to={link}
                  className={`flex items-center ${
                    link === currentPath ? "bg-gray-100" : ""
                  } py-2 text-gray-900 rounded-lg hover:bg-gray-100 group`}
                >
                  <span className="ms-3">{title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};
