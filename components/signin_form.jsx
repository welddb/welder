import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Button_Component from "./button_component";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { signIn } from "next-auth/react";
import Router from "next/router";
import * as Yup from "yup";
import { toast } from "react-toastify";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be 6 characters at minimum")
    .required("Password is required"),
});

const Signin_Form = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    try {
      console.log(values, "values");
      const res = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      if (res.status === 200) {
        Router.replace("/welder");
      } else {
        toast.error(res.error || "Something went wrong", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log("cred", error);
    }
  };
  return (
    <div className="bg-slate-100 min-w-[25vw] border border-solid rounded-lg ">
      <Formik
        validationSchema={LoginSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {() => {
          return (
            <Form className="flex flex-col p-10 shadow-3xl gap-4">
              <h3 className="text-2xl font-bold text-gray-800 self-center">
                Login
              </h3>
              <div className="flex flex-col gap-2">
                <label>Username</label>
                <Field
                  type="email"
                  name="email"
                  className="border p-1 border-solid border-gray-500 rounded-md"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  component="span"
                  name="email"
                  className="text-red-500"
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label>Password</label>
                <Field
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  className="border p-1 border-solid border-gray-500 rounded-md"
                  placeholder="Enter your password"
                />
                <span
                  className="absolute bottom-2 right-3 cursor-pointer"
                  onClick={() => setPasswordVisible((prev) => !prev)}
                >
                  {passwordVisible ? (
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

              <Button_Component
                buttonText="Submit"
                type="submit"
                // onClick={null}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Signin_Form;
