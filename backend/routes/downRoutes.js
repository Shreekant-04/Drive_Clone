const express = require("express");
const router = express.Router();

const verifyToken = require("../controllers/jwtVerify");
const { downloadFile } = require("../controllers/downloadController");
router.get("/downloadFile/:filename", verifyToken, downloadFile );


module.exports = router;
