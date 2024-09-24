import React from "react";

const Hero = () => {
  return (
    <div className="page1 bg-gray-800  w-full p-2">
      <nav className="flex justify-between items-center h-[70px] mx-6 sm:mx-8 md:mx-12">
      <div className="flex justify-start items-center mr-4 lg:mr-0 w-1/12 lg:w-2/12">
          <img  src="/Logo/logowhite.svg" alt="Logo" />
          <p className="font-roboto text-white text-2xl lg:text-4xl font-bold">rive</p>
        </div>
        <div className="hidden md:flex text-white">
          <a
            href="#"
            className="hover:text-gray-800 hover:bg-white text-sm sm:text-lg mx-1 sm:mx-2 px-2 sm:px-3 py-1 sm:py-2 rounded"
          >
            Overview
          </a>
          <a
            href="#"
            className="hover:text-gray-800 hover:bg-white text-sm sm:text-lg mx-1 sm:mx-2 px-2 sm:px-3 py-1 sm:py-2 rounded"
          >
            Features
          </a>
          <a
            href="#"
            className="hover:text-gray-800 hover:bg-white text-sm sm:text-lg mx-1 sm:mx-2 px-2 sm:px-3 py-1 sm:py-2 rounded"
          >
            Customers
          </a>
          <a
            href="#"
            className="hover:text-gray-800 hover:bg-white text-sm sm:text-lg mx-1 sm:mx-2 px-2 sm:px-3 py-1 sm:py-2 rounded"
          >
            Pricing
          </a>
          <a
            href="#"
            className="hover:text-gray-800 hover:bg-white text-sm sm:text-lg mx-1 sm:mx-2 px-2 sm:px-3 py-1 sm:py-2 rounded"
          >
            Download
          </a>
        </div>
        <div className="flex">
          <button className="bg-white text-teal-900 text-sm sm:text-base px-3 sm:px-6 py-1 sm:py-2 mx-1 sm:mx-2 rounded">
            Sign in
          </button>
          <button className="bg-teal-900 text-white text-sm sm:text-base px-3 sm:px-6 py-1 sm:py-2 mx-1 sm:mx-2 rounded">
            Sign up
          </button>
        </div>
      </nav>
      <div className="flex flex-col lg:flex-row justify-between gap-10 sm:gap-16 lg:gap-20 mx-6 sm:mx-8 md:mx-12 mt-8 sm:mt-10 lg:mt-12 text-white">
        <div className="w-full lg:w-1/2 text-3xl sm:text-4xl md:text-5xl font-semibold">
          Easy and safe method to maintain your project files confidentially
          with us.
        </div>
        <div className="w-full lg:w-2/4 text-lg sm:text-xl md:text-2xl">
          Store, share, and collaborate on files and folders from your phone,
          tablet, or computer. Easily access, manage, and organize your content
          while maintaining real-time contact with your team, no matter where
          you are.
          <div className="mt-4">
            <button className="bg-teal-900 text-white text-sm sm:text-base px-4 sm:px-6 py-1 sm:py-2 mx-1 sm:mx-2 rounded">
              Try out D-drive
            </button>
            <button className="bg-white text-teal-900 text-sm sm:text-base px-4 sm:px-6 py-1 sm:py-2 mx-1 sm:mx-2 rounded">
              Go to drive
            </button>
          </div>
        </div>
      </div>
      <div className="page1-blank flex items-center mt-8 mx-8 justify-center">
        <div className="page1-blank1">
          <div className="bg-gray-500 h-[20vw] w-[40vw] rounded-lg my-4"></div>
          <div className="bg-gray-500 h-[10vw] w-[40vw] rounded-lg my-4"></div>
        </div>
        <div className="bg-gray-500 h-[32vw] w-[50vw] rounded-lg mx-4"></div>
      </div>
    </div>
  );
};

export default Hero;
