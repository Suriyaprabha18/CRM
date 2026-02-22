const express = require("express");
const router = express.Router();
const User = require("./User");

// REGISTER
router.post("/register", async (req,res)=>{
  try{
    const user = await User.create(req.body);
    res.json(user);
  }catch(err){
    res.status(400).json({message:"User already exists"});
  }
});

// LOGIN
router.post("/login", async (req,res)=>{
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if(!user || user.password !== password){
    return res.status(401).json({message:"Invalid credentials"});
  }

  res.json(user);
});

module.exports = router;