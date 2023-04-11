import React from "react";

const Welder_Details_Container = ({ data }) => {
  console.log(data, "data");

  return (
    <div className="welder_details flex flex-col gap-2">
      <div className="welder_container">
        {" "}
        <div>
          <p>Seam Name :</p>
          <h6>{data.seamName || "-"}</h6>
        </div>
        <div>
          <p>Process :</p>
          <h6>{data.process || "-"}</h6>
        </div>
      </div>

      <div className="welder_container">
        <div>
          <p>Voltage :</p>
          <h6>{data.voltage || "-"}</h6>
        </div>
        <div>
          <p>Current :</p>
          <h6>{data.current || "-"}</h6>
        </div>
      </div>

      <div className="welder_container">
        <div>
          <p>Gasflow :</p>
          <h6>{data.gasflow || "-"}</h6>
        </div>
        <div>
          <p>PreHeat Temperature :</p>
          <h6>{data.preheatTemp || "-"}</h6>
        </div>
      </div>

      <div className="welder_container">
        <div>
          <p>Wire feed Speed :</p>
          <h6>{data.wireFeedSpeed || "-"}</h6>
        </div>
        <div>
          <p>Filler :</p>
          <h6>{data.filler || "-"}</h6>
        </div>
      </div>

      <div className="welder_container">
        <div>
          <p>Gas :</p>
          <h6>{data.gas || "-"}</h6>
        </div>
        <div>
          <p>Wire Diameter :</p>
          <h6>{data.wireDiameter || "-"}</h6>
        </div>
      </div>

      <div>
        <h5 className="font-bold text-gray-700 mt-2">Material 1 :</h5>

        <div className="welder_container">
          <div>
            <p>Composition :</p>
            <h6>{data.baseMaterail1?.composition || "-"}</h6>
          </div>
          <div>
            <p>Thickness :</p>
            <h6>{data.baseMaterail1?.thickness || "-"}</h6>
          </div>
        </div>
      </div>

      <div>
        <h5 className="font-bold text-gray-700 mt-2">Material 2 :</h5>

        <div className="welder_container">
          <div>
            <p>Composition :</p>
            <h6>{data.baseMaterail2?.composition || "-"}</h6>
          </div>
          <div>
            <p>Thickness :</p>
            <h6>{data.baseMaterail2?.thickness || "-"}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welder_Details_Container;
