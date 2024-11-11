import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "./pages/UserLayout";
import AdminLayout from "./pages/AdminLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AppContext } from "./context/AppContext";

function App() {
  const [ip, setIp] = useState('');
  const [country, setCountry] = useState('');
  const [user, setUser] = useState({})
  const [refresh, setRefresh] = useState(false)
  const {token} = useContext(AppContext)

  const getUserLocation = async () => {
    try {
      // Fetch IP address
      const ipResponse = await axios.get('https://api.ipify.org?format=json');
      const userIp = ipResponse.data.ip;
      setIp(userIp);

      // Fetch country information using the IP address
      const locationResponse = await axios.get(`https://ipwhois.app/json/${userIp}`);
      const userCountry = locationResponse.data.country;
      setCountry(userCountry);
    } catch (error) {
      console.error('Error fetching IP or country data:', error);
    }
  };

  const validateSubscribtion = async () => {
    try {
      const response = await axios({
        method:"get",
        url: "https://backend.ofx-qrcode.com/api/subscriptions/validate",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      // console.log("response", response)
    } catch (error) {
      console.error("error in validate")
    }
  }
  

  const getUserData = async () => {
    try {
      const response = await axios({
        method:"get",
        url:"https://backend.ofx-qrcode.com/api/subscriptions/user",
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${token}`
        }
      })
      console.log("user data", response)
      setUser(response.data[0])
      // console.log("user ", user)
    } catch (error) {
      console.error("error in user data", error)
    }
  }

  useEffect(()=>{
    token && getUserData()
  },[token, refresh])

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    {token && validateSubscribtion()}
  },[])

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/*" element={<UserLayout country={country} user={user} refresh={refresh} setRefresh={setRefresh}/>} />
        {token && <Route path="/admin/*" element={<AdminLayout setRefresh={setRefresh}/>} />}
      </Routes>
    </>
  );
}

export default App;
