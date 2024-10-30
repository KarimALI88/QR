import { FaFilePdf } from "react-icons/fa6";
import {
  FaFacebook,
  FaInstagramSquare,
  FaBehance,
  FaYoutube,
  FaWhatsappSquare,
  FaLinkedin,
} from "react-icons/fa";
import mp3 from "../../../assets/imgs/الاخلاص.mp3";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { Collapse, Button, Card } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const {id} = useParams()
  const [profileData, setProfileData] = useState({});

  const toggleOpen = () => setOpen((cur) => !cur);

  const getProfile = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `https://backend.ofx-qrcode.com/api/profile/qrcode/${id}`,
      });
      console.log("response", response);
      setProfileData(response.data);
    } catch (error) {
      console.log("error in api", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, [id]);
  return (
    <div
      className="flex flex-col items-center justify-start h-full overflow-auto"
      style={{ backgroundColor: profileData?.background_color }}
    >
      <div className="w-[100%] h-[400px] relative mb-14">
        <img
          src={`https://backend.ofx-qrcode.com/storage/${profileData?.cover}`}
          alt=""
          className="h-[100%] w-[100%] object-cover"
        />
        <div className="absolute top-[95%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
          <img
            src={`https://backend.ofx-qrcode.com/storage/${profileData?.logo}`}
            alt="logo"
            className="mx-auto my-3 w-[200px] h-[200px] rounded-full border-4 border-white"
          />
        </div>
      </div>
      <div className="my-16">
        {" "}
        {/* Add margin to create space between the logo and text */}
        <h1 className="text-center text-4xl p-1 text-white font-black uppercase">
          {profileData?.title}
        </h1>
        <div className="flex flex-col items-center my-5 max-w-[80%] mx-auto">
          <p className="mx-auto p-1 text-3xl text-center text-gray-500 font-medium capitalize">
            {profileData?.description}
          </p>
        </div>
        <div className="flex gap-5 items-center justify-center">
          <FaPhoneAlt size={40} color="white" />
          <h3 className="text-white text-3xl font-semibold my-5 text-center">
            {profileData?.phones?.map((phone, index) => (
              <div key={index}>
                <a href={`tel:${phone}`}>
                  {phone}
                </a>
                <br />
              </div>
            ))}
          </h3>
        </div>
        <div className="flex gap-5 items-center px-2 my-5 justify-center">
          {/* <audio controls src={mp3} className="w-[80%]" /> */}
          <FaFilePdf color="white" size={60} />
        </div>
        <div className="flex gap-5 items-center px-3 py-5 flex-wrap justify-center">
          {/* {profileData.links.map(link => link.url.include("facebook")) && <FaFacebook size={60} className="text-white text-3xl" />} */}
          <FaWhatsappSquare size={60} className="text-white text-3xl" />
          <FaInstagramSquare size={60} className="text-white text-3xl" />
          <FaBehance size={60} className="text-white text-3xl" />
          <FaLinkedin size={60} className="text-white text-3xl" />
          <FaYoutube size={60} className="text-white text-3xl" />
        </div>
        <div className="my-5 mx-auto">
          <h4 className="text-white text-center text-3xl font-black">
            Branches
          </h4>
          {profileData?.branches?.map((branch, index) => (
            <div className="mx-auto" key={index}>
              <Button
                onClick={toggleOpen}
                className="w-8/12 py-4 text-xl mt-5 mx-auto block"
              >
                Branch {branch?.name}
              </Button>
              <Collapse open={open}>
                <Card className="my-4 mx-auto w-8/12 p-4">
                  <div className="flex justify-evenly">
                    <div className="flex gap-2 items-center cursor-pointer">
                      <FaLocationDot size={30} color="#053B5C" />
                      <a href={branch?.location} className="text-[#053B5C] text-lg font-semibold">
                        Location
                      </a>
                    </div>
                    <div className="flex gap-2 items-center cursor-pointer">
                      <FaPhoneAlt size={30} color="#053B5C" />
                      <button className="text-[#053B5C] text-lg font-semibold">
                        {branch?.phones[0]}
                      </button>
                    </div>
                  </div>
                </Card>
              </Collapse>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
