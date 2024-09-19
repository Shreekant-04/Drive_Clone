const express = require("express");
const router = express.Router();

const verifyToken = require("../controllers/jwtVerify");
const { uploadFile, getFile, getLimit } = require("../controllers/fileController");

router.post("/upload-file", verifyToken,uploadFile );
router.get("/get-files",verifyToken,getFile );
router.get("/get-limit",verifyToken,getLimit);

module.exports = router;
