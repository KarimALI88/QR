import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const ContextProvider = (props) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const tn = localStorage.getItem("tn");
    tn ? setToken(tn) : setToken("");
  }, []);

  return (
    <AppContext.Provider value={{ token, setToken }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
