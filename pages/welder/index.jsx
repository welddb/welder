import Button_Component from "@/components/button_component";
import protectedRoute from "@/components/protected";
import Table_Component from "@/components/table_component";
import { Welder_Body_Data, Welder_Head_Data } from "@/components/Welder_Data";
import Welder_Form from "@/components/welder_form";
import axiosInstance from "@/utils/axios.instance";
import { Debouncer } from "@/utils/debouncer";
import React, { useState, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";

const Welder = () => {
  const [type, setType] = useState("Add");

  const [formPopup, setFormPopup] = useState(false);
  const [intialValues, setInitialValues] = useState({
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
    fileUrl: "",
  });
  const debouncer = new Debouncer(300);
  const [data, setData] = useState([]);
  const getWelders = async (name = "") => {
    try {
      setData([]);

      const data = await axiosInstance.get("/welders?name=" + name);

      setData(data.data.data);

      console.log(data, "welders data");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWelders();
  }, []);

  const setComplete = (val) => {
    setFormPopup(false);
    getWelders();
  };

  return (
    <>
      {" "}
      {formPopup && (
        <div className="h-screen z-10 w-screen fixed bg-black/50 top-0 left-0 flex items-center justify-center">
          <Welder_Form
            closePopup={setFormPopup}
            setFormPopup={setComplete}
            initialValuesProps={intialValues}
            type={type}
          />
        </div>
      )}
      <div className="p-8 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-lg">Welder</h4>
          <Button_Component
            buttonText="+"
            onClick={() => {
              setInitialValues({
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
                fileUrl: "",
              });
              setType("Add");
              setFormPopup(true);
            }}
          />
        </div>
        <div className="flex items-stretch gap-4">
          <input
            className="input_class"
            placeholder="Search"
            onChange={(e) => {
              debouncer.debounce(() => getWelders(e.target.value));
            }}
          />
          <Button_Component
            buttonText="Refresh"
            buttonClass="self-start"
            onClick={getWelders}
          />
        </div>

        <Table_Component
          type="welder"
          header_data={Welder_Head_Data}
          body_data={data}
          editIcon=""
          viewDetails={
            <span className="text-xs cursor-pointer font-semibold text-blue-500 underline">
              VIEW DETAILS
            </span>
          }
        />
      </div>
    </>
  );
};

export default protectedRoute(Welder);
