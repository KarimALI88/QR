import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { FaChartSimple, FaPowerOff } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/imgs/QR-LOGO2.png";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
} from "@material-tailwind/react";
import axios from "axios";
import { AppContext } from "../../../context/AppContext";
const MainNavbar = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const {token, setToken} = useContext(AppContext)

  const navigate = useNavigate()
  
  // useEffect(() => {
  //   const tn = localStorage.tn;
  //   tn ? setToken(tn) : "";
  // }, []);
  
  const closeMenu = () => setIsMenuOpen(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const logoutApi = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "https://backend.ofx-qrcode.com/api/logout",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response", response);
    } catch (error) {
      console.error("error in logout", error);
    }
  };

  const logout = async () => {
    await logoutApi()
    localStorage.removeItem("tn")
    navigate("/login")
    // window.location.reload();
  }

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:pl-12 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as={Link}
        to="/"
        variant="small"
        color="blue-gray"
        className="p-4 text-md text-gray-600 hover:text-white hover:bg-mainColor transition duration-300 ease-in-out"
      >
        Home
      </Typography>
      <Typography
        as={Link}
        to="/payment"
        variant="small"
        color="blue-gray"
        className="p-4 text-md text-gray-600 hover:text-white hover:bg-mainColor transition duration-300 ease-in-out"
      >
        Payment
      </Typography>
      <Typography
        as={Link}
        to="/Contact"
        variant="small"
        color="blue-gray"
        className="p-4 text-md text-gray-600 hover:text-white hover:bg-mainColor transition duration-300 ease-in-out"
      >
        Contact
      </Typography>
      <Typography
        as={Link}
        to="/policies"
        variant="small"
        color="blue-gray"
        className="p-4 text-md text-gray-600 hover:text-white hover:bg-mainColor transition duration-300 ease-in-out"
      >
        Policies
      </Typography>
    </ul>
  );

  return (
    <div className="max-h-[768px] max-w-full">
      <Navbar className="sticky top-0 z-10 h-max py-5 max-w-full rounded-none shadow-sm">
        <div className="flex items-center justify-between w-full">
          {/* Logo and Navigation Links */}
          <div className="flex items-center">
            <Typography
              as={Link}
              to="/"
              className="cursor-pointer w-52 lg:w-72"
            >
              <img src={logo} alt="OFX QR Logo" />
            </Typography>
            <div className="hidden lg:block lg:ml-12">{navList}</div>
          </div>

          {/* Sign in Button / Profile Menu */}
          {token ? (
            <Menu
              open={isMenuOpen}
              handler={setIsMenuOpen}
              placement="bottom-end"
            >
              <MenuHandler>
                <Button
                  variant="text"
                  color="blue-gray"
                  className="flex items-center justify-start gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                  <Avatar
                    variant="circular"
                    size="md"
                    alt="User Avatar"
                    className="border border-gray-900 p-0.5"
                    src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?t=st=1730811104~exp=1730814704~hmac=26dcf6457601716f625358c7a18d2ee382f6d63c5e4700b68fecefb7df237aed&w=740"
                  />
                </Button>
              </MenuHandler>
              <MenuList className="p-1">
                <MenuItem
                  onClick={closeMenu}
                  className="flex items-center gap-2 rounded"
                >
                  <Typography
                    as={Link}
                    to="/admin/my-qrs"
                    variant="small"
                    className="font-normal flex items-center gap-2 text-lg"
                  >
                    <FaChartSimple /> Dashboard
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={logout}
                  className="flex items-center gap-2 rounded"
                >
                  <Typography
                    as={Link}
                    to="/admin/my-qrs"
                    variant="small"
                    className="font-normal flex items-center gap-2 text-lg"
                    color="red"
                  >
                    <FaPowerOff /> Sign Out
                  </Typography>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <div className="ml-auto hidden lg:block">
              <Link to="/login">
                <Button
                  size="lg"
                  className="rounded-none bg-mainColor hover:bg-secondColor text-white font-[600]"
                >
                  Sign in
                </Button>
              </Link>
            </div>
          )}

          {/* Hamburger Icon */}
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6 text-black"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>

        {/* Mobile Navigation */}
        <Collapse open={openNav} className="lg:hidden">
          <div className="flex flex-col gap-4 p-4">
            {/* Navigation List for Mobile */}
            <div>{navList}</div>

            {/* Sign-in Button for Mobile */}
            {!token && (
              <Button
                fullWidth
                variant="gradient"
                size="lg"
                className="bg-mainColor hover:bg-secondColor text-white font-[600]"
              >
                <Link to="/login">Sign in</Link>
              </Button>
            )}
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default MainNavbar;
