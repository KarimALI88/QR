import React from "react";
import { Typography } from "@material-tailwind/react";
import logo from "../../../assets/imgs/QR-LOGO1.png";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagramSquare  } from "react-icons/fa";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="relative w-full bg-mainColor py-10">
      <div className="mx-auto w-full max-w-7xl px-8 ">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
          <Typography variant="h5" className="mb-6">
            <img src={logo} alt="logo" className="w-52 lg:w-72" />
          </Typography>
          <div className="grid grid-cols-1 justify-between gap-4">
            <div>
              <h3 className="text-xl text-white font-semibold">Our Goal</h3>
              <p className="text-lg font-medium text-gray-400">
                Take your QR codes to the next level! Customize the landing page
                they link to. Tailor your page to showcase your brand’s
                personality, identity, highlighting essential information, and
                connect with your Clients.{" "}
                <span className="text-white">All in one seamless link </span>,
                Just let you client choose his preferred path toward you.
              </p>
            </div>
            <div className="flex gap-4">
              <Link to={"/contact"} className="text-white underline hover:text-black">Contact</Link>
              <Link to={"/payment"} className="text-white underline hover:text-black">Payment</Link>
            </div>
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <Typography
            variant="small"
            className="mb-4 text-center text-white md:mb-0 font-medium text-xl"
          >
            &copy; {currentYear}{" "}
            OUT OF THE BOX All Rights Reserved.
          </Typography>
          <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
            <Typography
              as="a"
              href="https://www.facebook.com/ofxqrcode"
              className="opacity-80 transition-opacity hover:opacity-100"
              target="_blank"
            >
              <FaFacebook size={25} color="white"/>
            </Typography>


            {/* <Typography
              as="a"
              href="https://www.facebook.com/ofxqrcode"
              className="opacity-80 transition-opacity hover:opacity-100"
              target="_blank"
            >
              <FaInstagramSquare size={25} color="white"/>
            </Typography> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
