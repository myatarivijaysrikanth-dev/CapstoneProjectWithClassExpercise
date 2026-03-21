const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

router.get("/register",(req,res)=>{
    res.sendFile("register.html",{root:"views"});
});

router.post("/register", async (req,res)=>{

    const {name,email,password} = req.body;

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = new User({
        name,
        email,
        password:hashedPassword
    });

    await newUser.save();

    console.log("User saved");

    res.send(`Registration successful for ${name}`);
});

router.get("/login",(req,res)=>{
    res.sendFile("login.html",{root:"views"});
});

router.post("/login",
passport.authenticate("local",{
    successRedirect:"/profile",
    failureRedirect:"/login"
})
);

router.get("/profile",(req,res)=>{
    if(req.user){
        res.send(`Welcome ${req.user.name}`);
    }else{
        res.send("Not logged in");
    }
});

router.get("/logout",(req,res)=>{
    req.logout(()=>{
        res.send("Logged out");
    });
});

module.exports = router;