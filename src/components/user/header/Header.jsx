import React from "react";
import { Link } from "react-router-dom";
import HomeVideo from "../homeVideo/HomeVideo";
import goal from "../../../assets/imgs/qrheader.png";

const Header = () => {
  return (
    <div className="py-20 flex gap-8 justify-center items-start mx-auto w-[100%] px-10 flex-wrap md:flex-nowrap">
      <div className="mx-10 w-[]">
        <h1 className="text-black text-5xl w-full my-10 mb-5 font-black leading-tight ">
          Easily connect with your customers Generate your custom{" "}
          <strong className="text-mainColor">QR code</strong> with
          one simple click.
        </h1>
        <div className="mx-auto my-3 text-center">
          <img
            src={goal}
            alt="the goal image"
            className="animate-slideLeftRight"
          />
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
