const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router()
const SECRET_KEY = "#!^@*HH*&*&Gkjdjdv65df51df5^^&@TGvhd060262...230"
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');



// ROUTE : 1 ---> Create/Register User
router.post("/createuser", [
  body('email',"Enter a valid Email").isEmail(),
  body('password', "Password must be atleast 5 characters long.").isLength({ min: 5 }),
  body('username', "User name must be atleast 3 characters long.").isLength({ min: 3 }),
], async (req, res) => {
  let success = false ;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, meggage: errors.array() });
  }
  try {
    let { username, email, password, cpassword } = req.body;
    if (password !== cpassword) {
      return res.status(400).json({success, "message": "passwords don't match" });
    }
    const salt = await bcrypt.genSalt(12)
    password = await bcrypt.hash(password, salt)
    cpassword = await bcrypt.hash(cpassword, salt)
    const user = new User({ username, email, password, cpassword });
    const added = await user.save();
    const data = {
      user: {
        id: added._id
      }
    }
    const authtoken = jwt.sign(data, SECRET_KEY)
    console.log(added);
    success = true;
    res.send({success, "message": "user added successfully", authtoken });
  } catch (error) {
    console.log(error.message);
    success = false
    res.status(500).json({success ,message : "User already exists."})
  }
})

//ROUTE : 2 ---> Login User
router.post("/login", [
  body('email',"Enter a valid Email").isEmail(),
  body('password', "Password must be atleast 5 characters.").isLength({ min: 5 })
], async (req, res) => {
  let success = false
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success , message: errors.array() });
  }
  try {
    const {email , password} = req.body;
    const user = await User.findOne({email})
    if (!user) {
      return res.status(401).json({ success ,message : "Login using correct credentials"})
    }
    const correct = await bcrypt.compare(password,user.password)
    if(!correct){
      return res.status(401).json({ success ,message : "Login using correct credentials"})
    }
    const data = {
      user: {
        id: user._id
      }
    }
    const authtoken = jwt.sign(data, SECRET_KEY)
    console.log(user);
    success = true;
    res.send({success, "message": "user LoggedIn  successfully", authtoken });
  } catch (error) {
    console.log(error.message);
    success = false
    res.status(500).json({success ,message : "internal server error"})
  }
})

//ROUTE : 3 ---> Fetch User from token
router.post("/fetchuser",fetchuser, async (req, res) => {
  let success = false;
    try {
        const userId = req.user.id ;
        const user = await User.findById(userId,{password : 0 , cpassword : 0});
        console.log(user);
        success = true;
        res.json({success, user});
    }catch (error) {
      console.log(error.message);
    }
})

module.exports = router