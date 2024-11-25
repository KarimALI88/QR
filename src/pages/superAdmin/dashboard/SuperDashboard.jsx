import React from "react";
import Table from "../../../components/superAdmin/table/Table";
import { FaUsers, FaQrcode  } from "react-icons/fa";
import QrsTable from "../../../components/superAdmin/qrsTable/QrsTable";

const SuperDashboard = () => {
  return (
    <div className="ml-10">
      <div>
        <h1 className="text-center text-mainColor text-6xl font-black my-5 uppercase font-serif">
          Dashboard
        </h1>
      </div>
      {/* ================================================ */}
      <div className="my-24">
        <h3 className="text-3xl font-black my-10 ml-10 flex items-center gap-3">
          <FaUsers size={40}/>
          Users
        </h3>
        <Table />
      </div>
      {/* ================================================ */}
      <div className="my-24">
        <h3 className="text-3xl font-black my-10 ml-10 flex items-center gap-3">
          <FaQrcode size={40}/>
          QRs
        </h3>
        <QrsTable />
      </div>
    </div>
  );
};

export default SuperDashboard;
