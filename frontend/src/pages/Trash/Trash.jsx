import React, { useEffect, useState } from "react";
import Navbar from "../Common/Navbar";
import Sidebar from "../Common/Sidebar";
import HomePage from "../MyDrive/MyDriveHome";
import PopupUpload from "../Dashboard/PopupUpload";
import FolderPopup from "../Dashboard/FolderPopup";
import axios from "axios";
import api from "../../utils/api";
import Preview from "../Common/Preview";
import Profile from "../Common/Profile";
import ProfilePopup from "../Common/ProfilePopup";
import SharePopup from "../Common/SharePopup";
import TrashHome from "./TrashHome";

const Trash = () => {
  const [isOpen, setOpen] = useState(false);
  const [selectedFolderID, setSelectedFolderId] = useState(null);
  const [isPreview, setPreview] = useState(false);
  const [isFolderOpen, setFolderOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [userData, setuserData] = useState([]);
  const [previwData, setPreviewData] = useState("");
  const [isProfile, setProfile] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [isShared, setShared] = useState(false);

  //
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

  const toggleProfile = (param, data) => {
    setProfile(param);
    setuserData(data);
  };
  const toggleEdit = (param) => {
    setEdit(param);
  };

 

  return (
    <div className="bg-white">
      <Navbar profile={toggleProfile} />
      <div className="flex w-screen  h-[100vh] font-inter">
        <div className="w-[18%] md:w-[10%] lg:w-[15%]">
          {isProfile ? (
            <Profile
              data={userData}
              profile={toggleProfile}
              toggleEdit={toggleEdit}
            />
          ) : (
            <Sidebar data={data} data2={data2} />
          )}
        </div>

        <div className="w-[82%] bg-white md:w-[90%] lg:w-[85%]">
          <TrashHome />
          {isEdit && <ProfilePopup open={toggleEdit} data={userData} />}{" "}
        </div>
      </div>
    </div>
  );
};

export default Trash;
