const express = require("express");
const {ensureAdmin} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/admin",ensureAdmin,(req,res)=>{
    res.send("Welcome, Admin!");
});

module.exports = router;