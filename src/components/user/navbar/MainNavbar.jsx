import React, { useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import logo from '../../../assets/imgs/QR-LOGO2.png';

const MainNavbar = () => {
  const [openNav, setOpenNav] = React.useState(false);

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
      <Navbar className="sticky top-0 z-10 h-max py-5 max-w-full rounded-none shadow-none">
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
          <div className="ml-auto hidden lg:block">
            <Button
              size="lg"
              className="rounded-none bg-mainColor hover:bg-secondColor text-white font-[600]"
            >
              <Link to="/login">Sign in</Link>
            </Button>
          </div>
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
                className="h-6 w-6"
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
                className="h-6 w-6"
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
