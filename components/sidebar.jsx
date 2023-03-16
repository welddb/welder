import React from "react";
import { CgProfile } from "react-icons/cg";
import { HiUsers } from "react-icons/hi";
import { MdEngineering } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-blue-900">
      <div className="flex m-5 ">
        <img
          src="/"
          alt="DP"
          className="bg-blue-500 rounded-md h-10 w-10 p-2"
        />
        <p className="text-white bg-blue-500  rounded-md w-36 ml-3 p-2 ">
          Username
        </p>
      </div>

      <div className="mt-40 ">
        <ul className="text-white">
          <li className="flex flex-row items-center cursor-pointer hover:bg-blue-500 active:bg-blue-700">
            <CgProfile className="h-5 w-5 m-6 cursor-pointer" /> Profile
          </li>
          <li className="flex flex-row items-center cursor-pointer hover:bg-blue-500 active:bg-blue-700">
            <HiUsers className="h-5 w-5 m-6 cursor-pointer" />
            User
          </li>
          <li className="flex flex-row items-center cursor-pointer hover:bg-blue-500 active:bg-blue-700">
            <MdEngineering
              color="#ffffff"
              className="h-5 w-5  m-6 cursor-pointer "
            />
            Welder
          </li>
        </ul>
      </div>
      <button
        type="submit"
        className=" text-white h-9 bg-blue-500 w-36 rounded-md mt-44 ml-9 "
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
