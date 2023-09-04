import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { buttonClick } from "../animations";
const ServiceCard = ({ title, description, buttonT, image }) => {
  const [textStyle, setTextStyle] = useState("translateZ(20px) scaleY(0)");

  const handleMouseEnter = () => {
    setTextStyle("translateZ(20px) scaleY(1)");
  };

  const handleMouseLeave = () => {
    setTextStyle("translateZ(20px) scaleY(0)");
  };

  return (
    <Tilt
      glareEnable={true}
      tiltMaxAngleX={12}
      tiltMaxAngleY={12}
      perspective={1000}
      glareColor={"transparent"}
    >
      <div
        className="flex relative justify-center items-center flex-col py-[50px] px-0 rounded-xl border-4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-[450px] h-[300px] my-[60px] mx-0 bg-transparent">
          <div className="absolute top-0 left-0 w-[100%] h-[100%] rounded-xl">
            <img src={image} alt="service" className="rounded-xl" />
          </div>
          <div
            className="top-[50%] left-[50px] right-[50px] bg-lightOverlay backdrop-blur-2xl py-[40px] px-[25px] absolute origin-top transition-all duration-150 rounded-lg"
            style={{ transform: textStyle }}
          >
            <h2 className="font-bold text-2xl">{title}</h2>
            <p>{description} </p>
            <NavLink to={"/book"}>
              <motion.button
                className="bg-orange-400 px-5 py-2 mt-5 text-white rounded-md hover:bg-orange-600 transition-all duration-150"
                {...buttonClick}
              >
                {buttonT}
              </motion.button>
            </NavLink>
          </div>
        </div>
      </div>
    </Tilt>
  );
};

export default ServiceCard;
