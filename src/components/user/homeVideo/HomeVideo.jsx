import React from "react";
import phoneanimation from "../../../assets/imgs/phoneanimation.gif";

const HomeVideo = () => {
  return (
    <div className="w-[320px] h-[550px] my-5 flex justify-center items-center">
      <img
        src={phoneanimation}
        alt="animation"
        className="w-[100%] h-[100%]"
        loading="lazy"
      />
    </div>
  );
};

export default HomeVideo;
