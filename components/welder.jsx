import React from "react";
import { IoMdAdd } from "react-icons/io";

const WelderComponent = () => {
  return (
    <div className="m-6">
      <div className="flex flex-row items-center justify-between">
        <p className="text-2xl">Users</p>
        <button className="border border-blue-500 mr-5 w-14 h-8 p-1 bg-blue-500 rounded-md hover:bg-blue-700 ">
          <IoMdAdd className="ml-4 text-white" />
        </button>
      </div>
      <div className="mt-10">
        <button className="text-white  border rounded-md bg-blue-500 h-10 w-24">
          See Users
        </button>
        <button className="text-white  border rounded-md bg-blue-500 h-10 w-24 ml-6 ">
          Refresh
        </button>
      </div>
    </div>
  );
};

export default WelderComponent;
