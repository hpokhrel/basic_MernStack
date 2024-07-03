import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const UserModel = mongoose.model("User");

const verifyUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const userExists = await UserModel.findOne({ _id: user.id });
    if (!userExists) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    req.user = user;
    next();
  });
};

export default verifyUser;
