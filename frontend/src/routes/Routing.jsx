import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../pages/Dashboard/Home";
import Auth from "../pages/Auth/Auth";
import Main from "../pages/Auth/Main";
import Landing from "../pages/Landing/Landing";
import PopupUpload from "../pages/Dashboard/PopupUpload";


const Routing = () => {
  

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/dashboard" element={<Home/>} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/upload" element={<PopupUpload />} />
      </Routes>
    </div>
  );
};

export default Routing;
