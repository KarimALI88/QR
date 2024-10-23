import React from "react";
import MainNavbar from "../../../components/user/navbar/MainNavbar";
import Header from "../../../components/user/header/Header";
import PackageCard from "../../../components/user/packageCard/PackageCard";

const Home = () => {
  return (
    <div>
      <MainNavbar />
      <Header />
      <div className="my-10 mx-auto">
        <h3 className="text-5xl font-black text-center py-3 underline text-mainColor">PACKAGES</h3>
        <div className="my-10 px-10 flex justify-center items-center flex-wrap ">
          <PackageCard
            title="Web Hosting Deluxe"
            price="487.32 EGP/mo"
            savings="SAVE 28%"
            features={[
              "10 websites",
              "25 databases",
              "50 GB NVMe storage",
              "Shared RAM and vCPU resources",
            ]}
            freeFeature="Free domain (584.88 EGP/yr)"
          />
          <PackageCard
            title="Web Hosting Deluxe"
            price="487.32 EGP/mo"
            savings="SAVE 28%"
            features={[
              "10 websites",
              "25 databases",
              "50 GB NVMe storage",
              "Shared RAM and vCPU resources",
            ]}
            freeFeature="Free domain (584.88 EGP/yr)"
          />
          <PackageCard
            title="Web Hosting Deluxe"
            price="487.32 EGP/mo"
            savings="SAVE 28%"
            features={[
              "10 websites",
              "25 databases",
              "50 GB NVMe storage",
              "Shared RAM and vCPU resources",
            ]}
            freeFeature="Free domain (584.88 EGP/yr)"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
