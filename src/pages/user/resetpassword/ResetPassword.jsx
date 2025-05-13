import React, { useState, useEffect, useContext } from "react";
import logo from "../../../assets/imgs/QRLOGO2.PNG";
import { Input } from "@material-tailwind/react";
import { BiLogoGmail } from "react-icons/bi";
import { MdKey } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import { AppContext } from "./../../../context/AppContext";
import loginImage from "./../../../assets/imgs/loginImage.jpg";
import { IoMdClose } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [view, setView] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const email = queryParams.get("email");

  console.log("Token:", token);
  console.log("Email:", email);

  const resetPassword = async () => {
    setLoading(true);
    if (password !== confirmPassword) {
      toast.error("password and confirm password not matched");
      setLoading(false);
    } else {
      try {
        const response = await axios({
          method: "post",
          url: `${import.meta.env.VITE_API_LINK}/reset-password`,
          data: {
            email,
            token,
            password,
            password_confirmation: confirmPassword,
          },
        });
        console.log("response of reset ", response);
        setLoading(false);
        if(response.data) {
            toast.success("Changed Succeesfully")
            navigate("/login")
        }else{
            toast.error("error")
        }
      } catch (error) {
        console.error("error in api reset", error);
        setLoading(false);
        toast.error(error.response.data.message)
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 p-4 min-h-[100%] flex-col">
        <div className="flex justify-between items-center">
          <img src={logo} alt="OFX QR CODE" className="w-52 lg:w-72" onClick={() => navigate("/")}/>
          <IoMdClose
            className="cursor-pointer"
            size={35}
            color="black"
            onClick={() => navigate("/login")}
          />
        </div>
        <div className="text-center my-20 mx-auto">
          <h3 className="text-mainColor font-semibold text-3xl">
            Add New Password
          </h3>

          {/* new password */}
          <div className="w-[80%] md:w-[70%] lg:w-[60%] mx-auto my-10">
            <Input
              label="New Password"
              placeholder="*****************"
              value={password}
              type={view ? "text" : "password"}
              size="lg"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full block h-14 appearance-none rounded-lg border border-gray-300 py-10 px-3 text-gray-700 focus:outline-none focus:ring-offset-0 focus:ring-opacity-50"
              icon={
                <MdKey
                  size={25}
                  onClick={() => setView((prevState) => !prevState)}
                />
              }
            />
          </div>

          {/* confirm password */}
          <div className="w-[80%] md:w-[70%] lg:w-[60%] mx-auto mb-5">
            <Input
              label="Confirm Password"
              placeholder="****************"
              type={view ? "text" : "password"}
              value={confirmPassword}
              size="lg"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full block h-14 appearance-none rounded-lg border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-offset-0 focus:ring-opacity-50"
              icon={
                <MdKey
                  size={25}
                  onClick={() => setView((prevState) => !prevState)}
                />
              }
            />
          </div>

          {/* button submit */}
          <div className="w-[80%] md:w-[70%] lg:w-[60%] mx-auto my-5">
            <button
              onClick={resetPassword}
              disabled={password.length === 0 || confirmPassword === 0}
              className="bg-mainColor w-[100%] px-5 py-5 font-semibold text-white hover:bg-secondColor"
            >
              {loading ? <Spinner className="mx-auto" /> : "Submit"}
            </button>
          </div>
        </div>
      </div>

      {/* Display image only on medium (md) and larger screens */}
      <div className="flex-1 h-[100vh] hidden md:block">
        <img
          src={loginImage}
          alt="login img"
          className="h-[100vh] object-cover object-right"
        />
      </div>
    </div>
  );
};

export default ResetPassword;
