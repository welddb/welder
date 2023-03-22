import { Field, Form, Formik } from "formik";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import Button_Component from "./button_component";
import * as Yup from "yup";
import axiosInstance from "@/utils/axios.instance";
import { toast } from "react-toastify";

const Welder_Form = ({
  setFormPopup,
  type,
  initialValuesProps,
  closePopup,
}) => {
  const initialValues = initialValuesProps || {
    // id: "",
    seamName: "",
    process: "mig",
    voltage: "",
    current: "",
    gasflow: "",
    preheatTemp: "",
    wireFeedSpeed: "",
    wireDiameter: "",
    composition_material_1: "",
    thickness_material_1: "",
    composition_material_2: "",
    thickness_material_2: "",
    filler: "",
    gas: "",
    // fileUrl: "",
  };

  const handleSubmit = (values) => {
    // console.log(values);

    const { id, ...rest } = values;
    if (type == "Edit") {
      editWelder(id, rest);
    } else {
      addWelder(values);
    }
  };

  const editWelder = async (id, values) => {
    try {
      const data = await axiosInstance.put(`/welders/${id}`, values);
      setFormPopup(false);
    } catch (error) {
      console.log(error, "welder error");
      toast.error(
        error?.response?.data?.error?.message || "Something went wrong",
        { position: toast.POSITION.TOP_RIGHT }
      );
    }
  };

  const addWelder = async (values) => {
    try {
      const data = await axiosInstance.post("/welders", {
        ...values,
        baseMaterail1: {
          composition: values.composition_material_1,
          thickness: values.thickness_material_1,
        },
        baseMaterail2: {
          composition: values.composition_material_2,
          thickness: values.thickness_material_2,
        },
      });
      console.log(data, "got the data");
      setFormPopup(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message || "Something went wrong",
        { position: toast.POSITION.TOP_RIGHT }
      );
    }
  };

  return (
    <div className="bg-slate-200 p-8 rounded-md min-w-[400px] relative">
      <span
        className="absolute top-5 right-5 cursor-pointer"
        onClick={() => closePopup(false)}
      >
        <RxCross2 size={20} />
      </span>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => {
          return (
            <Form className="flex flex-col gap-3 h-[80vh] overflow-y-scroll hide_scrollbar">
              <h6 className="text-center font-semibold text-lg">Add Welder</h6>

              {/* <div className="field_wrapper">
                <label htmlFor="id">Id</label>
                <Field
                  type="text"
                  name="id"
                  id="id"
                  placeholder="Please Enter Id"
                  className="input_class"
                />
              </div> */}

              <div className="field_wrapper">
                <label htmlFor="seamName">Seam Name</label>
                <Field
                  type="text"
                  name="seamName"
                  id="seamName"
                  placeholder="Please Enter Seam Name"
                  className="input_class"
                />
              </div>

              <div className="field_wrapper">
                <label htmlFor="process">Process</label>
                <Field
                  as="select"
                  name="process"
                  id="process"
                  className="input_class"
                >
                  <option value="mig">MIG</option>
                  <option value="tig">TIG</option>
                  <option value="plasma">Plasma</option>
                </Field>
              </div>

              <div className="flex gap-2">
                <div className="field_wrapper">
                  <label htmlFor="voltage">Voltage</label>
                  <Field
                    name="voltage"
                    id="voltage"
                    type="text"
                    placeholder="Enter Voltage"
                    className="input_class"
                  />
                </div>
                <div className="field_wrapper">
                  <label htmlFor="current">Current</label>
                  <Field
                    name="current"
                    id="current"
                    type="text"
                    placeholder="Enter Current"
                    className="input_class"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="field_wrapper">
                  <label htmlFor="gasflow">Gas Flow</label>
                  <Field
                    name="gasflow"
                    id="gasflow"
                    type="text"
                    placeholder="Enter Gas Flow"
                    className="input_class"
                  />
                </div>
                <div className="field_wrapper">
                  <label htmlFor="preheatTemp">Preheat Temperature</label>
                  <Field
                    name="preheatTemp"
                    id="preheatTemp"
                    type="text"
                    placeholder="Enter Preheat Temperature"
                    className="input_class"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="field_wrapper">
                  <label htmlFor="wireFeedSpeed">Wire feed Speed</label>
                  <Field
                    name="wireFeedSpeed"
                    id="wireFeedSpeed"
                    type="text"
                    placeholder="Enter Wirefeed Speed"
                    className="input_class"
                  />
                </div>
                <div className="field_wrapper">
                  <label htmlFor="wireDiameter">Wire Diameter</label>
                  <Field
                    name="wireDiameter"
                    id="wireDiameter"
                    type="text"
                    placeholder="Enter Wire Diameter"
                    className="input_class"
                  />
                </div>
              </div>

              <div className="">
                <h6 className="font-bold">Base Material 1</h6>
                <div className="flex gap-2">
                  <div className="field_wrapper">
                    <label htmlFor="composition_material_1">Composition</label>
                    <Field
                      name="composition_material_1"
                      id="composition_material_1"
                      type="text"
                      placeholder="Enter Composition"
                      className="input_class"
                    />
                  </div>
                  <div className="field_wrapper">
                    <label htmlFor="thickness_material_1">Thickness</label>
                    <Field
                      name="thickness_material_1"
                      id="thickness_material_1"
                      type="text"
                      placeholder="Enter Thickness"
                      className="input_class"
                    />
                  </div>
                </div>
              </div>

              <div className="">
                <h6 className="font-bold">Base Material 2</h6>
                <div className="flex gap-2">
                  <div className="field_wrapper">
                    <label htmlFor="composition_material_2">Composition</label>
                    <Field
                      name="composition_material_2"
                      id="composition_material_2"
                      type="text"
                      placeholder="Enter Composition"
                      className="input_class"
                    />
                  </div>
                  <div className="field_wrapper">
                    <label htmlFor="thickness_material_2">Thickness</label>
                    <Field
                      name="thickness_material_2"
                      id="thickness_material_2"
                      type="text"
                      placeholder="Enter Thickness"
                      className="input_class"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="field_wrapper">
                  <label htmlFor="filler">Filler</label>
                  <Field
                    name="filler"
                    id="filler"
                    type="text"
                    placeholder="Enter Filler"
                    className="input_class"
                  />
                </div>
                <div className="field_wrapper">
                  <label htmlFor="gas">Gas</label>
                  <Field
                    name="gas"
                    id="gas"
                    type="text"
                    placeholder="Enter Gas"
                    className="input_class"
                  />
                </div>
              </div>

              {/* <div className="field_wrapper">
                <label htmlFor="fileUrl">File</label>
                <Field
                  type="file"
                  name="fileUrl"
                  id="fileUrl"
                  className="input_class"
                />
              </div> */}

              <Button_Component buttonText="Submit" type="submit" />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Welder_Form;
