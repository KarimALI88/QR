import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import { FaQrcode } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import logo from "../../../assets/imgs/QR-LOGO1.png";
import { Link, useNavigate } from "react-router-dom";
const MainSideBar = () => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("tn")
    navigate("/login")
    window.location.reload();
  }
  
  return (
    <Card className="h-[100vh] rounded-none w-full max-w-[18rem] bg-mainColor text-white p-4 shadow-xl shadow-blue-gray-900/5 fixed left-0 bottom-0 top-0">
      <div className="mb-2 p-4">
        <Typography as={Link} variant="small" to="/" className="cursor-pointer">
          <img src={logo} />
        </Typography>
      </div>
      <List>
        <ListItem className="text-white text-xl my-3 flex gap-2" onClick={() => navigate("/qr")}>
          <ListItemPrefix>
            <FaPlus className="h-5 w-5" />
          </ListItemPrefix>
          <p>New QR</p>
        </ListItem>
        {/* <ListItem className="text-white text-xl my-3">
          <ListItemPrefix>
            <FaQrcode className="h-5 w-5" />
          </ListItemPrefix>
          <Link to={"/admin/my-qrs"}>My QRs</Link>
        </ListItem>
        <ListItem className="text-white text-xl my-3">
          <ListItemPrefix>
            <FaChartSimple className="h-5 w-5" />
          </ListItemPrefix>
          <Link to={"/admin/statistics"}>QR Statistics</Link>
          <ListItemSuffix>
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem> */}

        <ListItem className="text-white text-xl my-3" onClick={logout}>
          <ListItemPrefix>
            <IoMdLogOut className="h-5 w-5" />
          </ListItemPrefix>
          <button>Log Out</button>
        </ListItem>
      </List>
    </Card>
  );
};

export default MainSideBar;
