import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../../components/breadcrumbs";
import emptyCart from "../../../assets/images/emptyCart.png";
import ItemCard from "../../../components/cart/ItemCard";
import { clearCart, fetchCart } from "../../../actions/cart.actions";
import { CartBottom } from "../../../components/cart/CartBottom";
import { CouponForm } from "../../../components/coupon";
import { applyCoupon } from "../../../actions/coupon.actions";
import { subtractPrice } from "../../../common/helpers/cart.helper";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { loading, data } = useSelector((state: any) => state.cart);

  const [prevLocation, setPrevLocation] = useState<string>("");

  useEffect(() => {
    dispatch<any>(fetchCart());
    setPrevLocation(location.pathname);
  }, []);


  const total = subtractPrice(data);

  const handleSubmit = async ({ coupon }: { coupon: string }) => {
    return await dispatch<any>(applyCoupon(coupon, total));
  };

  const onFinish = () => {
    dispatch<any>(fetchCart());
  }

  if (!data) return;


  return (
    <div className="max-w-container p-10 mx-auto">
      {!loading && (
        <>
          <div className="py-4">
            <Breadcrumbs title="Cart" prevLocation={prevLocation} />
          </div>
          {data.items && data.items.length > 0 ? (
            <div>
              <div className="my-5 space-y-4">
                {data.items.map((item: any) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>

              <button
                onClick={() => dispatch<any>(clearCart())}
                className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
              >
                Reset cart
              </button>

              <div className="gap-4 flex md:flex-row flex-col justify-between">
                <CouponForm data={data} onFinish={onFinish} submit={handleSubmit} />
                <CartBottom data={data} />
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
            >
              <img
                className="w-80 rounded-lg p-4 mx-auto"
                src={emptyCart}
                alt="Empty Cart"
              />
              <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md">
                <h1 className="font-titleFont text-xl font-bold uppercase">
                  Your Cart feels lonely.
                </h1>
                <p className="text-sm text-center px-10 -mt-2">
                  Your Shopping cart lives to serve. Give it purpose - fill it
                  with books, electronics, videos, etc. and make it happy.
                </p>
                <Link to="/shop">
                  <button className="bg-gray-700 rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
