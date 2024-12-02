import React, { useEffect, useState } from "react";
import MainNavbar from "../../../components/user/navbar/MainNavbar";
import Header from "../../../components/user/header/Header";
import PackageCard from "../../../components/user/packageCard/PackageCard";
import { Spinner } from "@material-tailwind/react";
import Footer from "../../../components/user/footer/Footer";
import goal from "../../../assets/imgs/goal-img.png";
import { FaMicrophoneAlt } from "react-icons/fa";
import { IoMdPhonePortrait } from "react-icons/io";

const Home = ({ country, user }) => {
  const [packages, setPackages] = useState([]);

  const getPackages = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/packages`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      // console.log("packages", data);
      setPackages(data);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    getPackages();
  }, []);

  return (
    <div>
      <MainNavbar />
      <div
        style={{
          background: "rgb(255,255,255)",
          background:
            "linear-gradient(152deg, rgba(255,255,255,1) 0%, rgba(5,59,92,1) 100%)",
        }}
      >
        <Header />

        {/* <div className="my-10 mx-auto">
          <h3 className="text-5xl w-fit mx-auto font-black text-center p-4 rounded-tl-3xl rounded-br-3xl border-4 border-mainColor text-mainColor">
            THE GOAL
          </h3>
          <div className="flex flex-col items-center justify-center py-10 my-5">
            <img src={goal} alt="goal image" />
            <div className="px-5">
              <p className="sm:w-[80%] my-5 mx-auto space-x-3 tracking-wide text-black text-3xl w-full  font-medium leading-tight ">
                Take your QR codes to the next level! Customize the landing page
                they link to. Tailor your page to showcase your brand’s
                personality, identity, highlighting essential information, and
                connect with your Clients.{" "}
                <span className="text-white">All in one seamless link </span>,
                Just let you client choose his preferred path toward you.
              </p>
            </div>
          </div>
        </div> */}
      </div>
      {/* packages */}
      {packages.length === 0 ? (
        <div className="my-10 mx-auto text-center">
          <Spinner className="mx-auto h-12 w-12" />
        </div>
      ) : (
        <div className="my-10 mx-auto">
          <h3 className="text-5xl w-fit mx-auto font-black text-center p-4 rounded-tl-3xl rounded-br-3xl border-4 border-mainColor text-mainColor">
            PACKAGES
          </h3>
          <div
            className="my-10 px-10 flex justify-center items-center flex-wrap gap-5 "
            id="packages"
          >
            {packages.map((pack, index) => (
              <PackageCard
                key={index}
                index={index}
                title={pack?.name}
                description={pack?.description}
                price={pack?.price_EGP + " EGP"}
                savings="SAVE 28%"
                features={pack?.features}
                packageZero={index === 0 ? true : false}
                country={country}
                price_dollar={pack?.price_dollar}
                user={user}
              />
            ))}
          </div>
        </div>
      )}
      {/* features */}
      {/* <div className="my-10 mx-auto">
        <h3 className="text-5xl w-fit mx-auto font-black text-center p-4 rounded-tl-3xl rounded-br-3xl border-4 border-mainColor text-mainColor">
          FEATURES
        </h3>
        <div className="flex justify-center items-center gap-5 flex-wrap">
          <div className="bg-[#eee] shadow-xl rounded-xl p-6 my-5 w-52 h-36 text-center flex justify-center items-center flex-col gap-4">
            <h6 className="text-center block mx-auto">
              <FaMicrophoneAlt size={30} />
            </h6>
            <h4 className="text-lg font-semibold">MP3</h4>
          </div>
          <div className="bg-[#eee] shadow-xl rounded-xl p-6 my-5 w-52 h-36 text-center flex justify-center items-center flex-col gap-4">
            <h6 className="text-center block mx-auto">
              <IoMdPhonePortrait size={30} />
            </h6>
            <h4 className="text-lg font-semibold">Customize Your Profile</h4>
          </div>
        </div>
      </div> */}
      {/* ---------------------------------------------------------------- */}
      <Footer />
    </div>
  );
};

export default Home;
