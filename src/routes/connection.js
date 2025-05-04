const express = require("express");
const connectionRouter = express.Router();
const { userAuth } = require("../middleware/userAuth");
const ConnectionRequest = require("../models/connectionRequest");


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

module.exports = connectionRouter;
