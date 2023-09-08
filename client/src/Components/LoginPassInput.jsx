import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeInOut } from "../animations";
import { FaEye, FaEyeSlash } from "../assets/icons";
const LoginPassInput = ({
  placeHolder,
  icon,
  inputState,
  inputStateFunction,
  type,
}) => {
  const [isFocus, setFocus] = useState(false);
  const [isVisible, setVisible] = useState(false);
  return (
    <motion.div
      {...fadeInOut}
      className={`flex items-center justify-center bg-lightOverlay gap-2 md:gap-4 backdrop-blur-md rounded-[50px] w-full px-2 md:px-4 py-1.5 md:py-2 input-box ${
        isFocus ? "shadow-md shadow-orange-400" : "shadow-none"
      }`}
    >
      {icon}
      <input
        type={isVisible ? "text" : "password"}
        placeholder={placeHolder}
        id="password"
        className="w-full h-full bg-transparent lg:text-xl md:text-2xl text-base text-headingColor font-semibold outline-none border-none"
        value={inputState}
        onChange={(e) => inputStateFunction(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <div
        className="p-1 text-xl text-gray-500 rounded-full ring-6 ring-transparent hover:bg-gray-300 cursor-pointer transition-all duration-150"
        onClick={() => setVisible(!isVisible)}
      >
        {isVisible ? <FaEye /> : <FaEyeSlash />}
      </div>
    </motion.div>
  );
};

export default LoginPassInput;
