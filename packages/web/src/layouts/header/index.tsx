import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { MdClose } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";
import { navBarList } from "../../constants";
import Flex from "../layout/Flex";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, data } = useSelector((state: any) => state.layout);

  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [category, setCategory] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
  }, []);

  if (!data) return;

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
    setSidenav(false);

    return navigate(`/shop/${window.location.search}`);
  };

  return (
    <div className="w-full h-20 bg-white relative sticky top-0 z-50 border-b-[1px] border-b-gray-200">
      <nav className="h-full max-w-container px-10 mx-auto relative">
        <Flex className="flex items-center justify-between h-full">
          <Link to="/" className="text-xl">
            ECOMMERCE
          </Link>
          <div>
            {showMenu && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center w-auto bg-white z-50 p-0 gap-2"
              >
                <>
                  {navBarList.map(({ _id, title, link }: any) => (
                    <NavLink
                      key={_id}
                      className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                      to={link}
                      state={{ data: location.pathname.split("/")[1] }}
                    >
                      <li>{title}</li>
                    </NavLink>
                  ))}
                </>
              </motion.ul>
            )}
            <HiMenuAlt2
              onClick={() => setSidenav(!sidenav)}
              className="inline-block md:hidden cursor-pointer w-8 h-6"
            />
            {sidenav && (
              <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-[80%] h-full relative"
                >
                  <div className="w-full h-full space-y-2 bg-primeColor p-6">
                    <h1 className="text-xl">ECOMMERCE</h1>
                    <ul className="text-gray-200 flex flex-col gap-2">
                      {navBarList.map((item: any) => (
                        <li
                          className="font-normal hover:font-bold items-center text-lg text-gray-200 hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                          key={item._id}
                        >
                          <NavLink
                            to={item.link}
                            state={{ data: location.pathname.split("/")[1] }}
                            onClick={() => setSidenav(false)}
                          >
                            {item.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                    <div>
                      <h1
                        onClick={() => setCategory(!category)}
                        className="flex justify-between text-base cursor-pointer items-center font-titleFont mb-2"
                      >
                        Shop by Category{" "}
                        <span className="text-lg">{category ? "-" : "+"}</span>
                      </h1>
                      {category && (
                        <motion.ul
                          initial={{ y: 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          className="text-sm flex flex-col gap-1"
                        >
                          {data.categories.map(({ id, category_name }: any) => {
                            return (
                              <li
                                onClick={() => handleCategory(category_name)}
                                key={id}
                                className="cursor-pointer headerSedenavLi"
                              >
                                {category_name}
                              </li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </div>
                  </div>
                  <span
                    onClick={() => setSidenav(false)}
                    className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                  >
                    <MdClose />
                  </span>
                </motion.div>
              </div>
            )}
          </div>
        </Flex>
      </nav>
    </div>
  );
};

export default Header;
