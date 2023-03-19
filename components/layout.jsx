import { useRouter } from "next/router";
import React from "react";
import Sidebar from "./sidebar";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex h-screen">
        {router.pathname !== "/signin" && <Sidebar />}
        <div className="w-full bg-slate-200">
          {router.pathname !== "/signin" && (
            <div className="flex p-4 items-center justify-end gap-1">
              <span className="bg-blue-500 h-10 w-10 flex items-center justify-center rounded-full text-white">
                HA
              </span>
              <p className="font-semibold">Username</p>
            </div>
          )}
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
