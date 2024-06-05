import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../../components/breadcrumbs";
import emptyCart from "../../../assets/images/emptyCart.png";
import ItemCard from "../../../components/cart/ItemCard";
import { clearCart, fetchCartItems } from "../../../actions/cart.actions";

const Cart = () => {
  const data = useSelector((state: any) => state.cart);
  const { loading, items } = data;

  const dispatch = useDispatch();
  const location = useLocation();

  const [prevLocation, setPrevLocation] = useState<string>("");

  useEffect(() => {
    dispatch<any>(fetchCartItems());
    setPrevLocation(location.pathname);
  }, []);

  if (!data) return;

  function subtractPrice(cart: any) {
    let totalSum = 0;
    cart.data.forEach((item: any) => {
      totalSum += (item.qty * item.productItem.price);
    });
    return totalSum.toFixed(2);
  }

  return (
    <div className="px-10 mx-auto">
      {!loading && (
        <div>
          <div className="py-4">
            <Breadcrumbs title="Cart" prevLocation={prevLocation} />
          </div>
          {items.data.length > 0 ? (
            <div className="pb-20">
              <div className="w-full h-20 bg-[#F5F7F7] text-black hidden lg:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
                <h2 className="col-span-2">Product</h2>
                <h2>Price</h2>
                <h2>Quantity</h2>
                <h2>Sub Total</h2>
              </div>
              <div className="mt-5">
                {items.data.map((item: any) => (
                  <div key={item.id}>
                    <ItemCard item={item} />
                  </div>
                ))}
              </div>

              <button
                onClick={() => dispatch<any>(clearCart())}
                className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
              >
                Reset cart
              </button>
              <div className="max-w-7xl gap-4 flex justify-end mt-4">
                <div className="w-96 flex flex-col gap-4">
                  <h1 className="text-2xl font-semibold text-right">
                    Cart totals
                  </h1>
                  <div>
                    <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                      Subtotal
                      <span className="font-semibold tracking-wide font-titleFont">
                        ${subtractPrice(items)}
                      </span>
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <Link to="/paymentgateway">
                      <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                        Proceed to Checkout
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
            >
              <div>
                <img
                  className="w-80 rounded-lg p-4 mx-auto"
                  src={emptyCart}
                  alt="emptyCart"
                />
              </div>
              <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md">
                <h1 className="font-titleFont text-xl font-bold uppercase">
                  Your Cart feels lonely.
                </h1>
                <p className="text-sm text-center px-10 -mt-2">
                  Your Shopping cart lives to serve. Give it purpose - fill it
                  with books, electronics, videos, etc. and make it happy.
                </p>
                <Link to="/">
                  <button className="bg-gray-700 rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
