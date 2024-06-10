import { useEffect } from "react";
import { FaFacebook, FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";
import FooterListTitle from "./footerTitle";
import paymentCard from "../../assets/images/payment.png";
import Image from "../layout/Image";
import { useDispatch, useSelector } from "react-redux";
import { fetchLayout } from "../../actions/layout.actions";
import { useNavigate, useSearchParams } from "react-router-dom";

const Footer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading, data } = useSelector((state: any) => state.layout);

  useEffect(() => {
    dispatch<any>(fetchLayout());
  }, []);

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
    <div className="w-full bg-[#F5F5F3] py-20">
      {!loading && (
        <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2  xl:grid-cols-6 px-10 gap-10">
          <div className="col-span-2">
            <FooterListTitle title=" More about Orebi Shop" />
            <div className="flex flex-col gap-6">
              <p className="text-base w-full xl:w-[80%]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                sint ab ullam, numquam nesciunt in.
              </p>
              <ul className="flex items-center gap-2">
                <a
                  href="https://www.youtube.com/@reactjsBD"
                  target="_blank"
                  rel="noreferrer"
                >
                  <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                    <FaYoutube />
                  </li>
                </a>
                <a
                  href="https://github.com/noorjsdivs"
                  target="_blank"
                  rel="noreferrer"
                >
                  <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                    <FaGithub />
                  </li>
                </a>
                <a
                  href="https://www.facebook.com/Noorlalu143/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                    <FaFacebook />
                  </li>
                </a>
                <a
                  href="https://www.linkedin.com/in/noor-mohammad-ab2245193/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                    <FaLinkedin />
                  </li>
                </a>
              </ul>
            </div>
          </div>
          <div>
            <FooterListTitle title="Shop" />
            <ul className="flex flex-col gap-2">
              {data &&
                data.categories &&
                data.categories.map(({ id, category_name }: any) => {
                  return (
                    <li
                      key={id}
                      onClick={() => handleCategory(category_name)}
                      className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300"
                    >
                      {category_name}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div>
            <FooterListTitle title="Your account" />
            <ul className="flex flex-col gap-2">
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                Profile
              </li>
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                Orders
              </li>
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                Addresses
              </li>
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                Account Details
              </li>
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                Payment Options
              </li>
            </ul>
          </div>
          <div className="col-span-2 flex flex-col items-center w-full px-4">
            <Image
              className={`w-[80%] lg:w-[60%] mx-auto`}
              imgSrc={paymentCard}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
