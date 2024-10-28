const PhoneAnimation = ({ image, logo, name, description, color, phone1, phone2, mp3 }) => {
  // console.log(color)
  return (
    <div className="flex justify-center rounded-3xl items-center h-fit  mx-auto max-w-[100%] ">
      <div className="w-80 h-[550px] bg-white rounded-3xl shadow-lg border-8 border-black overflow-auto relative">
        {/* Content Area */}
        <div className={`flex flex-col items-center justify-start h-full`} style={{backgroundColor: color}}>
          <div className="w-[100%] h-[200px]">
            <img src={image} alt="" className="h-[100%] w-[100%]" />
          </div>
          <div>
            <img src={logo} alt="" className="mx-auto my-3 w-[100px] h-[100px] rounded-full border-4 border-white"/>
          </div>
          <div>
            <h1 className="text-center p-1 text-white text-xl font-bold">
              {name}
            </h1>
            <p className="mx-auto p-1 text-gray-600 text-lg font-medium">
              {description}
            </p>
            <div>
              <h3 className="text-white text-lg font-semibold my-3 text-center">{phone1} - {phone2}</h3>
            </div>
            <div>
              <audio controls src={mp3} className=""/>
            </div>
          </div>
        </div>
        {/* data */}
      </div>
    </div>
  );
};

export default PhoneAnimation;
