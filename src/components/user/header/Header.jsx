import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import HomeVideo from "../homeVideo/HomeVideo";
import goal from "../../../assets/imgs/qrheader.png";
import { FaUserAlt, FaUserCheck, FaQrcode  } from "react-icons/fa";
import axios from "axios";

const Header = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [counters, setCounters] = useState({})


  const getUsersAndQrs = async () => {
    try {
      const response = await axios({
        method:"get",
        url: `${import.meta.env.VITE_API_LINK}/count_user&qr`,
        headers: {
          "Content-Type": "application/json"
        }
      })
      // console.log("response counters", response)
      setCounters(response.data)
    } catch (error) {
      console.error("error in counters")
    }
  }

  useEffect(()=>{
    getUsersAndQrs()
  },[])

  return (
    <div
      ref={ref}
      className={`py-20 flex gap-8 justify-center items-start mx-auto w-[100%] px-10 flex-wrap md:flex-nowrap transition-opacity duration-700 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className=" w-[]">
        <h1 className="text-black text-5xl w-full my-10 mb-5 font-black leading-tight">
          Easily connect with your customers Generate your custom{" "}
          <strong className="text-mainColor">QR code</strong> with one simple
          click.
        </h1>
        {/* <div className="mx-auto my-3 text-center">
          <img src={goal} alt="the goal image" className="animate-slideLeftRight" />
        </div> */}
        <div className="flex items-center justify-center sm:justify-start my-24 gap-10 flex-wrap text-center">
          {/* num of users */}
          <div className=" pr-11 flex flex-col items-center justify-center gap-3">
            <FaUserCheck size={60} />
            <h3 className="text-4xl font-black  text-mainColor">{`+${500+counters?.total_user}`}</h3>
            <h4 className="text-4xl font-black  text-mainColor">User</h4>
          </div>
          {/* num of QRs */}
          <div className=" pr-11 flex flex-col items-center justify-center gap-3">
            <FaQrcode size={60} />
            <h3 className="text-4xl font-black  text-mainColor">{`+${5000+counters?.total_qr}`}</h3>
            <h4 className="text-4xl font-black  text-mainColor">QRs</h4>
          </div>
          {/* num of Visitors */}
          <div className=" pr-11 flex flex-col items-center justify-center gap-3">
            <FaUserAlt size={60} />
            <h3 className="text-4xl font-black  text-mainColor">+6000</h3>
            <h4 className="text-4xl font-black  text-mainColor">
              Visitors
            </h4>
          </div>
        </div>
        {/* <Link
          to="/qr"
          className="bg-mainColor px-5 py-5 font-semibold text-white hover:bg-secondColor"
        >
          Generate QR Code
        </Link> */}
      </div>
      <div className="flex-1 w-full h-full">
        <HomeVideo />
      </div>
    </div>
  );
};

export default Header;
