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
  const TABLE_HEAD = ["QR", "Devices", "Scan", "Status"];
  const [tableRows, setTableRows] = useState([]);
  const { token } = useContext(AppContext);

  // useEffect(() => {
  //   const tn = localStorage?.tn;
  //   tn ? setToken(tn) : "";
  // }, []);

  const getQrData = async () => {
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
      setTableRows(response.data.qr_codes);
    } catch (error) {
      console.error("error in api", error);
    }
  };

  useEffect(() => {
    {
      token && getQrData();
    }
  }, [token]);

  return (
    <>
      {tableRows.length > 0 ? (
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
                    icon={<FaSearch className="h-5 w-5" />}
                  />
                </div>
                <Button className="flex items-center gap-3" size="sm">
                  <FaDownload className="h-4 w-4" /> Download
                </Button>
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
                {tableRows.map((row, index) => {
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
                          <h1 className="text-xl font-semibold">
                            {row?.qr_code?.profile?.title
                              ? row?.qr_code?.profile?.title
                              : "No Title"}
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <div className="flex items-center gap-2">
              <IconButton variant="outlined" size="sm">
                1
              </IconButton>
              <IconButton variant="text" size="sm">
                2
              </IconButton>
              <IconButton variant="text" size="sm">
                3
              </IconButton>
              <IconButton variant="text" size="sm">
                ...
              </IconButton>
              <IconButton variant="text" size="sm">
                8
              </IconButton>
              <IconButton variant="text" size="sm">
                9
              </IconButton>
              <IconButton variant="text" size="sm">
                10
              </IconButton>
            </div>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="mx-auto my-32">
          <Spinner className="text-center text-2xl font-black mx-96 w-48 h-9 "/>
        </div>
      )}
    </>
  );
};

export default MyQrs;




// import React, { useContext, useEffect, useState } from "react";
// import {
//   Card,
//   CardHeader,
//   Typography,
//   Button,
//   CardBody,
//   Chip,
//   CardFooter,
//   Avatar,
//   IconButton,
//   Tooltip,
//   Input,
// } from "@material-tailwind/react";
// import { FaSearch, FaDownload } from "react-icons/fa";
// import axios from "axios";
// import { AppContext } from "./../../../../context/AppContext";
// import { Spinner } from "@material-tailwind/react";

// const MyQrs = () => {
//   const TABLE_HEAD = ["QR", "Devices", "Scan", "Status"];
//   const [tableRows, setTableRows] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const { token } = useContext(AppContext);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // Filter restaurants based on the search query
//   const filteredQrs = tableRows.filter((row) =>
//     row.qr_code?.profile?.title?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const getQrData = async () => {
//     try {
//       const response = await axios({
//         method: "get",
//         url: `https://backend.ofx-qrcode.com/api/user/qrcode`,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("response", response);
//       setTableRows(response.data.qr_codes);
//     } catch (error) {
//       console.error("error in api", error);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       getQrData();
//     }
//   }, [token]);

//   return (
//     <>
//       {filteredQrs.length > 0 ? (
//         <Card className="h-full w-[100%]">
//           <CardHeader floated={false} shadow={false} className="rounded-none">
//             <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
//               <div>
//                 <Typography variant="h5" color="blue-gray">
//                   QRs Details
//                 </Typography>
//                 <Typography color="gray" className="mt-1 font-normal">
//                   These are details about the last visitors
//                 </Typography>
//               </div>
//               <div className="flex w-full shrink-0 gap-2 md:w-max">
//                 <div className="w-full md:w-72">
//                   <Input
//                     label="Search"
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                     icon={<FaSearch className="h-5 w-5" />}
//                   />
//                 </div>
//                 <Button className="flex items-center gap-3" size="sm">
//                   <FaDownload className="h-4 w-4" /> Download
//                 </Button>
//               </div>
//             </div>
//           </CardHeader>
//           <CardBody className="scroll-auto px-0">
//             <table className="w-full min-w-max table-auto text-left">
//               <thead>
//                 <tr>
//                   {TABLE_HEAD.map((head) => (
//                     <th
//                       key={head}
//                       className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
//                     >
//                       <Typography
//                         variant="small"
//                         color="blue-gray"
//                         className="font-normal leading-none opacity-70"
//                       >
//                         {head}
//                       </Typography>
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredQrs.map((row, index) => {
//                   const isLast = index === filteredQrs.length - 1;
//                   const classes = isLast
//                     ? "p-4"
//                     : "p-4 border-b border-blue-gray-50";

//                   return (
//                     <tr key={index}>
//                       <td className={classes}>
//                         <div className="flex items-center gap-3">
//                           <img
//                             src={`https://backend.ofx-qrcode.com/storage/${row?.qr_code?.qrcode}`}
//                             alt={"qr code"}
//                             className="w-[70px] h-[70px]"
//                           />
//                           <h1 className="text-xl font-semibold">
//                             {row?.qr_code?.profile?.title || "No Title"}
//                           </h1>
//                         </div>
//                       </td>
//                       <td className={classes}>
//                         <Typography
//                           variant="small"
//                           color="blue-gray"
//                           className="font-normal w-max"
//                         >
//                           <Chip
//                             size="sm"
//                             variant="ghost"
//                             value={row?.device_count}
//                           />
//                         </Typography>
//                       </td>
//                       <td className={classes}>
//                         <Typography
//                           variant="small"
//                           color="blue-gray"
//                           className="font-normal w-max"
//                         >
//                           <Chip
//                             size="sm"
//                             variant="ghost"
//                             value={row?.qr_code?.scan_count}
//                           />
//                         </Typography>
//                       </td>
//                       <td className={classes}>
//                         <div className="w-max">
//                           <Chip
//                             size="sm"
//                             variant="ghost"
//                             value={
//                               row?.qr_code?.is_active === 1
//                                 ? "active"
//                                 : "stopped"
//                             }
//                             color={
//                               row?.qr_code?.is_active === 1
//                                 ? "green"
//                                 : "red"
//                             }
//                           />
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </CardBody>
//           <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
//             <Button variant="outlined" size="sm">
//               Previous
//             </Button>
//             <div className="flex items-center gap-2">
//               <IconButton variant="outlined" size="sm">
//                 1
//               </IconButton>
//               <IconButton variant="text" size="sm">
//                 2
//               </IconButton>
//               <IconButton variant="text" size="sm">
//                 3
//               </IconButton>
//               <IconButton variant="text" size="sm">
//                 ...
//               </IconButton>
//               <IconButton variant="text" size="sm">
//                 8
//               </IconButton>
//               <IconButton variant="text" size="sm">
//                 9
//               </IconButton>
//               <IconButton variant="text" size="sm">
//                 10
//               </IconButton>
//             </div>
//             <Button variant="outlined" size="sm">
//               Next
//             </Button>
//           </CardFooter>
//         </Card>
//       ) : (
//         <div className="mx-auto my-32">
//           <Spinner className="text-center text-2xl font-black mx-96 w-16 h-72"/>
//         </div>
//       )}
//     </>
//   );
// };

// export default MyQrs;
