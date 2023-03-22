import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import Button_Component from "./button_component";
import * as Yup from "yup";
import axiosInstance from "@/utils/axios.instance";
import { toast } from "react-toastify";

const UserCreateSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 characters at minimum")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const ChangePassword = ({ closePopup, id, call }) => {
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values) => {
    console.log(values);
    const { password } = values;
    try {
      const data = await axiosInstance.patch(`/users/${id}`, { password });
      call();
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message || "Something went wrong",
        { position: toast.POSITION.TOP_RIGHT }
      );
    }

    closePopup(false);
  };

  return (
    <div className="bg-slate-200 p-8 rounded-md min-w-[400px] relative">
      <span
        className="absolute top-5 right-5 cursor-pointer"
        onClick={() => closePopup(false)}
      >
        <RxCross2 size={20} />
      </span>
      <Formik
        validationSchema={UserCreateSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {() => {
          return (
            <Form className="flex flex-col gap-3">
              <h6 className="text-center font-semibold text-lg">
                Change Password
              </h6>
              <div className="field_wrapper relative">
                <label htmlFor="password">New Password</label>
                <Field
                  type={currentPasswordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  className="border p-1 border-solid border-gray-500 rounded-md"
                  placeholder="Enter New Password"
                />
                <span
                  className="absolute bottom-2 right-3 cursor-pointer"
                  onClick={() => setCurrentPasswordVisible((prev) => !prev)}
                >
                  {currentPasswordVisible ? (
                    <AiFillEyeInvisible size={20} />
                  ) : (
                    <AiFillEye size={20} />
                  )}
                </span>

                <ErrorMessage
                  component="span"
                  name="password"
                  className="text-red-500"
                />
              </div>

              <div className="field_wrapper relative">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field
                  type={newPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  className="border p-1 border-solid border-gray-500 rounded-md"
                  placeholder="Enter Confirm Password"
                />
                <span
                  className="absolute bottom-2 right-3 cursor-pointer"
                  onClick={() => setNewPasswordVisible((prev) => !prev)}
                >
                  {newPasswordVisible ? (
                    <AiFillEyeInvisible size={20} />
                  ) : (
                    <AiFillEye size={20} />
                  )}
                </span>
                <ErrorMessage
                  component="span"
                  name="confirmPassword"
                  className="text-red-500"
                />
              </div>

              <Button_Component buttonText="Submit" type="submit" />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ChangePassword;
