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
import Contact from "./user/contact/Contact";
import Policies from "./user/policies/Policies";
import ForgetPassword from "./user/forgetPassword/ForgetPassword";
import ResetPassword from "./user/resetpassword/ResetPassword";
import VerificationPage from "./user/verificationPage/VerificationPage";
import UpdateQr from "./user/updateQr/UpdateQr";

const UserLayout = ({ country, user, refresh, setRefresh, valid }) => {
  const { token } = useContext(AppContext);

  return ( 
    <Routes>
      <Route path="" element={<Home country={country} user={user} />} />
      <Route path="/login" element={<Login setRefresh={setRefresh}/>} />
      <Route path="/forget-password" element={<ForgetPassword setRefresh={setRefresh}/>} />
      <Route path="/verification-code" element={<VerificationPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/policies" element={<Policies />} />
      <Route path="/qr/:id" element={<Profile />} />
      <Route path="/generate-qr" element={<QrForm user={user} refresh={refresh} setRefresh={setRefresh} />} />
      <Route path="/qr" element={<PackageOneTwo valid={valid} user={user} />} />
      <Route path="/update-qr/:id" element={<UpdateQr valid={valid} user={user} />} />
      {/* Protected Routes */}
      {token ? (
        <>
          <Route path="/payment" element={<Payment user={user} setRefresh={setRefresh}/>} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
};

export default UserLayout;
