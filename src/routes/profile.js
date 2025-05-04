const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/userAuth");
const { validateEditProfileData } = require("../utils/validation");
const cookieParser = require("cookie-parser");

// Profile View
profileRouter.get("/profile/view", userAuth, (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User not exist..");
    }
    res.send(user);
  } catch (err) {
    res.status(404).send("Error :", err.message);
  }
});

// Profile Edit
profileRouter.patch("/profile/edit",userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Err occur");
    }
    const loggedIn = req.user;
    console.log(loggedIn);
    Object.keys(req.body).forEach((key) => (loggedIn[key] = req.body[key]));
    console.log(loggedIn);
   await loggedIn.save();
   res.json({message : `${loggedIn.firstName}, your profile updated successfully..`,
data : loggedIn,
})
    res.send("User Updated");   
  } catch (err) {
    res.status(404).send("Error :", err.message);
  }
});

module.exports = profileRouter;
