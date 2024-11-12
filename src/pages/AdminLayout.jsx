import React, { useContext } from "react";
import MainSideBar from "../components/admin/sidebar/MainSideBar";
import { Navigate, Route, Routes } from "react-router-dom";
import QrStatistics from "./admin/dashboard/stats/QrStatistics";
import MyQrs from "./admin/dashboard/myqrCodes/MyQrs";
import { AppContext } from "../context/AppContext";
import Renew from "./admin/dashboard/renew/Renew";

const AdminLayout = ({setRefresh, user}) => {
  const { token } = useContext(AppContext);
  // console.log("token", token)
  return (
    <div className="flex gap-96">
      <div>
        <MainSideBar setRefresh={setRefresh}/>
      </div>
      <div className="py-10 px-5">
        <Routes>
          {token ? (
            <>
              <Route path="/statistics" element={<QrStatistics />} />
              <Route path="/my-qrs" element={<MyQrs />} />
              <Route path="/renew" element={<Renew user={user}/>} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
