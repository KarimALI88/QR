import { FaFilePdf } from "react-icons/fa6";
import {
  FaFacebook,
  FaInstagramSquare,
  FaBehance,
  FaYoutube,
  FaWhatsappSquare,
  FaLinkedin,
  FaSnapchatSquare,
  FaTiktok,
} from "react-icons/fa";
import { FaLocationDot, FaLink } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { Collapse, Button, Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { RiTwitterXFill } from "react-icons/ri";
import AOS from "aos";
import "aos/dist/aos.css";

const currentYear = new Date().getFullYear();


const Profile = () => {
  const [openBranches, setOpenBranches] = useState([]);
  const { id } = useParams();
  const [profileData, setProfileData] = useState({});

  // console.log("today", formattedDate)
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  // const toggleOpen = () => setOpen((cur) => !cur);

  const toggleOpen = (index) => {
    setOpenBranches((prevOpen) => {
      const newOpen = [...prevOpen];
      newOpen[index] = !newOpen[index];
      return newOpen;
    });
  };

  const getProfile = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_LINK}/profile/qrcode/${id}`
      );
      setProfileData(response.data);
      console.log("profile", response.data);
    } catch (error) {
      console.log("error in api profile", error);
    }
  };

  const getIp = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_LINK}/scan_qrcode/${id}`
      );
      console.log(response);
    } catch (error) {
      console.error("error in api", error);
    }
  };

  useEffect(() => {
    getIp();
  }, [id]);

  useEffect(() => {
    getProfile();
  }, [id]);

  return (
    <>
      {/* {profileData?.cover ? ( */}
      <div
        className="relative flex flex-col items-center justify-start min-h-[100vh] overflow-auto"
        style={{
          color: profileData?.backgraound_color,
          fontFamily: profileData?.font,
        }}
      >
        {/* Background with Blur Overlay */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(https://backend.ofx-qrcode.com/storage/${profileData?.cover})`,
            filter: "blur(20px)",
            backgroundSize: "100% 100%",
            zIndex: 0,
            border: "2px solid white",
          }}
        />
        {/* Transparent Overlay */}
        <div
          className="absolute inset-0 w-full h-full bg-black opacity-50"
          style={{ zIndex: 1 }}
        />

        {/* Main Content */}
        <div
          className="relative z-10 flex flex-col items-center justify-start w-full h-full "
          data-aos="fade-up"
          // style={{ backgroundColor: profileData?.background_color }}
        >
          <div className="w-full h-[170px] lg:h-[270px] relative mb-14 ">
            <img
              src={`https://backend.ofx-qrcode.com/storage/${profileData?.cover}`}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute top-[95%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
              <img
                src={`https://backend.ofx-qrcode.com/storage/${profileData?.logo}`}
                alt="logo"
                className="w-[160px] h-[160px] rounded-full border-4 border-white"
              />
            </div>
          </div>

          <div
            className="my-16 "
            style={{ color: profileData?.background_color }}
          >
            <h1
              className="text-center text-4xl p-1 font-black uppercase"
              style={{ color: profileData?.background_color }}
              data-aos="fade-up"
            >
              {profileData?.title}
            </h1>

            <div className="flex flex-col items-center my-5 max-w-[80%] mx-auto">
              <p className="text-center text-3xl  font-medium capitalize">
                {profileData?.description}
              </p>
            </div>

            <div
              className="flex gap-5 items-start px-3 py-5 flex-wrap justify-center"
              style={{ color: profileData?.background_color }}
              data-aos="fade-up"
            >
              {profileData?.links?.find((link) => link.type === "whatsapp") && (
                <a
                  href={
                    profileData.links.find((link) => link.type === "whatsapp")
                      .url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsappSquare size={60} className="" />
                </a>
              )}

              {profileData?.links?.find((link) => link.type === "instgram") && (
                <a
                  href={
                    profileData.links.find((link) => link.type === "instgram")
                      .url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagramSquare size={60} className="" />
                </a>
              )}

              {profileData?.links?.find((link) =>
                link?.type.includes("other")
              ) && (
                <a
                  href={
                    profileData?.links?.find((link) =>
                      link?.type.includes("other")
                    ).url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-lg text-center"
                >
                  <FaLink size={60} className="" />
                  {profileData?.links
                    ?.find((link) => link?.type.includes("other"))
                    .type.slice(5)}
                </a>
              )}

              {profileData?.links?.find((link) => link.type === "behance") && (
                <a
                  href={
                    profileData.links.find((link) => link.type === "behance")
                      .url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaBehance size={60} className="" />
                </a>
              )}

              {profileData?.links?.find((link) => link.type === "linkedin") && (
                <a
                  href={
                    profileData.links.find((link) => link.type === "linkedin")
                      .url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin size={60} className="" />
                </a>
              )}

              {profileData?.links?.find((link) => link.type === "youtube") && (
                <a
                  href={
                    profileData.links.find((link) => link.type === "youtube")
                      .url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube size={60} className="" />
                </a>
              )}

              {profileData?.links?.find((link) => link.type === "facebook") && (
                <a
                  href={
                    profileData.links.find((link) => link.type === "facebook")
                      .url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook size={60} className="" />
                </a>
              )}

              {profileData?.links?.find((link) => link.type === "tiktok") && (
                <a
                  href={
                    profileData.links.find((link) => link.type === "tiktok").url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTiktok size={60} className="" />
                </a>
              )}

              {profileData?.links?.find((link) => link.type === "twitter") && (
                <a
                  href={
                    profileData.links.find((link) => link.type === "twitter")
                      .url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <RiTwitterXFill size={60} className="" />
                </a>
              )}

              {profileData?.links?.find((link) => link.type === "snapchat") && (
                <a
                  href={
                    profileData.links.find((link) => link.type === "snapchat")
                      .url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaSnapchatSquare size={60} className="" />
                </a>
              )}

              {profileData?.links?.find(
                (link) => link.type === "portfolio"
              ) && (
                <a
                  href={
                    profileData.links.find((link) => link.type === "portfolio")
                      .url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGlobe size={60} className="" />
                </a>
              )}
            </div>

            {profileData?.phones && (
              <div className="flex gap-5 items-center justify-center">
                <h3 className="text-3xl font-semibold my-5 text-center">
                  <div className="flex gap-10 justify-center items-center flex-wrap">
                    {profileData?.phones?.map((phone, index) => (
                      <div key={index} className="flex items-center gap-5">
                        <FaPhoneAlt size={40} />
                        <a href={`tel:${phone}`} className="">
                          {phone}
                        </a>
                        <br />
                      </div>
                    ))}
                  </div>
                </h3>
              </div>
            )}

            <div
              className="flex flex-wrap justify-center items-start"
              data-aos="fade-up"
            >
              {profileData?.pdfs &&
                profileData?.pdfs.map((pdf, index) => (
                  <div
                    key={index}
                    className="flex gap-5 items-center px-2 my-5 justify-center"
                  >
                    <div>
                      <a
                        href={`https://backend.ofx-qrcode.com/storage/${pdf.pdf_path}`}
                      >
                        <FaFilePdf size={60} />
                      </a>
                      <p className="text-lg font-semibold">{pdf.type}</p>
                    </div>
                  </div>
                ))}
            </div>

            {profileData?.records &&
              profileData?.records?.map((record, index) => (
                <div className="mx-auto my-10">
                  <audio
                    className="mx-auto block"
                    key={index}
                    src={`https://backend.ofx-qrcode.com/storage/${record.mp3_path}`}
                    controls
                  />
                </div>
              ))}

            {profileData?.branches &&
              profileData?.branches?.some(
                (branch) => branch.name.length > 0
              ) && (
                <div className="my-5 mx-auto " data-aos="fade-up">
                  <h4 className="text-center text-3xl font-black">Branches</h4>
                  <div className="flex justify-center gap-10 items-center flex-wrap">
                    {profileData?.branches?.map((branch, index) => (
                      <div className="mx-auto" key={index}>
                        <Button
                          onClick={() => toggleOpen(index)}
                          className="min-w-[200px] max-w-[250px] py-4 text-xl mt-5 mx-auto block h-fit"
                        >
                          {branch?.name}
                        </Button>
                        <Collapse open={openBranches[index]}>
                          {(branch.phones || branch.location) && (
                            <Card className="my-4 mx-auto w-8/12 p-4">
                              <div className="flex flex-wrap gap-5">
                                {branch.location && (
                                  <div className="flex gap-2 items-center cursor-pointer">
                                    <FaLocationDot size={30} color="#053B5C" />
                                    <a
                                      href={branch?.location}
                                      className="text-[#053B5C] text-lg font-semibold"
                                    >
                                      Location
                                    </a>
                                  </div>
                                )}

                                {branch.phones > 0 && (
                                  <div className="flex gap-2 items-center cursor-pointer">
                                    <FaPhoneAlt size={30} color="#053B5C" />
                                    <a href={`tel:${branch?.phones[0]}`}>
                                      <button className="text-[#053B5C] text-lg font-semibold">
                                        {branch?.phones[0]}
                                      </button>
                                    </a>
                                  </div>
                                )}
                              </div>
                            </Card>
                          )}
                        </Collapse>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* copy rights */}
          <div data-aos="fade-up">
            <Typography
              variant="small"
              className="mb-4 text-center text-white md:mb-0 font-medium text-xl"
            >
              &copy; {currentYear} OFX-QRCODE All Rights Reserved.
            </Typography>
          </div>
        </div>
      </div>
      {/* // ) : (
      //   <div className="my-32 mx-auto">
      //     <p className="text-center font-black my-20 mx-auto text-5xl text-gray-800">
      //       404 || Not Found
      //     </p>
      //   </div>
      // )} */}
    </>
  );
};

export default Profile;
