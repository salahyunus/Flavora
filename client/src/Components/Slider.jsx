import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../assets/css/swiperStyles.css";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import SliderCard from "./SliderCard";

const Slider = () => {
  const products = useSelector((state) => state.products);
  const [market, setMarket] = useState(null);
  useEffect(() => {
    setMarket(products?.filter((data) => data.product_category === "deserts"));
  }, [products]);

  return (
    <div className="w-full pt-[2rem]">
      <Swiper
        slidesPerView={3}
        centeredSlides={false}
        spaceBetween={30}
        grabCursor={true}
        className="mySwiper"
      >
        {market &&
          market.map((data, i) => (
            <SwiperSlide key={i}>
              <SliderCard key={i} data={data} index={i} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Slider;
