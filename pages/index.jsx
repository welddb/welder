import Layout from "@/components/layout";
import Signin from "@/components/signin";
import React from "react";

const HomePage = () => {
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center bg-slate-400">
        <Signin />
      </div>
    </>
  );
};

export default HomePage;
