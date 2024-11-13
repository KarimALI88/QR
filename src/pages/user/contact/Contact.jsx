import React, { useState } from "react";
import MainNavbar from "../../../components/user/navbar/MainNavbar";
import { Input } from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";
import axios from "axios"; 
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import Footer from "../../../components/user/footer/Footer";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false)

  const contactUs = async () => {
    setLoading(true)
    try {
      const response = await axios({
        method:"post",
        url: `${import.meta.env.VITE_API_LINK}/contact-us`,
        data: {
          email,
          message
        }
      })
      console.log("reponse contact", response)
      toast.success("Sent Successfully")
      setLoading(false)
    } catch (error) {
      console.error("error in contact", error)
      toast.error("Error in contact")
      setLoading(false)
    }
  }

  return (
    <div>
      <MainNavbar />
      <div className="my-10 px-10">
        {/* title */}
        <h1 className="text-center font-black text-5xl text-mainColor my-5 mx-auto">
          Contact US
        </h1>
        {/* inputs */}
        <div>
          <div className="flex flex-col gap-3 sm:w-3/2 md:w-1/2 mx-auto">
            <div className="my-5">
              <Input
                type="email"
                color="black"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
              />
            </div>
            <div className="my-2">
              <Textarea
                label="Your message"
                rows={8}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            {/* submit */}
            <div className="float-right">
              <button onClick={contactUs} disabled={message.length === 0 || email.length === 0} className="bg-mainColor w-[100%] px-5 py-5 font-semibold text-center text-white my-2 hover:bg-secondColor mx-auto block">
                {loading ? <Spinner className="mx-auto"/> : "Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
