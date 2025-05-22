import React, { useContext, useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import { AppContext } from "../../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import BlogEditor from "../../../components/admin/sidebar/BlogEditor";
const Seo = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(null);
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  // const addNews = async () => {
  //   setLoading(true);
  //   const formData = new FormData();

  //   formData.append("title", title);
  //   formData.append("description2", subTitle);
  //   formData.append("description1", description);
  //   formData.append("feature", mainImage);

  //   try {
  //     const response = await axios({
  //       method: "post",
  //       url: `${import.meta.env.VITE_API_LINK}/blogs`,
  //       data: formData,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setLoading(false);
  //     console.log("response of add news", response);
  //     response.data && toast.success("Added Successfully");
  //   } catch (error) {
  //     console.error("error on add news", error);
  //     setLoading(false);
  //   }
  // };

  const handleSaveBlog = async (blogData) => {
    console.log("Blog data to save:", blogData);
    setLoading(true);
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("description2", blogData.content);
    formData.append("description1", blogData.metaDescription);
    formData.append("feature", mainImage);
    formData.append("slug", blogData.slug);

    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_LINK}/blogs`,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      console.log("response of add news", response);
      response.data && toast.success("Added Successfully");
    } catch (error) {
      console.error("error on add news", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="my-10 px-10">
        <Link to={"/seo-table"} className="bg-black text-white px-5 py-2 block my-5 mx-auto w-fit">View Blogs</Link>
        <div className="mx-auto max-w-[880px]">
          <h6 className="my-2 text-start font-semibold ">Image</h6>
          <Input
            type="file"
            onChange={(e) => setMainImage(e.target.files[0])}
          />
        </div>
        <BlogEditor onSave={handleSaveBlog} />
      </div>
    </div>
  );
};

export default Seo;
