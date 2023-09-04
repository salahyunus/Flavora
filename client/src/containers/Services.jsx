import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { Cart, Header } from "../Components";
import { setAllProducts } from "../context/actions/productActions";
import { ServiceCard } from "../Components";
import { booking, jobs } from "../assets";

const Services = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const isCart = useSelector((state) => state.isCart);

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  return (
    <main className="w-screen min-h-screen flex flex-col items-center justify-center bg-primary">
      <Header />
      <div className="w-full flex flex-wrap items-start justify-center px-6 md:px-24 2xl:px-96 gap-12 pb-24 mt-6">
        <div className="w-full justify-center text-center mt-8">
          {" "}
          <h1 className="text-[5rem] place-self-center">
            Our{" "}
            <span className="text-orange-600">
              <span>Services</span>
            </span>
          </h1>
        </div>
        <ServiceCard
          title="Book a Dinner"
          description="You can easily book or reserve a table at Flavora for your dinner,
              breakfast, or lunch, all at an affordable cost. Our food is not
              only delicious but also packed with flavors that will tantalize
              your taste buds! 😋 Whether you're looking for a cozy dinner
              setting, a delightful breakfast experience, or a satisfying lunch,
              Flavora has got you covered. Join us for an exceptional dining
              experience today!"
          buttonT="Book Now"
          image={booking}
        />
        <ServiceCard
          title="Join Flavora Team"
          description="Looking for a rewarding career opportunity? Join our dynamic team at Flavora! We are committed to excellence and are constantly seeking passionate individuals to be part of our success story. As a member of our team, you'll have the chance to make a real impact while working in a collaborative and inclusive environment 👨‍🍳"
          buttonT="Apply Now"
          image={jobs}
        />
      </div>
      {isCart && <Cart />}
    </main>
  );
};

export default Services;
