import React from "react";
import { FaRocketchat } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Support = () => {
  const navigate = useNavigate();
  return (
    <div
      className="w-16 h-16 rounded-full bg-mainColor text-white fixed bottom-10 right-10 flex justify-center items-center shadow-2xl cursor-pointer"
      onClick={() => navigate("/contact")}
    >
      <FaRocketchat size={40} />
    </div>
  );
};

export default Support;
