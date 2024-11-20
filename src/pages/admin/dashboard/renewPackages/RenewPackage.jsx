import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AppContext } from "../../../../context/AppContext";
import { toast } from "react-toastify";

const RenewPackage = ({ user }) => {
  const { token } = useContext(AppContext);
  const [check, setCheck] = useState(false)
  const [loading, setLoading] = useState(false)
  console.log("user", user);

  const onSuccess = () => {
    console.log("pay success");
    check && renewDurationApi();
    !check && renewQRLimitsApi()
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
          duration: "year",
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
        payGeidea(user?.price_EGP);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const renewQrLimits = async () => {
    Swal.fire({
      title: "Do you want to renew 20 QR?",
      text: "You will renew number of QRs only",
      showCancelButton: true,
      confirmButtonText: "Renew",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setCheck(false)
        payGeidea(3000);
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
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            }
        })
        console.log("response of check", response)
        // response.data.message === 200 && !check && renewQrLimits()
        response.data.message  && check && renewDuration()
    } catch (error) {
        console.error("error in check subscribtion", error)
        toast.error(error.response.data.message)
    }
  }


//   useEffect(() => {
//     token && checkSubscribtion()
//   }, [token])

  return (
    <div>
      <div className="flex flex-wrap justify-start items-center gap-10">
        <div>
          <button
            onClick={() => {
                setCheck(true)
                checkSubscribtion()
            }}
            className="bg-mainColor px-5 py-3 font-semibold text-white hover:bg-secondColor block my-10"
          >
            Renew Duration by {`${user?.price_EGP}`} EGP
          </button>
        </div>

        <div>
          <button
            onClick={() => {
                setCheck(false)
                renewQrLimits()
            }}
            className="bg-mainColor px-5 py-3 font-semibold text-white hover:bg-secondColor block my-10"
          >
            Renew QRs by 3000 EGP
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenewPackage;
