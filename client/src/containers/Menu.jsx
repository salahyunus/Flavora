import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { Cart, Header, HomeSlider, MenuSection } from "../Components";
import { setAllProducts } from "../context/actions/productActions";
import Typed from "typed.js";
const Main = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const isCart = useSelector((state) => state.isCart);
  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);
  useEffect(() => {
    const typed = new Typed(".typed-text", {
      strings: ["Jaw-Dropping", "Flavorful", "Delicious", "Delightful"],
      typeSpeed: 100,
      backSpeed: 100,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <main className="w-screen min-h-screen flex items-center justify-center flex-col">
      <Header />
      <div className="w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
        <h1 className="text-[5rem] place-self-center">
          Our{" "}
          <span className="text-orange-600 typed-text-container">
            <span className="typed-text"></span>{" "}
          </span>
          Menu
        </h1>
        <HomeSlider />
        <MenuSection id="slider-section" />
      </div>
      {isCart && <Cart />}
    </main>
  );
};

export default Main;
