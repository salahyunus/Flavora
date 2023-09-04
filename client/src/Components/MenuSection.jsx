import { motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import SliderCard from "./SliderCard";
import { slideTop, staggerFadeInOut } from "../animations";
import Spinner from "./Spinner";

const MenuSection = () => {
  const products = useSelector((state) => state.products);
  if (products === null) {
    return <Spinner />;
  }
  const updatedProducts = products.map((product) => {
    if (product.product_category === "deserts") {
      return { ...product, product_category: "Desserts" };
    } else if (product.product_category === "indian") {
      return { ...product, product_category: "Visiting India" };
    } else if (product.product_category === "egyptian") {
      return { ...product, product_category: "Egyptian Culture" };
    } else if (product.product_category === "fastfood") {
      return { ...product, product_category: "Fast Food" };
    } else if (product.product_category === "Kuwaiti") {
      return { ...product, product_category: "Heard about Kuwait?" };
    } else if (product.product_category === "drinks") {
      return { ...product, product_category: "Drink Something" };
    } else if (product.product_category === "flavoramarket") {
      return { ...product, product_category: "Some Healthy Fruits" };
    } else if (product.product_category === "seafood") {
      return { ...product, product_category: "Aquatic World" };
    }
    return product;
  });
  const productsByCategory = {};
  updatedProducts.forEach((product) => {
    if (!productsByCategory[product.product_category]) {
      productsByCategory[product.product_category] = [];
    }
    productsByCategory[product.product_category].push(product);
  });
  return (
    <motion.div className="w-full flex items-start justify-start flex-col bg-orange-200 p-10 rounded-full">
      {Object.entries(productsByCategory).map(
        ([category, categoryProducts], i) => (
          <div key={i} className="mt-6">
            <div className="w-full flex items-center justify-between">
              <div className="flex flex-col items-start justify-start gap-1">
                <p className="text-2xl text-headingColor font-bold">
                  {category}
                </p>
                <div className="w-20 h-1 rounded-md bg-orange-500"></div>
              </div>
            </div>
            <div className="w-full flex items-center justify-evenly flex-wrap gap-4 mt-2">
              {categoryProducts.map((data, j) => (
                <SliderCard key={j} data={data} index={j} />
              ))}
            </div>
          </div>
        )
      )}
    </motion.div>
  );
};

export default MenuSection;
