import React, { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { FaUserAlt, FaUserCheck, FaQrcode } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import CountUp from "react-countup"; // Import CountUp
import HomeVideo from "../homeVideo/HomeVideo";
import { AppContext } from "../../../context/AppContext";

const Header = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [counters, setCounters] = useState({ total_user: 0, total_qr: 0 });
  const { language } = useContext(AppContext);

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

  // useEffect(() => {
  //   document.body.style.direction = language === "ar" ? "rtl" : "ltr";
  // }, [language]);

  return (
    <div
      ref={ref}
      className={`py-20 flex gap-8 justify-center items-start mx-auto w-[100%] px-10 flex-wrap md:flex-nowrap transition-opacity duration-700 ${
        inView ? "opacity-100" : "opacity-0"
      } `}
    >
      <div className={`${language == "en" ? "ltr" : "rtl"} w-full`}>
        {language == "en" ? (
          <h1 className="text-black text-5xl w-full my-10 mb-5 font-black leading-tight">
            Easily connect with your customers Generate your custom{" "}
            <strong className="text-mainColor">QR code</strong> with one simple
            click.
          </h1>
        ) : (
          <h1 className="text-black text-2xl w-full my-10 mb-5 font-medium leading-9 tracking-wider font-cairo">
            حول كل تفاعل إلى فرصة للاتصال بفضل OFX QR Code. صمم QR كود ذكي
            لشركتك بضغطة واحدة، واجعل التواصل مع عملائك أسهل الآن. صمم صفحة
            مميزة تعكس هويتك وتدفع عملائك لاكتشاف المزيد عنك يجعل تجربة عملائك
            أكثر سلاسة من خلال توفير وصول سريع إلى كل الروابط المهمة في QR code
            واحد شارك جميع المعلومات التي يحتاجها عملائك في QR code واحد. صفحاتك
            على مواقع التواصل الاجتماعي المنيو الخاص بمطعمك كل الملفات المختلفة
            <strong className="text-mainColor">QR code</strong> بضغطة
          </h1>
        )}

        {/* create buttons */}
        <div
          className={`flex flex-wrap gap-2 items-center my-10 mx-auto`}
        >
          <a
            href="#packageFree"
            className="bg-black mx-auto px-10 py-5 font-semibold text-white hover:bg-secondColor shadow-2xl flex gap-3 items-center cursor-pointer w-[250px]"
          >
            {language == "en" ? "Free QR" : "فري QR"}{" "}
            <IoIosArrowDown size={24} className="animate-updown" />
          </a>
          <a
            href="#package2"
            className="bg-black px-10 mx-auto py-5 font-semibold text-white hover:bg-secondColor shadow-2xl flex gap-3 items-center cursor-pointer w-[250px]"
          >
            {language == "en" ? "Smart QR" : "ذكي QR"}{" "}
            <IoIosArrowDown size={24} className="animate-updown" />
          </a>
          <a
            href="#package3"
            className="bg-black px-10 mx-auto py-5 font-semibold text-white hover:bg-secondColor shadow-2xl flex gap-3 items-center cursor-pointer w-[250px]"
          >
            {language == "en" ? "All in one QR" : "كله في واحد QR"}
            <IoIosArrowDown size={24} className="animate-updown" />
          </a>
        </div>
        {/* numbers */}
        <div
          className={`flex items-center justify-center sm:justify-start my-24 gap-10 flex-wrap text-center`}
        >
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
            <h4 className="text-4xl font-black text-mainColor">
              {language == "en" ? "User" : "مستخدم"}
            </h4>
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
            <h4 className="text-4xl font-black text-mainColor">
              {language == "en" ? "Visitors" : "زائر"}
            </h4>
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
