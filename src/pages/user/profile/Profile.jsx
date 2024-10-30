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
import {
  Collapse,
  Button,
  Card,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import { useState } from "react";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((cur) => !cur);


  
  return (
    <div
      className="flex flex-col items-center justify-start h-full overflow-auto"
      style={{ backgroundColor: "#053B5C" }}
    >
      <div className="w-[100%] h-[400px] relative mb-14">
        <img
          src={
            "https://scontent.fcai21-3.fna.fbcdn.net/v/t39.30808-6/464195703_122093879780593961_5587514318428451731_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFztKNupb9DbGjEIQIlDRlIolqylHxk7dGiWrKUfGTt0Xmjgef5LMLifdzb_HuyWeWMlLfS9qLAaaoUAVGWKIs0&_nc_ohc=1mgNl8G7qtAQ7kNvgGT5Ewv&_nc_zt=23&_nc_ht=scontent.fcai21-3.fna&_nc_gid=AdkBxlX4zVPeqmrmMBeOhY9&oh=00_AYB0nbsktabMzcPU2q0pOJ2McC5w4SeDJ3zoN-jxb9m_wQ&oe=67268795"
          }
          alt=""
          className="h-[100%] w-[100%] object-cover"
        />
        <div className="absolute top-[95%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
          <img
            src={
              "https://scontent.fcai21-3.fna.fbcdn.net/v/t39.30808-1/464223952_122093874182593961_6197794060995444811_n.jpg?stp=dst-jpg_s200x200&_nc_cat=105&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeG2CLU5-xGftT2SN5kFmQLRzIBXA4q4epXMgFcDirh6lVfL4fTnNK5kgJHJvm1DG0MeJBIwg79S-jk5g6Amj2bn&_nc_ohc=FaoMg4HjkMsQ7kNvgHJ3719&_nc_zt=24&_nc_ht=scontent.fcai21-3.fna&_nc_gid=AkAZVczMGgnR0kfIMxQ4OMp&oh=00_AYCD1upCKXuXmIlO_KRgCgDWy3iu7bbCB_HAwfv51Kdt5Q&oe=67269705"
            }
            alt=""
            className="mx-auto my-3 w-[200px] h-[200px] rounded-full border-4 border-white"
          />
        </div>
      </div>
      <div className="my-16">
        {" "}
        {/* Add margin to create space between the logo and text */}
        <h1 className="text-center text-4xl p-1 text-white font-black uppercase">
          ofx
        </h1>
        <div className="flex flex-col items-center my-5">
          <p className="mx-auto p-1 text-3xl text-center text-gray-500 font-medium capitalize">
            Marketing Agency, graphic design and web development
          </p>
        </div>
        <div className="flex gap-5 items-center justify-center">
          <FaPhoneAlt size={40} color="white" />
          <h3 className="text-white text-3xl font-semibold my-5 text-center">
            0161472185 - 0110942108
          </h3>
        </div>
        <div className="flex gap-5 items-center px-2 my-5 justify-center">
          {/* <audio controls src={mp3} className="w-[80%]" /> */}
          <FaFilePdf color="white" size={60} />
        </div>
        <div className="flex gap-5 items-center px-3 py-5 flex-wrap justify-center">
          <FaFacebook size={60} className="text-white text-3xl" />
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
          <div className="mx-auto">
            <Button onClick={toggleOpen} className="w-8/12 py-4 text-xl mt-5 mx-auto block">
              Branche MiddleTown
            </Button>
            <Collapse open={open}>
              <Card className="my-4 mx-auto w-8/12 p-4">
                <div className="flex justify-evenly">
                  <div className="flex gap-2 items-center cursor-pointer">
                    <FaLocationDot size={30} color="#053B5C"/>
                    <button className="text-[#053B5C] text-lg font-semibold">Location</button>
                  </div>
                  <div className="flex gap-2 items-center cursor-pointer">
                    <FaPhoneAlt size={30} color="#053B5C"/>
                    <button className="text-[#053B5C] text-lg font-semibold">01061472185</button>
                  </div>
                </div>
              </Card>
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
