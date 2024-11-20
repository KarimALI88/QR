import React, { useContext, useState } from "react";
import { AppContext } from "../../../../context/AppContext";
import { Select, Option, Spinner } from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";

const Renew = ({user}) => {
  const { token } = useContext(AppContext);
  const [packageNumber, setPackageNumber] = useState("1");
  const [loading, setLoading] = useState(false)

  const packages = [
    { package_id: "1", package_name: "free" },
    { package_id: "2", package_name: "middle" },
    { package_id: "3", package_name: "advanced" },
  ];


//   console.log("user", user)

  const renew = async () => {
    setLoading(true)
    try {
        const response = await axios({
            method:"post",
            url:`${import.meta.env.VITE_API_LINK}/Upgrade-package`,
            data: {
                package_id: packageNumber
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        console.log("response ", response)
        toast.success("Renwed successfully")
        setLoading(false)
    } catch (error) {
        console.error("error in ", error)
        toast.error("Error in renewing")
        setLoading(false)
    }
  }


  return (
    <div>
      <h1 className="text-center font-black text-5xl text-mainColor">
        Upgrade Packages
      </h1>

      {/* inputs */}
      <div>
        {/* package number */}
        <div>
          <h3 className="my-5 text-2xl font-medium">Select Package</h3>
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
      </div>
      {/* submit */}
      <div>
        <button onClick={renew} className="bg-mainColor px-5 py-3 font-semibold text-white hover:bg-secondColor block my-10">
          {loading ? <Spinner /> : "Upgrade"}
        </button>
      </div>
    </div>
  );
};

export default Renew;
