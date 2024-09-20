const express = require("express");
const router = express.Router();
const verifyToken = require("../controllers/jwtVerify");
const {
  createFolder,
  addFileToFolder,
} = require("../controllers/folderController");

router.post("/create-folder", verifyToken, createFolder);
router.post("/add-file-to-folder", verifyToken, addFileToFolder);

module.exports = router;
