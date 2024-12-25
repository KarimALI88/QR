import React, { useCallback, useState, useEffect, useContext } from "react";
import MainNavbar from "../../../components/user/navbar/MainNavbar";
import { useParams } from "react-router-dom";
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
  FaPlus,
  FaTiktok,
  FaGlobe,
} from "react-icons/fa";
import { Spinner } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import { Dialog } from "@material-tailwind/react";
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
import axios from "axios";

const UpdateQr = ({ valid, user, refresh }) => {
  const { id } = useParams();
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
    facebook: false,
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
  const { token, setPackageId } = useContext(AppContext);
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
    { id: "", name: "", location: "", phones: "" }, // Initial branch
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
  const [links, setLinks] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [records, setRecords] = useState([]);

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

  const getProfile = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_API_LINK}/profile/${id}`,
      });
      console.log("response of profile ", response);
      if (response.data.cover) {
        setColor(response.data.background_color);
        setDescription(response.data.description);
        setName(response.data.title);
        setCoverImage(
          `https://backend.ofx-qrcode.com/storage/${response.data.cover}`
        );
        setLogoImage(
          `https://backend.ofx-qrcode.com/storage/${response.data.logo}`
        );
        response.data.phones[0] && setPhone1(response.data.phones[0]);
        response.data.phones[1] && setPhone2(response.data.phones[1]);
        response.data.font && setSelectedFont(response.data.font);
        response.data.links && setLinks(response.data.links);

        // behance link
        const behanceLink = response.data.links.find(
          (link) => link.type === "behance"
        );
        if (behanceLink) {
          setActiveInputs((prevState) => ({
            ...prevState,
            behance: !prevState.be,
          }));
          setBeLink(behanceLink.url);
        }

        // facebook link
        const facebookLink = response.data.links.find(
          (link) => link.type === "facebook"
        );
        if (facebookLink) {
          setActiveInputs((prevState) => ({
            ...prevState,
            facebook: !prevState.facebook,
          }));
          setFacebookLink(facebookLink.url);
        }

        // instgram link
        const instgramLink = response.data.links.find(
          (link) => link.type === "instgram"
        );
        if (instgramLink) {
          setActiveInputs((prevState) => ({
            ...prevState,
            instgram: !prevState.instgram,
          }));
          setInstgramLink(instgramLink.url);
        }

        // youtube link
        const youtubeLink = response.data.links.find(
          (link) => link.type === "youtube"
        );
        if (youtubeLink) {
          setActiveInputs((prevState) => ({
            ...prevState,
            youtube: !prevState.youtube,
          }));
          setYoutubeLink(youtubeLink.url);
        }

        // tiktok link
        const tiktokLink = response.data.links.find(
          (link) => link.type === "tiktok"
        );
        if (tiktokLink) {
          setActiveInputs((prevState) => ({
            ...prevState,
            tiktok: !prevState.tiktok,
          }));
          setTiktokLink(tiktokLink.url);
        }

        // snapchat link
        const snapchatLink = response.data.links.find(
          (link) => link.type === "snapchat"
        );
        if (snapchatLink) {
          setActiveInputs((prevState) => ({
            ...prevState,
            snapchat: !prevState.snapchat,
          }));
          setSnapchatLink(snapchatLink.url);
        }

        // portfolio link
        const portfolioLink = response.data.links.find(
          (link) => link.type === "portfolio"
        );
        if (portfolioLink) {
          setActiveInputs((prevState) => ({
            ...prevState,
            portfolio: !prevState.portfolio,
          }));
          setPortfolioLink(portfolioLink.url);
        }

        // linkedin link
        const linkedinLink = response.data.links.find(
          (link) => link.type === "linkedin"
        );
        if (linkedinLink) {
          setActiveInputs((prevState) => ({
            ...prevState,
            linkedin: !prevState.linkedin,
          }));
          setLinkedinLink(linkedinLink.url);
        }

        // twitter link
        const twitterLink = response.data.links.find(
          (link) => link.type === "twitter"
        );
        if (twitterLink) {
          setActiveInputs((prevState) => ({
            ...prevState,
            twitter: !prevState.twitter,
          }));
          setTwitterLink(twitterLink.url);
        }

        // pdfs
        response.data.pdfs.some(
          (pdf) =>
            pdf.type === "menu" &&
            setMenuImage(
              `https://backend.ofx-qrcode.com/storage/${pdf.pdf_path}`
            )
        );
        response.data.pdfs.some((pdf) => {
          if (pdf.type != "menu") {
            setPDF(`https://backend.ofx-qrcode.com/storage/${pdf.pdf_path}`);
            setPdfName(pdf.type);
          }
        });

        response.data.pdfs && setPdfs(response.data.pdfs);
        response.data.records &&
          setRecords(
            Array.isArray(response.data.records) ? response.data.records : []
          );
        response.data.records.length > 0 &&
          setMp3(
            `https://backend.ofx-qrcode.com/storage/${response.data.records[0]?.mp3_path}`
          );

        // branches
        response.data.branches &&
          setBranches(
            response.data.branches.map((branch) => ({
              id: branch.id, // Retain the branch ID
              name: branch.name,
              phones: branch.phones[0], // Get the first phone
              location: branch.location,
            }))
          );
      }
    } catch (error) {
      console.error("error in get profile ", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const updateQrData = async () => {
    setLoading(true);
  
    try {
      const formData = new FormData();
  
      // Append basic fields
      formData.append("title", name || "");
      formData.append("description", description || "");
      formData.append("color", color || "");
      formData.append("font", selectedFont || "");
  
      // Append phones
      if (phone1) formData.append("phones[]", phone1);
      if (phone2) formData.append("phones[]", phone2);
  
      // Append logo and cover files
      if (logoImageFile) formData.append("logo", logoImageFile);
      if (coverImageFile) formData.append("cover", coverImageFile);
  
      // Handle MP3 files
      let mp3Appended = false;
      (records || []).forEach((record) => {
        if (record.id) {
          formData.append("mp3_id[]", record.id); // Existing MP3 ID
          mp3Appended = true;
        }
      });
      if (mp3File) {
        formData.append("mp3[]", mp3File); // New MP3 file
        mp3Appended = true;
      }
      if (!mp3Appended) {
        formData.append("mp3[]", new File([""], "placeholder.mp3", { type: "audio/mpeg" })); // Ensure at least one file
      }
  
      // Handle PDF files
      let pdfAppended = false;
      pdfs.forEach((pdf) => {
        if (pdf.id) {
          formData.append("pdfs_id", pdf.id); // Existing PDF ID
          pdfAppended = true;
        } else if (pdf.file) {
          formData.append("pdfs[]", pdf.file); // New PDF file
          pdfAppended = true;
        }
      });
      if (pdfFile) {
        formData.append("pdfs[]", pdfFile); // Handle additional new PDF file
        pdfAppended = true;
      }
      if (!pdfAppended) {
        formData.append("pdfs[]", new File([""], "placeholder.pdf", { type: "application/pdf" })); // Ensure at least one file
      }
  
      // Handle links (existing and new)
      links.forEach((link) => {
        if (link.id) {
          formData.append("links[]", JSON.stringify({
            id: link.id,
            url: link.url,
            type: link.type,
          }));
        } else {
          formData.append("links[]", JSON.stringify({
            url: link.url,
            type: link.type,
          }));
        }
      });
  
      // Handle branches (existing and new)
      branches.forEach((branch) => {
        if (branch.id) {
          formData.append("branches[]", JSON.stringify({
            id: branch.id,
            name: branch.name,
            location: branch.location,
            phones: branch.phones,
          }));
        } else {
          formData.append("branches[]", JSON.stringify({
            name: branch.name,
            location: branch.location,
            phones: branch.phones,
          }));
        }
      });
  
      // Make the API request
      const response = await axios.post(
        `${import.meta.env.VITE_API_LINK}/profile/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Update response:", response.data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleLinkChange = (linkId, newUrl) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) => {
        if (link.id === linkId) {
          return { ...link, url: newUrl };
        }
        return link;
      })
    );
  };

  return (
    <div>
      <MainNavbar />
      {valid ? (
        <div className="p-10 h-fit bg-[#eee]">
          <div className="flex flex-col sm:flex-col md:flex-row space-y-5 sm:space-y-0 sm:space-x-5">
            <div className="flex-1 shadow-none sm:w-[300px] md:[200px] order-1 sm:order-2 ">
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
                tiktok={tiktokLink}
                portfolio={portfolioLink}
              />
            </div>

            {/* ======================================== */}

            <div className="flex-1 my-10 order-2 sm:order-1 ">
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
                    // maxLength={16}
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
                    // maxLength={50}
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
                          {/* <IoIosCloseCircle
                            size={30}
                            onClick={() => {
                              setMp3(null);
                              setMp3File(null);
                            }}
                          /> */}
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
                          {/* <IoIosCloseCircle
                            size={30}
                            onClick={() => {
                              setPDF(null);
                              setPdfFile(null);
                            }}
                          /> */}
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

              {/* ====================================================================================== */}
              {/* second section */}
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
                      activeInputs.facebook
                        ? "text-secondColor"
                        : "text-gray-800"
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
                      activeInputs.instgram
                        ? "text-secondColor"
                        : "text-gray-800"
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
                      activeInputs.youtube
                        ? "text-secondColor"
                        : "text-gray-800"
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
                      activeInputs.whatsapp
                        ? "text-secondColor"
                        : "text-gray-800"
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
                      activeInputs.linkedin
                        ? "text-secondColor"
                        : "text-gray-800"
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

                  <FaGlobe
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
                      activeInputs.snapchat
                        ? "text-secondColor"
                        : "text-gray-800"
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
                      activeInputs.twitter
                        ? "text-secondColor"
                        : "text-gray-800"
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
                {links
                  .filter((link) => !activeInputs[link.type])
                  .map((link) => (
                    <div key={link.id} className="w-[300px]">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-1 mt-5 font-semibold text-lg"
                      >
                        {link.type}
                      </Typography>
                      <Input
                        type="text"
                        variant="small"
                        color="blue-gray"
                        className="mb-1 mt-5 font-semibold text-lg"
                        value={link.url}
                        onChange={(e) =>
                          handleLinkChange(link.id, e.target.value)
                        }
                      />
                    </div>
                  ))}
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
              {/* ====================================================================================== */}

              {/* third section */}
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
                                {/* <IoIosCloseCircle
                                  size={30}
                                  onClick={() => {
                                    setMenuImage(null);
                                    setMenuImageFile(null);
                                  }}
                                /> */}
                              </div>
                            ) : (
                              <p>
                                Drag & drop pdf here, or click to select one
                              </p>
                            )}
                          </div>
                          {/* <Input type="file" onChange={(e) => setMenuImageFile(e.target.files[0])}/> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ====================================================================================== */}

              {/* fourth section */}
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
                              handleInputChange(
                                index,
                                "location",
                                e.target.value
                              )
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

              {/* ====================================================================================== */}

              {/* submit */}
              <div className="my-5 w-48">
                {user &&
                  (user?.pivot?.package_id === 2 ||
                    user?.pivot?.package_id === 3) && (
                    <button
                      onClick={updateQrData}
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
                    onClick={() => {
                      // setPackageId()
                      navigate("/payment");
                    }}
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
        </div>
      ) : (
        <h1 className="text-center font-black my-20 mx-auto text-5xl">
          Your Subscribtion end
        </h1>
      )}
    </div>
  );
};

export default UpdateQr;
