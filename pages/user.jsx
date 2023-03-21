import Button_Component from "@/components/button_component";
import ChangePassword from "@/components/changePassword";
import protectedRoute from "@/components/protected";
import Table_Component from "@/components/table_component";
import { User_Body_Data, User_Head_Data } from "@/components/User_Data";
import User_Form from "@/components/user_form";
import axiosInstance from "@/utils/axios.instance";
import { get } from "mongoose";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";

const User = () => {
  const { status, data: sessionData } = useSession();

  const [formPopup, setFormPopup] = useState({
    popupOpen: false,
    popupType: "",
  });
  const [type, setType] = useState("Add");
  const [id, setid] = useState(0);
  const [intialValues, setInitialValues] = useState({
    id: "",
    userName: "",
    role: sessionData.role === "admin" ? "supervisor" : "operator",
    joinDate: "",
    email: "",
    password: "",
  });

  const [data, setData] = useState([]);

  const getUsers = async () => {
    try {
      setData([]);
      const data = await axiosInstance.get("/users");
      setData(
        sessionData.role === "admin"
          ? data.data.data
          : data.data.data.filter((item) => item.role === "operator")
      );
      // setData([]);
      // console.log(
      //   data.data.data.filter((item) => item.role === "operator"),
      //   "got the data"
      // );
    } catch (error) {
      setData([]);
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const setComplete = (val) => {
    setFormPopup({ popupOpen: false, popupType: "" });
    getUsers();
  };

  return (
    <>
      {formPopup.popupOpen && (
        <div className="h-screen z-20 w-screen fixed bg-black/50 top-0 left-0 flex items-center justify-center">
          {formPopup.popupType === "changePassword" && (
            <ChangePassword
              closePopup={setFormPopup}
              id={id}
              call={setComplete}
            />
          )}
          {formPopup.popupType === "newUser" && (
            <User_Form
              closePopup={() =>
                setFormPopup({ popupOpen: false, popupType: "" })
              }
              setFormPopup={setComplete}
              initialValuesProps={intialValues}
              type={type}
            />
          )}
        </div>
      )}
      <div className="p-8 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-lg">User</h4>
          <Button_Component
            buttonText="+"
            onClick={() => {
              setInitialValues({
                id: "",
                userName: "",
                role: sessionData.role === "admin" ? "supervisor" : "operator",
                joinDate: "",
                email: "",
                password: "",
              });
              setType("Add");
              setFormPopup({ popupOpen: true, popupType: "newUser" });
            }}
          />
        </div>

        <Button_Component
          buttonText="Refresh"
          buttonClass="self-start"
          onClick={getUsers}
        />

        <Table_Component
          setComplete={setComplete}
          editPopup={(values) => {
            setInitialValues({
              id: values._id,
              userName: values.userName,
              role: values.role,
              joinDate: values.joinDate.split("T")[0],
              email: values.email,
              password: values.password,
            });
            setType("Edit");
            setid(values._id);
            setFormPopup({ popupOpen: true, popupType: "changePassword" });
          }}
          header_data={User_Head_Data}
          body_data={data}
          editIcon={
            <span className="text-xs cursor-pointer font-semibold text-blue-500 hover:text-blue-700 transition-all underline">
              Change Password
            </span>
          }
          viewDetails=""
        />
      </div>
    </>
  );
};

export default protectedRoute(User);
