import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar({profile}) {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [data,setData] = useState([])

  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        try {
          const res = await axios.get(`${api}auth/verify-user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

         setData(res.data.data[0])
         profile(false,res.data.data[0])

        
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
    <div className="header w-full h-14 md:h-16 lg:h-20 flex items-center p-2  fixed border-b-[1px] border-[#c1c1c1] z-20 bg-white">
      <div className="w-full lg:px-5">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <div className="w-7 md:w-8 lg:w-12"><img src="/Logo/logo.svg" alt="Logo" /></div>
          <p className="font-roboto text-xl lg:text-3xl font-bold">rive</p>
        </div>
        <div className="searchContainer flex w-full  items-center mx-3 md:px-7 lg:px-20 ">
          <div className="searchBox border-[1px] border-[#9fa4ab] w-full lg:w-6/12  rounded-full px-2 md:py-1 lg:py-1">
            <div className="flex items-center font-inter">
            <i className="fa-solid  fa-search text-gray-500 "></i>
              <input
                type="search"
                className="w-full lg:w-11/12 p-1 lg:p-2 outline-none"
                placeholder="search"
              />
              <img src="/Logo/filter.svg" alt="Filter" />
            </div>
          </div>
        </div>

        <div className=" w-4/12 md:w-2/12 lg:w-2/12 ">
          <div className="flex justify-end md:justify-evenly items-center">
            <img className="hidden w-4 lg:w-5 mr-2 md:block lg:block hover:scale-105" src="/Logo/notification.svg" alt="Notifications" />
            <img className="w-5 lg:w-6 hover:scale-105" src="/Logo/logout.svg" alt="Settings" />
            <img className="w-5 lg:w-6 hover:scale-105" src="/Logo/profile.svg" alt="Profile" onClick={()=> profile(true,data)} />

          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Navbar;
