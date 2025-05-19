import React from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FaFingerprint, FaShareAlt, FaTrademark, FaGlobe, FaUtensils, FaHashtag  } from "react-icons/fa";

const OurFeatures = () => {
  const { t } = useTranslation();
  const features = [
    { name: t("identity"), descroption: t("identityDesc"), icon: <FaFingerprint size={50}/> },
    { name: t("socialMediaAccs"), descroption: t("socialMediaAccsDesc"), icon: <FaShareAlt size={50}/>},
    { name: t("branding"), descroption: t("brandingDesc"), icon: <FaHashtag size={50}/> },
    { name: t("makeYourOwnWebsite"), descroption: t("makeYourOwnWebsiteDesc"), icon: <FaGlobe size={50}/>},
    { name: t("uploadYourMenu"), descroption: t("uploadYourMenuDesc"), icon: <FaUtensils  size={50}/> },
  ];
  return (
    <div>
      <h3 className="text-5xl font-extrabold text-center px-8 py-4 rounded-tl-3xl rounded-br-3xl border-4 border-mainColor text-mainColor relative z-10 bg-white transform transition-all hover:scale-105 shadow-none w-fit mx-auto">
        {t("features")}
      </h3>
      <div className="my-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card className="mt-6 w-[90%] mx-auto" key={index}>
            <CardBody>
              <span className="mb-6 block text-mainColor">
                {feature.icon}
              </span>
              <Typography variant="h5" className="mb-2 text-mainColor">
                {feature.name}
              </Typography>
              <Typography>{feature.descroption}</Typography>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OurFeatures;
