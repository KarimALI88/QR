import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import MainSideBar from "../components/admin/sidebar/MainSideBar";
import QrStatistics from "./admin/dashboard/stats/QrStatistics";
import MyQrs from "./admin/dashboard/myqrCodes/MyQrs";
import Renew from "./admin/dashboard/upgrade/Renew";
import Profile from "./admin/dashboard/profile/Profile";
import RenewPackage from "./admin/dashboard/renewPackages/RenewPackage";
import { IoIosMenu } from "react-icons/io";

const AdminLayout = ({ setRefresh, user }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-20 transition-transform transform lg:relative lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 lg:w-1/4 bg-mainColor text-white shadow-lg lg:block`}
      >
        <MainSideBar setRefresh={setRefresh} user={user} />
      </div>

      {/* Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-24 p-4">
        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-black bg-gray-300 rounded focus:outline-none mb-4"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          <IoIosMenu size={30} />
        </button>

        <Routes>
          <Route path="/statistics" element={<QrStatistics />} />
          <Route path="/my-qrs" element={<MyQrs user={user}/>} />
          <Route path="/profile" element={<Profile user={user}/>} />
          <Route path="/upgrade" element={<Renew user={user} />} />
          <Route path="/renew" element={<RenewPackage user={user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
