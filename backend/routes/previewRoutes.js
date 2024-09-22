const express = require("express");
const router = express.Router();
const verifyToken = require("../controllers/jwtVerify");
const { getPreview } = require("../controllers/previewController");

router.get('/preview/:filename',verifyToken,getPreview)


module.exports = router;