import React from "react";
import Routing from "./routes/Routing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer position="top-center" />
      <Routing />
    </div>
  );
}

export default App;
