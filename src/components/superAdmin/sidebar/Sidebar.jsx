import React from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  MdOutlinePerson,
  MdSettings,
  MdOutlineMailOutline,
  MdPowerSettingsNew,
  MdOutlineSearch,
  MdOutlineClose,
} from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import logo from '../../../assets/imgs/QR-LOGO2.png'
import { useNavigate } from "react-router-dom";
import { FaTable } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";

function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const navigate = useNavigate()
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  

  return (
    <div className="ml-24">
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <MdOutlineClose className="h-8 w-8 stroke-2" />
        ) : (
          <IoMenu className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <img
              src={logo}
              alt="brand"
              onClick={() => navigate("/")}
              className="cursor-pointer"
            />
            
          </div>
          <div className="p-2">
            <Input
              icon={<MdOutlineSearch className="h-5 w-5" />}
              label="Search"
            />
          </div>
          <List>
            <ListItem onClick={() => navigate("/superadmin/dashboard")}>
              <ListItemPrefix>
                <FaTable className="h-5 w-5" />
              </ListItemPrefix>
              Tables
            </ListItem>
            <ListItem onClick={() => navigate("/superadmin/analysis")}>
              <ListItemPrefix>
                <SiGoogleanalytics className="h-5 w-5" />
              </ListItemPrefix>
              Analysis
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <MdSettings className="h-5 w-5" />
              </ListItemPrefix>
              Settings
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <MdPowerSettingsNew className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </Card>
      </Drawer>
    </div>
  );
}

export default Sidebar;
