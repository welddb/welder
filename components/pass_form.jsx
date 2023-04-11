import axiosInstance from "@/utils/axios.instance";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import Button_Component from "./button_component";

const Pass_Form = ({ closePopup, initialValues, selectedIndex, type }) => {
  console.log(selectedIndex, "selectedIndex");
  const router = useRouter();

  const handleSubmit = (values) => {
    console.log(values);
    if (type === "edit") {
      editPass(values, selectedIndex);
    } else {
      addPass(values);
    }
  };

  const addPass = async (values) => {
    try {
      const data = await axiosInstance.post("/welders/pass", {
        welderId: router.query.id,
        ...values,
      });
      console.log(data, "got the data");
      closePopup();
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.error?.message || "Something went wrong",
        { position: toast.POSITION.TOP_RIGHT }
      );
    }
  };

  const editPass = async (values, id) => {
    try {
      const data = await axiosInstance.put("/welders/pass", {
        passId: id,
        ...values,
      });
      closePopup();
      console.log(data, "edit pass data");
    } catch (error) {
      console.log(error, "edit pass error");
    }
  };

  return (
    <div className="bg-slate-200 p-8 rounded-md min-w-[400px] relative">
      <span
        className="absolute top-5 right-5 cursor-pointer"
        onClick={closePopup}
      >
        <RxCross2 size={20} />
      </span>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => {
          return (
            <Form className="flex flex-col gap-3">
              <div className="field_wrapper">
                <label htmlFor="voltage">Voltage</label>
                <Field
                  type="text"
                  name="voltage"
                  id="voltage"
                  placeholder="Please Enter Voltage"
                  className="input_class"
                />
              </div>

              <div className="field_wrapper">
                <label htmlFor="current">Current</label>
                <Field
                  type="text"
                  name="current"
                  id="current"
                  placeholder="Please Enter Current"
                  className="input_class"
                />
              </div>

              <div className="field_wrapper">
                <label htmlFor="gasflow">Gasflow</label>
                <Field
                  type="text"
                  name="gasflow"
                  id="gasflow"
                  placeholder="Please Enter Gasflow"
                  className="input_class"
                />
              </div>

              <div className="field_wrapper">
                <label htmlFor="wireDiameter">Wire Diameter</label>
                <Field
                  type="text"
                  name="wireDiameter"
                  id="wireDiameter"
                  placeholder="Please Enter Wire Diameter"
                  className="input_class"
                />
              </div>

              <div className="field_wrapper">
                <label htmlFor="xCoordinate">X Coordinate</label>
                <Field
                  type="text"
                  name="xCoordinate"
                  id="xCoordinate"
                  placeholder="Please Enter X coordinate"
                  className="input_class"
                />
              </div>

              <div className="field_wrapper">
                <label htmlFor="yCoordinate">Y Coordinate</label>
                <Field
                  type="text"
                  name="yCoordinate"
                  id="yCoordinate"
                  placeholder="Please Enter Y Coordinate"
                  className="input_class"
                />
              </div>

              <div className="field_wrapper">
                <label htmlFor="zCoordinate">Z Coordinate</label>
                <Field
                  type="text"
                  name="zCoordinate"
                  id="zCoordinate"
                  placeholder="Please Enter Z Coordinate"
                  className="input_class"
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

export default Pass_Form;
