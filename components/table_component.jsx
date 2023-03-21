import React from "react";
import moment from "moment";
import { useRouter } from "next/router";

const Table_Component = ({
  editPopup,
  header_data = [],
  body_data = [],
  editIcon = "",
  type = "user",
  viewDetails = "",
}) => {
  const router = useRouter();
  console.log(body_data, "body_data");

  return (
    <table className="w-full border-separate border-spacing-y-3">
      <thead>
        <tr>
          {header_data.map((item, i) => (
            <th key={i} className="py-2 text-left">
              {item.text}
            </th>
          ))}
          {editIcon !== "" || (viewDetails !== "" && <th></th>)}
        </tr>
      </thead>

      <tbody>
        {body_data.map((data, i) => (
          <tr key={i} className="text-center bg-slate-100">
            <td className="py-2">{data._id}</td>
            <td className="py-2">
              {type === "user" ? data.userName : data.process}
            </td>
            <td className="py-2">
              {type === "user" ? data.role : data.voltage}
            </td>
            <td className="py-2">
              {type === "user"
                ? moment(data.joinDate).format("DD/MM/yyyy")
                : data.current}
            </td>
            <td className="py-2">
              {type === "user" ? "******" : data.gasflow}
            </td>
            {editIcon !== "" && (
              <td onClick={() => editPopup(data)}>{editIcon}</td>
            )}
            {viewDetails !== "" && (
              <td onClick={() => router.push(`/welder/${data._id}`)}>
                {viewDetails}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table_Component;
