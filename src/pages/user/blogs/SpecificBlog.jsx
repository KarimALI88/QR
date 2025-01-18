import React, { useContext, useEffect, useState } from "react";
import MainNavbar from "../../../components/user/navbar/MainNavbar";
import Footer from "../../../components/user/footer/Footer";
import { Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SpecificBlog = () => {
  const [blog, setBlog] = useState({});
  const { id } = useParams();

  const getBlog = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_API_LINK}/blogs/${id}`,
      });
      console.log("response of blog", response);
    } catch (error) {
      console.error("error in get blog", error);
    }
  };

  useEffect(() => {
    getBlog();
  }, [id]);

  return (
    <div>
      <MainNavbar />
      {/* start blog */}
      <div className="p-5 my-5 mx-5 text-right">
        {/* image with title */}
        <figure className="relative h-96 w-full">
          <img
            className="h-full w-full rounded-xl object-cover object-center"
            src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
            alt="nature image"
            loading="lazy"
          />
          <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
            <div className="mx-auto">
              <Typography variant="h1" color="blue-gray">
                الخبر الاول
              </Typography>
            </div>
          </figcaption>
        </figure>
        {/* -------------------------------------------------------------------- */}
        {/* subtitle and description */}
        <div className="w-full my-5 flex flex-col gap-4">
          <Typography variant="h2" className="text-mainColor">
            العنوان الفرعي
          </Typography>
          <p className="px-5 text-lg font-semibold">وصف الخبر</p>
        </div>
      </div>
      {/* ===================================================== */}
      <Footer />
    </div>
  );
};

export default SpecificBlog;
