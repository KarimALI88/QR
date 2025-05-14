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
import logo from "./../../../assets/imgs/QRLOGO2.png";
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
import { CgProfile } from "react-icons/cg";
import Translate from "../translate/Translate";
import { useTranslation } from "react-i18next";

const MainNavbar = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { token, setToken, language } = useContext(AppContext);
  const { t } = useTranslation();

  const navigate = useNavigate();

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
    await logoutApi();
    localStorage.removeItem("tn");
    navigate("/login");
    window.location.reload();
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-1 lg:pl-12 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-4">
      <Typography
        as={Link}
        to="/"
        variant="small"
        className="p-3 text-md font-medium rounded-lg text-gray-700 hover:text-white hover:bg-gradient-to-r from-mainColor to-secondColor transition-all duration-300 hover:shadow-md"
      >
        {t("homeLink")}
      </Typography>
      <Typography
        as={Link}
        to="/blogs"
        variant="small"
        className="p-3 text-md font-medium rounded-lg text-gray-700 hover:text-white hover:bg-gradient-to-r from-mainColor to-secondColor transition-all duration-300 hover:shadow-md"
      >
        {t("newsLink")}
      </Typography>
      <Typography
        as={Link}
        to="/payment"
        variant="small"
        className="p-3 text-md font-medium rounded-lg text-gray-700 hover:text-white hover:bg-gradient-to-r from-mainColor to-secondColor transition-all duration-300 hover:shadow-md"
      >
        {t("paymentLink")}
      </Typography>

      {token && (
        <>
          <Typography
            as={Link}
            to="/admin/my-qrs"
            variant="small"
            className="p-3 text-md font-medium rounded-lg text-gray-700 hover:text-white hover:bg-gradient-to-r from-mainColor to-secondColor transition-all duration-300 hover:shadow-md"
          >
            {t("dashboardLink")}
          </Typography>
          <Typography
            as={Link}
            to="/admin/profile"
            variant="small"
            className="p-3 text-md font-medium rounded-lg text-gray-700 hover:text-white hover:bg-gradient-to-r from-mainColor to-secondColor transition-all duration-300 hover:shadow-md"
          >
            {t("profileLink")}
          </Typography>
        </>
      )}

      {/* Added margin to separate navigation links from translate button */}
      <div className="lg:ml-8">
        <Translate closeNavbar={() => setOpenNav(false)} />
      </div>
    </ul>
  );

  return (
    <div className="max-h-[768px] max-w-full">
      <Navbar className="sticky top-0 z-10 h-max py-3 max-w-full rounded-none shadow-md bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center justify-between w-full px-4">
          {/* Logo and Navigation Links */}
          <div className="flex items-center">
            <Typography
              as={Link}
              to="/"
              className="cursor-pointer w-52 lg:w-72 transition-transform hover:scale-105"
            >
              <img src={logo} alt="OFX QR Logo" className="h-auto" />
            </Typography>
            <div className="hidden lg:block lg:ml-8">{navList}</div>
          </div>

          {/* Spacer to push buttons to the end */}
          <div className="flex-1 hidden lg:block"></div>

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
                  className="flex items-center justify-start gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-4 hover:bg-gray-100 transition-all"
                >
                  <Avatar
                    variant="circular"
                    size="md"
                    alt="User Avatar"
                    className="border-2 border-mainColor p-0.5 mx-3 hover:scale-110 transition-transform"
                    src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?t=st=1730811104~exp=1730814704~hmac=26dcf6457601716f625358c7a18d2ee382f6d63c5e4700b68fecefb7df237aed&w=740"
                  />
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`h-3 w-3 transition-transform ${
                      isMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </MenuHandler>
              <MenuList className="p-1.5 min-w-[180px] shadow-xl rounded-lg border border-gray-200">
                <MenuItem
                  onClick={logout}
                  className="flex items-center gap-3 rounded hover:bg-red-50/80 transition-colors"
                >
                  <FaPowerOff className="text-red-500" />
                  <Typography
                    variant="small"
                    className="font-medium text-lg text-red-500"
                  >
                    {t("logoutLink")}
                  </Typography>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <div className="hidden lg:flex items-center gap-4">
              <Link to="/login">
                <Button
                  size="lg"
                  className="rounded-lg bg-gradient-to-r from-mainColor to-secondColor hover:from-secondColor hover:to-mainColor text-white font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  {t("loginLink")}
                </Button>
              </Link>
            </div>
          )}

          {/* Hamburger Icon */}
          <IconButton
            variant="text"
            className="ml-auto h-10 w-10 text-inherit hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200 rounded-full lg:hidden transition-all"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6 text-gray-700"
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
                className="h-6 w-6 text-gray-700"
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
          <div className="flex flex-col gap-4 p-4 bg-white/95 backdrop-blur-sm">
            {/* Navigation List for Mobile */}
            <div>{navList}</div>

            {/* Sign-in/Register Buttons for Mobile */}
            {!token && (
              <div className="flex flex-col gap-3">
                <Link to="/login" className="w-full">
                  <Button
                    fullWidth
                    size="lg"
                    className="rounded-lg bg-gradient-to-r from-mainColor to-secondColor hover:from-secondColor hover:to-mainColor text-white font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    {t("loginLink")}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default MainNavbar;
