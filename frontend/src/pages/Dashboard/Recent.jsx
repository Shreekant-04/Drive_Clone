import React, { useState, useEffect } from "react";
import { checkFile, checkType } from "../../utils/fileType";
import setTime from "../../utils/timeConverter";
import api from "../../utils/api";
import axios from "axios";
import { toast } from "react-toastify";

function Recent({
  data,
  onFolderClick,
  selectedFolder,
  handleGoBack,
  preview,
  open,
  handleUpload,
}) {
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
      toast.success(`${oName} deleted successfully!`, {
        autoClose: 1000, // Duration in milliseconds
      });
      open(false);
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete the file.");
    }
  };

  const handleDelete = async (name ,folderId) => {
    try {
      const response = await fetch(`${api}folders/${folderId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFolders((prevFolders) =>
          prevFolders.filter((folder) => folder._id !== folderId)
        );
        toast.success(`${name} deleted successfully!`, {
          autoClose: 1000, // Duration in milliseconds
        });
      } else {
        toast.error("Failed to delete the folder.");
      }
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  return (
    <>
      <div
        className={`${
          selectedFolder ? "flex" : "hidden"
        }  justify-between items-center w-full mt-4 rounded-xl h-[10%]  `}
      >
        {selectedFolder && (
          <button className="flex gap-2" onClick={handleGoBack}>
            <div className="flex items-center gap-2 text-sm">
              <i className="fa-solid fa-chevron-left text-sm"></i>
              <p className="hidden lg:block">Back</p>
            </div>
          </button>
        )}
        <h1 className="text-lg  w-full text-center  font-[400]">
          {selectedFolder ? selectedFolder.folderName : ""}
        </h1>{" "}
        <button
          className="btnAction2"
          onClick={() => handleUpload(selectedFolder._id)}
        >
          <p className="hidden lg:block ">Upload</p>
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
        </button>
      </div>
      <div className="w-full px-2 py-6 flex flex-col justify-start">
        {selectedFolder && data.length === 0 ? (
          <div className="flex flex-col gap-1 justify-center items-center text-center">
            <p className="text-center w-full -mr-3 lg:mr-3 text-gray-400">
              This folder is empty.
            </p>
          </div>
        ) : (
          selectedFolder &&
          data.map((item, i) => (
            <div
              key={i}
              className="flex w-full cursor-pointer justify-between p-3 my-2 items-center bg-[#e7e7e763] text-[12px] font-inter rounded-[16px] hover:bg-gray-200 "
            >
              <div className="itemName flex items-center text-center justify-start w-[75%]">
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
                <p
                  onClick={() => {
                    preview(true, item);
                  }}
                  className="mx-2 hover:underline "
                >
                  {item.fileName.substring(0, 20)}
                </p>
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
              <div className="menuBtn flex  items-center gap-2 lg:gap-4 justify-evenly w-[20%] lg:w-[10%]">
                <i
                  className="fa-solid fa-download  text-gray-600"
                  onClick={() => downloadFile(item.storedName, item.fileName)}
                ></i>

                <i className="fa-solid fa-pen  text-gray-600"></i>

                <span>
                  <i
                    className="fa-solid fa-trash-can  text-gray-600"
                    onClick={() => delFile(item.storedName, item.fileName)}
                  ></i>
                </span>
              </div>
            </div>
          ))
        )}

        {/* All Folders */}
        {folders.length > 0 && !selectedFolder && (
          <>
            <h2 className="text-lg md:text-xl lg:text-2xl">Folders</h2>
            {folders.map((folder, i) => (
              <div
                key={i}
                className="flex  w-full cursor-pointer justify-between p-3 my-2 items-center bg-[#e7e7e763] text-[12px] font-inter rounded-[16px] hover:bg-[#e7e7e7a2]"
                onClick={() => onFolderClick(folder)}
              >
                <div className="itemName flex items-center w-[90%]  md:w-[25%] ">
                  <img
                    src="/Logo/Recent/folder.svg"
                    className="w-5"
                    alt="Folder"
                  />
                  <p className="mx-2">{folder.folderName}</p>
                </div>

                <div className="flex items-center gap-2 justify-evenly w-[10%]  md:w-[75%]">
                <div className="size hidden md:block">
                  <p>
                    {data.filter((item) => item.folderId === folder._id).length}{" "}
                    Items
                  </p>
                </div>
                <div className="type hidden md:block lg:block">
                  <p>Folder</p>
                </div>
                <div className="accessTime  hidden md:block lg:block">
                  <p>Created {setTime(folder.createdAt)}</p>
                </div>
                <div className="accessName hidden md:block lg:block">
                  <p>{folder.creatorName}</p>
                </div>
                
              </div>
              <div className="flex  items-center justify-end gap-2 ">
                <i
                  className="fa-solid fa-trash-can  text-gray-600"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent onClick for folder
                    handleDelete(folder.folderName, folder._id);
                  }}
                ></i>
                  <i className="fa-solid fa-ellipsis-vertical text-gray-600"></i>

                </div>
                </div>
                
            ))}
          </>
        )}

        {/* globle files */}
        {data.length > 0 &&
        data.filter((item) => item.folderId === null).length > 0 ? (
          <>
            <h2 className="text-lg md:text-xl lg:text-2xl mt-2 lg:mt-4 ">Files</h2>
            {/* Filter files to show only those with folderId: null */}
            {data
              .filter((item) => item.folderId === null)
              .map((item, i) => (
                <div
                  key={i}
                  className="flex  w-full cursor-pointer justify-between p-3 my-2 items-center bg-[#e7e7e763] text-[12px] font-inter rounded-[16px] hover:bg-[#e7e7e7a2] "
                >
                  <div className="itemName flex items-center w-[70%]  md:w-[25%]  ">
                    <img
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
                      className="w-5"
                    />
                  <p
                  onClick={() => {
                    preview(true, item);
                  }}
                  className="mx-2 hover:underline truncate"
                >
                  <span className="block sm:max-w-[15ch] md:max-w-[20ch] lg:max-w-none">
                    {item.fileName}
                  </span>
                </p>



                  </div>

                <div className="flex items-center gap-2 justify-evenly  w-[20%] md:w-[75%]">
                  <div className="size hidden md:block lg:block">
                    <p>{(item.size / 1024 / 1024).toFixed(1)} MB</p>
                  </div>
                  <div className="type  hidden md:block lg:block">
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
                  <div className="accessTime  hidden md:block lg:block">
                    <p>Last Opened {setTime(item.lAccess) || ""}</p>
                  </div>
                  <div className="accessName hidden md:block lg:block ">
                    <p>{item.lName}</p>
                  </div>

                  
                  </div>
                  <div className="menuBtn flex items-center gap-2  ">
                    <i
                      className="fa-solid fa-download  text-gray-600"
                      onClick={() =>
                        downloadFile(item.storedName, item.fileName)
                      }
                    ></i>

                    <i className="fa-solid fa-pen  text-gray-600"></i>

                      <i
                        className="fa-solid fa-trash-can  text-gray-600"
                        onClick={() => delFile(item.storedName, item.fileName)}
                      ></i>
                  </div>
                </div>
              ))}
          </>
        ) : null}

        {data.length === 0 && folders.length === 0 && (
          <div className="flex justify-center items-center text-gray-400 ">
            <i className="fa-solid fa-triangle-exclamation mr-2 "></i>
            <p className="text-sm">No recent files or folders available.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Recent;
