import React, { useContext, useState } from "react";
import { Input } from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import { AppContext } from "../../../context/AppContext";

const Seo = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(null);
  const { token } = useContext(AppContext);

  const addNews = async () => {
    setLoading(true);
    const formData = new FormData()

    formData.append("title", title)
    formData.append("description2", subTitle)
    formData.append("description1", description)
    formData.append("feature", mainImage)

    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_LINK}/blogs`,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false)
      console.log("response of add news", response);
      response.data && toast.success("Added Successfully")
    } catch (error) {
      console.error("error on add news", error);
      setLoading(false)
    }
  };
  return (
    <div>
      <div className="my-10 px-10">
        {/* title */}
        <h1 className="text-center font-black text-5xl text-mainColor my-5 mx-auto">
          Add News
        </h1>
        {/* inputs */}
        <div>
          <div className="flex flex-col gap-3 sm:w-3/2 md:w-1/2 mx-auto">
            <div className="my-5">
              <Input
                type="text"
                color="black"
                size="lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label="title"
              />
            </div>
            <div className="my-5">
              <Input
                type="text"
                color="black"
                size="lg"
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
                label="sub title"
              />
            </div>
            <div className="my-5">
              <Input
                type="file"
                color="black"
                size="lg"
                onChange={(e) => setMainImage(e.target.files[0])}
                label="main image"
              />
            </div>
            <div className="my-2">
              <Textarea
                label="Description"
                rows={8}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {/* submit */}
            <div className="float-right">
              <button
                onClick={addNews}
                // disabled={message.length === 0 || email.length === 0}
                className="bg-mainColor w-[100%] px-5 py-5 font-semibold text-center text-white my-2 hover:bg-secondColor mx-auto block"
              >
                {loading ? <Spinner className="mx-auto" /> : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seo;
