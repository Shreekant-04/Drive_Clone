const express = require("express");
const router = express.Router();
const { sendOtp, verifyOtp } = require("../controllers/authController");
const verifyToken = require("../controllers/jwtVerify");

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.get("/verify-user", verifyToken, (req,res)=>{
   
    res.status(200).json({ message: "Successfully verified" });
})

module.exports = router;
