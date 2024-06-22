import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import {
  fetchLayout,
  clearSearch,
  searchProducts,
} from "../../actions/layout.actions";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import Flex from "../layout/Flex";

const HeaderBottom: React.FC = () => {
  const [, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const { data, searchItems } = useSelector(
    (state: any) => state.layout
  );

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch<any>(fetchLayout());
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShow(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);

  if (!data) return null;

  function subtractQuantities(cart: any) {
    let totalSum = 0;
    cart.data.forEach((item: any) => {
      totalSum += item.qty;
    });
    return totalSum;
  }

  function navigateToProduct(id: number) {
    dispatch(clearSearch());
    return navigate(`/product/${id}`);
  }

  const handleCategory = (name: string, parentName: string | null = null) => {
    let updatedCategories: any = { categories: [], subcategories: {} };

    if (parentName) {
      // Handle subcategory
      if (!updatedCategories.subcategories[parentName]) {
        updatedCategories.subcategories[parentName] = [];
      }
      if (updatedCategories.subcategories[parentName].includes(name)) {
        updatedCategories.subcategories[
          parentName
        ] = updatedCategories.subcategories[parentName].filter(
          (subcategory: any) => subcategory !== name
        );
      } else {
        updatedCategories.subcategories[parentName].push(name);
      }
      if (updatedCategories.subcategories[parentName].length === 0) {
        delete updatedCategories.subcategories[parentName];
      }
    } else {
      // Handle category
      if (updatedCategories.categories.includes(name)) {
        updatedCategories.categories = updatedCategories.categories.filter(
          (category: any) => category !== name
        );
        if (updatedCategories.subcategories[name]) {
          delete updatedCategories.subcategories[name];
        }
      } else {
        updatedCategories.categories.push(name);
        const subcategoryNames =
          data.categories
            .find((cat: any) => cat.category_name === name)
            ?.subcategories.map((sub: any) => sub.category_name) || [];
        updatedCategories.subcategories[name] = subcategoryNames;
      }
    }
    const newParams = {
      categories: JSON.stringify(updatedCategories),
    };
    setSearchParams(newParams);

    return navigate(`/shop/${window.location.search}`);
  };

  return (
    <div className="w-full bg-primaryBg relative">
      <div className="max-w-container px-10 mx-auto">
        <Flex className="flex flex-col py-2 md:flex-row items-center justify-between w-full h-full md:h-24">
          <div
            onClick={() => setShow(!show)}
            className="md:flex hidden h-14 cursor-pointer items-center gap-2 text-primeColor"
            ref={ref}
          >
            <HiOutlineMenuAlt4 className="w-5 h-5" />
            <p className="text-[14px] font-normal">Shop by Category</p>

            {show && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-20 w-40 z-50 bg-white w-auto border text-black h-auto"
              >
                {data &&
                  data.categories &&
                  data.categories.map(({ id, category_name }: any) => {
                    return (
                      <li
                        onClick={() => handleCategory(category_name)}
                        key={id}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {category_name}
                      </li>
                    );
                  })}
              </motion.ul>
            )}
          </div>
          <div className="relative w-full md:w-[600px] h-[50px] text-base text-black bg-white flex items-center gap-2 justify-between px-6 rounded-md">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              onChange={(e) => dispatch<any>(searchProducts(e.target.value))}
              placeholder="Search your products here"
            />
            <FaSearch className="w-5 h-5" />
            {searchItems.length > 0 && (
              <div
                className={`w-full mx-auto bg-white top-16 absolute left-0 z-50 md:shadow-2xl cursor-pointer`}
              >
                {searchItems.map((item: any) => (
                  <div
                    onClick={() => navigateToProduct(item.id)}
                    key={item.id}
                    className="h-28 bg-white flex items-center gap-3"
                  >
                    <img
                      className="w-24"
                      src={item.product_image}
                      alt="productImg"
                    />
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-lg">
                        {item.product.name}
                      </p>
                      <p className="text-sm">
                        Price:{" "}
                        <span className="text-primeColor font-semibold">
                          ${item.price}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="md:flex hidden gap-4 mt-2 md:w-[100px] justify-end items-center pr-6 cursor-pointer relative">
            <div className="relative">
              <button
                onClick={() => setShowUser(!showUser)}
                type="button"
                className="flex p-2 text-lg md:me-0"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <FaUser />
              </button>
              <div
                className={`z-10 ${
                  showUser ? "absolute" : "hidden"
                } top-5 right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 shadow`}
                id="user-dropdown"
              >
                {data.auth && data.auth.data ? (
                  <div className="w-40">
                    <div className="px-4 py-3">
                      <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                        {data.auth.data.email}
                      </span>
                    </div>
                    <ul>
                      <li>
                        <Link
                          to="/account/edit"
                          onClick={() => setShowUser(!showUser)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Account
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/logout"
                          onClick={() => setShowUser(!showUser)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Sign out
                        </Link>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <ul className="w-40">
                    <li>
                      <Link
                        to="/login"
                        onClick={() => setShowUser(!showUser)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        onClick={() => setShowUser(!showUser)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Register
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
              <button
                data-collapse-toggle="navbar-user"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-user"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>

            {data.auth && data.auth.data && (
              <Link to="/cart">
                <div className="relative">
                  <FaShoppingCart />
                  <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-black text-white">
                    {data.cart.data ? subtractQuantities(data.cart) : 0}
                  </span>
                </div>
              </Link>
            )}
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
