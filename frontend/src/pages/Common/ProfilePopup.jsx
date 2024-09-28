import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import axios from "axios"; // Make sure to have axios installed
import api from "../../utils/api";

function ProfilePopup({ open, data }) {
  const popRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null); // Store the selected image
  const [name, setName] = useState(data?.name || ""); // Store the user's name
  const [token,setToken] = useState(localStorage.getItem('token'||""))
  useEffect(() => {
    gsap.fromTo(
      popRef.current,
      { scale: 0 },
      { scale: 1, duration: 0.5, ease: "power3.out" }
    );
  }, []);

  // Handle file input for image
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (selectedImage) {
      formData.append("profileLink", selectedImage); // Send the selected image
    }
 

    try {
      // Replace `api` with your backend API URL
      const res = await axios.post(`${api}auth/update-profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
           Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      open(false); // Close the popup after successful upload
    } catch (error) {
      console.log(error);
    }
  };

  // Trigger file input when image is clicked
  const triggerImageUpload = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="w-[100vw] h-[100vh] fixed top-0 left-0 flex justify-center items-center z-50 bg-[#dfdcdc93] overflow-hidden font-inter">
      <div
        ref={popRef}
        className={`w-[80%] md:w-[40%] h-fit flex p-2 flex-col rounded-lg bg-white`}
      >
        <div className="w-full flex justify-end ">
          <button onClick={() => open(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#18333C"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full p-2 flex flex-col items-center h-full justify-center"
        >
          <img
            className="rounded-full w-[150px] h-[150px]"
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : data.profileLink?`data:image/jpeg;base64,${data.profileLink}` : "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100262.jpg"
            }
            alt="Profile"
          />
          <img
            onClick={triggerImageUpload}
            className="translate-x-12 -translate-y-3 w-5 hover:scale-125 duration-200 transition-all cursor-pointer"
            src="/Logo/Recent/edit.svg"
            alt="Edit"
          />
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <input
            className="outline-none border rounded-lg p-2 my-2"
            type="text"
            name="name"
            id="name"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button
            type="submit"
            className="p-2 bg-[#004646] text-white w-[100px] rounded-md hover:bg-[#0046468c]"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePopup;
