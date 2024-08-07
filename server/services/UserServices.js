import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const RegisterUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    res.status(400).json({ message: "User already exists" });
  } else {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        res.status(500).json({ message: err.message });
      }
      const user = new UserModel({ name, email, password: hash });
      await user.save();
      res.status(201).json({ message: `${user.email} created successfully` });
    });
  }
};

export const SignInUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
          );
          res.cookie("token", token);
          res.status(200).json({ message: `Welcome ${user.name}` });
        } else {
          res.status(500).json({ message: "Email or password is incorrect" });
        }
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
};

export const SignOutUser = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

export const getAllUsers = async (req, res) => {
  const users = await UserModel.find();
  res.status(200).json(users);
};
