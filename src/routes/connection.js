const express = require("express");
const connectionRouter = express.Router();
const { userAuth } = require("../middleware/userAuth");
const ConnectionRequest = require("../models/connectionRequest");

//
connectionRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // check correct status
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type: " + status });
      }

      // check the user id present in our DB
      const toUser = await ConnectionRequest.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({
          message: "userIs not found",
        });
      }
      // Prevent to send double (same) connection request..
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection Request Already Exists.." });
      }

      const connectionReq = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const connctionData = await connectionReq.save();
      res.json({ message: "Connection request send..", connctionData });
    } catch (err) {
      console.log(err);
    }
  }
);

// 
connectionRouter.post("/request/review/:status/:requestId", userAuth, async (req, res)=>{
  try{
    const loggedInUser = req.user;
    const {status, requestId} = req.params
    const allowedStatus = ["accepted", "rejected"]
    if(!allowedStatus.includes(status)){
     return  res.status(404).json({message:"Status not allowed"})
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id : requestId,
      toUser :loggedInUser._id,
      status : "interested"
    })

    if(!connectionRequest){
      return res.status(404).json({message : "Connection request not found"})
    }

    connectionRequest.status =  status;
    const data = await connectionRequest.save();
    res.json({message : "Coonection Request "+ status, data})

  }catch(err){
    res.status(404).send("Error :" , err.message);
  }
})

module.exports = connectionRouter;
