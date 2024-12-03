import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AppContext } from "../../../../context/AppContext";
import { toast } from "react-toastify";

const RenewPackage = ({ user }) => {
  const { token } = useContext(AppContext);
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState("");
  const [packages, setPackages] = useState([]);
  const [packageNum, setPackageNum] = useState(0);
  const [renewPrice, setRenewPrice] = useState();
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
            period === "anually"
              ? 0
              : period === "monthly"
              ? user?.pivot?.package_id == 2 && 100
              : user?.pivot?.package_id == 3 && 150,
        },
      });
      console.log("response of renew price", response);
      response.data && setRenewPrice(response.data.new_price);
    } catch (error) {
      console.error("error in getting renew price");
    }
  };

  useEffect(() => {
    user?.pivot?.package_id && getRenewPrice();
  }, [user]);

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
    check && renewDurationApi();
    !check && renewQRLimitsApi();
    navigate("/admin/renew");
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
      console.log("response of renew", response);
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
        // payGeidea(user?.price_EGP);
        user?.pivot?.package_id == 3 &&
          period === "annually" &&
          payGeidea(user?.price_EGP);
        user?.pivot?.package_id == 2 &&
          period === "annually" &&
          payGeidea(user?.price_EGP);
        user?.pivot?.package_id == 3 && period === "monthly" && payGeidea(150);
        user?.pivot?.package_id == 2 && period === "monthly" && payGeidea(99);
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
            ? 50
            : user?.pivot?.package_id == 3
            ? 75
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
          qrcode_limit: "20",
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
      response.data.message && check && renewDuration();
    } catch (error) {
      console.error("error in check subscribtion", error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (check && period) {
      checkSubscribtion(check, period);
    }
  }, [check, period]);

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
                  {period === "annually" && (
                    <p className="text-3xl font-bold text-gray-500">
                      {packages[packageNum]?.price_EGP}
                      {packages[packageNum]?.id === 2 && (
                        <div>
                          <h4 className="text-mainColor text-lg">
                            <del>2400.00 EGP</del>
                          </h4>
                        </div>
                      )}
                      {packages[packageNum]?.id === 3 && (
                        <div>
                          <h4 className="text-mainColor text-lg">
                            <del>6000.00 EGP</del>
                          </h4>
                        </div>
                      )}
                    </p>
                  )}
                  {period === "monthly" && (
                    <p className="text-3xl font-bold text-gray-500">
                      {packages[packageNum]?.id == 2 && (
                        <div>
                          <h2>99.00 EGP</h2>
                          <h4 className="text-mainColor text-lg">
                            <del>200.00 EGP</del>
                          </h4>
                        </div>
                      )}
                      {packages[packageNum]?.id == 3 && (
                        <div>
                          <h2>150.00 EGP</h2>
                          <h4 className="text-mainColor text-lg">
                            <del>300.00 EGP</del>
                          </h4>
                        </div>
                      )}
                      {packages[packageNum]?.id == 1 && "0.00" + " EGP"}
                    </p>
                  )}
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
              <div className="my-3">
                <button
                  onClick={() => {
                    setCheck(true);
                    setPeriod("annually");
                  }}
                  className="w-full min-w-[90%] mx-auto block text-center bg-mainColor hover:bg-secondColor text-white font-bold py-3 px-6 rounded"
                >
                  Renew Year by {`${user?.price_EGP}`} EGP
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    setCheck(true);
                    setPeriod("monthly");
                  }}
                  className="w-full min-w-[90%] mx-auto block text-center bg-mainColor hover:bg-secondColor text-white font-bold py-3 px-6 rounded"
                >
                  Renew Month by {user?.pivot?.package_id === 2 ? "99" : "150"}{" "}
                  EGP
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* ---------------------------------------------------------------------- */}
        <div className="bg-white px-5 shadow-sm rounded-lg my-10 overflow-hidden h-fit w-[250px] mx-auto border-mainColor border-solid border-2 flex flex-col">
          <button
            onClick={() => {
              setCheck(false);
              renewQrLimits();
            }}
            className="bg-mainColor px-5 py-3 font-semibold text-white hover:bg-secondColor block my-10"
          >
            Renew QRs by{" "}
            {user?.pivot?.package_id == 2
              ? 50
              : user?.pivot?.package_id == 3
              ? 75
              : 0}{" "}
            EGP
          </button>
        </div>
        {/* ))} */}
      </div>
    </div>
  );
};

export default RenewPackage;
