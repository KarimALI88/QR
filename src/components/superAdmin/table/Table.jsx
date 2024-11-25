import axios from "axios";
import React, { useEffect, useState } from "react";

const Table = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_API_LINK}/admin/users-with-packages`,
      });
      console.log("response of admin ", response);
      setData(response.data.data);
    } catch (error) {
      console.error("error in admin data", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="relative flex flex-col min-w-[50%] w-fit h-full overflow-auto mx-auto text-white bg-mainColor shadow-md rounded-lg bg-clip-border">
      
      <table className="w-full text-left table-auto min-w-max">
        <thead>
          <tr>
            <th className="p-4 border-b border-slate-300 bg-slate-50 ">
              <p className="block text-lg font-semibold leading-none text-slate-500">
                Name
              </p>
            </th>
            <th className="p-4 border-b border-slate-300 bg-slate-50">
              <p className="block text-lg font-semibold leading-none text-slate-500">
                Email
              </p>
            </th>
            <th className="p-4 border-b border-slate-300 bg-slate-50">
              <p className="block text-lg font-semibold leading-none text-slate-500">
                Package Name
              </p>
            </th>
            <th className="p-4 border-b border-slate-300 bg-slate-50">
              <p className="block text-lg font-semibold leading-none text-slate-500">
                Start Date
              </p>
            </th>
            <th className="p-4 border-b border-slate-300 bg-slate-50">
              <p className="block text-lg font-semibold leading-none text-slate-500">
                End Date
              </p>
            </th>
            <th className="p-4 border-b border-slate-300 bg-slate-50">
              <p className="block text-lg font-semibold leading-none text-slate-500">
                Active
              </p>
            </th>
            <th className="p-4 border-b border-slate-300 bg-slate-50">
              <p className="block text-lg font-semibold leading-none text-slate-500">
                QR Numbers
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => (
            <tr className="hover:bg-slate-50" key={index}>
              <td className="p-6 border-b border-slate-200">
                <p className="block text-medium text-slate-800">{row?.user?.name}</p>
              </td>
              <td className="p-4 border-b border-slate-200">
                <p className="block text-medium text-slate-800">{row?.user?.email}</p>
              </td>
              <td className="p-4 border-b border-slate-200">
                {row?.packages && <p className="block text-medium text-slate-800">{row?.packages?.map((pack,index) => (
                    <p key={index}>{pack?.name}</p>
                ))}</p>}
                {row?.message && <p className="text-red-600 text-lg font-bold">Un Subscribe</p>}
              </td>
              <td className="p-4 border-b border-slate-200">
                <p className="block text-medium text-slate-800">{row?.packages?.map((pack,index) => (
                    <p key={index}>{pack?.start_date}</p> || "NULL"
                ))}</p>
              </td>
              <td className="p-4 border-b border-slate-200">
                <p className="block text-medium text-slate-800">{row?.packages?.map((pack,index) => (
                    <p key={index}>{pack?.end_date}</p> || "NULL"
                ))}</p>
              </td>
              <td className="p-4 border-b border-slate-200">
                <p className="block text-medium text-slate-800">{row?.packages?.map((pack,index) => (
                    <p key={index}>{pack?.is_enable === 1 ? "Active" : "Disabled"}</p> || "NULL"
                ))}</p>
              </td>
              <td className="p-4 border-b border-slate-200">
                <p className="block text-medium text-slate-800">{row?.qrcode_count}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
