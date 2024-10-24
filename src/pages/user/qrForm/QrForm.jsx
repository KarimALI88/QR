import React from "react";
import MainNavbar from "../../../components/user/navbar/MainNavbar";
import QrGoal from "../../../components/user/qrgoal/QrGoal";
import { FaWhatsapp, FaFacebook, FaInstagramSquare, FaYoutube,FaEnvelopeOpenText, FaLaptop,FaMicrophone, FaVideo, FaImage,FaFilePdf  } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdMenuBook, MdEventNote } from "react-icons/md";
import { SiGmail } from "react-icons/si";

const QrForm = () => {
  return (
    <div>
        <MainNavbar />
      <div className="p-10 shadow-sm m-10 bg-[#f5f5f5] flex flex-wrap gap-5 items-center">
        <QrGoal icon={<FaWhatsapp size={30} className="text-mainColor"/>} feature={"whatsapp"}/>
        <QrGoal icon={<FaFacebook size={30} className="text-mainColor"/>} feature={"facebook"}/>
        <QrGoal icon={<FaYoutube size={30} className="text-mainColor"/>} feature={"youtube"}/>
        <QrGoal icon={<FaXTwitter size={30} className="text-mainColor"/>} feature={"twitter"}/>
        <QrGoal icon={<FaInstagramSquare size={30} className="text-mainColor"/>} feature={"instgram"}/>
        <QrGoal icon={<FaEnvelopeOpenText size={30} className="text-mainColor"/>} feature={"text"}/>
        <QrGoal icon={<FaLaptop size={30} className="text-mainColor"/>} feature={"website"}/>
        <QrGoal icon={<FaMicrophone size={30} className="text-mainColor"/>} feature={"MP3"}/>
        <QrGoal icon={<FaVideo size={30} className="text-mainColor"/>} feature={"Video"}/>
        <QrGoal icon={<FaImage size={30} className="text-mainColor"/>} feature={"Image"}/>
        <QrGoal icon={<FaFilePdf size={30} className="text-mainColor"/>} feature={"PDF"}/>
        <QrGoal icon={<MdMenuBook size={30} className="text-mainColor"/>} feature={"Menu"}/>
        <QrGoal icon={<SiGmail size={30} className="text-mainColor"/>} feature={"Email"}/>
        <QrGoal icon={<MdEventNote size={30} className="text-mainColor"/>} feature={"Event"}/>
      </div>
    </div>
  );
};

export default QrForm;
