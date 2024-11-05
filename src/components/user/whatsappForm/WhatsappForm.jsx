import React, { useEffect, useState } from "react";
import { Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { Dialog } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const WhatsappForm = ({ user }) => {
  const [number, setNumber] = useState("");
  const [text, setText] = useState("");
  const [token, setToken] = useState("");
  const [image, setImage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const tn = localStorage.getItem("tn");
    setToken(tn);
  }, []);

  const handleOpen = () => setOpenModal(!openModal);

  const getQR = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_LINK}/generate-qrcode`,
        data: {
          link: `https://wa.me/2${number}?text=${encodeURIComponent(text)}`,
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
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  const downloadImage = (imageSrc) => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "qr-code.png"; // Set the default filename here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="my-5">
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-1 font-semibold text-lg"
        >
          Whatsapp Number
        </Typography>
        <Input
          placeholder="whatsapp number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="appearance-none min-h-[60px] !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
      </div>
      {/* ======================================================= */}
      <div className="mt-5">
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-1 mt-10 font-semibold text-lg"
        >
          Message
        </Typography>
        <Input
          placeholder="whatsapp number"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="appearance-none min-h-[60px] !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
      </div>
      {/* ======================================================= */}
      <div className="mt-10">
        {user && user.package_id === 1 && (
          <button
            onClick={getQR}
            disabled={number.length === 0 && text.length === 0}
            className="bg-mainColor px-10 py-3 font-semibold text-white hover:bg-secondColor"
          >
            {loading ? <Spinner className="mx-auto" /> : "Submit"}
          </button>
        )}
        
      </div>

      <Dialog
        open={openModal}
        handler={handleOpen}
        className="p-10 text-center"
      >
        <img src={image} alt="qr" className="block mx-auto my-10" />
        <button
          onClick={() => downloadImage(image)}
          className="bg-mainColor px-10 py-3 font-semibold text-white hover:bg-secondColor w-full"
        >
          Download
        </button>
      </Dialog>
    </div>
  );
};

export default WhatsappForm;
