import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        try {
          const res = await axios.get(`${api}auth/verify-user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        
        } catch (error) {
          console.error(
            "Error:",
            error.response ? error.response.data : error.message
          );

          localStorage.removeItem("token");
          setToken("");
          navigate("/");
        }
      } else {
        navigate("/");
      }
    };

    verifyUser();
  }, [token, navigate]);

  return (
    <div className="w-full h-20 flex items-center p-4 fixed border-b-[1px] border-[#979797] z-20 bg-white">
      <div className="flex items-center justify-between w-full">
        <div className="flex justify-start items-center mr-4 lg:mr-0 w-1/12 lg:w-2/12">
          <img  src="/Logo/logo.svg" alt="Logo" />
          <p className="font-roboto text-2xl lg:text-4xl font-bold">rive</p>
        </div>
        <div className="searchContainer flex w-full lg:w-11/12 items-center justify-center">
          <p className="font-inter mx-4"></p>
          <div className="searchBox border-[1px] border-[#5F6368] w-full lg:w-4/5 rounded-full p-1 lg:p-2">
            <div className="flex justify-between font-inter">
              <img src="/Logo/search.svg" alt="Search" />
              <input
                type="search"
                className="w-full lg:w-11/12 p-2 outline-none"
                placeholder="search"
              />
              <img src="/Logo/filter.svg" alt="Filter" />
            </div>
          </div>
        </div>
        <div className="w-5/12 flex justify-end">
          <div className="flex justify-evenly w-4/5 lg:w-2/5">
            <img className="hidden md:block lg:block" src="/Logo/notification.svg" alt="Notifications" />
            <img src="/Logo/settings.svg" alt="Settings" />
            <img src="/Logo/profile.svg" alt="Profile" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
