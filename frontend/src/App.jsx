import React from "react";
import Routing from "./routes/Routing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <div>
      <ToastContainer position="top-center" autoClose={500} />
      <Routing />
    </div>
  );
}

export default App;
