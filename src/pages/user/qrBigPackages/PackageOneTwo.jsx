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
  FaTiktok
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
import { IoIosCloseCircle } from "react-icons/io";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
const PackageOneTwo = ({ user, refresh, valid }) => {
  const COUNTRIES = [
    "Egypt (+20)",
    "Saudi Arabia (+966)",
    "UAE (+971)",
    "Kuwait (+965)",
  ];
  const CODES = ["+20", "+966", "+971", "+965"];
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
  const [packageCheck, setPackageCheck] = useState("c3");
  const [facebookLink, setFacebookLink] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [instgramLink, setInstgramLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [snapchatLink, setSnapchatLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [otherLink, setOtherLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [tiktokLink, setTiktokLink] = useState("");
  const [beLink, setBeLink] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [loading, setLoading] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Roboto");
  const [otherLinkName, setOtherLinkName] = useState("");
  const [branches, setBranches] = useState([
    { name: "", location: "", phones: "" }, // Initial branch
  ]);
  const [errorIndicator, setErrorIndicator] = useState({
    nameIndicator: false,
    descriptionIndicator: false,
    phone1Indicator: false,
    phone2Indicator: false,
    facebookIndicator: false,
    instgramIndicator: false,
    twitterIndicator: false,
    snapchatIndicator: false,
    whatsappIndicator: false,
    youtubeIndicator: false,
    linkedinIndicator: false,
    portfolioIndicator: false,
    behanceIndicator: false,
    otherIndicator: false,
    tiktokIndicator: false,
  });
  const [country, setCountry] = useState(0);
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

  // console.log("country", country)
  const handleOpen = () => setOpenModal(!openModal);
  const addBranch = () => {
    setBranches([...branches, { name: "", location: "", phones: "" }]);
  };

  useEffect(() => {
    const subscribe = localStorage.lg;
    setPackageCheck(subscribe);
  }, [refresh]);

  const handleInputChange = (index, field, value) => {
    const updatedBranches = [...branches];
    updatedBranches[index][field] = value;
    setBranches(updatedBranches);
  };

  const removeBranch = (index) => {
    const updatedBranches = branches.filter((_, i) => i !== index);
    setBranches(updatedBranches);
  };

  // console.log("package",packageId)

  useEffect(() => {
    const tn = localStorage.getItem("tn");
    setToken(tn);
  }, []);

  // Handle drop for cover image
  const onDropCover = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const webpFile = await convertToWebp(file);
      setCoverImageFile(webpFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result);
      };
      reader.readAsDataURL(webpFile);
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
  const onDropLogo = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const webpFile = await convertToWebp(file);
      setLogoImageFile(webpFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoImage(reader.result);
      };
      reader.readAsDataURL(webpFile);
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

  // convert to web

  const convertToWebp = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              const webpFile = new File(
                [blob],
                file.name.replace(/\.\w+$/, ".webp"),
                {
                  type: "image/webp",
                }
              );
              resolve(webpFile);
            },
            "image/webp",
            0.8 // Quality (0.0 - 1.0)
          );
        };
      };
    });
  };

  const getQr = async () => {
    setLoading(true);

    try {
      const validationErrors = [];
      const newErrorIndicator = { ...errorIndicator };

      // Basic required fields validation
      if (
        !name ||
        !description ||
        !coverImageFile ||
        !logoImageFile ||
        !phone1
      ) {
        validationErrors.push(
          "Please fill in all required fields: Name, Description, Cover Image, Logo Image, and Phone 1."
        );

        // Update error indicators for missing fields
        newErrorIndicator.nameIndicator = !name;
        newErrorIndicator.descriptionIndicator = !description;
        newErrorIndicator.phone1Indicator = !phone1;
      }

      // Validate phone numbers (only digits allowed)
      const phoneRegex = /^\d+$/;
      if (!phoneRegex.test(phone1) || (phone2 && !phoneRegex.test(phone2))) {
        validationErrors.push("Phone numbers must contain only digits.");

        // Update error indicators for invalid phone numbers
        newErrorIndicator.phone1Indicator = !phoneRegex.test(phone1);
        newErrorIndicator.phone2Indicator = phone2 && !phoneRegex.test(phone2);
      } else {
        // Reset phone error indicators if valid
        newErrorIndicator.phone1Indicator = false;
        newErrorIndicator.phone2Indicator = false;
      }

      // Validate PDF files (limit size and count)
      const maxPdfSize = 5 * 1024 * 1024; // 5 MB
      const pdfFiles = [pdfFile, menuImageFile].filter(Boolean);
      if (pdfFiles.length > 5) {
        validationErrors.push("You can upload a maximum of 5 PDF files.");
      }

      for (const file of pdfFiles) {
        if (file.size > maxPdfSize) {
          validationErrors.push("PDF file size should not exceed 5 MB.");
        }
      }

      // Validate MP3 file duration (max 1 minute)
      if (mp3File) {
        const audio = new Audio(URL.createObjectURL(mp3File));
        const isMp3Valid = await new Promise((resolve) => {
          audio.onloadedmetadata = () => {
            resolve(audio.duration <= 60);
          };
        });
        if (!isMp3Valid) {
          validationErrors.push(
            "MP3 file duration should not exceed 1 minute."
          );
        }
      }

      // Validate social links
      const urlRegex = /^(https?:\/\/)(www\.)?[\w-]+(\.[\w-]+)+/;
      const linkValidations = [
        {
          url: facebookLink,
          base: "https://www.facebook.com",
          indicator: "facebookIndicator",
        },
        {
          url: instgramLink,
          base: "https://www.instagram.com",
          indicator: "instgramIndicator",
        },
        {
          url: youtubeLink,
          base: "https://www.youtube.com",
          indicator: "youtubeIndicator",
        },
        {
          url: beLink,
          base: "https://www.behance.net",
          indicator: "behanceIndicator",
        },
        { url: otherLink, base: "", indicator: "otherIndicator" },
        { url: portfolioLink, base: "", indicator: "portfolioIndicator" },
        {
          url: whatsappLink && `https://wa.me/${CODES[country]}${whatsappLink}`,
          base: "https://wa.me",
          indicator: "whatsappIndicator",
        },
        {
          url: linkedinLink,
          base: "https://www.linkedin.com",
          indicator: "linkedinIndicator",
        },
        {
          url: snapchatLink,
          base: "https://www.snapchat.com",
          indicator: "snapchatIndicator",
        },
        {
          url: twitterLink,
          base: "https://www.x.com",
          indicator: "twitterIndicator",
        },
        {
          url: tiktokLink,
          base: "https://www.tiktok.com",
          indicator: "tiktokIndicator",
        },
      ];

      for (const { url, base, indicator } of linkValidations) {
        if (url && (!urlRegex.test(url) || (base && !url.startsWith(base)))) {
          validationErrors.push(
            `Invalid URL: Please ensure the link starts with ${base}`
          );
          newErrorIndicator[indicator] = true;
        } else {
          newErrorIndicator[indicator] = false;
        }
      } 

      // Update error indicators state
      setErrorIndicator(newErrorIndicator);

      // If there are validation errors, show them and return early
      if (validationErrors.length > 0) {
        alert(validationErrors.join("\n"));
        setLoading(false);
        return;
      }

      // Proceed with request if all validations pass
      const formData = new FormData();

      // Append files
      coverImageFile && formData.append("cover", coverImageFile);
      logoImageFile && formData.append("logo", logoImageFile);
      mp3File && formData.append("mp3[]", mp3File);
      pdfFile && formData.append("pdfs[]", pdfFile);
      pdfName && formData.append("type[]", pdfName);
      menuImageFile && formData.append("pdfs[]", menuImageFile);
      menuImageFile && formData.append("type[]", "menue");

      // Append basic information
      formData.append("title", name);
      formData.append("description", description);
      formData.append("color", color);
      formData.append("font", selectedFont);
      formData.append("package_id", user.pivot.package_id);

      // Append phone numbers
      formData.append("phones[]", phone1);
      phone2 && formData.append("phones[]", phone2);

      // Append social links
      const links = [
        { url: facebookLink, type: "facebook" },
        { url: instgramLink, type: "instgram" },
        { url: youtubeLink, type: "youtube" },
        { url: beLink, type: "behance" },
        { url: otherLink, type: `other${otherLinkName}`},
        { url: portfolioLink, type: "portfolio" },
        {
          url: `https://wa.me/${CODES[country]}${whatsappLink}`,
          type: "whatsapp",
        },
        { url: linkedinLink, type: "linkedin" },
        { url: snapchatLink, type: "snapchat" },
        { url: twitterLink, type: "twitter" },
        { url: tiktokLink, type: "tiktok" },
      ];

      links.forEach((link, index) => {
        // Skip adding the WhatsApp link if `whatsappLink` is empty or not greater than 0
        if (link.type === "whatsapp" && (!whatsappLink || whatsappLink <= 0)) {
          return;
        }

        // Check if the link URL is not empty before appending to `formData`
        if (link.url && link.url.length > 0) {
          formData.append(`links[${index}][url]`, link.url);
          formData.append(`links[${index}][type]`, link.type);
        }
      });

      // Append branch details
      branches.forEach((branch, index) => {
        if (branch.name && branch.name.trim().length > 0) {
          formData.append(`branches[${index}][name]`, branch.name);
          formData.append(
            `branches[${index}][location]`,
            branch.location || ""
          );
          formData.append(`branches[${index}][phones][0]`, branch.phones || "");
        }
      });

      const response = await fetch(
        `${import.meta.env.VITE_API_LINK}/qrcode/smart`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Response data:", data);

      setOpenModal(true);
      setImage(`https://backend.ofx-qrcode.com/storage/${data.qr_code}`);
      setDownloadImage(data.qr_code.split("/")[1]);
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Error during request:", error);
      setLoading(false);
    }
  };

  const payGeidea = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_LINK}/create-payment-link`,
        data: {
          amount: 200,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response of pay", response);
      if (response.data.data.paymentIntent.link) {
        window.open(response.data.data.paymentIntent.link, "_blank");
      }
    } catch (error) {
      console.error("error in pay", error);
    }
  };

  // const getQr = async () => {
  //   setLoading(true);
  //   try {
  //     const formData = new FormData();

  //     // Append files
  //     coverImageFile && formData.append("cover", coverImageFile);
  //     logoImageFile && formData.append("logo", logoImageFile);
  //     mp3File && formData.append("mp3[]", mp3File);
  //     pdfFile && formData.append("pdfs[]", pdfFile);
  //     pdfName && formData.append("type[]", pdfName);
  //     menuImageFile && formData.append("pdfs[]", menuImageFile);
  //     menuImageFile && formData.append("type[]", "menue");

  //     // Append basic information
  //     name && formData.append("title", name);
  //     description && formData.append("description", description);
  //     formData.append("color", color);
  //     formData.append("font", selectedFont);
  //     formData.append("package_id", "3");

  //     // Append phone numbers
  //     phone1 && formData.append("phones[]", phone1);
  //     phone2 && formData.append("phones[]", phone2);

  //     // Append social links
  //     const links = [
  //       { url: facebookLink, type: "facebook" },
  //       { url: instgramLink, type: "instgram" },
  //       { url: youtubeLink, type: "youtube" },
  //       { url: beLink, type: "behance" },
  //       { url: otherLink, type: "other" },
  //       { url: portfolioLink, type: "portfolio" },
  //       { url: `https://wa.me/${whatsappLink}`, type: "whatsapp" },
  //       { url: linkedinLink, type: "linkedin" },
  //       { url: snapchatLink, type: "snapchat" },
  //       { url: twitterLink, type: "twitter" },
  //     ];

  //     links.forEach((link, index) => {
  //       if (link.url && link.url.length > 0) {
  //         formData.append(`links[${index}][url]`, link.url);
  //         formData.append(`links[${index}][type]`, link.type);
  //       }
  //     });

  //     // Append branch details
  //     if (branches.length >= 1) {
  //       branches.forEach((branch, index) => {
  //         if (branch.name && branch.location && branch.phones.length > 0) {
  //           formData.append(`branches[${index}][name]`, branch.name);
  //           formData.append(`branches[${index}][location]`, branch.location);
  //           formData.append(`branches[${index}][phones][0]`, branch.phones);
  //         }
  //       });
  //     }

  //     // console.log("FormData before sending:", formData);

  //     // Make the fetch request
  //     const response = await fetch(
  //       "https://backend.ofx-qrcode.com/api/qrcode/smart",
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: formData,
  //       }
  //     );

  //     // Check if the response is ok
  //     // if (!response.ok) {
  //     //   throw new Error(`Error: ${response.status} ${response.statusText}`);
  //     // }

  //     const data = await response.json();
  //     console.log("Response data:", data);

  //     // Update the state with the QR code image
  //     setLoading(false);
  //     setOpenModal(true);
  //     setImage(`https://backend.ofx-qrcode.com/storage/${data.qr_code}`);
  //     setDownloadImage(data.qr_code.split("/")[1]);

  //     return data;
  //   } catch (error) {
  //     console.error("Error during request:", error);
  //     setLoading(false);
  //   }
  // };

  // console.log("user", user);

  return (
    <div
    // style={{
    //   background:
    //     "linear-gradient(152deg, rgba(255,255,255,0.9) 0%, rgba(5,59,92,0.8) 100%)",
    //   backgroundAttachment: "fixed",
    //   backgroundSize: "cover",
    //   backgroundRepeat: "no-repeat",
    //   position: "fixed",
    //   width: "100%",
    //   height: "100vh",
    //   overflowY: "auto", // Allows content to scroll within the fixed background
    // }}
    >
      <MainNavbar />
      {valid ? (<div className="p-10 h-fit ">
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
              otherLinkName={otherLinkName}
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
                  error={errorIndicator.nameIndicator}
                  className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-400 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
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
                  error={errorIndicator.descriptionIndicator}
                  onChange={(e) => setDescription(e.target.value)}
                  className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-400 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
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
                  type="number"
                  error={errorIndicator.phone1Indicator}
                  onChange={(e) => setPhone1(e.target.value)}
                  className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-400 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
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
                  type="number"
                  onChange={(e) => setPhone2(e.target.value)}
                  error={errorIndicator.phone2Indicator}
                  className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-400 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
                />
              </div>

              {/* MP3 */}
              {(user?.pivot?.package_id == 3 || packageCheck === "c3") && (
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
                      <div className="flex justify-between items-start">
                        <audio
                          controls
                          src={mp3}
                          className="w-full h-[100px] mt-4 rounded-lg"
                        />
                        <IoIosCloseCircle
                          size={30}
                          onClick={() => {
                            setMp3(null);
                            setMp3File(null);
                          }}
                        />
                      </div>
                    ) : (
                      <p>Drag & drop an MP3 here, or click to select one</p>
                    )}
                  </div>
                  {/* <Input type="file" onChange={(e) => setMp3File(e.target.files[0])}/> */}
                </div>
              )}

              {/* PDF */}
              {(user?.pivot?.package_id == 3 || packageCheck === "c3") && (
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
                      <div className="flex justify-between items-center">
                        <p>uploaded</p>
                        <IoIosCloseCircle
                          size={30}
                          onClick={() => {
                            setPDF(null);
                            setPdfFile(null);
                          }}
                        />
                      </div>
                    ) : (
                      <p>Drag & drop an PDF here, or click to select one</p>
                    )}
                  </div>
                  {/* <Input type="file" onChange={(e) => setPdfFile(e.target.files[0])}/> */}
                </div>
              )}

              {/* PDF Name */}
              {(user?.pivot?.package_id == 3 || packageCheck === "c3") && (
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
                    className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-400 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
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
                <FaTiktok
                  size={40}
                  className={`cursor-pointer ${
                    activeInputs.tiktok ? "text-secondColor" : "text-gray-800"
                  }`}
                  onClick={() =>
                    setActiveInputs((prevState) => ({
                      ...prevState,
                      tiktok: !prevState.tiktok,
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
                    error={errorIndicator.facebookIndicator}
                    className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-400 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
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
                    error={errorIndicator.instgramIndicator}
                    onChange={(e) => setInstgramLink(e.target.value)}
                    className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-400 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
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
                    error={errorIndicator.youtubeIndicator}
                    onChange={(e) => setYoutubeLink(e.target.value)}
                    className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-400 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
                  />
                </div>
              )}

              {/* tiktok */}
              {activeInputs.tiktok && (
                <div className="w-[300px]  ">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 mt-5 font-semibold text-lg"
                  >
                    Tiktok Link
                  </Typography>
                  <Input
                    placeholder="tiktok.com"
                    value={tiktokLink}
                    onChange={(e) => setTiktokLink(e.target.value)}
                    error={errorIndicator.tiktokIndicator}
                    className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-400 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
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
                  <div className="relative flex w-full">
                    <Menu placement="bottom-start">
                      <MenuHandler>
                        <Button
                          ripple={false}
                          variant="text"
                          color="blue-gray"
                          className="h-10 w-14 shrink-0 rounded-r-none border border-r-0 border-blue-gray-200 bg-transparent px-3"
                        >
                          {CODES[country]}
                        </Button>
                      </MenuHandler>
                      <MenuList className="max-h-[20rem] max-w-[18rem]">
                        {COUNTRIES.map((country, index) => {
                          return (
                            <MenuItem
                              key={country}
                              value={country}
                              onClick={() => setCountry(index)}
                            >
                              {country}
                            </MenuItem>
                          );
                        })}
                      </MenuList>
                    </Menu>
                    <Input
                      type="tel"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      value={whatsappLink}
                      onChange={(e) => setWhatsappLink(e.target.value)}
                      maxLength={12}
                      placeholder="324-456-2323"
                      className="appearance-none rounded-l-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                    />
                  </div>
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
                    error={errorIndicator.linkedinIndicator}
                    onChange={(e) => setLinkedinLink(e.target.value)}
                    className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-400 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
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
                    error={errorIndicator.behanceIndicator}
                    className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-400 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
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
                    error={errorIndicator.portfolioIndicator}
                    className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-400 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
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
                    error={errorIndicator.snapchatIndicator}
                    className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-400 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
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
                    error={errorIndicator.twitterIndicator}
                    className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-400 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
                  />
                </div>
              )}

              {/* other */}
              {activeInputs.other && (
                <div className="w-[300px] ">
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
                    error={errorIndicator.otherIndicator}
                    className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-400 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
                  />
                </div>
              )}

              {/* other Name */}
              {activeInputs.other && (
                <div className="w-[300px]">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-1 mt-5 font-semibold text-lg"
                >
                  Other Link Name
                </Typography>
                <Input
                  placeholder="ex: drive link"
                  value={otherLinkName}
                  onChange={(e) => setOtherLinkName(e.target.value)}
                  className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-400 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
                />
              </div>
              )}
            </div>

            {/* menu */}
            {(user?.pivot?.package_id == 3 || packageCheck === "c3") && (
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
                          Menu
                        </Typography>
                        <div
                          {...getRootPropsImage()}
                          className="border border-dashed border-gray-400 p-4 rounded-lg text-center"
                        >
                          <input {...getInputPropsImage()} />
                          {menuImage ? (
                            <div className="flex justify-between items-center">
                              <p>uploaded</p>
                              <IoIosCloseCircle
                                size={30}
                                onClick={() => {
                                  setMenuImage(null);
                                  setMenuImageFile(null);
                                }}
                              />
                            </div>
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
                    {user?.pivot?.package_id === 3 || packageCheck === "c3"
                      ? "4"
                      : "3"}
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
                          className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-400 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
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
                          className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-400 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
                        />
                      </div>

                      {/* Branch Phones */}
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
                          type="number"
                          onChange={(e) =>
                            handleInputChange(index, "phones", e.target.value)
                          }
                          className="appearance-none min-h-[60px] border-gray-900 placeholder:text-gray-400 placeholder:opacity-100 focus:border-gray-900 focus:text-black font-semibold"
                        />
                      </div>

                      {/* Remove Branch Button */}
                      <button
                        onClick={() => removeBranch(index)}
                        className="text-red-600 font-semibold mt-5"
                      >
                        Remove Branch -
                      </button>
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
              {user &&
                (user?.pivot?.package_id === 2 ||
                  user?.pivot?.package_id === 3) && (
                  <button
                    onClick={getQr}
                    disabled={
                      !user ||
                      !user?.pivot?.package_id ||
                      user?.pivot?.package_id === 1
                    }
                    className="bg-mainColor w-[100%] px-5 py-5 font-semibold text-center text-white my-5 hover:bg-secondColor"
                  >
                    {loading ? <Spinner className="mx-auto" /> : "Submit"}
                  </button>
                )}
              {(!user ||
                !user?.pivot?.package_id ||
                user?.pivot?.package_id === 1) && (
                <button
                  onClick={() => navigate("/payment")}
                  className="bg-mainColor w-[100%] px-5 py-5 font-semibold text-center text-white my-5 hover:bg-secondColor"
                >
                  Pay for use
                </button>
              )}
            </div>

            {/* loader */}
            {loading && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                <Spinner className="h-52 w-52 text-white" />
              </div>
            )}

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
      </div>) : <h1 className="text-center font-black my-20 mx-auto text-5xl">Your Subscribtion end</h1>}
    </div>
  );
};

export default PackageOneTwo;
