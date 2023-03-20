import React from "react";
import moment from 'moment';

const Table_Component = ({
  editPopup,
  header_data = [],
  body_data = [],
  editIcon = "",
  type= 'user'
}) => {
  return (
    <table className="w-full border-separate border-spacing-y-3">
      <thead>
        <tr>
          {header_data.map((item, i) => (
            <th key={i} className="py-2 text-left">
              {item.text}
            </th>
          ))}
          {editIcon !== "" && <th></th>}
        </tr>
      </thead>

      <tbody>
        {body_data.map((data, i) => (
          <tr key={i} className="text-center bg-slate-100">
            <td className="py-2">{data._id}</td>
            <td className="py-2">{type==='user' ? data.userName : data.gas}</td>
            <td className="py-2">{type==='user' ? data.role : data.voltage}</td>
            <td className="py-2">
              {type==='user' ? moment(data.joinDate).format('DD/MM/yyyy') : data.current}
            </td>
            <td className="py-2">
              {type==='user' ? '******' : data.gasflow}
            </td>
            {editIcon !== "" && <td onClick={()=>editPopup(data)}>{editIcon}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table_Component;
