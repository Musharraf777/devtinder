const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required : true
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required : true
    },
    status: {
      type: String,
      required : true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  { timestamps: true }
);

// create compound index for better Find oof value
connectionRequestSchema.index({fromUserId : 1, toUserId:1})

// check if sent connection to yourself..
connectionRequestSchema.pre("save",function(next){
  const connectionRequest = this;
if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
  throw new Error("Cannot sent connection to yourself..")
}
next();
})


const ConnectionRequestModel =  new mongoose.model("ConnectionRequest" , connectionRequestSchema)
module.exports = ConnectionRequestModel;