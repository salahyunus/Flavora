import { motion } from "framer-motion";
// useEffect (onLoad or onMount or onUnMount) & useState
import React, { useEffect, useState } from "react";
// buttonClick, SlideIn, fadeinout one by one animations
import { buttonClick, slideIn, staggerFadeInOut } from "../animations";
// Icons
import { BiChevronsRight, FcClearFilters } from "../assets/icons";
import { useDispatch, useSelector } from "react-redux";
// setCartOff action from cartActions (hide cart)
import { setCartOff } from "../context/actions/displayCartActions";
// Alerts
import { alertNULL, alertSuccess } from "../context/actions/alertActions";
// axios CRUD api functions
import { baseURL, getAllCartItems, increaseItemQuantity } from "../api";
// setCartItems
import { setCartItems } from "../context/actions/cartActions";
// axios for requests like post, get, delete...
import axios from "axios";

const Cart = () => {
  // to dispatch actions
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  // simple useState for total price
  const [total, setTotal] = useState(0);
  useEffect(() => {
    // onLoad set total to 0
    // if cart is loaded calculate total: price * quantity of every item
    let tot = 0;
    if (cart) {
      cart.map((data) => {
        tot = tot + data.product_price * data.quantity;
        setTotal(tot);
      });
    }
  }, [cart]);
  const handleCheckOut = () => {
    // data to pass to api
    const data = {
      // user
      user: user,
      // cart
      cart: cart,
      // total
      total: total,
    };
    axios
      .post(`${baseURL}/api/products/create-checkout-session`, { data })
      .then((res) => {
        if (res.data.url) {
          // redirect user
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <motion.div
      {...slideIn}
      className="fixed z-50 top-0 right-0 w-300 md:w-508 bg-lightOverlay backdrop-blur-md shadow-md h-screen"
    >
      <div className="w-full flex items-center justify-between py-4 pb-12 px-6">
        <motion.i
          {...buttonClick}
          className="cursor-pointer"
          onClick={() => dispatch(setCartOff())}
        >
          <BiChevronsRight
            className="text-[50px] text-textColor hover:text-gray-500 transition-all duration-150"
            {...buttonClick}
          />
        </motion.i>
        <p className="text-2xl text-headingColor font-semibold">Your Cart</p>
        <motion.i {...buttonClick} className="cursor-pointer">
          <FcClearFilters className="text-[30px] text-textColor" />
        </motion.i>
      </div>

      <div className="flex-1 flex flex-col items-start justify-start rounded-t-3xl bg-zinc-900 h-full py-6  gap-3 relative">
        {cart && cart?.length > 0 ? (
          <>
            <div className="flex flex-col w-full items-start justify-start gap-3 h-[65%] overflow-y-scroll scrollbar-none px-4">
              {cart &&
                cart?.length > 0 &&
                cart?.map((item, i) => (
                  <CartItemCard key={i} index={i} data={item} />
                ))}
            </div>
            <div className="bg-zinc-800 rounded-t-[60px] w-full py-6 px-4 flex flex-col items-center justify-center gap-6">
              <div className="w-full flex items-center justify-evenly">
                <p className="text-3xl text-zinc-500 font-semibold">Total</p>
                <p className="text-3xl text-orange-500 font-semibold flex items-center justify-center gap-1">
                  <span className="text-orange-400">K.D </span>
                  <span> {"  "}</span>
                  {total.toFixed(3)}
                </p>
              </div>

              <motion.button
                {...buttonClick}
                className="bg-orange-400 w-[70%] md:w-[50%] px-4 py-3 text-xl text-headingColor font-semibold hover:bg-orange-500 drop-shadow-md rounded-2xl"
                onClick={handleCheckOut}
              >
                Check Out
              </motion.button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl text-primary font-bold self-center">
              Empty Cart
            </h1>
          </>
        )}
      </div>
    </motion.div>
  );
};
export const CartItemCard = ({ index, data }) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [itemTotal, setItemTotal] = useState(0);
  const dispatch = useDispatch();

  const decrementCart = (productId) => {
    dispatch(alertSuccess("Decreased Item Quantity"));

    increaseItemQuantity(user?.user_id, productId, "decrement").then((data) => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
        dispatch(alertNULL());
      });
    });
  };

  const incrementCart = (productId) => {
    dispatch(alertSuccess("Increased Item Quantity"));
    increaseItemQuantity(user?.user_id, productId, "increment").then((data) => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
        dispatch(alertNULL());
      });
    });
  };

  useEffect(() => {
    setItemTotal(data.product_price * data.quantity);
  }, [itemTotal, cart]);

  return (
    <motion.div
      key={index}
      {...staggerFadeInOut(index)}
      className="w-full flex items-center justify-start bg-zinc-800 rounded-md drop-shadow-md px-4 gap-4"
    >
      <img
        src={data?.imageURL}
        className=" w-24 min-w-[94px] h-24 object-contain"
        alt="loading..."
      />

      <div className="flex items-center justify-start gap-1 w-full">
        <p className="text-lg text-primary font-semibold">
          {data?.product_name}
          <span className="text-sm block capitalize text-gray-400">
            {data?.product_category}
          </span>
        </p>
        <p className="text-sm flex items-center justify-center gap-1 font-semibold text-red-400 ml-auto">
          <span className="text-orange-500"> K.D </span> {itemTotal.toFixed(3)}
        </p>
      </div>

      <div className="ml-auto flex items-center justify-center gap-3">
        <motion.div
          {...buttonClick}
          onClick={() => decrementCart(data?.productId)}
          className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer outline-none"
        >
          <p
            className="text-xl font-semibold text-primary outline-none"
            style={{ userSelect: "none" }}
          >
            -
          </p>
        </motion.div>
        <p
          className="text-lg text-primary font-semibold"
          style={{ userSelect: "none" }}
        >
          {data?.quantity}
        </p>
        <motion.div
          {...buttonClick}
          className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer outline-none"
          onClick={() => incrementCart(data?.productId)}
        >
          <p
            className="text-xl font-semibold text-primary"
            style={{ userSelect: "none" }}
          >
            +
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
export default Cart;
