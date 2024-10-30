import React from "react";
import phoneanimation from "../../../assets/imgs/phoneanimation.gif";

const HomeVideo = () => {
  return (
    <div className="w-[320px] h-[550px] my-5">
      <img src={phoneanimation} alt="animation" className="w-[100%] h-[100%]" />
    </div>
  );
};

export default HomeVideo;
