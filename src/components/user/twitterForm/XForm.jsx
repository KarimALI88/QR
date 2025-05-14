import React, { useContext, useEffect, useState } from "react";
import { Input, Typography } from "@material-tailwind/react";
import { Dialog } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import axios from "axios";
import { AppContext } from "../../../context/AppContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const XForm = ({ user }) => {
  const [link, setLink] = useState("");
  const { token } = useContext(AppContext);
  const [image, setImage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloadImage, setDownloadImage] = useState("");
  const { t } = useTranslation()
  const handleOpen = () => setOpenModal(!openModal);

  const getQR = async () => {
    setLoading(true);
    if (link.includes("x.com")) {
      try {
        const response = await axios({
          method: "post",
          url: `${import.meta.env.VITE_API_LINK}/generate-qrcode`,
          data: {
            link: link,
            package_id: "1",
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log("qr response", response);
        setOpenModal(true);
        setImage(`https://backend.ofx-qrcode.com${response.data.qr_code_url}`);
        setDownloadImage(
          response.data.qr_code_url.substring(
            response.data.qr_code_url.lastIndexOf("/") + 1
          )
        );
        setLoading(false);
      } catch (error) {
        console.log("error", error);
        setLoading(false);
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("link must contain x.com");
      setLoading(false);
    }
  };


  return (
    <div>
      <div className="my-5">
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-1 font-semibold text-lg"
        >
          {t("url")}
        </Typography>
        <Input
          placeholder={t("url")}
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="appearance-none min-h-[60px] !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
      </div>
      {/* ======================================================= */}
      <div className="mt-10">
        {user && user?.pivot?.package_id && (
          <>
            {token ? (
              <button
                onClick={getQR}
                disabled={link.length === 0}
                className="bg-mainColor px-10 py-3 font-semibold text-white hover:bg-secondColor"
              >
                {loading ? <Spinner className="mx-auto" /> : "Submit"}
              </button>
            ) : (
              <Link
                to={"/login"}
                className="bg-mainColor px-10 py-3 font-semibold text-white hover:bg-secondColor"
              >
                {t("submit")}
              </Link>
            )}
          </>
        )}

        <Dialog
          open={openModal}
          handler={handleOpen}
          className="p-10 text-center"
        >
          <img src={image} alt="qr" className="block mx-auto my-10" />
          <a
            // onClick={() => downloadImageAsPDF(image)}
            href={`https://backend.ofx-qrcode.com/download-qrcode/${downloadImage}`}
            className="bg-mainColor px-10 py-3 font-semibold text-white hover:bg-secondColor w-full"
          >
            {t("download")}
          </a>
        </Dialog>
      </div>
    </div>
  );
};

export default XForm;
