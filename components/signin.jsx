import React from "react";
import { Field, Form, Formik } from "formik";

const Signin = () => {
  const initialValues = {
    userName: "",
    password: "",
  };

  const handleSubmit = (values) => {
    console.log(values, "values");
  };
  return (
    <div className="bg-slate-100 border border-solid rounded-lg ">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => {
          return (
            <Form className="flex flex-col shadow-3xl w-96 h-60 justify-center ">
              <h3 className="text-2xl ml-40 mt-0 font-bold text-gray-800">
                Login
              </h3>
              <label className="ml-7 mt-1">Username</label>
              <Field
                type="text"
                name="userName"
                className="border border-solid border-gray-500 ml-7 p-1 w-5/6 rounded-md"
                placeholder="Enter your username"
              />
              <label className="ml-7 mt-1">Password</label>
              <Field
                type="password"
                name="password"
                className="border border-solid border-gray-500 ml-7 p-1 w-5/6  rounded-md"
                placeholder="Enter your password"
              />
              <button
                className="border border-solid border-black mt-3 ml-7 p-1 w-5/6  rounded-md bg-slate-800 text-white"
                type="submit"
              >
                Login
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Signin;
