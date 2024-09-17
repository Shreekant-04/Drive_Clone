import React from "react";
import { Route, Routes} from "react-router-dom";
import Home from "../pages/Dashboard/Home";
import Auth from "../pages/Auth/Auth";
import Main from "../pages/Auth/Main";

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/dashboard" element={<Home />} />
      </Routes>
    </div>
  );
};

export default Routing;
