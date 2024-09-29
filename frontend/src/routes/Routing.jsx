import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../pages/Dashboard/Home";
import Auth from "../pages/Auth/Auth";
import Main from "../pages/Auth/Main";
import Landing from "../pages/Landing/Landing";
import PopupUpload from "../pages/Dashboard/PopupUpload";
import SharePrev from "../pages/Common/SharePrev";
import MyDrive from "../pages/MyDrive/MyDrive";
import Shared from "../pages/Shared/shared";
import Trash from "../pages/Trash/Trash";

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/mydrive" element={<MyDrive />} />
        <Route path="/shared" element={<Shared />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/upload" element={<PopupUpload />} />
        <Route path="/share/:filename" element={<SharePrev />} />
      </Routes>
    </div>
  );
};

export default Routing;
