import React, { useEffect, useState } from 'react'
import { checkType } from '../../utils/fileType';
import { useParams } from 'react-router-dom';
import Viewer from './Viewer';

function SharePrev() {
 const [fileTypes, setType] = useState("");
 
 const { filename } = useParams()
 
 
//   useEffect(()=>{

//   const fetchData = ()=>{

//    }
     
//   },[])

//   useEffect(() => {
//     const fetchFileType = async () => {
//       try {
//         if (dataPreview && dataPreview.fileName) {
//           const type = await checkType(dataPreview.type);
//           setType(type);
//         }
//       } catch (error) {
//         console.error("Error fetching file type:", error);
//         setType("Other");
//       }
//     };

//     fetchFileType();
//   }, [dataPreview]);


  const handleDownload = (filename, oName) => {
    axios({
      url: `${api}resource/share/downloadFile/${filename}`,
      method: "GET",
      responseType: "blob",
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
    <div className="w-[100vw] h-[100vh] fixed flex flex-col z-50 bg-[#000000d5] overflow-hidden font-inter text-white items-center">
      <div className="previewNav w-full p-2 flex justify-between h-[10%]">
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
            width={"25px"}
            height={"25px"}
          />
          {/* <p className="mx-2">{dataPreview.fileName || "Anydesk.exe"}</p> */}
        </div>
        <div className="w-[50%] flex justify-end p-2">
          {/* <button onClick={() => handleDownload(dataPreview.storedName, dataPreview.fileName)}>
            <img width={"25px"} src="Logo/Recent/downloadWhite.svg" alt="" />
          </button> */}
          <button className="rounded-full border-[2px] w-[12%] mx-2 p-2 hover:scale-105 duration-200 text-[10px] flex items-center justify-evenly">
            Copy Link
          </button>
        </div>
      </div>
      {/* Use Viewer component to preview the file */}
      <Viewer fileName={filename} fileType={fileTypes} />
    </div>
  );
}

export default SharePrev