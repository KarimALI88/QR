import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../context/AppContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Renew = ({ user }) => {
  const { token } = useContext(AppContext);
  const [packageNumber, setPackageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const [amount, setAmount] = useState(0);
  const [pendingAlertCheck, setPendingAlertCheck] = useState(false);
  const [period, setPeriod] = useState("monthly");
  const navigate = useNavigate()
  const getPackages = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/packages`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format");
      }
      setPackages(data);
    } catch (error) {
      console.error("Error fetching packages:", error);
      toast.error("Failed to load packages.");
    }
  };

  useEffect(() => {
    getPackages();
  }, []);

  const getUpgradePrice = async (packageId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_LINK}/new_price`,
        {
          package_id: packageId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("upgrade price", response);
      setAmount(response.data?.price_to_pay || "N/A");
      // setAmount(1);
    } catch (error) {
      console.error("Error fetching upgrade price:", error);
    }
  };

  const handlePackageSelection = async (packId, period) => {
    setPeriod(period);
    setPackageNumber(packId);

    if (period === "annually") {
      await getUpgradePrice(packId); // Annual uses fetched amount
    } else {
      if (packId === 2) setAmount(99); // Monthly Package 2
      else if (packId === 3) setAmount(150); // Monthly Package 3
    }

    setPendingAlertCheck(true);
  };

  useEffect(() => {
    if (pendingAlertCheck) {
      alertCheck();
      setPendingAlertCheck(false);
    }
  }, [pendingAlertCheck]);

  const alertCheck = () => {
    if (!user?.pivot?.package_id || packageNumber <= user?.pivot?.package_id) {
      toast.error("Select a higher package to upgrade.");
      return;
    }
    Swal.fire({
      title: `Do you want to upgrade by ${amount} EGP?`,
      text: "You will upgrade to a higher package.",
      showCancelButton: true,
      confirmButtonText: "Upgrade",
    }).then((result) => {
      if (result.isConfirmed) {
        payGeidea();
      } else {
        Swal.fire("Upgrade cancelled", "", "info");
      }
    });
  };

  const payGeidea = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_LINK}/payment/initiate`,
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.sessionId) {
        payHpp(response.data.sessionId);
      } else {
        toast.error("Payment session failed to initialize.");
      }
    } catch (error) {
      console.error("Error in payment initialization:", error);
      toast.error("Payment error.");
    } finally {
      setLoading(false);
    }
  };

  const payHpp = (sessionId) => {
    const payment = new GeideaCheckout(onSuccess, onError, onCancel);
    payment.startPayment(sessionId);
  };

  const onSuccess = () => {
    console.log("Payment successful");
    renew();
  };

  const onError = () => {
    console.error("Payment error");
    toast.error("Payment failed.");
  };

  const onCancel = () => {
    console.log("Payment cancelled");
  };

  const renew = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_LINK}/Upgrade-package`,
        {
          package_id: packageNumber,
          duration: period === "annually" ? "year" : "month",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Upgraded successfully!");
    } catch (error) {
      console.error("Error during upgrade:", error);
      toast.error("Upgrade failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-center font-black text-5xl text-mainColor">
        Upgrade Packages
      </h1>
      <div className="w-full">
        <div className="flex flex-wrap justify-center items-center gap-10 sm:flex-col lg:flex-row w-full">
          {packages.length === 0 ? (
            <p className="text-center text-gray-500">No packages available.</p>
          ) : (
            packages.map((pack, index) => (
              <div key={index}>
                <div
                  className={`bg-white shadow-sm rounded-lg my-14 overflow-hidden h-fit w-[250px] mx-auto border-mainColor border-solid border-2 flex flex-col ${
                    index === 2 ? "scale-110 border-secondColor border-4" : ""
                  } ${index === 1 ? "scale-105" : ""} ${
                    index === 0 ? "hidden" : ""
                  }`}
                >
                  <div className="px-6 py-8 flex-grow">
                    <div className="flex flex-col justify-between gap-4">
                      <h2 className="text-2xl font-bold text-mainColor capitalize">
                        {pack?.name}
                      </h2>
                      <p className="text-xl font-semibold text-gray-400">
                        {pack?.description}
                      </p>
                    </div>
                    <ul className="mt-8 space-y-4 capitalize">
                      {pack?.features?.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
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
                        handlePackageSelection(pack?.id, "monthly")
                      }
                      className="w-full my-2 min-w-[90%] mx-auto block text-center bg-mainColor hover:bg-secondColor text-white font-bold py-3 px-6 rounded"
                    >
                      Upgrade Month
                    </button>
                    <button
                      onClick={() =>
                        handlePackageSelection(pack?.id, "annually")
                      }
                      className="w-full my-2 min-w-[90%] mx-auto block text-center bg-mainColor hover:bg-secondColor text-white font-bold py-3 px-6 rounded"
                    >
                      Upgrade Year
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {loading && <p className="text-center text-blue-500">Processing...</p>}
    </div>
  );
};

export default Renew;
