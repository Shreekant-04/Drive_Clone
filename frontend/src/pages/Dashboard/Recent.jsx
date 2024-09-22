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
        }  justify-between items-center p-3 w-full bg-white h-[10%]`}
      >
        {selectedFolder && (
          <button className="flex gap-2" onClick={handleGoBack}>
            ← <span> Back </span>
          </button>
        )}
        <h1 className="text-2xl w-full text-center font-[400]">
          {selectedFolder ? selectedFolder.folderName : ""}
        </h1>
      </div>
      <div className="w-full p-8 flex flex-col justify-start">
        {selectedFolder && data.length === 0 && (
          <p className="text-center w-full">This folder is empty.</p>
        )}
        {folders.length > 0 && !selectedFolder && (
          <>
            <h2 className="text-xl mb-4 font-[400]">Folders</h2>
            {folders.map((folder, i) => (
              <div
                key={i}
                className="flex w-full cursor-pointer justify-between p-3 my-2 items-center bg-[#e7e7e763] text-[12px] font-inter rounded-[16px] hover:scale-105 duration-200 transition-all"
                onClick={() => onFolderClick(folder)}
              >
                <div className="itemName flex items-center text-center justify-start w-[15%]">
                  <img
                    src="/Logo/Recent/folder.svg"
                    className="w-5"
                    alt="Folder"
                  />
                  <p className="mx-2">{folder.folderName}</p>
                </div>
                <div className="size w-[10%]">
                  <p>{folder.fileIds.length} Items</p>
                </div>
                <div className="type w-[10%]">
                  <p>Folder</p>
                </div>
                <div className="accessTime w-[15%]">
                  <p>Created {setTime(folder.createdAt)}</p>
                </div>
                <div className="accessName w-[10%]">
                  <p>{folder.creatorName}</p>
                </div>
                <div className="menuBtn flex justify-evenly w-[5%]">
                  <img
                    className="cursor-pointer"
                    src="/Logo/Recent/menu.svg"
                    alt="Menu"
                  />
                </div>
              </div>
            ))}
          </>
        )}

        {data.length > 0 && (
          <>
            <h2 className="text-xl mb-4 font-[400]">Files</h2>
            {data.map((item, i) => (
              <div
                key={i}
                className="flex w-full cursor-pointer justify-between p-3 my-2 items-center bg-[#e7e7e763] text-[12px] font-inter rounded-[16px] hover:scale-105 duration-200 transition-all"
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
                }} className="mx-2">{item.fileName.substring(0, 15)}</p>
                </div>
                <div className="size w-[10%]">
                  <p>{(item.size / 1024 / 1024).toFixed(1)} MB</p>
                </div>
                <div className="type w-[10%]">
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
                <div className="accessTime w-[15%]">
                  <p>Last Opened {setTime(item.lAccess) || ""}</p>
                </div>
                <div className="accessName w-[10%]">
                  <p>{item.lName}</p>
                </div>
                <div className="menuBtn flex justify-evenly w-[5%]">
                  <img
                    className="cursor-pointer"
                    src="/Logo/Recent/download.svg"
                    alt="Download"
                    onClick={() => downloadFile(item.storedName, item.fileName)}
                  />
                  <img
                    className="cursor-pointer"
                    src="/Logo/Recent/edit.svg"
                    alt="Edit"
                  />
                  <span onClick={()=> delFile(item.storedName, item.fileName)}>
                 <svg
              width="10"
              height="16"
              viewBox="0 0 14 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 6.5L11.3 13.4983C11.1942 14.5592 11.1417 15.0892 10.9 15.49C10.688 15.8428 10.3763 16.125 10.0042 16.3008C9.58167 16.5 9.05 16.5 7.98333 16.5H6.01667C4.95083 16.5 4.41833 16.5 3.99583 16.3C3.62337 16.1243 3.31134 15.8421 3.09917 15.4892C2.85917 15.0892 2.80583 14.5592 2.69917 13.4983L2 6.5M8.25 11.9167V7.75M5.75 11.9167V7.75M0.75 4.41667H4.59583M4.59583 4.41667L4.9175 2.19C5.01083 1.785 5.3475 1.5 5.73417 1.5H8.26583C8.6525 1.5 8.98833 1.785 9.0825 2.19L9.40417 4.41667M4.59583 4.41667H9.40417M9.40417 4.41667H13.25"
                stroke="black"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
                </div>
              </div>
            ))}
          </>
        )}

        {data.length === 0 && folders.length === 0 && (
          <p className="text-center w-full">
            No recent files or folders available.
          </p>
        )}
      </div>
    </>
  );
}

export default Recent;
