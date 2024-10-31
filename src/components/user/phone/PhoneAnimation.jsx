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
  color,
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
      <div className="w-80 h-[550px] bg-white rounded-3xl shadow-lg border-8 border-black relative">
        {/* Content Area */}
        <div
          className="flex flex-col items-center justify-start h-full overflow-auto"
          style={{ backgroundColor: color, fontFamily: selectedFont }}
        >
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
          <h1 className="text-center p-1 text-white text-xl font-bold uppercase">
            {name ? name : "OFX"}
          </h1>
          <p className="mx-auto p-1 text-center text-gray-500 text-lg font-medium capitalize">
            {description ? description : "marketing agency"}
          </p>
          <h3 className="text-white text-lg font-semibold my-3 text-center">
            {phone1} - {phone2}
          </h3>
          <div className="flex gap-5 items-center px-2 justify-center">
            {mp3 && <audio controls src={mp3} className="w-[200px]" />}
            {pdf && <FaFilePdf color="white" size={40} />}
          </div>
          <div className={`flex gap-5 items-center px-3 py-5 ${
            [facebook, whatsapp, instgram, behance, linkedin, youtube].filter(Boolean).length === 1
              ? "justify-center"
              : [facebook, whatsapp, instgram, behance, linkedin, youtube].filter(Boolean).length === 3
              ? "flex-col"
              : "flex-wrap justify-center"
          }`}>
            {facebook && <FaFacebook size={40} className="text-white text-3xl" />}
            {whatsapp && <FaWhatsappSquare size={40} className="text-white text-3xl" />}
            {instgram && <FaInstagramSquare size={40} className="text-white text-3xl" />}
            {behance && <FaBehance size={40} className="text-white text-3xl" />}
            {linkedin && <FaLinkedin size={40} className="text-white text-3xl" />}
            {youtube && <FaYoutube size={40} className="text-white text-3xl" />}
          </div>
          {branches.map((branch, index) => (
            <div key={index}>
              <Button className="w-full py-4 text-xl mt-5 mx-auto block">
                Branch {branch.name}
              </Button>
              <Collapse open={true}>
                <Card className="my-4 mx-auto w-full p-4">
                  <div className="flex justify-start flex-wrap gap-3">
                    <div className="flex gap-2 items-center cursor-pointer">
                      <FaLocationDot size={30} color="#053B5C" />
                      <button className="text-[#053B5C] text-lg font-semibold">
                        Location
                      </button>
                    </div>
                    <div className="flex gap-2 items-center cursor-pointer">
                      <FaPhoneAlt size={30} color="#053B5C" />
                      <button className="text-[#053B5C] text-lg font-semibold">
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
