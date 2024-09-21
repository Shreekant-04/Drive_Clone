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
    <div className="w-[100vw] h-[100vh] fixed flex justify-center items-center z-50 bg-[#dfdcdc93] overflow-hidden font-inter">
      <div ref={popRef} className="w-[400px] p-6 bg-white rounded-lg shadow-lg">
        <div className="w-full flex justify-end">
          <button onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#18333C"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Create a New Folder
        </h2>
        <input
          type="text"
          placeholder="Folder Name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
        />
        <div className="flex justify-end space-x-4">
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
