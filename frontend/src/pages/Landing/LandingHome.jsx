import React from "react";
import heroBg from "/Logo/Landing/HeroBg.svg";
import heroDashboard from "/Logo/Landing/drive dashboard.png";
import icon from "/Logo/Landing/icon.svg";

import image1 from "/Logo/Landing/Main Section.svg";
import image2 from "/Logo/Landing/Main Section2.svg";
import image3 from "/Logo/Landing/Main Section3.svg";
import image4 from "/Logo/Landing/Image4.svg";
import frame from "/Logo/Landing/Frame.svg";
import frame1 from "/Logo/Landing/Frame (1).svg";
import frame2 from "/Logo/Landing/Frame (2).svg";
import icon5 from "/Logo/Landing/icon5.svg";
import icon6 from "/Logo/Landing/icon6.svg";
import block3 from "/Logo/Landing/block3.svg";
import back1 from "/Logo/Landing/back1.svg";
import back2 from "/Logo/Landing/back2.svg";
import arrow from "/Logo/Landing/arrow.svg";
import back3 from "/Logo/Landing/back3.svg";
import logoOrange from "/Logo/Landing/logo-orange.svg";
import logoBlack from "/Logo/Landing/logoBlack.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const features = [
  {
    title: "End-to-end encrypted",
    description:
      "Because of advanced cryptography, no one else - not even D-rive - can read your data.",
  },
  {
    title: "Privacy-first promise",
    description:
      "Your data is never sold, shared, or monetized. Sign up and upgrade without sharing any personal information.",
  },
  {
    title: "Instant alerts",
    description:
      "Be informed instantly of any suspicious activities on your account.",
  },
];

const plans = [
  {
    title: "FREE",
    price: "₹0",
    period: "Per month",
    features: [
      "Drive, and Calendar",
      "10 GB",
      "Single device login",
      "1 custom domain",
    ],
    buttonText: "Sign up",
  },
  {
    title: "ESSENTIAL",
    price: "₹399",
    period: "Per month",
    features: [
      "Everything in Free",
      "15 GB storage",
      "10 device login",
      "1 custom domain",
    ],
    buttonText: "Sign up",
  },
  {
    title: "PRO",
    price: "₹899",
    period: "Per month",
    features: [
      "Everything in Essential",
      "200 GB storage",
      "15 device login",
      "3 custom domains",
    ],
    buttonText: "Sign up",
  },
  {
    title: "BUSINESS",
    price: "₹1,299",
    period: "Per user/month",
    features: [
      "Everything in Pro",
      "1 TB Storage",
      "100 device login",
      "Unlimited collaborators",
    ],
    buttonText: "Sign up",
  },
];

const testimonials = [
  {
    name: "Filip Mark",
    role: "Chief of Staff, Passionfroot",
    image:
      "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1727547898~exp=1727551498~hmac=83a8d7d47f7415c702a274f6e91892d0dbc86211de2688747d29c3ba0beb6f4b&w=1060",
    testimonial:
      "Drive provides the perfect balance of security and ease of use. Managing file access is simple, and everything syncs effortlessly across devices. It's a service I trust for both personal and professional needs.",
  },
  {
    name: "Sarah Lee",
    role: "Founder, Tech Innovators",
    image:
      "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?t=st=1727548122~exp=1727551722~hmac=330f14a5a9e6120ee0a2252d5fc7b18f3c98f7db6eb3da043a10b5499bcf392a&w=1060",
    testimonial:
      "Drive has revolutionized how we manage data. With seamless sync and unmatched security, it's a service we cannot do without.",
  },
  {
    name: "John Carter",
    role: "CTO, Fintech Giants",
    image:
      "https://img.freepik.com/free-photo/bohemian-man-with-his-arms-crossed_1368-3542.jpg?t=st=1727547934~exp=1727551534~hmac=3adf666d44f5d8e1f5cae71b3ed33553f26303481bb76dc2cb1cad192f0691fb&w=740",
    testimonial:
      "With Drive, our data management became more efficient. The user-friendly interface and secure environment allow our team to work without interruption.",
  },
  {
    name: "Emily Johnson",
    role: "VP of Operations, Creative Co",
    image:
      "https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg?t=st=1727548148~exp=1727551748~hmac=0be13053d944ace803330f3e2f741795b06281d76d7b9326a1c6eae6b583f6c2&w=1060",
    testimonial:
      "Drive ensures that all our files are accessible and secure, providing peace of mind and ease of use for our creative projects.",
  },
];

