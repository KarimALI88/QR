import axios from "axios";
import React, { useEffect, useState } from "react";

const QrsTable = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_API_LINK}/admin/users-with-qrcodes`,
      });
      console.log("response of admin qrs ", response);
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
                QR
              </p>
            </th>
            <th className="p-4 border-b border-slate-300 bg-slate-50">
              <p className="block text-lg font-semibold leading-none text-slate-500">
                Scan Count
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => (
            <tr className="hover:bg-slate-50" key={index}>
              <td className="p-6 border-b border-slate-200">
                <p className="block text-medium text-slate-800">
                  {row?.user?.name}
                </p>
              </td>
              <td className="p-4 border-b border-slate-200">
                <p className="block text-medium text-slate-800">
                  {row?.user?.email}
                </p>
              </td>
              <td className="p-4 border-b border-slate-200">
                {row?.qrcodes?.map((qr, index) => (
                  <img
                    key={index}
                    src={`https://backend.ofx-qrcode.com/storage/${qr.qrcode}`}
                    alt="qr image"
                    className="block my-5 h-16"
                  />
                ))}
              </td>
              <td className="p-4 border-b border-slate-200">
                {row?.qrcodes?.map((qr, index) => (
                  <p key={index} className="block text-medium text-slate-800 h-16 my-5 text-xl">{qr?.scan_count}</p>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default QrsTable;
