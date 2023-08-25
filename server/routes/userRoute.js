const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require("../modals/user");

const maxAge = 3*24*60*60;

const createToken = (id)=>{
  jwt.sign({id} , 'amartya is cool' , {
    expiresIn:maxAge
  });
}

router.post("/signup", async (req, resp) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    gender : "",
    state :"",
    pincode : "",
    address :"",
    dob :"",
    
  });

  try {
    const user = await User.create(newUser);
    const token = createToken(newUser._id);
    resp.cookie('jwt' , token , {httpOnly:true , maxAge:maxAge*1000});
    resp.status(201).json({userid : user._id , username :user.name});
  } catch (error) {
    return resp.status(400).json({ message: "something went wrong" });
  }
});

router.post("/login", async (req, resp) => {
  const { email, password } = req.body; // array destructuring
  try {
    const user = await User.login(email , password);
    if (user) {
      const temp = {
        name: user.name,
        email: user.email,
        dob : user.dob,
        gender : user.gender,
        address : user.address,
        state : user.state,
        pincode : user.pincode,
        _id: user._id,
      };

      resp.send(temp);
    } else {
      resp.status(400).json({ message: "Login failed" });
    }
  } catch (error) {
    resp.status(500).json({ error: "Internal Server Error" });
  }
});






module.exports = router;