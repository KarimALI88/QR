import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import logo from "../../../assets/imgs/QR-LOGO2.png";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
} from "@material-tailwind/react";
const MainNavbar = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const tn = localStorage.tn;
    tn ? setToken(tn) : "";
  }, []);
  const closeMenu = () => setIsMenuOpen(false);
  const profileMenuItems = [
    {
      label: "My Dashboard",
    },
    {
      label: "Sign Out",
    },
  ];

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:pl-12 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as={Link}
        to="/"
        variant="small"
        color="blue-gray"
        className="p-4 text-md text-thirdColor hover:text-white hover:bg-mainColor transition duration-300 ease-in-out"
      >
        Home
      </Typography>
      <Typography
        as={Link}
        to="/products"
        variant="small"
        color="blue-gray"
        className="p-4  text-md text-thirdColor hover:text-white hover:bg-mainColor transition duration-300 ease-in-out"
      >
        Products
      </Typography>
      <Typography
        as={Link}
        to="/contact-us"
        variant="small"
        color="blue-gray"
        className="p-4 text-md text-thirdColor hover:text-white hover:bg-mainColor transition duration-300 ease-in-out"
      >
        Contact Us
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
          {/* Sign in Button */}
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
                    alt="tania andrew"
                    className="border border-gray-900 p-0.5"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                  />
                </Button>
              </MenuHandler>
              <MenuList className="p-1">
                {profileMenuItems.map(({ label }, key) => {
                  const isLastItem = key === profileMenuItems.length - 1;
                  return (
                    <MenuItem
                      key={label}
                      onClick={closeMenu}
                      className={`flex items-center gap-2 rounded ${
                        isLastItem
                          ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                          : ""
                      }`}
                    >
                      <Typography
                        as={Link}
                        to="/admin/my-qrs"
                        variant="small"
                        className="font-normal"
                        color={isLastItem ? "red" : "inherit"}
                      >
                        {label}
                      </Typography>
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Menu>
          ) : (
            <div className="ml-auto hidden lg:block">
              <Button
                size="lg"
                className="rounded-none bg-mainColor hover:bg-secondColor text-white font-[600]"
              >
                <Link to="/login">Sign in</Link>
              </Button>
            </div>
          )}
          {/* profile button */}

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
        <Collapse open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <Button
              fullWidth
              variant="gradient"
              size="lg"
              className="bg-mainColor hover:bg-secondColor text-white font-[600]"
            >
              <Link to="/login">Sign in</Link>
            </Button>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default MainNavbar;
