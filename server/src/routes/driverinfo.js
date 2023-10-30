// Import necessary modules and models
import express from "express";
import { DriverInfoModel } from "../models/DriverInfo.js";
import { DriverModel } from "../models/Drivers.js";

const router = express.Router();

// Get all driver information
router.get("/info", async (req, res) => {
  try {
    const response = await DriverInfoModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

// Create a new driver information record
router.post("/info", async (req, res) => {
  const info = new DriverInfoModel(req.body);
  try {
    const response = await info.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

// Add driver information to a driver's profile
router.put("/info", async (req, res) => {
  try {
    const info = await DriverInfoModel.findById(req.body.infoID);
    const driver = await DriverModel.findById(req.body.driverID);
    driver.savedInfo.push(info);
    await driver.save();
    res.json({ savedInfo: driver.savedInfo });
  } catch (err) {
    res.json(err);
  }
});

// Get a list of saved driver information IDs for a specific user
router.get("/savedInfo/ids", async (req, res) => {
  try {
    const driver = await DriverModel.findById(req.params.userID);
    res.json({ savedInfo: driver?.savedInfo });
  } catch (err) {
    res.json(err);
  }
});

// Get detailed information for saved driver records
router.get("/savedInfo", async (req, res) => {
  try {
    const driver = await DriverModel.findById(req.params.driverID);
    const savedInfo = await DriverModel.find({
      _id: { $in: driver.savedInfo },
    });
    res.json({ savedInfo });
  } catch (err) {
    res.json(err);
  }
});

// Update driver information
router.put("/info/:id", async (req, res) => {
  try {
    const driverInfoId = req.params.id;
    const updatedInfo = req.body;

    const updatedDriverInfo = await DriverInfoModel.findByIdAndUpdate(
      driverInfoId,
      updatedInfo,
      { new: true } // Return the updated document
    );

    if (!updatedDriverInfo) {
      return res.status(404).json({ message: "Driver information not found" });
    }

    res.json(updatedDriverInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete driver information by ID
router.delete("/info/:id", async (req, res) => {
  try {
    const driverInfoId = req.params.id;

    // Find and remove the driver information by ID
    const deletedDriverInfo = await DriverInfoModel.findByIdAndRemove(
      driverInfoId
    );

    if (!deletedDriverInfo) {
      return res.status(404).json({ message: "Driver information not found" });
    }

    // Remove the deleted driver information from any driver's saved info list
    await DriverModel.updateMany(
      { savedInfo: driverInfoId },
      { $pull: { savedInfo: driverInfoId } }
    );

    res.json(deletedDriverInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Export the router
export { router as infoRouter };
