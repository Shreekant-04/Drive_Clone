require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("./config/connection");
const authRoutes = require("./routes/authRoutes");
const folderRoutes = require("./routes/folderRoutes");
const fileRoutes = require("./routes/fileRoutes");
const downRoutes = require("./routes/downRoutes");
const prevRoutes = require("./routes/previewRoutes");
const delRoutes = require("./routes/delRoutes");
const trashRoutes = require("./routes/trashRoutes");
const restoreRoutes = require("./routes/restoreRoutes");

const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/resource", downRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/files", prevRoutes);
app.use("/api/files", delRoutes);
app.use("/api/trash", trashRoutes);
app.use("/api/restore", restoreRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Page not found." });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
