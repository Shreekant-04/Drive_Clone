import React, { useState } from "react";

function Recent() {
  const [data, setData] = useState([
    {
      name: "School Letter",
      size: 5.5,
      type: "document",
      laccess: "1:30 AM",
      lname: "RAJ SINGH",
    },

    {
      name: "School Letter",
      size: 5.5,
      type: "document",
      laccess: "1:30 AM",
      lname: "RAJ SINGH",
    },

    {
      name: "School Letter",
      size: 5.5,
      type: "document",
      laccess: "1:30 AM",
      lname: "RAJ SINGH",
    },

    {
      name: "School Photo",
      size: 5.5,
      type: "image",
      laccess: "1:30 AM",
      lname: "RAJ SINGH",
    },
  ]);
  return (
    <>
      <div className="flex justify-start items-center p-3  w-[100%] bg-white h-[10%] ">
        <h1 className="text-2xl w-full font-[400]">Recent Files</h1>
      </div>
      <div className="w-full p-8 flex flex-col justify-start ">
        {data.map((item, i) => {
          return ( 
            <div className="flex w-full cursor-pointer justify-between p-3 my-2 items-center bg-[#e7e7e763] text-[12px] font-inter rounded-[16px] hover:scale-105 duration-200 transition-all">
              <div className="itemName flex items-center justify-evenly w-[10%]">
                <img src={item.type.includes('doc')?"/Logo/Recent/doc.svg":"/Logo/Recent/other.svg"} alt="" />
                <p>{item.name}</p>
              </div>
              <div className="size w-[10%]">
                <p>{item.size} MB</p>
              </div>
              <div className="type w-[10%]">
                <p>{item.type}</p>
              </div>
              <div className="accessTime w-[15%]">
                <p>Last Opened {item.laccess}</p>
              </div>
              <div className="accessName w-[10%]">
                <p>{item.lname}</p>
              </div>
              <div className="menuBtn flex justify-evenly w-[5%]">
                    <img className="cursor-pointer" src="/Logo/Recent/download.svg" alt="" />
                    <img className="cursor-pointer" src="/Logo/Recent/edit.svg" alt="" />
                    <img className="cursor-pointer" src="/Logo/Recent/menu.svg" alt="" />

              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Recent;
