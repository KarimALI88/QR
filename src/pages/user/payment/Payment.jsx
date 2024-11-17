import React, { useContext, useState } from "react";
import MainNavbar from "../../../components/user/navbar/MainNavbar";
import { Dialog } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import axios from "axios";
import { AppContext } from "./../../../context/AppContext";
import { Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Select, Option } from "@material-tailwind/react";
import geidea from "../../../assets/imgs/geidea.png";

const Payment = ({ user }) => {
  const [activeSection, setActiveSection] = useState("geidea");
  const [packageNumber, setPackageNumber] = useState("");
  const [activationCode, setActivationCode] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const { token } = useContext(AppContext);
  const packages = [
    { package_id: "1", package_name: "free" },
    { package_id: "2", package_name: "middle" },
    { package_id: "3", package_name: "advanced" },
  ];
  const navigate = useNavigate();

  // const onSuccess = () => {
  //   console.log("payment success")
  // }
  // const onError = () => {
  //   console.log("payment error");

  // }
  // const onCancel = () => {
  //   console.log("payment cancellation");

  // }

  const payGeidea = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_LINK}/create-payment-link`,
        data: {
          amount: 200,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response of pay", response);
      if (response.data.data.paymentIntent.link) {
        window.open(response.data.data.paymentIntent.link, "_blank");
      }
    } catch (error) {
      console.error("error in pay", error);
    }
  };

  const handleOpen = () => setOpenModal(!openModal);

  const createSubscribtion = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_LINK}/subscriptions`,
        data: {
          package_id: packageNumber,
          duration: "year",
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("subscribe", response);
    } catch (error) {
      console.error("error in subscribe", error);
      toast.error(error.response.data.message);
    }
  };

  const activeVcash = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_LINK}/codes/validate`,
        data: {
          package_id: packageNumber,
          code: activationCode,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      createSubscribtion();
      console.log("activation resp", response);
      setLoading(false);
      setMessage("successfully");
      setSuccess(true);
      navigate("/qr");
    } catch (error) {
      console.error("error in api", error);
      setLoading(false);
      setMessage(error.response.data.message);
      setSuccess(false);
    }
  };

  return (
    <div>
      <MainNavbar />
      <div className="py-5 px-10">
        <h1 className="text-center text-4xl text-mainColor font-black my-5">
          Payment Methods
        </h1>

        {/* payment methods */}
        <div className="flex justify-center gap-8 items-center my-10 mx-auto flex-wrap">
          {/* <button
            className={`flex gap-2 items-center py-2 px-5 text-center text-2xl font-black `}
            onClick={() => setActiveSection("vodafone")}
          >
            <img
              src="https://storage.faydety.com/images/blogs/images/melwmat_aktr_en_fwdafwn_kash_wazay_astlf_mn_vodafone_cash_8364b32049.webp"
              alt="vodafone cash"
              className="w-[150px] h-[80px]"
            />{" "}
          </button> */}
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

        {user && user?.pivot?.package_id ? (
          <>
            <h2 className="text-center my-5 mx-auto text-xl font-semibold">
              You have already an account
            </h2>
          </>
        ) : (
          <>
            {/* geidea section */}
            {activeSection === "geidea" && (
              <div className="my-10 mx-auto w-[80%]">
                {/* <h2 className="text-center text-black text-4xl my-10 ">Coming Soon</h2> */}
                <div className="max-w-[350px] max-h-[300px] mx-auto my-5">
                  {/* <img
                    src="https://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg?t=st=1730367471~exp=1730371071~hmac=3aadf5dc530557805e925296fbf452027c5eb39a0e7388048294bf7aecec5f70&w=740"
                    alt="image for payment"
                  /> */}
                  <button
                    onClick={payGeidea}
                    className="bg-mainColor w-40 px-5 py-3 font-semibold text-white hover:bg-secondColor block mx-auto my-10"
                  >
                    Pay
                  </button>
                </div>
              </div>
            )}

            {/* vodafone section */}
            {activeSection === "vodafone" && (
              <div className="my-10 mx-auto w-[80%]">
                <div className="max-w-[350px] max-h-[300px] mx-auto my-5">
                  <img
                    src="https://img.freepik.com/free-vector/people-using-mobile-bank-remittance-money_74855-6617.jpg?t=st=1730367062~exp=1730370662~hmac=794beadac97b4cc92cfe382b81ea03be0e193ebf473fd6738904245596c6cd25&w=740"
                    alt="image for payment"
                  />
                </div>
                <h3 className="text-xl text-black text-center font-semibold">
                  please send money on this phone{" "}
                  <span className="text-mainColor text-2xl">01061472185</span>{" "}
                  by vodafone cash
                </h3>
                {/* activate code */}
                <div>
                  <button
                    onClick={handleOpen}
                    className="bg-mainColor px-5 py-5 font-semibold text-white hover:bg-secondColor block mx-auto my-10"
                  >
                    Active Account
                  </button>
                  <Dialog
                    open={openModal}
                    handler={handleOpen}
                    className="p-10 text-center"
                  >
                    <div className="my-10">
                      {message.length > 0 && (
                        <h4
                          className={`font-semibold text-xl my-10 ${
                            success === false ? "text-[red]" : "text-[green]"
                          }`}
                        >
                          {message}
                        </h4>
                      )}
                      {/* <Input 
                placeholder="package number"
                value={packageNumber}
                onChange={(e) => setPackageNumber(e.target.value)}
                className="appearance-none min-h-[60px] !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              /> */}
                      <Select
                        id="font-select"
                        label="Select Package"
                        onChange={(val) => setPackageNumber(val)}
                        value={packageNumber}
                        className="h-[60px]"
                      >
                        {packages.map((pack) => (
                          <Option
                            key={pack.package_id}
                            value={pack.package_id}
                            className="capitalize text-black text-lg font-semibold"
                          >
                            {pack.package_name}
                          </Option>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <Input
                        placeholder="activation code"
                        value={activationCode}
                        onChange={(e) => setActivationCode(e.target.value)}
                        className="appearance-none min-h-[60px] !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                    <button
                      onClick={activeVcash}
                      className="bg-mainColor px-3 py-3 w-full font-semibold text-white hover:bg-secondColor block mx-auto my-10"
                    >
                      {loading ? (
                        <Spinner className="mx-auto" />
                      ) : (
                        "Active an Account"
                      )}
                    </button>
                  </Dialog>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
