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
import logo from '../../../assets/imgs/QR-LOGO1.png'
import { Link } from "react-router-dom";
const MainSideBar = () => {
  return (
    <Card className="h-[100vh] rounded-none w-full max-w-[20rem] bg-mainColor text-white p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="small" to="/">
          <img src={logo} />
        </Typography>
      </div>
      <List>
        <ListItem className="text-white text-xl my-3">
          <ListItemPrefix>
            <FaPlus className="h-5 w-5" />
          </ListItemPrefix>
          <Link to={"/qr"}>New QR</Link>
        </ListItem>
        <ListItem className="text-white text-xl my-3">
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
        </ListItem>

        <ListItem className="text-white text-xl my-3">
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
