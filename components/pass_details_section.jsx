import axiosInstance from "@/utils/axios.instance";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { CgAsterisk } from "react-icons/cg";
import { MdArrowRight } from "react-icons/md";
import Button_Component from "./button_component";
import Pass_Form from "./pass_form";

const Pass_Details_Section = ({ data, getPass }) => {
  const router = useRouter();
  const [formPopup, setFormPopup] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [formType, setFormType] = useState("add");

  const [initialValues, setInitialValues] = useState({
    voltage: "",
    current: "",
    gasflow: "",
    wireDiameter: "",
    xCoordinate: "",
    yCoordinate: "",
    zCoordinate: "",
  });

  const closePopup = () => {
    setFormPopup(false);
    getPass(router.query.id);
  };

  console.log(data, "data");
  return (
    <>
      {formPopup && (
        <div className="bg-black/50 h-screen w-screen fixed z-10 top-0 left-0 flex items-center justify-center">
          <Pass_Form
            selectedIndex={selectedIndex}
            initialValues={initialValues}
            closePopup={closePopup}
            type={formType}
          />
        </div>
      )}

      <div className="flex flex-col">
        <div className="self-end flex gap-2">
          {" "}
          <Button_Component
            buttonText="Refresh"
            buttonClass="self-start"
            onClick={() => getPass(router.query.id)}
          />
          <Button_Component
            buttonText="+"
            onClick={() => {
              setInitialValues({
                voltage: "",
                current: "",
                gasflow: "",
                wireDiameter: "",
                xCoordinate: "",
                yCoordinate: "",
                zCoordinate: "",
              });
              setFormPopup(true);
              setFormType("add");
            }}
          />
        </div>

        <div className="flex flex-col gap-2 h-[70.5vh] overflow-y-scroll hide_scrollbar">
          {data.length === 0 ? (
            <h3>No Passes Added.</h3>
          ) : (
            data.map((item, i) => (
              <div key={i} className="welder_details flex flex-col gap-2">
                <span className="h-[1px] w-full bg-gray-400 my-4"></span>

                <div className="flex justify-between">
                  <h2 className="font-bold text-lg flex items-center gap-1">
                    <MdArrowRight />
                    Pass {i + 1}
                  </h2>
                  <AiFillEdit
                    onClick={() => {
                      setInitialValues({
                        voltage: item.voltage,
                        current: item.current,
                        gasflow: item.gasflow,
                        wireDiameter: item.wireDiameter,
                        xCoordinate: item.xCoordinate,
                        yCoordinate: item.yCoordinate,
                        zCoordinate: item.zCoordinate,
                      });
                      setFormPopup(true);
                      setFormType("edit");
                      setSelectedIndex(item._id);
                    }}
                    className="cursor-pointer hover:text-blue-400"
                  />
                </div>

                <div className="welder_container">
                  <div>
                    <p>Voltage :</p>
                    <h6>{item.voltage || "-"}</h6>
                  </div>
                  <div>
                    <p>Current :</p>
                    <h6>{item.current || "-"}</h6>
                  </div>
                  <div>
                    <p>Gasflow :</p>
                    <h6>{item.gasflow || "-"}</h6>
                  </div>
                  <div>
                    <p className="whitespace-nowrap">Wire Diameter :</p>
                    <h6>{item.wireDiameter || "-"}</h6>
                  </div>
                </div>

                <div className="welder_container">
                  <div>
                    <p>X Coordinate :</p>
                    <h6>{item.xCoordinate || "-"}</h6>
                  </div>
                  <div>
                    <p>Y Coordinate :</p>
                    <h6>{item.yCoordinate || "-"}</h6>
                  </div>
                  <div>
                    <p>Z Coordinate :</p>
                    <h6>{item.zCoordinate || "-"}</h6>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Pass_Details_Section;
