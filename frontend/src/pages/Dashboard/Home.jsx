import React, { useEffect, useState } from "react";
import Navbar from "../Common/Navbar";
import Sidebar from "../Common/Sidebar";
import HomePage from "./HomePage";
import PopupUpload from "./PopupUpload";
import axios from "axios";
import api from "../../utils/api";

const Home = () => {
  const [isOpen, setOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  useEffect(() => {
    const getFile = async () => {
      if (token) {
        try {
          const res = await axios.get(`${api}files/get-files`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const res2 = await axios.get(`${api}files/get-limit`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if ((res, res2)) {
            setData(res.data);

            setData2(res2.data);
            
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    getFile();
  }, [token]);
  

  const toggleUpload = (param) => {
    setOpen(param);
  };

  return (
    <div >
      <Navbar />
      <div className="flex w-[100vw] h-[100vh] font-inter">
        <Sidebar data={data} data2={data2} />
        <HomePage open={toggleUpload} data={data}  data2={data2}/>
        {
          isOpen?<PopupUpload open={toggleUpload} />:""
        }
       
      </div>
    </div>
  );
};

export default Home;
