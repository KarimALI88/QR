import React from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const OurFeatures = () => {
  const { t } = useTranslation();
  const features = [
    { name: t("feature1"), descroption: "description feature 1"},
    { name: t("feature2"), descroption: "description feature 2" },
    { name: t("feature3"), descroption: "description feature 3" },
    { name: t("feature4"), descroption: "description feature 4" },
  ];
  return (
    <div>
      <h3 className="text-5xl font-extrabold text-center px-8 py-4 rounded-tl-3xl rounded-br-3xl border-4 border-mainColor text-mainColor relative z-10 bg-white transform transition-all hover:scale-105 shadow-none w-fit mx-auto">
        {t("features")}
      </h3>
      <div className="my-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ff
      </div>
    </div>
  );
};

export default OurFeatures;
