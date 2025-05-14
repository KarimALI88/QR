import React, { useContext, useState } from "react";
import MainNavbar from "../../../components/user/navbar/MainNavbar";
import QrGoal from "../../../components/user/qrgoal/QrGoal";
import {
  FaWhatsapp,
  FaFacebook,
  FaInstagramSquare,
  FaYoutube,
  FaTiktok,
  FaLaptop,
  FaSnapchat,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
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
import Snapchat from "../../../components/user/snapchatForm/Snapchat";
import TikTok from "../../../components/user/tiktok/TiktokForm";
import { useTranslation } from "react-i18next";

const QrForm = ({ user, refresh, setRefresh }) => {
  const [feature, setFeature] = useState("whatsapp");
  const { token } = useContext(AppContext);
  const { t } = useTranslation()
  const navigate = useNavigate();

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
      response.data && setRefresh((prevState) => !prevState);
      response.data &&
        Swal.fire({
          title: "Subscribed!",
          text: "Now Can Generate your QR code",
          icon: "success",
        });
    } catch (error) {
      console.error("error in subscribe", error);
      toast.error(error.response.data.message);
    }
  };

  const subscribePackageZero = () => {
    {
      token
        ? Swal.fire({
            title: "Are you sure to subscribe on this package?",
            text: "You will be subscribed in this package",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#053B5C",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Subscribe",
          }).then((result) => {
            if (result.isConfirmed) {
              createSubscribtion();
            }
          })
        : navigate("/login", { state: { from: location.pathname } })
    }
  };

  // console.log("feature", feature);
  return (
    <div>
      <MainNavbar />
      {/* features */}
      <div className="p-10 shadow-sm m-10 bg-[#f5f5f5] flex flex-wrap gap-5 items-center ">
        <button onClick={() => setFeature(t("whatsapp"))}>
          <QrGoal
            icon={<FaWhatsapp size={30} />}
            feature={t("whatsapp")}
            selected={feature === t("whatsapp") ? true : false}
          />
        </button>
        <button onClick={() => setFeature(t("facebook"))}>
          <QrGoal
            icon={<FaFacebook size={30} />}
            feature={t("facebook")}
            selected={feature === t("facebook") ? true : false}
          />
        </button>
        <button onClick={() => setFeature(t("youtube"))}>
          <QrGoal
            icon={<FaYoutube size={30} />}
            feature={t("youtube")}
            selected={feature === t("youtube") ? true : false}
          />
        </button>
        <button onClick={() => setFeature(t("twitter"))}>
          <QrGoal
            icon={<FaXTwitter size={30} />}
            feature={t("twitter")}
            selected={feature === t("twitter") ? true : false}
          />
        </button>
        <button onClick={() => setFeature(t("instgram"))}>
          <QrGoal
            icon={<FaInstagramSquare size={30} />}
            feature={t("instgram")}
            selected={feature === t("instgram") ? true : false}
          />
        </button>
        <button onClick={() => setFeature(t("website"))}>
          <QrGoal
            icon={<FaLaptop size={30} />}
            feature={t("website")}
            selected={feature === t("website") ? true : false}
          />
        </button>
        <button onClick={() => setFeature(t("email"))}>
          <QrGoal
            icon={<SiGmail size={30} />}
            feature={t("email")}
            selected={feature === t("email") ? true : false}
          />
        </button>
        <button onClick={() => setFeature(t("Snapchat"))}>
          <QrGoal
            icon={<FaSnapchat size={30} />}
            feature={t("Snapchat")}
            selected={feature === t("Snapchat") ? true : false}
          />
        </button>
        <button onClick={() => setFeature(t("tiktok"))}>
          <QrGoal
            icon={<FaTiktok size={30} />}
            feature={t("tiktok")}
            selected={feature === t("tiktok") ? true : false}
          />
        </button>
      </div>
      {!user ||
        (!user?.pivot?.package_id && (
          <div className="my-5 mx-auto p-10">
            <button
              onClick={subscribePackageZero}
              className="bg-mainColor block mx-auto px-10 py-3 font-semibold text-white hover:bg-secondColor"
            >
              {t("subscribeNow")}
            </button>
          </div>
        ))}
      {/* =============================================================================== */}
      <div className="py-5 px-10 max-w-[80%]">
        {feature === t("whatsapp") && <WhatsappForm user={user} />}
        {feature === t("facebook") && <FaceForm user={user} />}
        {feature === t("youtube") && <YoutubeForm user={user} />}
        {feature === t("twitter") && <XForm user={user} />}
        {feature === t("instgram") && <InstgramForm user={user} />}
        {feature === t("website") && <WebsiteForm user={user} />}
        {feature === t("email") && <GmailForm user={user} />}
        {feature === t("Snapchat") && <Snapchat user={user} />}
        {feature === t("tiktok") && <TikTok user={user} />}
      </div>
    </div>
  );
};

export default QrForm;
