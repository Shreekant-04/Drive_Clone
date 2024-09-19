import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../pages/Dashboard/Home";
import Auth from "../pages/Auth/Auth";
import Main from "../pages/Auth/Main";
import Landing from "../pages/Landing/Landing";
import PopupUpload from "../pages/Dashboard/PopupUpload";
import axios from "axios";
import api from "../utils/api";

const Routing = () => {
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

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/dashboard" element={<Home data={data} data2={data2} />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/upload" element={<PopupUpload />} />
      </Routes>
    </div>
  );
};

export default Routing;
