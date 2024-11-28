import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../context/AppContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";

const Renew = ({ user }) => {
  const { token } = useContext(AppContext);
  const [packageNumber, setPackageNumber] = useState("1");
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const [amount, setAmount] = useState("");
  const [pendingAlertCheck, setPendingAlertCheck] = useState(false);
  const [period, setPeriod] = useState("monthly");

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
    if (pendingAlertCheck) {
      alertCheck();
      setPendingAlertCheck(false);
    }
  }, [packageNumber, amount, pendingAlertCheck]);

  const alertCheck = () => {
    if (packageNumber <= user?.pivot?.package_id) {
      toast.error("The package must be more");
    } else {
      Swal.fire({
        title: "Do you want to upgrade?",
        text: "You will upgrade to a higher package",
        showCancelButton: true,
        confirmButtonText: "Renew",
      }).then((result) => {
        if (result.isConfirmed) {
          payGeidea();
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  };

  const payGeidea = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_LINK}/payment/initiate`,
        data: { amount },
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoading(false);
      if (response.data.sessionId) {
        payHpp(response.data.sessionId);
      }
    } catch (error) {
      console.error("error in pay", error);
      setLoading(false);
    }
  };

  const payHpp = (sessionId) => {
    const payment = new GeideaCheckout(onSuccess, onError, onCancel);
    payment.startPayment(sessionId);
  };

  const onSuccess = () => {
    console.log("pay success");
    renew();
  };

  const onError = () => {
    console.log("pay error");
  };

  const onCancel = () => {
    console.log("pay cancel");
  };

  const renew = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_LINK}/Upgrade-package`,
        data: { package_id: packageNumber },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Renewed successfully");
      setLoading(false);
    } catch (error) {
      console.error("error in renewing", error);
      toast.error("Error in renewing");
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-center font-black text-5xl text-mainColor">
        Upgrade Packages by {amount}
      </h1>

      <div className="w-full">
        <div className="flex flex-wrap justify-center items-center gap-10 sm:flex-col lg:flex-row w-full">
          {packages.map((pack, index) => (
            <div key={index}>
              <div
                className={`bg-white shadow-sm rounded-lg my-14 overflow-hidden ${
                  index === 0 && "hidden"
                } h-fit w-[250px] mx-auto border-mainColor border-solid border-2 flex flex-col ${
                  index === 2 ? "scale-110 border-secondColor border-4" : ""
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
                          {pack?.price_EGP}
                          {pack?.id === 2 && (
                            <div>
                              <h4 className="text-mainColor text-lg">
                                <del>2400.00 EGP</del>
                              </h4>
                            </div>
                          )}
                          {pack?.id === 3 && (
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
                          {pack?.id == 2 && (
                            <div>
                              <h2>99.00 EGP</h2>
                              <h4 className="text-mainColor text-lg">
                                <del>200.00 EGP</del>
                              </h4>
                            </div>
                          )}
                          {pack?.id == 3 && (
                            <div>
                              <h2>150.00 EGP</h2>
                              <h4 className="text-mainColor text-lg">
                                <del>300.00 EGP</del>
                              </h4>
                            </div>
                          )}
                          {pack?.id == 1 && "0.00" + " EGP"}
                        </p>
                      )}
                    </div>
                  </div>
                  <ul className="mt-8 space-y-4 capitalize">
                    {pack?.features?.map((feature, index) => (
                      <li
                        key={index}
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
                      setPackageNumber(pack?.id);
                      setAmount(
                        period === "annually"
                          ? pack?.price_EGP
                          : period === "monthly" && pack?.id === 2
                          ? 99
                          : 150
                      );
                      setPendingAlertCheck(true);
                    }}
                    className="w-full min-w-[90%] mx-auto block text-center bg-mainColor hover:bg-secondColor text-white font-bold py-3 px-6 rounded"
                  >
                    {period === "annually"
                      ? `Pay ${pack?.price_EGP}`
                      : pack?.id === 2
                      ? `Pay 99.00`
                      : pack?.id === 3
                      ? "Pay 150.00"
                      : "Pay 0.00"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Renew;
