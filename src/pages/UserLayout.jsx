import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./user/home/Home";
import Login from "./user/login/Login";
import Register from "./user/register/Register";
import QrForm from "./user/qrForm/QrForm";
import PackageOneTwo from "./user/qrBigPackages/PackageOneTwo";
import Profile from "./user/profile/Profile";
import Payment from "./user/payment/Payment";
import { AppContext } from "../context/AppContext";

const UserLayout = ({ country, user, refresh, setRefresh }) => {
  const { token } = useContext(AppContext);

  return (
    <Routes>
      <Route path="" element={<Home country={country} user={user} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/qr/:id" element={<Profile />} />
      <Route path="/generate-qr" element={<QrForm user={user} refresh={refresh} setRefresh={setRefresh} />} />
      <Route path="/qr" element={<PackageOneTwo user={user} />} />
      {/* Protected Routes */}
      {token ? (
        <>
          <Route path="/payment" element={<Payment />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
};

export default UserLayout;
