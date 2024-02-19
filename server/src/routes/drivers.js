import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { DriverModel } from "../models/Drivers.js";

const router = express.Router();
export { router as driverRouter };

// Driver Registration Route
router.post("/register", async (req, res) => {
  // Extract email, username, and password from the request body
  const { email, username, password, phone } = req.body;

  // Check if any of the required credentials are missing
  if (!email || !username || !password || !phone) {
    return res
      .status(400)
      .json({ message: "Please provide all required credentials!" });
  }

  // Check if a driver with the same phone number already exists
  const driverWithPhone = await DriverModel.findOne({ phone });

  if (driverWithPhone) {
    return res
      .status(400)
      .json({ message: "Driver with this phone number already exists!" });
  }

  // Check if a driver with the same username already exists
  const driverWithUsername = await DriverModel.findOne({ username });

  if (driverWithUsername) {
    return res
      .status(400)
      .json({ message: "Driver with this username already exists!" });
  }

  // Check if the password meets the minimum length requirement
  if (password.length < 6) {
    return res.json({
      message: "Password must be at least 6 characters long!",
    });
  }

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new driver with the hashed password and save it to the database
  const newDriver = new DriverModel({
    email,
    username,
    phone,
    password: hashedPassword,
  });

  await newDriver.save();

  res.json({ message: "Driver registered successfully!" });
});

// Driver Login Route
router.post("/login", async (req, res) => {
  // Extract username and password from the request body
  const { username, password } = req.body;

  // Check if both username and password are provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both username and password!" });
  }

  // Find the driver with the provided username
  const driver = await DriverModel.findOne({ username });

  if (!driver) {
    // If the driver doesn't exist, send an alert
    return res.status(400).json({ message: "Driver doesn't exist" });
  }

  // Compare the provided password with the stored hashed password using bcrypt
  const isPasswordValid = await bcrypt.compare(password, driver.password);

  if (!isPasswordValid) {
    // If the password is invalid, send an alert
    return res
      .status(400)
      .json({ message: "Username or password is incorrect!" });
  }

  // If the password is valid, create a JWT token and send it as a response
  const token = jwt.sign({ id: driver._id }, process.env.JWT_SECRET);
  res.json({ token, userID: driver._id });
});
