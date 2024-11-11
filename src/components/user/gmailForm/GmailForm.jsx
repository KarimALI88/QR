import React, { useContext, useState, useEffect } from "react";
import { Input, Typography } from "@material-tailwind/react";
import { AppContext } from "../../../context/AppContext";
import { Dialog } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import axios from "axios";
import { Link } from "react-router-dom";

const GmailForm = ({ user }) => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [image, setImage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const {token} = useContext(AppContext)
  const [downloadImage, setDownloadImage] = useState("");

  // useEffect(() => {
  //   const tn = localStorage.getItem("tn");
  //   setToken(tn);
  // }, []);

  const handleOpen = () => setOpenModal(!openModal);

  const getQR = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_LINK}/generate-qrcode`,
        data: {
          link: `mailto:${email}?subject=${subject}&body=${emailBody}`,
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
    }
  };

  // const downloadImage = (imageSrc) => {
  //   const link = document.createElement("a");
  //   link.href = imageSrc;
  //   link.download = "qr-code.png"; // Set the default filename here
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  return (
    <div>
      <div className="my-5">
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-1 font-semibold text-lg"
        >
          Email
        </Typography>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="appearance-none min-h-[60px] !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
      </div>
      {/* ======================================================== */}
      <div className="my-5">
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-1 mt-10 font-semibold text-lg"
        >
          Subject
        </Typography>
        <Input
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="appearance-none min-h-[60px] !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
      </div>
      {/* ========================================================= */}
      <div className="my-5">
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-1 mt-10 font-semibold text-lg"
        >
          Message
        </Typography>
        <Input
          placeholder="Message"
          value={emailBody}
          onChange={(e) => setEmailBody(e.target.value)}
          className="appearance-none min-h-[60px] !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
      </div>
      {/* ======================================================= */}
      <div className="mt-10">
        {/* {user?.pivot?.package_id && (
          <button
            onClick={getQR}
            disabled={
              email.length === 0 ||
              subject.length === 0 ||
              emailBody.length === 0
            }
            className="bg-mainColor px-10 py-3 font-semibold text-white hover:bg-secondColor"
          >
            {loading ? <Spinner className="mx-auto" /> : "Submit"}
          </button>
        )} */}
        {token ? <button
          onClick={getQR}
          disabled={
            email.length === 0 || subject.length === 0 || emailBody.length === 0
          }
          className="bg-mainColor px-10 py-3 font-semibold text-white hover:bg-secondColor"
        >
          {loading ? <Spinner className="mx-auto" /> : "Submit"}
        </button> : <Link to={"/login"} className="bg-mainColor px-10 py-3 font-semibold text-white hover:bg-secondColor">Submit</Link>}
      </div>

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
          Download
        </a>
      </Dialog>
    </div>
  );
};

export default GmailForm;
