import Button_Component from "@/components/button_component";
import Table_Component from "@/components/table_component";
import { User_Body_Data, User_Head_Data } from "@/components/User_Data";
import { Welder_Body_Data, Welder_Head_Data } from "@/components/Welder_Data";
import React from "react";
import { AiFillEdit } from "react-icons/ai";

const Welder = () => {
  return (
    <div className="p-8 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-lg">Welder</h4>
        <Button_Component buttonText="+" />
      </div>

      <Button_Component buttonText="Refresh" buttonClass="self-start" />

      <Table_Component
        header_data={Welder_Head_Data}
        body_data={Welder_Body_Data}
        editIcon={<AiFillEdit />}
      />
    </div>
  );
};

export default Welder;
