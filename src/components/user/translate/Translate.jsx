import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";

const Translate = () => {
  const {language, setLanguage} = useContext(AppContext)

  const changeLang = () => {
    language == "ar" ? setLanguage("en") : setLanguage("ar");
    // localStorage.setItem("language", language)
  };
  return (
    <div>
      {language == "en" && (
        <button onClick={changeLang}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/800px-Flag_of_Egypt.svg.png"
            alt="arabic language"
            className="w-[40px] h-[30px]"
          />
        </button>
      )}
      {language == "ar" && (
        <button onClick={changeLang}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1200px-Flag_of_the_United_Kingdom_%281-2%29.svg.png"
            alt="english language"
            className="w-[60px] h-[30px]"
          />
        </button>
      )}
    </div>
  );
};

export default Translate;
