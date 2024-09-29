import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import axios from "axios";
import ProgressBar from "../Common/ProgressBar";
import api from "../../utils/api";

const PopupUpload = ({ open, selectedFolderId, setSelectedFolderId }) => {
  const popRef = useRef();
  const fileInputRef = useRef();
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (open) {
      gsap.fromTo(
        popRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, []);

  const handleClose = () => {
    gsap.fromTo(
      popRef.current,
      { scale: 1 },
      {
        scale: 0,
        duration: 0.3,
        ease: "power3.out",
        onComplete: () => open(false),
      }
    );
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    selectedFolderId && formData.append("folderId", selectedFolderId || null);

    try {
      setUploading(true); // Start uploading state
      await axios.post(`${api}files/upload-file`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
          setSelectedFolderId(null);
        },
      });
      setUploading(false); // Stop uploading state
      setProgress(0);
      handleClose();
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploading(false);
      setProgress(0);
      alert("Failed to upload file");
    }
  };

  return (
    <div
      className="w-[100vw] h-[100vh] fixed top-0 left-0 flex justify-center items-center z-50 bg-[#dfdcdc93] overflow-hidden"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div
        ref={popRef}
        className={`w-70% md:w-[40%] h-[30%] md:h-[40%]  flex p-2 flex-col rounded-lg bg-white`}
      >
        <div className="w-full flex justify-end">
          <button className="" onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#18333C"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </div>

        {/* Conditionally render drag-and-drop UI or progress bar based on uploading state */}
        <div
          className={`flex flex-col justify-center items-center h-[80%] md:h-[90%] lg:h-[90%] p-4 border-2 border-dashed border-gray-300 rounded-lg ${
            dragging ? "bg-[#cfd2d3]" : "bg-white"
          }`}
        >
          {!uploading ? (
            <>
              {/* Drag-and-drop UI when not uploading */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="200px"
                viewBox="0 -960 960 960"
                width="200px"
                fill="#18333C"
              >
                <path d="M250-160q-86 0-148-62T40-370q0-78 49.5-137.5T217-579q20-97 94-158.5T482-799q113 0 189.5 81.5T748-522v24q72-2 122 46.5T920-329q0 69-50 119t-119 50H510q-24 0-42-18t-18-42v-258l-83 83-43-43 156-156 156 156-43 43-83-83v258h241q45 0 77-32t32-77q0-45-32-77t-77-32h-63v-84q0-89-60.5-153T478-739q-89 0-150 64t-61 153h-19q-62 0-105 43.5T100-371q0 62 43.93 106.5T250-220h140v60H250Zm230-290Z" />
              </svg>
              <p className="p-2 hidden lg:block">Drag & Drop to Upload File</p>
              <p className="p-1 hidden lg:block">OR</p>
              <button
                onClick={handleFileClick}
                className="p-2 rounded-md bg-[#004646] hover:scale-105 transition-all duration-200 text-white"
              >
                Choose a File
                <input
                  ref={fileInputRef}
                  className="hidden"
                  type="file"
                  name="file"
                  id="file"
                  onChange={handleFileChange}
                />
              </button>
            </>
          ) : (
            <div className="w-full mt-4 flex flex-col justify-center items-center">
              <p className="text-lg font-semibold mb-4">Uploading...</p>
              <ProgressBar total={100} available={progress} upload={true} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupUpload;
