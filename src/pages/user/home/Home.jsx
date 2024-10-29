import React, { useEffect, useState } from "react";
import MainNavbar from "../../../components/user/navbar/MainNavbar";
import Header from "../../../components/user/header/Header";
import PackageCard from "../../../components/user/packageCard/PackageCard";
import { Spinner } from "@material-tailwind/react";
const Home = () => {
  const [packages, setPackages] = useState([]);
  const getPackages = async () => {
    try {
      const response = await fetch(
        `https://backend.ofx-qrcode.com/api/packages`
      );

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
    <div>
      <MainNavbar />
      <Header />
      {packages.length === 0 ? (
        <div className="my-10 mx-auto text-center">
          <Spinner className="mx-auto h-12 w-12" />
        </div>
      ) : (
        <div className="my-10 mx-auto">
          <h3 className="text-5xl w-fit mx-auto font-black text-center p-4 rounded-tl-3xl rounded-br-3xl border-4 border-mainColor text-mainColor">
            PACKAGES
          </h3>
          <div className="my-10 px-10 flex justify-center items-center flex-wrap ">
            {packages.map((pack, index) => (
              <PackageCard
                key={index}
                title={pack?.name}
                description={pack?.description}
                price={pack?.price_EGP + "EGP"}
                savings="SAVE 28%"
                features={pack?.features}
                
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
