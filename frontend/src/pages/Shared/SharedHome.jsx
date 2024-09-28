import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../utils/api";
import setTime from "../../utils/timeConverter";
import { checkType } from "../../utils/fileType";
import SharedFiles from "./SharedFiles";

const SharedHome = ({ preview }) => {
  const [data, setData] = useState([]);
  const [fileTypes, setFileTypes] = useState({});
  const nav = useNavigate();
  const token = localStorage.getItem("token") || "";

  // Fetch shared files
  const fetchSharedFiles = async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      nav("/");
    }

    if (token) {
      try {
        const res = await axios.get(`${api}files/sharedfile?email=${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res) {
          setData(res.data.files);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Fetch file types based on the current data
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

  // Effect to fetch shared files when the component mounts
  useEffect(() => {
    fetchSharedFiles();
  }, []);

  // Effect to fetch file types whenever `data` changes
  useEffect(() => {
    if (data.length > 0) {
      fetchFileTypes();
    }
  }, [data]); // Only runs when `data` has changed

  return (
    <div className="font-inter relative top-14 md:top-16 lg:top-20 p-2 bg-white h-[100%]">
      <div className="flex w-[78%] md:w-[88%] lg:w-[84%] justify-between items-center top-14 md:top-16 lg:top-20 bg-white py-2 z-10 fixed">
        <h1 className="text-lg md:text-xl lg:text-2xl md:pb-4 lg:pb-4 font-[400]">
          Shared With Me
        </h1>
      </div>
      <div className="mt-14 md:mt-16 lg:mt-20">
        <SharedFiles preview={preview} data={data} />
      </div>
    </div>
  );
};

export default SharedHome;
