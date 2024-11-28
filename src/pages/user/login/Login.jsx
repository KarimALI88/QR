import React, { useState, useEffect, useContext } from "react";
import logo from "../../../assets/imgs/QR-LOGO2.PNG";
import { Input } from "@material-tailwind/react";
import { BiLogoGmail } from "react-icons/bi";
import { MdKey } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import { AppContext } from "./../../../context/AppContext";
import loginImage from "../../../assets/imgs/loginImage.jpg";
import { IoMdClose } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Login = ({ setRefresh }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [view, setView] = useState(false);
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const userLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        toast.error("wrong answers");
        setLoading(false);
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("logged in", data);
      data.user.role==="admin" ? navigate("/superadmin/analysis") : navigate("/admin/profile");
      setLoading(false);
      localStorage.setItem("tn", data.token);
      setToken(data.token);
      toast.success("Logged in successfully");
      setRefresh((prevState) => !prevState);
      
    } catch (error) {
      console.error("error", error);
      toast.error("wrong answers");
      setLoading(false);
    }
  };
  
  const googleAuth = async () => {
    try {
      const response = await axios({
        method:"get",
        url:`${import.meta.env.VITE_API_LINK}/auth/google`,
        headers:{
          "Content-Type":"application/json"
        }
      })
      console.log("google response", response)
      response.token && localStorage.setItem("tn", response.token)
      response.token && navigate("/admin/profile")
    } catch (error) {
      console.log("error in google auth ", error)
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 p-4 min-h-[100%] flex-col">
        <div className="flex justify-between items-center">
          <img src={logo} alt="OFX QR CODE" className="w-52 lg:w-72" onClick={() => navigate("/")}/>
          <IoMdClose
            className="cursor-pointer"
            size={35}
            color="black"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="text-center my-20 mx-auto">
          <h3 className="text-mainColor font-semibold text-3xl">
            Welcome to OFX Login
          </h3>

          {/* <div className="w-fit mx-auto px-5 my-5">
            <button onClick={googleAuth} className="flex justify-start items-center text-xl gap-3 border-2 border-gray-500 rounded-xl px-3 py-2">
              <FcGoogle size={35} />
              Sign in with google
            </button>
          </div> */}

          {/* email */}
          <div className="w-[80%] md:w-[70%] lg:w-[60%] mx-auto my-10">
            <Input
              label="email"
              placeholder="e.g., your-email@gmail.com"
              value={email}
              size="lg"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full block h-14 appearance-none rounded-lg border border-gray-300 py-10 px-3 text-gray-700 focus:outline-none focus:ring-offset-0 focus:ring-opacity-50"
              icon={<BiLogoGmail size={25} />}
            />
          </div>

          {/* password */}
          <div className="w-[80%] md:w-[70%] lg:w-[60%] mx-auto mb-5">
            <Input
              label="password"
              placeholder="****************"
              type={view ? "text" : "password"}
              value={password}
              size="lg"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full block h-14 appearance-none rounded-lg border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-offset-0 focus:ring-opacity-50"
              icon={
                <MdKey
                  size={25}
                  onClick={() => setView((prevState) => !prevState)}
                />
              }
            />
          </div>

          {/* register */}
          <p className="mt-5 text-center">
            if you don't have an account{" "}
            <Link to={"/register"} className="text-mainColor underline text-lg">
              signup
            </Link>
          </p>

          {/* forget password */}
          <p className="mt-2">
            if you forget your password{" "}
            <Link to={"/forget-password"} className="text-mainColor underline text-lg">
              forget password
            </Link>
          </p>

          {/* button submit */}
          <div className="w-[80%] md:w-[70%] lg:w-[60%] mx-auto my-5">
            <button
              onClick={userLogin}
              className="bg-mainColor w-[100%] px-5 py-5 font-semibold text-white hover:bg-secondColor"
            >
              {loading ? <Spinner className="mx-auto" /> : "Login"}
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

export default Login;
