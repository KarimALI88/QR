import React from "react";
import Sidebar from "../components/superAdmin/sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import SuperDashboard from "./superAdmin/dashboard/SuperDashboard";

const SuperAdmin = () => {
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div>
        <Routes>
            <Route path="/dashboard" element={<SuperDashboard />}/>
        </Routes>
      </div>
    </div>
  );
};

export default SuperAdmin;
