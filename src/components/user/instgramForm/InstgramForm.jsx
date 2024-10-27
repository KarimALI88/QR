import React from "react";
import { Input, Typography } from "@material-tailwind/react";

const InstgramForm = () => {
  return (
    <div>
      <div className="my-5">
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-1 font-semibold text-lg"
        >
          Instgram URL
        </Typography>
        <Input
          maxLength={16}
          placeholder="Instgram URL"
          className="appearance-none min-h-[60px] !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
      </div>
      {/* ======================================================= */}
      <div className="mt-10">
        <button className="bg-mainColor px-10 py-3 font-semibold text-white hover:bg-secondColor">
          Submit
        </button>
      </div>
    </div>
  );
};

export default InstgramForm;
