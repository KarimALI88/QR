import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./user/home/Home";
import Login from "./user/login/Login";
import Register from "./user/register/Register";
import QrForm from "./user/qrForm/QrForm";
import PackageOneTwo from "./user/qrBigPackages/PackageOneTwo";
import Profile from "./user/profile/Profile";
import Payment from "./user/payment/Payment";
import { AppContext } from "../context/AppContext";

const UserLayout = ({country, user}) => {
  const { token } = useContext(AppContext);
  return (
    <Routes>
      <Route path="" element={<Home country={country} user={user}/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/qr/:id" element={<Profile />} />
      {token ? (
        <>
          <Route path="/generate-qr" element={<QrForm user={user}/>} />
          <Route path="/qr" element={<PackageOneTwo user={user}/>} />
          <Route path="/payment" element={<Payment />} />
        </>
      ) : (
        ""
      )}
    </Routes>
  );
};

export default UserLayout;
