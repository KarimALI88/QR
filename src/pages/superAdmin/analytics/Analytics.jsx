import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUserAlt, FaQrcode, FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const Analytics = () => {
  const [data, setData] = useState({});

  const getData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_API_LINK}/qrcode-stats`,
      });
      console.log("response", response);
      response.data && setData(response.data);
    } catch (error) {
      console.error("error in analysis data", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="ml-10 min-h-[100vh]">
      <h1 className="text-center text-mainColor text-6xl font-black my-5 uppercase font-serif">
        Analysis
      </h1>
      {/* cards */}
      <div className="cards flex justify-center items-center gap-10 my-14 mx-auto flex-wrap">
        {/* num of users */}
        <div className="bg-white shadow-xl p-10 rounded-lg flex gap-3 items-center w-[400px]">
          <FaUserAlt size={50} className="text-mainColor" />
          <h3 className="text-4xl font-semibold">{data.total_users} USER</h3>
        </div>
        {/* num of qrs */}
        <div className="bg-white shadow-xl p-10 rounded-lg flex gap-3 items-center w-[400px]">
          <FaQrcode size={50} className="text-mainColor" />
          <h3 className="text-4xl font-semibold">{data.total_qrcodes} QR</h3>
        </div>
        {/* num of active */}
        <div className="bg-white shadow-xl p-10 rounded-lg flex gap-3 items-center w-[400px]">
          <FaCheck size={50} className="text-mainColor" />
          <h3 className="text-4xl font-semibold">
            {data.active_qrcodes} Active QR
          </h3>
        </div>
        {/* num of unactive */}
        <div className="bg-white shadow-xl p-10 rounded-lg flex gap-3 items-center w-[400px]">
          <MdClose size={50} className="text-mainColor" />
          <h3 className="text-4xl font-semibold">
            {data.inactive_qrcodes} Unactive QR
          </h3>
        </div>

        {/* num of enabled packages */}
        <div className="bg-white shadow-xl p-10 rounded-lg flex gap-3 items-center w-[400px]">
          <FaCheck size={50} className="text-mainColor" />
          <h3 className="text-4xl font-semibold">
            {data.enabled_packages} Enabled Packages
          </h3>
        </div>

        {/* num of disabled packages */}
        <div className="bg-white shadow-xl p-10 rounded-lg flex gap-3 items-center w-[400px]">
          <MdClose size={50} className="text-mainColor" />
          <h3 className="text-4xl font-semibold">
            {data.disabled_packages} Disabled Packages
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
