const express = require('express');
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const { validtateSignupData } = require("../utils/validation");


const authRouter = express.Router();
// Signup
authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;
  // validation of data
  validtateSignupData(req);

  // Encrypt the password
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash,
  });
  await user.save();
  res.send("User Added Susscessfully..");
});

// Login
authRouter.post("/login", async (req, res) => {
    try {
      const { emailId, password } = req.body;
  
      const user = await User.findOne({ emailId: emailId });
      if (!user) {
        throw new Error("invalid creaditial");
      }
      // bycrypt password
      // const isPasswordValid = await bcrypt.compare(password, user.password);
  
      // 2nd way - mongoose schema methods...
      const isPasswordValid = await user.validatePassword(password);
  
      if (isPasswordValid) {
  
        // create JWT Token
        // const token = await jwt.sign({ _id: user._id }, "Dev@Tinder$8364", {expiresIn: "1d" });
        // console.log(token);
  
        // 2nd way - mongoose methods..
        const token = await user.getJWT();
  
  
        //Add  the token to cokkie and send the response to to the user
        res.cookie("token", token, {httpOnly : true}, {expires : new Date(Date.now()+ 8 *3600000)});
        res.send("Login SuccessFully..");
      } else {
        throw new Error("invalid creaditial");
      }
    } catch (err) {
      res.status(400).send("Error :", err.message);   
    }
  });

// Logout
authRouter.post("/logout", async(req, res)=>{
    res.cookie("token",null,{
        expires : new Date(Date.now())
    })
    res.send("User Logout..")
})  


module.exports= authRouter;