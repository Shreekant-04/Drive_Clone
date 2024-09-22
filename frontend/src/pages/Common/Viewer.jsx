import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import api from "../../utils/api";
import gsap from "gsap";
import ReactPlayer from "react-player";
import { PDFViewer, PdfFocusProvider } from '@llamaindex/pdf-viewer';


function Viewer({ fileName }) {
  const [fileBlob, setFileBlob] = useState(null);
  const [fileType, setFileType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token,setToken] = useState(localStorage.getItem('token'))
  const previRef = useRef();

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await axios.get(`${api}files/preview/${fileName}`, {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const blob = new Blob([response.data]);
        setFileBlob(blob);
        setFileType(response.data.type.split("/")[0]);
      } catch (error) {
        console.error("Error fetching file:", error);
        setError("Failed to load file preview.");
      } finally {
        setLoading(false);
      }
    };

    fetchFile();

    return () => {
      // Cleanup to revoke object URL
      if (fileBlob) {
        URL.revokeObjectURL(fileBlob);
      }
    };
  }, [fileName]);

  useEffect(() => {
    if (previRef.current) {
      gsap.fromTo(
        previRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.3, ease: "power3.out" }
      );
    }
  }, [fileType]); 
  


  if (loading) {
    return <div className="w-full h-full flex justify-center items-center"> 
         <img className="w-[100px]" src="/Logo/loading.gif" alt="" />
    </div>;
  }

  if (error) {
    return<div className="w-full h-full flex justify-center items-center"> 
    <p>{error}</p>
</div>;
  }

  const fileUrl = URL.createObjectURL(fileBlob);
  const file = {
    id: 'sample-document',
    url: fileUrl,
  };
  return (
    <div ref={previRef} className="w-[80%] bg-white h-[80%] rounded-lg my-10 overflow-hidden flex justify-center items-center">
      <div className="overflow-y-scroll w-full flex justify-center items-center">
        {/* Image Preview */}
        {fileType === "image" && <img src={fileUrl} alt="preview" />}

        {/* Video Preview */}
        {fileType === "video" && (
          <ReactPlayer 
            url={fileUrl}
            controls
            playing={false}
            loop={false}
          />
        )}

        {/* PDF Preview */}
        {fileType === "application" && (
          <PdfFocusProvider>
            <PDFViewer file={{url : fileUrl}} className="w-full h-full" />
          </PdfFocusProvider>
        )}
        {/* Fallback for other file types */}
        {fileType !== "image" &&
          fileType !== "video" &&
          fileType !== "application" && (
            <iframe
              src={fileUrl}
              title="File preview"
              width="100%"
              height="600px"
            />
          )}
      </div>
    </div>
  );
}

export default Viewer;
