import React, { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { FaUserAlt, FaUserCheck, FaQrcode } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import CountUp from "react-countup"; // Import CountUp
import HomeVideo from "../homeVideo/HomeVideo";
import { AppContext } from "../../../context/AppContext";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [counters, setCounters] = useState({ total_user: 0, total_qr: 0 });
  const { language } = useContext(AppContext);
  const { t } = useTranslation();

  const getUsersAndQrs = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_API_LINK}/count_user&qr`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setCounters(response.data);
    } catch (error) {
      console.error("Error fetching counters", error);
    }
  };

  useEffect(() => {
    getUsersAndQrs();
  }, []);

  return (
    <div
      ref={ref}
      className={`py-6 md:py-12 lg:py-20 flex flex-col lg:flex-row gap-8 lg:gap-16 items-wtart justify-between mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 transition-opacity duration-700 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className={`w-full`}>
        <h1
          className="text-gray-900 text-2xl sm:text-3xl md:text-4xl font-semibold mb-6"
          style={{ lineHeight: "1.3" }}
        >
          {t("headerSection")}
        </h1>
        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row flex-wrap gap-4 my-8`}>
          <a
            href="#packageFree"
            className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-4 font-semibold text-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:from-secondColor hover:to-mainColor group w-full sm:w-auto text-center"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {t("freeQR")}
              <IoIosArrowDown size={20} className="animate-bounce" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-mainColor to-secondColor opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </a>

          <a
            href="#package2"
            className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-4 font-semibold text-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:from-secondColor hover:to-mainColor group w-full sm:w-auto text-center"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {t("smartQr")}
              <IoIosArrowDown size={20} className="animate-bounce" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-mainColor to-secondColor opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </a>

          <a
            href="#package3"
            className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-4 font-semibold text-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:from-secondColor hover:to-mainColor group w-full sm:w-auto text-center"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {t("allInOneQr")}
              <IoIosArrowDown size={20} className="animate-bounce" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-mainColor to-secondColor opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </a>
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-2 md:grid-cols-3 gap-6 my-12 lg:my-16`}>
          {/* Number of Users */}
          <div className="flex flex-col items-center justify-center gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="p-3 bg-mainColor/10 rounded-full">
              <FaUserCheck size={40} className="text-mainColor" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              <CountUp
                start={0}
                end={500 + counters?.total_user}
                duration={10}
                separator=","
              />
              <span className="text-mainColor">+</span>
            </h3>
            <h4 className="text-lg md:text-xl font-semibold text-gray-600">
              {t("numOfUsers")}
            </h4>
          </div>

          {/* Number of QRs */}
          <div className="flex flex-col items-center justify-center gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="p-3 bg-mainColor/10 rounded-full">
              <FaQrcode size={40} className="text-mainColor" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              <CountUp
                start={0}
                end={5000 + counters?.total_qr}
                duration={10}
                separator=","
              />
              <span className="text-mainColor">+</span>
            </h3>
            <h4 className="text-lg md:text-xl font-semibold text-gray-600">
              QRs
            </h4>
          </div>

          {/* Number of Visitors */}
          <div className="flex flex-col items-center justify-center gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="p-3 bg-mainColor/10 rounded-full">
              <FaUserAlt size={40} className="text-mainColor" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              <CountUp start={0} end={6000} duration={10} separator="," />
              <span className="text-mainColor">+</span>
            </h3>
            <h4 className="text-lg md:text-xl font-semibold text-gray-600">
              {t("numOfVisitors")}
            </h4>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center">
        <HomeVideo />
      </div>
    </div>
  );
};

export default Header;
