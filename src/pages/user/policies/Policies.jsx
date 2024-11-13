import React, { useState } from "react";
import MainNavbar from "../../../components/user/navbar/MainNavbar";
import { RiAlarmWarningFill } from "react-icons/ri";
import Footer from "../../../components/user/footer/Footer";

const Policies = () => {
  const [policies, setPolicies] = useState([
    "Reservation not returned just you generate first QR",
    "Free Package",
    "Smart Package",
    "All in one package",
  ]);
  return (
    <div>
      <MainNavbar />
      <div className="flex">
        {/* policies */}
        <div className="my-10 px-10 flex-1">
          <h1 className="text-3xl font-black text-mainColor mb-5 flex gap-3 items-center">
            <RiAlarmWarningFill color="red" size={40} /> Cookies and Policies
          </h1>
          <ul className="ml-10 list-decimal">
            {policies.map((policy, index) => (
              <li key={index} className="text-xl font-medium my-3">
                {policy}
              </li>
            ))}
          </ul>
        </div>
        {/* img */}
        <div className="flex-1 w-1/2">
          <img
            src="https://img.freepik.com/free-vector/work-team-checking-giant-check-list_23-2148074630.jpg?t=st=1731494296~exp=1731497896~hmac=dc2cdf09d5282049f7c2c67fe3da9238e3452fc3cfced266293ed7d4e80ceac9&w=740"
            alt="warning"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Policies;
