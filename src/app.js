const express = require("express");
const connectDB = require("../src/config/database");
const User = require("./models/userSchema");
const bcrypt = require('bcrypt');
const { validtateSignupData } = require("./utils/validation");
const app = express();

// Middleware used to read user data which have send from client
app.use(express.json())

// Signup 
app.post("/signup", async(req, res)=>{
  const {firstName, lastName, emailId, password} = req.body;
  // validation of data
  validtateSignupData(req);

  // Encrypt the password
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    firstName,
    lastName,
    emailId,
    password : passwordHash
  })
  await user.save();
  res.send("User Added Susscessfully..")
})

// Login
app.post("/login", async(req, res)=>{
  try{
    const {emailId, password} = req.body

    const user  = await User.findOne({emailId : emailId});
    if(!user){
      throw new Error("invalid creaditial")
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(isPasswordValid){
      res.send("Login SuccessFully..")
    } else{
      throw new Error("invalid creaditial")
    }
  }catch(err){
res.status(400).send("Error : ", err.)
  }
  

})
// send data to database
// app.post("/signup", async (req, res) => {
//   //creating new instance of the userModel
//   const user = new User(req.body);
//   try{
//     await user.save();
//     res.send("user Added Successfully..")
//   }catch(err){console.log(err.message), res.status(400).send("Error while saving user...")}
//  });

 // Get user by email
//  app.get("/user", async (req, res)=>{
//     const userEmail = req.body.emailId
//     try{
//       // if there are same two email find one from 
//       const user = await User.findOne({emailId : userEmail});
//       if(!user){
//         res.status(400).send("user not found..");
//       }else{
//         res.send(user);
//       }
//     }catch(err){
//     }
//     try{
//          const users = await User.find({emailId: userEmail})
//         if(userEmail.length ===0){
//             res.status(404).send("Error")
//         }else{
//             res.send(users);
//         }
//     }catch(err){
//         res.status(400).send("Something went wrong...")
//     }
//  })

 // Find all user from DB..
//  app.get("/feed",async(req,res)=>{
// try{
//   const users = await User.find({});
//   res.send(users);
// }catch(err){
//   res.status(400).send("Err Occur to fetch all users...")
// }
//  })

//  Delete API
//  app.delete("/user", async(req, res)=>{
//   const userId = req.body.userId;
//   try{
// const user = await User.findOneAndDelete(userId)
// res.send("User Deleted..")
//   }catch(err){}
//  })

 // Updtae the user data..
//  app.patch("/user", async(req, res)=>{
//   const userId = req.body.userId;
//   const data = req.body;
//   console.log(data);
//   try{
//    const user = await User.findOneAndUpdate({_id: userId}, data);
//     res.send("User Updated Successfully..")
//     console.log(user);
//   }catch(err){
//     res.status(400).send("Error Occur..")
//   }
//  });


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
