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
  }, [data, token , newFileName ,newFolderName]);


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

  //Delete Folder
  const handleDelete = async (name, folderId) => {
    try {
      const response = await fetch(`${api}folders/${folderId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFolders((prevFolders) =>
          prevFolders.filter((folder) => folder._id !== folderId)
        );
        toast.success(`${name} deleted successfully!`, {
          autoClose: 1000, 
        });
      } else {
        toast.error("Failed to delete the folder.");
      }
    } catch (error) {
      console.error("Error deleting folder:", error);
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
        { newFolderName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFolders(
        folders.map((folder) =>
          folder._id === folderId ? { ...folder, folderName: newFolderName } : folder
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
       const updatedData = data.map((file) =>
         file._id === fileId ? updatedFile : file
       );
       // Update the parent component's state
       // You might need to pass a function to update the parent state
       // For now, we'll just update the local state
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
        </h1>{" "}
        <button
          className="btnAction2"
          onClick={() => handleUpload(selectedFolder._id)}
        >
          <p className="hidden lg:block ">Upload</p>
          <span>
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
          </span>
        </button>
      </div>
      <div className="w-full px-2 py-6 flex flex-col justify-start">
        {selectedFolder && data.length === 0 ? (
          <div className="flex flex-col gap-1 justify-center items-center text-center">
            <p className="text-center w-full ml-8 text-gray-400">
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
                {editingFileId === item._id ? (
                  <input
                    type="text"
                    value={newFileName}
                    onChange={handleFileNameChange}
                    onKeyPress={(e) => handleFileKeyPress(e, item._id)}
                    onClick={(e) => e.stopPropagation()}
                    className="mx-2 p-1 border rounded"
                    autoFocus
                  />
                ) : (
                  <p
                    onClick={() => {
                      preview(true, item);
                    }}
                    className="mx-2 hover:underline"
                  >
                    {item.fileName.substring(0, 20)}
                  </p>
                )}
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
                <i
                  className="fa-solid fa-download  text-gray-600"
                  onClick={() => downloadFile(item.storedName, item.fileName)}
                ></i>

                {editingFileId === item._id ? (
                  <i
                    className="fa-solid fa-check text-green-600"
                    onClick={(e) => handleFileUpdate(e, item._id)}
                  ></i>
                ) : (
                  <i
                    className="fa-solid fa-pen text-gray-600"
                    onClick={(e) =>
                      handleFileEditClick(e, item._id, item.fileName)
                    }
                  ></i>
                )}

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
                  {editingFolder === folder._id ? (
                    <input
                      type="text"
                      value={newFolderName}
                      onChange={handleNameChange}
                      onKeyPress={(e) => handleKeyPress(e, folder._id)}
                      onClick={(e) => e.stopPropagation()} // Prevent folder from opening when clicking input
                      className="mx-2 p-1 border rounded"
                      autoFocus
                    />
                  ) : (
                    <p className="mx-2">{folder.folderName}</p>
                  )}
                </div>
                <div className="size w-[10%] hidden lg:block">
                  <p>
                    {data.filter((item) => item.folderId === folder._id).length}{" "}
                    Items
                  </p>
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
                <div className="menuBtn flex justify-evenly items-center gap-3 w-[5%]">
                  {editingFolder === folder._id ? (
                    <button onClick={(e) => handleUpdate(e, folder._id)}>
                      <i className="fa-solid fa-check text-green-600"></i>
                    </button>
                  ) : (
                    <button
                      onClick={(e) =>
                        handleEditClick(e, folder._id, folder.folderName)
                      }
                    >
                      <i className="fa-solid fa-pen text-gray-600"></i>
                    </button>
                  )}
                  <i
                    className="fa-solid fa-trash-can text-gray-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(folder.folderName, folder._id);
                    }}
                  ></i>
                </div>
              </div>
            ))}
          </>
        )}

        {/* globle files */}
        {data.length > 0 &&
        data.filter((item) => item.folderId === null).length > 0 ? (
          <>
            <h2 className="text-xl mb-2 mt-4 font-[400]">Files</h2>
            {/* Filter files to show only those with folderId: null */}
            {data
              .filter((item) => item.folderId === null)
              .map((item, i) => (
                <div
                  key={i}
                  className="flex w-full cursor-pointer justify-between p-3 my-2 items-center bg-[#e7e7e763] text-[12px] font-inter rounded-[16px] hover:bg-gray-200 "
                >
                  <div className="itemName flex items-center text-center justify-start w-[15%]">
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
                    />
                    {editingFileId === item._id ? (
                      <input
                        type="text"
                        value={newFileName}
                        onChange={handleFileNameChange}
                        onKeyPress={(e) => handleFileKeyPress(e, item._id)}
                        onClick={(e) => e.stopPropagation()}
                        className="mx-2 p-1 border rounded"
                        autoFocus
                      />
                    ) : (
                      <p
                        onClick={() => {
                          preview(true, item);
                        }}
                        className="mx-2 hover:underline"
                      >
                        {item.fileName.substring(0, 20)}
                      </p>
                    )}
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
                    <i
                      className="fa-solid fa-download  text-gray-600"
                      onClick={() =>
                        downloadFile(item.storedName, item.fileName)
                      }
                    ></i>

                    {editingFileId === item._id ? (
                      <i
                        className="fa-solid fa-check text-green-600"
                        onClick={(e) => handleFileUpdate(e, item._id)}
                      ></i>
                    ) : (
                      <i
                        className="fa-solid fa-pen text-gray-600"
                        onClick={(e) =>
                          handleFileEditClick(e, item._id, item.fileName)
                        }
                      ></i>
                    )}

                    <span>
                      <i
                        className="fa-solid fa-trash-can  text-gray-600"
                        onClick={() => delFile(item.storedName, item.fileName)}
                      ></i>
                    </span>
                  </div>
                </div>
              ))}
          </>
        ) : null}

        {data.length === 0 && folders.length === 0 && (
          <div className="flex justify-center items-center text-gray-400 mt-3 ">
            <i className="fa-solid fa-triangle-exclamation mr-2 "></i>
            <p className="">No recent files or folders available.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Recent;
