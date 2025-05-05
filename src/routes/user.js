const express = require('express');
const { userAuth } = require('../middleware/userAuth');
const ConnectionRequest = require('../models/connectionRequest');


const userRouter = express.Router();
// get all the pending connection request for the loggedIn  user
userRouter.get("/user/requests", userAuth, async(req, res)=>{
    try{
        const loggedInUser = req.user;
     const connectionRequest = await ConnectionRequest.find({
        toUserId : loggedInUser._id,
        status : "interested"
     }).populate("fromUserId", ["firstName", "lastName"]);
     res.json({message : "Data fetched successfully...",
        data : connectionRequest
     })
    }catch(err){
        res.status(404).json({message :"Error Occur in userRouter" })
    }


})

// getting connections..
userRouter.get("/user/connection",userAuth, async (req, res)=>{
try{
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
        $or:[
            {toUserId : loggedInUser._id, status : "accepted"},
            {fromUserID : loggedInUser._id, status : "accepted"}
        ],
    }).populate("fromUserId", ["firstName", "lastName"])

    const data = connectionRequests.map((row)=>{
        if(row.fromUserId._id.toString()=== loggedInUser._id.toString()){
            return row.toUserId
        }
        return row.fromUserId
    })
    res.send({data});
}catch(err){
    res.status(400).send({message : err.message});
}
})



module.exports = userRouter;