const express = require("express");
const router = express.Router();
const { sendOtp, verifyOtp, updateProfile } = require("../controllers/authController");
const verifyToken = require("../controllers/jwtVerify");
const User = require("../models/User");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/update-profile",verifyToken,upload.single("profileLink"),updateProfile);
router.get("/verify-user", verifyToken, async (req,res)=>{
    const data = await User.find({_id : req.user.id})
    if(!data){
        res.status(500).json("User Not Exist")
    }
    
    res.status(200).json({ message: "Successfully verified", data: data });
})

module.exports = router;
