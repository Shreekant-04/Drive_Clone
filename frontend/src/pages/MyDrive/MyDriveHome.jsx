import React, { useState } from "react";
import Recent from "../MyDrive/MDRecent";
import FolderPopup from "../Dashboard/FolderPopup";
import axios from "axios";
import api from "../../utils/api";

function MyDriveHome({ open, data, data2, isFolderOpen, toggleFolder, preview }) {
  const [folderFiles, setFolderFiles] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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
    <div className="font-inter relative top-14 md:top-16 lg:top-20 p-2 bg-white h-[100%]">
      <div className="flex w-[78%] md:w-[88%] lg:w-[84%] justify-between items-center top-14 md:top-16 lg:top-20 bg-white pt-2 pb-3 z-10 fixed">
        <div className="flex gap-4 items-center">
          <h1 className="text-lg md:text-xl lg:text-2xl flex font-[400]">
            My Drive
          </h1>
          <div className="searchContainer hidden md:flex items-center">
            <div className="searchBox border-[1px] border-[#9fa4ab] w-full py-1 rounded-full px-2">
              <div className="flex items-center font-inter">
                <i className="fa-solid fa-search text-gray-500"></i>
                <input
                  type="search"
                  className="w-full lg:w-11/12 p-1 lg:p-2 outline-none"
                  placeholder="Search folders or files"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                />
                <img src="/Logo/filter.svg" alt="Filter" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-1 justify-evenly md:pb-4 lg:pb-4">
          <button className="btnAction1 z-20" onClick={toggleFolder}>
            <p className="hidden lg:block">Create</p>
            <i className="fa-solid fa-plus px-1 text-sm"></i>
          </button>
          <button className="btnAction2 z-20" onClick={() => open(true)}>
            <p className="hidden lg:block">Upload</p>
            <span>
              <i className="fa-solid fa-arrow-up-from-bracket px-1 text-sm"></i>
            </span>
          </button>
        </div>
      </div>
      <div className="mt-14 md:mt-16 lg:mt-20">
        <div className="mt-2">
          <Recent
            data={selectedFolder ? folderFiles : data}
            search={searchQuery}
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

export default MyDriveHome;
