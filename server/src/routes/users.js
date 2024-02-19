import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

// Create an Express router
const router = express.Router();
export { router as userRouter };

// User Registration Route
router.post("/register", async (req, res) => {
  // Extract email, username, and password from the request body
  const { email, username, password, phone } = req.body;

  // Check if any of the required credentials are missing
  if (!email || !username || !password || !phone) {
    return res
      .status(400)
      .json({ message: "Please provide all required credentials!" });
  }

  // Check if a user with the same phone number already exists
  const userWithPhone = await UserModel.findOne({ phone });

  if (userWithPhone) {
    return res
      .status(400)
      .json({ message: "User with this phone number already exists!" });
  }

  // Check if a user with the same username already exists
  const userWithUsername = await UserModel.findOne({ username });

  if (userWithUsername) {
    return res
      .status(400)
      .json({ message: "User with this username already exists!" });
  }

  // Check if the password meets the minimum length requirement
  if (password.length < 6) {
    return res.json({
      message: "Password must be at least 6 characters long!",
    });
  }

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user with the hashed password and save it to the database
  const newUser = new UserModel({
    email,
    username,
    phone,
    password: hashedPassword,
  });

  await newUser.save();

  res.json({ message: "User registered successfully!" });
});

// User Login Route
router.post("/login", async (req, res) => {
  // Extract username and password from the request body
  const { username, password } = req.body;

  // Check if both username and password are provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both username and password!" });
  }

  // Find the user with the provided username
  const user = await UserModel.findOne({ username });

  if (!user) {
    // If the user doesn't exist, send an alert
    return res.status(400).json({ message: "User doesn't exist" });
  }

  // Compare the provided password with the stored hashed password using bcrypt
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    // If the password is invalid, send an alert
    return res
      .status(400)
      .json({ message: "Username or password is incorrect!" });
  }

  // If the password is valid, create a JWT token and send it as a response
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, userID: user._id });
});
