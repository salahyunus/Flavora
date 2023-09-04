import React, { useState } from "react";
import { HadithCard } from "../Components";
import axios from "axios";
import { buttonClick } from "../animations";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const Hadiths = () => {
  const [quote, setQuote] = useState({
    quote:
      "سُورَةُ القَصَصِ: وَٱبْتَغِ فِيمَآ ءَاتَىٰكَ ٱللَّهُ ٱلدَّارَ ٱلْءَاخِرَةَ ۖ وَلَا تَنسَ نَصِيبَكَ مِنَ ٱلدُّنْيَا ۖ وَأَحْسِن كَمَآ أَحْسَنَ ٱللَّهُ إِلَيْكَ ۖ وَلَا تَبْغِ ٱلْفَسَادَ فِى ٱلْأَرْضِ ۖ إِنَّ ٱللَّهَ لَا يُحِبُّ ٱلْمُفْسِدِينَ",
  });

  function getQuote() {
    const randomAyahNumber = Math.floor(Math.random() * 6000) + 1;
    const apiUrl = `http://api.alquran.cloud/v1/ayah/${randomAyahNumber}/editions/quran-uthmani,en.asad,en.pickthall`;
    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data.data;
        const ayahText = data[0].text;
        const surahName = data[0].surah.name;
        setQuote({ quote: surahName + ": " + ayahText });
        console.log(quote);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  return (
    <div className="quotes h-screen flex justify-center items-center">
      <div>
        {quote && <HadithCard quote={quote} />}
        <motion.button
          onClick={getQuote}
          className="bg-emerald-400 px-5 py-4 mt-5 mr-5 text-white rounded-md hover:bg-emerald-600 transition-all duration-150"
          {...buttonClick}
        >
          Get Quote
        </motion.button>
        <NavLink to={"/user-orders"}>
          <motion.button
            className="bg-pink-400 px-5 py-4 mt-5 mr-5 text-white rounded-md hover:bg-pink-600 transition-all duration-150"
            {...buttonClick}
          >
            Orders
          </motion.button>
        </NavLink>
        <NavLink to={"/"}>
          <motion.button
            className="bg-orange-400 px-5 py-4 mt-5 text-white rounded-md hover:bg-orange-600 transition-all duration-150"
            {...buttonClick}
          >
            Home
          </motion.button>
        </NavLink>
      </div>
    </div>
  );
};
export default Hadiths;
