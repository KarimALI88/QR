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

const UserLayout = () => {
  const { token } = useContext(AppContext);
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {token ? (
        <>
          <Route path="/generate-qr" element={<QrForm />} />
          <Route path="/qr" element={<PackageOneTwo />} />
          <Route path="/qr/:id" element={<Profile />} />
          <Route path="/payment" element={<Payment />} />
        </>
      ) : (
        ""
      )}
    </Routes>
  );
};

export default UserLayout;
