import React, { useContext, useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from 'react-router-dom';
import BlogEditor from "../../../components/admin/sidebar/BlogEditor"
const Seo = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(null);
  const { token } = useContext(AppContext);
  const navigate = useNavigate()

  const addNews = async () => {
    setLoading(true);
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description2", subTitle);
    formData.append("description1", description);
    formData.append("feature", mainImage);

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

  const handleSaveBlog = (blogData) => {
    console.log('Blog data to save:', blogData);
    // Here you would typically send the data to your backend API
    alert('Blog saved successfully!');
  };

  return (
    <div>
      <div className="my-10 px-10">
        <BlogEditor onSave={handleSaveBlog}/>
      </div>
    </div>
  );
};

export default Seo;
