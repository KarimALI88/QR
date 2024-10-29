import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "./pages/UserLayout";
import AdminLayout from "./pages/AdminLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/*" element={<UserLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </>
  );
}

export default App;
