import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import Button_Component from "./button_component";
import { RxCross2 } from "react-icons/rx";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axiosInstance from "@/utils/axios.instance";
import * as Yup from 'yup';
import {toast} from 'react-toastify';

const UserCreateSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address format').required('Email is required'),
  role: Yup.string().required('Role is required'),
  joinDate: Yup.string().required('Join date is required'),
  userName: Yup.string().required('Username is required'),
  password: Yup.string()
    .min(6, 'Password must be 6 characters at minimum')
    .required('Password is required'),
});
const UserEditSchema = Yup.object().shape({
  role: Yup.string().required('Role is required'),
  joinDate: Yup.string().required('Join date is required'),
  userName: Yup.string().required('Username is required'),
 
});

const User_Form = ({ setFormPopup, type, initialValuesProps, closePopup}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const initialValues = initialValuesProps || {
    id: "",
    userName: "",
    role: "supervisor",
    joinDate: "",
    email: "",
    password: "",
    // ...initialValuesProps
  };

  const handleSubmit = (values) => {
    // console.log(values);
    const {id,password,email,...rest} = values;
    if(type=='Edit'){
      editUser(id,rest);
    }else{
      addUser(values);
    }
  };

  const editUser = async(id,values) => {
    try {
      console.log(id);
      const data = await axiosInstance.put(`/users/${id}`,values);
      // console.log(data.data);
      setFormPopup(false);
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || 'Something went wrong',{position:toast.POSITION.TOP_RIGHT});
      // console.log(error.response.data.error.message);
    }
  }
  const addUser = async(values) => {
    try {
      const data = await axiosInstance.post(`/users`,values);
      setFormPopup(false);
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || 'Something went wrong',{position:toast.POSITION.TOP_RIGHT});
      console.log(error.response);
    }
  }

  return (
    <div className="bg-slate-200 p-8 rounded-md min-w-[400px] relative">
      <span
        className="absolute top-5 right-5 cursor-pointer"
        onClick={() => closePopup(false)}
      >
        <RxCross2 size={20} />
      </span>
      <Formik 
      validationSchema={type==='Edit'?UserEditSchema:UserCreateSchema}
      initialValues={initialValues} onSubmit={handleSubmit}>
        {() => {
          return (
            <Form className="flex flex-col gap-3">
              <h6 className="text-center font-semibold text-lg">
                {
                  type
                } User</h6>

              <div className="field_wrapper">
                <label htmlFor="userName">Username</label>
                <Field
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="Please Enter User Name"
                  className="input_class"
                />
               <ErrorMessage component="span" name="userName" className="text-red-500" />
              </div>

              {
                type === 'Add' &&
              <div className="field_wrapper">
                <label htmlFor="email">Email Id</label>
                <Field
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Please enter email"
                  className="input_class"
                />
                <ErrorMessage component="span" name="email" className="text-red-500" />
              </div>
              } 

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
               <ErrorMessage component="span" name="role" className="text-red-500" />
              </div>

              <div className="field_wrapper">
                <label htmlFor="joinDate">Date of Joining</label>
                <Field
                  name="joinDate"
                  type="date"
                  id="joinDate"
                  className="input_class"
                />
                <ErrorMessage component="span" name="joinDate" className="text-red-500" />
              </div>
              {
                type === 'Add' &&
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
                    
               <ErrorMessage component="span" name="password" className="text-red-500" />
              </div>
        }
              <Button_Component buttonText="Submit" type="submit" />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default User_Form;
