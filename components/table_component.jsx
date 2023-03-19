import React from "react";

const Table_Component = ({
  editPopup,
  header_data = [],
  body_data = [],
  editIcon = "",
}) => {
  return (
    <table className="w-full border-separate border-spacing-y-3">
      <thead>
        <tr>
          {header_data.map((item, i) => (
            <th key={i} className="py-2 text-center">
              {item.text}
            </th>
          ))}
          {editIcon !== "" && <th></th>}
        </tr>
      </thead>

      <tbody>
        {body_data.map((data, i) => (
          <tr key={i} className="text-center bg-slate-100">
            <td className="py-2">{data.id}</td>
            <td className="py-2">{data.name ? data.name : data.process}</td>
            <td className="py-2">{data.role ? data.role : data.voltage}</td>
            <td className="py-2">
              {data.joining_date ? data.joining_date : data.current}
            </td>
            <td className="py-2">
              {data.password ? data.password : data.gas_flow}
            </td>
            {editIcon !== "" && <td onClick={editPopup}>{editIcon}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table_Component;
