import React from "react";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";

const UserComponent = () => {
  return (
    <div className="m-6">
      <div className="flex flex-row items-center justify-between">
        <p className="text-2xl">Users</p>
        <button className="border border-blue-500 mr-5 w-14 h-8 p-1 bg-blue-500 rounded-md hover:bg-blue-700 ">
          <IoMdAdd className="ml-4 text-white" />
        </button>
      </div>
      <div className="mt-10">
        <button className="text-white  border rounded-md bg-blue-500 h-10 w-24">
          See Users
        </button>
        <button className="text-white  border rounded-md bg-blue-500 h-10 w-24 ml-6 ">
          Refresh
        </button>
      </div>
      <div className="flex flex-col mt-5">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 w-60 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Date of Joining
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-5 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      1
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800 whitespace-nowrap">
                      vraj
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800 whitespace-nowrap">
                      Operator
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800 whitespace-nowrap">
                      16/03/2023
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800 whitespace-nowrap">
                      <a href="#">
                        <AiOutlineEdit />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComponent;
