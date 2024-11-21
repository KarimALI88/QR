import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../context/AppContext";
import { Select, Option, Spinner } from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Renew = ({ user }) => {
  const { token } = useContext(AppContext);
  const [packageNumber, setPackageNumber] = useState("1");
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const [amount, setAmount] = useState("");

  const getPackages = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/packages`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      // console.log("packages", data);
      setPackages(data);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    getPackages();
  }, []);

  const onSuccess = () => {
    console.log("pay success");
    // createSubscribtion();
    renew();
    navigate("/");
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

  const payGeidea = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_LINK}/payment/initiate`,
        data: {
          amount: amount,
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

  const alertCheck = () => {
    if (packageNumber <= user?.pivot?.package_id) {
      toast.error("the package must be more");
    } else {
      Swal.fire({
        title: "Do you want to upgrade?",
        text: "You will upgrade to above package",
        showCancelButton: true,
        confirmButtonText: "Renew",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          payGeidea();
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  };

  const renew = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_LINK}/Upgrade-package`,
        data: {
          package_id: packageNumber,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response ", response);
      toast.success("Renwed successfully");
      setLoading(false);
    } catch (error) {
      console.error("error in ", error);
      toast.error("Error in renewing");
      setLoading(false);
    }
  };

  const handleChangeSelect = (val) => {
    setPackageNumber(val);
    packages.find((pack) => pack.id === val && setAmount(pack.price_EGP));
  };

  return (
    <div>
      <h1 className="text-center font-black text-5xl text-mainColor">
        Upgrade Packages by {amount}
      </h1>

      {/* inputs */}
      <div>
        {/* package number */}
        <div>
          <h3 className="my-5 text-2xl font-medium">Select Package</h3>
          <Select
            id="font-select"
            label="Select Package"
            onChange={(val) => handleChangeSelect(val)}
            value={packageNumber}
            className="h-[60px]"
          >
            {packages.map((pack, index) => (
              <Option
                key={index}
                value={pack.id}
                className="capitalize text-black text-lg font-semibold"
              >
                {pack.name}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      {/* submit */}
      <div>
        <button
          onClick={alertCheck}
          className="bg-mainColor px-5 py-3 font-semibold text-white hover:bg-secondColor block my-10"
        >
          {loading ? <Spinner /> : "Upgrade " + amount}
        </button>
      </div>
    </div>
  );
};

export default Renew;
