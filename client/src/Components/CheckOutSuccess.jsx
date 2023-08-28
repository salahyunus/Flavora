import React from "react";
import { FaArrowLeft } from "../assets/icons";
import { NavLink } from "react-router-dom";
import { Bill } from "../assets";
import { Header } from "../Components";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";

const CheckoutSuccess = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start overflow-hidden">
      <Header />
      <div className="flex flex-col items-center justify-center mt-10 sm:mt-20 px-4 sm:px-8 lg:px-20 gap-6 pb-10 flex-grow">
        <img src={Bill} className="w-full max-w-md" alt="loading..." />

        <h1 className="text-4xl sm:text-5xl text-headingColor font-bold">
          Amount paid Successfully
        </h1>

        <motion.div {...buttonClick}>
          <NavLink
            to={"/"}
            className="flex items-center justify-center gap-2 sm:gap-4 cursor-pointer text-xl sm:text-2xl text-textColor font-semibold px-4 py-2 rounded-md border border-gray-300 hover:shadow-md"
          >
            <FaArrowLeft className="text-2xl sm:text-3xl text-textColor " /> Get
            back to Home
          </NavLink>
        </motion.div>
      </div>
    </main>
  );
};

export default CheckoutSuccess;
