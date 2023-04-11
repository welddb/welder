import Pass_Details_Section from "@/components/pass_details_section";
import protectedRoute from "@/components/protected";
import Welder_Details_Container from "@/components/welder_details_section";
import Welder_Form from "@/components/welder_form";
import axiosInstance from "@/utils/axios.instance";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";

const Welder_Details = () => {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [passData, setPassData] = useState([]);
  const getWelder = async (id) => {
    try {
      setData([]);

      const data = await axiosInstance.get(`/welders/${id}`);

      setData(data.data.data);

      // console.log(data.data.data, "welder id data");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.error?.message || "Something went wrong",
        { position: toast.POSITION.TOP_RIGHT }
      );
    }
  };

  const getPass = async (values) => {
    try {
      const data = await axiosInstance.get(`/welders/pass?welderId=${values}`);
      // console.log(data, "get data");
      setPassData(data.data.data);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.error?.message || "Something went wrong",
        { position: toast.POSITION.TOP_RIGHT }
      );
    }
  };

  useEffect(() => {
    getWelder(router.query.id);
    getPass(router.query.id);
  }, []);

  // console.log(router.query.id);
  const [multipassSection, setMultipassSection] = useState(false);
  const [formPopup, setFormPopup] = useState(false);
  const [type, setType] = useState("Add");
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

  const setComplete = (val) => {
    setFormPopup(false);
    getWelder(router.query.id);
  };

  return (
    <>
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
          <div className="flex gap-6">
            <h4
              className={`font-bold text-lg cursor-pointer ${
                multipassSection ? "text-black" : "text-blue-600 underline"
              }`}
              onClick={() => setMultipassSection(false)}
            >
              Welder Details
            </h4>
            <h4
              className={`font-bold text-lg cursor-pointer ${
                multipassSection ? "text-blue-600 underline" : "text-black"
              }`}
              onClick={() => setMultipassSection(true)}
            >
              Multi Pass Details
            </h4>
          </div>
          {!multipassSection && (
            <AiFillEdit
              className="cursor-pointer hover:text-blue-400"
              onClick={(values) => {
                setInitialValues({
                  id: data._id,
                  seamName: data.seamName,
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
          )}
        </div>
        {!multipassSection && (
          <p className="text-gray-500">{"#" + router.query.id}</p>
        )}

        {multipassSection ? (
          <Pass_Details_Section getPass={getPass} data={passData} />
        ) : (
          <Welder_Details_Container data={data} />
        )}
      </div>
    </>
  );
};

export default protectedRoute(Welder_Details);
