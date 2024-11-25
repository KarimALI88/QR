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
  MdOutlineDashboard,
  MdOutlineShoppingBag,
  MdOutlinePerson,
  MdSettings,
  MdOutlineMailOutline,
  MdPowerSettingsNew,
  MdOutlineSearch,
  MdOutlineMenu,
  MdOutlineClose,
} from "react-icons/md";
import { FiChevronRight, FiChevronDown, FiBox } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";

function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  

  return (
    <div className="ml-24 my-10">
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
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            />
            <Typography variant="h5" color="blue-gray">
              Sidebar
            </Typography>
          </div>
          <div className="p-2">
            <Input
              icon={<MdOutlineSearch className="h-5 w-5" />}
              label="Search"
            />
          </div>
          <List>
            <ListItem>
              <ListItemPrefix>
                <MdOutlineMailOutline className="h-5 w-5" />
              </ListItemPrefix>
              Users
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
            <ListItem>
              <ListItemPrefix>
                <MdOutlinePerson className="h-5 w-5" />
              </ListItemPrefix>
              Profile
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
