import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import {
  fetchLayout,
  clearSearch,
  searchProducts,
} from "../../actions/layout.actions";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import Flex from "../layout/Flex";

const HeaderBottom: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const { loading, data, searchItems } = useSelector(
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
    
    return navigate(`/shop/${window.location.search}`)
  };

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      {!loading && (
        <div className="max-w-container px-10 mx-auto">
          <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full pb-4 lg:pb-0 h-full lg:h-24">
            <div
              onClick={() => setShow(!show)}
              className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
              ref={ref}
            >
              <HiOutlineMenuAlt4 className="w-5 h-5" />
              <p className="text-[14px] font-normal">Shop by Category</p>

              {show && (
                <motion.ul
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-16 z-50 bg-white w-auto text-[#767676] h-auto p-4"
                >
                  {data &&
                    data.categories &&
                    data.categories.map(({ id, category_name }: any) => {
                      return (
                        <li
                          onClick={() => handleCategory(category_name)}
                          key={id}
                          className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 duration-300 cursor-pointer"
                        >
                          {category_name}
                        </li>
                      );
                    })}
                </motion.ul>
              )}
            </div>
            <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
              <input
                className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
                type="text"
                onChange={(e) => dispatch<any>(searchProducts(e.target.value))}
                placeholder="Search your products here"
              />
              <FaSearch className="w-5 h-5" />

              {searchItems.length > 0 && (
                <div
                  className={`w-full mx-auto bg-white top-16 absolute left-0 z-50 shadow-2xl cursor-pointer`}
                >
                  {searchItems.map((item: any) => (
                    <div
                      onClick={() => navigateToProduct(item.id)}
                      key={item.id}
                      className="max-w-[600px] h-28 bg-gray-100 flex items-center gap-3"
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
                        <p className="text-xs">{item.product.description}</p>
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
            <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
              <div onClick={() => setShowUser(!showUser)} className="flex">
                <FaUser />
                <FaCaretDown />
              </div>
              {showUser && (
                <motion.ul
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-6 right-10 z-50 bg-white w-44 text-[#767676] h-auto p-2"
                >
                  {data && data.auth.data ? (
                    <>
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 duration-300 cursor-pointer">
                        Profile
                      </li>
                      <Link to="/logout">
                        <li className="text-gray-400 px-4 py-1 border-b-gray-400 duration-300 cursor-pointer">
                          Logout
                        </li>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 duration-300 cursor-pointer">
                          Login
                        </li>
                      </Link>
                      <Link onClick={() => setShowUser(false)} to="/register">
                        <li className="text-gray-400 px-4 py-1 border-b-gray-400 duration-300 cursor-pointer">
                          Sign Up
                        </li>
                      </Link>
                    </>
                  )}
                </motion.ul>
              )}
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
      )}
    </div>
  );
};

export default HeaderBottom;
