import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { FaSearch, FaDownload } from "react-icons/fa";
import axios from "axios";
import { AppContext } from "./../../../../context/AppContext";
import { Spinner } from "@material-tailwind/react";

const MyQrs = () => {
  const TABLE_HEAD = [
    "QR",
    "Devices",
    "Scan",
    "Status",
    "Scan Location",
    "Actions",
  ];
  const [tableRows, setTableRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { token } = useContext(AppContext);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const downloadImage = (imageSrc) => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.target = "_blank";
    link.download = "qr-code.png"; // Set the default filename here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getQrData = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: `https://backend.ofx-qrcode.com/api/user/qrcode`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response", response);
      setLoading(false);
      setTableRows(response.data.qr_codes);
    } catch (error) {
      console.error("error in api", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    token && getQrData();
  }, [token]);

  // Filter restaurants based on the search query
  const filteredQrs = tableRows.filter(
    (row) =>
      row.qr_code?.profile?.title
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      row.qr_code?.link?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {loading && <Spinner className="w-8 h-8" />}
      {
        <Card className="h-full w-[100%]">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <Typography variant="h5" color="blue-gray">
                  QRs Details
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  These are details about the last visitors
                </Typography>
              </div>
              <div className="flex w-full shrink-0 gap-2 md:w-max">
                <div className="w-full md:w-72">
                  <Input
                    label="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    icon={<FaSearch className="h-5 w-5" />}
                  />
                </div>
                {/* <Button className="flex items-center gap-3" size="sm">
                  <FaDownload className="h-4 w-4" /> Download
                </Button> */}
              </div>
            </div>
          </CardHeader>
          <CardBody className="scroll-auto px-0">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredQrs
                  .slice()
                  .reverse()
                  .map((row, index) => {
                    const isLast = index === tableRows.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={index}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <img
                              src={`https://backend.ofx-qrcode.com/storage/${row?.qr_code?.qrcode}`}
                              alt={"qr code"}
                              className="w-[70px] h-[70px]"
                            />
                            <h1 className="text-lg font-medium">
                              {row?.qr_code?.profile?.title
                                ? row?.qr_code?.profile?.title
                                : row?.qr_code?.link.slice(0,20)}
                            </h1>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal w-max"
                          >
                            <Chip
                              size="sm"
                              variant="ghost"
                              value={row?.device_count}
                            />
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal w-max"
                          >
                            <Chip
                              size="sm"
                              variant="ghost"
                              value={row?.qr_code?.scan_count}
                            />
                          </Typography>
                        </td>

                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              size="sm"
                              variant="ghost"
                              value={
                                row?.qr_code?.is_active === 1
                                  ? "active"
                                  : "stopped"
                              }
                              color={
                                row?.qr_code?.is_active === 1
                                  ? "green"
                                  : row.is_active === "stopped"
                                  ? "red"
                                  : ""
                              }
                            />
                          </div>
                        </td>

                        <td className={classes}>
                          <div className="w-full flex gap-5 flex-col">
                            {row?.qr_code?.user_location?.map((loc, index) => (
                              <div key={index}>
                                <p className="max-w-40 break-words">
                                  {loc.location}
                                </p>
                                <hr />
                              </div>
                            ))}
                          </div>
                        </td>

                        <td className={classes}>
                          <div className="w-max">
                            <Button
                              className="flex items-center gap-3"
                              size="sm"
                              onClick={() =>
                                downloadImage(
                                  `https://backend.ofx-qrcode.com/storage/${row?.qr_code?.qrcode}`
                                )
                              }
                            >
                              <FaDownload className="h-4 w-4" /> Download
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                {filteredQrs.length === 0 && (
                  <h3 className="text-lg font-semibold text-black text-center my-10 mx-auto flex justify-center items-center">
                    No QRs Yet
                  </h3>
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      }
    </>
  );
};

export default MyQrs;
