// Import necessary modules and models
import express from "express";
import { VehicleInfoModel } from "../models/VehicleInfo.js";
import { DriverModel } from "../models/Drivers.js";
import { verifyToken } from "../middleWares/middleWareJWT.js"; // Update the path

const router = express.Router();
// router.use(verifyToken);

// Get all vehicle information
router.get("/info", async (req, res) => {
  try {
    const response = await VehicleInfoModel.find({});
    res.json(response);
  } catch (err) {
    res.status(500).json({
      error:
        "Internal Server Error - GET method in /info (file: vehicle.js, folder: routes)",
    });
  }
});

// Create a new vehicle information record
router.post("/info", async (req, res) => {
  const info = new VehicleInfoModel(req.body);
  try {
    const response = await info.save();
    res.json(response);
  } catch (err) {
    res.status(500).json({
      error:
        "Internal Server Error - POST method in /info (file: vehicle.js, folder: routes)",
    });
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
    res.status(500).json({
      error:
        "Internal Server Error - PUT method in /info (file: vehicle.js, folder: routes)",
    });
  }
});

// Get a list of saved vehicle information IDs for a specific user
router.get("/savedInfo/ids", async (req, res) => {
  try {
    const driver = await DriverModel.findById(req.params.userID);
    res.json({ savedVehicleInfo: driver?.savedVehicleInfo });
  } catch (err) {
    res.status(500).json({
      error:
        "Internal Server Error - GET method in /savedInfo/ids (file: vehicle.js, folder: routes)",
    });
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
    res.status(500).json({
      error:
        "Internal Server Error - GET method in /savedInfo (file: vehicle.js, folder: routes)",
    });
  }
});

// Update vehicle information by ID
router.put("/info/:id", async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const updatedInfo = req.body;

    // Find the vehicle information by its ID and update it
    const updatedVehicleInfo = await VehicleInfoModel.findByIdAndUpdate(
      vehicleId,
      updatedInfo,
      { new: true } // Return the updated document
    );

    if (!updatedVehicleInfo) {
      return res.status(404).json({
        message:
          "Vehicle information not found - PUT method in /info/:id (file: vehicle.js, folder: routes)",
      });
    }

    res.json(updatedVehicleInfo);
  } catch (err) {
    res.status(500).json({
      error:
        "Internal Server Error - PUT method in /info/:id (file: vehicle.js, folder: routes)",
    });
  }
});

// Delete vehicle information by ID
router.delete("/info/:id", async (req, res) => {
  try {
    const vehicleInfoId = req.params.id;

    // Find and remove the vehicle information by ID
    const deletedVehicleInfo = await VehicleInfoModel.findByIdAndRemove(
      vehicleInfoId
    );

    if (!deletedVehicleInfo) {
      return res.status(404).json({
        message:
          "Vehicle information not found - DELETE method in /info/:id (file: vehicle.js, folder: routes)",
      });
    }

    // Remove the deleted vehicle information from any driver's saved vehicle info list
    await DriverModel.updateMany(
      { savedVehicleInfo: vehicleInfoId },
      { $pull: { savedVehicleInfo: vehicleInfoId } }
    );

    res.json(deletedVehicleInfo);
  } catch (err) {
    res.status(500).json({
      error:
        "Internal Server Error - DELETE method in /info/:id (file: vehicle.js, folder: routes)",
    });
  }
});

export { router as vehicleRouter };
