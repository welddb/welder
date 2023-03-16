import React from "react";
import Header from "./header";
import Sidebar from "./sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex ">
        <Sidebar />
        <div className="w-full">
          <Header />
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
