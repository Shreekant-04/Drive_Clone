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
    <div className="sideBar w-[20%] font-inter top-24 p-2 h-full flex flex-col fixed overflow-y-auto items-center">
      <div ref={topProfile} className="w-full">
        <img onClick={() => profile(false)} src="/Logo/back.svg" alt="back" />
        <div className="flex justify-center">
          <img
            className="rounded-full w-[150px] h-[150px]"
            src={
              data.profileLink
                ? `data:image/jpeg;base64,${data.profileLink}`
                : "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100262.jpg"
            }
            alt="Profile"
          />
        </div>
      </div>
      <img
        onClick={() => toggleEdit(true)}
        className="translate-x-12 -translate-y-3 w-5 hover:scale-125 duration-200 transition-all"
        src="/Logo/Recent/edit.svg"
        alt=""
      />
      <div className="overflow-hidden">
        <div ref={textRef} className="text-center">
          <p className="font-[800] text-black">{data.name || "YOUR NAME"}</p>
          <p>{data.email}</p>
        </div>
      </div>

      <hr className="w-full my-4" />

      <div ref={planRef} className="w-full flex flex-col items-start">
        <h1 className="font-[800]">Current Plan</h1>
        <div className="flex flex-col items-center w-full my-4">
          <p>Premium Pack</p>
          <button className="bg-[#004646] my-2 text-white p-2 rounded-full w-[200px]">
            Upgrade
          </button>
        </div>
      </div>

      <div ref={terminateRef} className="w-full flex flex-col items-start">
        <h1 className="font-[800]">Account Termination</h1>
        <div className="flex flex-col items-center w-full my-4">
          <p className="text-[14px] text-gray-400">
            Click on terminate to delete your all data and account permanently
          </p>
          <button className="bg-[#ab0e0e] my-4 text-white p-2 rounded-full w-[200px]">
            Terminate
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
