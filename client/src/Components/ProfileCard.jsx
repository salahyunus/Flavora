import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "../assets";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setUserNull } from "../context/actions/userActions";
import { app } from "../config/firebase.config";
import { getAllOrders } from "../api";
import { setOrders } from "../context/actions/ordersActions";

const ProfileCard = () => {
  const orders = useSelector((state) => state.orders);
  const user = useSelector((state) => state.user);
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userOrders, setUserOrders] = useState(null);
  function generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!orders) {
      getAllOrders().then((data) => {
        dispatch(setOrders(data));
        setUserOrders(data.filter((item) => item.userId === user?.user_id));
      });
    } else {
      setUserOrders(orders.filter((data) => data.userId === user?.user_id));
    }
  }, [orders, dispatch, user?.user_id]);

  const signOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        dispatch(setUserNull());
        navigate("/login", { replace: true });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="bg-white rounded-xl shadow-2xl py-10 flex flex-col items-center font-mono fixed w-full sm:w-64 md:w-72 lg:w-96 px-4 hover:scale-110 duration-300 transition-all">
      <div className="relative">
        <div
          className={`activeStatus h-4 w-4 absolute top-1 right-1 rounded-full ring-white ring-4 ${
            user?.user_id === process.env.REACT_APP_ADMIN_ID
              ? `bg-green-500`
              : `bg-blue-400`
          }`}
        ></div>
        <img
          className={`h-24 rounded-full shadow-md cursor-pointer overflow-hidden mb-2 ring-2 ring-offset-2 hover:ring-4 duration-150 transition-all ${
            user?.user_id === process.env.REACT_APP_ADMIN_ID
              ? `ring-emerald-400`
              : `ring-blue-400`
          }`}
          src={user?.picture ? user?.picture : Avatar}
          alt="Loading..."
          referrerPolicy="no-referrer"
        />
      </div>{" "}
      <div id="title" className="text-black text-2xl my-2">
        {user?.name ? user?.name : "Email User"}
      </div>
      <div id="subtitle" className="text-md text-gray-500">
        {user?.user_id === process.env.REACT_APP_ADMIN_ID ? (
          <p>
            Behind the Scenes ||{" "}
            <span className="text-emerald-500 font-semibold">
              {" "}
              Flavora Admin{" "}
            </span>
          </p>
        ) : (
          <p>
            Taste Explorer ||{" "}
            <span className="text-blue-500 font-semibold">
              Flavora Customer
            </span>
          </p>
        )}
      </div>
      <div id="stats" className="flex justify-between items-center my-6">
        <div className="stat-sub flex flex-col items-center mr-4">
          <div className="stat-num text-orange-500 font-semibold">
            {userOrders?.length}
          </div>
          <div className="stat-type text-gray-400 font-semibold text-lg">
            {userOrders?.length === 1 ? "Order" : "Orders"}
          </div>
        </div>
        <div className="stat-sub flex flex-col items-center mr-4">
          <div className="stat-num text-orange-500 font-semibold text-lg">
            {generateRandomInt(3, 15)}
          </div>
          <div className="stat-type text-gray-400 font-semibold">Visits</div>
        </div>
        <div className="stat-sub flex flex-col items-center mr-4">
          <div className="stat-num text-orange-500 font-semibold text-lg">
            {generateRandomInt(9, 30)}
          </div>
          <div className="stat-type text-gray-400 font-semibold">Credits</div>
        </div>
      </div>
      <div id="actions" className="mt-2 flex justify-center items-center">
        <div>
          <button
            className="orders mr-4 bg-orange-400 text-white p-2 rounded-md px-4 hover:text-orange-400 hover:bg-white transition-all duration-150 hover:font-bold"
            onClick={() => navigate("/user-orders", { replace: true })}
          >
            Orders
          </button>
          <button
            className="signout bg-red-500 text-white p-2 rounded-md px-4 hover:text-red-500 hover:bg-white transition-all duration-150 hover:font-bold"
            onClick={signOut}
          >
            Sign Out
          </button>
        </div>
      </div>
      <div id="email" className="text-gray-600 mt-2">
        {user?.email}
      </div>
    </div>
  );
};

export default ProfileCard;
