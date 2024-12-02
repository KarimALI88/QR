import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaAddressCard } from "react-icons/fa";
import { GoPackageDependencies } from "react-icons/go";
import { AppContext } from "./../../../../context/AppContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [showButton, setShowButton] = useState(false);
  const [showWarning, setShowWarning] = useState(false)
  const { token } = useContext(AppContext);

  const getUserData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_API_LINK}/user_info`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response in profile", response);
      setProfile(response.data.user_data);
    } catch (error) {
      console.error("error in profile data", error);
    }
  };

  useEffect(() => {
    token && getUserData();
  }, [token]);

  useEffect(() => {
    if (profile?.user_packages?.[0]?.end_date) {
      const today = new Date();
      const endDate = new Date(profile.user_packages[0].end_date);
  
      // Calculate the difference in time between the dates
      const timeDifference = endDate.getTime() - today.getTime();
      
      // Convert time difference to days
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
  
      if (daysDifference <= 0) {
        console.log("Package ended");
        setShowButton(true);
      } else if (daysDifference <= 5) {
        console.log("Package near ended");
        setShowWarning(true)
      } else {
        console.log("Package not ended");
      }
    }
  }, [profile]);
  

  return (
    <div>
      {/* User Info */}
      <div className="my-10">
        <h4 className="text-mainColor font-black text-2xl my-5 flex gap-3 items-center">
          <FaAddressCard size={30} />
          User Info
        </h4>
        <div className="flex gap-3 justify-start flex-wrap">
          <div className="flex gap-3 my-3 px-5">
            <h5 className="text-xl font-semibold">Name: </h5>
            <h6 className="text-lg font-medium text-gray-800">
              {profile?.name}
            </h6>
          </div>
          <div className="flex gap-3 my-3 px-5">
            <h5 className="text-xl font-semibold">Email: </h5>
            <h6 className="text-lg font-medium text-gray-800">
              {profile?.email}
            </h6>
          </div>
          <div className="flex gap-3 my-3 px-5">
            <h5 className="text-xl font-semibold">Phone: </h5>
            <h6 className="text-lg font-medium text-gray-800">
              {profile?.phone}
            </h6>
          </div>
          <div className="flex gap-3 my-3 px-5">
            <h5 className="text-xl font-semibold">Address: </h5>
            <h6 className="text-lg font-medium text-gray-800">Cairo</h6>
          </div>
        </div>
      </div>

      {/* Subscription Info */}
      <div className="my-10">
        <h4 className="text-mainColor font-black text-2xl my-5 flex gap-3 items-center">
          <GoPackageDependencies size={30} />
          Subscription Info
        </h4>
        <div className="flex gap-3 justify-start flex-wrap">
          <div className="flex gap-3 my-3 px-5">
            <h5 className="text-xl font-semibold">Package Name: </h5>
            <h6 className="text-lg font-medium text-gray-800">
              {profile?.user_packages?.[0]?.name}
            </h6>
            {profile?.user_packages?.[0]?.name != "All in one" && <Link to={"/admin/upgrade"} className="text-xl text-mainColor">Upgrade</Link>}
          </div>
          <div className="flex gap-3 my-3 px-5">
            <h5 className="text-xl font-semibold">Qr Limit: </h5>
            <h6 className="text-lg font-medium text-gray-800">
              {profile?.user_packages?.[0]?.qrcode_limit}
            </h6>
          </div>
          <div className="flex gap-3 my-3 px-5">
            <h5 className="text-xl font-semibold">Start Date: </h5>
            <h6 className="text-lg font-medium text-gray-800">
              {profile?.user_packages?.[0]?.start_date}
            </h6>
          </div>
          <div className="flex gap-3 my-3 px-5">
            <h5 className="text-xl font-semibold">End Date: </h5>
            <h6 className="text-lg font-medium text-gray-800">
              {profile?.user_packages?.[0]?.end_date}
            </h6>
          </div>
          {showButton && (
            <div
              role="alert"
              class="mb-4 relative flex w-1/2 p-3  text-black bg-red-900 rounded-md text-lg"
            >
              You should renew now <Link to={"/admin/renew"} className="ml-2 text-white">Renew</Link>
            </div>
          )}
          {showWarning && (
            <div
              role="alert"
              class="mb-4 relative flex w-1/2 p-3  text-black bg-yellow-900 rounded-md text-lg"
            >
              Your package will be end in 5 days 
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
