import React from "react";
import Navbar from "../Common/Navbar";
import Sidebar from "../Common/Sidebar";
import HomePage from "./HomePage";

const Home = () => {
  return (
    <>
      <Navbar />
       <div className="flex w-[100vw] h-[100vh]">
        <Sidebar/>
        <HomePage/>



      </div>
    </>
  );
};

export default Home;
