import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import gsap from "gsap";
function Sidebar({ data2, data }) {
  const [available, setAvail] = useState(0);
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      // Play animation only on first render
      gsap.fromTo(
        "li",
        { translateX: "-400px" },
        { translateX: "0px", duration: 0.8, ease: "power3.inOut" }
      );
      isFirstRender.current = false; // Set to false after first render
    }
    if (data && data.length > 0) {
      const totalSizeMB =
        data.reduce((total, item) => total + (item.size || 0), 0) / 1024 / 1024;
      setAvail(totalSizeMB.toFixed(1));
    }
  }, [data]);

  return (
    <div className="sideBar w-[18%] md:w-[10%] lg:w-[15%] font-inter bg-gray-100 top-14 md:top-16 lg:top-20 px-2 h-full fixed overflow-y-auto">
      <ul className="w-full flex flex-col  items-center">
        <li
          className={
            location.pathname === "/dashboard"
              ? "listSideActive"
              : "listSideNormal"
          }
        >
          <Link
            to="/dashboard"
            className="flex items-center justify-center lg:justify-start w-full"
          >
            <i className="fa-solid fa-house lg:mx-2"></i>
            <p className="hidden lg:block p-1">Home</p>
          </Link>
        </li>
        <li
          className={
            location.pathname === "/mydrive"
              ? "listSideActive"
              : "listSideNormal"
          }
        >
          <Link
            to="/mydrive"
            className="flex items-center justify-center w-full"
          >
            <i className="fa-solid fa-hard-drive  lg:mx-2"></i>
            <p className=" hidden lg:block p-1 w-full">My Drive</p>
          </Link>
        </li>

        <li
          className={
            location.pathname === "/shared"
              ? "listSideActive"
              : "listSideNormal"
          }
        >
          <Link
            to="/shared"
            className="flex items-center justify-center w-full"
          >
            <i className="fa-solid fa-share-nodes lg:mx-2"></i>
            <p className=" hidden lg:block p-1">Share with me</p>
          </Link>
        </li>
        <hr className="w-full my-2" />
        {/* <li className="listSideNormal">
          <span>
          <i className="fa-solid fa-star lg:mx-2"></i>
          </span>
          <p className=" hidden lg:block  p-1">Starred</p>
        </li>
        <li className="listSideNormal">
          <span>
          <i className="fa-solid fa-triangle-exclamation lg:mx-2"></i>
          </span>
          <p className=" hidden lg:block  p-1">Spam</p>
        </li> */}
        <li
          className={
            location.pathname === "/trash"
              ? "listSideActive"
              : "listSideNormal"
          }
        >
          <Link
            to="/trash"
            className="flex items-center  w-full"
          >
            <i className="fa-solid fa-trash lg:mx-2"></i>
            <p className=" hidden lg:block p-1">Trash</p>
          </Link>
        </li>
        
      </ul>
      <hr />
      <div className="storage  lg:p-2 w-full  listSideNormal ">
        <div className="flex-col  w-full justify-center  ">
          <li className="listSideNormal hover:bg-transparent transition-all duration-100">
            <span>
              <i className="fa-solid ml-2 lg:ml-0 fa-cloud  lg:mx-2"></i>
            </span>
            <p className="p-1 hidden lg:block">Storage</p>
          </li>
          <div className="hidden lg:flex flex-col items-center w-full  ">
            <ProgressBar total={data2.total} available={available} />
            <p className="p-2  ">
              {available} MB OF {data2.total} MB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
