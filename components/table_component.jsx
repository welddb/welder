import React from "react";
import moment from "moment";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axios.instance";
import { useSession } from "next-auth/react";

const Table_Component = ({
  setComplete = "",
  editPopup,
  header_data = [],
  body_data = [],
  editIcon = "",
  type = "user",
  viewDetails = "",
}) => {
  const { status, data: sessionData } = useSession();
  const router = useRouter();
  console.log(body_data, "body_data");

  const handleChange = (e, id) => {
    console.log(
      {
        ...body_data.find((item) => item._id === id),
        role: e.target.value,
      },
      "changed user data"
    );

    editUser(id, {
      ...body_data.find((item) => item._id === id),
      role: e.target.value,
    });
  };

  const editUser = async (id, values) => {
    try {
      console.log(id);
      const data = await axiosInstance.put(`/users/${id}`, values);
      // console.log(data.data);
      // setFormPopup(false);
      setComplete();
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message || "Something went wrong",
        { position: toast.POSITION.TOP_RIGHT }
      );
      // console.log(error.response.data.error.message);
    }
  };

  return (
    <div className="h-[67vh] overflow-y-scroll hide_scrollbar">
      <table className="w-full border-separate border-spacing-y-3">
        <thead className="bg-slate-200 sticky top-0">
          <tr>
            {header_data.map((item, i) => (
              <th key={i} className="py-2 text-left">
                {item.text}
              </th>
            ))}
            {(editIcon !== "" || viewDetails !== "") && <th></th>}
          </tr>
        </thead>

        <tbody>
          {body_data.map((data, i) => (
            <tr key={i} className="text-center bg-slate-100">
              <td className="py-2">
                {type === "user" ? data._id : data.seamName}
              </td>
              <td className="py-2">
                {type === "user" ? data.userName : data.process}
              </td>
              <td className="py-2">
                {type === "user" ? (
                  sessionData.role === "admin" ? (
                    <select
                      name="role"
                      value={data.role}
                      onChange={(e) => {
                        handleChange(e, data._id);
                      }}
                      id="role"
                      className="bg-[transparent] cursor-pointer focus:outline-none"
                    >
                      <option value="supervisor">Supervisor</option>

                      <option value="operator">Operator</option>
                    </select>
                  ) : (
                    <span>{data.role}</span>
                  )
                ) : (
                  <span>{data.voltage}</span>
                )}
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
    </div>
  );
};

export default Table_Component;
