import React, { useState } from "react";
import MainNavbar from "../../../components/user/navbar/MainNavbar";
import { RiAlarmWarningFill } from "react-icons/ri";
import Footer from "../../../components/user/footer/Footer";
import { Link } from "react-router-dom";

const Policies = () => {
  return (
    <div>
      <MainNavbar />
      <div>
        {/* policies */}
        <div className="my-10 px-10 w-[70%]">
          <h1 className="text-3xl font-black text-mainColor mb-5 flex gap-3 items-center">
            <RiAlarmWarningFill color="red" size={40} /> Cookies and Policies
          </h1>
          <p className="my-5 text-black text-lg font-medium">
            Please read these terms and conditions carefully before using the
            website or subscribing to our plans. By using the website, you agree
            to be bound by these terms and conditions
          </p>
          {/* offers */}
          <div>
            <h3 className="my-5 text-secondColor text-xl font-semibold">
              Our website offers three different plans to meet our customers'
              needs:
            </h3>
            <ul className="ml-10 list-decimal">
              <li className="text-xl font-medium my-3">
                <span className="font-semibold">Free Plan:</span> This plan
                allows you to create 20 QR codes for free. Each QR code links to
                only one page and is valid for 20 visitors.
              </li>
              <li className="text-xl font-medium my-3">
                <span className="font-semibold">
                  Smart QRCode Paid Plan {`($2400)`}:
                </span>{" "}
                This plan allows you to create 20 QR codes. Each QR code links
                to a page that collects all the links of one company.
              </li>
              <li className="text-xl font-medium my-3">
                <span className="font-semibold">
                  All In One Link Paid Plan:{`($6000)`}:
                </span>{" "}
                This plan allows you to create 50 QR codes and is valid for
                unlimited visitors. Each QR code links to a page that collects
                all the links of one company. Additionally, you can add PDF and
                MP3 files to each page.
              </li>
            </ul>
          </div>
          {/* refund */}
          <div>
            <h3 className="my-5 text-secondColor text-xl font-semibold">
              You can get a refund for the amount paid for the plan within 14
              days of registration if no QR code from the plan has been used.
            </h3>
            <ul className="ml-10 list-decimal">
              <li className="text-xl font-medium my-3">
                No part of the amount will be refunded if even one QR code has
                been used.
              </li>
              <li className="text-xl font-medium my-3">
                No part of the amount will be refunded after the 14 days
              </li>
            </ul>
          </div>
          {/* usage */}
          <div>
            <h3 className="my-5 text-secondColor text-xl font-semibold">
              You are responsible for using the QR codes you create through our
              website legally and responsibly.
            </h3>
            <ul className="ml-10 list-decimal">
              <li className="text-xl font-medium my-3">
                QR codes must not be used to infringe on the intellectual
                property rights of any person or entity.
              </li>
              <li className="text-xl font-medium my-3">
                QR codes must not be used to distribute illegal or harmful
                content
              </li>
            </ul>
          </div>
          {/* Disclaimer */}
          <div>
            <h3 className="my-5 text-secondColor text-xl font-semibold">
              Disclaimer
            </h3>
            <p className="my-5 text-black text-lg font-medium">
              We are not responsible for any damages that may result from the
              use of QR codes you create through our website
            </p>
          </div>
          {/* Amendments */}
          <div>
            <h3 className="my-5 text-secondColor text-xl font-semibold">
              Amendments
            </h3>
            <p className="my-5 text-black text-lg font-medium">
              We reserve the right to modify these terms and conditions at any
              time without prior notice. Please review these terms and
              conditions 1 regularly for any changes
            </p>
          </div>
          {/* Contact Us */}
          <div>
            <h3 className="my-5 text-secondColor text-xl font-semibold">
              Contact Us
            </h3>
            <p className="my-5 text-black text-lg font-medium">
              If you have any questions or inquiries, please contact us through
              the{" "}
              <Link to={"/contact"} className="text-mainColor font-semibold">
                Contact Us
              </Link>{" "}
              page on our website.
            </p>
          </div>
          {/* FAQ */}
          <div>
            <h3 className="my-5 text-secondColor text-xl font-semibold">
              Frequently Asked Questions
            </h3>
            <ul className="ml-10 list-decimal">
              <li className="text-xl font-medium my-3">
                <span className="font-semibold">
                  How long are the paid plans valid for?
                </span>
                <br /> Paid plans are valid for one year from the date of
                purchase.
              </li>
              <li className="text-xl font-medium my-3">
                <span className="font-semibold">
                  Can I upgrade my plan after subscribing?
                </span>
                <br /> Yes, you can upgrade your plan at any time through the {" "}
                <Link to={"/admin/my-qrs"} className="text-mainColor font-semibold">
                  Dashboard
                </Link>{" "}
                page.
              </li>
              {/* <li className="text-xl font-medium my-3">
                <span className="font-semibold">
                  Can I cancel my plan subscription?
                </span>
                <br /> Yes, you can cancel your plan subscription at any time
                through the "My Account" page. No part of the amount paid for
                the plan will be refunded.
              </li> */}
              <li className="text-xl font-medium my-3">
                <span className="font-semibold">
                  What files can I add to the page in the $6000 paid plan?
                </span>
                <br /> You can add PDF and MP3 files to the page.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Policies;
