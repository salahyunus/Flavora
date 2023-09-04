import React from "react";

const HadithCard = ({ quote }) => {
  return (
    <div className="card px-5 py-8 max-w-[650px]">
      <p className="text-3xl font-sans leading-[3rem]">{quote.quote}</p>
      <div className="pt-4">
        {" "}
        <span>Daily Ayah</span> |{" "}
        <a
          href={`https://twitter.com/intent/tweet?text="${quote.quote} &hashtags=todayhadith`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:text-blue-400 transition-all duration-150"
        >
          Tweet
        </a>{" "}
      </div>
    </div>
  );
};

export default HadithCard;
