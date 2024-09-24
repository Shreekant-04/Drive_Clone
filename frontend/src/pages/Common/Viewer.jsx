import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import api from "../../utils/api";
import gsap from "gsap";
import ReactPlayer from "react-player";
import { PDFViewer, PdfFocusProvider } from '@llamaindex/pdf-viewer';
import { useNavigate } from "react-router-dom"; // For redirecting to login

function Viewer({ fileName }) {
  const [fileBlob, setFileBlob] = useState(null);
  const [fileType, setFileType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [textContent, setTextContent] = useState(""); // State for text content
  const previRef = useRef();
  const [token,setToken] = useState(localStorage.getItem("token")||null)
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await axios.get(`${api}files/preview/${fileName}`, {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const blob = new Blob([response.data]);
        setFileBlob(blob);
        setFileType(response.data.type); // Store full MIME type

        // Check if it's a text file and read its content
        if (response.data.type.startsWith("text/")) {
          const reader = new FileReader();
          reader.onload = () => {
            setTextContent(reader.result); // Set text content
          };
          reader.readAsText(blob); // Read as text
        }
      } catch (error) {
        console.error("Error fetching file:", error);

        if (error.response?.status === 401 || error.response?.status === 400) {
          setError("Please login to access this file.");
        } else if (error.response?.status === 403) {
          setError("You do not have permission to access this file.");
        } else {
          setError("Failed to load file preview. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFile();

    return () => {
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
    return (
      <div className="w-full h-full flex justify-center items-center">
        <img className="w-[100px]" src="/Logo/loading.gif" alt="Loading..." />
        <p className="ml-2">Loading file preview...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="text-center">
          <p>{error}</p>
          {/* If the user is not logged in, offer a login option */}
          {error === "Please login to access this file." && (
            <button
              onClick={() => navigate("/dashboard")}
              className="mt-4 px-4 py-2 bg-[#004646] text-white rounded-full"
            >
              Login
            </button>
          )}
        </div>
      </div>
    );
  }

  const fileUrl = URL.createObjectURL(fileBlob);

  return (
    <div ref={previRef} className="w-[80%] bg-white h-[80%] rounded-lg my-10 overflow-hidden flex justify-center items-center text-black">
      <div className="overflow-y-scroll w-full flex justify-center items-center">
        {/* Image Preview */}
        {fileType.startsWith("image/") && (
          <img src={fileUrl} alt="preview" style={{ maxWidth: "100%", maxHeight: "100%" }} />
        )}

        {/* Video Preview */}
        {fileType.startsWith("video/") && (
          <ReactPlayer 
            url={fileUrl}
            controls
            playing={false}
            loop={false}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        )}

        {/* PDF Preview */}
        {fileType === "application/pdf" && (
          <PdfFocusProvider>
            <PDFViewer file={{ url: fileUrl }} className="w-full h-full" />
          </PdfFocusProvider>
        )}

        {/* Text File Preview */}
        {fileType.startsWith("text/") && (
          <div className="w-full h-[50vh] p-4 overflow-y-auto">
            <pre>{textContent}</pre>
          </div>
        )}

        {/* Fallback for other file types */}
        {!fileType.startsWith("image/") && !fileType.startsWith("video/") && fileType !== "application/pdf" && !fileType.startsWith("text/") && (
          <div className="w-full h-full flex justify-center items-center">
            <p>Unsupported file type for preview.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Viewer;
