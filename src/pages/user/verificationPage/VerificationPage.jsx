import React, { useEffect, useState } from "react";
import logo from "../../../assets/imgs/QR-LOGO2.PNG";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { Input } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import { BiLogoGmail } from "react-icons/bi";
import axios from "axios";
import loginImage from "../../../assets/imgs/loginImage.jpg";

const VerificationPage = () => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const em = localStorage.getItem("em");
    setEmail(em);
  }, []);

  const checkVerification = async () => {
    setLoading(true);
    if (email.length === 0 || verificationCode === 0) {
      toast.error("email and code must contain values");
    } else {
      try {
        const response = await axios({
          method: "post",
          url: `${import.meta.env.VITE_API_LINK}/verify-code`,
          data: {
            verification_code: verificationCode,
            email,
          },
        });
        console.log("response verify", response);
        setLoading(false)
        if(response.data.user){
            toast.success("Done")
            navigate("/login")
        }
      } catch (error) {
        console.log("error in verCode", error);
        setLoading(false)
        toast.error("error")
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
            onClick={() => navigate("/register")}
          />
        </div>
        <div className="text-center my-20 mx-auto">
          <h3 className="text-mainColor font-semibold text-3xl">
            If you forget password
          </h3>

          {/* Verification Code */}
          <div className="w-[80%] md:w-[70%] lg:w-[60%] mx-auto my-10">
            <Input
              label="Verification Code"
              placeholder="**********"
              value={verificationCode}
              size="lg"
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full block h-14 appearance-none rounded-lg border border-gray-300 py-10 px-3 text-gray-700 focus:outline-none focus:ring-offset-0 focus:ring-opacity-50"
              icon={<BiLogoGmail size={25} />}
            />
          </div>

          {/* button submit */}
          <div className="w-[80%] md:w-[70%] lg:w-[60%] mx-auto my-5">
            <button
              onClick={checkVerification}
              className="bg-mainColor w-[100%] px-5 py-5 font-semibold text-white hover:bg-secondColor"
            >
              {loading ? <Spinner className="mx-auto" /> : "Reset"}
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

export default VerificationPage;
