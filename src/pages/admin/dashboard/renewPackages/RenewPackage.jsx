import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AppContext } from "../../../../context/AppContext";
import { toast } from "react-toastify";
import extraQr from "../../../../assets/imgs/extraqr.jpg";
import { useNavigate } from "react-router-dom";

const RenewPackage = ({ user }) => {
  const { token } = useContext(AppContext);
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState("annually");
  const [packages, setPackages] = useState([]);
  const [packageNum, setPackageNum] = useState(0);
  const [renewPrice, setRenewPrice] = useState(0);
  const navigate = useNavigate();
  // console.log("user", user);

  const getRenewPrice = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_LINK}/new_price/maxqr`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          price_qr:
            user?.pivot?.package_id == 2
              ? 50
              : user?.pivot?.package_id == 3
              ? 75
              : 0,
          price_monthly:
            period === "annually"
              ? 0
              : period === "monthly"
              ? user?.pivot?.package_id == 2
                ? 100
                : user?.pivot?.package_id == 3
                ? 150
                : 0 // Default to 0 if none match
              : 0, // Default to 0 if period isn't "annually" or "monthly"
        },
      });
      console.log("response of renew price", response);
      response.data && setRenewPrice(response.data.new_price);
    } catch (error) {
      console.error("error in getting renew price", error);
    }
  };

  useEffect(() => {
    user?.pivot?.package_id && getRenewPrice();
  }, [user, period]);

  const getPackages = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/packages`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setPackages(data);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    getPackages();
  }, []);

  useEffect(() => {
    user?.pivot?.package_id == 1 && setPackageNum(0);
    user?.pivot?.package_id == 2 && setPackageNum(1);
    user?.pivot?.package_id == 3 && setPackageNum(2);
  }, [user]);

  const onSuccess = () => {
    console.log("pay success");
    check === true ? renewDurationApi() : renewQRLimitsApi();
    navigate("/admin/profile");
  };

  const onError = () => {
    console.log("pay error");
  };

  const onCancel = () => {
    console.log("pay cancel");
  };

  const payment = new GeideaCheckout(onSuccess, onError, onCancel);

  const payHpp = (sessionId) => {
    payment.startPayment(sessionId);
  };

  const payGeidea = async (price) => {
    setLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_LINK}/payment/initiate`,
        data: {
          amount: price,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response of pay", response);
      setLoading(false);
      if (response.data.sessionId) {
        payHpp(response.data.sessionId);
      }
    } catch (error) {
      console.error("error in pay", error);
      setLoading(false);
    }
  };

  const renewDurationApi = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_LINK}/Upgrade-QR-Duration`,
        data: {
          duration: period === "annually" ? "year" : "month",
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response of renew duration", response);
      Swal.fire("Renewe!", "", "success");
    } catch (error) {
      console.error("error in duration api", error);
      toast.error(error.response.data.message);
    }
  };

  const renewDuration = async () => {
    Swal.fire({
      title: "Do you want to renew package duration?",
      text: "You will renew duration only",
      showCancelButton: true,
      confirmButtonText: "Renew",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        payGeidea(1);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const renewQrLimits = async () => {
    Swal.fire({
      title: "Do you want to renew 2 QR through same period of your subscribe?",
      text: "You will renew number of QRs only",
      showCancelButton: true,
      confirmButtonText: "Renew",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setCheck(false);
        payGeidea(
          user?.pivot?.package_id == 2
            ? 1
            : user?.pivot?.package_id == 3
            ? 1
            : 0
        );
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const renewQRLimitsApi = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_LINK}/Upgrade-QRlimit`,
        data: {
          qrcode_limit: 2,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response of renew", response);
      Swal.fire("Renewe!", "", "success");
    } catch (error) {
      console.error("error in duration api", error);
      toast.error(error.response.data.message);
    }
  };

  const checkSubscribtion = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_API_LINK}/check-subscription-status`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response of check", response);
      // response.data.message === 200 && !check && renewQrLimits()
      if (response.data.message) {
        setCheck(true);
        renewDuration();
      }
    } catch (error) {
      console.error("error in check subscribtion", error);
      toast.error(error.response.data.message);
    }
  };

  // useEffect(() => {
  //   if (check && period) {
  //     checkSubscribtion(check, period);
  //   }
  // }, [check]);

  return (
    <div>
      <div className="flex flex-wrap justify-center items-start gap-5 sm:flex-col lg:flex-row w-full">
        {/* {packages.map((pack, index) => ( */}
        <div>
          <div
            className={`bg-white shadow-sm rounded-lg my-10 overflow-hidden h-fit w-[250px] mx-auto border-mainColor border-solid border-2 flex flex-col transition-opacity duration-700 `}
          >
            <div className="px-6 py-8 flex-grow">
              <div className="flex flex-col justify-between gap-4">
                <h2 className="text-2xl font-bold text-mainColor capitalize">
                  {packages[packageNum]?.name}
                </h2>
                <p className="text-xl font-semibold text-gray-400">
                  {packages[packageNum]?.description}
                </p>
                <div>
                  {!(packages[packageNum]?.id === 1) && (
                    <div className="flex gap-3 items-center justify-center">
                      <button
                        onClick={() => setPeriod("annually")}
                        className={`${
                          period === "annually"
                            ? "bg-mainColor text-white"
                            : "bg-gray-400"
                        } text-black px-3 py-2 font-semibold mb-5`}
                      >
                        Annualy
                      </button>
                      <button
                        onClick={() => setPeriod("monthly")}
                        className={`${
                          period === "monthly"
                            ? "bg-mainColor text-white"
                            : "bg-gray-400"
                        } text-black px-3 py-2 font-semibold mb-5`}
                      >
                        Monthly
                      </button>
                    </div>
                  )}
                  {/* price based on annually or monthly */}

                  <p className="text-3xl font-bold text-gray-500">
                    {/* {packages[packageNum]?.price_EGP} */}
                    {renewPrice} EGP
                  </p>
                </div>
              </div>
              {/* feature */}
              <ul className="mt-8 space-y-4 capitalize">
                {packages[packageNum]?.features?.map((feature, idx) => (
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
                  setCheck(true);
                  // setPeriod("annually");
                  checkSubscribtion()
                }}
                className="w-full min-w-[90%] mx-auto block text-center bg-mainColor hover:bg-secondColor text-white font-bold py-3 px-6 rounded"
              >
                Renew
              </button>
            </div>
          </div>
        </div>
        {/* ---------------------------------------------------------------------- */}
        <div className="bg-white px-5 shadow-sm rounded-lg my-10 overflow-hidden h-fit w-[250px] mx-auto border-mainColor border-solid border-2 flex flex-col">
          <img
            src={extraQr}
            alt="qr image"
            className="my-5 mx-auto w-[90%] h-52"
          />
          <button
            onClick={() => {
              setCheck(false);
              renewQrLimits()
            }}
            className="w-full min-w-[90%] mx-auto block text-center bg-mainColor hover:bg-secondColor text-white font-bold py-3 px-6 rounded my-3"
          >
            increas 2 QRs by {" "}
            {user?.pivot?.package_id == 2
              ? 50
              : user?.pivot?.package_id == 3
              ? 75
              : 0} {" "}
            EGP
          </button>
        </div>
        {/* <button onClick={getRenewPrice}>test </button> */}
        {/* ))} */}
      </div>
    </div>
  );
};

export default RenewPackage;
