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

  return (
    <div className="font-inter absolute top-5 p-2 left-16 md:left-32 lg:top-20  lg:left-56 w-[80%] h-[100%]">
      <div className="flex  justify-evenly items-center  w-[80%] h-[10%] md:h-[7%] lg:h-[15%] bg-white top-24  z-10 fixed ">
        <h1 className="text-lg lg:text-2xl w-[70%] lg:w-[75%] font-[400] ">Welcome To Drive</h1>
        <button className="btnAction1" onClick={toggleFolder}>
          <p className="hidden lg:block">Create</p>
          <span>
          <i className="fa-solid fa-plus  "></i>
          </span>
        </button>
        <button className="btnAction2" onClick={() => open(true)}>
        <p className="hidden lg:block ">Upload</p>
          <span>
          <i className="fa-solid fa-arrow-up-from-bracket"></i>
          </span>
        </button>
      </div>
      <Stats data={data} data2={data2} />
      <Recent
        data={selectedFolder ? folderFiles : data}
        onFolderClick={handleFolderClick}
        selectedFolder={selectedFolder}
        handleGoBack={handleGoBack}
        preview={preview}
        data2={data2}
      />
      {isFolderOpen && <FolderPopup toggle={toggleFolder} />}
    </div>
  );
}

export default HomePage;
