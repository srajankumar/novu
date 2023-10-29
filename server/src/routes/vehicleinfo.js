import express from "express";
import { VehicleInfoModel } from "../models/VehicleInfo.js";
import { DriverModel } from "../models/Drivers.js";

const router = express.Router();

// Get all vehicle information
router.get("/info", async (req, res) => {
  try {
    const response = await VehicleInfoModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

// Create a new vehicle information record
router.post("/info", async (req, res) => {
  const info = new VehicleInfoModel(req.body);
  try {
    const response = await info.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

// Add vehicle information to a driver's profile
router.put("/info", async (req, res) => {
  try {
    const info = await VehicleInfoModel.findById(req.body.infoID);
    const driver = await DriverModel.findById(req.body.driverID);
    driver.savedVehicleInfo.push(info);
    await driver.save();
    res.json({ savedVehicleInfo: driver.savedVehicleInfo });
  } catch (err) {
    res.json(err);
  }
});

// Get a list of saved vehicle information IDs for a specific user
router.get("/savedInfo/ids", async (req, res) => {
  try {
    const driver = await DriverModel.findById(req.params.userID);
    res.json({ savedVehicleInfo: driver?.savedVehicleInfo });
  } catch (err) {
    res.json(err);
  }
});

// Get detailed information for saved vehicle records
router.get("/savedInfo", async (req, res) => {
  try {
    const driver = await DriverModel.findById(req.params.driverID);
    const savedVehicleInfo = await VehicleInfoModel.find({
      _id: { $in: driver.savedVehicleInfo },
    });
    res.json({ savedVehicleInfo });
  } catch (err) {
    res.json(err);
  }
});

export { router as vehicleRouter };
