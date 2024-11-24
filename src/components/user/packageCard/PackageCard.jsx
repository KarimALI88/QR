import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AppContext } from "../../../context/AppContext";
import { toast } from "react-toastify";
import { useInView } from "react-intersection-observer";
import AOS from "aos";
import "aos/dist/aos.css";

const PackageCard = ({
  title,
  price,
  savings,
  features,
  description,
  packageZero,
  country,
  price_dollar,
  index,
  user,
}) => {
  const navigate = useNavigate();
  const { token, setPackageId, packageId } = useContext(AppContext);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // console.log(packageId)

  const createSubscribtion = async () => {
    try {
      const response = await axios({
        method: "post",
        url: "https://backend.ofx-qrcode.com/api/subscriptions",
        data: {
          package_id: "1",
          duration: "year",
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("subscribe", response);
      navigate("/generate-qr");
    } catch (error) {
      console.error("error in subscribe", error);
      toast.error(error.response.data.message);
    }
  };

  const subscribePackageZero = () => {
    Swal.fire({
      title: "Are you sure to subscribe on this package?",
      text: "You will be subscribed in this package",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#053B5C",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Subscribe",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Subscribed!",
          text: "Now Can Generate your QR code",
          icon: "success",
        });
        createSubscribtion();
      }
    });
  };

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <div
      ref={ref}
      data-aos="fade-up"
      className={`bg-white shadow-sm rounded-lg my-10 overflow-hidden h-fit w-[250px] mx-auto border-mainColor border-solid border-2 flex flex-col transition-opacity duration-700 ${
        inView ? "opacity-100" : "opacity-0"
      } ${index === 2 ? "scale-110 border-secondColor border-4" : ""} ${
        index === 1 ? "scale-105" : ""
      }`}
    >
      <div className="px-6 py-8 flex-grow">
        <div className="flex flex-col justify-between gap-4">
          <h2 className="text-2xl font-bold text-mainColor capitalize">
            {title}
          </h2>
          <p className="text-xl font-semibold text-gray-400">{description}</p>
          <p className="text-3xl font-bold text-gray-500">
            {country === "Egypt" ? price : price_dollar + "$"}
          </p>
        </div>
        {/* <p className="text-gray-500 mt-2">
          <span className="text-green-500 font-bold">{savings}</span> SAVE
        </p> */}
        <ul className="mt-8 space-y-4 capitalize">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-lg font-semibold">
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
        {!user?.pivot?.package_id ? (
          <Link
            to={packageZero ? "/generate-qr" : "qr"}
            onClick={() => {
              setPackageId(`${index + 1}`);
              index === 0 && localStorage.setItem("lg", "a1");
              index === 1 && localStorage.setItem("lg", "b2");
              index === 2 && localStorage.setItem("lg", "c3");
            }}
            className="w-full min-w-[90%] mx-auto block text-center bg-mainColor hover:bg-secondColor text-white font-bold py-3 px-6 rounded"
          >
            View
          </Link>
        ) : (
          <Link
            to={"/admin/my-qrs"}
            className="w-full min-w-[90%] mx-auto block text-center bg-mainColor hover:bg-secondColor text-white font-bold py-3 px-6 rounded"
          >
            View
          </Link>
        )}
      </div>
    </div>
  );
};

export default PackageCard;
