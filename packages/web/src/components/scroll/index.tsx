import { Link } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { MdSwitchAccount } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchLayout } from "../../actions/layout.actions";

const SpecialCase = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state: any) => state.layout);

  useEffect(() => {
    dispatch<any>(fetchLayout());
  }, []);

  if (!data) return;

  const {auth} = data;

  return (
    <div>
      {!loading && (
        <div className="fixed top-52 right-16 z-20 hidden md:flex flex-col gap-2">
          <Link to={auth.isAuthenticated ? "/account/edit" : "/login"}>
            <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer">
              <div className="flex justify-center items-center">
                <MdSwitchAccount className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

                <MdSwitchAccount className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
              </div>
              <p className="text-xs font-semibold font-titleFont">Profile</p>
            </div>
          </Link>
          <Link to="/cart">
            <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative">
              <div className="flex justify-center items-center">
                <RiShoppingCart2Fill className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

                <RiShoppingCart2Fill className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
              </div>
              <p className="text-xs font-semibold font-titleFont">Buy Now</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SpecialCase;
