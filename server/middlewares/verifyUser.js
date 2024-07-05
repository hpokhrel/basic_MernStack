import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

const verifyUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Attach user information to the request object for further use if needed
    req.user = user;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default verifyUser;
