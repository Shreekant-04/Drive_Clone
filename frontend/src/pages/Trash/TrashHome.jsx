import axios from "axios";
import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import {setTime, setDate} from "../../utils/timeConverter";
import { toast } from "react-toastify";
import { checkType } from "../../utils/fileType";

const TrashHome = () => {
  const token = localStorage.getItem("token") || "";
  const [folders, setFolders] = useState([]);
  const [data, setData] = useState([]);
  const [fileTypes, setFileTypes] = useState({});
  const [search, setSearch] = useState("");

  const fetchFolders = async () => {
    try {
      const response = await axios.get(`${api}trash/get-folders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFolders(response.data); // Store folders data
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };
  const fetchData = async () => {
    if (token) {
      try {
        const res = await axios.get(`${api}trash/get-files`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res) {
          setData(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchFileTypes = async () => {
    const types = await Promise.all(
      data.map(async (item) => {
        const category = await checkType(item.type);
        return { [item.fileName]: category };
      })
    );

    const fileTypesObj = types.reduce((acc, curr) => ({ ...acc, ...curr }), {});
    setFileTypes(fileTypesObj);
  };

  const handleFolderDelete = async (name, folderId) => {
    try {
      const response = await fetch(`${api}folders/deletefolder/${folderId}`, {
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
    fetchData();
    fetchFolders();
  };
  const delFile = async (fileName, oName) => {
    try {
      const response = await axios.delete(
        `${api}files/deletefiles/${fileName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`${oName} deleted successfully!`, {
        autoClose: 1000, // Duration in milliseconds
      });
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete the file.");
    }

    fetchData();
    fetchFolders();
  };

  useEffect(() => {
    fetchData();
    fetchFolders();
  }, []);
  useEffect(() => {
    fetchFileTypes();
  }, [data]);

  const handleFolderRestore = async (name, folderId) => {
    try {
      const response = await fetch(`${api}trash/restorefolder/${folderId}`, {
        method: "PUT",
      });

      if (response.ok) {
        setFolders((prevFolders) =>
          prevFolders.filter((folder) => folder._id !== folderId)
        );
        toast.success(`${name} Restored  successfully!`, {
          autoClose: 1000, // Duration in milliseconds
        });
      } else {
        toast.error("Failed to restore the folder.");
      }
    } catch (error) {
      console.error("Error in restoring folder:", error);
    }
    fetchData();
    fetchFolders();
  };
  const handleRestoreFile = async (filename, name) => {
    try {
      const response = await fetch(`${api}trash/restorefile/${filename}`, {
        method: "PUT",
      });

      if (response.ok) {
        toast.success(`${name} Restored  successfully!`, {
          autoClose: 1000, // Duration in milliseconds
        });
      } else {
        toast.error("Failed to restore the folder.");
      }
    } catch (error) {
      console.error("Error in restoring folder:", error);
    }
    fetchData();
    fetchFolders();
  };

  const handleRestoreAll = async (email) => {
    try {
      const response = await fetch(`${api}restore/restoreall?email=${email}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        toast.success(`Restored  successfully!`, {
          autoClose: 1000, // Duration in milliseconds
        });
      } else {
        toast.error("Failed to restore .");
      }
    } catch (error) {
      console.error("Error in restoring :", error);
    }
    fetchData();
    fetchFolders();
  };
  const handleDeleteAll = async (email) => {
    try {
      const response = await fetch(`${api}restore/deleteall?email=${email}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        toast.success(`Deleted  successfully!`, {
          autoClose: 1000, // Duration in milliseconds
        });
      } else {
        toast.error("Failed to delete .");
      }
    } catch (error) {
      console.error("Error in deleting :", error);
    }
    fetchData();
    fetchFolders();
  };

  // Filter the folders and files based on the search query
  const filteredFolders = folders?.filter?.(folder =>
    folder.folderName.toLowerCase().includes(search.trim().toLowerCase())
  )||[];

  const filteredFiles = data?.filter(file =>
    file.fileName.toLowerCase().includes(search.trim().toLowerCase())
  );
  return (
    <div className="font-inter relative top-14 md:top-16 lg:top-20 p-2  bg-white h-auto ">
      <div className="flex w-[78%] md:w-[88%] lg:w-[84%] justify-between items-center top-14 md:top-16 lg:top-20 bg-white py-2 z-10 fixed ">
        <div className="flex gap-4 items-center">
          <h1 className="text-lg md:text-xl lg:text-2xl flex font-[400]">
            Trash
          </h1>
          <div className="searchContainer hidden md:flex items-center">
            <div className="searchBox border-[1px] border-[#9fa4ab] w-full py-1 rounded-full px-2">
              <div className="flex items-center font-inter">
                <i className="fa-solid fa-search text-gray-500"></i>
                <input
                  type="search"
                  className="w-full lg:w-11/12 p-1 lg:p-2 outline-none"
                  placeholder="Search folders or files"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)} // Update search query
                />
                <img src="/Logo/filter.svg" alt="Filter" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-1 justify-evenly md:pb-4 ">
          <button
            className="btnAction1 z-20"
            onClick={() => handleRestoreAll(localStorage.getItem("email"))}
          >
            <p className="hidden lg:block">Restore All</p>
            <i className="fa-duotone fa-solid fa-trash-arrow-up"></i>
          </button>
          <button
            className="btnAction2 z-20"
            onClick={() => handleDeleteAll(localStorage.getItem("email"))}
          >
            <p className="hidden lg:block ">Empty Trash</p>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
      <div className="mt-14 md:mt-16 lg:mt-20">
        {filteredFolders && filteredFolders.length > 0 && (
          <>
            <h2 className="text-lg md:text-xl lg:text-2xl">Folders</h2>

            {filteredFolders.map((folder, i) => (
              <div
                key={i}
                className="flex  w-full cursor-pointer justify-between p-3 my-2 items-center bg-[#e7e7e763] text-[12px] font-inter rounded-[16px] hover:bg-[#e7e7e7a2]"
              >
                <div className="itemName gap-2 flex items-center w-[60%]  md:w-[25%] ">
                  <img
                    src="/Logo/Recent/folder.svg"
                    className="w-5"
                    alt="Folder"
                  />
                  <p className="truncate">
                    <span className="block sm:max-w-[15ch] md:max-w-[20ch] lg:max-w-none">
                          {folder.folderName}
                    </span>
                    </p>
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
                <div className="flex  items-center justify-end gap-3 ">
                  <i
                    className="fa-duotone fa-solid fa-trash-arrow-up text-gray-600 hover:text-green-500 hover:scale-125 transition duration-200"
                    onClick={() =>
                      handleFolderRestore(folder.folderName, folder._id)
                    }
                  ></i>
                  <i
                    className="fa-solid fa-trash-can text-gray-600 hover:text-red-500 hover:scale-125 transition duration-200"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent onClick for folder
                      handleFolderDelete(folder.folderName, folder._id);
                    }}
                  ></i>
                </div>
              </div>
            ))}
          </>
        )}
        {filteredFiles && filteredFiles.length > 0 && (
          <>
            <h2 className="text-lg md:text-xl lg:text-2xl mt-2 lg:mt-4 ">
              Files
            </h2>
            {/* Filter files to show only those with folderId: null */}
            {filteredFiles.map((item, i) => (
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
                  <p className="mx-2 hover:underline truncate">
                    <span className="block sm:max-w-[15ch] md:max-w-[20ch] lg:max-w-none">
                      {item.fileName}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2 justify-evenly  w-[40%] md:w-[75%]">
                  <div className="size hidden md:block lg:block">
                    <p className="text-gray-700"><span className="text-teal-600">{(item.size / 1024 / 1024).toFixed(1)}</span> MB</p>
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
                  <div className="accessTime hidden md:block ">
                    <p className="bg-white p-2 rounded-full">Last Opened | {setTime(item.lAccess)} </p>
                  </div>
                  <div className="accessName hidden md:block lg:block ">
                    <p>{item.lName}</p>
                  </div>
                </div>
                <div className="menuBtn flex items-center gap-3  ">
                  <i
                    className="fa-duotone fa-solid fa-trash-arrow-up text-gray-600 hover:text-green-500 hover:scale-125 transition duration-200"
                    onClick={() =>
                      handleRestoreFile(item.storedName, item.fileName)
                    }
                  ></i>
                  <i
                    className="fa-solid fa-trash-can  text-gray-600 hover:text-red-500 hover:scale-125 transition duration-200"
                    onClick={() => {
                      delFile(item.storedName, item.fileName);
                    }}
                  ></i>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TrashHome;
