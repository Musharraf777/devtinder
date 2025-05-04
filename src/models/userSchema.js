const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    emailId : {
        type : String
    },
    password : {
        type : String
    },
    age : {
        type : Number
    },
    gender : {
        type : String
    },
})
userSchema.methods.getJWT = async function(){
    const user = this;
    const token =await jwt.sign({ _id: user._id }, "Dev@Tinder$8364", {expiresIn: "1d" });
    return token
}

// for password - mongoose schema method..
userSchema.methods.validatePassword = async function(passwordEnterByUser){
    const user = this 
    const passwordHash =user.password
    const isPasswordValid = await bcrypt.compare(passwordEnterByUser , passwordHash);
    return isPasswordValid
}

module.exports = mongoose.model("User", userSchema);