import axiosInstance from "@/utils/axios.instance";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";

const Layout = ({ children }) => {
  const [data, setData] = useState({});
  const router = useRouter();
  const { status, session } = useSession();

  const getProfile = async () => {
    try {
      setData({});
      const data = await axiosInstance.get("/users/profile");

      setData(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfile();
  }, [status]);

  return (
    <>
      <div className="flex h-screen">
        {router.pathname !== "/signin" && <Sidebar />}
        <div className="w-full bg-slate-200">
          {router.pathname !== "/signin" && (
            <div className="flex p-4 items-center justify-end gap-1">
              <span className="bg-blue-500 h-10 w-10 flex items-center justify-center rounded-full text-white">
                {data?.userName?.slice(0, 2).toUpperCase()}
              </span>
              <p className="font-semibold">{data.userName}</p>
            </div>
          )}
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
