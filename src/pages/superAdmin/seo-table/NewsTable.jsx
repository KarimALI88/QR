import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NewsTable = () => {
  const [data, setData] = useState([]);
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_API_LINK}/blogs`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response of news ", response);
      setData(response.data);
    } catch (error) {
      console.error("error in news", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteNews = async (id) => {
    try {
      const response = await axios({
        method: "delete",
        url: `${import.meta.env.VITE_API_LINK}/blogs/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response of delete news", response)
      response.data && getData()
      response.data && toast.success("deleted successfully")
    } catch (error) {
      console.error("error in delete news", error);
    }
  };
  return (
    <div className="p-5">
      {/* add news */}
      <div className="my-10 mx-auto text-center">
        <Button
          className="bg-black text-white px"
          onClick={() => navigate("/seo-form")}
        >
          Add News
        </Button>
      </div>
      {/* --------------------------------------------------------------------------------------------- */}
      <div className="relative flex flex-col min-w-[50%] w-fit h-full overflow-auto mx-auto text-gray-800 bg-white shadow-lg rounded-lg my-10">
        <table className="w-full text-left table-auto min-w-max border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 border-b border-gray-300 text-gray-600 text-lg font-semibold">
                Title
              </th>
              <th className="p-4 border-b border-gray-300 text-gray-600 text-lg font-semibold">
                Subtitle
              </th>
              <th className="p-4 border-b border-gray-300 text-gray-600 text-lg font-semibold">
                Description
              </th>
              <th className="p-4 border-b border-gray-300 text-gray-600 text-lg font-semibold">
                Image
              </th>
              <th className="p-4 border-b border-gray-300 text-gray-600 text-lg font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((row, rowIndex) => (
              <tr
                className="hover:bg-gray-100 transition duration-200"
                key={rowIndex}
              >
                <td className="p-4 border-b border-gray-200">
                  <p className="text-gray-800">{row?.title}</p>
                </td>
                <td className="p-4 border-b border-gray-200">
                  <p className="text-gray-800">{row?.description2}</p>
                </td>
                <td className="p-4 border-b border-gray-200">
                  <p className="text-gray-800">{row?.description1}</p>
                </td>
                <td className="p-4 border-b border-gray-200">
                  <img
                    src={`https://backend.ofx-qrcode.com/storage/${row?.feature}`}
                    alt="main image"
                    className="w-24 h-12"
                  />
                </td>
                <td className="p-4 border-b border-gray-200">
                  <Button className="bg-red-800 text-white" onClick={() => deleteNews(row?.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsTable;
