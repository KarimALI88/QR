import React, { useContext, useEffect, useState } from "react";
import MainNavbar from "../../../components/user/navbar/MainNavbar";
import Footer from "../../../components/user/footer/Footer";
import { AppContext } from "../../../context/AppContext";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const { language } = useContext(AppContext);
  const navigate = useNavigate();
  const [news, setNews] = useState([
    {
      id: 1,
      title: "اول خبر",
      description2: "السبتايتل",
      description1: "الديسكريبشن",
      feature:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    },
  ]);

  const getNews = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_API_LINK}/blogs`,
      });
      console.log("response of blogs", response);
        response.data && setNews(response.data)
    } catch (error) {
      console.error("error on get news", error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div>
      <MainNavbar />
      <div className="my-10 px-10">
        {/* title */}
        <h1 className="text-center font-black text-5xl text-mainColor my-5 mx-auto">
          {language == "en" ? "Blogs" : "الاخبار"}
        </h1>
        {/* --------------------------------------------------------------------------- */}
        {/* blogs */}
        <div className="my-10 mx-auto p-5 flex flex-wrap gap-4 justify-center items-center">
          {/* one blog */}
          {news.map((blog, index) => (
            <Card className="w-72 overflow-hidden" key={index}>
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none cursor-pointer mx-auto w-72 h-72 text-center"
              >
                <img
                  src={blog?.feature}
                  alt={blog?.title}
                  onClick={() => navigate(`/blogs/${blog?.slug}`)}
                  loading="lazy"
                  className="mx-auto"
                />
              </CardHeader>
              <CardBody>
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="text-right cursor-pointer"
                  onClick={() => navigate(`/blogs/${blog?.id}`)}
                >
                  {blog?.title}
                </Typography>
                <Typography
                  variant="lead"
                  color="gray"
                  className="mt-3 font-normal text-right"
                >
                  {blog?.description1}
                </Typography>
              </CardBody>
            </Card>
          ))}
          {/* -------------------------------------- */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
