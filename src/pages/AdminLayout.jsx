import React from "react";
import MainSideBar from "../components/admin/sidebar/MainSideBar";
import { Route, Routes } from "react-router-dom";
import QrStatistics from "./admin/dashboard/stats/QrStatistics";
import MyQrs from "./admin/dashboard/myqrCodes/MyQrs";

const AdminLayout = () => {
  return (
    <div className="flex gap-96">
      <div>
        <MainSideBar />
      </div>
      <div className="py-10 px-5">
        <Routes>
          <Route path="/statistics" element={<QrStatistics />} />
          <Route path="/my-qrs" element={<MyQrs />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
