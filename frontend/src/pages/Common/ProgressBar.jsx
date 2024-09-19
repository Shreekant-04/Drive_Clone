import React, { useEffect, useRef } from "react";
import gsap from "gsap";

function ProgressBar({ total, available, px, upload }) {
  const progressRef = useRef(null);
  const progress = ((available / total) * 100).toFixed(0);

  useEffect(() => {
    if (upload) {
      // Directly set the width without gsap animation during upload
      if (progressRef.current) {
        progressRef.current.style.width = `${progress > 100 ? 100 : progress}%`;
      }
    } else {
      // Use gsap animation for non-upload case
      gsap.fromTo(
        progressRef.current,
        { width: "0%" },
        { width: `${progress > 100 ? 100 : progress}%`, duration: 1, ease: "power2.out" }
      );
    }
  }, [progress, upload]);

  return (
    <div style={{ marginLeft: `${px}px` || "15px" }} className="relative w-[90%] rounded-3xl bg-[#EEEEEE] text-center text-white">
      <span className="absolute inset-0 flex items-center justify-center text-sm">
        {progress > 100 ? 100 : progress}%
      </span>
     <span
  ref={progressRef}
  className={`rounded-3xl h-4 block 
    ${!upload && progress <= 50 ? 'bg-[#64AAAA]' : 
      progress > 50 && progress < 80 ? 'bg-orange-400' : 
      'bg-red-400'}`}
  style={{ width: upload ? `${progress > 100 ? 100 : progress}%` : "0%" }}
></span>
    </div>
  );
}

export default ProgressBar;
