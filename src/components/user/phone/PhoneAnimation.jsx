import { FaFilePdf } from "react-icons/fa6";
import {
  FaFacebook,
  FaInstagramSquare,
  FaBehance,
  FaYoutube,
  FaWhatsappSquare,
  FaLinkedin,
} from "react-icons/fa";

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
  selectedFont
}) => {
  // console.log(color)
  return (
    <div className="flex justify-center rounded-3xl items-center h-fit  mx-auto max-w-[100%] ">
      <div className="w-80 h-[550px] bg-white rounded-3xl shadow-lg border-8 border-black   relative">
        {/* Content Area */}
        <div
          className={`flex flex-col items-center justify-start h-full overflow-auto`}
          style={{ backgroundColor: color, fontFamily: selectedFont }}
        >
          <div className="w-[100%] h-[200px] relative mb-14">
            <img src={image} alt="" className="h-[100%] w-[100%]" />
            <div className="absolute top-32 left-[35%] mb-16">
              <img
                src={logo}
                alt=""
                className="mx-auto my-3 w-[100px] h-[100px] rounded-full border-4 border-white"
              />
            </div>
          </div>
          <div>
            <h1 className="text-center p-1 text-white text-xl font-bold uppercase">
              {name}
            </h1>
            <p className="mx-auto p-1 text-center text-gray-500 text-lg font-medium capitalize">
              {description}
            </p>
            <div>
              <h3 className="text-white text-lg font-semibold my-3 text-center">
                {phone1} - {phone2}
              </h3>
            </div>
            <div className="flex gap-5 items-center px-2 justify-center">
              {mp3 && <audio controls src={mp3} className="w-[80%]" />}
              {pdf && <FaFilePdf color="white" size={40} />}
            </div>
            <div
              className={`flex gap-5 items-center px-3 py-5 ${
                [
                  facebook,
                  whatsapp,
                  instgram,
                  behance,
                  linkedin,
                  youtube,
                ].filter(Boolean).length === 1
                  ? "justify-center"
                  : [
                      facebook,
                      whatsapp,
                      instgram,
                      behance,
                      linkedin,
                      youtube,
                    ].filter(Boolean).length === 3
                  ? "flex-col"
                  : "flex-wrap justify-center"
              }`}
            >
              {facebook && (
                <FaFacebook size={40} className="text-white text-3xl" />
              )}
              {whatsapp && (
                <FaWhatsappSquare size={40} className="text-white text-3xl" />
              )}
              {instgram && (
                <FaInstagramSquare size={40} className="text-white text-3xl" />
              )}
              {behance && (
                <FaBehance size={40} className="text-white text-3xl" />
              )}
              {linkedin && (
                <FaLinkedin size={40} className="text-white text-3xl" />
              )}
              {youtube && (
                <FaYoutube size={40} className="text-white text-3xl" />
              )}
            </div>
          </div>
        </div>
        {/* data */}
      </div>
    </div>
  );
};

export default PhoneAnimation;
