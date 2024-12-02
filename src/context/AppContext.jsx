import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const ContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [packageId, setPackageId] = useState("");
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    const tn = localStorage.getItem("tn");
    tn ? setToken(tn) : setToken("");
  }, [token]);
  // console.log("token", token)

  useEffect(() => {
    const lang = localStorage.getItem("language")
    lang ? setLanguage(lang) : localStorage.setItem("language", "en")
  }, [])

  console.log("language", language)

  return (
    <AppContext.Provider value={{ token, setToken, packageId, setPackageId, language, setLanguage }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
