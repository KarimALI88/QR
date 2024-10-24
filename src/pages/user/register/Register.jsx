import React from "react";
import logo from "./../../../assets/imgs/QR-LOGO2.png";
import { Input } from "@material-tailwind/react";
import { BiLogoGmail } from "react-icons/bi";
import { MdKey } from "react-icons/md";
import { IoPhonePortrait } from "react-icons/io5";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 h-[100vh]">
        <img
          src="https://img.freepik.com/free-vector/qr-code-concept-illustration_114360-5853.jpg?t=st=1729773958~exp=1729777558~hmac=955d814eb03a45c1edf8d06e91fb100430faa59a2001a16bd473ba1b7d5a30f3&w=740"
          alt="login img"
          className="h-[100vh] object-cover object-right"
        />
      </div>
      {/* ------------------------------------------------------------------- */}
      <div className="flex-1  p-4 h-[100%] flex-col">
        <img src={logo} alt="OFX QR CODE" className="w-52 lg:w-72" />
        <div className="text-center my-20 mx-auto">
          <h3 className="text-mainColor font-semibold text-3xl">
            Welcome to OFX Signup
          </h3>

          {/* email */}
          <div className="w-[80%] md:w-[70%] lg:w-[60%] mx-auto my-10">
            <Input
              label="email"
              placeholder="e.g., your-email@gmail.com"
              className="w-full flex items-center h-[50px] appearance-none rounded-lg border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-offset-0 focus:ring-opacity-50"
              icon={<BiLogoGmail size={25} />}
            />
          </div>

          {/* phone */}
          <div className="w-[80%] md:w-[70%] lg:w-[60%] mx-auto my-10">
            <Input
              label="phone"
              placeholder="01061472185"
              className="w-full flex items-center h-[50px] appearance-none rounded-lg border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-offset-0 focus:ring-opacity-50"
              icon={<IoPhonePortrait size={25} />}
            />
          </div>

          {/* password */}
          <div className="w-[80%] md:w-[70%] lg:w-[60%] mx-auto mb-5">
            <Input
              label="password"
              placeholder="**********************"
              className="w-full flex items-center h-[50px] appearance-none rounded-lg border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-offset-0 focus:ring-opacity-50"
              icon={<MdKey size={25} />}
            />
          </div>

          {/* register */}
          <p>already have an account <Link to={"/login"} className="text-mainColor underline text-lg">login</Link></p>

          {/* button submit */}
          <div className="w-[80%] md:w-[70%] lg:w-[60%] mx-auto my-5">
            <button className="bg-mainColor w-[100%] px-5 py-5 font-semibold text-white hover:bg-secondColor">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
