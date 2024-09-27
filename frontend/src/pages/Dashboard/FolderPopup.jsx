import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import api from "../../utils/api";
import { gsap } from "gsap";
import { toast } from "react-toastify"; 

const FolderPopup = ({ toggle }) => {
  const [folderName, setFolderName] = useState("");
  const popRef = useRef();

 
  useEffect(() => {
    gsap.fromTo(
      popRef.current,
      { scale: 0 },
      { scale: 1, duration: 0.5, ease: "power3.out" }
    );
  }, []);

  
  const handleClose = () => {
    gsap.fromTo(
      popRef.current,
      { scale: 1 },
      {
        scale: 0,
        duration: 0.3,
        ease: "power3.out",
        onComplete: () => toggle(),
      }
    );
  };

  const handleCreateFolder = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${api}folders/create-folder`,
        { folderName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Folder created successfully!");
      handleClose();
    } catch (error) {
      console.error("Error creating folder:", error);
      toast.error("Error creating folder");
    }
  };

  return (
    <div className="w-[100vw]  h-[100vh] top-0 left-0 fixed flex justify-center  items-center z-50 bg-[#dfdcdc93] overflow-hidden font-inter">
      <div ref={popRef} className="w-[80%] md:w-[50%] lg:w-[30%] h-fit  flex p-3 flex-col rounded-lg bg-white">
        <div className="w-full flex justify-end">
          <button onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#18333C"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </div>
        <div className="flex gap-2 items-center mb-2 lg:mb-4">
          <i  className="fa-solid fa-folder-plus text-teal-900 md:text-xl lg:text-3xl "></i>
          <h2 className="font-semibold md:text-xl  ">
            Create New Folder
          </h2>
        </div>
        
        
        <input
          type="text"
          placeholder="Folder Name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="w-full  mb-3 md:mb-4 p-1 md:p-2  border border-gray-300 rounded-md focus:outline-none focus:border-primary"
        />
        <div className="flex justify-evenly gap-2 md:justify-end lg:justify-end ">
          <button
            onClick={handleCreateFolder}
            className="bg-[#004646] text-white py-2 px-4 rounded-sm hover:bg-[#004646d0] transition"
          >
            Create
          </button>
          <button
            onClick={handleClose}
            className="bg-gray-400 text-white py-2 px-4 rounded-sm hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FolderPopup;
