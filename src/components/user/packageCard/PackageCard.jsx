import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { AppContext } from '../../../context/AppContext';
import { toast } from "react-toastify";

const PackageCard = ({ title, price, savings, features, description, packageZero, country, price_dollar }) => {
  const navigate = useNavigate()
  const {token} = useContext(AppContext)

  const createSubscribtion = async () => {
    try {
      const response = await axios({
        method:"post",
        url:"https://backend.ofx-qrcode.com/api/subscriptions",
        data:{
          package_id: '1',
          duration: "year"
        },
        headers: {
          "Content-Type": "application/json",
          Authorization : `Bearer ${token}`
        }
      })
      console.log("subscribe", response)
      navigate("/generate-qr")
    } catch (error) {
      console.error("error in subscribe", error)
      toast.error(error.response.data.message)
    }
  }

  const subscribePackageZero = () => {
    Swal.fire({
      title: "Are you sure to subscribe on this package?",
      text: "You will be subscribed in this package",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#053B5C",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Subscribe"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Subscribed!",
          text: "Now Can Generate your QR code",
          icon: "success"
        });
        createSubscribtion()
      }
    });
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden max-w-[300px] mx-auto my-3 border-mainColor border-solid border-2">
      <div className="px-6 py-8">
        <div className="flex flex-col justify-between gap-4">
          <h2 className="text-2xl font-bold text-mainColor">{title}</h2>
          <p className="text-xl font-semibold text-gray-400">{description}</p>
          <p className="text-3xl font-bold text-gray-500">{country == "Egypt" ? price : price_dollar + "$"}</p>
        </div>
        <p className="text-gray-500 mt-2">
          <span className="text-green-500 font-bold">{savings}</span> SAVE
        </p>
        <ul className="mt-8 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
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
        <button onClick={packageZero ? subscribePackageZero : () => navigate("/payment")} className="w-full bg-mainColor hover:bg-secondColor text-white font-bold py-3 px-6 rounded">
          {packageZero ? "Subscribe" : "Buy Now"}
        </button>
      </div>
      
    </div>
  );
};

export default PackageCard;
