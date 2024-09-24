import React, { useEffect, useState } from "react";
import Navbar from "../Common/Navbar";
import Sidebar from "../Common/Sidebar";
import HomePage from "./HomePage";
import PopupUpload from "./PopupUpload";
import FolderPopup from "./FolderPopup";
import axios from "axios";
import api from "../../utils/api";
import Preview from "../Common/Preview";
import Profile from "../Common/Profile";
import ProfilePopup from "../Common/ProfilePopup";
import SharePopup from "../Common/SharePopup";

const Home = () => {
  const [isOpen, setOpen] = useState(false);
  const [isPreview, setPreview] = useState(false);
  const [isFolderOpen, setFolderOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [userData, setuserData] = useState([]);
  const [previwData, setPreviewData] = useState("");
  const [isProfile, setProfile] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [isShared,setShared] = useState(false)

  const fetchData = async () => {
    if (token) {
      try {
        const res = await axios.get(`${api}files/get-files`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const res2 = await axios.get(`${api}files/get-limit`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res && res2) {
          setData(res.data);
          setData2(res2.data);
          setPreviewData(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Fetch files and limits when token changes
  useEffect(() => {
    fetchData();
  }, [token]);

  // Toggle the file upload popup and trigger re-fetch if closed
  const toggleUpload = (param) => {
    setOpen(param);

    if (!param) {
      // If the upload is finished (popup closed), fetch updated data
      fetchData(); // Re-fetch to get updated files list after upload
    }
  };

  // Toggle the folder creation popup
  const toggleFolder = () => {
    setFolderOpen((prev) => !prev);
    fetchData();
  };

  // Toggle the Preview Button
  const togglePreview = (param, data) => {
    setPreview(param);
    setPreviewData(data);
  };

  const toggleProfile = (param, data) => {
    setProfile(param);
    setuserData(data);
  };
  const toggleEdit = (param) => {
    setEdit(param);
  };

  const toggleShared = (param) => {
    setShared(param);
  };

  return (
    <div>
      <Navbar profile={toggleProfile} />
    <div className="flex  lg:w-[100vw] h-[100vh] font-inter">
        {isProfile ? (
          <Profile
            data={userData}
            profile={toggleProfile}
            toggleEdit={toggleEdit}
          />
        ) : (
          <Sidebar data={data} data2={data2} />
        )}

        <HomePage
          open={toggleUpload}
          data={data}
          data2={data2}
          isFolderOpen={isFolderOpen}
          toggleFolder={toggleFolder}
          preview={togglePreview}
        />
        {isEdit && <ProfilePopup open={toggleEdit} data={userData} />}{" "}
        {isOpen && <PopupUpload open={toggleUpload} />}{" "}
        {isFolderOpen && <FolderPopup toggle={toggleFolder} />}{" "}
        {isShared && <SharePopup toggleShared={toggleShared} dataPreview={previwData}  />}{" "}
        {isPreview && (
          <Preview preview={togglePreview} dataPreview={previwData} toggleShared={toggleShared} />
        )}{" "}
      </div>
    </div>
  );
};

export default Home;
