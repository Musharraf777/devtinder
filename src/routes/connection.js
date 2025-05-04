const express = require('express');
const connectionRouter = express.Router();
const { userAuth } = require("../middleware/userAuth");

// Test API
connectionRouter.post("/sendConnectionRequest", userAuth, (req, res)=>{
    console.log(req.user , "Make Connection Requset...");
    res.send("Connection Made Successfully..")
  })

  module.exports= connectionRouter;