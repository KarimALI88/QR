import React from 'react';

const PackageCard = ({ title, price, savings, features, freeFeature }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden max-w-[300px] mx-auto my-3 border-mainColor border-solid border-2">
      <div className="px-6 py-8">
        <div className="flex flex-col justify-between gap-4 items-center">
          <h2 className="text-2xl font-bold text-mainColor">{title}</h2>
          <p className="text-4xl font-bold text-gray-500">{price}</p>
        </div>
        <p className="text-gray-500 mt-2">
          <span className="text-green-500 font-bold">{savings}</span> SAVE
        </p>
        <ul className="mt-8 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg
                className="h-5 w-5 text-secondColor mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <p className="text-gray-500 mt-8">
          <span className="text-secondColor font-bold">{freeFeature}</span>
        </p>
      </div>
      <div className="bg-gray-100 px-6 py-4">
        <button className="w-full bg-mainColor hover:bg-blue-600 text-white font-bold py-3 px-6 rounded">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default PackageCard;
