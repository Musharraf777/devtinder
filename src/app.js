const express = require("express");
const connectDB = require("../src/config/database");
const User = require("./models/userSchema");
const app = express();

app.post("/signup", async (req, res) => {
  // creating new instance of the userModel
  const user = new User({
    firstName: "Syed",
    lastName: "Arshlan",
    emailId: "Arshlan@gmail.com",
    password: "Arshlan@786",
  });
  try{
    await user.save();
    res.send("user Added Successfully..")
  }catch(err){console.log(err.message), res.status(400).send("Error while saving user...")}

});

connectDB()
  .then(() => {
    console.log("database connected successfully..");
    app.listen(7777, () => {
      console.log("server listed at 7777...");
    });
  })
  .catch((err) => {
    console.log(err);
  });
