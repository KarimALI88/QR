import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";

const Table = () => {
  const [data, setData] = useState([]);
  const {token} = useContext(AppContext)
  
  const getData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_LINK}/admin/users-with-packages`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching admin data", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="relative flex flex-col w-full max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-100 border-b">
        <h2 className="text-xl font-bold text-gray-800">Users with Packages</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-50">
            <tr>
              {["Name", "Email", "Package Name", "Start Date", "End Date", "Active", "QR Numbers"].map((heading) => (
                <th key={heading} className="p-4 text-left font-semibold text-gray-600 border-b">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-4 text-gray-800">{row?.user?.name || "N/A"}</td>
                <td className="p-4 text-gray-800">{row?.user?.email || "N/A"}</td>
                <td className="p-4 text-gray-800">
                  {row?.packages?.map((pack, idx) => (
                    <span key={idx} className="block">
                      {pack?.name || "N/A"}
                    </span>
                  ))}
                  {row?.message && <span className="text-red-600 font-bold">Unsubscribe</span>}
                </td>
                <td className="p-4 text-gray-800">
                  {row?.packages?.map((pack, idx) => (
                    <span key={idx} className="block">
                      {pack?.start_date || "N/A"}
                    </span>
                  ))}
                </td>
                <td className="p-4 text-gray-800">
                  {row?.packages?.map((pack, idx) => (
                    <span key={idx} className="block">
                      {pack?.end_date || "N/A"}
                    </span>
                  ))}
                </td>
                <td className="p-4 text-gray-800">
                  {row?.packages?.map((pack, idx) => (
                    <span key={idx} className={`block ${pack?.is_enable === 1 ? "text-green-600" : "text-red-600"}`}>
                      {pack?.is_enable === 1 ? "Active" : "Disabled"}
                    </span>
                  ))}
                </td>
                <td className="p-4 text-gray-800">{row?.qrcode_count || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-gray-100 border-t">
        <p className="text-gray-600">Showing {data.length} entries</p>
      </div>
    </div>
  );
};

export default Table;
