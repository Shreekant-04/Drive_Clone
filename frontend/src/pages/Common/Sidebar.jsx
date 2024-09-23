import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

function Sidebar({data2,data}) {
  const [available, setAvail] = useState(0);

  useEffect(() => {
    if (data && data.length > 0) {
    
      const totalSizeMB = data.reduce((total, item) => total + (item.size || 0), 0) / 1024 / 1024;
  
   
      setAvail(totalSizeMB.toFixed(1));
    }
  }, [data]);
 

  return (
    <div className="sideBar w-[15%] font-inter  top-24 p-2 h-full fixed overflow-y-auto">
      <ul className="w-full flex flex-col items-center justify-center">
        <li className="listSideActive">
          <span>
          <i class="fa-solid fa-house lg:mr-2"></i>
          </span>
          <p className="w-[80%] hidden lg:block  text-start p-1">Home</p>
        </li>
        <li className="listSideNormal">
         
          <i class="fa-solid fa-hard-drive  lg:mr-2"></i>
          <p className="w-[80%] hidden lg:block  text-start p-1">My Drive</p>
        </li>
  
        <li className="listSideNormal">
          <span>
          <i class="fa-solid fa-share-nodes lg:mr-2"></i>
          </span>
          <p className="w-[80%] hidden lg:block   text-start p-1">Share with me</p>
        </li>
        <hr className="w-full my-2" />
        <li className="listSideNormal">
          <span>
          <i class="fa-solid fa-star lg:mr-2"></i>
          </span>
          <p className="w-[80%] hidden lg:block  text-start p-1">Starred</p>
        </li>
        <li className="listSideNormal">
          <span>
          <i class="fa-solid fa-triangle-exclamation lg:mr-2"></i>
          </span>
          <p className="w-[80%] hidden lg:block  text-start p-1">Spam</p>
        </li>
        <li className="listSideNormal">
          <span>
          <i class="fa-solid fa-trash lg:mr-2"></i>
          </span>
          <p className="w-[80%] hidden lg:block  text-start p-1">Trash</p>
        </li>
      </ul>
      <hr />
      <div className="storage  lg:p-2 w-full listSideNormal">
        <div className="flex-col items-center w-[90%] justify-center hidden lg:block">
          <li className="listSideNormal hover:bg-transparent transition-all duration-100">
            <span>
            <i class="fa-solid  fa-cloud mr-0 lg:mr-2"></i>
            </span>
            <p className="w-[80%]  text-start p-1">Storage</p>
          </li>
          <ProgressBar total={data2.total} available={available} />
          <p className="p-2 mx-2 ">{available} MB OF {data2.total} MB</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
