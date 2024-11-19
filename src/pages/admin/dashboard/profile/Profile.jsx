import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaAddressCard } from "react-icons/fa";
import { GoPackageDependencies } from "react-icons/go";
import { AppContext } from "./../../../../context/AppContext";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const { token } = useContext(AppContext);

  // console.log("token ", token)

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
      console.log("response in profile", response)
      setProfile(response.data.user_data)
    } catch (error) {
      console.error("error  in profile data", error);
    }
  };

  useEffect(() => {
    token && getUserData()
  }, [token])
  return (
    <div>
      {/* user info */}
      <div className="my-10">
        <h4 className="text-mainColor font-black text-2xl my-5 flex gap-3 items-center">
          <FaAddressCard size={30} />
          User Info
        </h4>
        <div className="flex gap-3 justify-start flex-wrap">
          <div className="flex gap-3 my-3 px-5">
            <h5 className="text-xl font-semibold">Name: </h5>
            <h6 className="text-lg font-medium text-gray-800">{profile?.name}</h6>
          </div>
          <div className="flex gap-3 my-3 px-5">
            <h5 className="text-xl font-semibold">Email: </h5>
            <h6 className="text-lg font-medium text-gray-800">
              {profile?.email}{" "}
            </h6>
          </div>
          <div className="flex gap-3 my-3 px-5">
            <h5 className="text-xl font-semibold">Phone: </h5>
            <h6 className="text-lg font-medium text-gray-800">{profile?.phone}</h6>
          </div>
          <div className="flex gap-3 my-3 px-5">
            <h5 className="text-xl font-semibold">Address: </h5>
            <h6 className="text-lg font-medium text-gray-800">Cairo</h6>
          </div>
        </div>
      </div>
      {/* --------------------------------------------------------------- */}
      {/* Subscribtion info */}
      <div className="my-10">
        <h4 className="text-mainColor font-black text-2xl my-5 flex gap-3 items-center">
          <GoPackageDependencies size={30} />
          Subscribtion Info
        </h4>
        <div className="flex gap-3 justify-start flex-wrap">
          <div className="flex gap-3 my-3 px-5">
            <h5 className="text-xl font-semibold">Package Name: </h5>
            <h6 className="text-lg font-medium text-gray-800">
              {profile?.name && profile?.user_packages[0]?.name}
            </h6>
          </div>
          <div className="flex gap-3 my-3 px-5">
            <h5 className="text-xl font-semibold">Qr Limit: </h5>
            <h6 className="text-lg font-medium text-gray-800">{profile?.name && profile?.user_packages[0]?.qrcode_limit}</h6>
          </div>
          <div className="flex gap-3 my-3 px-5">
            <h5 className="text-xl font-semibold">Start Date: </h5>
            <h6 className="text-lg font-medium text-gray-800">{profile?.name && profile?.user_packages[0]?.start_date}</h6>
          </div>
          <div className="flex gap-3 my-3 px-5">
            <h5 className="text-xl font-semibold">End Date: </h5>
            <h6 className="text-lg font-medium text-gray-800">{profile?.name && profile?.user_packages[0]?.end_date}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
