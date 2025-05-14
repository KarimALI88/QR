import React from "react";
import { FaRocketchat } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Support = () => {
  const navigate = useNavigate();
  return (
    <div
      className="p-2 rounded-full bg-mainColor animate-pulse text-white fixed bottom-6 right-6 flex justify-center items-center shadow-2xl cursor-pointer z-50 text-center"
      onClick={() => navigate("/contact")}
    >
      <FaRocketchat size={40} />
    </div>
  );
};

export default Support;
