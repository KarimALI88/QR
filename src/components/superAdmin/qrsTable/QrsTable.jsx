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
    <div className="relative flex flex-col min-w-[50%] w-fit h-full overflow-auto mx-auto text-gray-800 bg-white shadow-lg rounded-lg">
      <table className="w-full text-left table-auto min-w-max border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-4 border-b border-gray-300 text-gray-600 text-lg font-semibold">
              Name
            </th>
            <th className="p-4 border-b border-gray-300 text-gray-600 text-lg font-semibold">
              Email
            </th>
            <th className="p-4 border-b border-gray-300 text-gray-600 text-lg font-semibold">
              QR Code
            </th>
            <th className="p-4 border-b border-gray-300 text-gray-600 text-lg font-semibold">
              Scan Count
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row, rowIndex) => (
            <tr className="hover:bg-gray-100 transition duration-200" key={rowIndex}>
              <td className="p-4 border-b border-gray-200">
                <p className="text-gray-800">{row?.user?.name}</p>
              </td>
              <td className="p-4 border-b border-gray-200">
                <p className="text-gray-800">{row?.user?.email}</p>
              </td>
              <td className="p-4 border-b border-gray-200">
                <div className="flex gap-2">
                  {row?.qrcodes?.map((qr, qrIndex) => (
                    <img
                      key={qrIndex}
                      src={`https://backend.ofx-qrcode.com/storage/${qr.qrcode}`}
                      alt="qr code"
                      className="h-16 w-16 rounded-md shadow-md border border-gray-300"
                    />
                  ))}
                </div>
              </td>
              <td className="p-4 border-b border-gray-200">
                <div className="flex flex-col gap-2">
                  {row?.qrcodes?.map((qr, qrIndex) => (
                    <p key={qrIndex} className="text-gray-800 text-xl">
                      {qr?.scan_count}
                    </p>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QrsTable;