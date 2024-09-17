import React from "react";
import { Route, Routes} from "react-router-dom";

import Home from "../pages/Dashboard/Home";
import Auth from "../pages/Auth/Auth";
import Main from "../pages/Auth/Main";
import Landing from "../pages/Landing/Landing";

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/landing" element={<Landing/>}/>

       

      </Routes>
    </div>
  );
};

export default Routing;
