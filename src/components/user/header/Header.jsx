import React from "react";
import PhoneAnimation from "../phone/PhoneAnimation";

const Header = () => {
  return (
    <div className="py-20 flex gap-5 justify-between items-start mx-auto max-w-[1200px] px-10">
      <div className="px-5">
        <h1 className="text-black text-5xl  w-full my-10 font-black">
          Generate your Profile and Website by Create Your Own{" "}
          <span className="text-mainColor">OFX QR Code</span>
        </h1>
        <button className="bg-mainColor px-5 py-5 rounded-2xl font-semibold text-white hover:bg-secondColor">
          Generate QR Code 
        </button>
      </div>
      <div className="flex-1">
        <PhoneAnimation />
      </div>
    </div>
  );
};

export default Header;
