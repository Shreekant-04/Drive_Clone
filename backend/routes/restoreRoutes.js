const express = require("express");
const router = express.Router();

const verifyToken = require("../controllers/jwtVerify");
const {
  restoreAll,
  deleteAllTrashedItems,
} = require("../controllers/restoreController");

router.get("/restoreall", verifyToken, restoreAll);
router.delete("/deleteall", verifyToken, deleteAllTrashedItems);

module.exports = router;
