const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not valid...");
    }
    const decoddedObj = await jwt.verify(token, "Dev@Tinder$8364");

    const { _id } = decoddedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("Error");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(404).send(err.message);
  }
};

module.exports = {
  userAuth,
};
