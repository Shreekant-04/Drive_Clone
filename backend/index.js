require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("./config/connection");
const authRoutes = require("./routes/authRoutes");
const folderRoutes = require("./routes/folderRoutes");
const fileRoutes = require("./routes/fileRoutes");
const downRoutes = require("./routes/downRoutes");
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use('/api/files', fileRoutes  );
app.use('/api/resource', downRoutes  );
app.use("/api/folders", folderRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Page not found." });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
