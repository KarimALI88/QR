import React from "react";
import { Link } from "react-router-dom";
import HomeVideo from "../homeVideo/HomeVideo";

const Header = () => {
  return (
    <div className="py-20 flex gap-8 justify-center items-start mx-auto w-[100%] px-10 flex-wrap md:flex-nowrap" style={{
      background: "rgb(255,255,255)",
      background: "linear-gradient(152deg, rgba(255,255,255,1) 0%, rgba(5,59,92,1) 100%)"
    }}>
      <div className="mx-10 ">
        <h1 className="text-black text-5xl w-full my-10 font-black leading-tight ">
          Generate your Profile, Identity and Website by Create Your Own{" "}
          <span className="text-mainColor">OFX QR Code</span>
        </h1>
        <Link to="/qr" className="bg-mainColor px-5 py-5 font-semibold text-white hover:bg-secondColor">
          Generate QR Code
        </Link>
      </div>
      <div className="flex-1 w-full h-full">
        <HomeVideo />
      </div>
    </div>
  );
};

export default Header;
