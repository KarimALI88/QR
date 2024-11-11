import React, { useContext, useState } from "react";
import MainNavbar from "../../../components/user/navbar/MainNavbar";
import QrGoal from "../../../components/user/qrgoal/QrGoal";
import {
  FaWhatsapp,
  FaFacebook,
  FaInstagramSquare,
  FaYoutube,
  FaEnvelopeOpenText,
  FaLaptop,
  FaMicrophone,
  FaVideo,
  FaImage,
  FaFilePdf,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdMenuBook, MdEventNote } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import WhatsappForm from "../../../components/user/whatsappForm/WhatsappForm";
import FaceForm from "../../../components/user/facebookForm/FaceForm";
import YoutubeForm from "../../../components/user/youtubeForm/YoutubeForm";
import XForm from "../../../components/user/twitterForm/XForm";
import InstgramForm from "../../../components/user/instgramForm/InstgramForm";
import WebsiteForm from "../../../components/user/websiteForm/WebsiteForm";
import GmailForm from "../../../components/user/gmailForm/GmailForm";
import { AppContext } from "../../../context/AppContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const QrForm = ({ user, refresh, setRefresh }) => {
  const [feature, setFeature] = useState("whatsapp");
  const { token } = useContext(AppContext);
  const navigate = useNavigate()

  const createSubscribtion = async () => {
    try {
      const response = await axios({
        method: "post",
        url: "https://backend.ofx-qrcode.com/api/subscriptions",
        data: {
          package_id: "1",
          duration: "year", 
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("subscribe", response);
      setRefresh(prevState => !prevState)
    } catch (error) {
      console.error("error in subscribe", error);
      toast.error(error.response.data.message);
    }
  };

  const subscribePackageZero = () => {
    {token ? Swal.fire({
      title: "Are you sure to subscribe on this package?",
      text: "You will be subscribed in this package",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#053B5C",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Subscribe",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Subscribed!",
          text: "Now Can Generate your QR code",
          icon: "success",
        });
        createSubscribtion();
      }
    }) : navigate("/login")}
  };

  // console.log("feature", feature);
  return (
    <div>
      <MainNavbar />
      {/* features */}
      <div className="p-10 shadow-sm m-10 bg-[#f5f5f5] flex flex-wrap gap-5 items-center ">
        <button onClick={() => setFeature("whatsapp")}>
          <QrGoal
            icon={<FaWhatsapp size={30} />}
            feature={"whatsapp"}
            selected={feature === "whatsapp" ? true : false}
          />
        </button>
        <button onClick={() => setFeature("facebook")}>
          <QrGoal
            icon={<FaFacebook size={30} />}
            feature={"facebook"}
            selected={feature === "facebook" ? true : false}
          />
        </button>
        <button onClick={() => setFeature("youtube")}>
          <QrGoal
            icon={<FaYoutube size={30} />}
            feature={"youtube"}
            selected={feature === "youtube" ? true : false}
          />
        </button>
        <button onClick={() => setFeature("twitter")}>
          <QrGoal
            icon={<FaXTwitter size={30} />}
            feature={"twitter"}
            selected={feature === "twitter" ? true : false}
          />
        </button>
        <button onClick={() => setFeature("instgram")}>
          <QrGoal
            icon={<FaInstagramSquare size={30} />}
            feature={"instgram"}
            selected={feature === "instgram" ? true : false}
          />
        </button>
        <button onClick={() => setFeature("website")}>
          <QrGoal
            icon={<FaLaptop size={30} />}
            feature={"website"}
            selected={feature === "website" ? true : false}
          />
        </button>
        <button onClick={() => setFeature("email")}>
          <QrGoal
            icon={<SiGmail size={30} />}
            feature={"email"}
            selected={feature === "email" ? true : false}
          />
        </button>
      </div>
      {/* {!user ||
        (!user?.pivot?.package_id && (
          <div className="my-5 mx-auto p-10">
            <button
              onClick={subscribePackageZero}
              className="bg-mainColor block mx-auto px-10 py-3 font-semibold text-white hover:bg-secondColor"
            >
              Subscribe
            </button>
          </div>
        ))} */}
      {/* =============================================================================== */}
      <div className="py-5 px-10 max-w-[80%]">
        {feature === "whatsapp" && <WhatsappForm user={user} />}
        {feature === "facebook" && <FaceForm user={user} />} 
        {feature === "youtube" && <YoutubeForm user={user} />}
        {feature === "twitter" && <XForm user={user} />}
        {feature === "instgram" && <InstgramForm user={user} />}
        {feature === "website" && <WebsiteForm user={user} />}
        {feature === "email" && <GmailForm user={user} />}
      </div>
    </div>
  );
};

export default QrForm;
