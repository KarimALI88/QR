import { FaFilePdf, FaLink } from "react-icons/fa6";
import {
  FaFacebook,
  FaInstagramSquare,
  FaBehance,
  FaYoutube,
  FaWhatsappSquare,
  FaLinkedin,
  FaSnapchatSquare,
  FaTiktok,
  FaGlobe,
} from "react-icons/fa";
import { Collapse, Button, Card } from "@material-tailwind/react";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import altImage from "../../../assets/imgs/loginImage.jpg";
import altLogo from "../../../assets/imgs/tabIcon.jpg";
import { RiTwitterXFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";

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
  other,
  pdfName,
  otherLinkName,
  tiktok,
  portfolio,
}) => {
  const { t } = useTranslation() 
  return (
    <div className="flex justify-center rounded-3xl items-center h-fit mx-auto max-w-[100%] md:fixed md:end-16 md:top-28">
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
          {/* Cover Image */}
          <div className="w-full h-[200px] relative mb-14">
            <img
              src={image ? image : altImage}
              alt="Cover"
              className="h-full w-full object-cover"
            />
            {/* Logo positioned over the Cover */}
            <div className="absolute top-[100%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img
                src={logo ? logo : altLogo}
                alt="Logo"
                className="w-[100px] h-[100px] rounded-full border-4 border-white"
              />
            </div>
          </div>

          {/* Other Sections */}
          {/* name */}
          <h1
            className="text-center p-1 text-xl font-bold uppercase"
            style={{ color }}
          >
            {name || "OFX"}
          </h1>

          {/* description */}
          <p
            className="mx-auto p-1 text-center text-lg font-medium capitalize"
            style={{ color }}
          >
            {description || "marketing agency"}
          </p>

          {!facebook &&
            !instgram &&
            !youtube &&
            !twitter &&
            !whatsapp &&
            !behance &&
            !other &&
            !linkedin &&
            !snapchat && (
              <p>
                <FaFacebook size={40} style={{ color }} />
              </p>
            )}
          {/* social media icons */}
          <div
            className={`flex gap-5 items-start px-3 py-5 ${
              [
                facebook,
                whatsapp,
                instgram,
                behance,
                linkedin,
                youtube,
                other,
              ].filter(Boolean).length === 1
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
                    twitter,
                  ].filter(Boolean).length === 3
                ? "flex-col"
                : "flex-wrap justify-center items-start"
            }`}
          >
            {facebook && <FaFacebook size={40} style={{ color }} />}
            {whatsapp && <FaWhatsappSquare size={40} style={{ color }} />}
            {instgram && <FaInstagramSquare size={40} style={{ color }} />}
            {tiktok && <FaTiktok size={40} style={{ color }} />}
            {behance && <FaBehance size={40} style={{ color }} />}
            {linkedin && <FaLinkedin size={40} style={{ color }} />}
            {youtube && <FaYoutube size={40} style={{ color }} />}
            {snapchat && <FaSnapchatSquare size={40} style={{ color }} />}
            {twitter && <RiTwitterXFill size={40} style={{ color }} />}
            {portfolio && <FaGlobe size={40} style={{ color }} />}
            {other && (
              <div className="flex flex-col gap-1">
                <FaLink size={40} style={{ color }} />
                <p>{otherLinkName || "title"}</p>
              </div>
            )}
          </div>

          {/* phone 1 */}
          <h3
            className="text-lg font-semibold mt-3 text-center flex items-center gap-2"
            style={{ color }}
          >
            <FaPhoneAlt size={25} /> {phone1 ? phone1 : "01234567890"}
          </h3>
          {/* phone 2 */}
          {phone2 && (
            <h3
              className="text-lg font-semibold my-2 text-center flex items-center gap-2"
              style={{ color }}
            >
              <FaPhoneAlt size={25} /> {phone2 ? phone2 : "01234567890"}
            </h3>
          )}
          {/* mp3 */}
          <div className="flex gap-5 items-center px-2 justify-center">
            {mp3 && <audio controls src={mp3} className="w-[200px]" />}
          </div>

          {/* pdf */}
          <div className="flex justify-center items-center flex-wrap gap-3 my-3">
            {/* pdf */}
            {pdf && (
              <div className="flex flex-col">
                <FaFilePdf size={40} style={{ color }} />
                <h5 className="text-lg font-medium my-3">{pdfName}</h5>
              </div>
            )}
            {/* menu */}
            {menuImage && (
              <div className="flex flex-col">
                <FaFilePdf size={40} style={{ color }} />
                <h5 className="text-lg font-medium my-3">Menu</h5>
              </div>
            )}
          </div>
          {/* branches */}
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
        </div>
      </div>
    </div>
  );
};

export default PhoneAnimation;
