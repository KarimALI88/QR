import React, { useContext } from "react";
import { Typography } from "@material-tailwind/react";
import logo from "../../../assets/imgs/QR-LOGO1.png";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { AppContext } from "./../../../context/AppContext";

const currentYear = new Date().getFullYear();

const Footer = () => {
  const { language } = useContext(AppContext);
  return (
    <footer className="relative w-full bg-mainColor py-10">
      <div className="mx-auto w-full max-w-7xl px-8 ">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
          <Typography variant="h5" className="mb-6">
            <img src={logo} alt="logo" className="w-52 lg:w-72" />
          </Typography>
          <div className="grid grid-cols-1 justify-between gap-4">
            {language == "en" ? (
              <div>
                <h3 className="text-xl text-white font-semibold">Our Goal</h3>
                <p className="text-lg font-medium text-gray-400">
                  Take your QR codes to the next level! Customize the landing
                  page they link to. Tailor your page to showcase your brand’s
                  personality, identity, highlighting essential information, and
                  connect with your Clients.{" "}
                  <span className="text-white">All in one seamless link </span>,
                  Just let you client choose his preferred path toward you.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-xl text-white font-semibold">هدفنا</h3>
                <p className="text-lg font-medium text-gray-400">
                  حول كل تفاعل إلى فرصة للاتصال بفضل OFX QR Code. صمم QR كود ذكي
                  لشركتك بضغطة واحدة، واجعل التواصل مع عملائك أسهل الآن. صمم
                  صفحة مميزة تعكس هويتك وتدفع عملائك لاكتشاف المزيد عنك يجعل
                  تجربة عملائك أكثر سلاسة من خلال توفير وصول سريع إلى كل الروابط
                  المهمة في QR code واحد شارك جميع المعلومات التي يحتاجها عملائك
                  في QR code واحد. صفحاتك على مواقع التواصل الاجتماعي المنيو
                  الخاص بمطعمك كل الملفات المختلفة
                </p>
              </div>
            )}
            <div className="flex gap-4">
              <Link
                to={"/contact"}
                className="text-white underline hover:text-black"
              >
                {language == "en" ? "Contact" : "التواصل"}
              </Link>
              <Link
                to={"/payment"}
                className="text-white underline hover:text-black"
              >
                {language == "en" ? "Payment" : "الدفع"}
              </Link>
              <Link
                to={"/policies"}
                className="text-white underline hover:text-black"
              >
                {language == "en" ? "Policies" : "السياسات"}
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <Typography
            variant="small"
            className="mb-4 text-center text-white md:mb-0 font-medium text-xl"
          >
            &copy; {currentYear}{" "}
            {language == "en"
              ? "OUT OF THE BOX All Rights Reserved"
              : "كل الحقوق الي OUT OF THE BOX"}
            .
          </Typography>
          <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
            <Typography
              as="a"
              href="https://www.facebook.com/ofxqrcode"
              className="opacity-80 transition-opacity hover:opacity-100"
              target="_blank"
            >
              <FaFacebook size={25} color="white" />
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
