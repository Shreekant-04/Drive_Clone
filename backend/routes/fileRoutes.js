const express = require("express");
const router = express.Router();

const verifyToken = require("../controllers/jwtVerify");
const { uploadFile, getFile, getLimit, changeFileState, secureFile } = require("../controllers/fileController");

router.post("/upload-file", verifyToken,uploadFile );
router.get("/get-files",verifyToken,getFile );
router.get("/get-limit",verifyToken,getLimit);
router.post("/anyone/:filename",verifyToken,changeFileState);
router.post("/secured/:filename",verifyToken,secureFile);
module.exports = router;
