import Button_Component from "@/components/button_component";
import Table_Component from "@/components/table_component";
import { Welder_Body_Data, Welder_Head_Data } from "@/components/Welder_Data";
import Welder_Form from "@/components/welder_form";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";

const Welder = () => {
  const [formPopup, setFormPopup] = useState(false);
  return (
    <>
      {formPopup && (
        <div className="h-screen w-screen fixed bg-black/50 top-0 left-0 flex items-center justify-center">
          <Welder_Form setFormPopup={setFormPopup} />
        </div>
      )}
      <div className="p-8 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-lg">Welder</h4>
          <Button_Component buttonText="+" onClick={() => setFormPopup(true)} />
        </div>

        <Button_Component buttonText="Refresh" buttonClass="self-start" />

        <Table_Component
          editPopup={() => setFormPopup(true)}
          header_data={Welder_Head_Data}
          body_data={Welder_Body_Data}
          editIcon={
            <AiFillEdit className="cursor-pointer hover:text-blue-400" />
          }
        />
      </div>
    </>
  );
};

export default Welder;
