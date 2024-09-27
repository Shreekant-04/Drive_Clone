import React, { useState } from "react";
import Stats from "./Stats";
import Recent from "./Recent";
import FolderPopup from "./FolderPopup";
import axios from "axios";
import api from "../../utils/api";

function HomePage({ open, data, data2, isFolderOpen, toggleFolder, preview }) {
  const [folderFiles, setFolderFiles] = useState();
  const [selectedFolder, setSelectedFolder] = useState(null);
  const handleFolderClick = async (folderId) => {
    try {
      const response = await axios.get(`${api}folders/${folderId._id}/files`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setFolderFiles(Array.isArray(response.data) ? response.data : []);
      setSelectedFolder(folderId);
    } catch (error) {
      console.error("Error fetching folder files:", error);
    }
  };

  const handleGoBack = () => {
    setSelectedFolder(null); // Reset selected folder
    setFolderFiles([]); // Clear folder files
  };

    const handleUpload = (folderId) => {
      open(true, folderId); // Pass the folder ID to the open function
    };

  return (
    <div className="font-inter relative top-14 md:top-16 lg:top-20 p-2  bg-white h-[100%] ">
      <div className="flex w-[78%] md:w-[88%] lg:w-[84%] justify-between items-center top-14 md:top-16 lg:top-20 bg-white py-2 z-10 fixed ">
        <h1 className="text-lg md:text-xl lg:text-2xl md:pb-4 lg:pb-4 font-[400] ">Welcome To Drive</h1>
        <div className="flex gap-1 justify-evenly md:pb-4 lg:pb-4">
        <button className="btnAction1 z-20" onClick={toggleFolder}>
          <p className="hidden lg:block">Create</p>
          <i className="fa-solid fa-plus  px-1 text-sm "></i>
        </button>
        <button className="btnAction2 z-20" onClick={() => open(true)}>
          <p className="hidden lg:block ">Upload</p>
          <span>
          <i className="fa-solid fa-arrow-up-from-bracket px-1 text-sm"></i>
          </span>
        </button>
        </div>
       
      </div>
      <div className="mt-14 md:mt-16 lg:mt-20">
      <Stats data={data} data2={data2} />
      <div className="mt-2">
      <Recent
        data={selectedFolder ? folderFiles : data}
        onFolderClick={handleFolderClick}
        selectedFolder={selectedFolder}
        handleGoBack={handleGoBack}
        preview={preview}
        data2={data2}
        open={open}
        handleUpload={handleUpload}
      />
      {isFolderOpen && <FolderPopup toggle={toggleFolder} />}
      </div>
      
      </div>
      
    </div>
  );
}

export default HomePage;
