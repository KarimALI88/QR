import { FaFilePdf, FaLink } from "react-icons/fa6";
import {
  FaFacebook,
  FaInstagramSquare,
  FaBehance,
  FaYoutube,
  FaWhatsappSquare,
  FaLinkedin,
  FaSnapchatSquare
} from "react-icons/fa";
import { Collapse, Button, Card } from "@material-tailwind/react";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import altImage from "../../../assets/imgs/loginImage.jpg";
import altLogo from "../../../assets/imgs/QR-LOGO2.png";
import { RiTwitterXFill } from "react-icons/ri";
const PhoneAnimation = ({
  image,
  logo,
  name,
  description,
  color = "#ffffff", // default to white
  phone1,
  phone2,
  mp3,
  pdf,
  facebook,
  instgram,
  linkedin,
  whatsapp,
  youtube,
  behance,
  selectedFont,
  branches,
  menuImage,
  snapchat,
  twitter,
  other
}) => {
  return (
    <div className="flex justify-center rounded-3xl items-center h-fit mx-auto max-w-[100%] fixed right-16 top-28">
      <div
        className="w-80 h-[500px] bg-white rounded-3xl shadow-lg border-8 border-black relative "
        style={{ fontFamily: selectedFont }}
      >
        {/* Background with Blur Overlay */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center "
          style={{
            backgroundImage: `${image ? `url(${image})` : `url(${altImage})`}`,
            // backgroundAttachment: "fixed",
            fontFamily: selectedFont,
            backgroundSize: "100% 100%",
            filter: "blur(8px)",
            zIndex: 0,
          }}
        />
        {/* Transparent Overlay */}
        <div
          className="absolute inset-0 w-full h-full "
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div
          className="relative z-10 w-full h-full flex flex-col items-center justify-start overflow-auto"
          style={{ color }}
        >
          <div className="w-full h-[200px] relative mb-14">
            {/* Cover Image */}
            <img
              src={image ? image : altImage}
              alt="Cover"
              className="h-full w-full object-cover"
            />
            {/* Logo positioned over the Cover */}
            <div className="absolute top-[100%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img
                src={
                  logo
                    ? logo
                    : "https://scontent.fcai21-3.fna.fbcdn.net/v/t39.30808-6/464223952_122093874182593961_6197794060995444811_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=FV0rV3hzYVwQ7kNvgEney8-&_nc_zt=23&_nc_ht=scontent.fcai21-3.fna&_nc_gid=Arok7p8JOhA0FKq8tGMNhuT&oh=00_AYBZnfa_mDdM1OGxyyo_XQz6xMGfBTbjmikybHamjunUZg&oe=672E6622"
                }
                alt="Logo"
                className="w-[100px] h-[100px] rounded-full border-4 border-white"
              />
            </div>
          </div>

          {/* Other Sections */}
          <h1
            className="text-center p-1 text-xl font-bold uppercase"
            style={{ color }}
          >
            {name || "OFX"}
          </h1>
          <p
            className="mx-auto p-1 text-center text-lg font-medium capitalize"
            style={{ color }}
          >
            {description || "marketing agency"}
          </p>
          <div
            className={`flex gap-5 items-center px-3 py-5 ${
              [facebook, whatsapp, instgram, behance, linkedin, youtube,other].filter(
                Boolean
              ).length === 1
                ? "justify-center"
                : [
                    facebook,
                    whatsapp,
                    instgram,
                    behance,
                    linkedin,
                    youtube,
                    other,
                    snapchat,
                    twitter
                  ].filter(Boolean).length === 3
                ? "flex-col"
                : "flex-wrap justify-center"
            }`}
          >
            {facebook && <FaFacebook size={40} style={{ color }} />}
            {whatsapp && <FaWhatsappSquare size={40} style={{ color }} />}
            {instgram && <FaInstagramSquare size={40} style={{ color }} />}
            {behance && <FaBehance size={40} style={{ color }} />}
            {linkedin && <FaLinkedin size={40} style={{ color }} />}
            {youtube && <FaYoutube size={40} style={{ color }} />}
            {other && <FaLink size={40} style={{ color }} />}
            {snapchat && <FaSnapchatSquare size={40} style={{ color }} />}
            {twitter && <RiTwitterXFill size={40} style={{ color }} />}

          </div>
          <h3
            className="text-lg font-semibold mt-3 text-center"
            style={{ color }}
          >
            {phone1 ? phone1 : "01061472185"}
          </h3>
          <h3
            className="text-lg font-semibold my-2 text-center"
            style={{ color }}
          >
            {phone2 ? phone2 : "01100942108"}
          </h3>
          <div className="flex gap-5 items-center px-2 justify-center">
            {mp3 && <audio controls src={mp3} className="w-[200px]" />}
            {pdf && <FaFilePdf size={40} style={{ color }} />}
          </div>

          {branches.map((branch, index) => (
            <div key={index}>
              <Button
                className="w-3/4 py-4 text-xl mt-5 mx-auto block"
                style={{ color }}
              >
                {branch.name ? branch.name : "Cairo"}
              </Button>
              <Collapse open={true}>
                <Card className="my-4 mx-auto w-3/4 p-4" style={{ color }}>
                  <div className="flex justify-start flex-wrap gap-3">
                    <div
                      className="flex gap-2 items-center cursor-pointer text-black"
                      style={{ color: "black" }}
                    >
                      <FaLocationDot size={30} style={{ color: "black" }} />
                      <button
                        className="text-lg font-semibold"
                        style={{ color: "black" }}
                      >
                        Location
                      </button>
                    </div>
                    <div className="flex gap-2 items-center cursor-pointer flex-wrap">
                      <FaPhoneAlt size={30} style={{ color: "black" }} />
                      <button
                        className="text-lg font-semibold"
                        style={{ color: "black" }}
                      >
                        {branch.phones}
                      </button>
                    </div>
                  </div>
                </Card>
              </Collapse>
            </div>
          ))}

          {/* menu */}
          <div className="w-3/4 my-5">
            <img src={menuImage ? menuImage : altImage} alt="menu" className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneAnimation;
