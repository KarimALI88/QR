import React, { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserLayout from "./pages/UserLayout";
import AdminLayout from "./pages/AdminLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AppContext } from "./context/AppContext";
import SuperAdmin from "./pages/SuperAdmin";
import Support from "./components/user/support/Support";

function App() {
  const [ip, setIp] = useState("");
  const [country, setCountry] = useState("");
  const [user, setUser] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [valid, setValid] = useState(true);
  const { token } = useContext(AppContext);

  const getUserLocation = async () => {
    try {
      // Fetch IP address
      const ipResponse = await axios.get("https://api.ipify.org?format=json");
      const userIp = ipResponse.data.ip;
      setIp(userIp);

      // Fetch country information using the IP address
      const locationResponse = await axios.get(
        `https://ipwhois.app/json/${userIp}`
      );
      const userCountry = locationResponse.data.country;
      setCountry(userCountry);
    } catch (error) {
      console.error("Error fetching IP or country data:", error);
    }
  };

  const validateSubscribtion = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_API_LINK}/subscriptions/validate`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("validate response", response)
      response.data.message === "Subscription is still active." &&
        setValid(true);
      response.data.message ===
        "Subscription has expired and has been disabled. All QR codes have been disabled" &&
        setValid(false);
    } catch (error) {
      console.error("error in validate");
    }
  };

  const getUserData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_API_LINK}/subscriptions/user`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("user data", response);
      setUser(response.data[0]);
      // console.log("user ", user)
    } catch (error) {
      console.error("error in user data", error);
    }
  };

  useEffect(() => {
    token && getUserData();
  }, [token, refresh]);

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    {
      token && validateSubscribtion();
    }
  }, [token, refresh]);

  useEffect(() => {
    let lang = localStorage.getItem("language");
    !lang && localStorage.setItem("language", "en");
  }, []);

  return (
    <>
      <Support />
      <ToastContainer />
      <Routes>
        <Route
          path="/*"
          element={
            <UserLayout
              valid={valid}
              country={country}
              user={user}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          }
        />
        <Route
          path="/admin/*"
          element={<AdminLayout setRefresh={setRefresh} user={user} />}
        />
        {token ? (
          <>
            <Route
              path="/admin/*"
              element={<AdminLayout setRefresh={setRefresh} user={user} />}
            />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
        {token ? (
          <>
            <Route
              path="/superadmin/*"
              element={<SuperAdmin user={user} setRefresh={setRefresh} />}
            />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </>
  );
}

export default App;
