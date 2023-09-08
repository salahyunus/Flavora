import React from "react";
import { NavLink } from "react-router-dom";
const Booking = () => {
  return (
    <section className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center bg-gray-200 w-full ">
      <h2 className="text-orange-400 pt-40 pb-20 text-3xl md:text-4xl">
        BOOK YOUR TABLE NOW
      </h2>
      <div className="card-container grid justify-center items-center ">
        <div className="card-content bg-lightOverlay h-96 p-8 flex flex-col items-center justify-center rounded-lg">
          <h3 className="text-2xl font-semibold text-center text-gray-400  mt-[5rem]"></h3>
          <form className="flex flex-col">
            <div className="form-row">
              <select
                className="block w-full p-2 border-b border-gray-300 outline-none cursor-pointer"
                name="days"
              >
                <option value="day-select">Select Day</option>
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
              </select>

              <select
                className="block w-full p-2 border-b border-gray-300 outline-none cursor-pointer"
                name="hours"
              >
                <option value="hour-select">Select Hour</option>
                <option value="10:00">10:00</option>
                <option value="12:00">12:00</option>
                <option value="14:00">14:00</option>
                <option value="16:00">16:00</option>
                <option value="18:00">18:00</option>
                <option value="20:00">20:00</option>
                <option value="22:00">22:00</option>
              </select>
            </div>

            <div className="form-row">
              <input
                className="w-full p-2 mb-4 border-b border-gray-300 outline-none"
                type="text"
                placeholder="Full Name"
              />
              <input
                className="w-full p-2 mb-4 border-b border-gray-300 outline-none"
                type="text"
                placeholder="Phone Number"
              />
            </div>

            <div className="form-row">
              <input
                className="w-full p-2 mb-4 border-b border-gray-300 outline-none"
                type="number"
                placeholder="How Many Persons?"
                min="1"
              />
              <NavLink to={"/"}>
                <button className="w-full p-2 mb-4 text-white bg-emerald-500 rounded-md cursor-pointer hover:opacity-90 text-center">
                  BOOK TABLE
                </button>
              </NavLink>
              <NavLink to={"/"}>
                <button className="w-full p-2 mb-[4rem] text-white bg-orange-500 rounded-md cursor-pointer hover:opacity-90 text-center">
                  Cancel
                </button>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Booking;
