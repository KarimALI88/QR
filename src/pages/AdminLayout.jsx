import React, { useContext, useEffect } from "react";
import MainSideBar from "../components/admin/sidebar/MainSideBar";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import QrStatistics from "./admin/dashboard/stats/QrStatistics";
import MyQrs from "./admin/dashboard/myqrCodes/MyQrs";
import { AppContext } from "../context/AppContext";
import Renew from "./admin/dashboard/upgrade/Renew";
import Profile from "./admin/dashboard/profile/Profile";
import RenewPackage from "./admin/dashboard/renewPackages/RenewPackage";

const AdminLayout = ({setRefresh, user}) => {
  const { token } = useContext(AppContext);

  return (
    <div className="flex gap-96">
      <div>
        <MainSideBar setRefresh={setRefresh} user={user}/>
      </div>
      <div className="py-10 px-5">
        <Routes>
          {/* {token ? ( */}
            <>
              <Route path="/statistics" element={<QrStatistics />} />
              <Route path="/my-qrs" element={<MyQrs />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/upgrade" element={<Renew user={user}/>} />
              <Route path="/renew" element={<RenewPackage user={user}/>} />
            </>
          {/* ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )} */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
