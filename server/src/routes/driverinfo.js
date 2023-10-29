import express from "express";
import { DriverInfoModel } from "../models/DriverInfo.js";
import { DriverModel } from "../models/Drivers.js";

const router = express.Router();

// Get Driver Information
router.get("/info", verifyToken, async (req, res) => {
  try {
    // Retrieve driver information from the database
    const response = await DriverInfoModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

// Create Driver Information
router.post("/info", verifyToken, async (req, res) => {
  // Create and save new driver information to the database
  const info = new DriverInfoModel(req.body);
  try {
    const response = await info.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

// Update Driver Information for a Driver
router.put("/info", verifyToken, async (req, res) => {
  try {
    // Find and update driver and their saved information
    const info = await DriverInfoModel.findById(req.body.infoID);
    const driver = await DriverModel.findById(req.body.driverID);
    driver.savedInfo.push(info);
    await driver.save();
    res.json({ savedInfo: driver.savedInfo });
  } catch (err) {
    res.json(err);
  }
});

// Get Saved Information IDs for a Driver
router.get("/savedInfo/ids", verifyToken, async (req, res) => {
  try {
    // Find and retrieve the IDs of saved information for a driver
    const driver = await DriverModel.findById(req.params.userID);
    res.json({ savedInfo: driver?.savedInfo });
  } catch (err) {
    res.json(err);
  }
});

// Get Saved Information for a Driver
router.get("/savedInfo", verifyToken, async (req, res) => {
  try {
    // Find and retrieve the saved information objects for a driver
    const driver = await DriverModel.findById(req.params.driverID);
    const savedInfo = await DriverModel.find({
      _id: { $in: driver.savedInfo },
    });
    res.json({ savedInfo });
  } catch (err) {
    res.json(err);
  }
});

export { router as infoRouter };
