import React, { useEffect, useState } from "react";
// import logo from "./../../../assets/imgs/QR-LOGO2.png";
import { Input } from "@material-tailwind/react";
import { BiLogoGmail } from "react-icons/bi";
import { MdKey } from "react-icons/md";
import { IoPhonePortrait } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// ${import.meta.env.VITE_LINK_API}
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userRegister = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: `https://backend.ofx-qrcode.com/api/signup`,
        data: {
          email,
          password,
          phone,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("response", response);
      toast.success("registered successfully");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      // console.log("error", error.message);
      setLoading(false);
      if (error.response && error.response.data && error.response.data.errors) {
        const emailError = error.response.data.errors.email
          ? error.response.data.errors.email[0]
          : "";
        const phoneError = error.response.data.errors.phone
          ? error.response.data.errors.phone[0]
          : "";
        const passwordError = error.response.data.errors.password
          ? error.response.data.errors.password[0]
          : "";

        toast.error(`Errors: ${emailError} ${phoneError} ${passwordError}`);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 h-[100vh]">
        <img
          src="https://img.freepik.com/free-vector/qr-code-concept-illustration_114360-5853.jpg?t=st=1729773958~exp=1729777558~hmac=955d814eb03a45c1edf8d06e91fb100430faa59a2001a16bd473ba1b7d5a30f3&w=740"
          alt="login img"
          className="h-[100vh] object-cover object-right"
        />
      </div>
      {/* ------------------------------------------------------------------- */}
      <div className="flex-1  p-4 h-[100%] flex-col">
        {/* <img src={logo} alt="OFX QR CODE" className="w-52 lg:w-72" /> */}
        <div className="text-center my-20 mx-auto">
          <h3 className="text-mainColor font-semibold text-3xl">
            Welcome to OFX Signup
          </h3>

          {/* email */}
          <div className="w-[80%] md:w-[70%] lg:w-[60%] mx-auto my-10">
            <Input
              label="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., your-email@gmail.com"
              className="w-full flex items-center h-[65px]  appearance-none rounded-lg border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-offset-0 focus:ring-opacity-50"
              icon={<BiLogoGmail size={25} />}
            />
          </div>

          {/* phone */}
          <div className="w-[80%] md:w-[70%] lg:w-[60%] mx-auto my-10">
            <Input
              label="phone"
              placeholder="01061472185"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full flex items-center h-[65px] appearance-none rounded-lg border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-offset-0 focus:ring-opacity-50"
              icon={<IoPhonePortrait size={25} />}
            />
          </div>

          {/* password */}
          <div className="w-[80%] md:w-[70%] lg:w-[60%] mx-auto mb-5">
            <Input
              label="password"
              placeholder="**********************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full flex items-center h-[65px] appearance-none rounded-lg border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-offset-0 focus:ring-opacity-50"
              icon={<MdKey size={25} />}
            />
          </div>

          {/* register */}
          <h5 className="mt-11 block">
            already have an account{" "}
            <Link to={"/login"} className="text-mainColor underline text-lg">
              login
            </Link>
          </h5>

          {/* button submit */}
          <div className="w-[80%] md:w-[70%] lg:w-[60%] mx-auto my-5">
            <button
              onClick={userRegister}
              className="bg-mainColor w-[100%] px-5 py-5 font-semibold text-center text-white hover:bg-secondColor"
            >
              {loading ? <Spinner className="mx-auto" /> : "Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
