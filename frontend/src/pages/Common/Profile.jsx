import React, { useEffect, useRef } from "react";
import gsap from "gsap";

function Profile({ data, profile, toggleEdit }) {
  const topProfile = useRef();
  const textRef = useRef();
  const planRef = useRef();
  const terminateRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      topProfile.current,
      {
        translateX: "-400px",
      },
      {
        translateX: "0px",
        duration: 0.8,
        ease: "power3.inOut",
      }
    );
    
    gsap.fromTo(
      textRef.current,
      {
        translateY: "200px",
      },
      {
        translateY: "0px",
        duration: 1,
        ease: "power3.inOut",
      }
    );

    // Animation for Current Plan
    gsap.fromTo(
      planRef.current,
      {
        opacity: 0,
        translateY: "20px",
      },
      {
        opacity: 1,
        translateY: "0px",
        duration: 0.5,
        ease: "power3.inOut",
      }
    );

    // Animation for Account Termination
    gsap.fromTo(
      terminateRef.current,
      {
        opacity: 0,
        translateY: "20px",
      },
      {
        opacity: 1,
        translateY: "0px",
        duration: 0.5,
        ease: "power3.inOut",
      }
    );
  }, []); // Add an empty dependency array to run the effect only once

  return (
    <div className="sideBar w-52 md:w-60 lg:w-64 font-inter bg-gray-200 shadow-xl  top-14 md:top-16 lg:top-20 p-2 h-full fixed overflow-y-auto z-20">
      <div ref={topProfile} className="w-full ">
        <img onClick={() => profile(false)} src="/Logo/back.svg" alt="back" />
        <div className="flex justify-center">
          <img
            className="rounded-full w-[150px] h-[150px] "
            src={
              data.profileLink
                ? `data:image/jpeg;base64,${data.profileLink}`
                : "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100262.jpg"
            }
            alt="Profile"
          />
        </div>
      </div>
     
      <div className="translate-x-32 lg:translate-x-36 -translate-y-5 bg-white rounded-full p-1 w-fit  hover:scale-125 duration-200 transition-all">
        <img
          onClick={() => toggleEdit(true)}
          className=" w-5 "
          src="/Logo/Recent/edit.svg"
          alt=""
        />
      </div>
      
      <div className="overflow-hidden -mt-3">
        <div ref={textRef} className="text-center">
          <p className="font-[800] text-gray-800">{data.name || "YOUR NAME"}</p>
          <p className="text-gray-500 text-sm">{data.email}</p>
        </div>
      </div>

      <hr className="w-full my-4" />

      <div ref={planRef} className="w-full flex flex-col items-start">
        <h1 className="font-[700]  text-gray-600">Current Plan</h1>
        <div className="flex flex-col  w-full my-2">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">Premium Pack</p>
            <i className="fa-solid fa-star text-xs text-gray-400"></i>
          </div>
          
          <button className="bg-[#004646] my-2 text-white p-2 rounded-lg w-full lg:2/3">
            Upgrade
          </button>
        </div>
      </div>

      <div ref={terminateRef} className="w-full flex flex-col items-start my-3">
        <h1 className="font-[800] text-gray-600">Account Termination</h1>
        <div className="flex flex-col w-full ">
          <p className="text-[14px] text-gray-400  ">
            Click on terminate to delete your all data and account permanently
          </p>
          <button className="bg-[#ab0e0e] my-2 text-white p-2 rounded-lg w-full lg:2/3">
            Terminate
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
