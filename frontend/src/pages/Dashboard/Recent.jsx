import React, { useState, useEffect } from "react";
import { checkFile, checkType } from '../../utils/fileType';
import setTime from "../../utils/timeConverter";


function Recent({ data }) {
  const [fileTypes, setFileTypes] = useState({});

  useEffect(() => {
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

    fetchFileTypes();
  }, [data]);

  return (
    <>
      <div className="flex justify-start items-center p-3 w-full bg-white h-[10%]">
        <h1 className="text-2xl w-full font-[400]">Recent Files</h1>
      </div>
      <div className="w-full p-8 flex flex-col justify-start">
        {data.length > 0 ? (
          data.map((item, i) => (
            <div
              key={i}
              className="flex w-full cursor-pointer justify-between p-3 my-2 items-center bg-[#e7e7e763] text-[12px] font-inter rounded-[16px] hover:scale-105 duration-200 transition-all"
            >
              <div className="itemName flex items-center text-center justify-start w-[15%]">
                <img
                  src={
                    fileTypes[item.fileName] === 'Document'
                      ? "/Logo/Recent/doc.svg"
                      : fileTypes[item.fileName] === 'Video'
                      ? "/Logo/Recent/video.svg"
                      : fileTypes[item.fileName] === 'Image'
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
                  {fileTypes[item.fileName] === 'Document'
                    ? "Document"
                    : fileTypes[item.fileName] === 'Video'
                    ? "Video"
                    : fileTypes[item.fileName] === 'Image'
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
                <img className="cursor-pointer" src="/Logo/Recent/download.svg" alt="Download" />
                <img className="cursor-pointer" src="/Logo/Recent/edit.svg" alt="Edit" />
                <img className="cursor-pointer" src="/Logo/Recent/menu.svg" alt="Menu" />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center w-full">No recent files available.</p>
        )}
      </div>
    </>
  );
}

export default Recent;
