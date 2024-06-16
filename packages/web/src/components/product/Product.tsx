import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../layouts/layout/Image";
import { useNavigate } from "react-router-dom";
import { ProductDto } from "./dto/product.dto";
import { useDispatch } from "react-redux";
import { increaseQuantity } from "../../actions/cart.actions";

const Product = (props: ProductDto) => {

  const dispatch = useDispatch();
  const _id = props.id;
  const idString = (_id: string) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const navigate = useNavigate();
  const handleProductDetails = () => {
    navigate(`/product/${rootId}`);
  };

  return (
    <div className="w-full relative group">
      <div className="lg:max-w-80 bg-white relative overflow-y-hidden ">
        <div className="w-full">
          <Image className="w-full" imgSrc={props.product_image} />
        </div>
        <div className="w-full py-2 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li
              onClick={() => dispatch<any>(increaseQuantity(Number(props.id)))}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to Cart
              <span>
                <FaShoppingCart />
              </span>
            </li>
            <li
              onClick={handleProductDetails}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              View Details
              <span className="text-lg">
                <MdOutlineLabelImportant />
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="lg:max-w-80 h-28 bg-white py-2 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">
            {props.product.name}
          </h2>
          <p className="text-[#767676] text-[14px]">${props.price}</p>
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">
            {props.product.category.category_name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
