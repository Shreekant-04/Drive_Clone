import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React, { useRef } from "react";

const testimonials = [
  {
    id: 1,
    text: "I never realized how much time I was wasting managing my files until I started using Drive. ",
    name: "Michael",
    rating: 5,
  },
  {
    id: 2,
    text: "Drive has transformed my efficiency at work. Now I can focus on the tasks that really matter.",
    name: "Sarah",
    rating: 4,
  },
  {
    id: 3,
    text: "Drive has been a game-changer for managing files and collaborating with my team.",
    name: "John",
    rating: 5,
  },
  {
    id: 4,
    text: "The time I save with Drive is incredible. I recommend it to everyone.",
    name: "Emily",
    rating: 5,
  },

  {
    id: 5,
    text: "Drive has helped me organize and manage projects more efficiently than ever.",
    name: "Chris",
    rating: 4,
  },
  {
    id: 6,
    text: "I can't believe how much easier my work has become since using Drive.",
    name: "David",
    rating: 5,
  },
  {
    id: 7,
    text: "Drive is fantastic for keeping everything in one place and making collaboration smooth.",
    name: "Alex",
    rating: 4,
  },
  {
    id: 8,
    text: "Highly recommend Drive for any team that wants to stay organized and efficient.",
    name: "Jessica",
    rating: 5,
  },
  {
    id: 9,
    text: "I didn’t know how much I needed Drive until I started using it. My workflow is so much faster.",
    name: "Sam",
    rating: 5,
  },
  {
    id: 10,
    text: "Drive has improved the way my team collaborates and handles files. It's amazing!",
    name: "Patricia",
    rating: 5,
  },
];

export default function Testimonials() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="w-full p-16 ">
      <h2 className="text-4xl font-bold text-[#004646] mb-6 ">Testimonials</h2>
      <p className="text-black text-5xl font-bold ">
        We Have received received several positive responses.
      </p>
      <p className="text-gray-600 mb-8 mt-2">
        The following are various reactions from individuals who have
        collaborated with us on the services provided.
      </p>
      <div className="flex justify-between items-center mt-8 w-full  gap-2 relative  ">
        <button
          ref={prevRef}
          className="bg-teal-600 text-white px-2 py-2 h-1/3 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
        </button>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={30}
          slidesPerView={3}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onSwiper={(swiper) => {
            setTimeout(() => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}
          pagination={{ clickable: true }}
          className="py-6"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="p-6 border mb-4 rounded-lg shadow-md bg-white">
                <p className="text-gray-700 mb-4 italic">{testimonial.text}</p>

                <p className="text-teal-600 font-semibold">
                  {"★".repeat(testimonial.rating)}
                </p>
                <p className="ml-2 text-gray-600">-{testimonial.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          ref={nextRef}
          className="bg-teal-600 text-white px-2 py-2 h-1/3 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
