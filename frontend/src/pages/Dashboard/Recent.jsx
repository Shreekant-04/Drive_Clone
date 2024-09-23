import React, { useState, useEffect } from "react";
import { checkFile, checkType } from "../../utils/fileType";
import setTime from "../../utils/timeConverter";
import api from "../../utils/api";
import axios from "axios";
import { toast } from "react-toastify";

function Recent({data,onFolderClick,selectedFolder,handleGoBack,preview}) {
  const [fileTypes, setFileTypes] = useState({});
  const [folders, setFolders] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    const fetchFileTypes = async () => {
      const types = await Promise.all(
        data.map(async (item) => {
          const category = await checkType(item.type);
          return { [item.fileName]: category };
        })
      );

      const fileTypesObj = types.reduce(
        (acc, curr) => ({ ...acc, ...curr }),
        {}
      );
      setFileTypes(fileTypesObj);
    };

    const fetchFolders = async () => {
      try {
        const response = await axios.get(`${api}folders/get-folders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFolders(response.data); // Store folders data
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };

    fetchFileTypes();
    fetchFolders();
  }, [data, token]);

  const downloadFile = (filename, oName) => {
    axios({
      url: `${api}resource/downloadFile/${filename}`,
      method: "GET",
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", oName);
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        console.error("Error downloading file:", err);
      });
  };
  const delFile = async (fileName, oName) => {
    try {
      const response = await axios.delete(`${api}files/delete/${fileName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Show a success toast notification
      toast.success(`${oName} deleted successfully!`,
        {
          autoClose: 1000, // Duration in milliseconds
        }
      );
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete the file.");
    }
  };

  return (
    <>
      <div
        className={`${
          selectedFolder ? "flex" : "hidden"
        }  justify-between items-center w-full mt-4 rounded-xl h-[10%] `}
      >
        {selectedFolder && (
          <button className="flex gap-2" onClick={handleGoBack}>
            <div className="flex items-center gap-2">
            <i className="fa-solid fa-chevron-left"></i> 
            <p>Back</p>
            </div>
            
          </button>
        )}
        <h1 className="text-xl w-full text-center  font-[400]">
          {selectedFolder ? selectedFolder.folderName : ""}
        </h1>
      </div>
      <div className="w-full px-2 py-6 flex flex-col justify-start">
        {selectedFolder && data.length === 0 && (
          <p className="text-center w-full ml-8 text-gray-400">This folder is empty.</p>
        )}
        {folders.length > 0 && !selectedFolder && (
          <>
            <h2 className="text-xl mb-2 font-[400]">Folders</h2>
            {folders.map((folder, i) => (
              <div
                key={i}
                className="flex  w-full cursor-pointer justify-between p-3 my-2 items-center bg-[#e7e7e763] text-[12px] font-inter rounded-[16px] hover:bg-gray-200"
                onClick={() => onFolderClick(folder)}
              >
                <div className="itemName flex  items-center text-center justify-start w-[15%]">
                  <img
                    src="/Logo/Recent/folder.svg"
                    className="w-5"
                    alt="Folder"
                  />
                  <p className="mx-2">{folder.folderName}</p>
                </div >
                <div className="size w-[10%] hidden lg:block">
                  <p>{folder.fileIds.length} Items</p>
                </div>
                <div className="type w-[10%] hidden lg:block">
                  <p>Folder</p>
                </div>
                <div className="accessTime w-[15%] hidden lg:block">
                  <p>Created {setTime(folder.createdAt)}</p>
                </div>
                <div className="accessName w-[10%]">
                  <p>{folder.creatorName}</p>
                </div>
                <div className="menuBtn flex justify-evenly w-[5%]">
                <i className="fa-solid fa-ellipsis-vertical  text-gray-600"></i>
                </div>
              </div>
            ))}
          </>
        )}

        {data.length > 0 && (
          <>
            <h2 className="text-xl mb-2 mt-4 font-[400]">Files</h2>
            {data.map((item, i) => (
              <div
                key={i}
                className="flex w-full cursor-pointer justify-between p-3 my-2 items-center bg-[#e7e7e763] text-[12px] font-inter rounded-[16px] hover:bg-gray-200 "
              >
                <div className="itemName flex items-center text-center justify-start w-[15%]">
                  <img
                    className=""
                    src={
                      fileTypes[item.fileName] === "Document"
                        ? "/Logo/Recent/doc.svg"
                        : fileTypes[item.fileName] === "Video"
                        ? "/Logo/Recent/video.svg"
                        : fileTypes[item.fileName] === "Image"
                        ? "/Logo/Recent/image.svg"
                        : "/Logo/Recent/other.svg"
                    }
                    alt=""
                  />
                  <p  onClick={() => {
                  preview(true,item);
                }} className="mx-2 hover:underline ">{item.fileName.substring(0, 20)}</p>
                </div>
                <div className="size w-[10%] hidden lg:block">
                  <p>{(item.size / 1024 / 1024).toFixed(1)} MB</p>
                </div>
                <div className="type w-[10%] hidden lg:block">
                  <p>
                    {fileTypes[item.fileName] === "Document"
                      ? "Document"
                      : fileTypes[item.fileName] === "Video"
                      ? "Video"
                      : fileTypes[item.fileName] === "Image"
                      ? "Image"
                      : "Other"}
                  </p>
                </div>
                <div className="accessTime w-[15%] hidden lg:block">
                  <p>Last Opened {setTime(item.lAccess) || ""}</p>
                </div>
                <div className="accessName w-[10%] hidden lg:block">
                  <p>{item.lName}</p>
                </div>
                <div className="menuBtn flex items-center gap-2 lg:gap-4 justify-evenly w-[20%] lg:w-[10%]">
                <i className="fa-solid fa-download  text-gray-600"
                 onClick={() => downloadFile(item.storedName, item.fileName)}></i>
                  
                  <i className="fa-solid fa-pen  text-gray-600"></i>

                  <span>
                <i className="fa-solid fa-trash-can  text-gray-600"
                 onClick={()=> delFile(item.storedName, item.fileName)}></i>
                  </span>
                </div>
              </div>
            ))}
          </>
        )}

        {data.length === 0 && folders.length === 0 && (
          <div className="flex justify-center items-center text-gray-400 mt-3 ">
          <i className="fa-solid fa-triangle-exclamation mr-2 "></i>
          <p className="">
            No recent files or folders available.
          </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Recent;
