import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import Button_Component from "./button_component";
import { RxCross2 } from "react-icons/rx";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const User_Form = ({ setFormPopup }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const initialValues = {
    id: "",
    name: "",
    role: "supervisor",
    joining_date: "",
    password: "",
  };

  const handleSubmit = (values) => {
    console.log(values);
    setFormPopup(false);
  };

  return (
    <div className="bg-slate-200 p-8 rounded-md min-w-[400px] relative">
      <span
        className="absolute top-5 right-5 cursor-pointer"
        onClick={() => setFormPopup(false)}
      >
        <RxCross2 size={20} />
      </span>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => {
          return (
            <Form className="flex flex-col gap-3">
              <h6 className="text-center font-semibold text-lg">Add User</h6>

              <div className="field_wrapper">
                <label htmlFor="name">Name</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Please Enter User Name"
                  className="input_class"
                />
              </div>

              <div className="field_wrapper">
                <label htmlFor="id">Id</label>
                <Field
                  type="text"
                  name="id"
                  id="id"
                  placeholder="Please Enter Id"
                  className="input_class"
                />
              </div>

              <div className="field_wrapper">
                <label htmlFor="role">Role</label>
                <Field
                  as="select"
                  name="role"
                  id="role"
                  className="input_class"
                >
                  <option value="supervisor">Supervisor</option>
                  <option value="operator">Operator</option>
                </Field>
              </div>

              <div className="field_wrapper">
                <label htmlFor="joining_date">Date of Joining</label>
                <Field
                  name="joining_date"
                  type="date"
                  id="joining_date"
                  className="input_class"
                />
              </div>

              <div className="field_wrapper relative">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  className="input_class"
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
              </div>

              <Button_Component buttonText="Submit" type="submit" />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default User_Form;
