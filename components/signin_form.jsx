import React from "react";
import { Field, Form, Formik } from "formik";
import Button_Component from "./button_component";

const Signin_Form = () => {
  const initialValues = {
    userName: "",
    password: "",
  };

  const handleSubmit = (values) => {
    console.log(values, "values");
  };
  return (
    <div className="bg-slate-100 min-w-[25vw] border border-solid rounded-lg ">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => {
          return (
            <Form className="flex flex-col p-10 shadow-3xl gap-4">
              <h3 className="text-2xl font-bold text-gray-800 self-center">
                Login
              </h3>
              <div className="flex flex-col gap-2">
                <label>Username</label>
                <Field
                  type="text"
                  name="userName"
                  className="border p-1 border-solid border-gray-500 rounded-md"
                  placeholder="Enter your username"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>Password</label>
                <Field
                  type="password"
                  name="password"
                  className="border p-1 border-solid border-gray-500 rounded-md"
                  placeholder="Enter your password"
                />
              </div>

              <Button_Component
                buttonText="Submit"
                type="submit"
                onClick={null}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Signin_Form;
