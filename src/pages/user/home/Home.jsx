import React, { useContext, useEffect, useState } from "react";
import MainNavbar from "../../../components/user/navbar/MainNavbar";
import Header from "../../../components/user/header/Header";
import PackageCard from "../../../components/user/packageCard/PackageCard";
import { Spinner } from "@material-tailwind/react";
import Footer from "../../../components/user/footer/Footer";
import goal from "../../../assets/imgs/goal-img.png";
import { FaMicrophoneAlt } from "react-icons/fa";
import { IoMdPhonePortrait } from "react-icons/io";
import { AppContext } from "../../../context/AppContext";
import Support from "../../../components/user/support/Support";
import { useTranslation } from "react-i18next";

const Home = ({ country, user }) => {
  const [packages, setPackages] = useState([]);
  const { language } = useContext(AppContext);
  const { t } = useTranslation()

  const getPackages = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/packages`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("packages", data);
      setPackages(data);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    getPackages();
  }, []);

  return (
    <div
      className={`${language == "en" ? "ltr" : "rtl"}`}
      style={{ direction: language === "en" ? "ltr" : "rtl" }}
    >
      <Support />
      <MainNavbar />
      <div>
        <Header />
      </div>
      {/* packages */}
      {packages.length === 0 ? (
        <div className="my-10 mx-auto text-center">
          <Spinner className="mx-auto h-12 w-12" />
        </div>
      ) : (
        <div className="my-16 mx-auto max-w-7xl">
          <div className="relative w-fit mx-auto mb-16 shadow-none">
            <h3 className="text-5xl font-extrabold text-center px-8 py-4 rounded-tl-3xl rounded-br-3xl border-4 border-mainColor text-mainColor relative z-10 bg-white transform transition-all hover:scale-105 shadow-none">
              {t("packages")}
            </h3>
            <div className="absolute -inset-2 bg-gradient-to-r from-mainColor/30 to-secondaryColor/30 rounded-tl-3xl rounded-br-3xl blur-md z-0"></div>
          </div>

          <div
            className="my-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            id="packages"
          >
            {packages.map((pack, index) => (
              <div
                key={index}
                className={`relative transition-all duration-300 hover:-translate-y-2 ${
                  index === 0 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                {index === 1 && (
                  <div className="absolute -top-3 -right-3 bg-amber-400 text-black font-bold px-4 py-1 rounded-full text-sm z-20 transform rotate-12">
                    {t("popular")}
                  </div>
                )}
                <PackageCard
                  index={index}
                  title={language == "en" ? pack?.name : pack?.name_ar}
                  description={
                    language == "en" ? pack?.description : pack?.description_ar
                  }
                  price={pack?.price_EGP + " EGP"}
                  savings={language === "en" ? "SAVE 28%" : "وفر 28%"}
                  features={
                    language == "en" ? pack?.features : pack?.features_ar
                  }
                  packageZero={index === 0}
                  country={country}
                  price_dollar={pack?.price_dollar}
                  user={user}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {/* ---------------------------------------------------------------- */}
      <Footer />
    </div>
  );
};

export default Home;
