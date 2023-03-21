import ChangePassword from "@/components/changePassword";
import protectedRoute from "@/components/protected";
import User_Form from "@/components/user_form";
import axiosInstance from "@/utils/axios.instance";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";

const Profile = () => {
  const [formPopup, setFormPopup] = useState(false);
  const [data, setData] = useState({});
  const [id, setId] = useState(0);
  const [intialValues, setInitialValues] = useState({
    id: "",
    userName: "",
    role: "supervisor",
    joinDate: "",
    email: "",
    password: "",
  });

  const getProfile = async () => {
    try {
      setData({});
      const data = await axiosInstance.get("/users/profile");

      setData(data.data.data);
      setId(data.data.data._id);
      console.log(data.data.data, "profile data");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  const setComplete = (val) => {
    setFormPopup(false);
    getProfile();
  };

  return (
    <>
      {formPopup && (
        <div className="h-screen w-screen fixed bg-black/50 top-0 left-0 flex items-center justify-center">
          <ChangePassword
            call={setComplete}
            id={id}
            closePopup={setFormPopup}
          />
        </div>
      )}
      <div className="p-8 flex flex-col gap-6">
        <h6 className="font-bold text-lg">My Profile</h6>

        <div className="flex items-center gap-4">
          <span className="h-20 w-20 bg-slate-300 rounded-full flex items-center justify-center text-slate-400 font-semibold text-2xl">
            {data?.userName?.slice(0, 2).toUpperCase()}
          </span>

          <div className="flex-1">
            <div className="flex gap-2 items-center">
              <p>Username:</p>
              <h6 className="font-bold">{data.userName}</h6>
            </div>
            <p className="text-gray-500 text-sm font-medium">#{data._id}</p>
          </div>

          <span
            className="cursor-pointer text-blue-500 underline hover:text-blue-700 transition-all"
            onClick={() => {
              setInitialValues({
                id: data._id,
                userName: data.userName,
                role: data.role,
                joinDate: data.joinDate.split("T")[0],
              });

              setFormPopup(true);
            }}
          >
            Change Password
          </span>
        </div>

        <div className="profile_container">
          <div>
            <p>Email:</p>
            <h6 className="font-bold">{data.email}</h6>
          </div>

          <div>
            <p>Role:</p>
            <h6 className="font-bold">{data.role}</h6>
          </div>
        </div>

        <div className="profile_container">
          <div>
            <p>Join date:</p>
            <h6 className="font-bold">
              {moment(data.joinDate).format("MMMM Do YYYY")}
            </h6>
          </div>
          <div></div>
        </div>
      </div>{" "}
    </>
  );
};

export default protectedRoute(Profile);
