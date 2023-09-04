import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Typed from "typed.js";
import { buttonClick, staggerFadeInOut, toTopAnim } from "../animations";
import { Delivery, HeroBg } from "../assets";
import { randomData } from "../utils/styles";
import { BsArrowUp } from "react-icons/bs";
const Home = () => {
  useEffect(() => {
    const typed = new Typed(".typed-text", {
      strings: [
        "Flavor Takes the Stage",
        "Delightful Moments Engage",
        "Culinary Dreams Unfold",
        "Taste Buds Find Stories Untold",
      ],
      typeSpeed: 100,
      backSpeed: 100,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <motion.div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 ">
      <div className="flex flex-col items-start justify-start gap-6">
        <div className="px-4 py-1 flex items-center justify-center gap-2 bg-orange-100 rounded-full">
          <p className="text-lg font-semibold text-orange-500">Free Delivery</p>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary shadow-md">
            <img
              src={Delivery}
              alt="loading..."
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <p className="text-[40px] text-headingColor md:text-[72px] font-extrabold tracking-wider">
          Where {"  "}
          <span className="text-orange-600 typed-text-container">
            <span className="typed-text"></span>
          </span>
        </p>

        <p className="text-textColor text-lg">
          Flavors come alive, painting a canvas of exquisite dining where each
          bite tells a tale. Embark on delightful culinary expeditions,
          discovering a world of gastronomic wonders that awaken the senses.
          Indulge in a symphony of tastes and textures, a dance of ingredients
          crafted with care. Unveil the secrets of remarkable dining, where
          every plate is a creative flavorful masterpiece.
        </p>
        <div className="button-wrapper">
          <motion.button
            {...buttonClick}
            onClick={() => window.scrollBy(0, 1100)}
            className="bg-gradient-to-bl from-orange-400 to-orange-600 px-10 py-2 rounded-xl text-white text-base font-semibold outline-none"
          >
            {" "}
            Order Now
          </motion.button>
          <div className="flavor-effect"></div>
        </div>
      </div>

      <div className="py-2 flex-1 flex items-center justify-end relative">
        <img
          className="absolute top-0 right-0 md:-right-12  w-full h-420 md:w-auto md:h-650"
          src={HeroBg}
          alt="loading..."
        />

        <div className="w-full md:w-460 ml-0 flex flex-wrap items-center justify-center gap-4 gap-y-14">
          {randomData &&
            randomData.map((data) => (
              <motion.div
                key={data.id}
                {...staggerFadeInOut(data.id)}
                className=" w-32 h-36 md:h-auto  md:w-190 p-4 bg-lightOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
              >
                <img
                  src={data.imageURL}
                  className="w-12 h-12 md:w-32 md:h-32 md:-mt-16 object-contain "
                  alt="loading..."
                />
                <p className="text-sm lg:text-xl font-semibold text-textColor">
                  {data.product_name.slice(0, 14)}
                </p>

                <p className="text-[12px] text-center  md:text-base text-lighttextGray font-semibold  capitalize">
                  {data.product_category}
                </p>

                <p className="text-sm  font-semibold text-headingColor">
                  <span className="text-xs text-orange-500">KD</span>{" "}
                  {data.product_price}
                </p>
              </motion.div>
            ))}
        </div>
        {showBackToTop && (
          <motion.button
            className={`back-to-top ${showBackToTop ? "show" : ""}`}
            onClick={scrollToTop}
            {...toTopAnim}
          >
            <BsArrowUp />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default Home;
