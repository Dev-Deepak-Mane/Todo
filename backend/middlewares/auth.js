import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token, "upating");
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Please Login to access this resource",
    });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded?._id);
  req.user = await User.findById(decoded._id);
  next();
};
