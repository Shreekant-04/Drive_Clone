import React from "react";
import { Route, Routes} from "react-router-dom";
import Home from "../pages/Home/Home";
import Landing from "../pages/Landing/Landing";

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landing/>}/>
      </Routes>
    </div>
  );
};

export default Routing;
