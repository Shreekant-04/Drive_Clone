import React, { useEffect, useState } from "react";
import { checkType } from "../../utils/fileType";
import setTime from "../../utils/timeConverter";

const SharedFiles = ({ data, preview ,text="Files"}) => {
  const [fileTypes, setFileTypes] = useState({});

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
  useEffect(() => {
    if (data.length > 0) {
      fetchFileTypes();
    }
  }, [data]);

  return (
      <>
        <h2 className="text-lg md:text-xl lg:text-2xl mt-2 lg:mt-4">
          {text}
        </h2>
        {/* Filter files to show only those with folderId: null */}
        {data.map((item, i) => (
          <div
            key={i}
            className="flex w-full cursor-pointer justify-between p-3 my-2 items-center bg-[#e7e7e763] text-[12px] font-inter rounded-[16px] hover:bg-[#e7e7e7a2]"
          >
            <div className="itemName flex items-center w-[70%] md:w-[25%]">
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
                onClick={() => preview(true, item)}
                className="mx-2 hover:underline truncate"
              >
                <span className="block sm:max-w-[15ch] md:max-w-[20ch] lg:max-w-none">
                  {item.fileName}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2 justify-evenly w-[20%] md:w-[75%]">
              <div className="size hidden md:block lg:block">
                <p>{(item.size / 1024 / 1024).toFixed(1)} MB</p>
              </div>
              <div className="type hidden md:block lg:block">
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
              <div className="accessTime hidden md:block lg:block">
                <p>Last Opened {setTime(item.lAccess) || ""}</p>
              </div>
              <div className="accessName hidden md:block lg:block">
                <p>{item.lName}</p>
              </div>
            </div>
          </div>
        ))}
      </>
  );
};

export default SharedFiles;
