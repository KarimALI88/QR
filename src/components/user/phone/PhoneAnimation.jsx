const PhoneAnimation = ({ image, logo, name, description }) => {
  return (
    <div className="flex justify-center rounded-3xl items-center h-fit  mx-auto max-w-[100%] shadow-custom">
      <div className="w-80 h-[550px] bg-white rounded-3xl shadow-lg border-8 border-black overflow-hidden relative">
        {/* Content Area */}
        <div className="flex flex-col items-center justify-start h-full bg-mainColor">
          <div className="w-[100%] h-[200px]">
            <img src={image} alt="" className="h-[100%] w-[100%]" />
          </div>
          <div>
            <img src={logo} alt="" className="mx-auto my-5" />
          </div>
          <div>
            <h1 className="text-center p-1 text-white text-xl font-bold">
              {name}
            </h1>
            <p className="mx-auto p-1 text-white text-lg font-medium">
              {description}
            </p>
          </div>
        </div>
        {/* data */}
      </div>
    </div>
  );
};

export default PhoneAnimation;
