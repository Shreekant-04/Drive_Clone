import React from "react";

function ProgressBar({ total, available,px }) {
  const progress = (available / total) * 100;

  return (
    <div style={{marginLeft : `${px}px` || "15px"}} className="progress w-[90%] rounded-3xl bg-[#EEEEEE]">
      <span
        className="bg-[#64AAAA] rounded-3xl h-4 block"
        style={{ width: `${progress}%` }}
      ></span>
    </div>
  );
}

export default ProgressBar;
