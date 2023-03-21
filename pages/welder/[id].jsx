import Button_Component from "@/components/button_component";
import Welder_Form from "@/components/welder_form";
import axiosInstance from "@/utils/axios.instance";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";

const Welder_Details = () => {
  const router = useRouter();

  const [data, setData] = useState([]);
  const getWelder = async (id) => {
    try {
      setData([]);

      const data = await axiosInstance.get(`/welders/${id}`);

      setData(data.data.data);

      console.log(data.data.data, "welder id data");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWelder(router.query.id);
  }, []);

  console.log(router.query.id);

  const [formPopup, setFormPopup] = useState(false);
  const [type, setType] = useState("Add");
  const [intialValues, setInitialValues] = useState({
    id: "",
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

  const setComplete = (val) => {
    setFormPopup(false);
    getWelder(router.query.id);
  };

  return (
    <>
      {formPopup && (
        <div className="h-screen w-screen fixed bg-black/50 top-0 left-0 flex items-center justify-center">
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
          <h4 className="font-bold text-lg underline">Welder Details</h4>
          <AiFillEdit
            className="cursor-pointer hover:text-blue-400"
            onClick={(values) => {
              setInitialValues({
                id: data._id,
                process: data.process,
                voltage: data.voltage,
                current: data.current,
                gasflow: data.gasflow,
                preheatTemp: data.preheatTemp,
                wireFeedSpeed: data.wireFeedSpeed,
                wireDiameter: data.wireDiameter,
                composition_material_1: data.baseMaterail1.composition,
                thickness_material_1: data.baseMaterail1.thickness,
                composition_material_2: data.baseMaterail2.composition,
                thickness_material_2: data.baseMaterail2.thickness,
                filler: data.filler,
                gas: data.gas,
                fileUrl: data.fileUrl,
              });
              setType("Edit");
              setFormPopup(true);
            }}
          />
        </div>
        <p className="text-gray-500">{"#" + router.query.id}</p>

        <div className="welder_details flex flex-col gap-2">
          <div className="welder_container">
            {" "}
            <div>
              <p>Process :</p>
              <h6>{data.process}</h6>
            </div>
            <div>
              <p>Voltage :</p>
              <h6>{data.voltage}</h6>
            </div>
          </div>

          <div className="welder_container">
            <div>
              <p>Current :</p>
              <h6>{data.current}</h6>
            </div>

            <div>
              <p>Gasflow :</p>
              <h6>{data.gasflow}</h6>
            </div>
          </div>

          <div className="welder_container">
            <div>
              <p>PreHeat Temperature :</p>
              <h6>{data.preheatTemp}</h6>
            </div>
            <div>
              <p>Wire feed Speed :</p>
              <h6>{data.wireFeedSpeed}</h6>
            </div>
          </div>

          <div className="welder_container">
            <div>
              <p>Filler :</p>
              <h6>{data.filler}</h6>
            </div>
            <div>
              <p>Gas :</p>
              <h6>{data.gas}</h6>
            </div>
          </div>

          <div className="welder_container">
            <div>
              <p>Wire Diameter :</p>
              <h6>{data.wireDiameter}</h6>
            </div>
            <div></div>
          </div>

          <div>
            <h5 className="font-bold text-gray-700 mt-2">Material 1 :</h5>

            <div className="welder_container">
              <div>
                <p>Composition :</p>
                <h6>{data.baseMaterail1?.composition}</h6>
              </div>
              <div>
                <p>Thickness :</p>
                <h6>{data.baseMaterail1?.thickness}</h6>
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-gray-700 mt-2">Material 2 :</h5>

            <div className="welder_container">
              <div>
                <p>Composition :</p>
                <h6>{data.baseMaterail2?.composition}</h6>
              </div>
              <div>
                <p>Thickness :</p>
                <h6>{data.baseMaterail2?.thickness}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welder_Details;

// id: "",
//     process: "mig",
//     voltage: "",
//     current: "",
//     gasflow: "",
//     preheatTemp: "",
//     wireFeedSpeed: "",
//     wireDiameter: "",
//     composition_material_1: "",
//     thickness_material_1: "",
//     composition_material_2: "",
//     thickness_material_2: "",
//     filler: "",
//     gas: "",
