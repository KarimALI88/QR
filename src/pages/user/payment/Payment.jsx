import React, { useState } from "react";
import MainNavbar from "../../../components/user/navbar/MainNavbar";
import { SiVodafone } from "react-icons/si";

const Payment = () => {
  const [activeSection, setActiveSection] = useState("vodafone");
  return (
    <div>
      <MainNavbar />
      <div className="py-5 px-10">
        <h1 className="text-center text-4xl text-mainColor font-black my-5">
          Payment Methods
        </h1>
        {/* payment methods */}
        <div className="flex justify-center gap-8 items-center my-10 mx-auto flex-wrap">
          <button
            className={`flex gap-2 items-center py-2 px-5 text-center text-2xl font-black `}
            onClick={() => setActiveSection("vodafone")}
          >
            <img
              src="https://storage.faydety.com/images/blogs/images/melwmat_aktr_en_fwdafwn_kash_wazay_astlf_mn_vodafone_cash_8364b32049.webp"
              alt="vodafone cash"
              className="w-[150px] h-[80px]"
            />{" "}
          </button>
          <button
            className={`py-2 px-5 text-center text-2xl font-black`}
            onClick={() => setActiveSection("geidea")}
          >
            <img
              src="https://geidea.net/egypt/wp-content/uploads/G_BRAND-LOGO-1-1.svg"
              alt="geidea"
              className=""
            />
          </button>
        </div>

        {/* geidea section */}
        {activeSection === "geidea" && (
          <div className="my-10 mx-auto w-[80%]">
            {/* <h2 className="text-center text-black text-4xl my-10 ">Coming Soon</h2> */}
            <div className="max-w-[350px] max-h-[300px] mx-auto my-5">
              <img
                src="https://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg?t=st=1730367471~exp=1730371071~hmac=3aadf5dc530557805e925296fbf452027c5eb39a0e7388048294bf7aecec5f70&w=740"
                alt="image for payment"
              />
            </div>
          </div>
        )}
        
        {/* vodafone section */}
        {activeSection === "vodafone" && (
          <div className="my-10 mx-auto w-[80%]">
            <div className="max-w-[350px] max-h-[300px] mx-auto my-5">
              <img
                src="https://img.freepik.com/free-vector/people-using-mobile-bank-remittance-money_74855-6617.jpg?t=st=1730367062~exp=1730370662~hmac=794beadac97b4cc92cfe382b81ea03be0e193ebf473fd6738904245596c6cd25&w=740"
                alt="image for payment"
              />
            </div>
            <h3 className="text-xl text-black text-center font-semibold">
              please send money on this phone{" "}
              <span className="text-mainColor text-2xl">01061472185</span> by
              vodafone cash
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