const LandingHome = () => {
  const navigate = useNavigate();

  const handleSecureClick = () => {
    navigate("/login");
  };
  return (
    <div className="relative w-full mx-auto">
      <Navbar />
      <section
        className="py-1 w-full relative heroBg text-gray-900 bg-gray-200 bg-repeat-y"
        style={{ backgroundImage: `url("${heroBg}")` }}
      >
        <div
          className="flex flex-col items-center bg-gray-100 shadow-[rgba(0,_0,_0,_0.25)_0px_5px_50px_-12px] mt-14 w-11/12 mx-auto rounded-lg"
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="true"
        >
          {/* text */}
          <div className="text-center mt-24">
            <h1
              className="text-6xl md:text-8xl "
              data-aos="zoom-in"
              data-aos-offset="100"
              data-aos-delay="50"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="true"
            >
              Is your data <span className="text-[#009F7A]">secure?</span>
            </h1>
            <p
              className="mt-4 text-gray-500 text-xl md:w-1/2 mx-auto"
              data-aos="zoom-in"
            >
              When privacy, security, and accessibility matter most, there’s
              only one option: <span className="font-bold">D-rive</span>
            </p>
            <button
              onClick={handleSecureClick}
              className="mt-6 bg-black text-white py-3 px-6 rounded-xl"
              data-aos="zoom-in"
              data-aos-delay="500"
            >
              Secure my data now
            </button>
            <p className="text-gray-400 text-sm mt-2" data-aos="zoom-in">
              Free plan • No card required
            </p>
          </div>
          <div
            className="mt-20 rounded-2xl  overflow-hidden shadow-[0_-8px_30px_rgb(0,0,0,0.12)]"
            data-aos="zoom-in-up"
            data-aos-delay="200"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
          >
            <img
              src={heroDashboard}
              alt="Drive Interface Mockup"
              className="w-full "
            />
          </div>
        </div>
      </section>
      <section className="bg-white py-16 w-11/12 mx-auto">
        <div className="container mx-auto">
          <div className="flex justify-between flex-col md:flex-row items-center">
            <h2
              className="text-3xl mb-8 md:w-1/3"
              data-aos="zoom-in-left"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="true"
            >
              Features that your outdated cloud store don’t have
            </h2>
            <img
              src={icon}
              alt="our partners"
              data-aos="zoom-in-right"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="true"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-[90%]">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-left shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] py-4 px-2"
                data-aos="zoom-in-right"
                data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="true"
              >
                <h3 className="text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Deepali */}

      <div className="p-4 md:p-10 bg-[#F5F5F4]">
        <div
          className=" bg-[#fafaf9] rounded-md border border-[#afafaf]"
          data-aos="zoom-in-up"
          data-aos-offset="100"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="true"
        >
          <div className="bg-gray-50 py-12 px-6 md:px-12 lg:px-24 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
                Coming Soon: Enhanced Privacy & Secure File Sharing
              </h2>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-6">
                We’re thrilled to announce an upcoming feature that will give
                you greater control over your files. With our enhanced privacy
                settings, you'll be able to select exactly who can view, share,
                or access your documents—ensuring only trusted individuals can
                interact with your content. Keep an eye out for this exciting
                update!
              </p>
              {/* <button className="mt-6 bg-black text-white py-3 px-6 rounded-full">
                Learn More
              </button> */}
            </div>
          </div>
          <div className=" pr-5 pl-5 pt-4 pb-1 w-full flex justify-between gap-2">
            <img className="h-8 w-8" src={icon6} alt="Icon" />
            <div className="flex gap-2">
              <div className="text-[#afafaf]">Learn more</div>
              <div className="h-7 w-7 rounded-3xl border border-[#afafaf] flex flex-col justify-center items-center">
                <img className="" src={arrow} alt="Arrow"></img>
              </div>
            </div>
          </div>

          {/* BLOCK 1 */}

          <div className="flex flex-col md:flex-row ">
            {/* Left Side */}

            <div className="w-full md:w-[50%] bg-[#FAFAF9] pr-5 pl-5  pb-10 flex flex-col gap-2 rounded-md">
              <div className="h-auto md:h-[30%] flex flex-col gap-1">
                <div>
                  <b>End-to-end encrypted with extra 2FA security</b>
                </div>
                <div className="text-[#afafaf]">
                  Skiff Mail protects your inbox with free private email, giving
                  you the power to communicate freely with anyone.
                </div>
              </div>

              <div className="h-auto md:h-[70%] flex flex-col items-center md:flex-row gap-4 pl-0 md:pl-10">
                <img
                  className="w-52 md:w-auto h-auto md:h-52 rounded-md shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.4)]"
                  src={image1}
                  alt="Image1"
                />
                <img
                  className="w-52 md:w-auto h-auto md:h-52 rounded-md shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.4)]"
                  src={image2}
                  alt="Image2"
                />
              </div>
            </div>

            <div className="w-full md:w-[50%] bg-[#FAFAF9] rounded-md flex flex-col justify-end">
              <img src={image3}></img>
            </div>
          </div>
        </div>

        {/* BLOCK 2 */}
        <div className="flex flex-col md:flex-row mt-10 gap-5">
          {/* Left Card */}
          <div className="gap-5 w-full md:w-[50%] bg-[#fafaf9] pl-5 pr-5 pt-4 border border-[#afafaf] rounded-md flex flex-col">
            <div className="h-[10%] flex justify-between">
              <img
                src={icon5}
                className="h-7 w-7"
                alt="Icon5"
                data-aos="zoom-in-right"
                data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="true"
              />
              <div className="flex gap-2">
                <div className="text-[#afafaf]">Learn more</div>
                <div className="h-7 w-7 rounded-3xl border border-[#afafaf] flex flex-col justify-center items-center">
                  <img className="" src={arrow} alt="Arrow"></img>
                </div>
              </div>
            </div>

            <div className="h-auto md:h-[30%] flex flex-col gap-1">
              <div>
                <b>Access your photos, files and documents privately.</b>
              </div>
              <div className="text-[#afafaf]">
                Drive takes your thoughts and ideas to the next level with
                private, end-to-end encrypted photos, docs, and files.
              </div>
            </div>

            <img
              src={image4}
              className="w-full"
              alt="Image4"
              data-aos="zoom-in-right"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="true"
            />
          </div>

          {/* Right Card */}
          <div className="relative w-full md:w-[50%] border border-[#afafaf] rounded-md bg-[#FAFAF9] p-4">
            <div className="flex justify-between">
              <span className="bg-[#f6d6e5] pl-1 pr-1 rounded-md border border-b-2 border-b-double border-[#afafaf]">
                PRIVACY AT ALPHA LEVEL
              </span>
              <div className="flex gap-2">
                <div className="text-[#afafaf]">Learn more</div>
                <div className="h-7 w-7 rounded-3xl border border-[#afafaf] flex flex-col justify-center items-center">
                  <img className="" src={arrow} alt="Arrow"></img>
                </div>
              </div>
            </div>
            <div className="h-auto md:h-[30%] flex flex-col mt-2">
              <div>
                <b>Freedom to select who can share files with you.</b>
              </div>
              <div className="text-[#afafaf]">
                Decide exactly who can view, access, or share files, photos, and
                documents with you.
              </div>
              <div className="text-[#464646] font-thin mt-2">
                SELECT TO APPROVE
              </div>
            </div>

            <div className="   h-[60%] flex flex-col gap-2">
              <div className="red-line-box absolute left-0 bottom-0 flex flex-col gap-0 w-full">
                <div className="red-line h-[1px] bg-white"></div>
                <div className="red-line h-[2px] bg-red-500"></div>
                <div className="red-line h-[1px] bg-white"></div>
                <div className="box bg-red-100 bg-opacity-70 h-7"></div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-md bg-[#009F7A] flex flex-col justify-center items-center">
                  <i className="fa-solid fa-check text-white"></i>
                </div>
                <div className="flex w-full justify-between rounded-md border border-b-2 border-b-double border-[#afafaf] p-1">
                  <div className="w-[80%] flex flex-col pl-1 ">
                    <div>Rohit wants to share 📄 file</div>
                    <div className="text-[#afafaf]">10:00AM</div>
                  </div>
                  <div className=" w-[10%] flex flex-col justify-center items-center ">
                    <img src={frame1} className=" rounded-md "></img>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-md bg-[#009F7A] flex flex-col justify-center items-center">
                  <i className="fa-solid fa-check text-white"></i>
                </div>
                <div className="flex w-full justify-between rounded-md border border-b-2 border-b-double border-[#afafaf] p-1">
                  <div className="w-[80%] flex flex-col pl-1">
                    <div>Kavita requesting to read 📄 file</div>
                    <div className="text-[#afafaf]">10:30AM</div>
                  </div>
                  <div className=" w-[10%] flex flex-col justify-center items-center ">
                    <img src={frame2} className=" rounded-md "></img>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 ">
                <div className="h-6 w-6 rounded-md bg-[#009F7A] flex flex-col justify-center items-center">
                  <i className="fa-solid fa-check text-white "></i>
                </div>
                <div className="flex w-full justify-between rounded-md border border-b-2 border-b-double border-[#afafaf] p-1">
                  <div className="w-[80%] flex flex-col pl-1 ">
                    <div>Google wants to see your 📷 photos</div>
                    <div className="text-[#afafaf]">11:45AM</div>
                  </div>
                  <div className=" w-[10%] flex flex-col justify-center items-center ">
                    <img src={frame} className=" rounded-md "></img>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-md bg-[#EF5A3C] flex flex-col justify-center items-center">
                  <i className="fa-solid fa-check text-white "></i>
                </div>
                <div className="flex w-full justify-between rounded-md border border-b-2 border-b-double border-[#afafaf] p-1">
                  <div className="w-[80%] flex flex-col pl-1 ">
                    <div>Anonymous requesting to access files</div>
                    <div className="text-[#afafaf]">11:45AM</div>
                  </div>
                  <div className=" w-[10%] flex flex-col justify-center items-center ">
                    <img src={frame} className=" rounded-md "></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* block3 */}

        <div className="relative w-full border border-[#afafaf] rounded-md bg-[#FAFAF9] pt-4 pl-5 pr-5 flex flex-col gap-5 mt-10">
          {/* Top Text Section */}
          <div className="h-[30%]">
            <div className="flex justify-between">
              <span className="bg-[#d2e9d7] text-[#00a05e] pl-1 pr-1 rounded-md border border-b-2 border-b-double border-[#afafaf]">
                DRIVE
              </span>
              <div className="flex gap-2">
                <div className="text-[#afafaf]">Learn more</div>
                <div className="h-7 w-7 rounded-3xl border border-[#afafaf] flex flex-col justify-center items-center">
                  {/* <i className='fa-solid fa-arrow-right'></i> */}
                  <img className="" src={arrow} alt="Arrow"></img>
                </div>
              </div>
            </div>

            <div className="h-auto flex flex-col mt-2">
              <div>
                <b>Keep your files and photos safe in a secure vault..</b>
              </div>
              <div className="text-[#afafaf]">
                Drive is end-to-end encrypted file storage, with 10 GB free.
              </div>
              <div className="text-[#afafaf]">
                Upload, protect, and share any file.
              </div>
            </div>
          </div>

          <div className="relative h-[70%]">
            <img
              src={block3}
              className="mt-[4%] relative z-[1]"
              alt="Block 3"
              data-aos="zoom-in-right"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="true"
            />

            <img
              src={back1}
              className="absolute top-[-40px] right-[170px] z-[0] h-[50%] hidden md:block"
              alt="Back 1"
            />

            <img
              src={back2}
              className="absolute top-[0px] right-[-20px] h-[60%] hidden md:block"
              alt="Back 2"
            />
            <img
              src={back3}
              className="absolute bottom-[0] right-[85px] h-[30%] hidden md:block"
              alt="Back 3"
            />
          </div>
        </div>
      </div>

      {/* rk */}
      <div className="py-12 w-11/12 mx-auto">
        <div className="mb-10 flex flex-col md:flex-row gap-4 md:justify-between md:items-end">
          <div>
            <h2 className="text-5xl">Pricing</h2>
            <p className="text-gray-500 mt-4 w-full md:w-[60%]">
              Use Drive for free with your network. Upgrade for 1 TB storage,
              custom domains, and advanced admin features.
            </p>
          </div>
          {/* <span className="bg-gray-200 overflow-hidden rounded-full flex flex-row w-[148px]">
            <button
              onClick={handleSecureClick}
              className="transition-all duration-200 bg-gray-300 hover:bg-gray-300 py-2 px-3"
            >
              Monthly
            </button>
            <button className="transition-all duration-200 hover:bg-gray-300 py-2 px-3">
              Yearly
            </button>
          </span> */}
        </div>

        {/* Pricing Cards */}
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 lg:px-0">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`border p-6 rounded-lg bg-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] ${
                index === 3 ? "bg-gray-900 text-white" : "text-gray-900"
              }`}
              data-aos="zoom-in-left"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="true"
            >
              <h3 className="text-xl font-semibold">{plan.title}</h3>
              <p className="text-3xl font-bold mt-4">{plan.price}</p>
              <p className="text-sm text-gray-500">{plan.period}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-gray-500">
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleSecureClick}
                className={`mt-6 w-full py-3 rounded-lg ${
                  index === 3 ? "bg-white text-black" : "bg-black text-white"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Promotional Section */}
        <div className="mt-12 bg-white py-8 px-6 flex flex-col md:flex-row justify-between rounded-xl border-l border-r border-t border-b-2 border-black/10">
          <div
            className="w-full md:w-1/3"
            data-aos="zoom-in-left"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
          >
            <h2 className="text-2xl">
              Wanna have a workstation for your startup?
            </h2>
            <p className="text-gray-500 mt-4">
              Apply now and receive exclusive{" "}
              <button onClick={handleSecureClick} className="">
                ₹3,999 off
              </button>{" "}
              on a yearly business plan
            </p>
            <button
              onClick={handleSecureClick}
              className="mt-6 text-red-500 hue-rotate-[155deg] font-semibold "
            >
              Apply for workstation →
            </button>
          </div>
          <div>
            <img
              src={logoOrange}
              alt=""
              className="mt-6 md:mt-0 float-left hue-rotate-[155deg]"
              data-aos="zoom-in-right"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="true"
            />
          </div>
        </div>
        {/* testimonial */}

        <div className="py-12">
          <div className="container mx-auto px-4 lg:px-0">
            <h2 className="text-center text-4xl mb-10">What Our Users Say</h2>
            <Swiper
              spaceBetween={30}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: true }}
              modules={[Pagination, Autoplay]}
              className="w-full md:w-2/3 lg:w-1/2 h-full mx-auto rounded-xl"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index} className=" w-[606px] h-80">
                  <div className=" p-8 rounded-lg text-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 mx-auto rounded-full mb-4 aspect-square"
                    />
                    <p className="text-lg italic text-gray-700">
                      "{testimonial.testimonial}"
                    </p>
                    <div className="mt-4">
                      <h3 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <section
          className="flex flex-col items-center justify-center py-20 text-white seamlessBg rounded-xl  shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(0,_70,_70,0.15)] "
          data-aos="zoom"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="true"
        >
          <div className="text-center  mx-auto">
            <h1 className="text-3xl md:text-5xl  mb-4">
              Seamless Storage, Unmatched Security
            </h1>
            <p className="text-lg md:text-xl mb-8">
              All you need is cute photos and private data. We handle the rest.
            </p>
            <button
              onClick={handleSecureClick}
              className="px-6 py-3 bg-white text-black rounded-full shadow-lg font-medium hover:bg-gray-200 transition duration-300"
            >
              Sign up for free →
            </button>
          </div>
        </section>
      </div>
      <footer className="bg-gray-100 py-10 md:px-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
            {/* Logo & Copyright */}
            <div className="mb-6 lg:mb-0 text-center lg:text-left">
              <img src={logoBlack} alt="" />
              <p className="text-sm text-gray-600">
                Made with ❤️ by the Straw Hats👒 for your data security.
              </p>
              <p className="text-sm text-gray-600">
                © 2024. All rights reserved.
              </p>
            </div>

            {/* Footer Links */}
            <div className="flex space-x-16">
              {/* Learn Links */}
              <div className="text-center lg:text-left">
                <h3 className="text-lg font-semibold mb-2">LEARN</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    <a href="#" className="hover:text-black">
                      Data security
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-black">
                      Cloud storage
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-black">
                      Quick Aliases
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-black">
                      Encrypted notes
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal Links */}
              <div className="text-center lg:text-left">
                <h3 className="text-lg font-semibold mb-2">LEGAL</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    <a href="#" className="hover:text-black">
                      Privacy policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-black">
                      Terms of service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-black">
                      Acceptable use policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-black">
                      Transparency
                    </a>
                  </li>
                </ul>
              </div>
              <div className="text-center lg:text-left w-full lg:w-auto">
                <h3 className="text-lg font-semibold mb-2">FOLLOW US</h3>
                <div className="flex justify-center lg:justify-start space-x-4">
                  <a href="#" className="hover:text-black">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="#" className="hover:text-black">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="hover:text-black">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="hover:text-black">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingHome;
