import React, { useEffect, useState } from "react";
import { checkType } from "../../utils/fileType";
import Viewer from "./Viewer";
import axios from "axios";
import api from "../../utils/api";

function Preview({ preview, dataPreview ,toggleShared}) {
  const [fileTypes, setType] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const fetchFileType = async () => {
      try {
        if (dataPreview && dataPreview.fileName) {
          const type = await checkType(dataPreview.type);
          setType(type);
        }
      } catch (error) {
        console.error("Error fetching file type:", error);
        setType("Other");
      }
    };

    fetchFileType();
  }, [dataPreview]);

  const handleClose = () => {
    preview(false);
  };

  const handleDownload = (filename, oName) => {
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
    <div className="w-[100vw] h-[100vh] top-0 right-0 fixed flex flex-col z-50 bg-[#000000d5] overflow-hidden font-inter text-white items-center">
      <div className="previewNav w-[100%]  flex justify-between items-center px-2  h-14 md:h-16 lg:h-20">
        <button onClick={handleClose}>
          <img src="/Logo/close.svg" alt="Close button" className="w-6 md:w-7 lg:w-8" />
        </button>
        <div className="flex justify-start mx-2 items-center h-fit w-[90%] md:[50%]">
          <div className="w-6">
          <img
            src={
              fileTypes === "Document"
                ? "/Logo/Recent/doc.svg"
                : fileTypes === "Video"
                ? "/Logo/Recent/video.svg"
                : fileTypes === "Image"
                ? "/Logo/Recent/image.svg"
                : "/Logo/Recent/otherWhite.svg"
            }
            alt={fileTypes}
            className="w-full"
          />
          </div>
         
          <p className="mx-2 text-sm md:text-base">
                    {dataPreview.fileName}</p>
        </div>

         <div className="w-[50%] gap-2 flex justify-end ">
            <button onClick={()=>{handleDownload(dataPreview.storedName,dataPreview.fileName)}}
              className="hover:scale-105 duration-200">
                <img width={'25px'} src="Logo/Recent/downloadWhite.svg" alt="" className="w-5 lg:w-7" />
            </button>
            <button onClick={()=>toggleShared(true)} className="rounded-full w-fit border-[2px] p-1 h-fit hover:scale-105 duration-200 flex items-center gap-2 justify-evenly">
                <img src="Logo/Recent/share.svg" alt="" className="w-4 lg:w-6"/>
                <p className="text-sm md:text-base">Share</p>
            </button>
        </div>
      </div>
      {/* Use Viewer component to preview the file */}
      <Viewer fileName={dataPreview.storedName} fileType={fileTypes} />
    </div>
  );
}

export default Preview;
