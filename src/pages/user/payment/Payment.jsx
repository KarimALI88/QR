import React, { useContext, useEffect, useState } from "react";
import MainNavbar from "../../../components/user/navbar/MainNavbar";
import { Dialog } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import axios from "axios";
import { AppContext } from "./../../../context/AppContext";
import { Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Select, Option } from "@material-tailwind/react";
import geidea from "../../../assets/imgs/geidea.png";
import { useInView } from "react-intersection-observer";
import Footer from "../../../components/user/footer/Footer";

const Payment = ({ user, setRefresh }) => {
  const [activeSection, setActiveSection] = useState("geidea");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const getPackages = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/packages`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setPackages(data);
    } catch (error) {
      console.error("error fetching packages", error);
    }
  };

  useEffect(() => {
    getPackages();
  }, []);

  const onSuccess = () => {
    console.log("Payment success");
    createSubscription();
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

  const payHpp = (sessionId) => {
    payment.startPayment(sessionId);
  };

  const payGeidea = async (selectedAmount, selectedPackageId) => {
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
        payHpp(response.data.sessionId);
      }
    } catch (error) {
      console.error("error in payment", error);
      setLoading(false);
    }
  };

  const createSubscription = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_LINK}/subscriptions`,
        data: {
          package_id: activeSection,
          duration: "year",
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

  return (
    <div>
      <MainNavbar />
      <div className="py-5 px-10 w-full">
        <h1 className="text-center text-4xl text-mainColor font-black my-5">
          Payment Methods
        </h1>

        {/* Payment Methods */}
        <div className="flex justify-center gap-8 items-center my-10 mx-auto flex-wrap">
          <button
            className={`py-2 px-5 text-center text-2xl font-black`}
            onClick={() => setActiveSection("geidea")}
          >
            <img
              src={geidea}
              alt="geidea"
              className="w-[200px] h-[100px] object-center"
            />
          </button>
        </div>

        {user &&
        (user?.pivot?.package_id === 2 || user?.pivot?.package_id === 3) ? (
          <h2 className="text-center my-5 mx-auto text-xl font-semibold">
            You already have an account
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
                          ref={ref}
                          data-aos="fade-up"
                          className={`bg-white shadow-sm rounded-lg my-10 overflow-hidden h-fit w-[250px] mx-auto border-mainColor border-solid border-2 flex flex-col transition-opacity duration-700 ${
                            inView ? "opacity-100" : "opacity-0"
                          } ${
                            index === 2
                              ? "scale-110 border-secondColor border-4"
                              : ""
                          } ${index === 1 ? "scale-105" : ""}`}
                        >
                          <div className="px-6 py-8 flex-grow">
                            <div className="flex flex-col justify-between gap-4">
                              <h2 className="text-2xl font-bold text-mainColor capitalize">
                                {pack?.name}
                              </h2>
                              <p className="text-xl font-semibold text-gray-400">
                                {pack?.description}
                              </p>
                              <p className="text-3xl font-bold text-gray-500">
                                {pack?.price_EGP}
                              </p>
                            </div>
                            <ul className="mt-8 space-y-4 capitalize">
                              {pack?.features?.map((feature, idx) => (
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
                              onClick={() =>
                                payGeidea(pack?.price_EGP, pack?.id)
                              }
                              className="w-full min-w-[90%] mx-auto block text-center bg-mainColor hover:bg-secondColor text-white font-bold py-3 px-6 rounded"
                            >
                              Pay {pack?.price_EGP}
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
