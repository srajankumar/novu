import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { DriverModel } from "../models/Drivers.js";

const router = express.Router();
export { router as driverRouter };

// Driver Registration Route
router.post("/register", verifyToken, async (req, res) => {
  // Extract email, username, and password from the request body
  const { email, username, password, phone } = req.body;

  // Check if a driver with the same username already exists
  const driver = await DriverModel.findOne({ username });

  if (driver) {
    return res.json({ message: "Driver already exists!" });
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
router.post("/login", verifyToken, async (req, res) => {
  // Extract username and password from the request body
  const { username, password } = req.body;

  // Find the driver with the provided username
  const driver = await DriverModel.findOne({ username });
  if (!driver) {
    return res.json({ message: "Driver doesn't exist" });
  }

  // Compare the provided password with the stored hashed password using bcrypt
  const isPasswordValid = await bcrypt.compare(password, driver.password);
  if (!isPasswordValid) {
    return res.json({ message: "Drivername or password is incorrect!" });
  }

  // If the password is valid, create a JWT token and send it as a response
  const token = jwt.sign({ id: driver._id }, "secret");
  res.json({ token, driverID: driver._id });
});
