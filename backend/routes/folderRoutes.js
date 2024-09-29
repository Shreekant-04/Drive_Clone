const express = require("express");
const router = express.Router();
const verifyToken = require("../controllers/jwtVerify");
const {
  createFolder,
  getFolders,
  getFilesInFolder,
  deleteFolder,
  updateFolderName,
} = require("../controllers/folderController");

router.post("/create-folder", verifyToken, createFolder);
router.get("/get-folders", verifyToken, getFolders);
router.get("/:folderId/files", verifyToken, getFilesInFolder);
router.delete("/deletefolder/:folderId", deleteFolder);
router.put("/:folderId", verifyToken, updateFolderName);

module.exports = router;
