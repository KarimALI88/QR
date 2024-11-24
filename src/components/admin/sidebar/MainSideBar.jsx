import React, { useContext } from "react";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { FaQrcode, FaPlus } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import logo from "../../../assets/imgs/QR-LOGO1.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "./../../../context/AppContext";

const MainSideBar = ({ setRefresh, user }) => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(AppContext);

  const logoutApi = async () => {
    try {
      await axios.get("https://backend.ofx-qrcode.com/api/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error in logout", error);
    }
  };

  const logout = async () => {
    await logoutApi();
    setToken("");
    localStorage.removeItem("tn");
    navigate("/login");
    window.location.reload();
  };

  return (
    <Card className="h-full p-4 rounded-none bg-mainColor text-white shadow-lg overflow-y-auto">
      <div className="mb-4">
        <Link to="/" className="block">
          <img src={logo} alt="Logo" className="w-64 mx-auto" />
        </Link>
      </div>
      <List>
        <ListItem
          className="text-white text-xl my-3 cursor-pointer"
          onClick={() => navigate("/admin/profile")}
        >
          <ListItemPrefix>
            <CgProfile className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>

        <ListItem
          className="text-white text-xl my-3 cursor-pointer"
          onClick={() => navigate("/admin/my-qrs")}
        >
          <ListItemPrefix>
            <FaQrcode className="h-5 w-5" />
          </ListItemPrefix>
          My QRs
        </ListItem>

        <ListItem
          className="text-white text-xl my-3 cursor-pointer"
          onClick={() => {
            localStorage.removeItem("lg");
            navigate("/qr");
            setRefresh((prev) => !prev);
          }}
        >
          <ListItemPrefix>
            <FaPlus className="h-5 w-5" />
          </ListItemPrefix>
          Smart QR
        </ListItem>

        <ListItem
          className="text-white text-xl my-3 cursor-pointer"
          onClick={() => {
            navigate("/generate-qr");
            setRefresh((prev) => !prev);
          }}
        >
          <ListItemPrefix>
            <FaPlus className="h-5 w-5" />
          </ListItemPrefix>
          Free QR
        </ListItem>

        {user?.pivot?.package_id < 3 && (
          <ListItem
            className="text-white text-xl my-3 cursor-pointer"
            onClick={() => navigate("/admin/upgrade")}
          >
            <ListItemPrefix>
              <FaPlus className="h-5 w-5" />
            </ListItemPrefix>
            Upgrade
          </ListItem>
        )}

        {user?.pivot?.package_id >= 2 && (
          <ListItem
            className="text-white text-xl my-3 cursor-pointer"
            onClick={() => navigate("/admin/renew")}
          >
            <ListItemPrefix>
              <FaPlus className="h-5 w-5" />
            </ListItemPrefix>
            Renew
          </ListItem>
        )}

        <ListItem
          className="text-white text-xl my-3 cursor-pointer"
          onClick={logout}
        >
          <ListItemPrefix>
            <IoMdLogOut className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
};

export default MainSideBar;
