import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { FaUserAlt, FaUserCheck, FaQrcode } from "react-icons/fa";
import axios from "axios";
import CountUp from "react-countup"; // Import CountUp
import HomeVideo from "../homeVideo/HomeVideo";

const Header = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [counters, setCounters] = useState({ total_user: 0, total_qr: 0 });

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
      className={`py-20 flex gap-8 justify-center items-start mx-auto w-[100%] px-10 flex-wrap md:flex-nowrap transition-opacity duration-700 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="w-full">
        <h1 className="text-black text-5xl w-full my-10 mb-5 font-black leading-tight">
          Easily connect with your customers Generate your custom{" "}
          <strong className="text-mainColor">QR code</strong> with one simple
          click.
        </h1>
        <div className="flex items-center justify-center sm:justify-start my-24 gap-10 flex-wrap text-center">
          {/* Number of Users */}
          <div className="pr-11 flex flex-col items-center justify-center gap-3">
            <FaUserCheck size={60} />
            <h3 className="text-4xl font-black text-mainColor">
              <CountUp
                start={0}
                end={500 + counters?.total_user}
                duration={10} // Duration of animation in seconds
                separator=","
              />
            </h3>
            <h4 className="text-4xl font-black text-mainColor">User</h4>
          </div>

          {/* Number of QRs */}
          <div className="pr-11 flex flex-col items-center justify-center gap-3">
            <FaQrcode size={60} />
            <h3 className="text-4xl font-black text-mainColor">
              <CountUp
                start={0}
                end={5000 + counters?.total_qr}
                duration={10}
                separator=","
              />
            </h3>
            <h4 className="text-4xl font-black text-mainColor">QRs</h4>
          </div>

          {/* Number of Visitors */}
          <div className="pr-11 flex flex-col items-center justify-center gap-3">
            <FaUserAlt size={60} />
            <h3 className="text-4xl font-black text-mainColor">
              <CountUp start={0} end={6000} duration={10} separator="," />
            </h3>
            <h4 className="text-4xl font-black text-mainColor">Visitors</h4>
          </div>
        </div>
      </div>
      <div className="flex-1 w-full h-full">
        <HomeVideo />
      </div>
    </div>
  );
};

export default Header;
