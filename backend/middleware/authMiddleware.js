const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header

      token = req.headers.authorization.split(" ")[1];
      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // GET USER FROM TOKEN
      req.user = User.findById(decoded.id).select("-password");
      if (!req.user) {
        console.log(error);
        res.status(402);
        throw new Error("Not authorized");
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    console.log(error);
    res.status(402);
    throw new Error("Not authorized");
  }
});

module.exports = { protect };
