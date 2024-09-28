const express = require("express");
const router = express.Router();
const verifyToken = require("../controllers/jwtVerify");
const {
  trashFile,
  getTrashFile,
  restoreFile,
  trashFolder,
  getTrashedFolder,
  restoreFolder,
} = require("../controllers/trashController");

router.put("/file/:filename", trashFile);
router.get("/get-files", verifyToken, getTrashFile); //
router.put("/restorefile/:filename", restoreFile);
router.put("/folder/:folderId", trashFolder); //
router.get("/get-folders", verifyToken, getTrashedFolder); //
router.put("/restorefolder/:folderId", restoreFolder); //

module.exports = router;
