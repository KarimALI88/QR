import React from "react";
import Sidebar from "../components/superAdmin/sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import SuperDashboard from "./superAdmin/dashboard/SuperDashboard";
import Analytics from "./superAdmin/analytics/Analytics";

const SuperAdmin = () => {
  return (
    <div className="bg-[#eee] py-10">
      <div>
        <Sidebar />
      </div>
      <div className="ml-10">
        <Routes>
            <Route path="/dashboard" element={<SuperDashboard />}/>
            <Route path="/analysis" element={<Analytics />}/>
        </Routes>
      </div>
    </div>
  );
};

export default SuperAdmin;
