import React from "react";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeItemFromCart } from "../../actions/cart.actions";

const ItemCard = ({ item }: any) => {
  const dispatch = useDispatch();

  const { productItem, qty, id } = item;
  const { product, price } = productItem;

  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-5 md:col-span-2 items-center gap-4 ml-4">
        <ImCross
          onClick={() => dispatch<any>(removeItemFromCart(id))}
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
        />
        <img
          className="w-32 h-32"
          src={productItem.product_image}
          alt="productImage"
        />
        <h1 className="font-titleFont text-lg font-semibold">{product.name}</h1>
      </div>
      <div className="col-span-5 md:col-span-3 flex items-center justify-between py-4 md:py-0 px-4 md:px-0 gap-6 md:gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold">
          ${price}
        </div>
        <div className="w-1/3 flex items-center gap-x-4 text-lg">
          <span
            onClick={() => dispatch<any>(decreaseQuantity(id))}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            -
          </span>
          <p>{qty}</p>
          <span
            onClick={() => dispatch<any>(increaseQuantity(productItem.id))}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            +
          </span>
        </div>
        <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
          <p>${(qty * price).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
