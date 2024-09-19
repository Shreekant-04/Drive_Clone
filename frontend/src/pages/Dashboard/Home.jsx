import React, { useState } from "react";
import Navbar from "../Common/Navbar";
import Sidebar from "../Common/Sidebar";
import HomePage from "./HomePage";
import PopupUpload from "./PopupUpload";

const Home = ({data,data2}) => {
  const [isOpen, setOpen] = useState(false);

  const toggleUpload = (param) => {
    setOpen(param);
  };

  return (
    <div >
      <Navbar />
      <div className="flex w-[100vw] h-[100vh] font-inter">
        <Sidebar data ={data} data2={data2} />
        <HomePage open={toggleUpload} data={data}  data2={data2}/>
        {
          isOpen?<PopupUpload open={toggleUpload} />:""
        }
       
      </div>
    </div>
  );
};

export default Home;
