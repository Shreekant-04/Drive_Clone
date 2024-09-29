const express = require("express");
const router = express.Router();
const verifyToken = require("../controllers/jwtVerify");
const { deleteFile } = require("../controllers/delController");


router.delete('/deletefiles/:filename',deleteFile)

module.exports = router;