import React, { useEffect, useState } from "react";
import { checkType } from "../../utils/fileType";

function Preview({ preview, dataPreview }) {
  const [fileTypes, setType] = useState("");

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

  return (
    <div className="w-[100vw] h-[100vh] fixed flex flex-col z-50 bg-[#000000d5] overflow-hidden font-inter text-white items-center">
      <div className="previewNav w-full p-2 flex justify-between h-[10%]">
        <button onClick={handleClose}>
          <img src="/Logo/close.svg" alt="Close button" />
        </button>
        <div className="flex justify-start items-center p-2 w-[50%]">
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
            width={'25px'}
            height={'25px'}
          />
          <p className="mx-2">{dataPreview.fileName || "Anydesk.exe"}</p>
        </div>
        <div className="w-[50%] flex justify-end p-2">
            <button>
                <img width={'25px'} src="Logo/Recent/downloadWhite.svg" alt="" />
            </button>
            <button className="rounded-full border-[2px] w-[12%] mx-2 p-2 hover:scale-105 duration-200 flex items-center justify-evenly">
                <img src="Logo/Recent/share.svg" alt="" />
                Share

            </button>

        </div>
       
      </div>
      <div className="w-[80%] bg-white h-[80%] rounded-lg my-10">
h
      </div>
    </div>
  );
}

export default Preview;
