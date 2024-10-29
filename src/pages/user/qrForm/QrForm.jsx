import React, { useState } from "react";
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

const QrForm = () => {
  const [feature, setFeature] = useState("whatsapp");

  console.log("feature", feature);
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
            icon={<SiGmail size={30}  />}
            feature={"email"}
            selected={feature === "email" ? true : false}
          />
        </button>
      </div>
      {/* =============================================================================== */}
      <div className="py-5 px-10 max-w-[80%]">
        {feature === "whatsapp" && <WhatsappForm />}
        {feature === "facebook" && <FaceForm />}
        {feature === "youtube" && <YoutubeForm />}
        {feature === "twitter" && <XForm />}
        {feature === "instgram" && <InstgramForm />}
        {feature === "website" && <WebsiteForm />}
        {feature === "email" && <GmailForm />}
      </div>
    </div>
  );
};

export default QrForm;
