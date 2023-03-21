import protectedRoute from "@/components/protected";
import User_Form from "@/components/user_form";
import axiosInstance from "@/utils/axios.instance";
import moment from "moment";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [formPopup, setFormPopup] = useState(false);
  const [data, setData] = useState({});
  // const [intialValues, setInitialValues] = useState({
  //   id: "",
  //   userName: "",
  //   role: "supervisor",
  //   joinDate: "",
  //   email: "",
  //   password: "",
  // });

  const getProfile = async () => {
    try {
      setData({});
      const data = await axiosInstance.get("/users/profile");

      setData(data.data.data);

      console.log(data.data.data, "profile data");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  // const setComplete = (val) => {
  //   setFormPopup(false);
  //   getProfile();
  // };

  return (
    <>
      {/* {formPopup && (
        <div className="h-screen w-screen fixed bg-black/50 top-0 left-0 flex items-center justify-center">
          <User_Form
            closePopup={setFormPopup}
            setFormPopup={setComplete}
            initialValuesProps={intialValues}
            type="editProfile"
          />
        </div>
      )} */}
      <div className="p-8 flex flex-col gap-2">
        {/* <span
          className="absolute right-0"
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
          Edit
        </span> */}
        <h6 className="font-bold text-lg">My Profile</h6>
        <p>Username:</p>
        <h6 className="font-bold">{data.userName}</h6>

        <p>id</p>
        <h6 className="font-bold">{data._id}</h6>

        <p>Email:</p>
        <h6 className="font-bold">{data.email}</h6>

        <p>Role:</p>
        <h6 className="font-bold">{data.role}</h6>

        <p>Join date:</p>
        <h6 className="font-bold">{data.joinDate}</h6>
      </div>{" "}
    </>
  );
};

export default protectedRoute(Profile);
