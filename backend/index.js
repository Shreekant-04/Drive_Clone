require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("./config/connection");
const authRoutes = require("./routes/authRoutes");

const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: [
      "https://drive-clone-frontend.vercel.app/",
      "https://drive-clone-orcin.vercel.app/",
    ],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'] 
  })
);


app.use(express.json());

app.use("/api/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Page not found." });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
