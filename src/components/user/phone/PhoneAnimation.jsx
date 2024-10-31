import { FaFilePdf } from "react-icons/fa6";
import {
  FaFacebook,
  FaInstagramSquare,
  FaBehance,
  FaYoutube,
  FaWhatsappSquare,
  FaLinkedin,
} from "react-icons/fa";
import {
  Collapse,
  Button,
  Card,
} from "@material-tailwind/react";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

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
  branches
}) => {
  return (
    <div className="flex justify-center rounded-3xl items-center h-fit mx-auto max-w-[100%]">
      <div className="w-80 h-[550px] bg-white rounded-3xl shadow-lg border-8 border-black relative ">
        {/* Background with Blur Overlay */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center "
          style={{
            backgroundImage: `url(${image})`,
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
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-start overflow-auto" style={{ color }}>
          <div className="w-full h-[200px] relative mb-14">
            {/* Cover Image */}
            <img src={image} alt="Cover" className="h-full w-full object-cover" />
            {/* Logo positioned over the Cover */}
            <div className="absolute top-[100%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img
                src={logo}
                alt="Logo"
                className="w-[100px] h-[100px] rounded-full border-4 border-white"
              />
            </div>
          </div>

          {/* Other Sections */}
          <h1 className="text-center p-1 text-xl font-bold uppercase" style={{ color }}>
            {name || "OFX"}
          </h1>
          <p className="mx-auto p-1 text-center text-lg font-medium capitalize" style={{ color }}>
            {description || "marketing agency"}
          </p>
          <h3 className="text-lg font-semibold my-3 text-center" style={{ color }}>
            {phone1} - {phone2}
          </h3>
          <div className="flex gap-5 items-center px-2 justify-center">
            {mp3 && <audio controls src={mp3} className="w-[200px]" />}
            {pdf && <FaFilePdf size={40} style={{ color }} />}
          </div>
          <div className={`flex gap-5 items-center px-3 py-5 ${
            [facebook, whatsapp, instgram, behance, linkedin, youtube].filter(Boolean).length === 1
              ? "justify-center"
              : [facebook, whatsapp, instgram, behance, linkedin, youtube].filter(Boolean).length === 3
              ? "flex-col"
              : "flex-wrap justify-center"
          }`}>
            {facebook && <FaFacebook size={40} style={{ color }} />}
            {whatsapp && <FaWhatsappSquare size={40} style={{ color }} />}
            {instgram && <FaInstagramSquare size={40} style={{ color }} />}
            {behance && <FaBehance size={40} style={{ color }} />}
            {linkedin && <FaLinkedin size={40} style={{ color }} />}
            {youtube && <FaYoutube size={40} style={{ color }} />}
          </div>

          {branches.map((branch, index) => (
            <div key={index}>
              <Button className="w-full py-4 text-xl mt-5 mx-auto block" style={{ color }}>
                {branch.name ? branch.name : "Branch"}
              </Button>
              <Collapse open={true}>
                <Card className="my-4 mx-auto w-full p-4" style={{ color }}>
                  <div className="flex justify-start flex-wrap gap-3">
                    <div className="flex gap-2 items-center cursor-pointer text-black" style={{color:"black"}}>
                      <FaLocationDot size={30} style={{color:"black"}} />
                      <button className="text-lg font-semibold" style={{color:"black"}}>
                        Location
                      </button>
                    </div>
                    <div className="flex gap-2 items-center cursor-pointer">
                      <FaPhoneAlt size={30} style={{color:"black"}}/>
                      <button className="text-lg font-semibold" style={{color:"black"}}>
                        {branch.number}
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
