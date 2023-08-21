import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeInOut } from "../animations";

const LoginInput = ({
  placeHolder,
  icon,
  inputState,
  inputStateFunction,
  type,
}) => {
  const [isFocus, setFocus] = useState(false);
  return (
    <motion.div
      {...fadeInOut}
      className={`flex items-center justify-center bg-lightOverlay gap-2 md:gap-4 backdrop-blur-md rounded-[50px] w-full px-2 md:px-4 py-1.5 md:py-2 input-box ${
        isFocus ? "shadow-md shadow-orange-400" : "shadow-none"
      }`}
    >
      {icon}
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full h-full bg-transparent lg:text-xl md:text-2xl text-base text-headingColor font-semibold outline-none border-none"
        value={inputState}
        onChange={(e) => inputStateFunction(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </motion.div>
  );
};

export default LoginInput;
