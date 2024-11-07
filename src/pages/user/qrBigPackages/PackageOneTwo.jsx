import React, { useCallback, useState, useEffect, useContext } from "react";
import MainNavbar from "../../../components/user/navbar/MainNavbar";
import { Input, Typography } from "@material-tailwind/react";
import PhoneAnimation from "../../../components/user/phone/PhoneAnimation";
import { useDropzone } from "react-dropzone";
import {
  FaFacebook,
  FaInstagramSquare,
  FaBehance,
  FaYoutube,
  FaWhatsappSquare,
  FaLinkedin,
  FaLaptopCode,
  FaPlus,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Spinner } from "@material-tailwind/react";
import axios from "axios";
import { Select, Option } from "@material-tailwind/react";
import { Dialog } from "@material-tailwind/react";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import { RiTwitterXFill } from "react-icons/ri";
import { FaSnapchatSquare } from "react-icons/fa";
import { AppContext } from "../../../context/AppContext";

const PackageOneTwo = ({ user }) => {
  const [image, setImage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const [logoImageFile, setLogoImageFile] = useState(null);
  const [mp3, setMp3] = useState(null);
  const [mp3File, setMp3File] = useState(null);
  const [menuImage, setMenuImage] = useState(null);
  const [menuImageFile, setMenuImageFile] = useState(null);
  const [pdf, setPDF] = useState(null);
  const [pdfName, setPdfName] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [activeInputs, setActiveInputs] = useState({
    facebook: true,
    instgram: false,
    linkedin: false,
    youtube: false,
    be: false,
    whatsapp: false,
    portfolio: false,
    tiktok: false,
    snapchat: false,
    twitter: false,
    other: false,
  });
  const [token, setToken] = useState("");
  const { packageId } = useContext(AppContext);
  const [facebookLink, setFacebookLink] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [instgramLink, setInstgramLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [snapchatLink, setSnapchatLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [otherLink, setOtherLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [beLink, setBeLink] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [loading, setLoading] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Roboto");
  const [branches, setBranches] = useState([
    { name: "", location: "", phones: "" }, // Initial branch
  ]);
  const fonts = [
    { name: "Roboto", style: "Roboto, sans-serif" },
    { name: "Noto Sans", style: "Noto Sans, sans-serif" },
    { name: "Lalezar", style: "Lalezar, cursive" },
    { name: "Cairo", style: "Cairo, sans-serif" },
    { name: "Amiri", style: "Amiri, serif" },
    { name: "Tajawal", style: "Tajawal, sans-serif" },
    { name: "Changa", style: "Changa, sans-serif" },
    { name: "El Messiri", style: "El Messiri, sans-serif" },
    { name: "Almarai", style: "Almarai, sans-serif" },
    { name: "IBM Plex Sans", style: "IBM Plex Sans, sans-serif" },
  ];
  const navigate = useNavigate();
  const [downloadImage, setDownloadImage] = useState("");

  const handleOpen = () => setOpenModal(!openModal);
  const addBranch = () => {
    setBranches([...branches, { name: "", location: "", phones: "" }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedBranches = [...branches];
    updatedBranches[index][field] = value;
    setBranches(updatedBranches);
  };

  // console.log("package",packageId)

  useEffect(() => {
    const tn = localStorage.getItem("tn");
    setToken(tn);
  }, []);

  // Handle drop for cover image
  const onDropCover = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setCoverImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }, []);

  // Handle drop for pdf
  const onDropPDF = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setPdfFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPDF(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }, []);

  // Handle drop for logo image
  const onDropLogo = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setLogoImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }, []);

  // handle center image
  const onDropCenterImage = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setMenuImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setMenuImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }, []);

  // Handle drop for MP3
  const onDropMP3 = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setMp3File(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setMp3(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps: getRootPropsCover, getInputProps: getInputPropsCover } =
    useDropzone({
      onDrop: onDropCover,
      accept: "image/*",
    });

  const { getRootProps: getRootPropsLogo, getInputProps: getInputPropsLogo } =
    useDropzone({
      onDrop: onDropLogo,
      accept: "image/*",
    });

  const { getRootProps: getRootPropsMP3, getInputProps: getInputPropsMP3 } =
    useDropzone({
      onDrop: onDropMP3,
      accept: "audio/mp3",
    });

  const { getRootProps: getRootPropsImage, getInputProps: getInputPropsImage } =
    useDropzone({
      onDrop: onDropCenterImage,
      accept: {
        "application/pdf": [".pdf"], // Accepts PDF files
      },
    });

  const { getRootProps: getRootPropsPDF, getInputProps: getInputPropsPDF } =
    useDropzone({
      onDrop: onDropPDF,
      accept: {
        "application/pdf": [".pdf"], // Accepts PDF files
      },
    });

  // console.log("pdf", pdfFile);

  const getQr = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      console.log("form data before send", formData);
      coverImageFile && formData.append("cover", coverImageFile);
      logoImageFile && formData.append("logo", logoImageFile);
      mp3File && formData.append("mp3[]", mp3File);
      pdfFile && formData.append("pdfs[]", pdfFile);
      pdfName && formData.append("type[]", pdfName);
      menuImageFile && formData.append("pdfs[]", menuImageFile);
      menuImageFile && formData.append("type[]", "menue");
      name && formData.append("title", name);
      description && formData.append("description", description);
      formData.append("color", color);
      formData.append("font", selectedFont);
      formData.append("package_id", "3");

      // Append phones individually
      phone1 && formData.append("phones[]", phone1);
      phone2 && formData.append("phones[]", phone2);

      // links
      if (facebookLink.length > 0) {
        formData.append("links[0][url]", facebookLink);
        formData.append("links[0][type]", "facebook");
      }

      if (instgramLink.length > 0) {
        formData.append("links[1][url]", instgramLink);
        formData.append("links[1][type]", "instgram");
      }

      if (youtubeLink.length > 0) {
        formData.append("links[2][url]", youtubeLink);
        formData.append("links[2][type]", "youtube");
      }

      if (beLink.length > 0) {
        formData.append("links[3][url]", beLink);
        formData.append("links[3][type]", "behance");
      }

      if (otherLink.length > 0) {
        formData.append("links[4][url]", otherLink);
        formData.append("links[4][type]", "other");
      }

      if (portfolioLink.length > 0) {
        formData.append("links[5][url]", portfolioLink)
          formData.append("links[5][type]", "portfolio");
      }

      if(whatsappLink.length > 0){
        formData.append("links[6][url]", `https://wa.me/${whatsappLink}`)
        formData.append("links[6][type]", "whatsapp");
      }

      if(linkedinLink.length > 0 ){
        formData.append("links[7][url]", linkedinLink)
        formData.append("links[7][type]", "linkedin")
      }

      if(snapchatLink.length > 0){
        formData.append("links[8][url]", snapchatLink) 
        formData.append("links[8][type]", "snapchat")
      }

      if(twitterLink.length > 0){
        formData.append("links[9][url]", twitterLink)
        formData.append("links[9][type]", "twitter");
      }

      // Append each branch's details

      if (branches.length >= 1) {
        branches.forEach((branch, index) => {
          if (
            branch.name &&
            branch.location &&
            branch.phones.length > 0 &&
            branch.phones[0]
          ) {
            formData.append(`branches[${index}][name]`, branch.name);
            formData.append(`branches[${index}][location]`, branch.location);
            formData.append(`branches[${index}][phones][0]`, branch.phones);
          }
        });
      }

      console.log("form data after send", formData);

      const response = await axios({
        method: "post",
        data: formData,
        url: "https://backend.ofx-qrcode.com/api/qrcode/smart",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("request finished");
      console.log("response qr", response);
      setLoading(false);
      setOpenModal(true);
      setImage(
        `https://backend.ofx-qrcode.com/storage/${response.data.qr_code}`
      );
      setDownloadImage(response.data.qr_code.split("/")[1]);
      return response;
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  console.log("user", user);

  return (
    <div
      style={{
        background:
          "linear-gradient(152deg, rgba(255,255,255,0.9) 0%, rgba(5,59,92,0.8) 100%)",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        position: "fixed",
        width: "100%",
        height: "100vh",
        overflowY: "auto", // Allows content to scroll within the fixed background
      }}
    >
      <MainNavbar />
      <div className="p-10 h-fit ">
        <div className="flex flex-col sm:flex-col md:flex-row space-y-5 sm:space-y-0 sm:space-x-5">
          <div className="flex-1 shadow-none sm:w-[300px] md:[200px] order-1 sm:order-2">
            <PhoneAnimation
              image={coverImage}
              logo={logoImage}
              name={name}
              description={description}
              color={color}
              phone1={phone1}
              phone2={phone2}
              mp3={mp3}
              pdf={pdf}
              facebook={facebookLink}
              instgram={instgramLink}
              behance={beLink}
              linkedin={linkedinLink}
              whatsapp={whatsappLink}
              youtube={youtubeLink}
              twitter={twitterLink}
              snapchat={snapchatLink}
              selectedFont={selectedFont}
              branches={branches}
              menuImage={menuImage}
              other={otherLink}
              pdfName={pdfName}
            />
          </div>
          {/* ======================================== */}
          <div className="flex-1 my-10 order-2 sm:order-1">
            <h1 className="text-mainColor text-2xl font-black flex gap-4 items-center flex-wrap">
              <span className="text-white flex justify-center items-center w-10 h-10 text-center rounded-full bg-mainColor">
                1
              </span>{" "}
              Company Info
            </h1>
            <br />

            <div className="flex flex-wrap gap-5">
              {/* color  */}
              <div className="w-[300px]  ">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-1 mt-10 font-semibold text-lg"
                >
                  Identity Color
                </Typography>
                <Input
                  maxLength={16}
                  placeholder="OFX"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="appearance-none min-h-[60px] !border-t-blue-gray-200 placeholder:text-black placeholder:opacity-100 focus:!border-t-gray-900"
                />
              </div>
              {/* cover background */}
              <div className="w-[300px]">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-1 mt-10 font-semibold text-lg"
                >
                  Cover Background
                </Typography>
                <div
                  {...getRootPropsCover()}
                  className="border border-dashed border-gray-400 p-4 rounded-lg text-center"
                >
                  <input {...getInputPropsCover()} />
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt="Cover Preview"
                      className="w-[100px] h-[100px] mt-4 rounded-lg"
                    />
                  ) : (
                    <p>Drag & drop an image here, or click to select one</p>
                  )}
                </div>
                {/* <Input type="file" onChange={(e) => setCoverImageFile(e.target.files[0])}/> */}
              </div>

              {/* logo image */}
              <div className="w-[300px] ">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-1 mt-10 font-semibold text-lg"
                >
                  Logo Image
                </Typography>
                <div
                  {...getRootPropsLogo()}
                  className="border border-dashed border-gray-400 p-4 rounded-lg text-center"
                >
                  <input {...getInputPropsLogo()} />
                  {coverImage ? (
                    <img
                      src={logoImage}
                      alt="logo Preview"
                      className="w-[100px] h-[100px] mt-4 rounded-lg"
                    />
                  ) : (
                    <p>Drag & drop an image here, or click to select one</p>
                  )}
                </div>
                {/* <Input type="file" onChange={(e) => setLogoImageFile(e.target.files[0])}/> */}
              </div>

              {/* company name */}
              <div className="w-[300px]  ">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-1 mt-10 font-semibold text-lg"
                >
                  Company Name
                </Typography>
                <Input
                  maxLength={16}
                  placeholder="OFX"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-800 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
                />
              </div>

              {/* company description */}
              <div className="w-[300px]  ">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-1 mt-10 font-semibold text-lg"
                >
                  Company Description
                </Typography>
                <Input
                  maxLength={50}
                  placeholder="OFX marketing agency"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-800 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
                />
              </div>

              {/* main phone number */}
              <div className="w-[300px] ">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-1 mt-10 font-semibold text-lg"
                >
                  Company Main Phone
                </Typography>
                <Input
                  maxLength={16}
                  placeholder="01061472185"
                  value={phone1}
                  onChange={(e) => setPhone1(e.target.value)}
                  className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-800 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
                />
              </div>

              {/* Second phone */}
              <div className="w-[300px]  ">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-1 mt-10 font-semibold text-lg"
                >
                  Company Second Phone
                </Typography>
                <Input
                  maxLength={16}
                  placeholder="01100942108"
                  value={phone2}
                  onChange={(e) => setPhone2(e.target.value)}
                  className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-800 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
                />
              </div>

              {/* MP3 */}
              {user.package_id == 3 && (
                <div className="w-[300px]  ">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 mt-10 font-semibold text-lg"
                  >
                    MP3
                  </Typography>
                  <div
                    {...getRootPropsMP3()}
                    className="border border-dashed border-gray-400 p-4 rounded-lg text-center"
                  >
                    <input {...getInputPropsMP3()} />
                    {mp3 ? (
                      <audio
                        controls
                        src={mp3}
                        className="w-full h-[100px] mt-4 rounded-lg"
                      />
                    ) : (
                      <p>Drag & drop an MP3 here, or click to select one</p>
                    )}
                  </div>
                  {/* <Input type="file" onChange={(e) => setMp3File(e.target.files[0])}/> */}
                </div>
              )}

              {/* PDF */}
              {user.package_id === 3 && (
                <div className="w-[300px]">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 mt-10 font-semibold text-lg"
                  >
                    PDF
                  </Typography>
                  <div
                    {...getRootPropsPDF()}
                    className="border border-dashed border-gray-400 p-4 rounded-lg text-center"
                  >
                    <input {...getInputPropsPDF()} />
                    {pdf ? (
                      <p>uploaded</p>
                    ) : (
                      <p>Drag & drop an PDF here, or click to select one</p>
                    )}
                  </div>
                  {/* <Input type="file" onChange={(e) => setPdfFile(e.target.files[0])}/> */}
                </div>
              )}

              {/* PDF Name */}
              {user.package_id == 3 && (
                <div className="w-[300px]">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 mt-10 font-semibold text-lg"
                  >
                    PDF Name
                  </Typography>
                  <Input
                    maxLength={16}
                    placeholder="portfolio"
                    value={pdfName}
                    onChange={(e) => setPdfName(e.target.value)}
                    className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-800 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
                  />
                </div>
              )}

              {/* font */}
              <div className="w-[300px]">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-1 mt-10 font-semibold text-lg"
                >
                  Choose Font
                </Typography>
                <Select
                  id="font-select"
                  label="Select Font"
                  onChange={(val) => setSelectedFont(val)}
                  value={selectedFont}
                  className="h-[60px]"
                >
                  {fonts.map((font) => (
                    <Option key={font.name} value={font.style}>
                      {font.name}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>

            {/* social media icons */}
            <div>
              <h1 className="text-mainColor text-2xl font-black flex gap-4 items-center flex-wrap my-10">
                <span className="text-white flex justify-center items-center w-10 h-10 text-center rounded-full bg-mainColor">
                  2
                </span>{" "}
                Company Social Media
              </h1>
              <div className="flex items-center gap-5 flex-wrap">
                <FaFacebook
                  size={40}
                  className={`cursor-pointer ${
                    activeInputs.facebook ? "text-secondColor" : "text-gray-800"
                  }`}
                  onClick={() =>
                    setActiveInputs((prevState) => ({
                      ...prevState,
                      facebook: !prevState.facebook,
                    }))
                  }
                />
                <FaInstagramSquare
                  size={40}
                  className={`cursor-pointer ${
                    activeInputs.instgram ? "text-secondColor" : "text-gray-800"
                  }`}
                  onClick={() =>
                    setActiveInputs((prevState) => ({
                      ...prevState,
                      instgram: !prevState.instgram,
                    }))
                  }
                />
                <FaYoutube
                  size={40}
                  className={`cursor-pointer ${
                    activeInputs.youtube ? "text-secondColor" : "text-gray-800"
                  }`}
                  onClick={() =>
                    setActiveInputs((prevState) => ({
                      ...prevState,
                      youtube: !prevState.youtube,
                    }))
                  }
                />
                <FaWhatsappSquare
                  size={40}
                  className={`cursor-pointer ${
                    activeInputs.whatsapp ? "text-secondColor" : "text-gray-800"
                  }`}
                  onClick={() =>
                    setActiveInputs((prevState) => ({
                      ...prevState,
                      whatsapp: !prevState.whatsapp,
                    }))
                  }
                />
                <FaLinkedin
                  size={40}
                  className={`cursor-pointer ${
                    activeInputs.linkedin ? "text-secondColor" : "text-gray-800"
                  }`}
                  onClick={() =>
                    setActiveInputs((prevState) => ({
                      ...prevState,
                      linkedin: !prevState.linkedin,
                    }))
                  }
                />
                <FaBehance
                  size={40}
                  className={`cursor-pointer ${
                    activeInputs.be ? "text-secondColor" : "text-gray-800"
                  }`}
                  onClick={() =>
                    setActiveInputs((prevState) => ({
                      ...prevState,
                      be: !prevState.be,
                    }))
                  }
                />

                <FaLaptopCode
                  size={40}
                  className={`cursor-pointer ${
                    activeInputs.portfolio
                      ? "text-secondColor"
                      : "text-gray-800"
                  }`}
                  onClick={() =>
                    setActiveInputs((prevState) => ({
                      ...prevState,
                      portfolio: !prevState.portfolio,
                    }))
                  }
                />

                <FaSnapchatSquare
                  size={40}
                  className={`cursor-pointer ${
                    activeInputs.snapchat ? "text-secondColor" : "text-gray-800"
                  }`}
                  onClick={() =>
                    setActiveInputs((prevState) => ({
                      ...prevState,
                      snapchat: !prevState.snapchat,
                    }))
                  }
                />

                <RiTwitterXFill
                  size={40}
                  className={`cursor-pointer ${
                    activeInputs.twitter ? "text-secondColor" : "text-gray-800"
                  }`}
                  onClick={() =>
                    setActiveInputs((prevState) => ({
                      ...prevState,
                      twitter: !prevState.twitter,
                    }))
                  }
                />

                <FaPlus
                  size={40}
                  className={`cursor-pointer ${
                    activeInputs.other ? "text-secondColor" : "text-gray-800"
                  }`}
                  onClick={() =>
                    setActiveInputs((prevState) => ({
                      ...prevState,
                      other: !prevState.other,
                    }))
                  }
                />
              </div>
            </div>

            {/* social inputs */}
            <div className="flex flex-wrap gap-5">
              {/* facebook */}
              {activeInputs.facebook && (
                <div className="w-[300px]  ">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 mt-5 font-semibold text-lg"
                  >
                    Facebook Link
                  </Typography>
                  <Input
                    placeholder="facebook.com"
                    value={facebookLink}
                    onChange={(e) => setFacebookLink(e.target.value)}
                    className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-800 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
                  />
                </div>
              )}

              {/* instgram */}
              {activeInputs.instgram && (
                <div className="w-[300px]  ">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 mt-5 font-semibold text-lg"
                  >
                    Instgram Link
                  </Typography>
                  <Input
                    placeholder="instgram.com"
                    value={instgramLink}
                    onChange={(e) => setInstgramLink(e.target.value)}
                    className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-800 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
                  />
                </div>
              )}

              {/* youtube */}
              {activeInputs.youtube && (
                <div className="w-[300px]  ">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 mt-5 font-semibold text-lg"
                  >
                    Youtube Link
                  </Typography>
                  <Input
                    placeholder="youtube.com"
                    value={youtubeLink}
                    onChange={(e) => setYoutubeLink(e.target.value)}
                    className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-800 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
                  />
                </div>
              )}

              {/* WHATSAPP */}
              {activeInputs.whatsapp && (
                <div className="w-[300px]  ">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 mt-5 font-semibold text-lg"
                  >
                    Whatsapp Number
                  </Typography>
                  <Input
                    placeholder="01100942108"
                    value={whatsappLink}
                    onChange={(e) => setWhatsappLink(e.target.value)}
                    className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-800 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
                  />
                </div>
              )}

              {/* linkedin */}
              {activeInputs.linkedin && (
                <div className="w-[300px]">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 mt-5 font-semibold text-lg"
                  >
                    Linkedin
                  </Typography>
                  <Input
                    placeholder="Linkedin"
                    value={linkedinLink}
                    onChange={(e) => setLinkedinLink(e.target.value)}
                    className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-800 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
                  />
                </div>
              )}

              {/* Behance */}
              {activeInputs.be && (
                <div className="w-[300px]  ">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 mt-5 font-semibold text-lg"
                  >
                    Behance Link
                  </Typography>
                  <Input
                    placeholder="behance.com"
                    value={beLink}
                    onChange={(e) => setBeLink(e.target.value)}
                    className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-800 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
                  />
                </div>
              )}

              {/* portfolio */}
              {activeInputs.portfolio && (
                <div className="w-[300px]  ">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 mt-5 font-semibold text-lg"
                  >
                    portfolio Link
                  </Typography>
                  <Input
                    placeholder="www.ofxegypt.com"
                    value={portfolioLink}
                    onChange={(e) => setPortfolioLink(e.target.value)}
                    className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-800 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
                  />
                </div>
              )}

              {/* snapchat */}
              {activeInputs.snapchat && (
                <div className="w-[300px]  ">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 mt-5 font-semibold text-lg"
                  >
                    Snapchat Link
                  </Typography>
                  <Input
                    placeholder="snapchat.com"
                    value={snapchatLink}
                    onChange={(e) => setSnapchatLink(e.target.value)}
                    className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-800 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
                  />
                </div>
              )}

              {/* twitter */}
              {activeInputs.twitter && (
                <div className="w-[300px]  ">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 mt-5 font-semibold text-lg"
                  >
                    {`X(twitter)`} Link
                  </Typography>
                  <Input
                    placeholder="x.com"
                    value={twitterLink}
                    onChange={(e) => setTwitterLink(e.target.value)}
                    className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-800 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
                  />
                </div>
              )}

              {/* other */}
              {activeInputs.other && (
                <div className="w-[300px]  ">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 mt-5 font-semibold text-lg"
                  >
                    Other Link
                  </Typography>
                  <Input
                    placeholder="ex: drive link"
                    value={otherLink}
                    onChange={(e) => setOtherLink(e.target.value)}
                    className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-800 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
                  />
                </div>
              )}
            </div>

            {/* menu */}
            {user.package_id === 3 && (
              <div>
                <div>
                  <h1 className="text-mainColor text-2xl font-black flex gap-4 items-center flex-wrap my-5">
                    <span className="text-white mt-5 flex justify-center items-center w-10 h-10 text-center rounded-full bg-mainColor">
                      3
                    </span>{" "}
                    <span className="mt-5">Menu</span>
                  </h1>
                  <div>
                    <div className="flex flex-wrap gap-5">
                      {/* menu */}
                      <div className="w-[300px]">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-1 mt-5 font-semibold text-lg"
                        >
                          Menu Image
                        </Typography>
                        <div
                          {...getRootPropsImage()}
                          className="border border-dashed border-gray-400 p-4 rounded-lg text-center"
                        >
                          <input {...getInputPropsImage()} />
                          {menuImage ? (
                            <p>uploaded</p>
                          ) : (
                            <p>Drag & drop pdf here, or click to select one</p>
                          )}
                        </div>
                        {/* <Input type="file" onChange={(e) => setMenuImageFile(e.target.files[0])}/> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* branches */}
            <div>
              <div>
                <h1 className="text-mainColor text-2xl font-black flex gap-4 items-center flex-wrap my-5">
                  <span className="text-white flex justify-center items-center w-10 h-10 text-center rounded-full bg-mainColor mt-5">
                    {user.package_id === 3 ? "4" : "3"}
                  </span>{" "}
                  <span className="mt-5">Branches</span>
                </h1>
                <div>
                  {branches.map((branch, index) => (
                    <div key={index} className="flex flex-wrap gap-5">
                      {/* Branch Name */}
                      <div className="w-[300px]">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-1 mt-5 font-semibold text-lg"
                        >
                          Branch Name
                        </Typography>
                        <Input
                          placeholder="New Cairo"
                          value={branch.name}
                          onChange={(e) =>
                            handleInputChange(index, "name", e.target.value)
                          }
                          className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-800 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
                        />
                      </div>
                      {/* Branch Location */}
                      <div className="w-[300px]">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-1 mt-5 font-semibold text-lg"
                        >
                          Branch Location
                        </Typography>
                        <Input
                          placeholder="location link from GPS"
                          value={branch.location}
                          onChange={(e) =>
                            handleInputChange(index, "location", e.target.value)
                          }
                          className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-800 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
                        />
                      </div>
                      {/* Branch phones */}
                      <div className="w-[300px]">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-1 mt-5 font-semibold text-lg"
                        >
                          Branch Number
                        </Typography>
                        <Input
                          placeholder="Branch Number"
                          value={branch.phones}
                          onChange={(e) =>
                            handleInputChange(index, "phones", e.target.value)
                          }
                          className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-800 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
                        />
                      </div>
                    </div>
                  ))}
                  {/* Add Branch Button */}
                  <div className="my-10">
                    <button
                      onClick={addBranch}
                      className="text-2xl font-normal text-black px-3 py-1 bg-gray-400 text-center block"
                    >
                      Add Branch +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* submit */}
            <div className="my-5 w-48">
              {user && (user.package_id === 2 || user.package_id === 3) && (
                <button
                  onClick={getQr}
                  disabled={!user || !user.package_id || user.package_id === 1}
                  className="bg-mainColor w-[100%] px-5 py-5 font-semibold text-center text-white my-5 hover:bg-secondColor"
                >
                  {loading ? <Spinner className="mx-auto" /> : "Submit"}
                </button>
              )}
              {(!user || !user.package_id || user.package_id === 1) && (
                <button
                  onClick={() => navigate("/payment")}
                  className="bg-mainColor w-[100%] px-5 py-5 font-semibold text-center text-white my-5 hover:bg-secondColor"
                >
                  Pay for use it
                </button>
              )}
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
          {/* ======================================== */}
        </div>
      </div>
    </div>
  );
};

export default PackageOneTwo;
