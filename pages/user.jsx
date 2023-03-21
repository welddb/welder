import Button_Component from "@/components/button_component";
import protectedRoute from "@/components/protected";
import Table_Component from "@/components/table_component";
import { User_Body_Data, User_Head_Data } from "@/components/User_Data";
import User_Form from "@/components/user_form";
import axiosInstance from "@/utils/axios.instance";
import { get } from "mongoose";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";

const User = () => {
  const [formPopup, setFormPopup] = useState(false);
  const [type, setType] = useState("Add");
  const [intialValues, setInitialValues] = useState({
    id: "",
    userName: "",
    role: "supervisor",
    joinDate: "",
    email: "",
    password: "",
  });

  const [data, setData] = useState([]);

  const getUsers = async () => {
    try {
      setData([]);
      const data = await axiosInstance.get("/users");
      setData(data.data.data);
      // setData([]);
      console.log(data.data);
    } catch (error) {
      setData([]);
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const setComplete = (val) => {
    setFormPopup(false);
    getUsers();
  };

  return (
    <>
      {formPopup && (
        <div className="h-screen w-screen fixed bg-black/50 top-0 left-0 flex items-center justify-center">
          <User_Form
            closePopup={setFormPopup}
            setFormPopup={setComplete}
            initialValuesProps={intialValues}
            type={type}
          />
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
                role: "supervisor",
                joinDate: "",
                email: "",
                password: "",
              });
              setType("Add");
              setFormPopup(true);
            }}
          />
        </div>

        <Button_Component
          buttonText="Refresh"
          buttonClass="self-start"
          onClick={getUsers}
        />

        <Table_Component
          editPopup={(values) => {
            setInitialValues({
              id: values._id,
              userName: values.userName,
              role: values.role,
              joinDate: values.joinDate.split("T")[0],
              email: values.email,
              password: "",
            });
            setType("Edit");
            setFormPopup(true);
          }}
          header_data={User_Head_Data}
          body_data={data}
          editIcon={
            <AiFillEdit className="cursor-pointer hover:text-blue-400" />
          }
        />
      </div>
    </>
  );
};

export default protectedRoute(User);
