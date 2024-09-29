import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Switch } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import api from "../../utils/api";

function SharePopup({ toggleShared, dataPreview }) {
  const [sharedUrl, setUrl] = useState(
    `${window.location.protocol}//${window.location.host}/share/${dataPreview.storedName}`
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [users, setUsers] = useState('');
  const [checked, setChecked] = useState(dataPreview.anyone);
  const popRef = useRef();
  useEffect(() => {
    if (popRef.current) {
      gsap.fromTo(
        popRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.3, ease: "power3.out" }
      );
    }
  }, [checked]);

  useEffect(() => {
    if (dataPreview.shared && Array.isArray(dataPreview.shared)) {
      // Join all emails with a comma
      const userEmails = dataPreview.shared.map(user => user.email).join(',');
      setUsers(userEmails); // Set the state with the comma-separated emails
    }
  }, [dataPreview.shared]);

  const handleClose = () => {
    toggleShared(false);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(sharedUrl)
      .then(() => {
        toast.success("Copied", {
          autoClose: 500,
        });
      })
      .catch((err) => {
        toast.error("Failed");
      });
  };

  const handleAnyone = () => {
    setChecked((prevChecked) => {
      const newChecked = !prevChecked;

      axios
        .post(
          `${api}files/anyone/${dataPreview.storedName}`,
          {
            state: newChecked,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          toast.success("Updated", {
            autoClose: 500,
          });
        })
        .catch((error) => {
          toast.error("Something went wrong", {
            autoClose: 500,
          });
        });

      return newChecked;
    });

    
  };


  
  const handleSave = async (e) => {
    e.preventDefault()
    const reqData = {
        users : users
    }
    try {
     
      // Sending the POST request
      const response = await axios.post(  `${api}files/secured/${dataPreview.storedName}`, reqData, {
        headers: {
          Authorization: `Bearer ${token}`, // If you need to pass a token for authorization
          'Content-Type': 'application/json' // Set content type to JSON
        }
      });
  
      // Handle successful response
      console.log('Response:', response.data);
      handleClose();
      toast.success('File shared successfully!',{
        autoClose : 500
      });
      
    } catch (error) {
      // Handle any errors
      console.error('Error:', error.response ? error.response.data : error.message);
      toast.error('Failed to share file!');
    }
  };
 

  return (
    <div className="w-[100vw] h-[100vh] top-0 right-0 fixed flex  z-[999] bg-[#000000d5]  overflow-hidden font-inter text-white justify-center items-center">
      <div
        ref={popRef}
        className="w-[80%] md:w-[40%] lg:w-[30%] bg-white h-fit absolute top-5 right-2 lg:top-10 lg:right-10 rounded-lg my-10 overflow-hidden flex flex-col  text-black"
      >
        <div className="w-full flex justify-end h-[5%] md:h-[10%] p-2">
          <h1 className="w-full text-center p-2 font-semibold">Share Your File</h1>
          <button onClick={() => handleClose(false)}>
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

        <div className="w-full p-1 md:p-2 flex flex-col justify-center  items-center">
          <div className="flex justify-start items-center border rounded-full p-1 overflow-hidden">
            <p className="w-[200px] md:w-[280px] p-1 lg:p-2 text-sm md:text-base text-blue-500 rounded-full overflow-hidden">
              {sharedUrl || "https://google.com"}
            </p>
            <svg
              onClick={handleCopy}
              className="-rotate-[40deg] hover:scale-105 duration-300 transition-all cursor-pointer z-20 "
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#18333C"
            >
              <path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" />
            </svg>
          </div>{" "}
          <h1 className="text-gray-500  pt-3 px-2 w-full">Sharing Permission</h1>
          <form className="w-full p-2 flex flex-col justify-center items-end">
            <input
              className=" w-full border p-1 md:p-2 outline-none rounded-md text-sm md:text-base"
              type="text"
              name="users"
              id="users"
              placeholder="Enter email of users each with ,"
              value={users}
              onChange={(e) => setUsers(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#004646] text-white p-1 md:p-2 rounded-lg my-2 w-[100px]"
              onClick={handleSave}
            >
              Share
            </button>
          </form>
          <div className="flex justify-between w-full p-2">
            <p className="text-gray-500 ">Share With Anyone</p>
            <Switch
              checked={checked}
              onChange={handleAnyone}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SharePopup;
