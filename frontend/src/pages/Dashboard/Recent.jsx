import React, { useState, useEffect } from "react";
import { checkFile, checkType } from "../../utils/fileType";
import setTime from "../../utils/timeConverter";
import api from "../../utils/api";
import axios from "axios";

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
                onClick={() => {
                  preview(true,item);
                }}
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
                  <p className="mx-2">{item.fileName.substring(0, 15)}</p>
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
