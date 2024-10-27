import React, { useCallback, useState } from "react";
import MainNavbar from "../../../components/user/navbar/MainNavbar";
import { Input, Typography } from "@material-tailwind/react";
import PhoneAnimation from "../../../components/user/phone/PhoneAnimation";
import { useDropzone } from "react-dropzone";

const PackageOneTwo = () => {
  const [coverImage, setCoverImage] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const [mp3, setMp3] = useState(null)
  const [centerImage, setCenterImage] = useState(null)
  const [pdf, setPDF] = useState(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  // Handle drop for cover image
  const onDropCover = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
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
    const reader = new FileReader();
    reader.onloadend = () => {
      setCenterImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }, []);

  // Handle drop for MP3
  const onDropMP3 = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
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
      accept: "image/*",
    });

    const { getRootProps: getRootPropsPDF, getInputProps: getInputPropsPDF } = useDropzone({
        onDrop: onDropPDF,
        accept: {
          'application/pdf': ['.pdf']                    // Accepts PDF files
        },
      });
  return (
    <div>
      <MainNavbar />
      <div className="p-10">
        <div className="flex flex-col md:flex-row h-screen space-y-5 md:space-y-0 md:space-x-5">
          <div className="flex-1 p-5">
            <div className="my-5">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-1 font-semibold text-lg"
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
                    className="w-full h-[100px] mt-4 rounded-lg"
                  />
                ) : (
                  <p>Drag & drop an image here, or click to select one</p>
                )}
              </div>
            </div>
            {/* =========================== */}
            <div className="my-5">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-1 font-semibold text-lg"
              >
                Company Description
              </Typography>
              <Input
                maxLength={16}
                placeholder="OFX Social Media marketing agency.."
                className="appearance-none min-h-[60px] !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={description}
                onChange={(e) => {setDescription(e.target.value)}} 
              />
            </div>
            {/* =========================== */}
            <div className="my-5">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-1 mt-10 font-semibold text-lg"
              >
                Main Phone Number
              </Typography>
              <Input
                maxLength={16}
                placeholder="01061472185"
                className="appearance-none min-h-[60px] !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            {/* =========================== */}
            <div className="my-5">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-1 mt-10 font-semibold text-lg"
              >
                Facebook Link
              </Typography>
              <Input
                maxLength={16}
                placeholder="Facebook Link"
                className="appearance-none min-h-[60px] !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            {/* =========================== */}
            <div className="my-5">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-1 mt-10 font-semibold text-lg"
              >
                Instgram Link
              </Typography>
              <Input
                maxLength={16}
                placeholder="Instgram Link"
                className="appearance-none min-h-[60px] !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            {/* =========================== */}
            <div className="my-5">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-1 mt-10 font-semibold text-lg"
              >
                LinkedIn Link
              </Typography>
              <Input
                maxLength={16}
                placeholder="LinkedIn Link"
                className="appearance-none min-h-[60px] !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            {/* =========================== */}
            <div className="my-5">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-1 mt-10 font-semibold text-lg"
              >
                {`X (Twitter)`} Link
              </Typography>
              <Input
                maxLength={16}
                placeholder="X Link"
                className="appearance-none min-h-[60px] !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            {/* =========================== */}
            <div className="my-5">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-1 mt-10 font-semibold text-lg"
              >
                Behance Link
              </Typography>
              <Input
                maxLength={16}
                placeholder="Behance Link"
                className="appearance-none min-h-[60px] !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            {/* =========================== */}
            <div className="my-5">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-1 mt-10 font-semibold text-lg"
              >
                Website Link
              </Typography>
              <Input
                maxLength={16}
                placeholder="Behance Link"
                className="appearance-none min-h-[60px] !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            {/* =========================== */}
          </div>

          <div className="flex-1 p-5">
            <div className="my-5">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-1 font-semibold text-lg"
              >
                Company Logo
              </Typography>
              <div
                {...getRootPropsLogo()}
                className="border border-dashed border-gray-400 p-4 rounded-lg text-center"
              >
                <input {...getInputPropsLogo()} />
                {logoImage ? (
                  <img
                    src={logoImage}
                    alt="Logo Preview"
                    className="w-full h-[100px] mt-4 rounded-lg"
                  />
                ) : (
                  <p>Drag & drop an image here, or click to select one</p>
                )}
              </div>
            </div>
            {/* ================================ */}
            <div className="my-5">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-1 font-semibold text-lg"
              >
                Company Name
              </Typography>
              <Input
                maxLength={16}
                placeholder="OFX"
                value={name}
                onChange={(e) => {setName(e.target.value)}}
                className="appearance-none min-h-[60px] !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            {/* ================================ */}
            <div className="my-5">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-1 mt-10 font-semibold text-lg"
              >
                Second Phone Number
              </Typography>
              <Input
                maxLength={16}
                placeholder="01061472185"
                className="appearance-none min-h-[60px] !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            {/* ================================ */}
            <div className="my-5">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-1 mt-10 font-semibold text-lg"
              >
                {`Video Link(youtube , drive)`}
              </Typography>
              <Input
                maxLength={16}
                placeholder="youtube or drive link"
                className="appearance-none min-h-[60px] !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            {/* ================================ */}
            <div className="my-5">
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
                {coverImage ? (
                  <audio
                    src={mp3}
                    alt="Cover Preview"
                    className="w-full h-[100px] mt-4 rounded-lg"
                  />
                ) : (
                  <p>Drag & drop an MP3 here, or click to select one</p>
                )}
              </div>
            </div>
            {/* ================================ */}
            <div className="my-5">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-1 mt-10 font-semibold text-lg"
              >
                Center Image
              </Typography>
              <div
                {...getRootPropsImage()}
                className="border border-dashed border-gray-400 p-4 rounded-lg text-center"
              >
                <input {...getInputPropsImage()} />
                {coverImage ? (
                  <audio
                    src={centerImage}
                    alt="Cover Preview"
                    className="w-full h-[100px] mt-4 rounded-lg"
                  />
                ) : (
                  <p>Drag & drop an Image here, or click to select one</p>
                )}
              </div>
            </div>
            {/* ================================ */}
            <div className="my-5">
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
                {coverImage ? (
                  <audio
                    src={centerImage}
                    alt="Cover Preview"
                    className="w-full h-[100px] mt-4 rounded-lg"
                  />
                ) : (
                  <p>Drag & drop an PDF here, or click to select one</p>
                )}
              </div>
            </div>
            {/* ================================ */}
          </div>
          <PhoneAnimation image={coverImage} logo={logoImage} name={name} description={description}/>
        </div>
      </div>
    </div>
  );
};

export default PackageOneTwo;
