import React from "react";

const Header = () => {
  return (
    <div className="h-16 w-full border border-gray-300 flex flex-row items-center justify-between">
      <h5 className="ml-3 p-2">Welder</h5>
      <button
        type="submit"
        className=" text-white  h-8 bg-blue-500 w-36 rounded-md mr-6"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
