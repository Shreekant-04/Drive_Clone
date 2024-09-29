import React, { useState, useEffect } from "react";
import { checkFile, checkType } from "../../utils/fileType";
import {setTime, setDate} from "../../utils/timeConverter";
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
  search,
  handleUpload,
}) {
  const [fileTypes, setFileTypes] = useState({});
  const [folders, setFolders] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [newFolderName, setNewFolderName] = useState("");
  const [editingFolder, setEditingFolder] = useState(null);
  const [editingFileId, setEditingFileId] = useState(null);
  const [newFileName, setNewFileName] = useState("");

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

    //Get all Folders
    const fetchFolders = async () => {
      try {
        const response = await axios.get(`${api}folders/get-folders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFolders(response.data);
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };

    fetchFileTypes();
    fetchFolders();
  }, [data, token, newFileName, newFolderName]);

  // Download Files
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
  const TrashFile = async (fileName, oName) => {
    try {
      const response = await axios.put(`${api}trash/file/${fileName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Show a success toast notification
      toast.success(`${oName} Moved to Trash`, {
        autoClose: 1000, // Duration in milliseconds
      });
      open(false);
    } catch (error) {
      console.error("Error Trashing file:", error);
      toast.error("Failed to Trash the file.");
    }
  };

  const TrashFolder = async (name, folderId) => {
    try {
      const response = await fetch(`${api}trash/folder/${folderId}`, {
        method: "PUT",
      });

      if (response.ok) {
        setFolders((prevFolders) =>
          prevFolders.filter((folder) => folder._id !== folderId)
        );
        toast.success(`${name} Trashed successfully!`, {
          autoClose: 1000, // Duration in milliseconds
        });
      } else {
        toast.error("Failed to trash the folder.");
      }
    } catch (error) {
      console.error("Error trashing folder:", error);
    }
  };

  // Edit Folder Name
  const handleUpdate = async (e, folderId) => {
    e.stopPropagation();
    if (newFolderName.trim() === "") {
      toast.error("Folder name can't be empty!");
      return;
    }
    try {
      const response = await axios.put(
        `${api}folders/${folderId}`,
        { newName: newFolderName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFolders(
        folders.map((folder) =>
          folder._id === folderId
            ? { ...folder, folderName: newFolderName }
            : folder
        )
      );

      setEditingFolder(null);
      toast.success("Folder name updated successfully!");
    } catch (error) {
      console.error("Error updating folder name:", error);
      toast.error("Failed to update folder name.");
    }
  };

  const handleKeyPress = (e, folderId) => {
    if (e.key === "Enter") {
      handleUpdate(e, folderId);
    }
  };

  const handleEditClick = (e, folderId, currentName) => {
    e.stopPropagation();
    setEditingFolder(folderId);
    setNewFolderName(currentName);
  };

  const handleNameChange = (e) => {
    setNewFolderName(e.target.value);
  };

  // Edit File Name
  const handleFileEditClick = (e, fileId, currentName) => {
    e.stopPropagation();
    setEditingFileId(fileId);
    setNewFileName(currentName);
  };

  const handleFileNameChange = (e) => {
    setNewFileName(e.target.value);
  };

  const handleFileUpdate = async (e, fileId) => {
    e.stopPropagation();
    if (newFileName.trim() === "") {
      toast.error("File name can't be empty!");
      return;
    }

    try {
      const response = await axios.put(
        `${api}files/${fileId}`,
        { newFileName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedFile = response.data.file;

      setFileTypes((prevTypes) => ({
        ...prevTypes,
        [updatedFile.fileName]: checkType(updatedFile.type),
      }));

      setEditingFileId(null);
      toast.success("File name updated successfully!");
    } catch (error) {
      console.error("Error updating file name:", error);
      toast.error("Failed to update file name.");
    }
  };

  const handleFileKeyPress = (e, fileId) => {
    if (e.key === "Enter") {
      handleFileUpdate(e, fileId);
    }
  };

   // Filter the folders and files based on the search query
   const filteredFolders = folders?.filter?.(folder =>
    folder.folderName.toLowerCase().includes(search?.trim().toLowerCase())
  )||[];

  const filteredFiles = data?.filter(file =>
    file.fileName.toLowerCase().includes(search?.trim().toLowerCase())
  );
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
          className="btnAction2 hover:bg-teal-700"
          onClick={() => handleUpload(selectedFolder._id)}
        >
          <p className="hidden lg:block ">Upload</p>
          <i className="fa-solid fa-arrow-up-from-bracket text-sm px-1"></i>
        </button>
      </div>
      <div className="w-full px-2 py-6 flex flex-col justify-start">
        {selectedFolder && filteredFiles.length === 0 ? (
          <div className="flex flex-col gap-1 justify-center items-center text-center">
            <p className="text-center w-full -mr-3 lg:mr-3 text-gray-400">
              This folder is empty.
            </p>
          </div>
        ) : (
          selectedFolder &&
          filteredFiles.map((item, i) => (
            <div
              key={i}
              className="flex  w-full cursor-pointer justify-between p-3 my-2 items-center bg-[#e7e7e763] text-[12px] font-inter rounded-[16px] hover:bg-[#e7e7e7a2]"
            >
              <div className="itemName flex items-center w-[60%]  md:w-[25%] ">
                <img
                  className="w-5"
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
                {editingFileId === item._id ? (
                  <input
                    type="text"
                    value={newFileName}
                    onChange={handleFileNameChange}
                    onKeyPress={(e) => handleFileKeyPress(e, item._id)}
                    onClick={(e) => e.stopPropagation()}
                    className="mx-2 p-1 border border-gray-200 w-[100%] outline-slate-200 rounded"
                    autoFocus
                  />
                ) : (
                  <p
                    onClick={() => {
                      preview(true, item);
                    }}
                    className="mx-2 hover:underline truncate "
                  >
                    <span className="block sm:max-w-[15ch] md:max-w-[20ch] lg:max-w-none">
                      {item.fileName}
                    </span>
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 justify-evenly  w-[40%] md:w-[75%]">
                <div className="size hidden md:block lg:block">
                  <p>{(item.size / 1024 / 1024).toFixed(1)} MB</p>
                </div>
                {/* <div className="type  hidden md:block lg:block">
                  <p>
                    {fileTypes[item.fileName] === "Document"
                      ? "Document"
                      : fileTypes[item.fileName] === "Video"
                      ? "Video"
                      : fileTypes[item.fileName] === "Image"
                      ? "Image"
                      : "Other"}
                  </p>
                </div> */}
                
                <div className="accessTime hidden md:block ">
                  <p className="bg-white p-2 rounded-full">Last Opened | {setTime(item.lAccess)} </p>
                </div>
                
                <div className="accessName w-[10%] hidden lg:block">
                  <p>{item.lName}</p>
                </div>
              </div>

              <div className="menuBtn flex items-center gap-3">
                <i
                  className="fa-solid fa-download  text-gray-600 hover:text-blue-500 hover:scale-125 transition duration-200"
                  onClick={() => downloadFile(item.storedName, item.fileName)}
                ></i>

                {editingFileId === item._id ? (
                  <i
                    className="fa-solid fa-check text-green-500 hover:scale-125 transition duration-200"
                    onClick={(e) => handleFileUpdate(e, item._id)}
                  ></i>
                ) : (
                  <i
                    className="fa-solid fa-pen text-gray-600 hover:text-teal-500 hover:scale-125 transition duration-200"
                    onClick={(e) =>
                      handleFileEditClick(e, item._id, item.fileName)
                    }
                  ></i>
                )}

                <i
                  className="fa-solid fa-trash-can  text-gray-600 hover:text-red-500 hover:scale-125 transition duration-200"
                  onClick={() => TrashFile(item.storedName, item.fileName)}
                ></i>
              </div>
            </div>
          ))
        )}

        {/* All Folders */}
        {filteredFolders.length > 0 && !selectedFolder && (
          <>
            <h2 className="text-lg md:text-xl lg:text-2xl">Folders</h2>
            {filteredFolders.map((folder, i) => (
              <div
                key={i}
                className="flex  w-full cursor-pointer justify-between p-3 my-2 items-center bg-[#e7e7e763] text-[12px] font-inter rounded-[16px] hover:bg-[#e7e7e7a2]"
                onClick={() => onFolderClick(folder)}
              >
                <div className="itemName flex items-center w-[60%] gap-2 md:w-[25%] ">
                  <img
                    src="/Logo/Recent/folder.svg"
                    className="w-5"
                    alt="Folder"
                  />
                  {editingFolder === folder._id ? (
                    <input
                      type="text"
                      value={newFolderName}
                      onChange={handleNameChange}
                      onKeyPress={(e) => handleKeyPress(e, folder._id)}
                      onClick={(e) => e.stopPropagation()} // Prevent folder from opening when clicking input
                      className="mx-2 p-1 border border-gray-200 w-[100%] outline-slate-200 rounded"
                      autoFocus
                    />
                  ) : (
                    <p className="truncate">
                    <span className="block sm:max-w-[15ch] md:max-w-[20ch] lg:max-w-none">
                          {folder.folderName}
                    </span>
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 justify-evenly w-[40%]  md:w-[75%]">
                  <div className="size ">
                    <p className="text-teal-600">
                      {data.filter((item) => item.folderId === folder._id).length}{" "}
                      <span className="text-gray-700">Items</span>
                    </p>
                  </div>
                  {/* <div className="type hidden md:block lg:block">
                    <p>Folder</p>
                  </div> */}
                 <div className="accessTime items-center gap-2 hidden md:flex lg:flex">
                  <p className="bg-white p-2 rounded-full">Created | {setDate(folder.createdAt)}</p>
                  <p className="bg-white p-2 rounded-full">{setTime(folder.createdAt)}</p> 
                </div>

                  <div className="accessName hidden md:block lg:block">
                    <p>{folder.creatorName}</p>
                  </div>
                </div>
                <div className="menuBtn flex items-center gap-3 ">
                  {editingFolder === folder._id ? (
                    <button onClick={(e) => handleUpdate(e, folder._id)}>
                      <i className="fa-solid fa-check text-green-500 hover:scale-125 transition duration-200"></i>
                    </button>
                  ) : (
                    <button
                      onClick={(e) =>
                        handleEditClick(e, folder._id, folder.folderName)
                      }
                    >
                      <i className="fa-solid fa-pen text-gray-600 hover:text-teal-500 hover:scale-125 transition duration-200"></i>
                    </button>
                  )}
                  <i
                    className="fa-solid fa-trash-can text-gray-600 hover:text-red-500 hover:scale-125 transition duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      TrashFolder(folder.folderName, folder._id);
                    }}
                  ></i>
                </div>
              </div>
            ))}
          </>
        )}

        {/* globle files */}
        {filteredFiles.length > 0 &&
        filteredFiles.filter((item) => item.folderId === null).length > 0 ? (
          <>
            <h2 className="text-lg md:text-xl lg:text-2xl mt-2 lg:mt-4 ">
              Files
            </h2>
            {/* Filter files to show only those with folderId: null */}
            {filteredFiles
              .filter((item) => item.folderId === null)
              .map((item, i) => (
                <div
                  key={i}
                  className="flex  w-full cursor-pointer justify-between p-3 my-2 items-center bg-[#e7e7e763] text-[12px] font-inter rounded-[16px] hover:bg-[#e7e7e7a2] "
                >
                  <div className="itemName flex items-center w-[60%]  md:w-[25%]  ">
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
                    {editingFileId === item._id ? (
                      <input
                        type="text"
                        value={newFileName}
                        onChange={handleFileNameChange}
                        onKeyPress={(e) => handleFileKeyPress(e, item._id)}
                        onClick={(e) => e.stopPropagation()}
                        className="mx-2 p-1 border rounded border-gray-200 w-[100%] outline-slate-200"
                        autoFocus
                      />
                    ) : (
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
                    )}
                  </div>

                <div className="flex items-center gap-2 justify-evenly  w-[40%] md:w-[75%]">
                  <div className="size hidden md:block lg:block">
                    <p className="text-gray-700"><span className="text-teal-600">{(item.size / 1024 / 1024).toFixed(1)}</span> MB</p>
                  </div>
                  {/* <div className="type  hidden md:block lg:block">
                    <p>
                      {fileTypes[item.fileName] === "Document"
                        ? "Document"
                        : fileTypes[item.fileName] === "Video"
                        ? "Video"
                        : fileTypes[item.fileName] === "Image"
                        ? "Image"
                        : "Other"}
                    </p>
                  </div> */}
                  <div className="accessTime hidden md:block ">
                  <p className="bg-white p-2 rounded-full">Last Opened | {setTime(item.lAccess)} </p>
                </div>
                  <div className="accessName hidden md:block lg:block ">
                    <p>{item.lName}</p>
                  </div>

                  </div>

                  <div className="menuBtn flex items-center gap-3 ">
                    <i
                      className="fa-solid fa-download  text-gray-600 hover:text-blue-500 hover:scale-125 transition duration-200"
                      onClick={() =>
                        downloadFile(item.storedName, item.fileName)
                      }
                    ></i>

                    {editingFileId === item._id ? (
                      <i
                        className="fa-solid fa-check text-green-500 hover:scale-125 transition duration-200"
                        onClick={(e) => handleFileUpdate(e, item._id)}
                      ></i>
                    ) : (
                      <i
                        className="fa-solid fa-pen text-gray-600 hover:text-teal-500 hover:scale-125 transition duration-200"
                        onClick={(e) =>
                          handleFileEditClick(e, item._id, item.fileName)
                        }
                      ></i>
                    )}

                    <i
                      className="fa-solid fa-trash-can  text-gray-600 hover:text-red-500 hover:scale-125 transition duration-200"
                      onClick={() => TrashFile(item.storedName, item.fileName)}
                    ></i>
                  </div>
                </div>
              ))}
          </>
        ) : null}

        {filteredFiles.length === 0 && filteredFolders.length === 0 && (
          <div className="flex justify-center items-center text-gray-400 ">
            <i className="fa-solid fa-triangle-exclamation mr-2 "></i>
            <p className="text-sm">No files or folders available</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Recent;
