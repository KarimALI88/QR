import React, { useContext, useEffect, useState } from "react";
import MainNavbar from "../../../components/user/navbar/MainNavbar";
import {
  Dialog,
  Input,
  Spinner,
  Select,
  Option,
} from "@material-tailwind/react";
import axios from "axios";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import geidea from "../../../assets/imgs/geidea.png";
import { useInView } from "react-intersection-observer";
import Footer from "../../../components/user/footer/Footer";
import { useTranslation } from "react-i18next";

const Payment = ({ user, setRefresh }) => {
  const [activeSection, setActiveSection] = useState("geidea");
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const [period, setPeriod] = useState("monthly");
  const { t, i18n } = useTranslation();

  const getPackages = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/packages`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      // console.log("data of packages", data)
      setPackages(data);
    } catch (error) {
      console.error("error fetching packages", error);
    }
  };

  useEffect(() => {
    getPackages();
  }, []);

  const createSubscription = async (packageId) => {
    console.log("selected package ", packageId);

    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_LINK}/subscriptions`,
        data: {
          package_id: packageId,
          duration: period === "annually" ? "year" : "month",
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Subscription successful", response);
      setRefresh((prevState) => !prevState);
    } catch (error) {
      console.error("error in subscription", error);
    }
  };

  const payGeidea = async (selectedAmount, selectedPackageId) => {
    console.log("selected package in payGeidea", selectedPackageId);

    setLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_LINK}/payment/initiate`,
        data: {
          amount: selectedAmount,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      if (response.data.sessionId) {
        const onSuccess = () => {
          console.log("Payment success");
          console.log("selected package ", selectedPackageId);
          createSubscription(selectedPackageId);
          setRefresh((prevState) => !prevState);
          navigate("/qr");
        };

        const onError = () => {
          console.log("Payment error");
        };

        const onCancel = () => {
          console.log("Payment canceled");
        };

        const payment = new GeideaCheckout(onSuccess, onError, onCancel);
        payment.startPayment(response.data.sessionId);
      }
    } catch (error) {
      console.error("error in payment", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <MainNavbar />
      <div className="py-5 px-10 w-full">
        <h1 className="text-center text-4xl text-mainColor font-black my-5">
          {t("paymentPageTitle")}
        </h1>

        {user &&
        (user?.pivot?.package_id === 2 || user?.pivot?.package_id === 3) ? (
          <h2 className="text-center my-5 mx-auto text-xl font-semibold">
            {t("alreadyHaveAcc")}
          </h2>
        ) : (
          activeSection === "geidea" && (
            <div className="my-10 mx-auto w-full">
              <div className="mx-auto my-5">
                <div className="w-full">
                  <div className="flex flex-wrap justify-center items-center gap-10 sm:flex-col lg:flex-row w-full">
                    {packages.map((pack, index) => (
                      <div key={index}>
                        <div
                          className={`bg-white shadow-sm rounded-lg ${
                            index === 0 && "hidden"
                          } my-10 overflow-hidden h-fit w-[250px] mx-auto border-mainColor border-solid border-2 flex flex-col transition-opacity duration-700  ${
                            index === 2
                              ? "scale-110 border-secondColor border-4"
                              : ""
                          } ${index === 1 ? "scale-105" : ""}`}
                        >
                          <div className="px-6 py-8 flex-grow">
                            <div className="flex flex-col justify-between gap-4">
                              <h2 className="text-2xl font-bold text-mainColor capitalize">
                                {i18n.language == "en"
                                  ? pack?.name
                                  : pack?.name_ar}
                              </h2>
                              <p className="text-xl font-semibold text-gray-400 hidden">
                                {i18n.language == "en"
                                  ? pack?.description
                                  : pack?.description_ar}
                              </p>
                              <div>
                                {!(pack?.id === 1) && (
                                  <div className="flex gap-3 items-center justify-center">
                                    <button
                                      onClick={() => setPeriod("annually")}
                                      className={`${
                                        period === "annually"
                                          ? "bg-mainColor text-white"
                                          : "bg-gray-400"
                                      } text-black px-3 py-2 font-semibold mb-5`}
                                    >
                                      {t("annually")}
                                    </button>
                                    <button
                                      onClick={() => setPeriod("monthly")}
                                      className={`${
                                        period === "monthly"
                                          ? "bg-mainColor text-white"
                                          : "bg-gray-400"
                                      } text-black px-3 py-2 font-semibold mb-5`}
                                    >
                                      {t("monthly")}
                                    </button>
                                  </div>
                                )}
                                {/* price based on annually or monthly */}
                                {period === "annually" && (
                                  <p className="text-3xl font-bold text-gray-500">
                                    {pack?.price_EGP}
                                    {pack?.id === 2 && (
                                      <div>
                                        <h4 className="text-mainColor text-lg">
                                          <del>2400.00 {t("egp")}</del>
                                        </h4>
                                      </div>
                                    )}
                                    {pack?.id === 3 && (
                                      <div>
                                        <h4 className="text-mainColor text-lg">
                                          <del>6000.00 {t("egp")}</del>
                                        </h4>
                                      </div>
                                    )}
                                  </p>
                                )}
                                {period === "monthly" && (
                                  <p className="text-3xl font-bold text-gray-500">
                                    {pack?.id === 2 && (
                                      <div>
                                        <h2>99.00 {t("egp")}</h2>
                                        <h4 className="text-mainColor text-lg">
                                          <del>200.00 {t("egp")}</del>
                                        </h4>
                                      </div>
                                    )}
                                    {pack?.id === 3 && (
                                      <div>
                                        <h2>150.00 {t("egp")}</h2>
                                        <h4 className="text-mainColor text-lg">
                                          <del>300.00 {t("egp")}</del>
                                        </h4>
                                      </div>
                                    )}
                                    {pack?.id === 1 && "0.00" + t("egp")}
                                  </p>
                                )}
                              </div>
                            </div>
                            {/* feature */}
                            <ul className="mt-8 space-y-4 capitalize">
                              {(i18n.language === "en"
                                ? pack.features
                                : pack.features_ar
                              )?.map((feature, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-center text-lg font-semibold"
                                >
                                  <svg
                                    className="h-5 w-5 text-secondColor mr-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-gray-100 px-6 py-4">
                            <button
                              onClick={() => {
                                if (period === "annually") {
                                  payGeidea(pack?.price_EGP, pack?.id);
                                } else if (period === "monthly") {
                                  if (pack?.id == 2) {
                                    payGeidea(99.0, pack?.id);
                                  } else if (pack?.id == 3) {
                                    payGeidea(150.0, pack?.id);
                                  } else if (pack?.id == 1) {
                                    createSubscription(pack?.id);
                                  }
                                }
                              }}
                              className="flex items-center justify-center gap-3 text-xl font-semibold bg-mainColor hover:bg-secondColor text-white px-6 py-2 rounded-md w-full transition-all duration-300"
                            >
                              {pack?.id == 1 ? t("subscribeNow") : t("buyNow")}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
