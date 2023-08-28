import React from "react";
import { useEffect } from "react";
import { Spinner } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";
import { CChart } from "@coreui/react-chartjs";

const DBHome = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);
  if (!products) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-evenly px-24">
        <Spinner />
      </div>
    );
  }
  const drinks = products?.filter((item) => item.product_category === "drinks");
  const deserts = products?.filter(
    (item) => item.product_category === "deserts"
  );
  const flavoramarket = products?.filter(
    (item) => item.product_category === "flavoramarket"
  );
  const fastfood = products?.filter(
    (item) => item.product_category === "fastfood"
  );
  const kuwaiti = products?.filter(
    (item) => item.product_category === "seafood"
  );
  const indian = products?.filter((item) => item.product_category === "indian");
  const egyptian = products?.filter(
    (item) => item.product_category === "egyptian"
  );

  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-full h-full">
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div className="items-center justify-center flex">
          <div className="w-340 md:w-508">
            <CChart
              type="bar"
              data={{
                labels: [
                  "Drinks",
                  "Deserts",
                  "Flavora Market",
                  "Fast Food",
                  "Indian",
                  "Sea Food",
                  "Egyptian",
                ],
                datasets: [
                  {
                    label: "Menu Categories",
                    backgroundColor: "#ff9054",
                    data: [
                      drinks?.length,
                      deserts?.length,
                      fastfood?.length,
                      flavoramarket?.length,
                      indian?.length,
                      egyptian?.length,
                      kuwaiti?.length,
                    ],
                  },
                ],
              }}
              labels="months"
            />
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-275 md:w-460">
            <CChart
              type="polarArea"
              data={{
                labels: [
                  "Orders",
                  "Paid",
                  "Delivered",
                  "Cancelled",
                  "Not Paid",
                ],
                datasets: [
                  {
                    data: [70, 40, 60, 34, 54],
                    backgroundColor: [
                      "#2e84ca",
                      "#52b8e0",
                      "#44bb46",
                      "#fa3b3b",
                      "#ffad69",
                    ],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: "#44bb46",
                    },
                  },
                },
                scales: {
                  r: {
                    grid: {
                      color: "#44bb46",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBHome;
